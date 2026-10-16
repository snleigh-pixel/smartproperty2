import React, { useState } from 'react';
import { GLS_SITES } from '../data/mockData';

interface ComparativeMatrixViewProps {
  onLoadSite: (landPsf: number, siteName: string) => void;
  onBookViewing: (projectName: string, developer: string) => void;
}

export const ComparativeMatrixView: React.FC<ComparativeMatrixViewProps> = ({
  onLoadSite,
  onBookViewing
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([
    'zion-road-a',
    'holland-drive',
    'bayshore-road'
  ]);

  const toggleSite = (id: string) => {
    if (selectedIds.includes(id)) {
      if (selectedIds.length > 1) {
        setSelectedIds(selectedIds.filter((item) => item !== id));
      }
    } else {
      if (selectedIds.length < 4) {
        setSelectedIds([...selectedIds, id]);
      }
    }
  };

  const comparedSites = GLS_SITES.filter((s) => selectedIds.includes(s.id));

  return (
    <div className="w-full max-w-[1600px] mx-auto px-4 lg:px-6 py-6 flex flex-col gap-6">
      {/* Header */}
      <div className="bg-[#0d1c2d] p-6 rounded-xl border border-[#1c2b3c] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[#4edea3] text-xs font-bold uppercase tracking-wider mb-1">
            <span className="material-symbols-outlined text-base">view_column</span>
            Multi-Parcel Analytical Matrix
          </div>
          <h2 className="text-xl sm:text-3xl font-bold text-[#d4e4fa]">
            Side-by-Side Government Land Sales Comparison
          </h2>
          <p className="text-xs sm:text-sm text-[#bbcabf] mt-1">
            Compare land acquisition pricing, developer cost structures, and projected launch yields across Singapore districts.
          </p>
        </div>

        {/* Site Selector Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {GLS_SITES.slice(0, 5).map((site) => {
            const isSelected = selectedIds.includes(site.id);
            return (
              <button
                key={site.id}
                onClick={() => toggleSite(site.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                  isSelected
                    ? 'bg-[#1c2b3c] text-[#4edea3] border-[#4edea3]/40'
                    : 'bg-[#122131] text-[#bbcabf] border-[#1c2b3c] hover:bg-[#1c2b3c]'
                }`}
              >
                {isSelected ? '✓ ' : '+ '}
                {site.name.split(' ')[0]} ({site.district})
              </button>
            );
          })}
        </div>
      </div>

      {/* Comparison Grid */}
      <div className="w-full overflow-x-auto rounded-xl border border-[#1c2b3c]">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="bg-[#0d1c2d] text-[#86948a] text-xs uppercase font-semibold border-b border-[#1c2b3c]">
              <th className="py-4 px-4 w-48">Metric / Parameter</th>
              {comparedSites.map((site) => (
                <th key={site.id} className="py-4 px-4 text-center">
                  <div className="text-sm font-bold text-[#d4e4fa]">{site.name}</div>
                  <span className="px-2 py-0.5 rounded bg-[#1c2b3c] text-[#7bd0ff] text-[10px] font-mono mt-1 inline-block">
                    {site.district} • {site.region}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1c2b3c] text-xs">
            <tr>
              <td className="py-3 px-4 font-semibold text-[#bbcabf] bg-[#0d1c2d]/50">
                Land Tender Bid (PSF PPR)
              </td>
              {comparedSites.map((site) => (
                <td key={site.id} className="py-3 px-4 text-center font-bold text-base text-[#d4e4fa]">
                  ${site.landBidPsf.toLocaleString()} psf
                </td>
              ))}
            </tr>

            <tr>
              <td className="py-3 px-4 font-semibold text-[#bbcabf] bg-[#0d1c2d]/50">
                Projected Developer Breakeven
              </td>
              {comparedSites.map((site) => (
                <td key={site.id} className="py-3 px-4 text-center font-bold text-base text-[#7bd0ff]">
                  ${site.estBreakevenPsf.toLocaleString()} psf
                </td>
              ))}
            </tr>

            <tr>
              <td className="py-3 px-4 font-semibold text-[#bbcabf] bg-[#0d1c2d]/50">
                PropPulse Indicative Launch
              </td>
              {comparedSites.map((site) => (
                <td key={site.id} className="py-3 px-4 text-center font-extrabold text-base text-[#4edea3] bg-[#4edea3]/5">
                  ${site.indicativeLaunchMin.toLocaleString()} – ${site.indicativeLaunchMax.toLocaleString()} psf
                </td>
              ))}
            </tr>

            <tr>
              <td className="py-3 px-4 font-semibold text-[#bbcabf] bg-[#0d1c2d]/50">
                Appointed Developer / Consortium
              </td>
              {comparedSites.map((site) => (
                <td key={site.id} className="py-3 px-4 text-center text-[#d4e4fa]">
                  {site.developer}
                </td>
              ))}
            </tr>

            <tr>
              <td className="py-3 px-4 font-semibold text-[#bbcabf] bg-[#0d1c2d]/50">
                Estimated Residential Units
              </td>
              {comparedSites.map((site) => (
                <td key={site.id} className="py-3 px-4 text-center text-[#d4e4fa] font-bold">
                  ~{site.estUnits.toLocaleString()} units
                </td>
              ))}
            </tr>

            <tr>
              <td className="py-3 px-4 font-semibold text-[#bbcabf] bg-[#0d1c2d]/50">
                Expected Launch Date
              </td>
              {comparedSites.map((site) => (
                <td key={site.id} className="py-3 px-4 text-center text-[#bbcabf]">
                  {site.expectedLaunch}
                </td>
              ))}
            </tr>

            <tr>
              <td className="py-3 px-4 font-semibold text-[#bbcabf] bg-[#0d1c2d]/50">
                Direct Developer Actions
              </td>
              {comparedSites.map((site) => (
                <td key={site.id} className="py-3 px-4 text-center">
                  <div className="flex flex-col gap-1.5 max-w-[180px] mx-auto">
                    <button
                      onClick={() => onLoadSite(site.landBidPsf, site.name)}
                      className="py-1.5 px-3 rounded-lg bg-[#1c2b3c] hover:bg-[#2c3a4c] text-[11px] font-semibold text-[#7bd0ff] transition-colors"
                    >
                      Load in Calculator
                    </button>
                    <button
                      onClick={() => onBookViewing(site.name, site.developer)}
                      className="py-1.5 px-3 rounded-lg bg-[#4edea3] hover:bg-[#10b981] text-[11px] font-bold text-[#003824] transition-colors"
                    >
                      Book VIP Preview
                    </button>
                  </div>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
