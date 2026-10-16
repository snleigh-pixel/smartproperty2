import React, { useState, useEffect } from 'react';
import { GLS_SITES, UPCOMING_LAUNCHES_RADAR } from '../data/mockData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSite: (landPsf: number, siteName: string) => void;
  onBookViewing: (projectName: string, developer: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectSite,
  onBookViewing
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredGls = GLS_SITES.filter(
    (s) =>
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.district.toLowerCase().includes(query.toLowerCase()) ||
      s.mrt.toLowerCase().includes(query.toLowerCase()) ||
      s.developer.toLowerCase().includes(query.toLowerCase())
  );

  const filteredUpcoming = UPCOMING_LAUNCHES_RADAR.filter(
    (u) =>
      u.name.toLowerCase().includes(query.toLowerCase()) ||
      u.district.toLowerCase().includes(query.toLowerCase()) ||
      u.developer.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
      <div className="bg-[#122131] border border-[#273647] rounded-xl max-w-2xl w-full shadow-2xl overflow-hidden flex flex-col">
        {/* Search Input */}
        <div className="p-4 border-b border-[#1c2b3c] flex items-center gap-3">
          <span className="material-symbols-outlined text-[#4edea3] text-xl">search</span>
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search condo name, MRT, developer, or district (e.g., Zion, D10, UOL, Havelock)..."
            className="flex-1 bg-transparent text-[#d4e4fa] text-sm outline-none placeholder:text-[#86948a]"
          />
          <button
            onClick={onClose}
            className="px-2 py-1 rounded bg-[#1c2b3c] text-[#bbcabf] hover:text-[#d4e4fa] text-xs font-semibold"
          >
            ESC
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-4 flex flex-col gap-4">
          <div>
            <div className="text-[11px] font-bold text-[#86948a] uppercase tracking-wider mb-2">
              Government Land Sales (GLS) Sites ({filteredGls.length})
            </div>
            <div className="space-y-1.5">
              {filteredGls.map((site) => (
                <div
                  key={site.id}
                  className="p-3 rounded-lg bg-[#0d1c2d] hover:bg-[#1c2b3c] border border-[#1c2b3c] flex items-center justify-between transition-colors cursor-pointer group"
                  onClick={() => {
                    onSelectSite(site.landBidPsf, site.name);
                    onClose();
                  }}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#d4e4fa] group-hover:text-[#4edea3] transition-colors">
                        {site.name}
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-[#273647] text-[#7bd0ff] text-[10px] font-bold">
                        {site.district}
                      </span>
                    </div>
                    <div className="text-[11px] text-[#bbcabf] mt-0.5">
                      {site.mrt} • Developer: {site.developer}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-[#4edea3] block">
                      ${site.landBidPsf} psf ppr
                    </span>
                    <span className="text-[10px] text-[#86948a]">
                      Calc Fair Value: ${site.indicativeLaunchMin} - ${site.indicativeLaunchMax}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="text-[11px] font-bold text-[#86948a] uppercase tracking-wider mb-2">
              Upcoming Condominium Launches ({filteredUpcoming.length})
            </div>
            <div className="space-y-1.5">
              {filteredUpcoming.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg bg-[#0d1c2d] hover:bg-[#1c2b3c] border border-[#1c2b3c] flex items-center justify-between transition-colors"
                >
                  <div>
                    <span className="text-xs font-bold text-[#d4e4fa]">{item.name}</span>
                    <p className="text-[11px] text-[#bbcabf]">{item.district} • {item.developer}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#7bd0ff]">{item.estPsf}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onBookViewing(item.name, item.developer);
                        onClose();
                      }}
                      className="px-2.5 py-1 rounded bg-[#4edea3] hover:bg-[#10b981] text-[#003824] text-[11px] font-bold"
                    >
                      VIP Pass
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
