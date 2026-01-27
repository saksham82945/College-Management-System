import React, { useEffect, useState } from 'react';
import { Layout } from '@/components/Layout';
import { Users, GraduationCap, DollarSign, TrendingUp, CreditCard, Calendar, ArrowRight, CheckCircle, XCircle } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { apiClient } from '@/services/api';
import { useThemeStore } from '@/store/theme';
import { useAuthStore } from '@/store/auth';
import { motion } from 'framer-motion';
import { StudentDashboard } from '@/pages/StudentDashboard';
import { TeacherDashboard } from '@/pages/TeacherDashboard';
import { StatCard } from '@/components/dashboard/StatCard';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } }
};

export const Dashboard = () => {
  const { user } = useAuthStore();
  const { isDarkMode } = useThemeStore();

  const role = user?.roles?.[0]?.toUpperCase();
  if (role === 'STUDENT') return <StudentDashboard />;
  if (role === 'TEACHER') return <TeacherDashboard />;
  if (role === 'STAFF') return (
    <Layout>
      <div className="flex flex-col items-center justify-center h-[70vh] text-center gap-4">
        <div className="text-6xl">🗂️</div>
        <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Welcome, {user?.fullName?.split(' ')[0] || 'Staff'}!
        </h1>
        <p className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
          You are logged in as <strong>Staff</strong>. Contact your Administrator for module access.
        </p>
      </div>
    </Layout>
  );

  // --- ADMIN Dashboard ---
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalTeachers: 0,
    totalRevenue: 0,
    pendingFees: 0,
    attendance: { total: 0, present: 0, absent: 0, presentPct: 0 },
    recentAdmissions: [],
    chartData: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdminStats();
  }, []);

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

  if (loading)
    return (<Layout>
      <div className="flex justify-center items-center h-[80vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    </Layout>);

  return (<Layout>
    <motion.div className="space-y-8" variants={containerVariants} initial="hidden" animate="visible">
      {/* Header */}
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
          <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Admin Dashboard
          </h1>
          <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mt-1`}>
            Welcome back, {user?.fullName || 'Admin'}
          </p>
        </div>
        <div className={`text-sm font-medium px-4 py-2 rounded-lg border ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-600'}`}>
          📅 {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </motion.div>

      {/* Stat Cards — all real data */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Students" value={stats.totalStudents} icon={Users} color="text-blue-600" bg="bg-blue-50" isDarkMode={isDarkMode} />
        <StatCard title="Total Teachers" value={stats.totalTeachers} icon={GraduationCap} color="text-emerald-600" bg="bg-emerald-50" isDarkMode={isDarkMode} />
        <StatCard title="Revenue Collected" value={stats.totalRevenue > 0 ? `₹${(stats.totalRevenue / 1000).toFixed(1)}k` : '₹0'} icon={DollarSign} color="text-violet-600" bg="bg-violet-50" isDarkMode={isDarkMode} />
        <StatCard title="Attendance Rate" value={stats.attendance?.total > 0 ? `${stats.attendance.presentPct}%` : 'No Data'} icon={CheckCircle} color="text-amber-600" bg="bg-amber-50" isDarkMode={isDarkMode} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <motion.div variants={itemVariants} className={`lg:col-span-2 p-6 rounded-2xl border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100 shadow-sm'}`}>
          <div className="flex justify-between items-center mb-6">
            <h2 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              Revenue Analytics
            </h2>
          </div>
          {stats.chartData?.length > 0 ? (
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={stats.chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.1} />
                      <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? '#374151' : '#f0f0f0'} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: isDarkMode ? '#9ca3af' : '#6b7280', fontSize: 12 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: isDarkMode ? '#9ca3af' : '#6b7280', fontSize: 12 }} />
                  <Tooltip contentStyle={{ backgroundColor: isDarkMode ? '#1f2937' : '#fff', border: isDarkMode ? '1px solid #374151' : 'none', borderRadius: '8px' }} />
                  <Area type="monotone" dataKey="revenue" stroke="#8b5cf6" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" activeDot={{ r: 6, fill: '#8b5cf6', strokeWidth: 0 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className={`h-[300px] flex flex-col items-center justify-center ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              <DollarSign size={40} className="mb-3 opacity-40" />
              <p className="font-medium">No revenue data yet</p>
              <p className="text-sm mt-1">Revenue will appear here as payments are recorded</p>
            </div>
          )}
        </motion.div>

        {/* Recent Activity — real admissions */}
        <motion.div variants={itemVariants} className={`p-6 rounded-2xl border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100 shadow-sm'}`}>
          <h2 className={`text-lg font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            Recent Admissions
          </h2>
          <div className="space-y-4">
            {stats.recentAdmissions?.length > 0 ? (
              stats.recentAdmissions.map((student, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 ${isDarkMode ? 'bg-gray-700 text-blue-400' : 'bg-blue-50 text-blue-600'}`}>
                    <Users size={18} />
                  </div>
                  <div>
                    <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                      {student.userId?.fullName || student.userId?.email || 'New Student'}
                    </p>
                    <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {student.course || 'Course not set'} {student.rollNo ? `· Roll: ${student.rollNo}` : ''}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className={`text-center py-8 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                <GraduationCap size={32} className="mx-auto mb-2 opacity-40" />
                <p className="text-sm">No students enrolled yet</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Attendance Summary */}
      {stats.attendance?.total > 0 && (
        <motion.div variants={itemVariants} className={`p-6 rounded-2xl border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100 shadow-sm'}`}>
          <h2 className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            Attendance Summary
          </h2>
          <div className="grid grid-cols-3 gap-4">
            <div className={`p-4 rounded-xl text-center ${isDarkMode ? 'bg-gray-700' : 'bg-green-50'}`}>
              <p className="text-2xl font-bold text-green-600">{stats.attendance.present}</p>
              <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Present Records</p>
            </div>
            <div className={`p-4 rounded-xl text-center ${isDarkMode ? 'bg-gray-700' : 'bg-red-50'}`}>
              <p className="text-2xl font-bold text-red-600">{stats.attendance.absent}</p>
              <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Absent Records</p>
            </div>
            <div className={`p-4 rounded-xl text-center ${isDarkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
              <p className="text-2xl font-bold text-blue-600">{stats.attendance.presentPct}%</p>
              <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Overall Rate</p>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  </Layout>);
};
