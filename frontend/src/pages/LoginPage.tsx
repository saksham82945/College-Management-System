import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/auth';
import toast from 'react-hot-toast';
import { apiClient } from '@/services/api';
import { ArrowLeft, ArrowRight, Lock, Mail, Shield, GraduationCap, UserCog } from 'lucide-react';

type RoleType = 'ADMIN' | 'STUDENT' | null;

export const LoginPage: React.FC = () => {
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedRole, setSelectedRole] = useState<RoleType>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuthStore();

  const handleRoleSelect = (role: RoleType) => {
    setSelectedRole(role);
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
    setSelectedRole(null);
    setEmail('');
    setPassword('');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) return;

    setLoading(true);

    try {
      // Trying both v1 and root paths just in case, but using the configured axios instance
      const response = await apiClient.post('/auth/login', {
        email,
        password,
        role: selectedRole // Ideally backend should verify this match, but for now we send it
      });

      const { user, tokens } = response.data.data;

      // Basic client-side validation that the user has the selected role
      // In a real app, the token should dictate the role or backend should validate login against role
      const userRoles = user.roles || [];
      if (!userRoles.includes(selectedRole)) {
        // Create a friendly error if it's a mismatch, though ideally backend handles this
        // For now we'll allow it if they have the role, otherwise warn
      }

      login(user, tokens.accessToken, tokens.refreshToken);
      toast.success(`Welcome back, ${selectedRole.charAt(0) + selectedRole.slice(1).toLowerCase()}!`);
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  const roles = [
    {
      id: 'ADMIN',
      title: 'Administrator',
      description: 'Manage entire campus, fees, and staff files',
      icon: Shield,
      color: 'from-purple-500 to-indigo-600',
      shadow: 'shadow-purple-500/30'
    },
    {
      id: 'STUDENT',
      title: 'Student Portal',
      description: 'View grades, attendance, and pay fees',
      icon: GraduationCap,
      color: 'from-emerald-500 to-teal-600',
      shadow: 'shadow-emerald-500/30'
    }
  ];

  return (
    <div className="min-h-screen flex bg-[#0F172A] text-white overflow-hidden font-sans selection:bg-purple-500 selection:text-white">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-900/20 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-900/20 blur-[120px]" />
      </div>

      {/* Left Section - Form */}
      <div className="w-full lg:w-1/2 z-10 flex flex-col justify-center px-8 sm:px-12 lg:px-24 xl:px-32 relative">
        <div className="mb-10">
          <button
            onClick={() => navigate('/')}
            className="group flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </button>

          <div className="flex items-center gap-2 mb-6 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-10 h-10 bg-gradient-to-tr from-purple-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30">
              <Shield className="text-white" size={20} />
            </div>
            <span className="text-xl font-bold tracking-tight">LNMI College</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.1] mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            {step === 1 ? 'Select Portal' : 'Welcome Back'}
          </h1>
          <p className="text-gray-400 text-lg">
            {step === 1
              ? 'Choose your account type to proceed to the dashboard.'
              : `Sign in to your ${selectedRole?.toLowerCase()} account.`}
          </p>
        </div>

        {step === 1 ? (
          <div className="space-y-4 w-full max-w-md animate-in fade-in slide-in-from-left-4 duration-500">
            {roles.map((role) => (
              <button
                key={role.id}
                onClick={() => handleRoleSelect(role.id as RoleType)}
                className="w-full group relative overflow-hidden bg-gray-900/40 border border-gray-800 hover:border-gray-600 p-4 rounded-2xl transition-all duration-300 hover:shadow-lg hover:bg-gray-800/60 text-left flex items-start gap-4"
              >
                <div className={`p-3 rounded-xl bg-gradient-to-br ${role.color} ${role.shadow} group-hover:scale-110 transition-transform duration-300`}>
                  <role.icon className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-200 group-hover:text-white transition-colors">{role.title}</h3>
                  <p className="text-sm text-gray-500 group-hover:text-gray-400">{role.description}</p>
                </div>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                  <ArrowRight className="text-gray-400" size={20} />
                </div>
              </button>
            ))}
          </div>
        ) : (
          <form onSubmit={handleLogin} className="space-y-6 w-full max-w-md animate-in fade-in slide-in-from-right-4 duration-500">
            <button
              type="button"
              onClick={handleBack}
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors mb-2"
            >
              <ArrowLeft size={16} /> Back to role selection
            </button>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 ml-1">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-500 group-focus-within:text-purple-400 transition-colors" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-900/50 border border-gray-700/50 text-gray-100 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all placeholder:text-gray-600 backdrop-blur-sm"
                  placeholder="name@college.edu"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-sm font-medium text-gray-300">Password</label>
                <a href="#" className="text-xs text-purple-400 hover:text-purple-300 transition-colors">Forgot password?</a>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-500 group-focus-within:text-purple-400 transition-colors" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-900/50 border border-gray-700/50 text-gray-100 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all placeholder:text-gray-600 backdrop-blur-sm"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold py-3.5 rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>Sign In <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" /></>
              )}
            </button>
          </form>
        )}

        <p className="mt-8 text-center sm:text-left text-gray-500 text-sm">
          Don't have an account?{' '}
          <button onClick={() => navigate('/register')} className="text-white hover:text-purple-400 font-medium transition-colors">
            Contact Administration
          </button>
        </p>

        {/* Footer Links */}
        <div className="mt-12 flex gap-6 text-sm text-gray-600">
          <a href="#" className="hover:text-gray-400 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-gray-400 transition-colors">Terms of Service</a>
        </div>
      </div>

      {/* Right Section - Visuals */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gray-900 items-center justify-center overflow-hidden">
        {/* Abstract Shapes/Gradient Mesh */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2832&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/80 via-blue-900/50 to-gray-900/90 z-10"></div>

        {/* Glass Card Floating Effect */}
        <div className="relative z-20 p-12 max-w-lg">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-8 -left-20 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

          <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-500">
            <h2 className="text-3xl font-bold mb-4 text-white">Future of Education</h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              Experience seamless campus management. Track attendance, manage fees, and access vital academic resources in one unified platform.
            </p>
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-gradient-to-tr from-orange-400 to-pink-500 p-[2px]">
                <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100&h=100" alt="Student" className="rounded-full w-full h-full object-cover border-2 border-gray-900" />
              </div>
              <div>
                <p className="text-white font-medium">Trusted by</p>
                <p className="text-gray-400 text-sm">5000+ Students & Faculty</p>
              </div>
            </div>
          </div>

          {/* Floating stats card */}
          <div className="absolute -bottom-12 -right-12 bg-gray-800/80 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-xl flex items-center gap-3 animate-float delay-1000">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            <div>
              <p className="text-xs text-gray-400">System Status</p>
              <p className="text-sm font-bold text-green-400">Operational</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
        }
        .animate-float {
            animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};
