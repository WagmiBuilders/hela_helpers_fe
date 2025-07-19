import React from 'react';

interface DashboardStatsProps {
  subscribedUsers: number;
  crops: number;
  varieties: number;
  zones: number;
  lastPredictionTime?: string;
}

const DashboardStats: React.FC<DashboardStatsProps> = ({
  subscribedUsers,
  crops,
  varieties,
  zones,
  lastPredictionTime
}) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 transition-transform duration-200 hover:transform hover:-translate-y-1 hover:shadow-md">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <svg className="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-600 font-medium">Subscribed Users</p>
              <p className="text-2xl font-semibold text-gray-900">{subscribedUsers}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 transition-transform duration-200 hover:transform hover:-translate-y-1 hover:shadow-md">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-50 rounded-lg">
              <svg className="w-6 h-6 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2a9 9 0 0 1 9 9c0 3.97-3.13 7.2-7 7.2S7 14.97 7 11c0-2.21 1.79-4 4-4s4 1.79 4 4"></path>
                <path d="M12 22c-4.97 0-9-4.03-9-9"></path>
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-600 font-medium">Total Crops</p>
              <p className="text-2xl font-semibold text-gray-900">{crops}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 transition-transform duration-200 hover:transform hover:-translate-y-1 hover:shadow-md">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-amber-50 rounded-lg">
              <svg className="w-6 h-6 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-600 font-medium">Crop Varieties</p>
              <p className="text-2xl font-semibold text-gray-900">{varieties}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 transition-transform duration-200 hover:transform hover:-translate-y-1 hover:shadow-md">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-red-50 rounded-lg">
              <svg className="w-6 h-6 text-red-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-600 font-medium">Agriculture Zones</p>
              <p className="text-2xl font-semibold text-gray-900">{zones}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <h3 className="text-xl font-semibold text-gray-900">Weather Predictions</h3>
          {lastPredictionTime && (
            <span className="text-sm text-gray-600">
              Last prediction: {lastPredictionTime}
            </span>
          )}
        </div>
        <div>
          <a
            href="/weather"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M8 16.5L3 17.5L7 14L3 12.5L8 11.5M8 7L3 8L7 4.5L3 3L8 2M12 2H21V8H12M12 10H21V16H12M12 18H21V24H12"></path>
            </svg>
            Go to Weather Predictions
          </a>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;
