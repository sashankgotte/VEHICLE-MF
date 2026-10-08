import React, { useState } from 'react';
import { VEHICLES_DATA } from './data/vehiclesData';
import { Vehicle } from './types/vehicle';
import { Navbar } from './components/Navbar';
import { VehicleCard } from './components/VehicleCard';
import { VehicleDetail } from './components/VehicleDetail';
import { sounds } from './utils/soundEffects';
import {
  Compass,
  Search,
  Filter,
  Flame,
  Factory,
  CheckCircle2,
  Award,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

export function App() {
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isMuted, setIsMuted] = useState<boolean>(sounds.getMuted());

  // Distinct categories
  const categories = [
    { id: 'all', label: 'All Vehicles' },
    { id: 'automotive', label: 'Automotive & Transit' },
    { id: 'heavy', label: 'Heavy Machinery' },
    { id: 'aviation', label: 'Aviation & Marine' },
  ];

  const handleSelectVehicle = (vehicle: Vehicle) => {
    sounds.playClick();
    setSelectedVehicle(vehicle);
  };

  const handleBackToVehicles = () => {
    sounds.playClick();
    setSelectedVehicle(null);
  };

  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    sounds.setMuted(nextMuted);
    setIsMuted(nextMuted);
  };

  // Filtered vehicles list
  const filteredVehicles = VEHICLES_DATA.filter((v) => {
    const matchesSearch =
      v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.steps.some((s) => s.title.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;

    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'automotive') {
      return ['car', 'lorry', 'bike', 'auto', 'train'].includes(v.id);
    }
    if (selectedCategory === 'heavy') {
      return ['jcb', 'tractor'].includes(v.id);
    }
    if (selectedCategory === 'aviation') {
      return ['airplane', 'helicopter', 'ship'].includes(v.id);
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-[#070a13] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-black">
      {/* Top Navbar */}
      <Navbar
        onHomeClick={() => setSelectedVehicle(null)}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
      />

      {/* Main Body: Either Dedicated Detail Page OR Selection Grid */}
      {selectedVehicle ? (
        <VehicleDetail
          vehicle={selectedVehicle}
          onBack={handleBackToVehicles}
          onSelectOtherVehicle={handleBackToVehicles}
        />
      ) : (
        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full">
          {/* Hero Banner Section */}
          <div className="relative text-center py-10 sm:py-16 overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900/80 via-slate-900/40 to-transparent p-6 sm:p-12 mb-12 shadow-2xl">
            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-b from-cyan-500/15 via-blue-500/10 to-transparent blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-3xl mx-auto space-y-4">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs uppercase tracking-widest">
                <Factory className="w-3.5 h-3.5 text-cyan-400" />
                <span>Interactive Manufacturing Academy</span>
              </div>

              {/* Title as requested in prompt */}
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white uppercase text-glow">
                VEHICLE WORLD
              </h1>

              {/* Subtitle as requested in prompt */}
              <p className="text-lg sm:text-2xl font-bold font-mono tracking-wider text-amber-400">
                DISCOVER • DESIGN • BUILD
              </p>

              {/* Description as requested in prompt */}
              <p className="text-slate-300 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed pt-1">
                "Explore how the world's vehicles are designed, assembled, tested, and brought to life."
              </p>

              {/* Search & Filter Bar */}
              <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-xl mx-auto">
                <div className="relative w-full">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search vehicle or manufacturing step (e.g. Welding, Engine, Jet)..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/90 border border-slate-700/90 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono transition"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>

              {/* Category Filter Chips */}
              <div className="flex flex-wrap items-center justify-center gap-2 pt-3">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      sounds.playClick();
                      setSelectedCategory(cat.id);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition ${
                      selectedCategory === cat.id
                        ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                        : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Factory Statistics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-10">
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                <Factory className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-mono text-slate-400 uppercase">Production Lines</span>
                <p className="text-lg font-bold font-mono text-white">10 Heavy Bays</p>
              </div>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-mono text-slate-400 uppercase">Assembly Steps</span>
                <p className="text-lg font-bold font-mono text-white">125+ Interactive</p>
              </div>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-mono text-slate-400 uppercase">Quality Gates</span>
                <p className="text-lg font-bold font-mono text-white">100% Verified</p>
              </div>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center text-violet-400">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-mono text-slate-400 uppercase">Educational Mode</span>
                <p className="text-lg font-bold font-mono text-white">Digital Twin 3D</p>
              </div>
            </div>
          </div>

          {/* Section Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-black tracking-wide text-white uppercase flex items-center gap-2">
                <span>SELECT A VEHICLE</span>
                <span className="text-xs font-mono font-normal px-2 py-0.5 rounded bg-slate-800 text-cyan-400 border border-slate-700">
                  {filteredVehicles.length} Models
                </span>
              </h2>
              <p className="text-sm text-slate-400">
                Click any vehicle card to enter its step-by-step manufacturing assembly line.
              </p>
            </div>
          </div>

          {/* Vehicle Cards Grid - All 10 Vehicles */}
          {filteredVehicles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVehicles.map((vehicle) => (
                <VehicleCard
                  key={vehicle.id}
                  vehicle={vehicle}
                  onSelect={handleSelectVehicle}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-slate-900/40 rounded-2xl border border-slate-800">
              <p className="text-slate-400 font-mono mb-2">No vehicles found matching "{searchQuery}"</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="text-xs font-mono text-cyan-400 underline hover:text-cyan-300"
              >
                Reset Search Filters
              </button>
            </div>
          )}
        </main>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-8 px-4 text-center text-slate-400 text-xs font-mono">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white tracking-wider">VEHICLE WORLD</span>
            <span>•</span>
            <span className="text-amber-400">DISCOVER • DESIGN • BUILD</span>
          </div>
          <p>
            Interactive Manufacturing Journey &copy; 2026. Designed for STEM & Engineering Education.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
