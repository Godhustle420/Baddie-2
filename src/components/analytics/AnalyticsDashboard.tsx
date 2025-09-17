'use client'

import { useState, useEffect } from 'react'
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts'
import { 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  Eye, 
  Share2, 
  RefreshCw,
  Download
} from 'lucide-react'

interface AnalyticsData {
  overview: {
    totalViews: number
    uniqueVisitors: number
    conversionRate: number
    averageOrderValue: number
    socialShares: number
    referralSignups: number
  }
  salesData: Array<{
    date: string
    sales: number
    orders: number
    visitors: number
  }>
  trafficSources: Array<{
    source: string
    visitors: number
    conversions: number
  }>
  socialPerformance: Array<{
    platform: string
    shares: number
    clicks: number
    conversions: number
  }>
  topProducts: Array<{
    id: string
    name: string
    views: number
    sales: number
    revenue: number
  }>
}

export default function AnalyticsDashboard() {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [timeRange, setTimeRange] = useState('7d')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAnalyticsData()
  }, [timeRange])

  const fetchAnalyticsData = async () => {
    setLoading(true)
    try {
      // Mock analytics data - replace with real API call
      const mockData: AnalyticsData = {
        overview: {
          totalViews: 15420,
          uniqueVisitors: 8750,
          conversionRate: 3.2,
          averageOrderValue: 67.50,
          socialShares: 342,
          referralSignups: 89
        },
        salesData: [
          { date: '2024-01-01', sales: 1250, orders: 23, visitors: 890 },
          { date: '2024-01-02', sales: 1890, orders: 31, visitors: 1200 },
          { date: '2024-01-03', sales: 2100, orders: 28, visitors: 1150 },
          { date: '2024-01-04', sales: 1750, orders: 35, visitors: 1400 },
          { date: '2024-01-05', sales: 2400, orders: 42, visitors: 1600 },
          { date: '2024-01-06', sales: 2200, orders: 38, visitors: 1350 },
          { date: '2024-01-07', sales: 2800, orders: 45, visitors: 1800 }
        ],
        trafficSources: [
          { source: 'Direct', visitors: 3200, conversions: 128 },
          { source: 'Facebook', visitors: 2100, conversions: 84 },
          { source: 'TikTok', visitors: 1800, conversions: 72 },
          { source: 'Instagram', visitors: 1200, conversions: 48 },
          { source: 'Google', visitors: 950, conversions: 38 },
          { source: 'Referrals', visitors: 650, conversions: 39 }
        ],
        socialPerformance: [
          { platform: 'Facebook', shares: 145, clicks: 890, conversions: 23 },
          { platform: 'TikTok', shares: 98, clicks: 1200, conversions: 31 },
          { platform: 'Instagram', shares: 67, clicks: 780, conversions: 19 },
          { platform: 'Twitter', shares: 32, clicks: 340, conversions: 8 }
        ],
        topProducts: [
          { id: '1', name: 'Vintage Leather Jacket', views: 2340, sales: 12, revenue: 540 },
          { id: '2', name: 'Designer Handbag', views: 1890, sales: 8, revenue: 720 },
          { id: '3', name: 'Retro Sneakers', views: 1560, sales: 15, revenue: 450 },
          { id: '4', name: 'Boho Dress', views: 1234, sales: 9, revenue: 270 },
          { id: '5', name: 'Denim Jacket', views: 1100, sales: 11, revenue: 385 }
        ]
      }
      
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API delay
      setData(mockData)
    } catch (error) {
      console.error('Failed to fetch analytics data:', error)
    } finally {
      setLoading(false)
    }
  }

  const exportData = () => {
    if (!data) return
    
    const csvContent = [
      ['Metric', 'Value'],
      ['Total Views', data.overview.totalViews],
      ['Unique Visitors', data.overview.uniqueVisitors],
      ['Conversion Rate', `${data.overview.conversionRate}%`],
      ['Average Order Value', `$${data.overview.averageOrderValue}`],
      ['Social Shares', data.overview.socialShares],
      ['Referral Signups', data.overview.referralSignups]
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `analytics-${timeRange}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const COLORS = ['#ec4899', '#0ea5e9', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center h-64">
          <RefreshCw className="animate-spin text-primary-600" size={32} />
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Failed to load analytics data</p>
        <button onClick={fetchAnalyticsData} className="btn-primary mt-4">
          Retry
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
        <div className="flex items-center space-x-4 mt-4 sm:mt-0">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
          <button
            onClick={exportData}
            className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50"
          >
            <Download size={16} />
            <span>Export</span>
          </button>
          <button
            onClick={fetchAnalyticsData}
            className="flex items-center space-x-2 px-3 py-2 bg-primary-600 text-white rounded-md text-sm hover:bg-primary-700"
          >
            <RefreshCw size={16} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <Eye className="text-blue-600" size={32} />
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Views</p>
              <p className="text-2xl font-bold">{data.overview.totalViews.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <Users className="text-green-600" size={32} />
            <div className="ml-4">
              <p className="text-sm text-gray-600">Unique Visitors</p>
              <p className="text-2xl font-bold">{data.overview.uniqueVisitors.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <TrendingUp className="text-primary-600" size={32} />
            <div className="ml-4">
              <p className="text-sm text-gray-600">Conversion Rate</p>
              <p className="text-2xl font-bold">{data.overview.conversionRate}%</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <ShoppingBag className="text-orange-600" size={32} />
            <div className="ml-4">
              <p className="text-sm text-gray-600">Avg Order Value</p>
              <p className="text-2xl font-bold">${data.overview.averageOrderValue}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <Share2 className="text-purple-600" size={32} />
            <div className="ml-4">
              <p className="text-sm text-gray-600">Social Shares</p>
              <p className="text-2xl font-bold">{data.overview.socialShares}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <Users className="text-pink-600" size={32} />
            <div className="ml-4">
              <p className="text-sm text-gray-600">Referral Signups</p>
              <p className="text-2xl font-bold">{data.overview.referralSignups}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Sales Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data.salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="sales" stroke="#ec4899" name="Sales ($)" />
              <Line type="monotone" dataKey="orders" stroke="#0ea5e9" name="Orders" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Traffic Sources */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Traffic Sources</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data.trafficSources}
                dataKey="visitors"
                nameKey="source"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {data.trafficSources.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Social Performance */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Social Media Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.socialPerformance}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="platform" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="shares" fill="#ec4899" name="Shares" />
              <Bar dataKey="clicks" fill="#0ea5e9" name="Clicks" />
              <Bar dataKey="conversions" fill="#10b981" name="Conversions" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Top Performing Products</h3>
          <div className="space-y-4">
            {data.topProducts.map((product, index) => (
              <div key={product.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{product.name}</p>
                  <p className="text-sm text-gray-600">{product.views} views • {product.sales} sales</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-600">${product.revenue}</p>
                  <p className="text-sm text-gray-600">revenue</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}