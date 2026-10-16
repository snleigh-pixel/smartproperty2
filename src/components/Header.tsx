import React, { useState } from 'react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currency: 'SGD' | 'USD';
  setCurrency: (c: 'SGD' | 'USD') => void;
  unit: 'PSF' | 'PSM';
  setUnit: (u: 'PSF' | 'PSM') => void;
  onOpenSearch: () => void;
  shortlistCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  currency,
  setCurrency,
  unit,
  setUnit,
  onOpenSearch,
  shortlistCount
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(3);

  const notifications = [
    {
      title: 'Zion Road (Parcel A) Land Award Finalized',
      time: '12m ago',
      desc: 'CDL & Mitsui Fudosan award confirmed at $1,202 psf ppr. Indicative launch floor updated to $2,480 psf.',
      unread: true,
      badge: 'URA GLS'
    },
    {
      title: 'Bayshore Road GLS Tender Closes',
      time: '2h ago',
      desc: 'Highest bid logged at $1,388 psf ppr. Strong interest with 4 competitive bids submitted.',
      unread: true,
      badge: 'Tender Close'
    },
    {
      title: 'BCA Tender Price Index Adjusted',
      time: '1d ago',
      desc: 'Quarterly construction cost estimate increased by 1.8% for RCR high-rise residential.',
      unread: false,
      badge: 'BCA Index'
    }
  ];

  const navItems = [
    { id: 'launch-radar', label: 'Launch Radar' },
    { id: 'land-sales-and-indicative-pricing', label: 'Land Sales & Indicative Pricing' },
    { id: 'comparative-matrix', label: 'Comparative Matrix' },
    { id: 'developer-and-agent-suite', label: 'Developer & Agent Suite' },
    { id: 'my-shortlist-and-alerts', label: `My Shortlist & Alerts${shortlistCount > 0 ? ` (${shortlistCount})` : ''}` }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#051424]/90 backdrop-blur-xl border-b border-[#1c2b3c]/60 shadow-[0_1px_8px_rgba(0,0,0,0.4)]">
      <div className="h-20 w-full px-4 lg:px-6 flex items-center justify-between gap-4">
        {/* Left: Logo + Search */}
        <div className="flex items-center gap-6">
          <button 
            onClick={() => setActiveTab('land-sales-and-indicative-pricing')}
            className="flex items-center gap-2.5 shrink-0 text-left focus:outline-none"
          >
            <img
              alt="PropPulse SG Logo"
              className="h-8 w-auto object-contain"
              src="https://lh3.googleusercontent.com/aida/AEtjO1XPZBIQAERckXKpQi0b6pOaIxjKkuHgY7uU-gHsCY0ACD9hjppJ7dAzexg4gAf7-4JPGmQzf1w8UcXlnsNylcdRoIYuWud_hTRoLELJhARAApM72CqFYqXwOOks1B1rIi_SvOlWIaAXHky1aqRPjgAEfSISX2UpXGNMxBev0llzxdxElkICSfuPfXTOfaCYkPefOhNq3CqvmYZha6ini5xmsusoOpB75M-IVkPDMl7eIV83AXdOHkitoc0"
            />
            <div className="flex flex-col">
              <span className="text-[18px] font-bold tracking-tight text-[#d4e4fa] flex items-center gap-0.5">
                PropPulse<span className="text-[#4edea3] font-extrabold">SG</span>
              </span>
              <span className="text-[10px] text-[#bbcabf] uppercase tracking-widest font-semibold">
                Launch Intel
              </span>
            </div>
          </button>

          {/* Quick Search Bar */}
          <button
            onClick={onOpenSearch}
            className="relative hidden 2xl:flex items-center text-left group"
          >
            <span className="material-symbols-outlined absolute left-3 text-[#bbcabf] text-lg pointer-events-none group-hover:text-[#4edea3] transition-colors">
              search
            </span>
            <div className="w-[380px] h-9 pl-9 pr-12 rounded-lg bg-[#122131] border border-[#1c2b3c] text-[#d4e4fa] placeholder:text-[#bbcabf]/60 text-xs flex items-center group-hover:border-[#4edea3]/40 transition-colors">
              <span className="text-[#bbcabf]/70 truncate">
                Search condo name, MRT, developer or District (e.g., D15, Marina Gardens)...
              </span>
            </div>
            <span className="absolute right-2.5 px-1.5 py-0.5 rounded bg-[#273647] text-[#bbcabf] text-[10px] font-semibold border border-[#3c4a42]/40">
              ⌘K
            </span>
          </button>
        </div>

        {/* Center: Navigation Bar */}
        <nav className="hidden xl:flex items-center gap-1 bg-[#0d1c2d] p-1 rounded-xl border border-[#1c2b3c]">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-[#1c2b3c] text-[#4edea3] shadow-sm'
                    : 'text-[#bbcabf] hover:text-[#d4e4fa] hover:bg-[#1c2b3c]/60'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right: Marquee + Toggle + Notifications + User Profile */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Live Marquee Status Indicator */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-[#0d1c2d] border border-[#1c2b3c]">
            <span className="w-2 h-2 rounded-full bg-[#4edea3] animate-pulse"></span>
            <span className="text-[11px] font-medium text-[#bbcabf] truncate max-w-[280px]">
              URA GLS Tender: Bayshore Rd · OCR Avg: $2,180 psf
            </span>
          </div>

          {/* Unit Switcher */}
          <div className="flex items-center bg-[#0d1c2d] p-0.5 rounded-lg border border-[#1c2b3c] text-[11px] font-semibold">
            <button
              onClick={() => setCurrency(currency === 'SGD' ? 'USD' : 'SGD')}
              className="px-2 py-1 rounded bg-[#1c2b3c] text-[#4edea3] font-bold"
              title="Toggle Currency"
            >
              {currency}
            </button>
            <button
              onClick={() => setUnit(unit === 'PSF' ? 'PSM' : 'PSF')}
              className="px-2 py-1 rounded text-[#bbcabf] hover:text-[#d4e4fa]"
              title="Toggle Unit (Per Sq Ft vs Per Sq Metre)"
            >
              {unit}
            </button>
          </div>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              aria-label="Notifications"
              onClick={() => {
                setShowNotifications(!showNotifications);
                if (!showNotifications) setUnreadNotifications(0);
              }}
              className="relative p-2 rounded-lg text-[#bbcabf] hover:text-[#d4e4fa] hover:bg-[#1c2b3c] transition-colors focus:outline-none"
            >
              <span className="material-symbols-outlined text-xl">notifications</span>
              {unreadNotifications > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#10b981] ring-2 ring-[#051424]"></span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-xl bg-[#122131] border border-[#273647] shadow-2xl p-3 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="flex items-center justify-between pb-2 border-b border-[#1c2b3c] mb-2">
                  <span className="text-xs font-bold text-[#d4e4fa] flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[#4edea3] text-sm">bolt</span>
                    Real-Time URA & Tender Feeds
                  </span>
                  <span className="text-[10px] text-[#4edea3] bg-[#4edea3]/10 px-1.5 py-0.5 rounded font-semibold">
                    Live
                  </span>
                </div>
                <div className="space-y-2">
                  {notifications.map((n, i) => (
                    <div
                      key={i}
                      className="p-2.5 rounded-lg bg-[#0d1c2d] hover:bg-[#1c2b3c] transition-colors border border-[#1c2b3c]"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-semibold text-[#7bd0ff] uppercase tracking-wide">
                          {n.badge}
                        </span>
                        <span className="text-[10px] text-[#86948a]">{n.time}</span>
                      </div>
                      <p className="text-xs font-semibold text-[#d4e4fa] leading-tight mb-1">
                        {n.title}
                      </p>
                      <p className="text-[11px] text-[#bbcabf] leading-snug">
                        {n.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile */}
          <div className="flex items-center gap-2 pl-1 border-l border-[#1c2b3c]/80">
            <img
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover ring-1 ring-[#4edea3]/40"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAj0FxCclRLypl-mflEl7L2kEoioyjli6oev5MWxqKhIyNwuyxFWExC5F6pyPggi4gPEA2xOOBTdfeAxpi-rlt253ae1Yu5DOf2VhIFcTSx9ku5LgxNIdoC6WyN7dJk8D8Es7rL9M8KkHzM9KNrFT26pi4bEe-m3vOHk9sAYcJnSO1d0vKSdRfAeO_F5XuDpeTeYRETiQsvyMS_uFImgZIifjQwedzRCyvYCga7M97dsuj6Z3Xh86as"
            />
            <div className="hidden md:flex flex-col text-left">
              <span className="text-xs text-[#d4e4fa] font-semibold leading-tight">
                Marcus Tan
              </span>
              <span className="text-[10px] text-[#4edea3] uppercase font-bold tracking-tight">
                Licensed Agent / Pro Member
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile nav tabs bar */}
      <div className="xl:hidden flex items-center overflow-x-auto px-4 py-2 bg-[#0d1c2d] border-t border-[#1c2b3c] gap-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`whitespace-nowrap px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
              activeTab === item.id
                ? 'bg-[#1c2b3c] text-[#4edea3]'
                : 'text-[#bbcabf] hover:text-[#d4e4fa]'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </header>
  );
};
