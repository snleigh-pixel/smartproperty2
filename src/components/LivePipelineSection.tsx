import React, { useState, useEffect } from 'react';

interface UraProject {
  project?: string;
  developer?: string;
  district?: string;
  street?: string;
  propertyType?: string;
  tenure?: string;
  totUnits?: number | string;
  uncompletedWithPr?: number | string;
  uncompletedWithoutPr?: number | string;
  expectedVacantPossessionDate?: string;
  [key: string]: any;
}

interface LivePipelineSectionProps {
  onLoadIntoCalc?: (psfEstimate: number, projectName: string) => void;
  onBookViewing: (projectName: string, developer: string) => void;
}

export const LivePipelineSection: React.FC<LivePipelineSectionProps> = ({
  onLoadIntoCalc,
  onBookViewing
}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [projects, setProjects] = useState<UraProject[]>([]);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);
  const [errorCode, setErrorCode] = useState<string | null>(null);
  const [filterDistrict, setFilterDistrict] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [lastFetchedAt, setLastFetchedAt] = useState<string | null>(null);

  const fetchPipelineData = async () => {
    setLoading(true);
    setErrorStatus(null);
    setErrorCode(null);

    try {
      // Sub-goal 2: Fetched strictly through /api/
      const res = await fetch('/api/pipeline');
      const json = await res.json();

      setLastFetchedAt(new Date().toLocaleTimeString());

      if (!res.ok || !json.success) {
        // Sub-goal 3: Plain words when refused, empty, or slow
        const plainMsg = json.error || `URA Data Service returned status ${res.status}`;
        setErrorStatus(plainMsg);
        setErrorCode(json.code || `HTTP_${res.status}`);
        setProjects([]);
      } else {
        const list = Array.isArray(json.data) ? json.data : [];
        setProjects(list);
      }
    } catch (err: any) {
      setErrorStatus(
        err.name === 'AbortError'
          ? 'The request to the Singapore URA pipeline service timed out. The government portal may be experiencing high latency.'
          : `Connection error: ${err.message || 'Unable to reach /api/pipeline endpoint'}`
      );
      setErrorCode('NETWORK_FAILURE');
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPipelineData();
  }, []);

  const filteredProjects = projects.filter((p) => {
    const projName = (p.project || p.name || '').toLowerCase();
    const devName = (p.developer || '').toLowerCase();
    const dist = (p.district || '').toUpperCase();
    const searchMatch = !searchTerm || projName.includes(searchTerm.toLowerCase()) || devName.includes(searchTerm.toLowerCase());
    const districtMatch = filterDistrict === 'all' || dist.includes(filterDistrict);
    return searchMatch && districtMatch;
  });

  return (
    <div id="pipelineTable" className="w-full bg-[#122131] border border-[#1c2b3c] rounded-xl p-4 sm:p-6 shadow-xl flex flex-col gap-6 scroll-mt-24">
      {/* Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[#4edea3] text-xs uppercase font-bold tracking-wider mb-1">
            <span className="material-symbols-outlined text-base">gavel</span>
            Official URA Land Sales Pipeline & Future Launches
          </div>
          <h2 className="text-lg sm:text-2xl font-bold text-[#d4e4fa]">
            Private Residential Projects in the Pipeline (URA Data Service)
          </h2>
          <p className="text-xs text-[#bbcabf] mt-0.5">
            Real government land pipeline feeds fetched through <code className="text-[#7bd0ff] font-mono bg-[#0d1c2d] px-1.5 py-0.5 rounded border border-[#1c2b3c]">/api/pipeline</code>
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start lg:self-auto">
          {lastFetchedAt && (
            <span className="text-[11px] text-[#86948a] hidden sm:inline">
              Synced: {lastFetchedAt}
            </span>
          )}
          <button
            onClick={fetchPipelineData}
            disabled={loading}
            className="px-3.5 py-1.5 rounded-lg bg-[#1c2b3c] hover:bg-[#2c3a4c] text-[#d4e4fa] text-xs font-semibold border border-[#273647] transition-colors flex items-center gap-1.5 disabled:opacity-50"
          >
            <span className={`material-symbols-outlined text-sm ${loading ? 'animate-spin text-[#4edea3]' : 'text-[#7bd0ff]'}`}>
              sync
            </span>
            <span>{loading ? 'Fetching URA...' : 'Refresh Feed'}</span>
          </button>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="py-16 px-4 flex flex-col items-center justify-center text-center bg-[#0d1c2d] rounded-xl border border-[#1c2b3c]">
          <div className="w-12 h-12 rounded-full border-2 border-[#1c2b3c] border-t-[#4edea3] animate-spin mb-4"></div>
          <h4 className="text-base font-bold text-[#d4e4fa] mb-1">
            Connecting to URA Data Service
          </h4>
          <p className="text-xs text-[#bbcabf] max-w-md">
            Querying <span className="text-[#7bd0ff] font-mono">service=PMI_Resi_Pipeline</span> via serverless route <span className="text-[#4edea3] font-mono">/api/pipeline</span>...
          </p>
        </div>
      )}

      {/* Sub-goal 3: Plain Words Message when Refused, Key Empty, Slow, or Error (Zero invented data) */}
      {!loading && errorStatus && (
        <div className="bg-[#0d1c2d] border border-[#ffb4ab]/30 rounded-xl p-6 flex flex-col sm:flex-row items-start gap-4">
          <div className="p-3 rounded-xl bg-[#ffb4ab]/10 text-[#ffb4ab] shrink-0 border border-[#ffb4ab]/20">
            <span className="material-symbols-outlined text-2xl">
              {errorCode === 'KEY_NOT_CONFIGURED' ? 'vpn_key_off' : errorCode === 'REQUEST_TIMEOUT' ? 'hourglass_disabled' : 'cloud_off'}
            </span>
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-[#ffb4ab]/15 text-[#ffb4ab] border border-[#ffb4ab]/30">
                {errorCode || 'API_NOTICE'}
              </span>
              <h3 className="text-base font-bold text-[#d4e4fa]">
                {errorCode === 'KEY_NOT_CONFIGURED'
                  ? 'URA Access Key Not Configured'
                  : errorCode === 'REQUEST_TIMEOUT'
                  ? 'URA Service Request Timed Out'
                  : 'URA Pipeline Service Notice'}
              </h3>
            </div>
            
            <p className="text-sm text-[#bbcabf] leading-relaxed">
              {errorStatus}
            </p>

            {errorCode === 'KEY_NOT_CONFIGURED' && (
              <div className="mt-2 p-3 rounded-lg bg-[#122131] border border-[#1c2b3c] text-xs text-[#bbcabf] space-y-1.5">
                <p className="font-semibold text-[#d4e4fa] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm text-[#7bd0ff]">info</span>
                  How to configure live URA Data Service keys:
                </p>
                <p>
                  1. Obtain a daily API key & user token from the{' '}
                  <span className="text-[#7bd0ff] font-medium">Urban Redevelopment Authority (URA) DataService Portal</span>.
                </p>
                <p>
                  2. Set <code className="bg-[#051424] px-1 py-0.5 rounded text-[#4edea3]">URA_ACCESS_KEY</code> and optional <code className="bg-[#051424] px-1 py-0.5 rounded text-[#4edea3]">URA_USER_TOKEN</code> in your environment variables.
                </p>
                <p className="text-[11px] text-[#86948a] italic">
                  Note: In compliance with strict integrity guardrails, PropPulse never invents simulated pipeline rows when live keys are unconfigured or upstream requests fail.
                </p>
              </div>
            )}

            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={fetchPipelineData}
                className="px-4 py-2 rounded-lg bg-[#1c2b3c] hover:bg-[#2c3a4c] text-[#d4e4fa] text-xs font-semibold border border-[#273647] transition-colors flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-sm">replay</span>
                Retry URA Connection
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sub-goal 3: Plain Words Message when Empty response (Zero rows returned) */}
      {!loading && !errorStatus && projects.length === 0 && (
        <div className="py-12 px-4 flex flex-col items-center justify-center text-center bg-[#0d1c2d] rounded-xl border border-[#1c2b3c]">
          <span className="material-symbols-outlined text-4xl text-[#86948a] mb-2">
            inventory_2
          </span>
          <h4 className="text-base font-bold text-[#d4e4fa] mb-1">
            No pipeline projects returned
          </h4>
          <p className="text-xs text-[#bbcabf] max-w-md">
            The URA PMI_Resi_Pipeline service returned an empty list of uncompleted residential projects for this query window.
          </p>
          <button
            onClick={fetchPipelineData}
            className="mt-4 px-3.5 py-1.5 rounded-lg bg-[#1c2b3c] text-xs text-[#d4e4fa] font-semibold"
          >
            Check Again
          </button>
        </div>
      )}

      {/* When live data is returned successfully */}
      {!loading && !errorStatus && projects.length > 0 && (
        <div className="flex flex-col gap-4">
          {/* Filter & Search Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
              {['all', 'D03', 'D05', 'D10', 'D15', 'D16', 'D19'].map((dist) => (
                <button
                  key={dist}
                  onClick={() => setFilterDistrict(dist)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    filterDistrict === dist
                      ? 'bg-[#1c2b3c] text-[#4edea3] border border-[#4edea3]/40'
                      : 'bg-[#0d1c2d] text-[#bbcabf] hover:bg-[#1c2b3c] border border-[#1c2b3c]'
                  }`}
                >
                  {dist === 'all' ? `All (${projects.length})` : dist}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-64">
              <span className="material-symbols-outlined absolute left-2.5 top-2.5 text-[#86948a] text-sm pointer-events-none">
                search
              </span>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search live project or developer..."
                className="w-full bg-[#0d1c2d] border border-[#1c2b3c] rounded-lg h-9 pl-8 pr-3 text-xs text-[#d4e4fa] outline-none focus:border-[#4edea3]"
              />
            </div>
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block w-full overflow-x-auto rounded-xl border border-[#1c2b3c]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#0d1c2d] text-[#86948a] text-[11px] font-semibold uppercase tracking-wider border-b border-[#1c2b3c]">
                  <th className="py-3 px-4">Project & Location</th>
                  <th className="py-3 px-4">Developer</th>
                  <th className="py-3 px-4">District</th>
                  <th className="py-3 px-4 text-right">Total Units</th>
                  <th className="py-3 px-4 text-center">Expected TOP</th>
                  <th className="py-3 px-4 text-center">Developer Promotion</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1c2b3c] text-xs">
                {filteredProjects.map((item, idx) => (
                  <tr key={idx} className="hover:bg-[#1c2b3c]/50 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-bold text-[#d4e4fa]">
                        {item.project || item.name || 'Private Residential Site'}
                      </div>
                      <div className="text-[11px] text-[#bbcabf]">
                        {item.street || item.location || 'Singapore'}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-[#bbcabf]">
                      {item.developer || 'Pending Tender Award'}
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded bg-[#273647] text-[#d4e4fa] font-mono font-semibold text-[11px]">
                        {item.district || 'D--'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right font-bold text-[#d4e4fa]">
                      {item.totUnits ? Number(item.totUnits).toLocaleString() : '—'}
                    </td>
                    <td className="py-3 px-4 text-center text-[#bbcabf]">
                      {item.expectedVacantPossessionDate || 'TBD'}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => onBookViewing(item.project || 'Pipeline Project', item.developer || 'Developer Consortium')}
                        className="px-3 py-1.5 rounded-lg bg-[#4edea3]/10 hover:bg-[#4edea3] text-[#4edea3] hover:text-[#003824] font-semibold text-xs transition-colors border border-[#4edea3]/30"
                      >
                        Book VIP Preview
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View (Sub-goal 1: Works on a phone!) */}
          <div className="md:hidden flex flex-col gap-3">
            {filteredProjects.map((item, idx) => (
              <div key={idx} className="bg-[#0d1c2d] border border-[#1c2b3c] p-4 rounded-xl flex flex-col gap-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-[#d4e4fa]">
                      {item.project || item.name || 'Private Residential Site'}
                    </h4>
                    <p className="text-xs text-[#bbcabf] mt-0.5">
                      {item.street || item.location || 'Singapore'}
                    </p>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-[#273647] text-[#7bd0ff] font-mono font-semibold text-xs">
                    {item.district || 'D--'}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs bg-[#122131] p-2.5 rounded-lg">
                  <div>
                    <span className="text-[10px] text-[#86948a] uppercase block">Developer</span>
                    <span className="text-[#d4e4fa] font-medium truncate block">{item.developer || 'Tender Award'}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#86948a] uppercase block">Units</span>
                    <span className="text-[#d4e4fa] font-bold">{item.totUnits || '—'}</span>
                  </div>
                </div>

                <button
                  onClick={() => onBookViewing(item.project || 'Pipeline Project', item.developer || 'Developer Consortium')}
                  className="w-full py-2 rounded-lg bg-[#4edea3] text-[#003824] text-xs font-bold flex items-center justify-center gap-1.5 shadow"
                >
                  <span className="material-symbols-outlined text-sm">meeting_room</span>
                  Book Showroom Viewing
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
