import React, { useState } from 'react';

interface CalculatorProps {
  currentLandPsf: number;
  setCurrentLandPsf: (val: number) => void;
  selectedSiteName?: string;
  currency: 'SGD' | 'USD';
  unit: 'PSF' | 'PSM';
  onScrollToPipeline: () => void;
}

export const Calculator: React.FC<CalculatorProps> = ({
  currentLandPsf,
  setCurrentLandPsf,
  selectedSiteName,
  currency,
  unit,
  onScrollToPipeline
}) => {
  const [marginPct, setMarginPct] = useState<number>(18);
  const [constCost, setConstCost] = useState<number>(450);
  const [districtMultiplier, setDistrictMultiplier] = useState<number>(1.04);
  const [showCustomModal, setShowCustomModal] = useState<boolean>(false);
  const [customInput, setCustomInput] = useState<string>(currentLandPsf.toString());

  const staticFees = 250; // Legal, marketing, agency comms, showflat amortisation

  // Developer breakeven = Land + Construction & Financing + Fees & Marketing
  const breakeven = currentLandPsf + constCost + staticFees;

  // Fair launch pricing band calculation
  const lowerMargin = 1 + (marginPct - 2.5) / 100;
  const upperMargin = 1 + (marginPct + 2.5) / 100;

  const lowerFair = Math.round((breakeven * lowerMargin * districtMultiplier) / 10) * 10;
  const upperFair = Math.round((breakeven * upperMargin * districtMultiplier) / 10) * 10;

  const landPercentage = Math.round((currentLandPsf / (breakeven * (1 + marginPct / 100))) * 100);

  const currencySymbol = currency === 'SGD' ? '$' : 'US$';
  const unitLabel = unit.toLowerCase();

  const handleReset = () => {
    setCurrentLandPsf(1402);
    setMarginPct(18);
    setConstCost(450);
    setDistrictMultiplier(1.04);
  };

  const handleApplyCustom = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseInt(customInput, 10);
    if (!isNaN(val) && val >= 300 && val <= 4000) {
      setCurrentLandPsf(val);
      setShowCustomModal(false);
    }
  };

  return (
    <div className="bg-[#122131] border border-[#1c2b3c] rounded-xl p-4 sm:p-6 shadow-xl relative overflow-hidden flex flex-col gap-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#1c2b3c]">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-[#1c2b3c] text-[#4edea3] flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-2xl">calculate</span>
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-[#d4e4fa]">
              Interactive Land-to-Launch Pricing Model
            </h2>
            <p className="text-xs text-[#bbcabf]">
              Deconstruct developer balance sheets: from tender bid to indicative public launch bracket
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="px-2.5 py-1 rounded bg-[#273647] text-[#7bd0ff] text-[11px] font-semibold flex items-center gap-1 border border-[#3c4a42]/40">
            <span className="material-symbols-outlined text-xs">verified</span>
            PropPulse Proprietary Algo v4.8
          </span>
          <button
            onClick={handleReset}
            className="px-2.5 py-1 rounded bg-[#1c2b3c] hover:bg-[#2c3a4c] text-[#bbcabf] hover:text-[#d4e4fa] text-[11px] font-semibold transition-colors border border-[#273647]"
          >
            Reset Base
          </button>
        </div>
      </div>

      {selectedSiteName && (
        <div className="px-3 py-1.5 rounded-lg bg-[#4edea3]/10 border border-[#4edea3]/30 flex items-center justify-between">
          <span className="text-xs text-[#d4e4fa]">
            Active Loaded Parcel: <strong className="text-[#4edea3]">{selectedSiteName}</strong>
          </span>
          <button
            onClick={handleReset}
            className="text-[11px] text-[#bbcabf] hover:text-[#d4e4fa] underline"
          >
            Clear
          </button>
        </div>
      )}

      {/* Formula 4-Step Breakdown Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {/* Step 1: Land Cost */}
        <div className="bg-[#0d1c2d] border border-[#1c2b3c] p-3.5 rounded-xl flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#86948a] text-[10px] font-semibold uppercase tracking-wider mb-2">
            <span>01. Land Cost</span>
            <span className="text-[#7bd0ff]">{unit} PPR</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-xl sm:text-2xl font-bold text-[#d4e4fa]">
              {currencySymbol}{currentLandPsf.toLocaleString()}
            </span>
            <span className="text-xs text-[#bbcabf]">{unitLabel}</span>
          </div>
          <div className="mt-2 text-[#bbcabf] text-[11px] flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7bd0ff]"></span>
            <span>{landPercentage}% of total launch</span>
          </div>
        </div>

        {/* Step 2: Construction & Financing */}
        <div className="bg-[#0d1c2d] border border-[#1c2b3c] p-3.5 rounded-xl flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#86948a] text-[10px] font-semibold uppercase tracking-wider mb-2">
            <span>02. Const. & Fin.</span>
            <span className="text-[#bec6e0]">BCA Index</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-xl sm:text-2xl font-bold text-[#d4e4fa]">
              {currencySymbol}{constCost.toLocaleString()}
            </span>
            <span className="text-xs text-[#bbcabf]">{unitLabel}</span>
          </div>
          <div className="mt-2 text-[#bbcabf] text-[11px] flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#bec6e0]"></span>
            <span className="truncate">Prelims + M&E + SORA hedge</span>
          </div>
        </div>

        {/* Step 3: Fees & Marketing */}
        <div className="bg-[#0d1c2d] border border-[#1c2b3c] p-3.5 rounded-xl flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#86948a] text-[10px] font-semibold uppercase tracking-wider mb-2">
            <span>03. Fees & Mktg</span>
            <span className="text-[#bec6e0]">Legal/Sales</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-xl sm:text-2xl font-bold text-[#d4e4fa]">
              {currencySymbol}{staticFees}
            </span>
            <span className="text-xs text-[#bbcabf]">{unitLabel}</span>
          </div>
          <div className="mt-2 text-[#bbcabf] text-[11px] flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#86948a]"></span>
            <span className="truncate">Agency comms + Showflat</span>
          </div>
        </div>

        {/* Step 4: Breakeven Base */}
        <div className="bg-[#1c2b3c] border border-[#273647] p-3.5 rounded-xl flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between text-[#4edea3] text-[10px] font-bold uppercase tracking-wider mb-2">
            <span>Total Breakeven</span>
            <span className="material-symbols-outlined text-xs">lock</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-xl sm:text-2xl font-bold text-[#4edea3]">
              {currencySymbol}{breakeven.toLocaleString()}
            </span>
            <span className="text-xs text-[#4edea3]/80">{unitLabel}</span>
          </div>
          <div className="mt-2 text-[#d4e4fa] text-[11px] font-medium">
            True cost floor for developer
          </div>
        </div>
      </div>

      {/* Sliders & Interactive Dynamic Controls (Optimized for Mobile Touch) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 bg-[#0d1c2d] p-4 sm:p-5 rounded-xl border border-[#1c2b3c]">
        {/* Slider 1: Target Margin % */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <label className="text-xs font-semibold text-[#d4e4fa] flex items-center gap-1">
              Target Margin %
              <span className="material-symbols-outlined text-[#86948a] text-xs" title="Developer gross profit margin">
                help_outline
              </span>
            </label>
            <span className="text-xs font-bold text-[#4edea3] bg-[#1c2b3c] px-2 py-0.5 rounded border border-[#273647]">
              {marginPct}%
            </span>
          </div>
          <input
            type="range"
            min={10}
            max={25}
            step={1}
            value={marginPct}
            onChange={(e) => setMarginPct(parseInt(e.target.value, 10))}
            className="w-full accent-[#4edea3] h-2 bg-[#273647] rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[#86948a] text-[10px] font-medium">
            <span>10% (Volume Play)</span>
            <span>25% (High Margin)</span>
          </div>
        </div>

        {/* Slider 2: Construction Cost Index */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <label className="text-xs font-semibold text-[#d4e4fa] flex items-center gap-1">
              Construction Cost (BCA)
              <span className="material-symbols-outlined text-[#86948a] text-xs" title="Based on BCA residential tender index">
                info
              </span>
            </label>
            <span className="text-xs font-bold text-[#7bd0ff] bg-[#1c2b3c] px-2 py-0.5 rounded border border-[#273647]">
              {currencySymbol}{constCost} {unitLabel}
            </span>
          </div>
          <input
            type="range"
            min={380}
            max={650}
            step={10}
            value={constCost}
            onChange={(e) => setConstCost(parseInt(e.target.value, 10))}
            className="w-full accent-[#7bd0ff] h-2 bg-[#273647] rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[#86948a] text-[10px] font-medium">
            <span>$380 (OCR Mid-Rise)</span>
            <span>$650 (CCR Luxury)</span>
          </div>
        </div>

        {/* District Tier & MRT Proximity Dropdown */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <label className="text-xs font-semibold text-[#d4e4fa]">
              District Tier & MRT Proximity
            </label>
            <span className="text-xs font-bold text-[#bbcabf] bg-[#1c2b3c] px-2 py-0.5 rounded border border-[#273647]">
              {districtMultiplier.toFixed(2)}x
            </span>
          </div>
          <select
            value={districtMultiplier}
            onChange={(e) => setDistrictMultiplier(parseFloat(e.target.value))}
            className="w-full bg-[#1c2b3c] border border-[#273647] text-[#d4e4fa] text-xs rounded-lg p-2.5 outline-none focus:border-[#4edea3]/60 cursor-pointer"
          >
            <option value={1.00}>OCR Standard (&gt;500m MRT) (1.00x)</option>
            <option value={1.04}>RCR Core / East Coast (1.04x)</option>
            <option value={1.10}>Rest of Central (Doorstep MRT) (1.10x)</option>
            <option value={1.18}>CCR Prime Prime (D09/10/04) (1.18x)</option>
          </select>
          <div className="flex justify-between text-[#86948a] text-[10px] font-medium">
            <span>Baseline</span>
            <span>Prime Benchmark</span>
          </div>
        </div>
      </div>

      {/* Dynamic Output Result Box */}
      <div className="p-4 sm:p-6 rounded-xl bg-gradient-to-r from-[#1c2b3c] via-[#273647] to-[#1c2b3c] border border-[#273647] flex flex-col md:flex-row items-center justify-between gap-5 shadow-lg">
        <div className="flex flex-col gap-1.5 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#4edea3] animate-pulse"></span>
            <span className="text-[11px] text-[#4edea3] uppercase font-bold tracking-widest">
              Calculated Launch Fair Value
            </span>
          </div>
          <div className="flex items-baseline justify-center md:justify-start gap-2">
            <span className="text-2xl sm:text-4xl font-extrabold text-[#d4e4fa] tracking-tight">
              {currencySymbol}{lowerFair.toLocaleString()} – {currencySymbol}{upperFair.toLocaleString()}
            </span>
            <span className="text-sm sm:text-base text-[#bbcabf] font-normal">{unitLabel}</span>
          </div>
          <p className="text-xs text-[#bbcabf] max-w-xl leading-relaxed">
            Showrooms opening with launch prices below{' '}
            <strong className="text-[#d4e4fa] font-bold">
              {currencySymbol}{lowerFair.toLocaleString()} {unitLabel}
            </strong>{' '}
            indicate immediate buyer upside; prices exceeding{' '}
            <strong className="text-[#d4e4fa] font-bold">
              {currencySymbol}{upperFair.toLocaleString()} {unitLabel}
            </strong>{' '}
            reflect aggressive developer pricing above market fundamentals.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-2.5 shrink-0 w-full md:w-auto">
          <button
            onClick={() => setShowCustomModal(true)}
            className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-[#122131] hover:bg-[#2c3a4c] text-[#d4e4fa] text-xs font-semibold border border-[#273647] transition-all flex items-center justify-center gap-1.5 shadow-sm"
          >
            <span className="material-symbols-outlined text-base text-[#7bd0ff]">tune</span>
            Custom Land Bid
          </button>
          <button
            onClick={onScrollToPipeline}
            className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-[#4edea3] hover:bg-[#10b981] text-[#003824] text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-md"
          >
            <span className="material-symbols-outlined text-base">table_chart</span>
            View Live Pipeline
          </button>
        </div>
      </div>

      {/* Custom Land Bid Modal */}
      {showCustomModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-[#122131] border border-[#273647] rounded-xl p-5 max-w-md w-full shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#1c2b3c] mb-4">
              <h3 className="text-base font-bold text-[#d4e4fa] flex items-center gap-2">
                <span className="material-symbols-outlined text-[#4edea3] text-xl">edit_note</span>
                Set Custom Land Bid
              </h3>
              <button
                onClick={() => setShowCustomModal(false)}
                className="text-[#bbcabf] hover:text-[#d4e4fa] p-1 rounded-lg"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>
            <form onSubmit={handleApplyCustom} className="flex flex-col gap-4">
              <div>
                <label className="text-xs font-semibold text-[#bbcabf] block mb-1.5">
                  Land Tender Bid ($ {unit} PPR)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-xs text-[#86948a] font-bold">
                    {currencySymbol}
                  </span>
                  <input
                    type="number"
                    min={300}
                    max={4000}
                    value={customInput}
                    onChange={(e) => setCustomInput(e.target.value)}
                    className="w-full bg-[#0d1c2d] border border-[#1c2b3c] rounded-lg h-10 pl-8 pr-3 text-sm text-[#d4e4fa] outline-none focus:border-[#4edea3]"
                    placeholder="e.g. 1350"
                    required
                  />
                </div>
                <p className="text-[11px] text-[#86948a] mt-1.5">
                  Typical Singapore GLS tenders range between $650 (OCR) and $1,600+ (CCR) psf ppr.
                </p>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCustomModal(false)}
                  className="px-3.5 py-2 rounded-lg bg-[#1c2b3c] text-[#bbcabf] text-xs font-semibold hover:text-[#d4e4fa]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#4edea3] text-[#003824] text-xs font-bold hover:bg-[#10b981]"
                >
                  Apply to Calculator
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
