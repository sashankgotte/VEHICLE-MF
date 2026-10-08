import React from 'react';
import { Volume2, VolumeX, Sparkles, Factory, Compass } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface NavbarProps {
  onHomeClick: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onHomeClick, isMuted, onToggleMute }) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-[#070a13]/90 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Logo & Brand */}
        <div
          onClick={onHomeClick}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 flex items-center justify-center text-xl shadow-lg shadow-cyan-500/25 group-hover:scale-105 transition-transform">
            🚀
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-black tracking-wider text-white group-hover:text-cyan-400 transition-colors">
                VEHICLE WORLD
              </span>
            </div>
            <p className="text-[10px] font-mono tracking-widest text-amber-400 font-semibold uppercase">
              DISCOVER • DESIGN • BUILD
            </p>
          </div>
        </div>

        {/* Status Indicators & Controls */}
        <div className="flex items-center gap-3 sm:gap-6">
          {/* Active Lines Status */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>10 PRODUCTION LINES ONLINE</span>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={onToggleMute}
            className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700/80 transition flex items-center gap-2 text-xs font-mono"
            title={isMuted ? 'Enable Sound Effects' : 'Mute Sound Effects'}
          >
            {isMuted ? (
              <>
                <VolumeX className="w-4 h-4 text-rose-400" />
                <span className="hidden sm:inline text-rose-400">Audio Off</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4 text-emerald-400" />
                <span className="hidden sm:inline text-slate-300">Audio On</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

