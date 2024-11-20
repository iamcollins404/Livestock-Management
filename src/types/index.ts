export interface Farm {
  id: string;
  name: string;
  location: string;
  farmerName: string;
  contactNumber: string;
  livestockCount: number;
  livestock: {
    cattle: number;
    pigs: number;
    goats: number;
    sheep: number;
    chicken: number;
  };
}

export interface Visit {
  id: string;
  farmId: string;
  date: string;
  vetName: string;
  notes: string;
  healthMetrics: {
    weight: number;
    temperature: number;
    healthScore: number;
  }[];
  recommendations: string;
}

export interface LivestockMetrics {
  totalWeight: number;
  averageWeight: number;
  feedConversionRatio: number;
  mortalityRate: number;
  healthScore: number;
}

export type LivestockType = 'cattle' | 'pigs' | 'goats' | 'sheep' | 'chicken';