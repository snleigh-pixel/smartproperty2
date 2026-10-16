import React, { useState } from 'react';

interface DossierModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DossierModal: React.FC<DossierModalProps> = ({ isOpen, onClose }) => {
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  if (!isOpen) return null;

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 4000);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="bg-[#122131] border border-[#273647] rounded-xl max-w-2xl w-full shadow-2xl p-6 relative flex flex-col gap-4 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#bbcabf] hover:text-[#d4e4fa] p-1 rounded-lg"
        >
          <span className="material-symbols-outlined text-xl">close</span>
        </button>

        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-[#7bd0ff]/10 text-[#7bd0ff] border border-[#7bd0ff]/30">
            <span className="material-symbols-outlined text-2xl">menu_book</span>
          </div>
          <div>
            <span className="text-[10px] font-bold text-[#7bd0ff] uppercase tracking-wider block">
              PropPulse Institutional Research
            </span>
            <h3 className="text-lg font-bold text-[#d4e4fa]">
              2025 Singapore GLS Feasibility & Land Cost Dossier
            </h3>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#0d1c2d] border border-[#1c2b3c] space-y-3">
          <div className="flex items-center justify-between text-xs pb-2 border-b border-[#1c2b3c]">
            <span className="text-[#bbcabf]">Publication Standard</span>
            <span className="text-[#4edea3] font-bold">H2 2024 / 2025 Institutional Edition</span>
          </div>
          <div className="flex items-center justify-between text-xs pb-2 border-b border-[#1c2b3c]">
            <span className="text-[#bbcabf]">Coverage Scope</span>
            <span className="text-[#d4e4fa]">14 Active GLS Confirmed Sites + 8 Reserve List Parcels</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#bbcabf]">Analytical Modeling</span>
            <span className="text-[#d4e4fa]">Monte Carlo IRR & Sensitivity to SORA Rates (3.2% - 4.5%)</span>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-xs font-bold text-[#d4e4fa] uppercase tracking-wider">
            Report Sections Included:
          </h4>
          <ul className="text-xs text-[#bbcabf] space-y-1.5 list-disc list-inside">
            <li>Macro Overview: URA Master Plan 2025 Residential Quota Allocation</li>
            <li>Developer Cost Stack: Construction BCA Index vs Material Price Inflation</li>
            <li>ABSD (Additional Buyer Stamp Duty) Developer 5-Year Remission Risk Analysis</li>
            <li>Parcel-by-Parcel Breakeven Pricing Matrix for Zion Road, Holland Drive & Bayshore</li>
            <li>Unit-Mix Yield Expectations (1BR to 4BR Penthouse absorption forecasts)</li>
          </ul>
        </div>

        {downloaded && (
          <div className="p-3 bg-[#4edea3]/15 border border-[#4edea3]/40 rounded-lg text-xs text-[#4edea3] flex items-center gap-2">
            <span className="material-symbols-outlined text-base">check_circle</span>
            <span>PropPulse_2025_GLS_Feasibility_Dossier.pdf has been dispatched to your download queue!</span>
          </div>
        )}

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#1c2b3c]">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-[#1c2b3c] text-xs font-semibold text-[#bbcabf] hover:text-[#d4e4fa]"
          >
            Close
          </button>
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="px-5 py-2 rounded-lg bg-[#7bd0ff] hover:bg-[#52c1fa] text-[#00354a] text-xs font-bold transition-all flex items-center gap-2 shadow"
          >
            {downloading ? (
              <>
                <span className="material-symbols-outlined text-sm animate-spin">sync</span>
                <span>Generating PDF...</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-sm">download</span>
                <span>Download Complete Dossier</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
