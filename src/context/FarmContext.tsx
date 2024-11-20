import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Farm, LivestockType } from '../types';

// Mock data
export const mockFarms: Farm[] = [
  {
    id: '1',
    name: 'Green Meadows Farm',
    location: 'Springfield, IL',
    farmerName: 'John Smith',
    contactNumber: '+1 (555) 123-4567',
    livestockCount: 150,
    livestock: {
      cattle: 50,
      pigs: 30,
      goats: 25,
      sheep: 35,
      chicken: 10
    }
  },
  {
    id: '2',
    name: 'Highland Ranch',
    location: 'Boulder, CO',
    farmerName: 'Sarah Johnson',
    contactNumber: '+1 (555) 987-6543',
    livestockCount: 200,
    livestock: {
      cattle: 80,
      pigs: 40,
      goats: 30,
      sheep: 40,
      chicken: 10
    }
  },
  {
    id: '3',
    name: 'Valley View Farms',
    location: 'Portland, OR',
    farmerName: 'Michael Brown',
    contactNumber: '+1 (555) 456-7890',
    livestockCount: 175,
    livestock: {
      cattle: 60,
      pigs: 35,
      goats: 25,
      sheep: 45,
      chicken: 10
    }
  },
];

interface FarmContextType {
  selectedFarm: Farm | null;
  setSelectedFarm: (farm: Farm | null) => void;
  farms: Farm[];
  updateFarmLivestock: (farmId: string, type: LivestockType, count: number) => void;
}

const FarmContext = createContext<FarmContextType | undefined>(undefined);

export function FarmProvider({ children }: { children: ReactNode }) {
  const [farms, setFarms] = useState<Farm[]>(mockFarms);
  const [selectedFarm, setSelectedFarm] = useState<Farm | null>(farms[0]);

  const updateFarmLivestock = (farmId: string, type: LivestockType, count: number) => {
    setFarms(prevFarms => {
      return prevFarms.map(farm => {
        if (farm.id === farmId) {
          const updatedLivestock = {
            ...farm.livestock,
            [type]: farm.livestock[type] + count
          };
          const totalCount = Object.values(updatedLivestock).reduce((a, b) => a + b, 0);
          return {
            ...farm,
            livestock: updatedLivestock,
            livestockCount: totalCount
          };
        }
        return farm;
      });
    });
  };
  
  return (
    <FarmContext.Provider value={{ selectedFarm, setSelectedFarm, farms, updateFarmLivestock }}>
      {children}
    </FarmContext.Provider>
  );
}

export function useFarm() {
  const context = useContext(FarmContext);
  if (context === undefined) {
    throw new Error('useFarm must be used within a FarmProvider');
  }
  return context;
}