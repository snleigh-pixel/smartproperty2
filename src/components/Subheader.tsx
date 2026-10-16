import React from 'react';

interface SubheaderProps {
  activePipelineCount: number;
  pendingCount: number;
  currency: 'SGD' | 'USD';
  unit: 'PSF' | 'PSM';
}

export const Subheader: React.FC<SubheaderProps> = ({
  activePipelineCount = 14,
  pendingCount = 3,
  currency,
  unit
}) => {
  const currencySymbol = currency === 'SGD' ? '$' : 'US$';
  const unitLabel = unit.toLowerCase();

  return (
    <div className="w-full bg-[#0d1c2d] border-b border-[#1c2b3c] px-4 lg:px-6 py-6 md:py-8">
      <div className="max-w-[1600px] mx-auto flex flex-col xl:flex-row xl:items-end justify-between gap-6">
        <div className="flex flex-col gap-2 max-w-4xl">
          {/* Metadata badges strip */}
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-[#4edea3]/10 text-[#4edea3] text-[11px] font-semibold uppercase tracking-wider flex items-center gap-1.5 border border-[#4edea3]/20">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3] animate-ping"></span>
              URA Realis MLS Live Feed Connected
            </span>
            <span className="px-2.5 py-0.5 rounded bg-[#1c2b3c] text-[#bbcabf] text-[11px] font-medium border border-[#273647]">
              H1/H2 2024–2025 GLS Radar
            </span>
            <span className="text-[#86948a] text-[11px] font-medium">
              ● Model Version 4.8.2
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-[40px] font-bold text-[#d4e4fa] tracking-tight leading-tight">
            PropPulse Indicative Launch Pricing Engine
          </h1>
          <p className="text-sm sm:text-base text-[#bbcabf] leading-relaxed max-w-3xl">
            Algorithmic Developer Breakeven & Fair Launch Value Calculator powered by URA Government Land Sales (GLS) & En-Bloc tender data. Remove pricing opacity before showroom previews open.
          </p>
        </div>

        {/* Quick Summary Stats Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full xl:w-auto">
          {/* Stat 1 */}
          <div className="bg-[#122131] border border-[#1c2b3c] p-4 rounded-xl flex flex-col justify-between shadow-sm min-w-[160px]">
            <span className="text-[11px] font-semibold text-[#bbcabf] uppercase tracking-wide">
              Active GLS Pipeline
            </span>
            <div className="flex items-baseline gap-1.5 mt-1.5">
              <span className="text-2xl font-bold text-[#d4e4fa]">{activePipelineCount}</span>
              <span className="text-[11px] font-semibold text-[#4edea3]">+{pendingCount} Tender Pending</span>
            </div>
            <span className="text-xs text-[#86948a] mt-1">~8,420 Residential Units</span>
          </div>

          {/* Stat 2 */}
          <div className="bg-[#122131] border border-[#1c2b3c] p-4 rounded-xl flex flex-col justify-between shadow-sm min-w-[160px]">
            <span className="text-[11px] font-semibold text-[#bbcabf] uppercase tracking-wide">
              Avg RCR Land Cost
            </span>
            <div className="flex items-baseline gap-1 mt-1.5">
              <span className="text-2xl font-bold text-[#7bd0ff]">
                {currencySymbol}1,294
              </span>
              <span className="text-[11px] text-[#bbcabf]">{unitLabel} ppr</span>
            </div>
            <span className="text-xs text-[#86948a] mt-1">+6.1% YoY land cost delta</span>
          </div>

          {/* Stat 3 */}
          <div className="col-span-2 sm:col-span-1 bg-[#122131] border border-[#1c2b3c] p-4 rounded-xl flex flex-col justify-between shadow-sm min-w-[160px]">
            <span className="text-[11px] font-semibold text-[#bbcabf] uppercase tracking-wide">
              Projected Breakeven Gap
            </span>
            <div className="flex items-baseline gap-1 mt-1.5">
              <span className="text-2xl font-bold text-[#4edea3]">
                +{currencySymbol}1,120
              </span>
              <span className="text-[11px] text-[#bbcabf]">{unitLabel}</span>
            </div>
            <span className="text-xs text-[#86948a] mt-1">Const. + Fin. + Mktg spread</span>
          </div>
        </div>
      </div>
    </div>
  );
};
