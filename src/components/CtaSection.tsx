import React, { useState } from 'react';

interface CtaSectionProps {
  onOpenReportModal: () => void;
}

export const CtaSection: React.FC<CtaSectionProps> = ({ onOpenReportModal }) => {
  const [alertContact, setAlertContact] = useState('');
  const [alertSuccess, setAlertSuccess] = useState(false);

  const handleCreateAlert = (e: React.FormEvent) => {
    e.preventDefault();
    if (alertContact.trim()) {
      setAlertSuccess(true);
      setTimeout(() => setAlertSuccess(false), 5000);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {/* CTA 1: Price Alert Module */}
      <div className="bg-[#122131] border border-[#1c2b3c] rounded-xl p-5 sm:p-6 shadow-xl flex flex-col justify-between gap-4 relative overflow-hidden">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-[#4edea3]/10 text-[#4edea3] flex items-center justify-center border border-[#4edea3]/20">
              <span className="material-symbols-outlined text-2xl">add_alert</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#4edea3] uppercase tracking-wider block">
                Never Miss A Preview
              </span>
              <h3 className="text-base sm:text-lg font-bold text-[#d4e4fa]">
                Set Price Alert for GLS Tender Sites
              </h3>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded bg-[#1c2b3c] text-[#bbcabf] text-[10px] font-semibold border border-[#273647]">
            Instant SMS / Telegram
          </span>
        </div>

        <p className="text-xs sm:text-sm text-[#bbcabf] leading-relaxed">
          Receive notification the exact hour developer tenders close and when our algorithmic models produce the indicative launch price range before marketing agencies announce preview dates.
        </p>

        {alertSuccess ? (
          <div className="p-3 bg-[#4edea3]/15 border border-[#4edea3]/40 rounded-lg text-xs text-[#4edea3] flex items-center gap-2">
            <span className="material-symbols-outlined text-base">check_circle</span>
            <span>Subscribed to GLS Indicative Alerts for <strong>{alertContact}</strong>!</span>
          </div>
        ) : (
          <form onSubmit={handleCreateAlert} className="flex flex-col sm:flex-row gap-2 mt-1">
            <div className="relative flex-1">
              <span className="material-symbols-outlined absolute left-3 top-2.5 text-[#86948a] text-lg pointer-events-none">
                mail
              </span>
              <input
                type="text"
                required
                value={alertContact}
                onChange={(e) => setAlertContact(e.target.value)}
                placeholder="Enter work email or mobile number..."
                className="w-full h-10 pl-10 pr-3 rounded-lg bg-[#0d1c2d] border border-[#1c2b3c] text-[#d4e4fa] placeholder:text-[#86948a] text-xs focus:outline-none focus:border-[#4edea3]"
              />
            </div>
            <button
              type="submit"
              className="h-10 px-5 rounded-lg bg-[#4edea3] hover:bg-[#10b981] text-[#003824] text-xs font-bold transition-all flex items-center justify-center gap-1.5 shrink-0 shadow"
            >
              <span>Create Alert</span>
              <span className="material-symbols-outlined text-base">send</span>
            </button>
          </form>
        )}

        <div className="flex items-center gap-4 text-[11px] text-[#86948a]">
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-sm text-[#4edea3]">check_circle</span>
            Zero spam
          </span>
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-sm text-[#4edea3]">check_circle</span>
            Singapore URA real-time sync
          </span>
        </div>
      </div>

      {/* CTA 2: Detailed Feasibility Report Download */}
      <div className="bg-[#122131] border border-[#1c2b3c] rounded-xl p-5 sm:p-6 shadow-xl flex flex-col justify-between gap-4 relative overflow-hidden">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-[#7bd0ff]/10 text-[#7bd0ff] flex items-center justify-center border border-[#7bd0ff]/20">
              <span className="material-symbols-outlined text-2xl">picture_as_pdf</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#7bd0ff] uppercase tracking-wider block">
                Institutional Grade Advisory
              </span>
              <h3 className="text-base sm:text-lg font-bold text-[#d4e4fa]">
                Financial Feasibility Report (PDF)
              </h3>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded bg-[#1c2b3c] text-[#bbcabf] text-[10px] font-semibold border border-[#273647]">
            38 Pages • H2 2024 Edition
          </span>
        </div>

        <p className="text-xs sm:text-sm text-[#bbcabf] leading-relaxed">
          Complete cash-flow projections, ABSD developer tax impact matrices, en-bloc replacement supply forecasting, and unit-mix profitability breakdowns for all 2025 GLS parcels.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-2.5 mt-1">
          <button
            onClick={onOpenReportModal}
            className="w-full sm:flex-1 h-10 px-4 rounded-lg bg-[#1c2b3c] hover:bg-[#2c3a4c] text-[#d4e4fa] text-xs font-bold border border-[#273647] transition-colors flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-base text-[#7bd0ff]">download</span>
            <span>Download Sample GLS Dossier</span>
          </button>
          <button
            onClick={onOpenReportModal}
            className="w-full sm:w-auto h-10 px-4 rounded-lg bg-[#7bd0ff] hover:bg-[#52c1fa] text-[#00354a] text-xs font-bold transition-all flex items-center justify-center gap-1.5 shrink-0"
          >
            <span>Request Full Access</span>
            <span className="material-symbols-outlined text-base">lock_open</span>
          </button>
        </div>

        <div className="flex items-center gap-4 text-[11px] text-[#86948a]">
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-sm text-[#7bd0ff]">dataset</span>
            1,400+ URA Realis data points
          </span>
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-sm text-[#7bd0ff]">analytics</span>
            Sensitivities at ±5% construction shocks
          </span>
        </div>
      </div>
    </div>
  );
};
