import React, { useState } from 'react';
import { UPCOMING_LAUNCHES_RADAR } from '../data/mockData';

interface LaunchRadarViewProps {
  onBookViewing: (projectName: string, developer: string) => void;
  onSelectSiteInCalc: (name: string) => void;
}

export const LaunchRadarView: React.FC<LaunchRadarViewProps> = ({
  onBookViewing,
  onSelectSiteInCalc
}) => {
  const [filterStage, setFilterStage] = useState<string>('all');

  const filtered = UPCOMING_LAUNCHES_RADAR.filter(
    (item) => filterStage === 'all' || item.stage.toLowerCase().includes(filterStage.toLowerCase())
  );

  return (
    <div className="w-full max-w-[1600px] mx-auto px-4 lg:px-6 py-6 flex flex-col gap-6">
      {/* View Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0d1c2d] p-6 rounded-xl border border-[#1c2b3c]">
        <div>
          <div className="flex items-center gap-2 text-[#4edea3] text-xs font-bold uppercase tracking-wider mb-1">
            <span className="material-symbols-outlined text-base">radar</span>
            2025–2026 Singapore New Condo Launch Radar
          </div>
          <h2 className="text-xl sm:text-3xl font-bold text-[#d4e4fa]">
            Upcoming Residential Project Previews & Showrooms
          </h2>
          <p className="text-xs sm:text-sm text-[#bbcabf] mt-1 max-w-2xl">
            Track unreleased and preview-stage private condominiums across Singapore. Connect directly with appointed developer sales suites before public balloting.
          </p>
        </div>

        {/* Filter by stage */}
        <div className="flex flex-wrap items-center gap-1.5 self-start md:self-auto">
          {['all', 'Design & Planning', 'Showflat Construction', 'Pre-Marketing'].map((stage) => (
            <button
              key={stage}
              onClick={() => setFilterStage(stage)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                filterStage === stage
                  ? 'bg-[#1c2b3c] text-[#4edea3] border border-[#4edea3]/40'
                  : 'bg-[#122131] text-[#bbcabf] hover:bg-[#1c2b3c] border border-[#1c2b3c]'
              }`}
            >
              {stage === 'all' ? 'All Stages' : stage}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Launches */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((item, idx) => (
          <div
            key={idx}
            className="bg-[#122131] border border-[#1c2b3c] rounded-xl p-5 shadow-lg flex flex-col justify-between gap-4 hover:border-[#4edea3]/40 transition-colors group"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="px-2 py-0.5 rounded bg-[#273647] text-[#7bd0ff] font-bold text-[11px] border border-[#3c4a42]/40">
                  {item.district}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#4edea3]/10 text-[#4edea3] text-[10px] font-bold uppercase border border-[#4edea3]/20">
                  {item.stage}
                </span>
              </div>

              <h3 className="text-base font-bold text-[#d4e4fa] group-hover:text-[#4edea3] transition-colors">
                {item.name}
              </h3>
              <p className="text-xs text-[#bbcabf] mt-0.5">Developer: {item.developer}</p>

              <div className="grid grid-cols-2 gap-2 my-3 p-2.5 rounded-lg bg-[#0d1c2d] border border-[#1c2b3c] text-xs">
                <div>
                  <span className="text-[10px] text-[#86948a] uppercase block">Total Units</span>
                  <span className="font-bold text-[#d4e4fa]">{item.units} residences</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#86948a] uppercase block">Indicative Price</span>
                  <span className="font-bold text-[#4edea3]">{item.estPsf}</span>
                </div>
              </div>

              <p className="text-xs text-[#bbcabf] leading-relaxed">
                {item.highlight}
              </p>
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-[#1c2b3c]">
              <button
                onClick={() => onSelectSiteInCalc(item.name)}
                className="flex-1 py-2 rounded-lg bg-[#1c2b3c] hover:bg-[#2c3a4c] text-xs font-semibold text-[#7bd0ff] transition-colors flex items-center justify-center gap-1"
              >
                <span className="material-symbols-outlined text-sm">calculate</span>
                Pricing Model
              </button>
              <button
                onClick={() => onBookViewing(item.name, item.developer)}
                className="flex-1 py-2 rounded-lg bg-[#4edea3] hover:bg-[#10b981] text-[#003824] text-xs font-bold transition-colors flex items-center justify-center gap-1 shadow"
              >
                <span className="material-symbols-outlined text-sm">meeting_room</span>
                VIP Pass
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
