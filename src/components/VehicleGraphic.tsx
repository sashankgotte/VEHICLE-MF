import React from 'react';
import { VehicleId, ManufacturingStep } from '../types/vehicle';

interface VehicleGraphicProps {
  vehicleId: VehicleId;
  currentStep: ManufacturingStep;
  progressPercent: number;
  isBlueprintMode?: boolean;
  isPlaying?: boolean;
}

export const VehicleGraphic: React.FC<VehicleGraphicProps> = ({
  vehicleId,
  currentStep,
  progressPercent,
  isBlueprintMode = false,
  isPlaying = false,
}) => {
  const { visualStage } = currentStep;
  const isWelding = visualStage.weldingActive;
  const isPainted = visualStage.painted;
  const isEngine = visualStage.engineInstalled;
  const isWheels = visualStage.wheelsOrTracksInstalled;
  const isInterior = visualStage.interiorInstalled;
  const isGlass = visualStage.glassInstalled;
  const isDoorsOrWings = visualStage.doorsOrWingsInstalled;
  const isExteriorTrim = visualStage.exteriorTrimInstalled;
  const isTesting = visualStage.testingActive;
  const isCompleted = visualStage.completed;
  const isRaw = visualStage.rawMaterials;
  const isFrame = visualStage.frame;

  // Primary colors depending on blueprint mode
  const strokeColor = isBlueprintMode ? '#38bdf8' : '#64748b';
  const fillColor = isBlueprintMode ? 'rgba(56, 189, 248, 0.08)' : (isPainted ? 'var(--vehicle-paint)' : '#475569');

  return (
    <div className={`relative w-full h-full flex items-center justify-center select-none overflow-hidden ${isBlueprintMode ? 'blueprint-grid' : ''}`}>
      {/* Factory Overhead Lighting Rig / Gantry */}
      <div className="absolute top-0 inset-x-0 h-10 border-b border-slate-700/60 bg-gradient-to-b from-slate-900 via-slate-800/40 to-transparent flex items-center justify-between px-8 z-10 pointer-events-none">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-cyan-400 animate-ping" />
          <span className="text-[11px] font-mono tracking-widest text-cyan-400/90 uppercase">
            STATION 0{currentStep.stepNumber} // {currentStep.category.toUpperCase()}
          </span>
        </div>
        <div className="flex items-center gap-4 text-[10px] font-mono text-slate-400">
          <span className="hidden sm:inline">OVERHEAD GANTRY ACTIVE</span>
          <span className="text-amber-400 font-semibold">{Math.round(progressPercent)}% ASSEMBLED</span>
        </div>
      </div>

      {/* Assembly Conveyor / Ground Platform */}
      <div className="absolute bottom-4 inset-x-6 sm:inset-x-12 h-6 border-t-2 border-slate-700/80 bg-slate-900/90 flex items-center justify-between px-4 z-10 pointer-events-none rounded-b">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          <span className="text-[10px] font-mono text-slate-400 tracking-wider">CONVEYOR BAY 04</span>
        </div>
        <div className="flex gap-1.5 overflow-hidden opacity-40">
          {Array.from({ length: 18 }).map((_, i) => (
            <div key={i} className="w-3 h-1.5 bg-amber-400 transform -skew-x-12" />
          ))}
        </div>
        <span className="text-[10px] font-mono text-emerald-400 hidden sm:inline">HYDRAULIC BED: LOCKED</span>
      </div>

      {/* Welding Spark Effects when active */}
      {isWelding && (
        <div className="absolute inset-0 pointer-events-none z-20 flex items-center justify-center">
          <div className="relative w-40 h-40">
            {/* Spark points with CSS particles */}
            <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-white rounded-full animate-ping shadow-[0_0_20px_#67e8f9]" />
            <div className="absolute top-1/2 left-2/3 w-2.5 h-2.5 bg-cyan-300 rounded-full animate-pulse shadow-[0_0_15px_#38bdf8]" />
            <div className="absolute top-1/3 left-1/2 w-4 h-4 bg-amber-300 rounded-full animate-ping shadow-[0_0_25px_#fbbf24]" />
            {/* Spark arcs */}
            <svg className="absolute inset-0 w-full h-full animate-pulse" viewBox="0 0 100 100">
              <line x1="45" y1="45" x2="30" y2="25" stroke="#fef08a" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="50" y1="50" x2="70" y2="35" stroke="#67e8f9" strokeWidth="2" strokeLinecap="round" />
              <line x1="48" y1="52" x2="60" y2="75" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="46" y1="48" x2="25" y2="60" stroke="#fef08a" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      )}

      {/* Paint Booth Spray Mist when painting */}
      {currentStep.category === 'paint' && (
        <div className="absolute inset-0 pointer-events-none z-20 flex items-center justify-around overflow-hidden">
          <div className="w-48 h-full bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent animate-pulse transform -skew-x-12 blur-md" />
          <div className="w-48 h-full bg-gradient-to-r from-transparent via-amber-400/20 to-transparent animate-pulse transform skew-x-12 blur-md delay-300" />
        </div>
      )}

      {/* Testing Dyno / Laser Scan Grid */}
      {isTesting && (
        <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden flex flex-col justify-center items-center">
          <div className="w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#00f0ff] animate-bounce" />
          <div className="text-[11px] font-mono tracking-widest text-cyan-300 bg-slate-900/90 px-3 py-1 rounded border border-cyan-500/40 shadow-lg mt-2">
            SCANNING DYNAMICS • DYNORUN TEST ACTIVE
          </div>
        </div>
      )}

      {/* Main SVG Container */}
      <svg
        viewBox="0 0 800 450"
        className="w-full h-full max-h-[460px] drop-shadow-[0_15px_30px_rgba(0,0,0,0.7)] transition-all duration-700 ease-out"
        style={
          {
            '--vehicle-paint': isBlueprintMode
              ? 'rgba(56, 189, 248, 0.2)'
              : (vehicleId === 'car'
                ? '#0284c7'
                : vehicleId === 'lorry'
                ? '#f59e0b'
                : vehicleId === 'bike'
                ? '#dc2626'
                : vehicleId === 'jcb'
                ? '#eab308'
                : vehicleId === 'tractor'
                ? '#16a34a'
                : vehicleId === 'auto'
                ? '#0284c7'
                : vehicleId === 'train'
                ? '#7c3aed'
                : vehicleId === 'airplane'
                ? '#38bdf8'
                : vehicleId === 'helicopter'
                ? '#059669'
                : '#0369a1'),
          } as React.CSSProperties
        }
      >
        <defs>
          {/* Blueprint Grid Pattern */}
          <pattern id="bpGrid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(56, 189, 248, 0.15)" strokeWidth="0.8" />
          </pattern>

          {/* Gradients */}
          <linearGradient id="metalGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#94a3b8" />
            <stop offset="50%" stopColor="#64748b" />
            <stop offset="100%" stopColor="#334155" />
          </linearGradient>

          <linearGradient id="glowLaser" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="#00f0ff" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>

          <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fde047" />
            <stop offset="50%" stopColor="#eab308" />
            <stop offset="100%" stopColor="#ca8a04" />
          </linearGradient>

          <linearGradient id="glassGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(186, 230, 253, 0.7)" />
            <stop offset="100%" stopColor="rgba(56, 189, 248, 0.25)" />
          </linearGradient>

          <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Blueprint background grid if active */}
        {isBlueprintMode && (
          <rect x="0" y="0" width="800" height="450" fill="url(#bpGrid)" />
        )}

        {/* Factory Overhead Crane & Hook (animates into view) */}
        <g className="transition-transform duration-700 ease-in-out" transform={isEngine || isDoorsOrWings ? 'translate(0, 0)' : 'translate(0, -60)'}>
          <line x1="380" y1="20" x2="380" y2="110" stroke="#64748b" strokeWidth="2.5" strokeDasharray="4 2" />
          <line x1="420" y1="20" x2="420" y2="110" stroke="#64748b" strokeWidth="2.5" strokeDasharray="4 2" />
          <rect x="360" y="105" width="80" height="15" rx="3" fill="#334155" stroke="#94a3b8" strokeWidth="1.5" />
          <path d="M 400 120 L 400 145 A 15 15 0 0 1 385 160" fill="none" stroke="#f59e0b" strokeWidth="4" strokeLinecap="round" />
        </g>

        {/* Robotic Welding Arms positioned around vehicle */}
        <g className="transition-opacity duration-500" opacity={isWelding ? 1 : 0.2}>
          {/* Left Robotic Arm */}
          <g transform="translate(90, 240)">
            {/* Base */}
            <rect x="-25" y="60" width="50" height="30" rx="4" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
            {/* Lower Segment */}
            <line x1="0" y1="60" x2="50" y2="0" stroke="#334155" strokeWidth="12" strokeLinecap="round" />
            <circle cx="50" cy="0" r="8" fill="#f59e0b" />
            {/* Upper Segment */}
            <line x1="50" y1="0" x2="110" y2="30" stroke="#475569" strokeWidth="8" strokeLinecap="round" />
            <circle cx="110" cy="30" r="6" fill="#f59e0b" />
            {/* Welding Torch Head */}
            <path d="M 110 30 L 135 45" stroke="#00f0ff" strokeWidth="4" strokeLinecap="round" />
            {isWelding && <circle cx="135" cy="45" r="5" fill="#fef08a" filter="url(#glowEffect)" />}
          </g>

          {/* Right Robotic Arm */}
          <g transform="translate(680, 240)">
            {/* Base */}
            <rect x="-25" y="60" width="50" height="30" rx="4" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
            {/* Lower Segment */}
            <line x1="0" y1="60" x2="-50" y2="0" stroke="#334155" strokeWidth="12" strokeLinecap="round" />
            <circle cx="-50" cy="0" r="8" fill="#f59e0b" />
            {/* Upper Segment */}
            <line x1="-50" y1="0" x2="-105" y2="35" stroke="#475569" strokeWidth="8" strokeLinecap="round" />
            <circle cx="-105" cy="35" r="6" fill="#f59e0b" />
            {/* Welding Torch Head */}
            <path d="M -105 35 L -130 50" stroke="#00f0ff" strokeWidth="4" strokeLinecap="round" />
            {isWelding && <circle cx="-130" cy="50" r="5" fill="#fef08a" filter="url(#glowEffect)" />}
          </g>
        </g>

        {/* ========================================================================= */}
        {/* VEHICLE-SPECIFIC GRAPHIC RENDERING ACCORDING TO CURRENT STAGE             */}
        {/* ========================================================================= */}

        {/* 1. CAR */}
        {vehicleId === 'car' && (
          <g id="car-assembly" transform="translate(140, 150)">
            {/* Stage: Raw Materials / Steel Coils (Visible in step 1 & 2) */}
            {isRaw && (
              <g id="raw-steel-coils" className="animate-pulse">
                {/* Steel Ingot & Sheet Roll */}
                <ellipse cx="250" cy="180" rx="90" ry="25" fill="#475569" stroke="#94a3b8" strokeWidth="3" />
                <path d="M 160 180 L 160 130 A 90 25 0 0 1 340 130 L 340 180" fill="#64748b" stroke="#94a3b8" strokeWidth="3" />
                <ellipse cx="250" cy="130" rx="90" ry="25" fill="#94a3b8" stroke="#cbd5e1" strokeWidth="3" />
                <ellipse cx="250" cy="130" rx="40" ry="12" fill="#1e293b" />
                <text x="250" y="230" textAnchor="middle" fill="#38bdf8" fontSize="14" fontFamily="monospace">
                  HIGH-TENSILE GALVANIZED STEEL COIL (25 TONS)
                </text>
              </g>
            )}

            {/* Stage: Frame / Chassis Underbody (Visible from step 3 onwards) */}
            {isFrame && (
              <g id="car-chassis">
                {/* Lower structural floor pan */}
                <path
                  d="M 50 160 L 460 160 L 480 130 L 40 130 Z"
                  fill={isBlueprintMode ? 'rgba(56, 189, 248, 0.15)' : '#334155'}
                  stroke={strokeColor}
                  strokeWidth="2.5"
                />
                {/* Structural unibody pillars & cage */}
                <path
                  d="M 60 130 L 120 70 L 370 70 L 460 130"
                  fill="none"
                  stroke={isWelding ? '#00f0ff' : strokeColor}
                  strokeWidth={isBlueprintMode ? '2' : '3.5'}
                  strokeDasharray={!visualStage.weldingActive && currentStep.stepNumber <= 5 ? '6 4' : 'none'}
                />
              </g>
            )}

            {/* Stage: Welded Panels & Body Shell */}
            {(isWelding || isPainted || isCompleted) && (
              <g id="car-body-panels" className="transition-all duration-700">
                {/* Aerodynamic Body Contour */}
                <path
                  d="M 30 145 C 30 120, 70 120, 110 115 C 150 75, 200 45, 270 45 C 340 45, 410 75, 440 110 L 485 125 C 500 135, 495 150, 480 150 L 435 150 C 425 125, 375 125, 365 150 L 155 150 C 145 125, 95 125, 85 150 L 35 150 Z"
                  fill={isPainted ? 'var(--vehicle-paint)' : (isBlueprintMode ? 'rgba(56, 189, 248, 0.25)' : '#475569')}
                  stroke={strokeColor}
                  strokeWidth="2.5"
                />
              </g>
            )}

            {/* Stage: Engine & Powertrain (Step 8+) */}
            {isEngine && (
              <g id="car-engine" transform="translate(60, 95)">
                <rect x="0" y="0" width="70" height="45" rx="5" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                <line x1="15" y1="10" x2="55" y2="10" stroke="#94a3b8" strokeWidth="3" />
                <line x1="15" y1="20" x2="55" y2="20" stroke="#94a3b8" strokeWidth="3" />
                <line x1="15" y1="30" x2="55" y2="30" stroke="#94a3b8" strokeWidth="3" />
                <circle cx="20" cy="40" r="4" fill="#00f0ff" />
                <circle cx="50" cy="40" r="4" fill="#00f0ff" />
              </g>
            )}

            {/* Stage: Interior Cockpit & Seats (Step 10+) */}
            {isInterior && (
              <g id="car-interior" transform="translate(180, 65)">
                {/* Front Seat */}
                <path d="M 40 45 L 55 15 L 75 15 L 70 45 Z" fill="#1e293b" stroke="#64748b" strokeWidth="1.5" />
                {/* Rear Seat */}
                <path d="M 120 45 L 135 15 L 155 15 L 150 45 Z" fill="#1e293b" stroke="#64748b" strokeWidth="1.5" />
                {/* Steering Wheel & Dashboard */}
                <line x1="30" y1="25" x2="42" y2="40" stroke="#94a3b8" strokeWidth="2.5" />
                <circle cx="28" cy="22" r="7" fill="none" stroke="#f59e0b" strokeWidth="2" />
              </g>
            )}

            {/* Stage: Glass Windshield & Windows (Step 12+) */}
            {isGlass && (
              <g id="car-glass">
                {/* Front Windshield */}
                <path d="M 125 110 L 165 55 L 260 55 L 255 110 Z" fill="url(#glassGrad)" stroke="#38bdf8" strokeWidth="1.5" />
                {/* Rear Window */}
                <path d="M 270 110 L 275 55 L 365 55 L 420 110 Z" fill="url(#glassGrad)" stroke="#38bdf8" strokeWidth="1.5" />
              </g>
            )}

            {/* Stage: Doors, Exterior Trim & LED Headlamps (Step 13+) */}
            {isDoorsOrWings && (
              <g id="car-doors-trim">
                {/* Door Seam Lines */}
                <line x1="262" y1="58" x2="260" y2="148" stroke="#1e293b" strokeWidth="2" />
                <line x1="165" y1="58" x2="155" y2="148" stroke="#1e293b" strokeWidth="2" />
                <line x1="375" y1="58" x2="395" y2="148" stroke="#1e293b" strokeWidth="2" />
                {/* Door Handles */}
                <rect x="225" y="115" width="16" height="4" rx="2" fill="#cbd5e1" />
                <rect x="330" y="115" width="16" height="4" rx="2" fill="#cbd5e1" />
                {/* LED Headlamp */}
                <path d="M 32 135 L 50 135 L 45 145 L 34 145 Z" fill={isCompleted ? '#67e8f9' : '#e2e8f0'} filter={isCompleted ? 'url(#glowEffect)' : undefined} />
                {/* Taillamp */}
                <path d="M 480 130 L 492 135 L 488 145 L 476 145 Z" fill={isCompleted ? '#ef4444' : '#991b1b'} filter={isCompleted ? 'url(#glowEffect)' : undefined} />
              </g>
            )}

            {/* Stage: Wheels & Tires (Step 14+) */}
            {isWheels && (
              <g id="car-wheels">
                {/* Front Wheel */}
                <g transform="translate(120, 150)">
                  <circle cx="0" cy="0" r="38" fill="#0f172a" stroke="#334155" strokeWidth="5" />
                  <circle cx="0" cy="0" r="26" fill="#1e293b" stroke="#94a3b8" strokeWidth="2" />
                  <circle cx="0" cy="0" r="14" fill="#f59e0b" />
                  <circle cx="0" cy="0" r="5" fill="#ffffff" />
                  {/* Spokes */}
                  <line x1="-22" y1="0" x2="22" y2="0" stroke="#cbd5e1" strokeWidth="2.5" />
                  <line x1="0" y1="-22" x2="0" y2="22" stroke="#cbd5e1" strokeWidth="2.5" />
                </g>

                {/* Rear Wheel */}
                <g transform="translate(400, 150)">
                  <circle cx="0" cy="0" r="38" fill="#0f172a" stroke="#334155" strokeWidth="5" />
                  <circle cx="0" cy="0" r="26" fill="#1e293b" stroke="#94a3b8" strokeWidth="2" />
                  <circle cx="0" cy="0" r="14" fill="#f59e0b" />
                  <circle cx="0" cy="0" r="5" fill="#ffffff" />
                  {/* Spokes */}
                  <line x1="-22" y1="0" x2="22" y2="0" stroke="#cbd5e1" strokeWidth="2.5" />
                  <line x1="0" y1="-22" x2="0" y2="22" stroke="#cbd5e1" strokeWidth="2.5" />
                </g>
              </g>
            )}

            {/* Final Completed Car Headlight Beams */}
            {isCompleted && (
              <g id="headlight-beam" opacity="0.4">
                <polygon points="32,135 -120,80 -120,200 34,145" fill="url(#glowLaser)" />
              </g>
            )}
          </g>
        )}

        {/* 2. LORRY / TRUCK */}
        {vehicleId === 'lorry' && (
          <g id="lorry-assembly" transform="translate(110, 140)">
            {/* Chassis Ladder Frame (Always from step 1) */}
            {isFrame && (
              <g id="lorry-frame">
                {/* Long C-channel steel rail */}
                <rect x="20" y="140" width="560" height="24" rx="3" fill="#1e293b" stroke={strokeColor} strokeWidth="3" />
                {/* Crossmembers */}
                <rect x="120" y="142" width="10" height="20" fill="#64748b" />
                <rect x="250" y="142" width="10" height="20" fill="#64748b" />
                <rect x="380" y="142" width="10" height="20" fill="#64748b" />
                <rect x="490" y="142" width="10" height="20" fill="#64748b" />
              </g>
            )}

            {/* Axles & Suspension */}
            {(currentStep.stepNumber >= 2 || isWheels) && (
              <g id="lorry-axles">
                {/* Tandem Rear Axles */}
                <rect x="420" y="155" width="40" height="15" rx="3" fill="#475569" stroke="#94a3b8" />
                <rect x="480" y="155" width="40" height="15" rx="3" fill="#475569" stroke="#94a3b8" />
                {/* Front Steer Axle */}
                <rect x="90" y="155" width="30" height="15" rx="3" fill="#475569" stroke="#94a3b8" />
              </g>
            )}

            {/* Powertrain: 13-Liter Commercial Diesel */}
            {isEngine && (
              <g id="lorry-engine" transform="translate(80, 95)">
                <rect x="0" y="0" width="110" height="50" rx="4" fill="#0f172a" stroke="#f59e0b" strokeWidth="2.5" />
                <circle cx="30" cy="25" r="14" fill="#334155" />
                <rect x="65" y="10" width="35" height="30" fill="#1e293b" stroke="#94a3b8" />
                <text x="18" y="28" fill="#38bdf8" fontSize="10" fontFamily="monospace">TURBO</text>
              </g>
            )}

            {/* Cabin Body & Welding (Step 4+) */}
            {(currentStep.stepNumber >= 4 || isPainted || isCompleted) && (
              <g id="lorry-cabin">
                {/* Sleeper Cabin Box */}
                <path
                  d="M 30 140 L 30 40 C 30 25, 45 15, 65 15 L 180 15 C 190 15, 195 25, 195 40 L 195 140 Z"
                  fill={isPainted ? 'var(--vehicle-paint)' : (isBlueprintMode ? 'rgba(56, 189, 248, 0.25)' : '#475569')}
                  stroke={strokeColor}
                  strokeWidth="3"
                />
                {/* Roof Air Deflector Fairing */}
                <path d="M 65 15 L 195 15 L 195 -15 Z" fill={isPainted ? 'var(--vehicle-paint)' : '#334155'} stroke={strokeColor} strokeWidth="2" />
              </g>
            )}

            {/* Cargo Body / Flatbed / Container Subframe (Step 7+) */}
            {(currentStep.stepNumber >= 7 || isExteriorTrim || isCompleted) && (
              <g id="lorry-cargo">
                <rect
                  x="210"
                  y="10"
                  width="360"
                  height="130"
                  rx="4"
                  fill={isPainted ? '#1e293b' : '#334155'}
                  stroke={strokeColor}
                  strokeWidth="2.5"
                />
                {/* Ribbed Cargo Container Wall */}
                {Array.from({ length: 9 }).map((_, i) => (
                  <line key={i} x1={235 + i * 38} y1="15" x2={235 + i * 38} y2="135" stroke="#475569" strokeWidth="2" />
                ))}
              </g>
            )}

            {/* Windshield & Cabin Glass (Step 10+) */}
            {isGlass && (
              <g id="lorry-glass">
                <path d="M 35 30 L 95 30 L 95 85 L 35 85 Z" fill="url(#glassGrad)" stroke="#38bdf8" strokeWidth="2" />
                <path d="M 105 30 L 165 30 L 165 85 L 105 85 Z" fill="url(#glassGrad)" stroke="#38bdf8" strokeWidth="2" />
              </g>
            )}

            {/* Wheels (Step 8+) */}
            {isWheels && (
              <g id="lorry-wheels">
                {/* Front Wheel */}
                <g transform="translate(105, 160)">
                  <circle cx="0" cy="0" r="42" fill="#020617" stroke="#334155" strokeWidth="6" />
                  <circle cx="0" cy="0" r="28" fill="#1e293b" stroke="#cbd5e1" strokeWidth="3" />
                  <circle cx="0" cy="0" r="16" fill="#f59e0b" />
                  <circle cx="0" cy="0" r="5" fill="#ffffff" />
                </g>
                {/* Rear Tandem 1 */}
                <g transform="translate(440, 160)">
                  <circle cx="0" cy="0" r="42" fill="#020617" stroke="#334155" strokeWidth="6" />
                  <circle cx="0" cy="0" r="28" fill="#1e293b" stroke="#cbd5e1" strokeWidth="3" />
                  <circle cx="0" cy="0" r="16" fill="#f59e0b" />
                  <circle cx="0" cy="0" r="5" fill="#ffffff" />
                </g>
                {/* Rear Tandem 2 */}
                <g transform="translate(520, 160)">
                  <circle cx="0" cy="0" r="42" fill="#020617" stroke="#334155" strokeWidth="6" />
                  <circle cx="0" cy="0" r="28" fill="#1e293b" stroke="#cbd5e1" strokeWidth="3" />
                  <circle cx="0" cy="0" r="16" fill="#f59e0b" />
                  <circle cx="0" cy="0" r="5" fill="#ffffff" />
                </g>
              </g>
            )}
          </g>
        )}

        {/* 3. BIKE / MOTORCYCLE */}
        {vehicleId === 'bike' && (
          <g id="bike-assembly" transform="translate(170, 130)">
            {/* Trellis Frame (Step 1+) */}
            {isFrame && (
              <g id="bike-trellis" stroke={strokeColor} strokeWidth="3.5" fill="none">
                <line x1="160" y1="100" x2="280" y2="70" />
                <line x1="160" y1="100" x2="240" y2="130" />
                <line x1="280" y1="70" x2="240" y2="130" />
                <line x1="280" y1="70" x2="340" y2="120" />
                <line x1="240" y1="130" x2="340" y2="120" />
                <line x1="240" y1="130" x2="190" y2="160" />
              </g>
            )}

            {/* Engine & Exhaust (Step 2+) */}
            {isEngine && (
              <g id="bike-engine" transform="translate(200, 100)">
                <polygon points="10,10 65,5 85,55 25,65" fill="#0f172a" stroke="#f59e0b" strokeWidth="2.5" />
                {/* Hydroformed Exhaust Pipe */}
                <path d="M 65 55 Q 110 90 180 80" fill="none" stroke="#38bdf8" strokeWidth="5" strokeLinecap="round" />
                {/* Exhaust Canister */}
                <rect x="180" y="65" width="55" height="25" rx="5" fill="#334155" stroke="#cbd5e1" strokeWidth="2" />
              </g>
            )}

            {/* Suspension: Inverted Front Forks & Rear Swingarm (Step 4+) */}
            {(currentStep.stepNumber >= 4 || isWheels) && (
              <g id="bike-suspension">
                {/* Inverted Front Forks */}
                <line x1="140" y1="50" x2="90" y2="170" stroke="#eab308" strokeWidth="6" strokeLinecap="round" />
                {/* Rear Swingarm */}
                <line x1="260" y1="130" x2="380" y2="170" stroke="#64748b" strokeWidth="8" strokeLinecap="round" />
                {/* Monoshock */}
                <rect x="265" y="105" width="12" height="30" rx="3" fill="#ef4444" stroke="#ffffff" strokeWidth="1" transform="rotate(-30, 265, 105)" />
              </g>
            )}

            {/* Body Fairings & Fuel Tank (Step 6+) */}
            {(isExteriorTrim || isPainted || isCompleted) && (
              <g id="bike-fairings">
                {/* Sculpted Fuel Tank */}
                <path
                  d="M 170 85 C 180 40, 240 40, 280 70 L 260 95 Z"
                  fill={isPainted ? 'var(--vehicle-paint)' : '#475569'}
                  stroke={strokeColor}
                  strokeWidth="2.5"
                />
                {/* Aerodynamic Front Cowl & Winglet */}
                <path
                  d="M 120 70 L 160 50 L 180 95 L 140 120 Z"
                  fill={isPainted ? 'var(--vehicle-paint)' : '#475569'}
                  stroke={strokeColor}
                  strokeWidth="2"
                />
                {/* Downforce Winglet */}
                <path d="M 130 90 L 105 95" stroke="#00f0ff" strokeWidth="3" strokeLinecap="round" />
              </g>
            )}

            {/* Saddle & Windscreen (Step 9+) */}
            {(isInterior || isCompleted) && (
              <g id="bike-seat-screen">
                {/* Rider Seat & Tail Cowl */}
                <path d="M 275 75 L 320 80 L 370 65 L 340 95 Z" fill="#0f172a" stroke="#94a3b8" strokeWidth="1.5" />
                {/* Bubble Windscreen */}
                <path d="M 130 65 Q 145 25 165 40" fill="url(#glassGrad)" stroke="#38bdf8" strokeWidth="2" />
              </g>
            )}

            {/* Wheels & Brembo Brakes (Step 5+) */}
            {isWheels && (
              <g id="bike-wheels">
                {/* Front Wheel */}
                <g transform="translate(90, 170)">
                  <circle cx="0" cy="0" r="44" fill="#020617" stroke="#334155" strokeWidth="7" />
                  <circle cx="0" cy="0" r="30" fill="none" stroke="#dc2626" strokeWidth="4" />
                  <circle cx="0" cy="0" r="18" fill="#1e293b" stroke="#cbd5e1" strokeWidth="2" />
                  {/* Brembo Brake Caliper */}
                  <rect x="12" y="-10" width="12" height="20" rx="3" fill="#ef4444" />
                </g>
                {/* Rear Wheel */}
                <g transform="translate(380, 170)">
                  <circle cx="0" cy="0" r="44" fill="#020617" stroke="#334155" strokeWidth="8" />
                  <circle cx="0" cy="0" r="30" fill="none" stroke="#dc2626" strokeWidth="4" />
                  <circle cx="0" cy="0" r="18" fill="#1e293b" stroke="#cbd5e1" strokeWidth="2" />
                </g>
              </g>
            )}
          </g>
        )}

        {/* 4. JCB / EXCAVATOR */}
        {vehicleId === 'jcb' && (
          <g id="jcb-assembly" transform="translate(130, 140)">
            {/* Undercarriage & Slew Ring Frame (Step 1+) */}
            {isFrame && (
              <g id="jcb-turntable">
                <rect x="120" y="130" width="220" height="30" rx="4" fill="#1e293b" stroke={strokeColor} strokeWidth="3" />
                {/* Slew Ring Bearing */}
                <circle cx="230" cy="120" r="24" fill="#334155" stroke="#f59e0b" strokeWidth="3" />
              </g>
            )}

            {/* Crawler Tracks (Step 8+) */}
            {isWheels && (
              <g id="jcb-tracks">
                <rect x="80" y="150" width="300" height="42" rx="20" fill="#090d16" stroke="#334155" strokeWidth="6" />
                {/* Track Idler & Drive Wheels */}
                <circle cx="105" cy="171" r="16" fill="#475569" stroke="#cbd5e1" strokeWidth="2" />
                <circle cx="160" cy="171" r="13" fill="#334155" />
                <circle cx="210" cy="171" r="13" fill="#334155" />
                <circle cx="260" cy="171" r="13" fill="#334155" />
                <circle cx="310" cy="171" r="13" fill="#334155" />
                <circle cx="355" cy="171" r="16" fill="#475569" stroke="#cbd5e1" strokeWidth="2" />
              </g>
            )}

            {/* Upper Machine House & Engine (Step 6+) */}
            {(isEngine || isPainted || isCompleted) && (
              <g id="jcb-body">
                {/* Counterweight & Engine Hood */}
                <path
                  d="M 210 120 L 350 120 C 365 120, 375 105, 375 80 L 375 40 L 210 40 Z"
                  fill={isPainted ? 'var(--vehicle-paint)' : '#475569'}
                  stroke={strokeColor}
                  strokeWidth="3"
                />
              </g>
            )}

            {/* ROPS Cabin (Step 7+) */}
            {(isInterior || isCompleted) && (
              <g id="jcb-cabin">
                <path d="M 140 120 L 210 120 L 210 20 L 160 20 L 140 70 Z" fill="#1e293b" stroke={strokeColor} strokeWidth="3" />
                {/* Large Glass Window */}
                <path d="M 148 68 L 165 26 L 202 26 L 202 85 L 148 85 Z" fill="url(#glassGrad)" stroke="#38bdf8" strokeWidth="1.5" />
              </g>
            )}

            {/* Excavator Boom, Dipper Arm & Bucket (Step 2, 3, 4+) */}
            {currentStep.stepNumber >= 2 && (
              <g id="jcb-arm-assembly">
                {/* Main Curved Box-Section Boom */}
                <path
                  d="M 180 90 Q 110 -20 20 -40 L 15 -25 Q 100 -5 165 105 Z"
                  fill={isPainted ? 'var(--vehicle-paint)' : '#eab308'}
                  stroke="#78350f"
                  strokeWidth="2.5"
                />
                {/* Main Hydraulic Ram */}
                <line x1="190" y1="105" x2="95" y2="20" stroke="#cbd5e1" strokeWidth="6" strokeLinecap="round" />
                <line x1="95" y1="20" x2="60" y2="-15" stroke="#f59e0b" strokeWidth="10" strokeLinecap="round" />

                {/* Dipper Arm (Step 3+) */}
                {currentStep.stepNumber >= 3 && (
                  <g id="jcb-dipper">
                    <line x1="20" y1="-35" x2="-60" y2="60" stroke={isPainted ? 'var(--vehicle-paint)' : '#ca8a04'} strokeWidth="14" strokeLinecap="round" />
                    {/* Bucket (Step 4+) */}
                    {currentStep.stepNumber >= 4 && (
                      <g id="jcb-bucket" transform="translate(-60, 60)">
                        <path d="M 0 0 C -30 20, -50 60, -20 80 L 10 50 Z" fill="#334155" stroke="#1e293b" strokeWidth="3" />
                        {/* Rock Teeth */}
                        <polygon points="-25,78 -35,95 -18,88" fill="#fde047" />
                        <polygon points="-15,82 -25,98 -8,90" fill="#fde047" />
                      </g>
                    )}
                  </g>
                )}
              </g>
            )}
          </g>
        )}

        {/* 5. TRACTOR */}
        {vehicleId === 'tractor' && (
          <g id="tractor-assembly" transform="translate(170, 140)">
            {/* Cast-Iron Backbone (Step 1+) */}
            {isFrame && (
              <g id="tractor-backbone">
                <rect x="80" y="110" width="220" height="35" rx="5" fill="#1e293b" stroke={strokeColor} strokeWidth="3" />
              </g>
            )}

            {/* High-Torque Engine & Hood (Step 2+) */}
            {(isEngine || isPainted || isCompleted) && (
              <g id="tractor-hood">
                <path
                  d="M 80 110 L 80 55 C 80 45, 95 40, 115 40 L 230 40 L 230 110 Z"
                  fill={isPainted ? 'var(--vehicle-paint)' : '#475569'}
                  stroke={strokeColor}
                  strokeWidth="3"
                />
                {/* Exhaust Stack */}
                <rect x="180" y="-15" width="8" height="55" rx="2" fill="#0f172a" stroke="#64748b" />
              </g>
            )}

            {/* Deluxe Operator Cabin (Step 7+) */}
            {(isInterior || isCompleted) && (
              <g id="tractor-cabin">
                <path d="M 230 110 L 330 110 L 330 -10 L 230 -10 Z" fill="#1e293b" stroke={strokeColor} strokeWidth="3" />
                {/* 360 Curved Glass */}
                <path d="M 238 80 L 238 0 L 322 0 L 322 80 Z" fill="url(#glassGrad)" stroke="#38bdf8" strokeWidth="2" />
                {/* Green Roof Cap */}
                <rect x="220" y="-20" width="120" height="15" rx="4" fill={isPainted ? 'var(--vehicle-paint)' : '#16a34a'} />
              </g>
            )}

            {/* Hydraulic Three-Point Rear Hitch (Step 5+) */}
            {currentStep.stepNumber >= 5 && (
              <g id="tractor-hitch">
                <line x1="330" y1="120" x2="380" y2="135" stroke="#f59e0b" strokeWidth="6" strokeLinecap="round" />
                <line x1="330" y1="90" x2="370" y2="105" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />
              </g>
            )}

            {/* Wheels: Giant Rear Lug Tires & Small Front Steer (Step 6+) */}
            {isWheels && (
              <g id="tractor-wheels">
                {/* Massive Rear Chevron Lug Wheel */}
                <g transform="translate(320, 130)">
                  <circle cx="0" cy="0" r="65" fill="#090d16" stroke="#1e293b" strokeWidth="8" />
                  <circle cx="0" cy="0" r="42" fill="#eab308" stroke="#ca8a04" strokeWidth="3" />
                  <circle cx="0" cy="0" r="16" fill="#090d16" />
                  {/* Herringbone Tread Cleats */}
                  {Array.from({ length: 12 }).map((_, i) => (
                    <line
                      key={i}
                      x1="0"
                      y1="-62"
                      x2="8"
                      y2="-50"
                      stroke="#475569"
                      strokeWidth="4"
                      transform={`rotate(${i * 30})`}
                    />
                  ))}
                </g>
                {/* Front Steering Wheel */}
                <g transform="translate(100, 145)">
                  <circle cx="0" cy="0" r="35" fill="#090d16" stroke="#1e293b" strokeWidth="5" />
                  <circle cx="0" cy="0" r="22" fill="#eab308" stroke="#ca8a04" strokeWidth="2" />
                  <circle cx="0" cy="0" r="8" fill="#090d16" />
                </g>
              </g>
            )}
          </g>
        )}

        {/* 6. AUTO / AUTO RICKSHAW */}
        {vehicleId === 'auto' && (
          <g id="auto-assembly" transform="translate(200, 130)">
            {/* 3-Wheel Backbone Chassis (Step 1+) */}
            {isFrame && (
              <g id="auto-chassis">
                <line x1="80" y1="140" x2="280" y2="140" stroke={strokeColor} strokeWidth="6" strokeLinecap="round" />
                <line x1="80" y1="140" x2="110" y2="60" stroke={strokeColor} strokeWidth="5" strokeLinecap="round" />
              </g>
            )}

            {/* Rear Engine (Step 2+) */}
            {isEngine && (
              <g id="auto-engine" transform="translate(220, 115)">
                <rect x="0" y="0" width="55" height="30" rx="4" fill="#0f172a" stroke="#f59e0b" strokeWidth="2" />
              </g>
            )}

            {/* Front Apron & Mudguard (Step 5+) */}
            {(currentStep.stepNumber >= 5 || isPainted || isCompleted) && (
              <g id="auto-body">
                {/* Front Scuttle Apron */}
                <path d="M 85 140 L 90 60 L 135 60 L 130 140 Z" fill={isPainted ? 'var(--vehicle-paint)' : '#475569'} stroke={strokeColor} strokeWidth="2.5" />
                {/* Passenger Floor & Rear Side Panel */}
                <path d="M 130 140 L 290 140 L 290 85 L 170 85 Z" fill={isPainted ? 'var(--vehicle-paint)' : '#475569'} stroke={strokeColor} strokeWidth="2.5" />
              </g>
            )}

            {/* Weatherproof Vinyl Canopy Roof (Step 6+) */}
            {(isDoorsOrWings || isCompleted) && (
              <g id="auto-canopy">
                {/* Canopy Curved Arch */}
                <path
                  d="M 90 60 C 90 15, 140 10, 200 10 C 260 10, 295 15, 295 85"
                  fill="none"
                  stroke="#eab308"
                  strokeWidth="20"
                  strokeLinecap="round"
                />
              </g>
            )}

            {/* Seats & Handlebars (Step 7+) */}
            {(isInterior || isCompleted) && (
              <g id="auto-interior">
                {/* Passenger Rear Bench */}
                <rect x="220" y="80" width="55" height="25" rx="3" fill="#1e293b" stroke="#cbd5e1" strokeWidth="1.5" />
                {/* Driver Saddle */}
                <rect x="140" y="95" width="30" height="15" rx="3" fill="#1e293b" />
                {/* Handlebars */}
                <line x1="120" y1="65" x2="135" y2="55" stroke="#cbd5e1" strokeWidth="3" />
              </g>
            )}

            {/* Windshield (Step 10+) */}
            {isGlass && (
              <polygon points="92,58 105,20 135,20 132,58" fill="url(#glassGrad)" stroke="#38bdf8" strokeWidth="1.5" />
            )}

            {/* Three Wheels (Step 4+) */}
            {isWheels && (
              <g id="auto-wheels">
                {/* Front Single Wheel */}
                <g transform="translate(85, 155)">
                  <circle cx="0" cy="0" r="28" fill="#090d16" stroke="#334155" strokeWidth="5" />
                  <circle cx="0" cy="0" r="16" fill="#64748b" stroke="#cbd5e1" strokeWidth="2" />
                </g>
                {/* Rear Wheel */}
                <g transform="translate(255, 155)">
                  <circle cx="0" cy="0" r="30" fill="#090d16" stroke="#334155" strokeWidth="6" />
                  <circle cx="0" cy="0" r="18" fill="#64748b" stroke="#cbd5e1" strokeWidth="2" />
                </g>
              </g>
            )}
          </g>
        )}

        {/* 7. TRAIN */}
        {vehicleId === 'train' && (
          <g id="train-assembly" transform="translate(90, 140)">
            {/* 25-Meter Underframe Chassis (Step 1+) */}
            {isFrame && (
              <g id="train-underframe">
                <rect x="20" y="130" width="600" height="20" rx="3" fill="#1e293b" stroke={strokeColor} strokeWidth="3" />
              </g>
            )}

            {/* Dual Bogie Wheelsets (Step 2+) */}
            {isWheels && (
              <g id="train-bogies">
                {/* Front Bogie */}
                <g transform="translate(130, 145)">
                  <rect x="-60" y="0" width="120" height="15" rx="4" fill="#334155" stroke="#94a3b8" />
                  <circle cx="-40" cy="18" r="24" fill="#020617" stroke="#94a3b8" strokeWidth="4" />
                  <circle cx="40" cy="18" r="24" fill="#020617" stroke="#94a3b8" strokeWidth="4" />
                </g>
                {/* Rear Bogie */}
                <g transform="translate(510, 145)">
                  <rect x="-60" y="0" width="120" height="15" rx="4" fill="#334155" stroke="#94a3b8" />
                  <circle cx="-40" cy="18" r="24" fill="#020617" stroke="#94a3b8" strokeWidth="4" />
                  <circle cx="40" cy="18" r="24" fill="#020617" stroke="#94a3b8" strokeWidth="4" />
                </g>
              </g>
            )}

            {/* Coach Body Shell & Bullet Nose (Step 4+) */}
            {(currentStep.stepNumber >= 4 || isPainted || isCompleted) && (
              <g id="train-body">
                {/* Aerodynamic Bullet Coach */}
                <path
                  d="M 30 130 C 15 130, 0 110, 10 90 L 70 30 C 90 20, 120 20, 160 20 L 620 20 L 620 130 Z"
                  fill={isPainted ? 'var(--vehicle-paint)' : '#475569'}
                  stroke={strokeColor}
                  strokeWidth="3"
                />
              </g>
            )}

            {/* Roof Pantograph (Step 3+) */}
            {isEngine && (
              <g id="train-pantograph" transform="translate(460, 20)">
                <line x1="0" y1="0" x2="30" y2="-30" stroke="#f59e0b" strokeWidth="3" />
                <line x1="30" y1="-30" x2="10" y2="-55" stroke="#f59e0b" strokeWidth="3" />
                <line x1="-15" y1="-55" x2="35" y2="-55" stroke="#00f0ff" strokeWidth="4" strokeLinecap="round" />
              </g>
            )}

            {/* Sliding Doors & Panoramic Passenger Windows (Step 5+) */}
            {isGlass && (
              <g id="train-windows">
                {/* Driver Cockpit Windscreen */}
                <polygon points="18,88 65,35 105,35 75,88" fill="url(#glassGrad)" stroke="#38bdf8" strokeWidth="1.5" />
                {/* Passenger Window Array */}
                {Array.from({ length: 7 }).map((_, i) => (
                  <rect
                    key={i}
                    x={150 + i * 65}
                    y="45"
                    width="45"
                    height="30"
                    rx="4"
                    fill="url(#glassGrad)"
                    stroke="#38bdf8"
                    strokeWidth="1.5"
                  />
                ))}
              </g>
            )}
          </g>
        )}

        {/* 8. AIRPLANE */}
        {vehicleId === 'airplane' && (
          <g id="airplane-assembly" transform="translate(110, 130)">
            {/* Fuselage Barrel (Step 1-2+) */}
            {isFrame && (
              <g id="plane-fuselage">
                {/* Long Aerodynamic Fuselage Tube */}
                <path
                  d="M 40 90 C 20 80, 20 60, 50 50 L 520 50 L 590 15 L 595 20 L 550 90 Z"
                  fill={isPainted ? 'var(--vehicle-paint)' : (isBlueprintMode ? 'rgba(56, 189, 248, 0.25)' : '#475569')}
                  stroke={strokeColor}
                  strokeWidth="3"
                />
              </g>
            )}

            {/* Swept Wings & Winglets (Step 3+) */}
            {isDoorsOrWings && (
              <g id="plane-wings">
                {/* Main Port Wing */}
                <polygon
                  points="220,70 140,165 190,165 340,70"
                  fill={isPainted ? 'var(--vehicle-paint)' : '#334155'}
                  stroke={strokeColor}
                  strokeWidth="2.5"
                />
                {/* Winglet */}
                <line x1="140" y1="165" x2="135" y2="145" stroke="#00f0ff" strokeWidth="4" strokeLinecap="round" />
              </g>
            )}

            {/* Turbofan Jet Engines (Step 5+) */}
            {isEngine && (
              <g id="plane-engine" transform="translate(210, 105)">
                {/* Engine Nacelle */}
                <ellipse cx="40" cy="20" rx="38" ry="18" fill="#1e293b" stroke="#f59e0b" strokeWidth="2.5" />
                <ellipse cx="10" cy="20" rx="10" ry="16" fill="#00f0ff" filter="url(#glowEffect)" />
              </g>
            )}

            {/* Passenger Windows & Cockpit Glass (Step 9+) */}
            {isGlass && (
              <g id="plane-windows">
                {/* Cockpit Window */}
                <polygon points="35,68 55,54 75,54 62,68" fill="url(#glassGrad)" stroke="#38bdf8" />
                {/* Passenger Cabin Window String */}
                {Array.from({ length: 14 }).map((_, i) => (
                  <circle key={i} cx={110 + i * 28} cy="62" r="5" fill="url(#glassGrad)" stroke="#38bdf8" />
                ))}
              </g>
            )}

            {/* Tricycle Landing Gear (Step 4+) */}
            {isWheels && (
              <g id="plane-gear">
                {/* Nose Gear */}
                <line x1="90" y1="90" x2="90" y2="150" stroke="#cbd5e1" strokeWidth="4" />
                <circle cx="86" cy="155" r="10" fill="#020617" />
                <circle cx="94" cy="155" r="10" fill="#020617" />
                {/* Main Gear */}
                <line x1="280" y1="90" x2="280" y2="155" stroke="#cbd5e1" strokeWidth="5" />
                <circle cx="272" cy="160" r="14" fill="#020617" stroke="#334155" strokeWidth="3" />
                <circle cx="288" cy="160" r="14" fill="#020617" stroke="#334155" strokeWidth="3" />
              </g>
            )}
          </g>
        )}

        {/* 9. HELICOPTER */}
        {vehicleId === 'helicopter' && (
          <g id="helo-assembly" transform="translate(160, 130)">
            {/* Tubular Spaceframe & Cabin Pod (Step 1+) */}
            {isFrame && (
              <g id="helo-cabin">
                <path
                  d="M 60 90 C 30 70, 40 30, 80 20 L 260 20 C 285 20, 300 45, 300 70 L 260 95 Z"
                  fill={isPainted ? 'var(--vehicle-paint)' : '#475569'}
                  stroke={strokeColor}
                  strokeWidth="3"
                />
              </g>
            )}

            {/* Tail Boom & Anti-Torque Tail Rotor (Step 5+) */}
            {currentStep.stepNumber >= 5 && (
              <g id="helo-tail">
                <polygon points="260,35 480,25 480,40 260,65" fill={isPainted ? 'var(--vehicle-paint)' : '#334155'} stroke={strokeColor} strokeWidth="2.5" />
                {/* Vertical Fin & Tail Rotor */}
                <polygon points="460,40 485,-10 495,-10 480,60" fill="#f59e0b" />
                <circle cx="485" cy="5" r="20" fill="none" stroke="#00f0ff" strokeWidth="2" strokeDasharray="6 3" />
              </g>
            )}

            {/* Turboshaft Engines & Main Gearbox (Step 2+) */}
            {isEngine && (
              <g id="helo-engines" transform="translate(160, -5)">
                <rect x="0" y="0" width="80" height="25" rx="5" fill="#0f172a" stroke="#f59e0b" strokeWidth="2" />
                {/* Rotor Mast */}
                <rect x="35" y="-30" width="10" height="30" fill="#cbd5e1" stroke="#334155" />
                {/* Swashplate */}
                <ellipse cx="40" cy="-20" rx="18" ry="5" fill="#eab308" />
              </g>
            )}

            {/* Main Rotor Blades (Step 4+) */}
            {isDoorsOrWings && (
              <g id="helo-blades" transform="translate(200, -35)">
                <line x1="-220" y1="0" x2="220" y2="0" stroke="#cbd5e1" strokeWidth="5" strokeLinecap="round" />
                <line x1="-220" y1="0" x2="-220" y2="-5" stroke="#ef4444" strokeWidth="6" />
                <line x1="220" y1="0" x2="220" y2="-5" stroke="#ef4444" strokeWidth="6" />
              </g>
            )}

            {/* Bubble Canopy Glass (Step 7+) */}
            {isGlass && (
              <path d="M 60 85 C 42 70, 48 35, 82 25 L 140 25 L 135 85 Z" fill="url(#glassGrad)" stroke="#38bdf8" strokeWidth="2" />
            )}

            {/* Landing Skids (Step 6+) */}
            {isWheels && (
              <g id="helo-skids">
                <line x1="60" y1="135" x2="270" y2="135" stroke="#64748b" strokeWidth="6" strokeLinecap="round" />
                <line x1="110" y1="95" x2="100" y2="135" stroke="#cbd5e1" strokeWidth="4" />
                <line x1="220" y1="95" x2="210" y2="135" stroke="#cbd5e1" strokeWidth="4" />
              </g>
            )}
          </g>
        )}

        {/* 10. SHIP */}
        {vehicleId === 'ship' && (
          <g id="ship-assembly" transform="translate(100, 140)">
            {/* Keel Block & Outer Hull (Step 1-2+) */}
            {isFrame && (
              <g id="ship-hull">
                {/* Massive Cargo Ship Hull with Bulbous Bow */}
                <path
                  d="M 50 70 L 530 70 L 580 135 C 570 145, 550 150, 520 150 L 80 150 C 50 150, 20 140, 15 130 C 15 110, 40 85, 50 70 Z"
                  fill={isPainted ? 'var(--vehicle-paint)' : '#334155'}
                  stroke={strokeColor}
                  strokeWidth="3"
                />
                {/* Bulbous Bow protruding underwater */}
                <ellipse cx="28" cy="138" rx="20" ry="12" fill="#ef4444" stroke="#991b1b" strokeWidth="2" />
              </g>
            )}

            {/* Marine Two-Stroke Engine (Step 3+) */}
            {isEngine && (
              <g id="ship-engine" transform="translate(420, 75)">
                <rect x="0" y="0" width="60" height="60" rx="3" fill="#0f172a" stroke="#f59e0b" strokeWidth="2.5" />
                <text x="8" y="35" fill="#38bdf8" fontSize="10" fontFamily="monospace">80K HP</text>
              </g>
            )}

            {/* Bronze Propeller (Step 4+) */}
            {currentStep.stepNumber >= 4 && (
              <g id="ship-propeller" transform="translate(565, 138)">
                <ellipse cx="0" cy="0" rx="8" ry="24" fill="url(#goldGrad)" stroke="#78350f" strokeWidth="1.5" />
                <ellipse cx="0" cy="0" rx="24" ry="8" fill="url(#goldGrad)" stroke="#78350f" strokeWidth="1.5" />
                <circle cx="0" cy="0" r="6" fill="#451a03" />
              </g>
            )}

            {/* Container Stacks (Step 9+) */}
            {currentStep.stepNumber >= 9 && (
              <g id="ship-containers">
                {/* Multi-Colored Container Blocks */}
                {Array.from({ length: 6 }).map((_, i) => (
                  <g key={i} transform={`translate(${110 + i * 50}, 10)`}>
                    <rect x="0" y="0" width="46" height="58" fill={['#dc2626', '#0284c7', '#16a34a', '#eab308', '#ea580c', '#0284c7'][i]} stroke="#0f172a" strokeWidth="1.5" />
                    <line x1="23" y1="0" x2="23" y2="58" stroke="#0f172a" strokeWidth="1" />
                    <line x1="0" y1="29" x2="46" y2="29" stroke="#0f172a" strokeWidth="1" />
                  </g>
                ))}
              </g>
            )}

            {/* Superstructure Bridge Deckhouse (Step 6+) */}
            {isDoorsOrWings && (
              <g id="ship-bridge" transform="translate(430, -20)">
                <rect x="0" y="0" width="80" height="90" rx="2" fill="#f8fafc" stroke="#334155" strokeWidth="2.5" />
                {/* Bridge Wing Windows */}
                <rect x="-10" y="5" width="100" height="15" rx="2" fill="url(#glassGrad)" stroke="#38bdf8" />
                {/* Radar Mast */}
                <line x1="40" y1="0" x2="40" y2="-25" stroke="#64748b" strokeWidth="3" />
                <line x1="25" y1="-25" x2="55" y2="-25" stroke="#f59e0b" strokeWidth="4" />
              </g>
            )}
          </g>
        )}
      </svg>
    </div>
  );
};

