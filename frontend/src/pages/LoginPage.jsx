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
    ChevronLeft, ShieldCheck, Zap, Play, FlaskConical, Briefcase
} from 'lucide-react';

// Demo credentials for each role
const DEMO_CREDENTIALS = {
    ADMIN:   { email: 'admin@college.com',   password: 'admin123'   },
    TEACHER: { email: 'teacher@college.com', password: 'teacher123' },
    STUDENT: { email: 'student@college.com', password: 'student123' },
    STAFF:   { email: 'staff@college.com',   password: 'staff123'   },
};

export const LoginPage = () => {
    const [step, setStep] = useState('ROLE_SELECT'); // ROLE_SELECT or LOGIN_FORM
    const [selectedRole, setSelectedRole] = useState('STUDENT');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [demoFilling, setDemoFilling] = useState(false);
    
    const navigate = useNavigate();
    const { login } = useAuthStore();
    const { isDarkMode } = useTheme();

    const roles = [
        { id: 'ADMIN', title: 'Admin', icon: Shield, color: 'from-purple-500 to-indigo-600', description: 'Administration' },
        { id: 'TEACHER', title: 'Teacher', icon: BookOpen, color: 'from-sky-500 to-cyan-600', description: 'Faculty & Academics' },
        { id: 'STUDENT', title: 'Student', icon: GraduationCap, color: 'from-emerald-500 to-cyan-500', description: 'Student Portal' },
        { id: 'STAFF', title: 'Staff', icon: Briefcase, color: 'from-pink-500 to-rose-600', description: 'Support Services' },
    ];

    const activeRoleData = roles.find(r => r.id === selectedRole);

    // Animate demo credential filling character by character
    const animateFill = async (targetEmail, targetPassword) => {
        setDemoFilling(true);
        setEmail('');
        setPassword('');

        // Type email
        for (let i = 0; i <= targetEmail.length; i++) {
            await new Promise(r => setTimeout(r, 30));
            setEmail(targetEmail.slice(0, i));
        }
        await new Promise(r => setTimeout(r, 150));

        // Type password
        for (let i = 0; i <= targetPassword.length; i++) {
            await new Promise(r => setTimeout(r, 40));
            setPassword(targetPassword.slice(0, i));
        }

        setDemoFilling(false);
    };

    // Handle "Try Demo" from role selection card — select role, go to form, and fill
    const handleDemoFromCard = async (roleId, e) => {
        e.stopPropagation();
        setSelectedRole(roleId);
        setStep('LOGIN_FORM');
        const creds = DEMO_CREDENTIALS[roleId];
        // Small delay so the form mounts before we start typing
        await new Promise(r => setTimeout(r, 350));
        await animateFill(creds.email, creds.password);
        toast.success(`Demo credentials filled for ${roleId} — click Sign In!`, { icon: '🎭' });
    };

    // Handle "Try Demo" from the login form (for current role)
    const handleDemoFromForm = async () => {
        const creds = DEMO_CREDENTIALS[selectedRole];
        await animateFill(creds.email, creds.password);
        toast.success(`Demo credentials ready — click Sign In!`, { icon: '🎭' });
    };

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

                        {/* Demo Banner */}
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400"
                        >
                            <FlaskConical size={12} />
                            <span className="text-[9px] font-black uppercase tracking-[0.25em]">Demo Available</span>
                        </motion.div>
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

                                    {/* Demo Info Banner */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                        className="flex items-center gap-4 p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20"
                                    >
                                        <div className="w-9 h-9 rounded-xl bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                                            <Play size={14} className="text-amber-400 ml-0.5" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-amber-400 mb-0.5">Quick Demo</p>
                                            <p className="text-xs text-slate-400 font-medium">Click <span className="text-amber-300 font-black">Try Demo</span> on any role to auto-fill credentials instantly.</p>
                                        </div>
                                    </motion.div>

                                    <div className="grid gap-4">
                                        {roles.map((role) => (
                                            <div key={role.id} className="group relative">
                                                <button
                                                    onClick={() => {
                                                        setSelectedRole(role.id);
                                                        setStep('LOGIN_FORM');
                                                    }}
                                                    className="w-full relative p-6 rounded-[2rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-all flex items-center gap-6 text-left"
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

                                                {/* Try Demo button on card */}
                                                <motion.button
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={(e) => handleDemoFromCard(role.id, e)}
                                                    className={`absolute right-5 bottom-[-14px] flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] text-white bg-gradient-to-r ${role.color} shadow-lg border border-white/20 z-10 hover:shadow-xl transition-shadow`}
                                                >
                                                    <Play size={9} className="fill-white" />
                                                    Try Demo
                                                </motion.button>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Credentials reference */}
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.6 }}
                                        className="p-4 rounded-2xl bg-white/3 border border-white/8"
                                    >
                                        <p className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-600 mb-3">Demo Credentials</p>
                                        <div className="space-y-2">
                                            {roles.map(role => (
                                                <div key={role.id} className="flex items-center justify-between text-[10px]">
                                                    <div className={`flex items-center gap-2`}>
                                                        <div className={`w-5 h-5 rounded-md bg-gradient-to-br ${role.color} flex items-center justify-center`}>
                                                            <role.icon size={10} className="text-white" />
                                                        </div>
                                                        <span className="text-slate-500 font-bold">{DEMO_CREDENTIALS[role.id].email}</span>
                                                    </div>
                                                    <span className="text-slate-600 font-mono tracking-wider">{DEMO_CREDENTIALS[role.id].password}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="login-form"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-8"
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

                                    {/* Demo autofill button for the form */}
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.97 }}
                                        onClick={handleDemoFromForm}
                                        disabled={demoFilling}
                                        className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all disabled:opacity-60 disabled:cursor-not-allowed
                                            bg-gradient-to-r ${activeRoleData.color} bg-opacity-10 border-white/10 hover:border-white/20
                                            group relative overflow-hidden`}
                                        style={{ background: 'rgba(255,255,255,0.04)' }}
                                    >
                                        {/* Gradient shimmer background */}
                                        <div className={`absolute inset-0 bg-gradient-to-r ${activeRoleData.color} opacity-10 group-hover:opacity-20 transition-opacity`} />
                                        
                                        <div className={`relative w-10 h-10 rounded-xl bg-gradient-to-br ${activeRoleData.color} flex items-center justify-center shadow-lg flex-shrink-0`}>
                                            {demoFilling ? (
                                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            ) : (
                                                <Play size={14} className="text-white fill-white ml-0.5" />
                                            )}
                                        </div>
                                        <div className="relative text-left">
                                            <p className="text-xs font-black text-white uppercase tracking-[0.2em]">
                                                {demoFilling ? 'Filling credentials...' : `Try ${selectedRole.charAt(0) + selectedRole.slice(1).toLowerCase()} Demo`}
                                            </p>
                                            <p className="text-[10px] text-slate-400 font-medium mt-0.5">
                                                {demoFilling ? 'Please wait...' : `Auto-fills ${DEMO_CREDENTIALS[selectedRole].email}`}
                                            </p>
                                        </div>
                                        <div className="relative ml-auto">
                                            <ArrowRight size={16} className="text-slate-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
                                        </div>
                                    </motion.button>

                                    {/* Divider */}
                                    <div className="flex items-center gap-4">
                                        <div className="flex-1 h-px bg-white/10" />
                                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-600">or enter manually</span>
                                        <div className="flex-1 h-px bg-white/10" />
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

                                    <div className="pt-2 text-center">
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

                        {/* Demo credentials card on the right panel */}
                        <div className="p-5 rounded-[2rem] bg-black/20 border border-white/10 mb-6">
                            <div className="flex items-center gap-2 mb-4">
                                <Play size={12} className="text-white fill-white" />
                                <span className="text-[10px] font-black uppercase tracking-[0.25em] text-white/70">Demo Access</span>
                            </div>
                            <div className="space-y-3">
                                {[
                                    { role: 'Admin',   email: 'admin@college.com',   pass: 'admin123',   color: 'bg-purple-500' },
                                    { role: 'Teacher', email: 'teacher@college.com', pass: 'teacher123', color: 'bg-sky-500' },
                                    { role: 'Student', email: 'student@college.com', pass: 'student123', color: 'bg-emerald-500' },
                                    { role: 'Staff',   email: 'staff@college.com',   pass: 'staff123',   color: 'bg-pink-500' },
                                ].map(d => (
                                    <div key={d.role} className="flex items-center gap-3">
                                        <div className={`w-2 h-2 rounded-full ${d.color} flex-shrink-0`} />
                                        <div className="flex-1 min-w-0">
                                            <div className="text-[10px] font-black text-white/60 uppercase tracking-wider">{d.role}</div>
                                            <div className="text-[9px] text-white/40 font-mono truncate">{d.email}</div>
                                        </div>
                                        <div className="text-[9px] font-mono text-white/50 bg-white/5 px-2 py-1 rounded-lg">{d.pass}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

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



