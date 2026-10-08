import React from 'react';
import { Vehicle } from '../types/vehicle';
import { ArrowRight, Layers, Cpu, CheckCircle } from 'lucide-react';
import { VehicleGraphic } from './VehicleGraphic';

interface VehicleCardProps {
  vehicle: Vehicle;
  onSelect: (vehicle: Vehicle) => void;
}

export const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle, onSelect }) => {
  const completedStep = vehicle.steps[vehicle.steps.length - 1];

  return (
    <div
      onClick={() => onSelect(vehicle)}
      className="group relative flex flex-col rounded-2xl border border-slate-800 bg-slate-900/60 hover:bg-slate-900/95 hover:border-cyan-500/60 transition-all duration-300 hover:shadow-[0_10px_35px_rgba(6,182,212,0.2)] hover:-translate-y-1 overflow-hidden cursor-pointer backdrop-blur-sm"
    >
      {/* Top Banner & Category Badge */}
      <div className="flex items-center justify-between p-4 pb-2 border-b border-slate-800/60">
        <div className="flex items-center gap-2">
          <span className="text-xl" role="img" aria-label={vehicle.name}>
            {vehicle.emoji}
          </span>
          <span className="text-xs font-mono font-bold tracking-wider uppercase text-cyan-400">
            {vehicle.category}
          </span>
        </div>
        <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
          {vehicle.steps.length} Steps
        </span>
      </div>

      {/* Vehicle Visual Showcase Preview Area */}
      <div className="relative w-full h-48 bg-gradient-to-b from-slate-950 via-[#0a1020] to-slate-900 flex items-center justify-center p-3 overflow-hidden border-b border-slate-800/80">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-industrial-grid opacity-30 pointer-events-none" />

        {/* Ambient colored blur */}
        <div
          className="absolute w-36 h-20 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity pointer-events-none"
          style={{ backgroundColor: vehicle.themeColor }}
        />

        {/* Scaled preview of the completed vehicle */}
        <div className="w-full h-full transform scale-90 group-hover:scale-95 transition-transform duration-500 flex items-center justify-center">
          <VehicleGraphic
            vehicleId={vehicle.id}
            currentStep={completedStep}
            progressPercent={100}
            isBlueprintMode={false}
            isPlaying={false}
          />
        </div>

        {/* Hover overlay hint */}
        <div className="absolute inset-0 bg-cyan-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <span className="text-xs font-mono font-bold tracking-widest text-cyan-300 px-3 py-1 rounded-full bg-slate-900/90 border border-cyan-500/50 shadow-lg">
            VIEW ASSEMBLY LINE
          </span>
        </div>
      </div>

      {/* Card Content Details */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-baseline justify-between mb-1">
            <h3 className="text-xl font-black tracking-wide text-white group-hover:text-cyan-300 transition-colors">
              {vehicle.name}
            </h3>
          </div>
          <p className="text-xs font-mono text-amber-400 mb-2">
            {vehicle.tagline}
          </p>
          <p className="text-sm text-slate-300 line-clamp-2 leading-relaxed">
            {vehicle.shortDescription}
          </p>
        </div>

        {/* Tech Specs Badges */}
        <div className="grid grid-cols-2 gap-1.5 pt-1">
          {vehicle.specs.slice(0, 2).map((spec, sIdx) => (
            <div key={sIdx} className="bg-slate-950/60 rounded px-2 py-1 text-[11px] font-mono border border-slate-800">
              <span className="text-slate-400 block text-[9px]">{spec.label}</span>
              <span className="text-slate-200 font-bold truncate block">{spec.value}</span>
            </div>
          ))}
        </div>

        {/* Action Button: EXPLORE MANUFACTURING as required in prompt */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelect(vehicle);
          }}
          className="w-full mt-2 py-3 px-4 rounded-xl font-bold font-mono text-xs tracking-wider uppercase bg-gradient-to-r from-slate-800 to-slate-800 group-hover:from-cyan-500 group-hover:to-blue-600 text-slate-300 group-hover:text-slate-950 border border-slate-700 group-hover:border-cyan-400 transition-all duration-300 flex items-center justify-center gap-2 shadow-md group-hover:shadow-cyan-500/25"
        >
          <span>EXPLORE MANUFACTURING</span>
          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

