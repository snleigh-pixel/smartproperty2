import React from 'react';
import { GLS_SITES } from '../data/mockData';

interface ShortlistAlertsViewProps {
  shortlistIds: string[];
  onRemoveFromShortlist: (id: string) => void;
  onLoadSite: (landPsf: number, siteName: string) => void;
  onBookViewing: (projectName: string, developer: string) => void;
  onBrowseMore: () => void;
}

export const ShortlistAlertsView: React.FC<ShortlistAlertsViewProps> = ({
  shortlistIds,
  onRemoveFromShortlist,
  onLoadSite,
  onBookViewing,
  onBrowseMore
}) => {
  const shortlistedSites = GLS_SITES.filter((s) => shortlistIds.includes(s.id));

  return (
    <div className="w-full max-w-[1600px] mx-auto px-4 lg:px-6 py-6 flex flex-col gap-6">
      <div className="bg-[#0d1c2d] p-6 rounded-xl border border-[#1c2b3c] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[#4edea3] text-xs font-bold uppercase tracking-wider mb-1">
            <span className="material-symbols-outlined text-base">bookmark_heart</span>
            Buyer Watchlist & Threshold Triggers
          </div>
          <h2 className="text-xl sm:text-3xl font-bold text-[#d4e4fa]">
            My Shortlisted Parcels & Price Alerts
          </h2>
          <p className="text-xs sm:text-sm text-[#bbcabf] mt-1">
            Monitored Singapore residential developments with active indicative pricing alerts.
          </p>
        </div>

        <button
          onClick={onBrowseMore}
          className="px-4 py-2 rounded-lg bg-[#1c2b3c] hover:bg-[#2c3a4c] text-xs font-semibold text-[#4edea3] border border-[#273647] transition-colors self-start md:self-auto"
        >
          Browse All Sites
        </button>
      </div>

      {shortlistedSites.length === 0 ? (
        <div className="py-16 px-4 bg-[#122131] border border-[#1c2b3c] rounded-xl flex flex-col items-center justify-center text-center">
          <span className="material-symbols-outlined text-4xl text-[#86948a] mb-2">
            bookmark_border
          </span>
          <h3 className="text-base font-bold text-[#d4e4fa] mb-1">
            No developments currently shortlisted
          </h3>
          <p className="text-xs text-[#bbcabf] max-w-md mb-4">
            Add prime GLS parcels or upcoming condominium launches to track indicative developer breakevens and showroom dates.
          </p>
          <button
            onClick={onBrowseMore}
            className="px-5 py-2.5 rounded-lg bg-[#4edea3] hover:bg-[#10b981] text-[#003824] text-xs font-bold transition-all shadow"
          >
            Explore Land Sales Pipeline
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {shortlistedSites.map((site) => (
            <div
              key={site.id}
              className="bg-[#122131] border border-[#1c2b3c] rounded-xl p-5 shadow-lg flex flex-col justify-between gap-4"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-0.5 rounded bg-[#273647] text-[#7bd0ff] text-[11px] font-bold">
                    {site.district}
                  </span>
                  <button
                    onClick={() => onRemoveFromShortlist(site.id)}
                    className="text-[#86948a] hover:text-[#ffb4ab] text-xs p-1"
                    title="Remove from shortlist"
                  >
                    <span className="material-symbols-outlined text-base">delete</span>
                  </button>
                </div>

                <h3 className="text-base font-bold text-[#d4e4fa]">{site.name}</h3>
                <p className="text-xs text-[#bbcabf] mt-0.5">{site.developer}</p>

                <div className="grid grid-cols-2 gap-2 my-3 p-2.5 rounded-lg bg-[#0d1c2d] border border-[#1c2b3c] text-xs">
                  <div>
                    <span className="text-[10px] text-[#86948a] uppercase block">Land Tender Bid</span>
                    <span className="font-bold text-[#d4e4fa]">${site.landBidPsf} psf</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#86948a] uppercase block">Indicative Fair Value</span>
                    <span className="font-bold text-[#4edea3]">
                      ${site.indicativeLaunchMin} - ${site.indicativeLaunchMax}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-[11px] text-[#7bd0ff] bg-[#7bd0ff]/10 p-2 rounded border border-[#7bd0ff]/20">
                  <span className="material-symbols-outlined text-sm">notifications_active</span>
                  <span>Alert active for VIP showroom opening</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#1c2b3c]">
                <button
                  onClick={() => onLoadSite(site.landBidPsf, site.name)}
                  className="py-2 rounded-lg bg-[#1c2b3c] hover:bg-[#2c3a4c] text-xs font-semibold text-[#7bd0ff]"
                >
                  Simulate
                </button>
                <button
                  onClick={() => onBookViewing(site.name, site.developer)}
                  className="py-2 rounded-lg bg-[#4edea3] hover:bg-[#10b981] text-[#003824] text-xs font-bold"
                >
                  Book Preview
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
