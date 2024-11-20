import React, { useState } from 'react';
import { Plus, Search, MapPin, Phone, Building2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useFarm } from '../context/FarmContext';

export default function Farms() {
  const [searchTerm, setSearchTerm] = useState('');
  const { farms } = useFarm();
  const navigate = useNavigate();

  const filteredFarms = farms.filter(farm =>
    farm.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    farm.farmerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFarmClick = (farmId: string) => {
    navigate(`/farms/${farmId}`);
  };

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Farms</h1>
        <div className="mt-4 sm:mt-0">
          <button className="btn-primary">
            <Plus className="h-4 w-4 mr-2" />
            Add Farm
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
        <div className="relative flex-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
            placeholder="Search farms..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="overflow-hidden bg-white shadow sm:rounded-lg">
        <ul role="list" className="divide-y divide-gray-200">
          {filteredFarms.map((farm) => (
            <li 
              key={farm.id} 
              className="relative flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6 cursor-pointer"
              onClick={() => handleFarmClick(farm.id)}
            >
              <div className="flex min-w-0 gap-x-4">
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    {farm.name}
                  </p>
                  <p className="mt-1 flex text-xs leading-5 text-gray-500">
                    <MapPin className="mr-1 h-4 w-4 flex-shrink-0 text-gray-400" />
                    {farm.location}
                  </p>
                  <p className="mt-1 flex text-xs leading-5 text-gray-500">
                    <Phone className="mr-1 h-4 w-4 flex-shrink-0 text-gray-400" />
                    {farm.contactNumber}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <p className="text-sm leading-6 text-gray-900">
                  {farm.farmerName}
                </p>
                <p className="mt-1 text-xs leading-5 text-gray-500">
                  {farm.livestockCount} livestock
                </p>
                <div className="mt-1 flex items-center gap-x-1.5">
                  <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  </div>
                  <p className="text-xs leading-5 text-gray-500">Active</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}