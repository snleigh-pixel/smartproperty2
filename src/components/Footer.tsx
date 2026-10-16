import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#010f1f] border-t border-[#1c2b3c] mt-12 py-8">
      <div className="w-full px-4 lg:px-6 max-w-[1600px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col gap-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <span className="text-base font-bold text-[#d4e4fa]">
              PropPulse<span className="text-[#4edea3]">SG</span>
            </span>
            <span className="px-2 py-0.5 rounded bg-[#1c2b3c] text-[#bbcabf] text-[10px] font-semibold">
              Singapore Core Coverage
            </span>
          </div>
          <p className="text-xs text-[#bbcabf]">
            Integrated with Urban Redevelopment Authority (URA) Realis APIs, SLA Cadastral registries & INLIS land parcel transactions.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 text-[#bbcabf] text-xs">
          <a href="#pipelineTable" className="hover:text-[#4edea3] transition-colors">
            URA Pipeline Registry
          </a>
          <span className="text-[#1c2b3c]">•</span>
          <span className="hover:text-[#4edea3] cursor-pointer transition-colors">
            URA Master Plan 2025 Updates
          </span>
          <span className="text-[#1c2b3c]">•</span>
          <span className="hover:text-[#4edea3] cursor-pointer transition-colors">
            ABSDF Guidelines
          </span>
          <span className="text-[#1c2b3c]">•</span>
          <span className="hover:text-[#4edea3] cursor-pointer transition-colors">
            Terms of Intelligence
          </span>
        </div>

        <div className="text-right text-[#bbcabf] text-xs flex flex-col items-center md:items-end">
          <p className="text-[11px] text-[#bbcabf]/80">
            © 2025 PropPulse SG Private Wealth & Advisory. All rights reserved.
          </p>
          <span className="text-[10px] text-[#86948a]">
            Analytical forecasts are indicative and do not constitute financial advice.
          </span>
        </div>
      </div>
    </footer>
  );
};
