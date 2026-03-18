import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/auth';
import { useTheme } from '@/context/ThemeContext';
import toast from 'react-hot-toast';
import { apiClient } from '@/services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Lock, Mail, Shield, Eye, EyeOff, GraduationCap, 
    BookOpen, UserCircle, ArrowRight, Sparkles, Activity,
    ChevronLeft, ShieldCheck, Zap
} from 'lucide-react';

export const LoginPage = () => {
    const [step, setStep] = useState('ROLE_SELECT'); // ROLE_SELECT or LOGIN_FORM
    const [selectedRole, setSelectedRole] = useState('STUDENT');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    
    const navigate = useNavigate();
    const { login } = useAuthStore();
    const { isDarkMode } = useTheme();

    const roles = [
        { id: 'ADMIN', title: 'Admin', icon: Shield, color: 'from-purple-500 to-indigo-600', description: 'Administration' },
        { id: 'TEACHER', title: 'Teacher', icon: BookOpen, color: 'from-sky-500 to-cyan-600', description: 'Faculty & Academics' },
        { id: 'STUDENT', title: 'Student', icon: GraduationCap, color: 'from-emerald-500 to-cyan-500', description: 'Student Portal' },
    ];

    const activeRoleData = roles.find(r => r.id === selectedRole);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await apiClient.post('/auth/login', {
                email,
                password,
                role: selectedRole
            });
            const { user, tokens } = response.data.data;
            const userRoles = user.roles || [];
            
            if (!userRoles.includes(selectedRole)) {
                toast.error(`Access denied. You do not have ${selectedRole} permissions.`);
                setLoading(false);
                return;
            }

            login(user, tokens.accessToken, tokens.refreshToken);
            toast.success(`Welcome back, ${user.fullName.split(' ')[0]}.`);
            navigate('/dashboard');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Authentication Failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex overflow-hidden bg-slate-950">
            {/* Authentication Section */}
            <div className="w-full lg:w-1/2 flex flex-col bg-[#0b0f1a] relative overflow-hidden">
                {/* Background Atmosphere */}
                <div className="absolute inset-0 z-0 text-white">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />
                    <motion.div 
                        animate={{ 
                            scale: [1, 1.2, 1],
                            opacity: [0.1, 0.2, 0.1]
                        }}
                        transition={{ duration: 10, repeat: Infinity }}
                        className={`absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full blur-[120px] bg-gradient-to-br ${activeRoleData.color}`} 
                    />
                </div>

                <div className="relative z-10 flex flex-col h-full px-12 py-8">
                    {/* Top Navigation */}
                    <div className="flex justify-between items-center mb-16">
                        <button 
                            onClick={() => navigate('/')}
                            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 hover:text-white transition-colors"
                        >
                            <ChevronLeft size={16} />
                            Return to Homepage
                        </button>
                    </div>

                    <div className="flex-1 flex flex-col justify-center max-w-[440px] mx-auto w-full">
                        <AnimatePresence mode="wait">
                            {step === 'ROLE_SELECT' ? (
                                <motion.div
                                    key="role-select"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="space-y-12"
                                >
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-4 mb-8">
                                            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                                                <ShieldCheck className="text-white" size={24} />
                                            </div>
                                            <div className="text-xl font-black text-white tracking-tighter">LNMI Portal</div>
                                        </div>
                                        <h1 className="text-5xl font-black text-white tracking-tighter leading-none mb-4">
                                            Account Selection
                                        </h1>
                                        <p className="text-slate-400 font-medium text-lg leading-relaxed">
                                            Select your role to continue to the login page.
                                        </p>
                                    </div>

                                    <div className="grid gap-4">
                                        {roles.map((role) => (
                                            <button
                                                key={role.id}
                                                onClick={() => {
                                                    setSelectedRole(role.id);
                                                    setStep('LOGIN_FORM');
                                                }}
                                                className="group relative p-6 rounded-[2rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-all flex items-center gap-6 text-left"
                                            >
                                                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${role.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                                                    <role.icon size={28} />
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-black text-white tracking-tight">{role.title} Portal</h3>
                                                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">{role.description}</p>
                                                </div>
                                                <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <ArrowRight className="text-primary" />
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="login-form"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-10"
                                >
                                    <button 
                                        onClick={() => setStep('ROLE_SELECT')}
                                        className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-6"
                                    >
                                        <ChevronLeft size={16} />
                                        Back to selection
                                    </button>

                                    <div className="space-y-3">
                                        <div className="flex justify-between items-end mb-4">
                                            <h1 className="text-5xl font-black text-white tracking-tighter leading-none">
                                                Account Login
                                            </h1>
                                            {selectedRole === 'STUDENT' && (
                                                <button 
                                                    onClick={() => navigate('/signup')} 
                                                    className="text-xs font-black uppercase tracking-widest text-primary hover:text-white transition-colors pb-1"
                                                >
                                                    Create Account
                                                </button>
                                            )}
                                        </div>
                                        <p className="text-slate-400 font-medium text-lg tracking-tight">
                                            Sign in to your <span className="text-white font-black uppercase text-sm tracking-widest">{selectedRole}</span> account.
                                        </p>
                                    </div>

                                    <form onSubmit={handleLogin} className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] ml-2">Email Address</label>
                                            <div className="relative group">
                                                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors" size={20} />
                                                <input
                                                    type="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    placeholder="user@lnmi.ac.in"
                                                    required
                                                    className="w-full pl-16 pr-6 py-5 bg-white/5 border border-white/10 rounded-[1.5rem] focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all text-white placeholder:text-slate-600 font-medium text-base"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <div className="flex justify-between items-center ml-2">
                                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Account Password</label>
                                                <button type="button" onClick={() => navigate('/reset-password')} className="text-[10px] font-black text-primary uppercase tracking-[0.2em] hover:text-white transition-colors">Forgot Password?</button>
                                            </div>
                                            <div className="relative group">
                                                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors" size={20} />
                                                <input
                                                    type={showPassword ? 'text' : 'password'}
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    placeholder="••••••••"
                                                    required
                                                    className="w-full pl-16 pr-16 py-5 bg-white/5 border border-white/10 rounded-[1.5rem] focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all text-white placeholder:text-slate-600 font-medium text-base"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                                                >
                                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                                </button>
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className={`w-full py-6 rounded-[1.5rem] text-white font-black text-sm uppercase tracking-[0.4em] flex items-center justify-center gap-4 transition-all active:scale-95 disabled:opacity-70 disabled:pointer-events-none group shadow-2xl relative overflow-hidden bg-gradient-to-r ${activeRoleData.color}`}
                                        >
                                            {loading ? (
                                                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            ) : (
                                                <>
                                                    <span>Sign In</span>
                                                    <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                                                </>
                                            )}
                                        </button>
                                    </form>

                                    <div className="pt-6 text-center">
                                        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">
                                            Institutional Access Portal
                                        </p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Bottom Legal Links */}
                    <div className="mt-8 flex items-center gap-8 text-[9px] font-black uppercase tracking-[0.3em] text-slate-600">
                        <button className="hover:text-slate-400">Privacy Policy</button>
                        <button className="hover:text-slate-400">Security Terms</button>
                    </div>
                </div>
            </div>

            {/* Branding Section */}
            <div className="hidden lg:flex w-1/2 relative flex-col items-center justify-center p-20 overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${activeRoleData.color} transition-colors duration-1000`} />
                
                {/* Visual Depth Particles */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                    {[...Array(20)].map((_, i) => (
                        <motion.div
                            key={i}
                            animate={{
                                y: [-10, 10, -10],
                                x: [-10, 10, -10],
                                opacity: [0.3, 0.6, 0.3],
                            }}
                            transition={{
                                duration: 3 + Math.random() * 5,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="absolute bg-white/10 blur-sm rounded-full"
                            style={{
                                width: Math.random() * 100 + 50,
                                height: Math.random() * 100 + 50,
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                            }}
                        />
                    ))}
                </div>

                <div className="relative z-10 w-full max-w-lg space-y-12">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="glass-card bg-white/10 backdrop-blur-3xl p-16 rounded-[4rem] border border-white/20 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]"
                    >
                        <div className="p-3 w-max rounded-2xl bg-white/20 mb-10">
                            <Sparkles className="text-white" size={32} />
                        </div>
                        <h2 className="text-6xl font-black text-white tracking-tighter leading-[0.9] mb-8">
                            Institutional <br /> Excellence
                        </h2>
                        <p className="text-xl text-white/70 font-medium leading-relaxed mb-12">
                            Lalit Narayan Mishra Institute of Economic Development and Social Change, Patna.
                        </p>

                        <div className="flex items-center gap-6 p-6 rounded-[2.5rem] bg-black/20 border border-white/10">
                            <div className="flex -space-x-4">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="w-12 h-12 rounded-full border-4 border-[#0b0f1a] overflow-hidden">
                                        <img src={`https://i.pravatar.cc/150?u=${i + activeRoleData.id}`} alt="User" />
                                    </div>
                                ))}
                                <div className="w-12 h-12 rounded-full border-4 border-[#0b0f1a] bg-slate-800 flex items-center justify-center text-[10px] font-black text-white">+5k</div>
                            </div>
                            <div>
                                <div className="text-white font-black tracking-tight">Account Verified</div>
                                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">Secure login active</div>
                            </div>
                        </div>
                    </motion.div>

                    <div className="flex justify-between items-center px-6">
                        <div className="flex items-center gap-4">
                            <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.8)] animate-pulse" />
                            <span className="text-xs font-black uppercase tracking-[0.3em] text-white">Status: Active</span>
                        </div>
                        <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">LNMI Portal</div>
                    </div>
                </div>
            </div>
        </div>
    );
};



