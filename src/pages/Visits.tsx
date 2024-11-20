import React from 'react';
import { Plus, Calendar, User, Building2 } from 'lucide-react';

const mockVisits = [
  {
    id: '1',
    farmName: 'Green Meadows Farm',
    date: '2024-03-15',
    vetName: 'Dr. Emily Wilson',
    status: 'Completed',
    healthScore: 92,
    notes: 'Regular checkup completed. All livestock in good condition.',
  },
  {
    id: '2',
    farmName: 'Highland Ranch',
    date: '2024-03-14',
    vetName: 'Dr. Michael Chen',
    status: 'Attention Required',
    healthScore: 78,
    notes: 'Two cattle showing signs of mild respiratory issues. Follow-up recommended.',
  },
];

export default function Visits() {
  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Farm Visits</h1>
        <div className="mt-4 sm:mt-0">
          <button className="btn-primary">
            <Plus className="h-4 w-4 mr-2" />
            New Visit
          </button>
        </div>
      </div>

      <div className="overflow-hidden bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h2 className="text-lg font-medium text-gray-900">Recent Visits</h2>
        </div>
        <ul role="list" className="divide-y divide-gray-200">
          {mockVisits.map((visit) => (
            <li key={visit.id} className="px-4 py-5 sm:px-6">
              <div className="flex items-center justify-between">
                <div className="flex flex-col space-y-1">
                  <div className="flex items-center">
                    <Building2 className="h-5 w-5 text-gray-400 mr-2" />
                    <p className="text-sm font-medium text-primary">{visit.farmName}</p>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                    <p className="text-sm text-gray-500">{visit.date}</p>
                  </div>
                  <div className="flex items-center">
                    <User className="h-5 w-5 text-gray-400 mr-2" />
                    <p className="text-sm text-gray-500">{visit.vetName}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    visit.status === 'Completed' 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {visit.status}
                  </span>
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-900 mr-2">Health Score:</span>
                    <span className={`text-sm font-medium ${
                      visit.healthScore >= 90 ? 'text-green-600' :
                      visit.healthScore >= 70 ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>
                      {visit.healthScore}%
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-600">{visit.notes}</p>
              </div>
              <div className="mt-4">
                <button className="text-sm font-medium text-primary hover:text-primary-dark">
                  View Details
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}