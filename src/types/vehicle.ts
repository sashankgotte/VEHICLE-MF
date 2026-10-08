export type VehicleId =
  | 'car'
  | 'lorry'
  | 'bike'
  | 'jcb'
  | 'tractor'
  | 'auto'
  | 'train'
  | 'airplane'
  | 'helicopter'
  | 'ship';

export type StepCategory =
  | 'materials'
  | 'frame'
  | 'welding'
  | 'paint'
  | 'powertrain'
  | 'chassis'
  | 'interior'
  | 'electrical'
  | 'assembly'
  | 'testing'
  | 'completion';

export interface StepMetric {
  label: string;
  value: string;
}

export interface ManufacturingStep {
  id: number;
  stepNumber: number;
  title: string;
  subtitle: string;
  category: StepCategory;
  shortDesc: string;
  details: string;
  funFact: string;
  metrics: StepMetric[];
  tools: string[];
  soundType?: 'welding' | 'hydraulic' | 'spray' | 'pneumatic' | 'drill' | 'laser' | 'engine' | 'horn';
  // State indicators for visual progression
  visualStage: {
    rawMaterials: boolean;
    frame: boolean;
    weldingActive: boolean;
    painted: boolean;
    engineInstalled: boolean;
    interiorInstalled: boolean;
    glassInstalled: boolean;
    wheelsOrTracksInstalled: boolean;
    doorsOrWingsInstalled: boolean;
    exteriorTrimInstalled: boolean;
    testingActive: boolean;
    completed: boolean;
  };
}

export interface Vehicle {
  id: VehicleId;
  name: string;
  shortTitle: string;
  category: string;
  badge: string;
  emoji: string;
  tagline: string;
  shortDescription: string;
  overview: string;
  themeColor: string;
  accentGlow: string;
  factoryName: string;
  specs: { label: string; value: string }[];
  steps: ManufacturingStep[];
}

