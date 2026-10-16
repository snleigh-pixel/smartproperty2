/**
 * Serverless function for Vercel / Node.js
 * Fetches Live Private Residential Projects in the pipeline from URA Data Service
 * 
 * GUARDRAILS ENFORCED:
 * 1. Reads URA_ACCESS_KEY and URA_USER_TOKEN exclusively from process.env inside api/
 * 2. If URA_ACCESS_KEY is empty, returns HTTP 503 "key not configured" immediately without calling provider
 * 3. Never invents data; returns actual API status or explicit plain error message
 */

export default async function handler(req, res) {
  // Guardrail check: if key is empty, return 503 "key not configured" immediately
  const accessKey = process.env.URA_ACCESS_KEY;
  const userToken = process.env.URA_USER_TOKEN;

  if (!accessKey || accessKey.trim() === '') {
    res.status(503).json({
      success: false,
      code: 'KEY_NOT_CONFIGURED',
      error: 'key not configured'
    });
    return;
  }

  const URA_ENDPOINT = 'https://eservice.ura.gov.sg/uraDataService/invokeUraDS/v1?service=PMI_Resi_Pipeline';

  // Support 8 second timeout to detect slow / unresponsive upstream responses
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);

  try {
    const headers = {
      'AccessKey': accessKey,
      'User-Agent': 'PropPulse-SG/1.0'
    };

    if (userToken && userToken.trim() !== '') {
      headers['Token'] = userToken;
    }

    const response = await fetch(URA_ENDPOINT, {
      method: 'GET',
      headers: headers,
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        res.status(response.status).json({
          success: false,
          code: 'ACCESS_REFUSED',
          error: 'The URA Data Service refused access. The provided credentials or daily quota may be expired or invalid.'
        });
        return;
      }

      res.status(response.status).json({
        success: false,
        code: 'UPSTREAM_ERROR',
        error: `URA service returned error status ${response.status}: ${response.statusText}`
      });
      return;
    }

    const data = await response.json();

    // Check if URA reported internal status error (e.g. invalid token/key)
    if (data.Status === 'Error' || data.status === 'error') {
      res.status(403).json({
        success: false,
        code: 'ACCESS_REFUSED',
        error: data.Message || 'The URA Data Service refused access with the configured credentials.'
      });
      return;
    }

    // URA returns payload in Result or directly
    const projects = data.Result || data.result || (Array.isArray(data) ? data : []);

    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects
    });
  } catch (err) {
    clearTimeout(timeoutId);

    if (err.name === 'AbortError') {
      res.status(504).json({
        success: false,
        code: 'REQUEST_TIMEOUT',
        error: 'The request to the Singapore URA pipeline service timed out. The government portal may be experiencing high latency.'
      });
      return;
    }

    res.status(502).json({
      success: false,
      code: 'NETWORK_ERROR',
      error: `Network failure connecting to URA Data Service: ${err.message || 'Connection refused'}`
    });
  }
}
