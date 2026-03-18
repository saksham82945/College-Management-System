import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Rocket, GraduationCap, Building2, TrendingUp, Users, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const PublicHeader = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { 
            label: 'About', 
            href: '#about',
            icon: Building2,
            subItems: [
                { title: 'History & Legacy', desc: 'Established in 1973', href: '#about-history' },
                { title: 'Infrastructure', desc: 'State-of-the-art facilities', href: '#about-infra' },
                { title: 'Leadership', desc: 'Visionary guidance', href: '#about-leadership' },
            ]
        },
        { 
            label: 'Academics', 
            href: '#academics',
            icon: GraduationCap,
            subItems: [
                { title: 'Undergraduate', desc: 'BBA & BCA Programs', href: '#ug-programs' },
                { title: 'Postgraduate', desc: 'MBA & MCA Programs', href: '#pg-programs' },
                { title: 'Integrated Courses', desc: 'BBA+MBA & BCA+MCA', href: '#integrated-programs' },
            ]
        },
        { 
            label: 'Admissions', 
            href: '#admissions',
            icon: BookOpen,
            subItems: [
                { title: 'Application Process', desc: 'Online registration (Jan-Jun)', href: '#apply' },
                { title: 'Eligibility Criteria', desc: 'UG & PG Requirements', href: '#eligibility' },
                { title: 'Entrance Exams', desc: 'MAT/CMAT/CAT & Internal Tests', href: '#exams' },
            ]
        },
        { 
            label: 'Research', 
            href: '#research',
            icon: TrendingUp,
            subItems: [
                { title: 'Socio-Economic Focus', desc: 'Legacy of societal research', href: '#research-focus' },
                { title: 'National Projects', desc: 'Government & institutional tie-ups', href: '#research-projects' },
                { title: 'Publications', desc: 'Faculty research works', href: '#publications' },
            ]
        },
        { 
            label: 'Portfolio', 
            href: '#portfolio',
            icon: Users,
            subItems: [
                { title: 'Placement Statistics', desc: 'Highest Package: 16.4 LPA', href: '#placements' },
                { title: 'Top Recruiters', desc: 'ICICI, HDFC, Amul & more', href: '#recruiters' },
                { title: 'Alumni Network', desc: '30,000+ strong global community', href: '#alumni' },
            ]
        },
    ];

    return (
        <header className={`fixed w-full top-0 z-[100] transition-all duration-500 ${
            scrolled ? 'py-4' : 'py-6'
        }`}>
            <div className="container mx-auto px-6">
                <nav className={`relative rounded-[2.5rem] transition-all duration-500 border ${
                    scrolled 
                    ? 'bg-white/95 backdrop-blur-2xl border-indigo-100 shadow-[0_20px_50px_-15px_rgba(79,70,229,0.15)] py-3' 
                    : 'bg-slate-900/10 backdrop-blur-xl border-white/20 py-4 shadow-2xl shadow-black/10'
                }`}
                onMouseLeave={() => setActiveDropdown(null)}>
                    {/* Subtle colorful accent line on top when scrolled */}
                    {scrolled && (
                        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-t-[2.5rem] opacity-80" />
                    )}

                    <div className="flex items-center justify-between px-8 relative z-20">
                        {/* Institutional Branding */}
                        <div 
                            className="flex items-center gap-4 cursor-pointer group" 
                            onClick={() => navigate('/')}
                        >
                            <div className="relative">
                                <div className="absolute inset-0 bg-primary blur-lg opacity-20 group-hover:opacity-60 transition-opacity" />
                                <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-primary via-indigo-500 to-purple-600 flex items-center justify-center shadow-lg transform group-hover:rotate-6 group-hover:scale-105 transition-all">
                                    <span className="text-white font-black text-xl tracking-tighter">LN</span>
                                </div>
                            </div>
                            <div className="hidden sm:block">
                                <h1 className={`text-lg font-black tracking-tighter transition-colors ${
                                    scrolled ? 'text-slate-900 group-hover:text-primary' : 'text-white'
                                }`}>
                                    LNMI <span className="text-primary group-hover:animate-pulse">.</span>
                                </h1>
                                <p className={`text-[8px] font-black uppercase tracking-[0.2em] transition-opacity ${
                                    scrolled ? 'text-slate-500' : 'text-white/80'
                                }`}>
                                    Govt. of Bihar • Autonomous
                                </p>
                            </div>
                        </div>

                        {/* Centered Navigation */}
                        <div className="hidden lg:flex items-center gap-2">
                            {navLinks.map((link, index) => (
                                <div 
                                    key={link.label}
                                    className="relative group"
                                    onMouseEnter={() => setActiveDropdown(index)}
                                >
                                    <a
                                        href={link.href}
                                        className={`px-4 py-2 rounded-full text-[11px] font-black uppercase tracking-[0.15em] transition-all flex items-center gap-1 ${
                                            scrolled 
                                            ? (activeDropdown === index ? 'text-primary bg-primary/10' : 'text-slate-600 hover:text-primary hover:bg-slate-50') 
                                            : (activeDropdown === index ? 'text-white bg-white/20' : 'text-white/90 hover:text-white hover:bg-white/10')
                                        }`}
                                    >
                                        {link.label}
                                        <ChevronDown size={14} className={`transition-transform duration-300 ${activeDropdown === index ? 'rotate-180' : ''}`} />
                                    </a>

                                    {/* Desktop Mega Menu Dropdown */}
                                    <AnimatePresence>
                                        {activeDropdown === index && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                                className="absolute top-full mt-4 left-1/2 -translate-x-1/2 w-[320px] bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 z-[110] origin-top"
                                            >
                                                {/* Decorative Header */}
                                                <div className="bg-gradient-to-r from-primary to-purple-600 p-6 relative overflow-hidden">
                                                    <div className="absolute -top-10 -right-10 w-24 h-24 bg-white/20 rounded-full blur-2xl" />
                                                    <div className="relative z-10 flex items-center gap-3">
                                                        <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm text-white">
                                                            <link.icon size={20} />
                                                        </div>
                                                        <div>
                                                            <h3 className="text-white font-black text-sm uppercase tracking-wider">{link.label}</h3>
                                                            <p className="text-white/80 text-xs mt-0.5" style={{textTransform: 'none'}}>Explore {link.label.toLowerCase()}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                {/* Sub-menu Items */}
                                                <div className="p-3">
                                                    {link.subItems.map((sub, i) => (
                                                        <motion.a
                                                            initial={{ opacity: 0, x: -10 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ delay: i * 0.05 }}
                                                            key={sub.title}
                                                            href={sub.href}
                                                            className="flex flex-col p-3 rounded-2xl hover:bg-slate-50 transition-colors group/item"
                                                            onClick={(e) => {
                                                                // Allow smooth scrolling if on same page
                                                                setActiveDropdown(null);
                                                            }}
                                                        >
                                                            <span className="text-sm font-bold text-slate-800 group-hover/item:text-primary transition-colors">
                                                                {sub.title}
                                                            </span>
                                                            <span className="text-xs text-slate-500 mt-0.5 group-hover/item:text-slate-600" style={{textTransform: 'none'}}>
                                                                {sub.desc}
                                                            </span>
                                                        </motion.a>
                                                    ))}
                                                </div>
                                                
                                                {/* Bottom Action Area */}
                                                <div className="bg-slate-50 p-4 flex justify-between items-center text-xs group/bottom hover:bg-primary/5 transition-colors border-t border-slate-100 cursor-pointer">
                                                    <span className="font-bold text-slate-600 group-hover/bottom:text-primary transition-colors">Open section</span>
                                                    <Rocket size={14} className="text-slate-400 group-hover/bottom:text-primary group-hover/bottom:translate-x-1 group-hover/bottom:-translate-y-1 transition-all" />
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </div>

                        {/* Critical Actions */}
                        <div className="flex items-center gap-4">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => navigate('/login')}
                                className={`group relative hidden sm:flex items-center gap-3 px-7 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-xl ${
                                    scrolled 
                                    ? 'bg-gradient-to-r from-slate-900 to-slate-800 text-white shadow-primary/20 hover:shadow-primary/40' 
                                    : 'bg-white text-slate-900 border-white/20 hover:bg-slate-50 shadow-black/20 hover:shadow-white/20'
                                }`}
                            >
                                <Rocket size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-indigo-500 group-hover:text-primary" />
                                Login / Signup
                                
                                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/0 via-white/20 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity blur-sm pointer-events-none" />
                            </motion.button>

                            <button
                                className={`lg:hidden p-2 rounded-xl transition-colors ${
                                    scrolled ? 'text-slate-900 hover:bg-slate-100' : 'text-white hover:bg-white/10'
                                }`}
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                            >
                                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Dynamic Menu (Absolute relative to document to avoid clipping) */}
                    <AnimatePresence>
                        {isMenuOpen && (
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                className="absolute top-full left-0 right-0 mt-4 mx-2 overflow-hidden rounded-[2.5rem] bg-white border border-slate-100 shadow-2xl lg:hidden max-h-[70vh] overflow-y-auto z-[120]"
                            >
                                <div className="p-6 space-y-4">
                                    {navLinks.map((link) => (
                                        <div key={link.label} className="border-b border-slate-50 last:border-0 pb-4 last:pb-0">
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                                    <link.icon size={18} />
                                                </div>
                                                <span className="text-sm font-black uppercase tracking-[0.2em] text-slate-800">
                                                    {link.label}
                                                </span>
                                            </div>
                                            <div className="pl-11 space-y-2">
                                                {link.subItems.map(subItem => (
                                                    <a
                                                        key={subItem.title}
                                                        href={subItem.href}
                                                        className="block py-2 text-sm font-bold text-slate-600 hover:text-primary transition-colors"
                                                        onClick={() => setIsMenuOpen(false)}
                                                        style={{textTransform: 'none'}}
                                                    >
                                                        {subItem.title}
                                                        <div className="text-[10px] text-slate-400 font-normal mt-0.5">{subItem.desc}</div>
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                    
                                    <div className="pt-4 mt-4 border-t border-slate-100">
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => { navigate('/login'); setIsMenuOpen(false); }}
                                            className="w-full flex items-center justify-center gap-3 p-5 rounded-2xl bg-gradient-to-r from-primary to-indigo-600 text-white font-black uppercase tracking-[0.2em] text-[11px] shadow-xl shadow-primary/30"
                                        >
                                            <Rocket size={16} />
                                            Login / Signup
                                        </motion.button>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </nav>
            </div>
        </header>
    );
};


