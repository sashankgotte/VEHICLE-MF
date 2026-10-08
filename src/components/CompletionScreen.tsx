import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Vehicle } from '../types/vehicle';
import { RotateCcw, Compass, Award, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import { VehicleGraphic } from './VehicleGraphic';

interface CompletionScreenProps {
  vehicle: Vehicle;
  onWatchAgain: () => void;
  onExploreOther: () => void;
}

export const CompletionScreen: React.FC<CompletionScreenProps> = ({
  vehicle,
  onWatchAgain,
  onExploreOther,
}) => {
  // Fire celebratory confetti when this component mounts
  useEffect(() => {
    // Left burst
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { x: 0.2, y: 0.6 },
      colors: ['#00f0ff', '#ffb703', '#10b981', '#aa3bff', '#ffffff'],
    });

    // Right burst
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { x: 0.8, y: 0.6 },
      colors: ['#00f0ff', '#ffb703', '#10b981', '#aa3bff', '#ffffff'],
    });

    // Center star burst
    const timer = setTimeout(() => {
      confetti({
        particleCount: 120,
        spread: 100,
        origin: { x: 0.5, y: 0.4 },
        colors: ['#38bdf8', '#fbbf24', '#34d399', '#f43f5e'],
      });
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  const lastStep = vehicle.steps[vehicle.steps.length - 1];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-xl overflow-y-auto">
      <div className="relative w-full max-w-3xl my-8 bg-gradient-to-b from-slate-900 to-slate-950 border border-cyan-500/50 rounded-3xl p-6 sm:p-10 shadow-[0_0_60px_rgba(6,182,212,0.3)] text-center overflow-hidden">
        {/* Glow ambient background circles */}
        <div className="absolute -top-24 -left-24 w-60 h-60 rounded-full bg-cyan-500/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-60 h-60 rounded-full bg-amber-500/20 blur-3xl pointer-events-none" />

        {/* Celebration Header */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-cyan-400 to-emerald-400 flex items-center justify-center text-3xl sm:text-4xl shadow-xl shadow-cyan-500/30 mb-4 animate-bounce">
            🎉
          </div>

          <h2 className="text-2xl sm:text-4xl font-black tracking-wide text-white mb-2 text-glow">
            VEHICLE COMPLETE!
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-lg mb-6 leading-relaxed">
            Your <span className="text-cyan-400 font-bold">{vehicle.name}</span> has successfully
            completed the manufacturing journey from raw materials to the finished, fully-inspected vehicle.
          </p>

          {/* Finished Vehicle Showcase Display */}
          <div className="relative w-full h-[220px] sm:h-[260px] bg-slate-950/80 rounded-2xl border border-slate-700/80 flex items-center justify-center mb-6 overflow-hidden">
            {/* Showroom Lighting Radial Gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(6,182,212,0.25),transparent_70%)]" />

            <div className="w-full h-full transform scale-90 sm:scale-100 flex items-center justify-center">
              <VehicleGraphic
                vehicleId={vehicle.id}
                currentStep={lastStep}
                progressPercent={100}
                isBlueprintMode={false}
                isPlaying={false}
              />
            </div>

            {/* Quality Pass Seal Badge */}
            <div className="absolute top-3 right-3 px-3 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-500/50 backdrop-blur-md flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>100% QUALITY PASSED</span>
            </div>
          </div>

          {/* Key Build Metrics Ribbon */}
          <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-2 mb-8 text-left">
            <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-xl">
              <span className="text-[10px] font-mono text-slate-400 uppercase">Total Steps</span>
              <p className="text-base font-bold font-mono text-cyan-400">
                {vehicle.steps.length} / {vehicle.steps.length}
              </p>
            </div>
            <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-xl">
              <span className="text-[10px] font-mono text-slate-400 uppercase">Factory Bay</span>
              <p className="text-base font-bold font-mono text-slate-200">Terminal 01</p>
            </div>
            <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-xl">
              <span className="text-[10px] font-mono text-slate-400 uppercase">Certification</span>
              <p className="text-base font-bold font-mono text-emerald-400">ISO 9001:2026</p>
            </div>
            <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-xl">
              <span className="text-[10px] font-mono text-slate-400 uppercase">Operational Status</span>
              <p className="text-base font-bold font-mono text-amber-400">Ready for Duty</p>
            </div>
          </div>

          {/* Action Buttons as requested in prompt */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
            <button
              onClick={onWatchAgain}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold font-mono text-sm bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/40 hover:border-cyan-400 transition-all flex items-center justify-center gap-2 shadow-lg"
            >
              <RotateCcw className="w-4 h-4 text-cyan-400" />
              <span>WATCH AGAIN</span>
            </button>

            <button
              onClick={onExploreOther}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold font-mono text-sm bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 transition-all flex items-center justify-center gap-2 shadow-xl shadow-cyan-500/25"
            >
              <Compass className="w-4 h-4 text-slate-950" />
              <span>EXPLORE ANOTHER VEHICLE</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

