import React from 'react';

interface ProgressBarProps {
  progressPercent: number;
  label?: string;
  showAscii?: boolean;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progressPercent,
  label = 'Progress',
  showAscii = true,
  className = '',
}) => {
  const clampedProgress = Math.min(100, Math.max(0, Math.round(progressPercent)));
  const totalBlocks = 12;
  const filledBlocks = Math.round((clampedProgress / 100) * totalBlocks);
  const asciiProgress = '█'.repeat(filledBlocks) + '░'.repeat(Math.max(0, totalBlocks - filledBlocks));

  return (
    <div className={`space-y-1.5 ${className}`}>
      <div className="flex items-center justify-between text-xs font-mono">
        <span className="text-slate-400">
          {label}: {showAscii && <span className="text-cyan-400 font-bold">{asciiProgress}</span>}
        </span>
        <span className="text-cyan-400 font-bold">{clampedProgress}%</span>
      </div>

      <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden border border-slate-700/80 relative">
        <div
          className="h-full bg-gradient-to-r from-cyan-600 via-cyan-400 to-amber-400 transition-all duration-300 rounded-full relative"
          style={{ width: `${clampedProgress}%` }}
        >
          <div className="absolute inset-0 bg-white/20 animate-pulse" />
        </div>
      </div>
    </div>
  );
};

