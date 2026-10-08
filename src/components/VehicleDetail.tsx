import React, { useState, useEffect } from 'react';
import { Vehicle } from '../types/vehicle';
import { ManufacturingAnimation } from './ManufacturingAnimation';
import { ManufacturingStep } from './ManufacturingStep';
import { CompletionScreen } from './CompletionScreen';
import { ArrowLeft, Factory, Sparkles, SlidersHorizontal, Info } from 'lucide-react';

interface VehicleDetailProps {
  vehicle: Vehicle;
  onBack: () => void;
  onSelectOtherVehicle: () => void;
}

export const VehicleDetail: React.FC<VehicleDetailProps> = ({
  vehicle,
  onBack,
  onSelectOtherVehicle,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [showCompletion, setShowCompletion] = useState<boolean>(false);

  // Scroll to top on vehicle selection
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentStepIndex(0);
    setShowCompletion(false);
  }, [vehicle]);

  const handleStepChange = (index: number) => {
    setCurrentStepIndex(index);
    if (index === vehicle.steps.length - 1) {
      // Completed last step!
      setShowCompletion(true);
    }
  };

  const handleWatchAgain = () => {
    setShowCompletion(false);
    setCurrentStepIndex(0);
  };

  return (
    <div className="min-h-screen bg-[#070a13] text-slate-100 pb-24">
      {/* Top Navigation & Breadcrumbs */}
      <div className="sticky top-0 z-30 bg-slate-950/90 border-b border-slate-800/80 backdrop-blur-md px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <button
          onClick={onBack}
          className="group flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-cyan-400 border border-slate-700/80 transition font-mono text-xs font-bold"
        >
          <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
          <span>← BACK TO VEHICLES</span>
        </button>

        {/* Live Assembly Station Breadcrumb */}
        <div className="hidden sm:flex items-center gap-2 font-mono text-xs text-slate-400">
          <Factory className="w-4 h-4 text-cyan-400" />
          <span>PRODUCTION BAY //</span>
          <span className="text-white font-bold">{vehicle.name}</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-10">
        {/* Header Section as explicitly requested in prompt */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs uppercase tracking-widest mb-3">
            <span>{vehicle.emoji}</span>
            <span>{vehicle.category} Manufacturing Journey</span>
          </div>

          {/* Large Vehicle Title as requested in prompt */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white uppercase text-glow mb-2">
            HOW A {vehicle.shortTitle} IS MADE
          </h1>

          {/* Subtitle as requested in prompt */}
          <p className="text-base sm:text-xl font-medium text-amber-400 font-mono tracking-wide">
            From Raw Materials to the Finished Vehicle
          </p>

          <p className="max-w-2xl mx-auto text-slate-400 text-sm mt-3 leading-relaxed">
            {vehicle.overview}
          </p>
        </div>

        {/* Manufacturing Animation / Video Stage Area */}
        <div className="mb-14">
          <ManufacturingAnimation
            vehicle={vehicle}
            currentStepIndex={currentStepIndex}
            onStepChange={handleStepChange}
            onComplete={() => setShowCompletion(true)}
          />
        </div>

        {/* Manufacturing Steps Section as explicitly requested in prompt */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-wide text-white uppercase flex items-center gap-3">
                <span>MANUFACTURING STEPS</span>
                <span className="text-xs font-mono font-normal px-2.5 py-1 rounded-full bg-slate-800 text-cyan-400 border border-slate-700">
                  {vehicle.steps.length} Progressive Stages
                </span>
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                Visual timeline progressing from top to bottom. Click any step to inspect its engineering process.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>Click a card to navigate simulation</span>
            </div>
          </div>

          {/* Vertical Step Cards Timeline */}
          <div className="relative space-y-4">
            {/* Visual connector line running vertically */}
            <div className="hidden md:block absolute left-[59px] top-6 bottom-6 w-0.5 bg-slate-800 pointer-events-none" />

            {vehicle.steps.map((step, idx) => (
              <ManufacturingStep
                key={step.id}
                step={step}
                index={idx}
                totalSteps={vehicle.steps.length}
                isActive={idx === currentStepIndex}
                isPast={idx < currentStepIndex}
                onSelect={handleStepChange}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Completion Modal Screen when journey finishes */}
      {showCompletion && (
        <CompletionScreen
          vehicle={vehicle}
          onWatchAgain={handleWatchAgain}
          onExploreOther={onSelectOtherVehicle}
        />
      )}
    </div>
  );
};

