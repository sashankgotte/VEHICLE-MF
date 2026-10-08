# VEHICLE WORLD 🚀
### DISCOVER • DESIGN • BUILD

A modern, interactive educational web platform demonstrating **how different vehicles are designed, engineered, and manufactured from START to FINISH**.

---

## 🌟 Key Features

1. **Vehicle Selection Catalog (10 Complete Vehicles)**:
   - 🚗 **CAR** (16 Steps: Raw materials, Cold stamping, Unibody frame, Robotic welding, Cathodic dip & paint booth, Powertrain marriage, Cockpit & seats, Electronics, Acoustic glass, Wheels, Dyno testing, Inspection)
   - 🚛 **LORRY / TRUCK** (12 Steps: High-tensile ladder chassis, Heavy tandem axles, 13L diesel powertrain, Sleeper cabin, Anti-corrosion enamel, Cargo tipper/flatbed, 22.5" dual wheels, Pneumatic brakes, Load testing)
   - 🏍️ **BIKE / MOTORCYCLE** (11 Steps: Chromoly trellis frame, 998cc DOHC engine, Fuel injection & exhaust, Inverted DLC forks & monoshock, Forged wheels & Brembo brakes, Carbon fairings, Livery paint, 6-axis IMU, Dyno calibration)
   - 🚜 **JCB / EXCAVATOR** (12 Steps: Steel slew ring turntable, Box-section boom, Articulated dipper arm, Rock-tooth bucket, 350-bar hydraulics, EcoMAX diesel engine, ROPS safety cabin, Crawler tracks, JCB yellow coating, Load test)
   - 🚜 **TRACTOR** (11 Steps: Cast-iron backbone chassis, High-torque ag diesel, CVT transmission & PTO, Pivoting front steer axle, Category 3 three-point hitch, 2-meter rear chevron lug tires, Deluxe climate cabin, ISOBUS lights, Drawbar test)
   - 🛺 **AUTO / AUTO RICKSHAW** (11 Steps: Tubular triangular backbone, 200cc rear engine, Single-sided front fork & rear shocks, Three 10" wheels, Stamped steel apron, Weatherproof vinyl canopy, Cushioned seating, 12V harness, Dual-tone paint, Dyno test)
   - 🚆 **TRAIN** (12 Steps: 25-meter stainless steel underframe, Dual-axle bogies & solid forged wheels, 25kV electric motors & roof pantograph, Aerodynamic bullet coach, Sliding plug doors, Floating acoustic floor, Seating & HVAC, ETCS signaling, 320 km/h dynamic test)
   - ✈️ **AIRPLANE** (14 Steps: Titanium wing spars & carbon ribs, Cylindrical fuselage barrels, Wing box mating, Retractable tricycle landing gear, 70,000-lbf turbofans, Glass cockpit Fly-by-Wire, 100 miles of wiring, Pressurized cabin, High-altitude triple windows, Livery paint, Pressurization test, Run-up test)
   - 🚁 **HELICOPTER** (12 Steps: Aluminum-lithium tubular spaceframe, Twin turboshafts & reduction gearbox, Articulated titanium rotor mast & swashplate, Carbon composite blades, Fenestron tail rotor boom, Landing skids, Panoramic bubble canopy, 4-axis autopilot, High-vis rescue paint, Dynamic track-and-balance)
   - 🚢 **SHIP** (13 Steps: Steel keel laying in drydock, Watertight bulkheads & modular blocks, 80,000-HP four-story marine diesel, 9.2-meter bronze propeller, Ballast & LNG tanks, 9-tier superstructure bridge, Auxiliary generators, Navigation bridge with ARPA radar, Container cell guides, Anti-fouling silicone hull paint, Drydock flooding, Sea trials)

2. **Step-by-Step Interactive Manufacturing Player**:
   - Layered dynamic SVG graphics demonstrating physical vehicle construction as parts appear, drop in, get welded, painted, and tested.
   - **Factory Environment**: Overhead gantry cranes, conveyor platform, dual 6-axis robotic welding arms with electrical sparks, paint booth spray particles, laser scanning grids, and dyno rollers.
   - **Player Controls**:
     - ▶ Play / ⏸ Pause
     - 🔄 Replay
     - ⏩ Next Step / ⏪ Previous Step
     - Interactive scrubbable Progress Bar with step markers
     - Step counter (e.g. `STEP 04 / 16`)
     - Step Title & Live Operation Summary
     - Manufacturing progress gauge (e.g. `Progress: ███████░░░░ 25%`)
     - Speed adjustments: `1x`, `1.5x`, `2x`
     - **Blueprint / Wireframe Mode Toggle** (reveals technical schematics and inner engineering lines)
     - **Synthesized Web Audio Sound Effects** (welding sizzle, pneumatic clamps, paint spray, laser scans, celebratory horns - 100% offline, zero network dependencies)

3. **Vertical Step-by-Step Timeline**:
   - Cards running from top to bottom
   - Displays Step Number, Category, Title, Subtitle, Engineering Details, Metrics (Pressure, Temperature, Tolerances), Tools Used, and Fun Facts
   - Click any card to jump immediately to that stage in the simulation

4. **Celebration Completion Screen**:
   - Automatic trigger upon completing the final step
   - Multi-burst celebratory confetti (`canvas-confetti`)
   - Large gleaming vehicle showcase with showroom turntable lighting
   - Quality inspection certifications (ISO 9001:2026, 100% Quality Passed)
   - **WATCH AGAIN** and **EXPLORE ANOTHER VEHICLE** buttons

---

## 🛠️ Technology Stack

- **React 19** + **TypeScript**
- **Vite 8**
- **Tailwind CSS v4**
- **Lucide React** (Industrial & Control Icons)
- **Canvas Confetti** (Celebratory effects)
- **Web Audio API** (Procedural procedural audio synthesis)

---

## 🚀 Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Run local development server
```bash
npm run dev
```

### 3. Build for production
```bash
npm run build
```

### 4. Preview production build
```bash
npm run preview
```

---

## 📱 Responsive Support
Fully optimized for:
- Desktop & Ultrawide Displays
- Laptops
- Tablets
- Mobile smartphones
