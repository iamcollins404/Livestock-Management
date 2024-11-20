import React from 'react';
import { BarChart, TrendingUp, Scale, Activity } from 'lucide-react';

const performanceMetrics = [
  {
    label: 'Feed Conversion Ratio',
    value: '1.8',
    change: '-0.2',
    changeType: 'decrease',
    description: 'kg feed per kg gain',
    icon: Scale,
  },
  {
    label: 'Average Daily Gain',
    value: '0.9',
    change: '+0.1',
    changeType: 'increase',
    description: 'kg per day',
    icon: TrendingUp,
  },
  {
    label: 'Mortality Rate',
    value: '2.1%',
    change: '-0.5%',
    changeType: 'decrease',
    description: 'last 30 days',
    icon: Activity,
  },
  {
    label: 'Health Score',
    value: '92',
    change: '+3',
    changeType: 'increase',
    description: 'out of 100',
    icon: BarChart,
  },
];

const recentReports = [
  {
    id: '1',
    name: 'Monthly Performance Summary',
    date: 'March 2024',
    status: 'Generated',
    type: 'Performance',
  },
  {
    id: '2',
    name: 'Health Inspection Report',
    date: 'March 15, 2024',
    status: 'Generated',
    type: 'Health',
  },
  {
    id: '3',
    name: 'Feed Efficiency Analysis',
    date: 'March 10, 2024',
    status: 'Generated',
    type: 'Nutrition',
  },
];

export default function Reports() {
  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Reports & Analytics</h1>
        <div className="mt-4 sm:mt-0">
          <button className="btn-primary">
            Generate Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {performanceMetrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div
              key={metric.label}
              className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6"
            >
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Icon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="truncate text-sm font-medium text-gray-500">
                      {metric.label}
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {metric.value}
                      </div>
                      <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                        metric.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {metric.change}
                      </div>
                    </dd>
                    <dd className="mt-1 text-sm text-gray-500">
                      {metric.description}
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
          <h2 className="text-lg font-medium text-gray-900">Recent Reports</h2>
        </div>
        <div className="border-t border-gray-200">
          <ul role="list" className="divide-y divide-gray-200">
            {recentReports.map((report) => (
              <li key={report.id} className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <p className="text-sm font-medium text-primary">{report.name}</p>
                    <p className="mt-1 text-sm text-gray-500">{report.date}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                      {report.status}
                    </span>
                    <button className="text-sm font-medium text-primary hover:text-primary-dark">
                      Download PDF
                    </button>
                  </div>
                </div>
                <p className="mt-1 text-sm text-gray-500">Type: {report.type}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}