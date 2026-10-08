import React from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Layers,
  Sparkles,
} from 'lucide-react';
import { ManufacturingStep } from '../types/vehicle';

interface VideoControlsProps {
  currentStepIndex: number;
  totalSteps: number;
  currentStep: ManufacturingStep;
  isPlaying: boolean;
  onPlayPause: () => void;
  onReplay: () => void;
  onNext: () => void;
  onPrev: () => void;
  onStepSelect: (index: number) => void;
  playbackSpeed: number;
  onSpeedChange: (speed: number) => void;
  isMuted: boolean;
  onToggleMute: () => void;
  isBlueprintMode: boolean;
  onToggleBlueprint: () => void;
}

export const VideoControls: React.FC<VideoControlsProps> = ({
  currentStepIndex,
  totalSteps,
  currentStep,
  isPlaying,
  onPlayPause,
  onReplay,
  onNext,
  onPrev,
  onStepSelect,
  playbackSpeed,
  onSpeedChange,
  isMuted,
  onToggleMute,
  isBlueprintMode,
  onToggleBlueprint,
}) => {
  const progressPercent = Math.round(((currentStepIndex + 1) / totalSteps) * 100);

  // Generate ASCII-style bar as requested in the prompt: Progress: ███████░░░░ 25%
  const totalBlocks = 12;
  const filledBlocks = Math.round((progressPercent / 100) * totalBlocks);
  const asciiProgress = '█'.repeat(filledBlocks) + '░'.repeat(Math.max(0, totalBlocks - filledBlocks));

  return (
    <div className="bg-slate-900/95 border-t border-slate-700/80 p-4 sm:p-5 backdrop-blur-md">
      {/* Top Info Bar: Step Number, Title, Short explanation & Manufacturing percentage */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 text-xs font-mono font-bold bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 rounded">
              STEP {String(currentStep.stepNumber).padStart(2, '0')} / {String(totalSteps).padStart(2, '0')}
            </span>
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
              [{currentStep.category}]
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white tracking-wide flex items-center gap-2">
            <span>"{currentStep.title}"</span>
            {currentStep.visualStage.completed && (
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                100% COMPLETE
              </span>
            )}
          </h3>
          <p className="text-sm text-slate-300 line-clamp-1 mt-0.5">
            {currentStep.shortDesc}
          </p>
        </div>

        {/* Manufacturing Percentage Display */}
        <div className="flex flex-row md:flex-col items-center md:items-end justify-between border-t md:border-t-0 pt-2 md:pt-0 border-slate-800">
          <div className="text-xs font-mono text-slate-400 mb-0.5">
            Progress: <span className="text-cyan-400 font-bold">{asciiProgress}</span>
          </div>
          <div className="text-2xl font-black font-mono text-cyan-400 text-glow">
            {progressPercent}%
          </div>
        </div>
      </div>

      {/* Scrubbable Progress Bar */}
      <div className="relative mb-5 group">
        <div
          className="w-full h-3.5 bg-slate-800/90 rounded-full overflow-hidden border border-slate-700/80 cursor-pointer relative"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const clickPos = (e.clientX - rect.left) / rect.width;
            const targetStep = Math.min(
              totalSteps - 1,
              Math.max(0, Math.floor(clickPos * totalSteps))
            );
            onStepSelect(targetStep);
          }}
        >
          {/* Progress fill */}
          <div
            className="h-full bg-gradient-to-r from-cyan-600 via-cyan-400 to-amber-400 transition-all duration-300 rounded-full relative"
            style={{ width: `${progressPercent}%` }}
          >
            <div className="absolute inset-0 bg-white/20 animate-pulse" />
          </div>
        </div>

        {/* Step Tick Marks */}
        <div className="absolute inset-0 flex justify-between px-1 pointer-events-none items-center">
          {Array.from({ length: totalSteps }).map((_, idx) => (
            <div
              key={idx}
              className={`w-1 h-2 rounded-full transition-colors ${
                idx <= currentStepIndex ? 'bg-cyan-200' : 'bg-slate-600'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Primary Control Buttons & Utilities */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Playback Transport Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Replay */}
          <button
            onClick={onReplay}
            className="p-2 sm:px-3 sm:py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition flex items-center gap-1.5 text-xs font-mono"
            title="Replay from start"
          >
            <RotateCcw className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">Replay</span>
          </button>

          {/* Previous Step */}
          <button
            onClick={onPrev}
            disabled={currentStepIndex === 0}
            className="p-2 sm:px-3 sm:py-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-slate-200 border border-slate-700 transition flex items-center gap-1.5 text-xs font-mono"
            title="Previous Step"
          >
            <SkipBack className="w-4 h-4 text-cyan-400" />
            <span className="hidden sm:inline">Prev</span>
          </button>

          {/* Play / Pause Primary Button */}
          <button
            onClick={onPlayPause}
            className={`px-4 sm:px-6 py-2 rounded-lg font-bold flex items-center gap-2 text-sm transition shadow-lg ${
              isPlaying
                ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/20'
                : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-cyan-500/20'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 fill-current" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span>Play</span>
              </>
            )}
          </button>

          {/* Next Step */}
          <button
            onClick={onNext}
            disabled={currentStepIndex === totalSteps - 1}
            className="p-2 sm:px-3 sm:py-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-slate-200 border border-slate-700 transition flex items-center gap-1.5 text-xs font-mono"
            title="Next Step"
          >
            <span className="hidden sm:inline">Next</span>
            <SkipForward className="w-4 h-4 text-cyan-400" />
          </button>
        </div>

        {/* Secondary Toggles: Speed, Blueprint, Sound */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Speed Selector */}
          <div className="flex items-center rounded-lg bg-slate-800 p-0.5 border border-slate-700 text-xs font-mono">
            {[1, 1.5, 2].map((speed) => (
              <button
                key={speed}
                onClick={() => onSpeedChange(speed)}
                className={`px-2 py-1 rounded transition ${
                  playbackSpeed === speed
                    ? 'bg-cyan-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {speed}x
              </button>
            ))}
          </div>

          {/* Blueprint Mode Toggle */}
          <button
            onClick={onToggleBlueprint}
            className={`px-2.5 py-1.5 rounded-lg border text-xs font-mono flex items-center gap-1.5 transition ${
              isBlueprintMode
                ? 'bg-sky-500/20 text-sky-300 border-sky-500/60 shadow-[0_0_10px_rgba(56,189,248,0.3)]'
                : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
            }`}
            title="Toggle Blueprint X-Ray View"
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Blueprint</span>
          </button>

          {/* Sound Mute Toggle */}
          <button
            onClick={onToggleMute}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
            title={isMuted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-rose-400" />
            ) : (
              <Volume2 className="w-4 h-4 text-emerald-400" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

