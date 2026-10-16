import React, { useState } from 'react';

interface DeveloperAgentSuiteViewProps {
  inquiryCount: number;
}

export const DeveloperAgentSuiteView: React.FC<DeveloperAgentSuiteViewProps> = ({
  inquiryCount
}) => {
  // ABSD Calculator state
  const [residency, setResidency] = useState<'SC' | 'SPR' | 'FR'>('SC');
  const [propertyCount, setPropertyCount] = useState<number>(1);
  const [purchasePrice, setPurchasePrice] = useState<number>(2000000);

  // Compute ABSD rates according to official IRAS guidelines
  let absdRate = 0;
  if (residency === 'SC') {
    if (propertyCount === 1) absdRate = 0;
    else if (propertyCount === 2) absdRate = 20;
    else absdRate = 30;
  } else if (residency === 'SPR') {
    if (propertyCount === 1) absdRate = 5;
    else if (propertyCount === 2) absdRate = 30;
    else absdRate = 35;
  } else {
    // Foreigner
    absdRate = 60;
  }

  const absdAmount = (purchasePrice * absdRate) / 100;

  // Standard BSD (Buyer's Stamp Duty)
  const calculateBsd = (price: number) => {
    let bsd = 0;
    if (price <= 180000) bsd = price * 0.01;
    else if (price <= 360000) bsd = 1800 + (price - 180000) * 0.02;
    else if (price <= 1000000) bsd = 5400 + (price - 360000) * 0.03;
    else if (price <= 1500000) bsd = 24600 + (price - 1000000) * 0.04;
    else if (price <= 3000000) bsd = 44600 + (price - 1500000) * 0.05;
    else bsd = 119600 + (price - 3000000) * 0.06;
    return bsd;
  };

  const bsdAmount = calculateBsd(purchasePrice);
  const totalDuty = absdAmount + bsdAmount;

  return (
    <div className="w-full max-w-[1600px] mx-auto px-4 lg:px-6 py-6 flex flex-col gap-6">
      {/* Top Banner: Developer Conversion Analytics & ROI */}
      <div className="bg-[#0d1c2d] p-6 rounded-xl border border-[#1c2b3c] flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-[#4edea3] text-xs font-bold uppercase tracking-wider mb-1">
            <span className="material-symbols-outlined text-base">domain</span>
            Developer & Advisory Suite
          </div>
          <h2 className="text-xl sm:text-3xl font-bold text-[#d4e4fa]">
            Showroom Acquisition & Buyer Valuation Terminal
          </h2>
          <p className="text-xs sm:text-sm text-[#bbcabf] mt-1 max-w-2xl">
            Empower developer marketing teams to promote upcoming launches, capture high-intent buyer inquiries, and calculate real purchasing thresholds.
          </p>
        </div>

        {/* Developer Conversion Counter */}
        <div className="bg-[#122131] border border-[#273647] p-4 rounded-xl flex items-center gap-4 shrink-0 shadow-md">
          <div className="p-3 rounded-lg bg-[#4edea3]/10 text-[#4edea3]">
            <span className="material-symbols-outlined text-2xl">how_to_reg</span>
          </div>
          <div>
            <span className="text-[10px] text-[#86948a] font-bold uppercase block">
              Active Showroom Inquiries
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-[#4edea3]">{inquiryCount + 28}</span>
              <span className="text-xs text-[#bbcabf]">Verified Leads</span>
            </div>
            <span className="text-[10px] text-[#7bd0ff]">Bundle Pricing Conversion: 18.4%</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* ABSD & Stamp Duty Calculator (7 cols) */}
        <div className="lg:col-span-7 bg-[#122131] border border-[#1c2b3c] rounded-xl p-5 sm:p-6 shadow-xl flex flex-col gap-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#1c2b3c]">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-[#1c2b3c] text-[#7bd0ff]">
                <span className="material-symbols-outlined text-xl">account_balance</span>
              </div>
              <div>
                <h3 className="text-base font-bold text-[#d4e4fa]">
                  Singapore Stamp Duty (ABSD + BSD) Calculator
                </h3>
                <p className="text-xs text-[#bbcabf]">Updated to latest 2024–2025 IRAS cooling measure rates</p>
              </div>
            </div>
          </div>

          {/* Form Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-[#bbcabf] block mb-1.5">
                Buyer Residency Status
              </label>
              <select
                value={residency}
                onChange={(e) => setResidency(e.target.value as any)}
                className="w-full bg-[#0d1c2d] border border-[#1c2b3c] text-[#d4e4fa] text-xs rounded-lg p-2.5 outline-none focus:border-[#4edea3]"
              >
                <option value="SC">Singapore Citizen (SC)</option>
                <option value="SPR">Singapore Permanent Resident (SPR)</option>
                <option value="FR">Foreigner / Entity (FR)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#bbcabf] block mb-1.5">
                Property Count (Including this purchase)
              </label>
              <select
                value={propertyCount}
                onChange={(e) => setPropertyCount(parseInt(e.target.value, 10))}
                className="w-full bg-[#0d1c2d] border border-[#1c2b3c] text-[#d4e4fa] text-xs rounded-lg p-2.5 outline-none focus:border-[#4edea3]"
              >
                <option value={1}>1st Residential Property</option>
                <option value={2}>2nd Residential Property</option>
                <option value={3}>3rd or Subsequent Property</option>
              </select>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-semibold text-[#bbcabf]">
                Purchase Price (SGD)
              </label>
              <span className="text-xs font-bold text-[#4edea3]">
                ${purchasePrice.toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min={800000}
              max={6000000}
              step={50000}
              value={purchasePrice}
              onChange={(e) => setPurchasePrice(parseInt(e.target.value, 10))}
              className="w-full accent-[#4edea3] h-2 bg-[#273647] rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[#86948a] text-[10px] mt-1">
              <span>$800k (Entry 1BR)</span>
              <span>$2.5M (Core 3BR)</span>
              <span>$6M+ (Luxury Penthouse)</span>
            </div>
          </div>

          {/* Results Summary Box */}
          <div className="p-4 rounded-xl bg-[#0d1c2d] border border-[#1c2b3c] grid grid-cols-3 gap-3 text-center">
            <div>
              <span className="text-[10px] text-[#86948a] uppercase block">BSD Amount</span>
              <span className="text-sm sm:text-base font-bold text-[#d4e4fa]">
                ${Math.round(bsdAmount).toLocaleString()}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-[#86948a] uppercase block">
                ABSD ({absdRate}%)
              </span>
              <span className="text-sm sm:text-base font-bold text-[#ffb4ab]">
                ${Math.round(absdAmount).toLocaleString()}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-[#86948a] uppercase block">Total Stamp Duty</span>
              <span className="text-sm sm:text-base font-bold text-[#4edea3]">
                ${Math.round(totalDuty).toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Developer Project Promotion Bundle (5 cols) */}
        <div className="lg:col-span-5 bg-[#122131] border border-[#1c2b3c] rounded-xl p-5 sm:p-6 shadow-xl flex flex-col justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-[#4edea3] text-xs font-bold uppercase tracking-wider mb-1">
              <span className="material-symbols-outlined text-base">campaign</span>
              Developer Promotion Economics
            </div>
            <h3 className="text-base font-bold text-[#d4e4fa]">
              Launch Promotion & Showroom Pipeline
            </h3>
            <p className="text-xs text-[#bbcabf] mt-1 leading-relaxed">
              Developers subscribe to project-based bundle pricing to capture prospective buyer traffic during preview weeks:
            </p>

            <div className="space-y-2.5 mt-4">
              <div className="p-3 rounded-lg bg-[#0d1c2d] border border-[#1c2b3c] flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-[#d4e4fa]">Project Feature Spotlight</h4>
                  <p className="text-[11px] text-[#86948a]">Homepage banner & VIP preview priority</p>
                </div>
                <span className="px-2 py-0.5 rounded bg-[#4edea3]/10 text-[#4edea3] text-xs font-bold">
                  Active
                </span>
              </div>

              <div className="p-3 rounded-lg bg-[#0d1c2d] border border-[#1c2b3c] flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-[#d4e4fa]">Showroom RSVP Funnel</h4>
                  <p className="text-[11px] text-[#86948a]">Direct appointment confirmation to sales gallery</p>
                </div>
                <span className="px-2 py-0.5 rounded bg-[#4edea3]/10 text-[#4edea3] text-xs font-bold">
                  Enabled
                </span>
              </div>

              <div className="p-3 rounded-lg bg-[#0d1c2d] border border-[#1c2b3c] flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-[#d4e4fa]">Buyer Lead Notification</h4>
                  <p className="text-[11px] text-[#86948a]">Zero AI leaks; straight to project director</p>
                </div>
                <span className="px-2 py-0.5 rounded bg-[#7bd0ff]/10 text-[#7bd0ff] text-xs font-bold">
                  Instant
                </span>
              </div>
            </div>
          </div>

          <div className="p-3 bg-[#0d1c2d] border border-[#1c2b3c] rounded-lg text-xs text-[#bbcabf]">
            <span className="font-bold text-[#d4e4fa] block mb-0.5">Key Performance Indicator:</span>
            Conversion count of property hunters attending preview and submitting Expressions of Interest (EOI).
          </div>
        </div>
      </div>
    </div>
  );
};
