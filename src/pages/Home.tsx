import React from 'react';
import { Activity, Users, Scale, Thermometer } from 'lucide-react';

const stats = [
  { name: 'Total Farms', value: '12', icon: Users, change: '+2', changeType: 'increase' },
  { name: 'Average Weight', value: '450kg', icon: Scale, change: '+5%', changeType: 'increase' },
  { name: 'Health Score', value: '92%', icon: Activity, change: '+2%', changeType: 'increase' },
  { name: 'Temperature', value: '38.5°C', icon: Thermometer, change: 'Normal', changeType: 'neutral' },
];

const recentVisits = [
  {
    farm: 'Green Meadows Farm',
    date: '2024-03-15',
    status: 'Healthy',
    notes: 'Regular checkup completed. All livestock in good condition.',
  },
  {
    farm: 'Highland Ranch',
    date: '2024-03-14',
    status: 'Attention Needed',
    notes: 'Two cattle showing signs of mild respiratory issues.',
  },
];

export default function Home() {
  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <div className="mt-3 sm:mt-0">
          <button className="btn-primary">
            New Visit
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.name}
              className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6"
            >
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Icon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {stat.name}
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {stat.value}
                      </div>
                      <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                        stat.changeType === 'increase' ? 'text-green-600' : 
                        stat.changeType === 'decrease' ? 'text-red-600' : 'text-gray-500'
                      }`}>
                        {stat.change}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="overflow-hidden bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h2 className="text-lg font-medium text-gray-900">Recent Visits</h2>
        </div>
        <div className="border-t border-gray-200">
          <ul role="list" className="divide-y divide-gray-200">
            {recentVisits.map((visit, index) => (
              <li key={index} className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <p className="text-sm font-medium text-primary">{visit.farm}</p>
                    <p className="text-sm text-gray-500">{visit.date}</p>
                  </div>
                  <div className="flex items-center">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      visit.status === 'Healthy' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {visit.status}
                    </span>
                  </div>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-gray-600">{visit.notes}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}