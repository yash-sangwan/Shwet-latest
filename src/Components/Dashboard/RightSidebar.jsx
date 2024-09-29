import React, { useState } from 'react';
import { Upload, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const RightSidebar = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();

  const pieData = [
    { name: 'Images', value: 400 },
    { name: 'Text', value: 300 },
    { name: 'Audio', value: 300 },
  ];

  const barData = [
    { name: 'Mon', contributions: 4 },
    { name: 'Tue', contributions: 3 },
    { name: 'Wed', contributions: 2 },
    { name: 'Thu', contributions: 5 },
    { name: 'Fri', contributions: 1 },
    { name: 'Sat', contributions: 6 },
    { name: 'Sun', contributions: 4 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-4">
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Active Contributions</h3>
              <div className="flex justify-between items-center">
                <span className="text-3xl font-bold">12</span>
                <span className="text-green-500 text-sm">+3 from last week</span>
              </div>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Accuracy</h3>
              <div className="flex justify-between items-center">
                <span className="text-3xl font-bold">92%</span>
                <span className="text-blue-500 text-sm">+5% from last month</span>
              </div>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Total Tokens Earned</h3>
              <div className="flex justify-between items-center">
                <span className="text-3xl font-bold">1,560</span>
                <span className="text-orange-500 text-sm">+230 this week</span>
              </div>
            </div>
            <p className='text-center text-sm text-gray-400'>**demo data for the MVP**</p>
          </div>
        );
      case 'analytics':
        return (
          <div className="space-y-4">
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Data Type Distribution</h3>
              <div className="h-64 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Weekly Contributions</h3>
              <div className="h-64 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData}>
                    <XAxis dataKey="name" stroke="#fff" />
                    <YAxis stroke="#fff" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1F2937', border: 'none' }}
                      labelStyle={{ color: '#fff' }}
                    />
                    <Bar dataKey="contributions" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed pt-24 right-0 top-0 h-screen w-80 bg-gray-900 text-white p-4 space-y-6 hidden lg:block overflow-y-auto">
      <div className="bg-gray-800 p-4 rounded-lg">
        <h2 className="text-lg font-bold mb-2">Contribute Data & Earn</h2>
        <p className="text-sm mb-4">
          Post your data (images, text, audio in spreadsheet form) to the community and earn tokens.
        </p>
        <button 
          className="bg-green-600 text-white py-2 px-4 rounded-full w-full hover:bg-green-700 transition-colors duration-200 flex items-center justify-center"
          onClick={() => navigate('/addData')}
        >
          <Upload className="mr-2" size={18} />
          Contribute
        </button>
      </div>

      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <div className="flex border-b border-gray-700">
          <button
            className={`flex-1 py-2 px-4 ${activeTab === 'overview' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-700'}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`flex-1 py-2 px-4 ${activeTab === 'analytics' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-700'}`}
            onClick={() => setActiveTab('analytics')}
          >
            Analytics
          </button>
        </div>
        <div className="p-4">
          {renderTabContent()}
        </div>
      </div>

      <div className="bg-gray-800 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Quick Actions</h3>
        <ul className="space-y-2">
          <li>
            <button className="w-full text-left py-2 px-3 rounded hover:bg-gray-700 transition-colors duration-200 flex items-center">
              <HelpCircle className="mr-2" size={18} />
              <span>Get Help</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default RightSidebar;