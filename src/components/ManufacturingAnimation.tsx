import React, { useState, useEffect, useRef } from 'react';
import { VehicleGraphic } from './VehicleGraphic';
import { VideoControls } from './VideoControls';
import { Vehicle, ManufacturingStep } from '../types/vehicle';
import { sounds } from '../utils/soundEffects';
import { Maximize2, Minimize2, Wrench, Gauge, Sparkles } from 'lucide-react';

interface ManufacturingAnimationProps {
  vehicle: Vehicle;
  currentStepIndex: number;
  onStepChange: (index: number) => void;
  onComplete: () => void;
}

export const ManufacturingAnimation: React.FC<ManufacturingAnimationProps> = ({
  vehicle,
  currentStepIndex,
  onStepChange,
  onComplete,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [isMuted, setIsMuted] = useState<boolean>(sounds.getMuted());
  const [isBlueprintMode, setIsBlueprintMode] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const totalSteps = vehicle.steps.length;
  const currentStep: ManufacturingStep = vehicle.steps[currentStepIndex] || vehicle.steps[0];
  const progressPercent = Math.round(((currentStepIndex + 1) / totalSteps) * 100);

  // Play step sound when step changes
  useEffect(() => {
    sounds.playStepSound(currentStep.soundType);
  }, [currentStepIndex, currentStep.soundType]);

  // Handle auto-advancing when playing
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;
    if (isPlaying) {
      const baseDurationMs = 3200; // 3.2 seconds per step
      const stepDuration = baseDurationMs / playbackSpeed;

      timer = setTimeout(() => {
        if (currentStepIndex < totalSteps - 1) {
          onStepChange(currentStepIndex + 1);
        } else {
          // Reached completion!
          setIsPlaying(false);
          sounds.playCelebrationFanfare();
          onComplete();
        }
      }, stepDuration);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isPlaying, currentStepIndex, totalSteps, playbackSpeed, onStepChange, onComplete]);

  // Navigation handlers
  const handlePlayPause = () => {
    sounds.playClick();
    if (currentStepIndex === totalSteps - 1 && !isPlaying) {
      // If at the end, restart from beginning
      onStepChange(0);
      setIsPlaying(true);
    } else {
      setIsPlaying((prev) => !prev);
    }
  };

  const handleReplay = () => {
    sounds.playClick();
    onStepChange(0);
    setIsPlaying(true);
  };

  const handleNext = () => {
    sounds.playClick();
    if (currentStepIndex < totalSteps - 1) {
      onStepChange(currentStepIndex + 1);
      if (currentStepIndex + 1 === totalSteps - 1) {
        onComplete();
      }
    }
  };

  const handlePrev = () => {
    sounds.playClick();
    if (currentStepIndex > 0) {
      onStepChange(currentStepIndex - 1);
    }
  };

  const handleStepSelect = (index: number) => {
    sounds.playClick();
    onStepChange(index);
    if (index === totalSteps - 1) {
      onComplete();
    }
  };

  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    sounds.setMuted(nextMuted);
    setIsMuted(nextMuted);
  };

  const handleToggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full rounded-2xl overflow-hidden border border-slate-700/80 bg-slate-950 shadow-2xl transition-all ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none' : ''
      }`}
    >
      {/* Upper Status Bar & Fullscreen Controls */}
      <div className="absolute top-3 right-4 z-20 flex items-center gap-2">
        {/* Active Tools in use badge */}
        {currentStep.tools && currentStep.tools.length > 0 && (
          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-[11px] font-mono text-cyan-300 backdrop-blur-md">
            <Wrench className="w-3.5 h-3.5 text-cyan-400" />
            <span>TOOL: {currentStep.tools[0]}</span>
          </div>
        )}

        {/* Fullscreen Button */}
        <button
          onClick={handleToggleFullscreen}
          className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 backdrop-blur-md transition"
          title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>
      </div>

      {/* Main Interactive Graphic Visual Canvas */}
      <div className="relative w-full h-[360px] sm:h-[460px] md:h-[500px] bg-gradient-to-b from-[#080d1a] via-[#091122] to-[#050811] flex items-center justify-center p-2 sm:p-6 overflow-hidden">
        {/* Atmospheric grid & background glow */}
        <div className="absolute inset-0 bg-industrial-grid opacity-60 pointer-events-none" />
        <div
          className="absolute w-[600px] h-[300px] rounded-full blur-[100px] opacity-20 pointer-events-none transition-colors duration-1000"
          style={{
            backgroundColor: vehicle.themeColor,
            top: '40%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />

        {/* Dynamic Vehicle Graphic */}
        <VehicleGraphic
          vehicleId={vehicle.id}
          currentStep={currentStep}
          progressPercent={progressPercent}
          isBlueprintMode={isBlueprintMode}
          isPlaying={isPlaying}
        />
      </div>

      {/* Interactive Video Controls Toolbar */}
      <VideoControls
        currentStepIndex={currentStepIndex}
        totalSteps={totalSteps}
        currentStep={currentStep}
        isPlaying={isPlaying}
        onPlayPause={handlePlayPause}
        onReplay={handleReplay}
        onNext={handleNext}
        onPrev={handlePrev}
        onStepSelect={handleStepSelect}
        playbackSpeed={playbackSpeed}
        onSpeedChange={setPlaybackSpeed}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        isBlueprintMode={isBlueprintMode}
        onToggleBlueprint={() => setIsBlueprintMode((prev) => !prev)}
      />
    </div>
  );
};
