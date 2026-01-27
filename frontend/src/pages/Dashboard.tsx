
import React, { useEffect, useState } from 'react';
import { Layout } from '@/components/Layout';
import {
  Users,
  GraduationCap,
  DollarSign,
  TrendingUp,
  CreditCard,
  Calendar,
  Activity,
  ArrowRight,
  BookOpen
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { apiClient } from '@/services/api';
import { useThemeStore } from '@/store/theme';
import { useAuthStore } from '@/store/auth';
import { motion } from 'framer-motion';

// --- Interfaces ---
interface DashboardStats {
  totalStudents: number;
  totalTeachers: number;
  totalRevenue: number;
  recentAdmissions: any[];
  chartData: any[];
}

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 100 }
  }
};

export const Dashboard: React.FC = () => {
  const { user } = useAuthStore();
  const isStudent = user?.roles?.includes('STUDENT');
  const { isDarkMode } = useThemeStore();

  const [stats, setStats] = useState<any>({
    totalStudents: 0,
    totalTeachers: 0,
    totalRevenue: 0,
    recentAdmissions: [],
    chartData: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Determine which stats to fetch
    if (!isStudent) {
      fetchAdminStats();
    } else {
      // Mock Student Stats
      setStats({
        attendance: 87,
        cgpa: 8.4,
        pendingFees: 4500,
        libraryBooks: 2,
        recentActivity: [
          { title: 'Upcoming Exam', desc: 'Physics Mid-term on Monday', icon: 'Calendar' },
          { title: 'Fee Due', desc: 'Semester 2 fee pending', icon: 'CreditCard' },
          { title: 'Book Return', desc: 'Return "Intro to Physics" by Friday', icon: 'BookOpen' }
        ],
        chartData: [
          { name: 'Sem 1', gpa: 7.8 },
          { name: 'Sem 2', gpa: 8.1 },
          { name: 'Sem 3', gpa: 8.2 },
          { name: 'Sem 4', gpa: 8.4 },
        ]
      });
      setLoading(false);
    }
  }, [isStudent]);

  const fetchAdminStats = async () => {
    try {
      const response = await apiClient.get('/dashboard/admin');
      if (response.data.success) {
        setStats(response.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch dashboard stats', error);
    } finally {
      setLoading(false);
    }
  };

  // Mock chart data for Admin
  const adminChartData = stats.chartData?.length > 0 ? stats.chartData : [
    { name: 'Jan', revenue: 40000, students: 240 },
    { name: 'Feb', revenue: 30000, students: 139 },
    { name: 'Mar', revenue: 20000, students: 980 },
    { name: 'Apr', revenue: 27800, students: 390 },
    { name: 'May', revenue: 18900, students: 480 },
    { name: 'Jun', revenue: 23900, students: 380 },
  ];

  if (loading) return (
    <Layout>
      <div className="flex justify-center items-center h-[80vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    </Layout>
  );

  return (
    <Layout>
      <motion.div
        className="space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header Section */}
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-end gap-4">
          <div>
            <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {isStudent ? `Welcome, ${user?.fullName?.split(' ')[0]}` : 'Dashboard'}
            </h1>
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mt-1`}>
              {isStudent ? 'Track your academic progress' : 'Overview of your college metrics'}
            </p>
          </div>
          <div className={`text-sm font-medium px-4 py-2 rounded-lg border ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-600'
            }`}>
            📅 {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
        </motion.div>

        {/* --- ROLE BASED CONTENT --- */}
        {isStudent ? (
          /* STUDENT VIEW */
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard title="Attendance" value={`${stats.attendance}%`} icon={Activity} color="text-green-600" bg="bg-green-50" trend="Good" isDarkMode={isDarkMode} />
              <StatCard title="CGPA" value={stats.cgpa} icon={GraduationCap} color="text-blue-600" bg="bg-blue-50" trend="Top 10%" isDarkMode={isDarkMode} />
              <StatCard title="Pending Fees" value={`₹${stats.pendingFees}`} icon={DollarSign} color="text-amber-600" bg="bg-amber-50" trend="Due Soon" isDarkMode={isDarkMode} />
              <StatCard title="Library Books" value={stats.libraryBooks} icon={BookOpen} color="text-purple-600" bg="bg-purple-50" trend="2 Active" isDarkMode={isDarkMode} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <motion.div variants={itemVariants} className={`lg:col-span-2 p-6 rounded-2xl border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100 shadow-sm'}`}>
                <h2 className={`text-lg font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Academic Performance</h2>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={stats.chartData}>
                      <defs>
                        <linearGradient id="colorGpa" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? '#374151' : '#f0f0f0'} />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: isDarkMode ? '#9ca3af' : '#6b7280' }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: isDarkMode ? '#9ca3af' : '#6b7280' }} domain={[0, 10]} />
                      <Tooltip contentStyle={{ backgroundColor: isDarkMode ? '#1f2937' : '#fff', border: isDarkMode ? '1px solid #374151' : 'none', borderRadius: '8px' }} />
                      <Area type="monotone" dataKey="gpa" stroke="#3b82f6" strokeWidth={2} fill="url(#colorGpa)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className={`p-6 rounded-2xl border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100 shadow-sm'}`}>
                <h2 className={`text-lg font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>My Schedule</h2>
                <div className="space-y-6">
                  {stats.recentActivity?.map((activity: any, i: number) => (
                    <div key={i} className="flex gap-4">
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 ${isDarkMode ? 'bg-gray-700 text-blue-400' : 'bg-blue-50 text-blue-600'}`}>
                        {activity.icon === 'CreditCard' ? <CreditCard size={18} /> : activity.icon === 'Calendar' ? <Calendar size={18} /> : <BookOpen size={18} />}
                      </div>
                      <div>
                        <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>{activity.title}</p>
                        <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{activity.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </>
        ) : (
          /* ADMIN VIEW */
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Total Students"
                value={stats.totalStudents}
                icon={Users}
                color="text-blue-600"
                bg="bg-blue-50"
                trend="+12%"
                isDarkMode={isDarkMode}
              />
              <StatCard
                title="Total Teachers"
                value={stats.totalTeachers}
                icon={GraduationCap}
                color="text-emerald-600"
                bg="bg-emerald-50"
                trend="+4 New"
                isDarkMode={isDarkMode}
              />
              <StatCard
                title="Total Revenue"
                value={`₹${(stats.totalRevenue / 1000).toFixed(1)}k`}
                icon={DollarSign}
                color="text-violet-600"
                bg="bg-violet-50"
                trend="+8.2%"
                isDarkMode={isDarkMode}
              />
              <StatCard
                title="Pending Fees"
                value="18"
                icon={CreditCard}
                color="text-amber-600"
                bg="bg-amber-50"
                trend="Action needed"
                isDarkMode={isDarkMode}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <motion.div
                variants={itemVariants}
                className={`lg:col-span-2 p-6 rounded-2xl border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100 shadow-sm'
                  }`}
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                    Revenue Analytics
                  </h2>
                  <button className="text-primary text-sm font-medium hover:underline">View Report</button>
                </div>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={adminChartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8884d8" stopOpacity={0.1} />
                          <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? '#374151' : '#f0f0f0'} />
                      <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: isDarkMode ? '#9ca3af' : '#6b7280', fontSize: 12 }}
                        dy={10}
                      />
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: isDarkMode ? '#9ca3af' : '#6b7280', fontSize: 12 }}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: isDarkMode ? '#1f2937' : '#fff',
                          border: isDarkMode ? '1px solid #374151' : 'none',
                          borderRadius: '8px',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="revenue"
                        stroke="#8b5cf6"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorRevenue)"
                        activeDot={{ r: 6, fill: '#8b5cf6', strokeWidth: 0 }}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className={`p-6 rounded-2xl border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100 shadow-sm'
                  }`}
              >
                <h2 className={`text-lg font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  Recent Activity
                </h2>
                <div className="space-y-6">
                  {stats.recentAdmissions?.length > 0 ? (
                    stats.recentAdmissions.map((student: any, i: number) => (
                      <div key={i} className="flex gap-4">
                        <div className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 ${isDarkMode ? 'bg-gray-700 text-blue-400' : 'bg-blue-50 text-blue-600'
                          }`}>
                          <Users size={18} />
                        </div>
                        <div>
                          <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                            New Admission
                          </p>
                          <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            {student.userId?.firstName} joined simple science.
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    [1, 2, 3].map((_, i) => (
                      <div key={i} className="flex gap-4 group cursor-pointer">
                        <div className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 transition-colors ${isDarkMode ? 'bg-gray-700 text-gray-400 group-hover:bg-gray-600' : 'bg-gray-50 text-gray-500 group-hover:bg-gray-100'
                          }`}>
                          {i === 0 ? <Users size={18} /> : i === 1 ? <TrendingUp size={18} /> : <Calendar size={18} />}
                        </div>
                        <div>
                          <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                            {i === 0 ? 'New Admission' : i === 1 ? 'Fee Monthly Report' : 'Staff Meeting'}
                          </p>
                          <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            {i === 0 ? 'John Doe joined CS Department' : i === 1 ? 'Generated for October' : 'Scheduled for 2:00 PM'}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
                <button className={`w-full mt-6 py-2.5 text-sm font-medium rounded-xl border transition-colors flex items-center justify-center gap-2 ${isDarkMode ? 'border-gray-700 text-gray-300 hover:bg-gray-700' : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}>
                  View All Activity <ArrowRight size={16} />
                </button>
              </motion.div>
            </div>
          </>
        )}
      </motion.div>
    </Layout>
  );
};

// --- Sub Components ---
const StatCard = ({ title, value, icon: Icon, color, bg, trend, isDarkMode }: any) => (
  <motion.div
    variants={itemVariants}
    whileHover={{ y: -5 }}
    className={`p-6 rounded-2xl border transition-all ${isDarkMode ? 'bg-gray-800 border-gray-700 shadow-lg' : 'bg-white border-gray-100 shadow-sm hover:shadow-md'
      }`}
  >
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-xl ${isDarkMode ? 'bg-gray-700/50' : bg}`}>
        <Icon size={22} className={color} />
      </div>
      {trend && (
        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${isDarkMode ? 'bg-green-900/30 text-green-400' : 'bg-green-50 text-green-600'
          }`}>
          {trend}
        </span>
      )}
    </div>
    <h3 className={`text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{title}</h3>
    <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{value}</p>
  </motion.div>
);
