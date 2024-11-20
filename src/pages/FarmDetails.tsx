import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFarm } from '../context/FarmContext';
import { Beef, Squirrel, Bird, MapPin, Phone, User, Plus } from 'lucide-react';
import { LivestockType } from '../types';
import AddAnimalModal, { AnimalFormValues } from '../components/AddAnimalModal';

const livestockIcons = {
  cattle: Beef,
  pigs: Squirrel,
  goats: Bird,
  sheep: Bird,
  chicken: Bird,
};

const breedOptions = {
  cattle: ['Angus', 'Hereford', 'Holstein', 'Jersey', 'Brahman'],
  pigs: ['Duroc', 'Hampshire', 'Yorkshire', 'Berkshire', 'Landrace'],
  goats: ['Boer', 'Nubian', 'Alpine', 'Saanen', 'LaMancha'],
  sheep: ['Merino', 'Suffolk', 'Dorper', 'Romney', 'Texel'],
  chicken: ['Leghorn', 'Rhode Island Red', 'Plymouth Rock', 'Orpington', 'Australorp'],
};

// Mock data for existing animals
const existingAnimals = [
  { id: '1', name: 'Bella', type: 'cattle', breed: 'Angus' },
  { id: '2', name: 'Duke', type: 'cattle', breed: 'Hereford' },
  { id: '3', name: 'Luna', type: 'cattle', breed: 'Holstein' },
];

export default function FarmDetails() {
  const { id } = useParams();
  const { farms, updateFarmLivestock } = useFarm();
  const [showAddModal, setShowAddModal] = useState(false);

  const farm = farms.find(f => f.id === id);

  if (!farm) {
    return <div>Farm not found</div>;
  }

  const handleAddLivestock = (values: AnimalFormValues) => {
    updateFarmLivestock(farm.id, values.type, 1);
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            {farm.name}
          </h2>
          <div className="mt-4 flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-6">
            <div className="flex items-center">
              <MapPin className="h-5 w-5 text-gray-400 mr-2" />
              <p className="text-sm text-gray-500">{farm.location}</p>
            </div>
            <div className="flex items-center">
              <User className="h-5 w-5 text-gray-400 mr-2" />
              <p className="text-sm text-gray-500">{farm.farmerName}</p>
            </div>
            <div className="flex items-center">
              <Phone className="h-5 w-5 text-gray-400 mr-2" />
              <p className="text-sm text-gray-500">{farm.contactNumber}</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
          <div className="sm:flex sm:items-center sm:justify-between mb-6">
            <h3 className="text-lg font-medium text-gray-900">Livestock Inventory</h3>
            <button
              onClick={() => setShowAddModal(true)}
              className="btn-primary"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Animal
            </button>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {(Object.keys(farm.livestock) as LivestockType[]).map((type) => {
              const Icon = livestockIcons[type];
              return (
                <div
                  key={type}
                  className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm hover:border-primary"
                >
                  <div className="flex-shrink-0">
                    <Icon className="h-10 w-10 text-gray-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900 capitalize">
                      {type}
                    </p>
                    <p className="text-lg font-semibold text-primary">
                      {farm.livestock[type]}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {showAddModal && (
        <AddAnimalModal
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAddLivestock}
          breedOptions={breedOptions}
          existingAnimals={existingAnimals}
        />
      )}
    </div>
  );
}