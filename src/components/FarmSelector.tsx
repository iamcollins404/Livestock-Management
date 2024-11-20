import React from 'react';
import { Building2, ChevronDown } from 'lucide-react';
import { useFarm } from '../context/FarmContext';

export default function FarmSelector() {
  const { selectedFarm, setSelectedFarm, farms } = useFarm();

  return (
    <div className="relative flex items-center">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <Building2 className="h-5 w-5 text-white" />
      </div>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
        <ChevronDown className="h-4 w-4 text-white" />
      </div>
      <select
        value={selectedFarm?.id || ''}
        onChange={(e) => {
          const farm = farms.find(f => f.id === e.target.value);
          setSelectedFarm(farm || null);
        }}
        className="appearance-none block w-full rounded-md border-0 bg-white/10 py-2 pl-10 pr-10 text-white placeholder-white/70 focus:ring-2 focus:ring-white/30 text-sm font-medium hover:bg-white/20 transition-colors"
        style={{ minWidth: '200px' }}
      >
        {farms.map((farm) => (
          <option key={farm.id} value={farm.id} className="text-gray-900">
            {farm.name}
          </option>
        ))}
      </select>
    </div>
  );
}