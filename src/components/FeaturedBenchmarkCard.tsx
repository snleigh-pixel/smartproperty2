import React from 'react';

interface FeaturedBenchmarkCardProps {
  onLoadSite: (landPsf: number, siteName: string) => void;
  currency: 'SGD' | 'USD';
  unit: 'PSF' | 'PSM';
  onBookViewing: (projectName: string, developer: string) => void;
}

export const FeaturedBenchmarkCard: React.FC<FeaturedBenchmarkCardProps> = ({
  onLoadSite,
  currency,
  unit,
  onBookViewing
}) => {
  const currencySymbol = currency === 'SGD' ? '$' : 'US$';
  const unitLabel = unit.toLowerCase();

  return (
    <div className="flex flex-col gap-5">
      {/* Site In Focus Card */}
      <div className="bg-[#122131] border border-[#1c2b3c] rounded-xl overflow-hidden shadow-xl flex flex-col group">
        <div className="relative h-44 w-full overflow-hidden bg-[#0d1c2d]">
          <img
            alt="Zion Road Parcel A Condominium Render"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBn7b164FM8aHHCvIwTqwlQuMECW0_4j1CL8DtpVCxrodYK50M_y-a2j_nrSlZpvujqSBL670y5MRp6fkCIrrlLIJ3VnOHqzQc2j857Dh3fhKr-mVJjyYImcRxhpcfvaiCz8IouKBEdC0fYyygzpI3mfbh_UhIEv1zPVqAn84kZHnjlw1iWR9xGjt-Bh86SwkddY15F_H8VgbNo4mhm5egjjtBhFfbUIBLQuU4Rnelk7OA-Ml1z_Smd"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#122131] via-[#122131]/40 to-transparent"></div>
          <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-[#4edea3] text-[#003824] text-[10px] font-extrabold uppercase tracking-wide shadow">
            Featured Benchmark Site
          </span>
          <span className="absolute bottom-3 left-3 text-base sm:text-lg font-bold text-[#d4e4fa]">
            Zion Road (Parcel A)
          </span>
          <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-[#1c2b3c]/90 text-[#d4e4fa] text-[11px] font-semibold border border-[#273647]">
            D03 • Havelock
          </span>
        </div>

        <div className="p-4 flex flex-col gap-3.5">
          <div className="flex items-center justify-between text-xs pb-1 border-b border-[#1c2b3c]">
            <span className="text-[#bbcabf]">Consortium Winner</span>
            <span className="text-[#d4e4fa] font-bold">CDL & Mitsui Fudosan</span>
          </div>

          <div className="grid grid-cols-2 gap-2.5 bg-[#0d1c2d] p-3 rounded-lg border border-[#1c2b3c]">
            <div>
              <span className="text-[10px] text-[#86948a] font-semibold uppercase block">
                Tender Land Bid
              </span>
              <span className="text-base sm:text-lg font-bold text-[#d4e4fa]">
                {currencySymbol}1,202 <span className="text-xs font-normal text-[#bbcabf]">{unitLabel} ppr</span>
              </span>
            </div>
            <div>
              <span className="text-[10px] text-[#86948a] font-semibold uppercase block">
                Projected Breakeven
              </span>
              <span className="text-base sm:text-lg font-bold text-[#7bd0ff]">
                {currencySymbol}2,050 <span className="text-xs font-normal text-[#bbcabf]">{unitLabel}</span>
              </span>
            </div>
          </div>

          {/* Mini progress visualization */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-[#bbcabf]">Tender Cost to Launch Spread</span>
              <span className="text-[#4edea3] font-bold">+28.5% Buffer</span>
            </div>
            <div className="w-full h-2 rounded-full bg-[#273647] overflow-hidden flex">
              <div className="h-full bg-[#7bd0ff]" style={{ width: '58.6%' }} title="Land Bid: $1,202 psf"></div>
              <div className="h-full bg-[#3f465c]" style={{ width: '21.4%' }} title="Const & Fees: $848 psf"></div>
              <div className="h-full bg-[#4edea3]" style={{ width: '20%' }} title="Fair Launch Spread"></div>
            </div>
            <div className="flex justify-between text-[10px] text-[#86948a] font-medium mt-0.5">
              <span>Land (58.6%)</span>
              <span>Dev Overhead (21.4%)</span>
              <span>Margin (20.0%)</span>
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-[#1c2b3c]/60 border border-[#273647] flex items-start gap-2 text-xs text-[#bbcabf]">
            <span className="material-symbols-outlined text-[#4edea3] text-base shrink-0 mt-0.5">
              insights
            </span>
            <p className="text-[11px] leading-relaxed">
              First long-stay Serviced Apartment site in Singapore. PropPulse algorithm computes a highly competitive preview threshold of <strong className="text-[#d4e4fa]">$2,480 psf</strong>, presenting strong value capture against nearby completed luxury resale.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={() => onLoadSite(1202, 'Zion Road (Parcel A)')}
              className="py-2 px-3 rounded-lg bg-[#1c2b3c] hover:bg-[#2c3a4c] text-[#7bd0ff] text-xs font-semibold border border-[#273647] transition-colors flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-sm">tune</span>
              Simulate in Calc
            </button>
            <button
              onClick={() => onBookViewing('Zion Road (Parcel A)', 'City Developments Ltd (CDL) & Mitsui Fudosan')}
              className="py-2 px-3 rounded-lg bg-[#4edea3] hover:bg-[#10b981] text-[#003824] text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-sm">meeting_room</span>
              Book Showroom
            </button>
          </div>
        </div>
      </div>

      {/* Live URA Tenders Status Widget */}
      <div className="bg-[#122131] border border-[#1c2b3c] rounded-xl p-4 shadow-xl flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-xs text-[#4edea3] uppercase font-bold tracking-wider flex items-center gap-1.5">
            <span className="material-symbols-outlined text-base">schedule</span>
            Upcoming Closing GLS Tenders
          </span>
          <span className="text-[11px] text-[#86948a] font-medium">Q2 2025 Release</span>
        </div>

        <div className="space-y-2 mt-1">
          <div
            onClick={() => onLoadSite(1450, 'Marina Gardens Lane')}
            className="p-2.5 rounded-lg bg-[#0d1c2d] hover:bg-[#1c2b3c] border border-[#1c2b3c] cursor-pointer transition-colors flex items-center justify-between"
          >
            <div>
              <p className="text-xs font-bold text-[#d4e4fa]">Marina Gardens Lane (Commercial & Resi)</p>
              <span className="text-[11px] text-[#86948a]">CCR • Est. 790 units</span>
            </div>
            <span className="px-2 py-1 rounded bg-[#273647] text-[11px] font-bold text-[#7bd0ff] border border-[#3c4a42]/40 shrink-0">
              Est. Bid: $1,450 psf
            </span>
          </div>

          <div
            onClick={() => onLoadSite(1180, 'Media Circle (One-North Hub)')}
            className="p-2.5 rounded-lg bg-[#0d1c2d] hover:bg-[#1c2b3c] border border-[#1c2b3c] cursor-pointer transition-colors flex items-center justify-between"
          >
            <div>
              <p className="text-xs font-bold text-[#d4e4fa]">Media Circle (One-North Hub)</p>
              <span className="text-[11px] text-[#86948a]">RCR • Est. 355 units</span>
            </div>
            <span className="px-2 py-1 rounded bg-[#273647] text-[11px] font-bold text-[#7bd0ff] border border-[#3c4a42]/40 shrink-0">
              Est. Bid: $1,180 psf
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
