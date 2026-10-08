import React from 'react';
import { ManufacturingStep as StepType } from '../types/vehicle';
import { CheckCircle2, PlayCircle, Clock, Wrench, Lightbulb, ChevronRight } from 'lucide-react';

interface ManufacturingStepProps {
  step: StepType;
  index: number;
  totalSteps: number;
  isActive: boolean;
  isPast: boolean;
  onSelect: (index: number) => void;
}

export const ManufacturingStep: React.FC<ManufacturingStepProps> = ({
  step,
  index,
  totalSteps,
  isActive,
  isPast,
  onSelect,
}) => {
  const stepProgress = Math.round(((index + 1) / totalSteps) * 100);

  return (
    <div
      onClick={() => onSelect(index)}
      className={`group relative flex flex-col md:flex-row gap-4 p-5 rounded-xl border transition-all duration-300 cursor-pointer ${
        isActive
          ? 'bg-slate-900/90 border-cyan-500/80 shadow-[0_0_25px_rgba(6,182,212,0.25)] ring-1 ring-cyan-500/50 transform md:scale-[1.01]'
          : isPast
          ? 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700 opacity-80 hover:opacity-100'
          : 'bg-slate-950/40 border-slate-800/50 hover:border-slate-700 opacity-60 hover:opacity-100'
      }`}
    >
      {/* Left Column: Step Indicator & State Icon */}
      <div className="flex md:flex-col items-center justify-between md:justify-start gap-3 md:min-w-[120px] border-b md:border-b-0 md:border-r border-slate-800 pb-3 md:pb-0 md:pr-4">
        <div className="flex items-center gap-2">
          {/* Status Icon */}
          {isPast ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          ) : isActive ? (
            <PlayCircle className="w-5 h-5 text-cyan-400 shrink-0 animate-pulse" />
          ) : (
            <div className="w-5 h-5 rounded-full border-2 border-slate-600 flex items-center justify-center shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
            </div>
          )}

          <div className="flex flex-col">
            <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">
              STEP
            </span>
            <span
              className={`text-xl font-black font-mono leading-none ${
                isActive ? 'text-cyan-400 text-glow' : isPast ? 'text-emerald-400' : 'text-slate-300'
              }`}
            >
              {String(step.stepNumber).padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* Progress & Category Tag */}
        <div className="flex md:flex-col items-center md:items-start gap-2">
          <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700">
            {stepProgress}%
          </span>
          <span className="text-[11px] font-mono text-slate-400 uppercase">
            {step.category}
          </span>
        </div>
      </div>

      {/* Center Column: Title, Subtitle, Details & Technical Metrics */}
      <div className="flex-1 space-y-3">
        <div>
          <div className="flex items-center justify-between">
            <h4
              className={`text-lg font-bold transition-colors ${
                isActive ? 'text-white' : 'text-slate-200 group-hover:text-cyan-300'
              }`}
            >
              {step.title}
            </h4>
            <span className="hidden sm:inline-flex items-center gap-1 text-xs text-cyan-400 group-hover:translate-x-1 transition-transform">
              Jump to Step <ChevronRight className="w-3.5 h-3.5" />
            </span>
          </div>
          <p className="text-xs font-mono text-amber-400/90">{step.subtitle}</p>
        </div>

        {/* Short Explanation */}
        <p className="text-sm text-slate-300 leading-relaxed">{step.details}</p>

        {/* Technical Engineering Metrics Grid */}
        {step.metrics && step.metrics.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2">
            {step.metrics.map((metric, mIdx) => (
              <div
                key={mIdx}
                className="bg-slate-900/60 border border-slate-800/80 rounded-lg p-2 flex flex-col"
              >
                <span className="text-[10px] font-mono text-slate-400 uppercase">
                  {metric.label}
                </span>
                <span className="text-xs font-bold font-mono text-cyan-300 mt-0.5">
                  {metric.value}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Tools and Fun Fact */}
        <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-slate-400">
          {step.tools && step.tools.length > 0 && (
            <div className="flex items-center gap-1.5 text-slate-400">
              <Wrench className="w-3.5 h-3.5 text-amber-400" />
              <span>Tools: {step.tools.join(', ')}</span>
            </div>
          )}

          {step.funFact && (
            <div className="flex items-center gap-1.5 text-slate-400/90 italic">
              <Lightbulb className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
              <span>Did you know? {step.funFact}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

