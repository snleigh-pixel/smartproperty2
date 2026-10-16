import React from 'react';
import { DISTRICT_BENCHMARKS } from '../data/mockData';

interface BenchmarkComparisonProps {
  currency: 'SGD' | 'USD';
  unit: 'PSF' | 'PSM';
}

export const BenchmarkComparison: React.FC<BenchmarkComparisonProps> = ({
  currency,
  unit
}) => {
  const currencySymbol = currency === 'SGD' ? '$' : 'US$';
  const unitLabel = unit.toLowerCase();

  return (
    <div className="w-full bg-[#122131] border border-[#1c2b3c] rounded-xl p-4 sm:p-6 shadow-xl flex flex-col gap-6">
      {/* Header and Legend */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-[#4edea3] text-xs uppercase font-bold tracking-wider mb-1">
            <span className="material-symbols-outlined text-base">bar_chart</span>
            Multi-Tier Benchmark Comparison
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-[#d4e4fa]">
            Historical Resale vs GLS Land Bid vs PropPulse Predicted vs Actual Launch PSF
          </h2>
          <p className="text-xs text-[#bbcabf]">
            Analyzing 5-year cyclical price transmission from government land auction to final transaction prices
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-3 bg-[#0d1c2d] px-3.5 py-2 rounded-lg border border-[#1c2b3c]">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-[#273647]"></span>
            <span className="text-[11px] text-[#bbcabf]">5-Yr Resale Avg</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-[#7bd0ff]"></span>
            <span className="text-[11px] text-[#bbcabf]">GLS Land Bid</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-[#4edea3]"></span>
            <span className="text-[11px] text-[#4edea3] font-semibold">PropPulse Predicted</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-[#dae2fd]"></span>
            <span className="text-[11px] text-[#bbcabf]">Actual Achieved</span>
          </div>
        </div>
      </div>

      {/* Visual Chart Bars (Scrollable on small mobile) */}
      <div className="w-full bg-[#010f1f] p-4 sm:p-6 rounded-xl border border-[#1c2b3c] overflow-x-auto">
        <div className="min-w-[620px] flex flex-col gap-6">
          {DISTRICT_BENCHMARKS.map((item, index) => {
            const resaleWidth = `${(item.resaleAvg / 3500) * 100}%`;
            const glsWidth = `${(item.glsLandBid / 3500) * 100}%`;
            const predWidth = `${(item.predictedLaunch / 3500) * 100}%`;
            const actWidth = `${(item.actualLaunch / 3500) * 100}%`;

            return (
              <div key={item.region} className="flex flex-col gap-2.5">
                {/* Region Heading */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-[#1c2b3c] text-[#d4e4fa] font-mono text-[11px] font-bold border border-[#273647]">
                      {item.region}
                    </span>
                    <span className="text-sm font-bold text-[#d4e4fa]">
                      {item.name} ({item.subDistricts})
                    </span>
                  </div>
                  <span className="text-xs font-bold text-[#4edea3] bg-[#4edea3]/10 px-2 py-0.5 rounded border border-[#4edea3]/20">
                    Model Accuracy: {item.accuracy}%
                  </span>
                </div>

                {/* Bars */}
                <div className="space-y-1.5">
                  {/* Resale */}
                  <div className="flex items-center gap-3">
                    <span className="w-36 text-[11px] text-[#bbcabf] truncate">5-Yr Resale Avg</span>
                    <div className="flex-1 bg-[#0d1c2d] h-6 rounded flex items-center pr-2">
                      <div
                        className="h-full bg-[#273647] rounded flex items-center justify-end px-2"
                        style={{ width: resaleWidth }}
                      >
                        <span className="text-[11px] font-bold text-[#d4e4fa]">
                          {currencySymbol}{item.resaleAvg.toLocaleString()} {unitLabel}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* GLS Land Bid */}
                  <div className="flex items-center gap-3">
                    <span className="w-36 text-[11px] text-[#bbcabf] truncate">GLS Land Bid</span>
                    <div className="flex-1 bg-[#0d1c2d] h-6 rounded flex items-center pr-2">
                      <div
                        className="h-full bg-[#7bd0ff] rounded flex items-center justify-end px-2"
                        style={{ width: glsWidth }}
                      >
                        <span className="text-[11px] font-bold text-[#00354a]">
                          {currencySymbol}{item.glsLandBid.toLocaleString()} {unitLabel}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Predicted Fair Launch */}
                  <div className="flex items-center gap-3">
                    <span className="w-36 text-[11px] text-[#4edea3] font-bold truncate">Predicted Fair Launch</span>
                    <div className="flex-1 bg-[#0d1c2d] h-6 rounded flex items-center pr-2">
                      <div
                        className="h-full bg-[#4edea3] rounded flex items-center justify-end px-2 shadow-sm"
                        style={{ width: predWidth }}
                      >
                        <span className="text-[11px] font-bold text-[#003824]">
                          {currencySymbol}{item.predictedLaunch.toLocaleString()} {unitLabel}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actual Launch */}
                  <div className="flex items-center gap-3">
                    <span className="w-36 text-[11px] text-[#bbcabf] truncate">Actual Launch</span>
                    <div className="flex-1 bg-[#0d1c2d] h-6 rounded flex items-center pr-2">
                      <div
                        className="h-full bg-[#dae2fd] rounded flex items-center justify-end px-2"
                        style={{ width: actWidth }}
                      >
                        <span className="text-[11px] font-bold text-[#131b2e]">
                          {currencySymbol}{item.actualLaunch.toLocaleString()} {unitLabel}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {index < DISTRICT_BENCHMARKS.length - 1 && (
                  <div className="w-full h-[1px] bg-[#1c2b3c] my-1"></div>
                )}
              </div>
            );
          })}

          {/* Scale Axis */}
          <div className="flex justify-between text-[11px] text-[#86948a] px-36 pt-2 border-t border-[#1c2b3c]">
            <span>$0 {unitLabel}</span>
            <span>$1,000 {unitLabel}</span>
            <span>$2,000 {unitLabel}</span>
            <span>$3,000 {unitLabel}</span>
            <span>$4,000+ {unitLabel}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
