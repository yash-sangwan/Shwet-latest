import React, { useState , useEffect} from 'react';
import NavbarDB from '../../Components/Dashboard/Navbar/NavbarDB';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { PieChart, Pie, Cell } from 'recharts';
import apiClient from '../../Components/api/apiClient';

const GroupsDB = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [totalTokens, setTotalTokens] = useState(0);
  const [totalContrib, setContrib] = useState(0);


  const getOverview = async () => {
    try {
      const response = await apiClient.get("/api/worker/get-overview");
      if (response.status === 200 && response.data.status) {
        setTotalTokens(response.data.balance);
        setContrib(response.data.totalContrib);
      }
    } catch (error) {
      console.error("Error fetching overview:", error);
    }
  };

  useEffect(() => {
    getOverview();
  }, []);

  // Mock data for demonstration
  const contributionData = [
    { name: 'Jan', contributions: 4 },
    { name: 'Feb', contributions: 3 },
    { name: 'Mar', contributions: 7 },
    { name: 'Apr', contributions: 2 },
    { name: 'May', contributions: 6 },
    { name: 'Jun', contributions: 8 },
  ];

  const tokenHistory = [
    { date: '2023-06-01', amount: 50, reason: 'Image labeling' },
    { date: '2023-06-03', amount: 30, reason: 'Text annotation' },
    { date: '2023-06-07', amount: 75, reason: 'Audio transcription' },
    { date: '2023-06-10', amount: 40, reason: '3D object tagging' },
    { date: '2023-06-15', amount: 60, reason: 'Image labeling' },
  ];

  const pieData = [
    { name: 'Images', value: 400 },
    { name: 'Text', value: 300 },
    { name: 'Audio', value: 200 },
    { name: '3D', value: 100 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  // Mock data for recent contributions
  const recentContributions = [
    {
      id: 1,
      date: '2023-06-20',
      type: 'Image Labeling',
      data: [
        { id: 'IMG001', label: 'Car', confidence: '0.95' },
        { id: 'IMG002', label: 'Tree', confidence: '0.88' },
        { id: 'IMG003', label: 'Person', confidence: '0.97' },
      ]
    },
    {
      id: 2,
      date: '2023-06-19',
      type: 'Text Annotation',
      data: [
        { id: 'TXT001', text: 'The quick brown fox', sentiment: 'Neutral' },
        { id: 'TXT002', text: 'Jumps over the lazy dog', sentiment: 'Positive' },
      ]
    },
    {
      id: 3,
      date: '2023-06-18',
      type: 'Audio Transcription',
      data: [
        { id: 'AUD001', timestamp: '00:00:05', text: 'Welcome to the podcast' },
        { id: 'AUD002', timestamp: '00:00:10', text: "Today's topic is AI" },
      ]
    },
    {
      id: 4,
      date: '2023-06-17',
      type: '3D Object Tagging',
      data: [
        { id: '3D001', object: 'Chair', vertices: '1250' },
        { id: '3D002', object: 'Table', vertices: '2100' },
      ]
    },
    {
      id: 5,
      date: '2023-06-16',
      type: 'Image Labeling',
      data: [
        { id: 'IMG004', label: 'Building', confidence: '0.91' },
        { id: 'IMG005', label: 'Sky', confidence: '0.99' },
        { id: 'IMG006', label: 'Cloud', confidence: '0.93' },
      ]
    },
  ];

  return (
    <>
      <NavbarDB />
      <div className="min-h-screen bg-[#131416] text-white pt-16">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Your Data Contribution Dashboard</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Total Contributions</h2>
              <p className="text-4xl font-bold">{totalContrib}</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Total Tokens Earned</h2>
              <p className="text-4xl font-bold">{totalTokens}</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Contribution Rank</h2>
              <p className="text-4xl font-bold">#42</p>
              <div className="mt-4">
                <div className="bg-gray-700 h-2 rounded-full">
                  <div className="bg-PURPLESHADE3 h-2 rounded-full" style={{ width: '42%' }}></div>
                </div>
                <p className="text-sm mt-2">Top 42% of contributors</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden mb-8">
            <div className="flex border-b border-gray-700">
              <button
                className={`flex-1 py-2 px-4 ${activeTab === 'overview' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-700'}`}
                onClick={() => setActiveTab('overview')}
              >
                Overview
              </button>
              <button
                className={`flex-1 py-2 px-4 ${activeTab === 'analytics' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-700'}`}
                onClick={() => setActiveTab('analytics')}
              >
                Analytics
              </button>
              <button
                className={`flex-1 py-2 px-4 ${activeTab === 'history' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-700'}`}
                onClick={() => setActiveTab('history')}
              >
                Token History
              </button>
            </div>
            <div className="p-6">
              {activeTab === 'overview' && (
                <div>
                  <h2 className="text-2xl font-semibold mb-4">Contribution Overview</h2>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={contributionData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="contributions" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}
              {activeTab === 'analytics' && (
                <div>
                  <h2 className="text-2xl font-semibold mb-4">Contribution Analytics</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Distribution by Type</h3>
                      <div className="h-64">
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
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Top Performing Categories</h3>
                      <ul className="space-y-2">
                        <li className="flex justify-between items-center">
                          <span>Image Labeling</span>
                          <span className="bg-blue-600 px-2 py-1 rounded">450 contributions</span>
                        </li>
                        <li className="flex justify-between items-center">
                          <span>Text Annotation</span>
                          <span className="bg-green-600 px-2 py-1 rounded">320 contributions</span>
                        </li>
                        <li className="flex justify-between items-center">
                          <span>Audio Transcription</span>
                          <span className="bg-yellow-600 px-2 py-1 rounded">180 contributions</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
              {activeTab === 'history' && (
                <div>
                  <h2 className="text-2xl font-semibold mb-4">Token Earning History</h2>
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-gray-700 rounded-lg overflow-hidden">
                      <thead className="bg-gray-600">
                        <tr>
                          <th className="px-4 py-2 text-left">Date</th>
                          <th className="px-4 py-2 text-left">Amount</th>
                          <th className="px-4 py-2 text-left">Reason</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tokenHistory.map((entry, index) => (
                          <tr key={index} className={index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-700'}>
                            <td className="px-4 py-2">{entry.date}</td>
                            <td className="px-4 py-2">{entry.amount} tokens</td>
                            <td className="px-4 py-2">{entry.reason}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Recent Contributions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentContributions.map((contribution) => (
                <div key={contribution.id} className="bg-gray-700 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">{contribution.type}</h3>
                  <p className="text-sm text-gray-400 mb-4">Date: {contribution.date}</p>
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden">
                      <thead className="bg-gray-900">
                        <tr>
                          {Object.keys(contribution.data[0]).map((key) => (
                            <th key={key} className="px-2 py-1 text-left text-xs">{key}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {contribution.data.map((item, index) => (
                          <tr key={index} className={index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-700'}>
                            {Object.values(item).map((value, i) => (
                              <td key={i} className="px-2 py-1 text-xs">{value}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <p className='pb-4'>
          **Data shown here is for demo purpose only.**
        </p>
      </div>
    </>
  );
};

export default GroupsDB;