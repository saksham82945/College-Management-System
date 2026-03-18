import React, { useEffect, useState, useRef } from 'react';
import { PublicHeader } from '@/components/PublicHeader';
import { useNavigate } from 'react-router-dom';
import {
    ArrowRight, ArrowUp, BookOpen, Users, Award, Building2, GraduationCap,
    Globe, ChevronRight, MapPin, Activity,
    Phone, Mail, CheckCircle, Star, TrendingUp, Zap, Shield
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';




const slides = [
    {
        id: 0,
        tagline: "51st Annual Day Celebration 2024",
        title: "L.N. Mishra",
        subtitle: "Institute",
        highlight: "of Excellence",
        desc: "Bihar's premier management and technology institute, shaping future leaders since 1973 through industry-aligned programs and research.",
        bg: "/assets/images/lnmi/s1.jpeg",
        badge: "Est. 1973",
        overlayFrom: "from-slate-950/85",
    },
    {
        id: 1,
        tagline: "State-of-the-Art Auditorium",
        title: "World-Class",
        subtitle: "Learning",
        highlight: "Infrastructure",
        desc: "Our modern auditorium hosts convocations, national guest lectures and seminars with 1200+ seating capacity.",
        bg: "/assets/images/lnmi/s2.jpeg",
        badge: "1200+ Capacity",
        overlayFrom: "from-indigo-950/80",
    },
    {
        id: 2,
        tagline: "Campus Illuminated — Festive Celebrations",
        title: "A Campus",
        subtitle: "That Comes",
        highlight: "Alive at Night",
        desc: "Every festival, every milestone — LNMI comes alive with light and celebration, fostering a vibrant community spirit.",
        bg: "/assets/images/lnmi/lnmi-night1.webp",
        badge: "Vibrant Community",
        overlayFrom: "from-slate-950/75",
    },
    {
        id: 3,
        tagline: "L.N. Mishra Institute — Illuminated",
        title: "Where Tradition",
        subtitle: "Meets",
        highlight: "Modern Vision",
        desc: "The iconic LNMI Administrative Block, beautifully lit, symbolizing 50+ years of academic brilliance and institutional pride.",
        bg: "/assets/images/lnmi/lnmi-night2.webp",
        badge: "50+ Years",
        overlayFrom: "from-slate-950/70",
    },
    {
        id: 4,
        tagline: "Advanced Computing Facility",
        title: "Technology-Driven",
        subtitle: "Academic",
        highlight: "Environment",
        desc: "Equipped with 300+ modern workstations, our computing labs power research and hands-on learning in cutting-edge disciplines.",
        bg: "/assets/images/lnmi/s3.webp",
        badge: "300+ Workstations",
        overlayFrom: "from-slate-950/80",
    },
];

const stats = [
    { icon: Users, label: "Students Enrolled", value: "3,500+", color: "from-indigo-500 to-blue-600" },
    { icon: GraduationCap, label: "Faculty Members", value: "150+", color: "from-violet-500 to-purple-600" },
    { icon: Award, label: "Courses Offered", value: "25+", color: "from-emerald-500 to-teal-600" },
    { icon: Building2, label: "Years of Excellence", value: "50+", color: "from-amber-500 to-orange-600" },
];

const programs = [
    { name: "MBA", full: "Master of Business Administration", icon: TrendingUp, semesters: 4, color: "from-purple-600 to-indigo-600" },
    { name: "MCA", full: "Master of Computer Applications", icon: Zap, semesters: 4, color: "from-sky-600 to-cyan-600" },
    { name: "BBA", full: "Bachelor of Business Administration", icon: BookOpen, semesters: 6, color: "from-emerald-600 to-green-600" },
    { name: "BCA", full: "Bachelor of Computer Applications", icon: Shield, semesters: 6, color: "from-rose-600 to-pink-600" },
];

const announcements = [
    { title: "MBA Orientation 2024-25 scheduled for August 10", date: "05 Aug", type: "ANNOUNCEMENT", color: "bg-indigo-500" },
    { title: "MCA Entrance Exam Phase II Results Published", date: "02 Aug", type: "RESULT", color: "bg-emerald-500" },
    { title: "Campus Placement Drive: 20+ MNCs Expected", date: "28 Jul", type: "PLACEMENT", color: "bg-amber-500" },
];

const gallery = [
    { src: "/assets/images/lnmi/s1.jpeg", caption: "51st Annual Celebration" },
    { src: "/assets/images/lnmi/lnmi-night1.webp", caption: "Festive Illumination" },
    { src: "/assets/images/lnmi/s2.jpeg", caption: "Modern Auditorium" },
    { src: "/assets/images/lnmi/lnmi-night2.webp", caption: "LNMI at Night" },
    { src: "/assets/images/lnmi/s3.webp", caption: "Computing Labs" },
    { src: "/assets/images/lnmi/lnmi3.jpeg", caption: "Campus Life" },
];

const SLIDE_DURATION = 6000;

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
export const LandingPage = () => {
    const navigate = useNavigate();
    const [current, setCurrent] = useState(0);
    const [progress, setProgress] = useState(0);
    const [showScrollTop, setShowScrollTop] = useState(false);
    const intervalRef = useRef(null);

    const resetInterval = () => {
        setProgress(0);
        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            setProgress(p => {
                if (p >= 100) {
                    setCurrent(c => (c + 1) % slides.length);
                    return 0;
                }
                return p + (100 / (SLIDE_DURATION / 100));
            });
        }, 100);
    };

    useEffect(() => {
        resetInterval();
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 400);
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            clearInterval(intervalRef.current);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const goToSlide = (idx) => {
        setCurrent(idx);
        resetInterval();
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };


    const slide = slides[current];

    return (
        <div className="min-h-screen bg-white text-slate-900 overflow-x-hidden">
            <PublicHeader />

            {/* ─── HERO ─── */}
            <section className="relative h-screen min-h-[680px] flex items-center overflow-hidden pt-20">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={current}
                        initial={{ opacity: 0, scale: 1.06 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute inset-0"
                    >
                        <img
                            src={slide.bg}
                            alt="LNMI Campus"
                            className="w-full h-full object-cover object-center"
                        />
                        <div className={`absolute inset-0 bg-gradient-to-r ${slide.overlayFrom} via-slate-900/50 to-transparent`} />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/20" />
                    </motion.div>
                </AnimatePresence>

                {/* Hero Content */}
                <div className="relative z-10 container mx-auto px-6 lg:px-16">
                    <div className="max-w-3xl">
                        {/* Tagline */}
                        <motion.div
                            key={`tag-${current}`}
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.55 }}
                            className="flex items-center gap-3 mb-6"
                        >
                            <div className="h-[2px] w-10 bg-indigo-400" />
                            <span className="text-indigo-300 text-xs font-black uppercase tracking-[0.35em]">
                                {slide.tagline}
                            </span>
                        </motion.div>

                        {/* Title */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={`title-${current}`}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <h1 className="text-5xl md:text-7xl xl:text-8xl font-black text-white tracking-tighter leading-[0.95] mb-5 drop-shadow-2xl">
                                    {slide.title}
                                    <span className="block text-slate-300 mt-1">{slide.subtitle}</span>
                                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400 mt-1">
                                        {slide.highlight}
                                    </span>
                                </h1>
                                <p className="text-white/70 text-base md:text-lg font-medium mb-10 max-w-xl leading-relaxed">
                                    {slide.desc}
                                </p>
                            </motion.div>
                        </AnimatePresence>

                        {/* CTAs */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                            className="flex flex-wrap gap-4"
                        >
                            <button
                                onClick={() => navigate('/login')}
                                className="group flex items-center gap-3 px-8 py-4 bg-indigo-600 text-white font-black text-sm uppercase tracking-widest rounded-2xl shadow-2xl shadow-indigo-500/30 hover:bg-indigo-500 transition-all duration-300 active:scale-95"
                            >
                                Student Portal
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button className="flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-xl border border-white/20 text-white font-black text-sm uppercase tracking-widest rounded-2xl hover:bg-white/20 transition-all duration-300">
                                Apply Now
                            </button>
                        </motion.div>
                    </div>
                </div>

                {/* Slide badge (desktop) */}
                <motion.div
                    key={`badge-${current}`}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="absolute bottom-28 right-10 lg:right-16 bg-white/10 backdrop-blur-xl border border-white/20 px-5 py-3 rounded-2xl text-white font-black text-sm uppercase tracking-widest hidden md:block"
                >
                    {slide.badge}
                </motion.div>

               
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
                    {slides.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => goToSlide(i)}
                            className="relative overflow-hidden rounded-full transition-all duration-500"
                            style={{ width: current === i ? 48 : 10, height: 5 }}
                        >
                            <span className="absolute inset-0 bg-white/30 rounded-full" />
                            {current === i && (
                                <motion.span
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                    className="absolute inset-y-0 left-0 bg-indigo-400 rounded-full"
                                />
                            )}
                        </button>
                    ))}
                </div>

                
                <div className="absolute bottom-10 right-10 text-white/40 font-black text-xs uppercase tracking-widest hidden md:block">
                    {String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
                </div>
            </section>

            {/* ─── STATS ─── */}
            <section className="py-20 bg-slate-950">
                <div className="container mx-auto px-6 lg:px-16">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                        {stats.map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="relative group"
                            >
                                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-10 group-hover:opacity-20 rounded-3xl transition-opacity`} />
                                <div className="relative bg-slate-900/80 rounded-3xl p-8 border border-white/5 hover:border-white/10 transition-all">
                                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-5 shadow-lg`}>
                                        <stat.icon size={22} className="text-white" />
                                    </div>
                                    <div className="text-4xl font-black text-white tracking-tighter mb-1">{stat.value}</div>
                                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">{stat.label}</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>


            {/* ─── ABOUT ─── */}
            <section id="about" className="py-32 bg-white">
                <div className="container mx-auto px-6 lg:px-16">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        {/* Image collage */}
                        <div className="relative">
                            <div className="grid grid-cols-2 gap-4">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="col-span-2 h-64 rounded-3xl overflow-hidden shadow-2xl"
                                >
                                    <img src="/assets/images/lnmi/s1.jpeg" alt="Annual Day" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.15 }}
                                    className="h-48 rounded-3xl overflow-hidden shadow-xl"
                                >
                                    <img src="/assets/images/lnmi/lnmi-night1.webp" alt="Night View" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.25 }}
                                    className="h-48 rounded-3xl overflow-hidden shadow-xl"
                                >
                                    <img src="/assets/images/lnmi/lnmi-night2.webp" alt="Illuminated Building" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                                </motion.div>
                            </div>
                            {/* Floating badge */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="absolute -bottom-6 -right-6 bg-indigo-600 text-white p-6 rounded-3xl shadow-2xl"
                            >
                                <div className="text-4xl font-black leading-none">51st</div>
                                <div className="text-xs font-black uppercase tracking-widest text-indigo-200 mt-1">Annual Day 2024</div>
                            </motion.div>
                        </div>

                        {/* Text */}
                        <div className="space-y-8">
                            <div>
                                <span className="text-indigo-600 font-black uppercase tracking-[0.4em] text-xs mb-4 block">Our Institutional Identity</span>
                                <h2 className="text-5xl md:text-6xl font-black tracking-tighter text-slate-900 leading-[1.05]">
                                    A Legacy of <br />
                                    <span className="text-indigo-600 italic">Excellence</span> &amp;
                                    <br />Achievement
                                </h2>
                            </div>
                            <p className="text-lg text-slate-500 leading-relaxed font-medium">
                                L.N.M Institute (LNMI) stands as a premier autonomous institution under the Government of Bihar. For over five decades, we have been at the forefront of management and information technology education, nurturing thousands of professionals who lead global organizations today.
                            </p>
                            <div className="grid grid-cols-2 gap-5">
                                {[
                                    { label: "AICTE Approved", icon: CheckCircle },
                                    { label: "UGC Recognized", icon: CheckCircle },
                                    { label: "Government of Bihar", icon: Shield },
                                    { label: "100% Placement Record", icon: Star },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <item.icon size={18} className="text-indigo-500 shrink-0" />
                                        <span className="text-sm font-black text-slate-700">{item.label}</span>
                                    </div>
                                ))}
                            </div>
                            <button
                                onClick={() => navigate('/login')}
                                className="group inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white font-black text-sm uppercase tracking-widest rounded-2xl hover:bg-indigo-600 transition-all duration-300 shadow-xl"
                            >
                                Explore Institute
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── PROGRAMS ─── */}
            <section id="academics" className="py-32 bg-slate-50">
                <div className="container mx-auto px-6 lg:px-16">
                    <div className="text-center mb-20">
                        <span className="text-indigo-600 font-black uppercase tracking-[0.4em] text-xs mb-4 block">Academic Offerings</span>
                        <h2 className="text-5xl font-black tracking-tighter text-slate-900">Our Programmes</h2>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {programs.map((prog, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                whileHover={{ y: -8 }}
                                className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/60 border border-slate-100 group cursor-pointer"
                            >
                                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${prog.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                    <prog.icon size={28} className="text-white" />
                                </div>
                                <h3 className="text-3xl font-black text-slate-900 tracking-tighter mb-2">{prog.name}</h3>
                                <p className="text-sm text-slate-500 font-bold leading-snug mb-6">{prog.full}</p>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-black uppercase tracking-widest text-slate-400">{prog.semesters} Semesters</span>
                                    <ChevronRight size={18} className="text-indigo-400 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── NIGHT CAMPUS FEATURE ─── */}
            <section className="py-0 relative overflow-hidden">
                <div className="grid md:grid-cols-2 h-[500px]">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="relative overflow-hidden group"
                    >
                        <img
                            src="/assets/images/lnmi/lnmi-night1.webp"
                            alt="LNMI Night Illumination"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                        <div className="absolute bottom-0 left-0 p-8">
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-400 block mb-2">Festive Ambience</span>
                            <h3 className="text-3xl font-black text-white tracking-tighter">LNMI Illuminated</h3>
                            <p className="text-white/60 text-sm font-bold mt-2">Colourful celebrations lighting up the campus</p>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.15 }}
                        className="relative overflow-hidden group"
                    >
                        <img
                            src="/assets/images/lnmi/lnmi-night2.webp"
                            alt="LNMI Admin Block Night"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                        <div className="absolute bottom-0 left-0 p-8">
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-400 block mb-2">Administrative Block</span>
                            <h3 className="text-3xl font-black text-white tracking-tighter">L.N. Mishra Institute</h3>
                            <p className="text-white/60 text-sm font-bold mt-2">50+ years of academic brilliance</p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ─── ADMISSIONS BANNER ─── */}
            <section id="admissions" className="py-32 relative overflow-hidden bg-indigo-950">
                <img src="/assets/images/lnmi/s2.jpeg" alt="LNMI" className="absolute inset-0 w-full h-full object-cover opacity-10" />
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-indigo-900 to-violet-950" />
                <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-white/5 blur-3xl" />
                <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-indigo-400/10 blur-3xl" />

                <div className="container mx-auto px-6 lg:px-16 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 backdrop-blur-sm">
                                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                <span className="text-xs font-black uppercase tracking-widest text-white/80">Admissions Open — Batch 2025-26</span>
                            </div>
                            <h2 className="text-5xl md:text-6xl font-black text-white tracking-tighter leading-tight">
                                Begin Your
                                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-violet-300">Professional</span>
                                Journey with LNMI
                            </h2>
                            <p className="text-white/60 text-lg font-medium leading-relaxed max-w-md">
                                Secure your place in Bihar's most prestigious management institute. Applications for MBA, MCA, BCA, and BBA programmes are now open.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <button
                                    onClick={() => navigate('/login')}
                                    className="group flex items-center gap-3 px-8 py-4 bg-white text-indigo-900 font-black text-sm uppercase tracking-widest rounded-2xl shadow-2xl hover:bg-indigo-50 transition-all active:scale-95"
                                >
                                    Apply Online
                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                                <button className="flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-black text-sm uppercase tracking-widest rounded-2xl hover:bg-white/20 transition-all">
                                    Download Prospectus
                                </button>
                            </div>
                        </div>

                        <div className="relative hidden lg:block">
                            <motion.div
                                initial={{ opacity: 0, rotate: -3 }}
                                whileInView={{ opacity: 1, rotate: 0 }}
                                viewport={{ once: true }}
                                className="rounded-[3rem] overflow-hidden border-4 border-white/10 shadow-2xl"
                            >
                                <img src="/assets/images/lnmi/s2.jpeg" alt="LNMI Auditorium" className="w-full h-80 object-cover" />
                            </motion.div>
                            <div className="absolute -bottom-6 -left-6 bg-emerald-500 text-white px-6 py-4 rounded-2xl shadow-xl">
                                <div className="text-2xl font-black leading-none">100%</div>
                                <div className="text-xs font-black uppercase tracking-widest text-emerald-100 mt-0.5">Placement Record</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── RESEARCH ─── */}
            <section id="research" className="py-32 bg-white">
                <div className="container mx-auto px-6 lg:px-16">
                    <div className="text-center mb-20">
                        <span className="text-indigo-600 font-black uppercase tracking-[0.4em] text-xs mb-4 block">Innovation & Discovery</span>
                        <h2 className="text-5xl font-black tracking-tighter text-slate-900">Research Ecosystem</h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl transition-all">
                            <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Globe size={28} />
                            </div>
                            <h3 className="text-xl font-black mb-3 text-slate-900">Socio-Economic Focus</h3>
                            <p className="text-slate-500 font-medium max-w-sm mx-auto">A rich legacy of conducting societal research to empower communities and influence effective policy making.</p>
                        </div>
                        <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl transition-all">
                            <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Building2 size={28} />
                            </div>
                            <h3 className="text-xl font-black mb-3 text-slate-900">National Projects</h3>
                            <p className="text-slate-500 font-medium max-w-sm mx-auto">Actively collaborating with Government bodies on pivotal state and national socio-economic development projects.</p>
                        </div>
                        <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl transition-all">
                            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <BookOpen size={28} />
                            </div>
                            <h3 className="text-xl font-black mb-3 text-slate-900">Publications</h3>
                            <p className="text-slate-500 font-medium max-w-sm mx-auto">Hundreds of distinguished research papers authored by our esteemed faculty in reported international journals.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── PORTFOLIO & PLACEMENTS ─── */}
            <section id="portfolio" className="py-20 bg-slate-50">
                <div className="container mx-auto px-6 lg:px-16 text-center">
                    <span className="text-indigo-600 font-black uppercase tracking-[0.4em] text-xs mb-4 block">Corporate Connections</span>
                    <h2 className="text-4xl font-black tracking-tighter text-slate-900 mb-12">Placements & Portfolio</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 hover:-translate-y-2 transition-transform">
                            <div className="text-4xl font-black text-emerald-500 mb-2">16.4 LPA</div>
                            <div className="text-sm font-black text-slate-900 uppercase tracking-widest">Highest Package</div>
                            <p className="text-slate-500 text-xs mt-3 font-medium">Achieved in the latest 2024-25 placement drive</p>
                        </div>
                        <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 flex flex-col items-center justify-center hover:-translate-y-2 transition-transform">
                            <div className="text-xl font-black text-slate-900 mb-4">Top Recruiters</div>
                            <div className="flex flex-wrap justify-center gap-3">
                                {['ICICI Bank', 'HDFC Bank', 'Amul', 'Federal Bank', 'Vodafone Idea'].map(company => (
                                    <span key={company} className="px-3 py-1.5 bg-slate-100 text-slate-600 text-xs font-bold rounded-full">{company}</span>
                                ))}
                            </div>
                        </div>
                        <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 hover:-translate-y-2 transition-transform">
                            <div className="text-4xl font-black text-indigo-500 mb-2">30,000+</div>
                            <div className="text-sm font-black text-slate-900 uppercase tracking-widest">Alumni Network</div>
                            <p className="text-slate-500 text-xs mt-3 font-medium">A strong global community of successful professionals in leadership roles</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── GALLERY STRIP ─── */}
            <section id="campus" className="py-20 bg-white overflow-hidden">
                <div className="container mx-auto px-6 lg:px-16 mb-12 text-center">
                    <span className="text-indigo-600 font-black uppercase tracking-[0.4em] text-xs mb-4 block">Campus Life</span>
                    <h2 className="text-4xl font-black tracking-tighter text-slate-900">Life at LNMI</h2>
                </div>
                <div className="flex gap-4 px-6 lg:px-16 overflow-x-auto pb-4 snap-x snap-mandatory" style={{ scrollbarWidth: 'none' }}>
                    {gallery.map((img, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.07 }}
                            className="shrink-0 snap-start w-72 h-52 rounded-3xl overflow-hidden shadow-xl group relative"
                        >
                            <img src={img.src} alt={img.caption} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                                <span className="text-white text-xs font-black uppercase tracking-widest">{img.caption}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ─── NOTICES ─── */}
            <section className="py-32 bg-slate-50">
                <div className="container mx-auto px-6 lg:px-16">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-16">
                        <div>
                            <span className="text-indigo-600 font-black uppercase tracking-[0.4em] text-xs mb-3 block">Latest Updates</span>
                            <h2 className="text-4xl font-black tracking-tighter text-slate-900 flex items-center gap-4">
                                <Activity className="text-indigo-500" size={36} />
                                Notices &amp; Events
                            </h2>
                        </div>
                        <button className="flex items-center gap-2 px-6 py-3 border-2 border-slate-200 text-slate-600 font-black text-xs uppercase tracking-widest rounded-2xl hover:border-indigo-500 hover:text-indigo-600 transition-all">
                            View All <ChevronRight size={16} />
                        </button>
                    </div>
                    <div className="grid lg:grid-cols-3 gap-6">
                        {announcements.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                whileHover={{ y: -6 }}
                                className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/60 border border-slate-100 group cursor-pointer"
                            >
                                <div className="flex justify-between items-start mb-8">
                                    <div className={`${item.color} text-white px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest`}>
                                        {item.type}
                                    </div>
                                    <div className="text-right">
                                        <div className="text-2xl font-black text-indigo-600 leading-none">{item.date.split(' ')[0]}</div>
                                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.date.split(' ')[1]}</div>
                                    </div>
                                </div>
                                <h4 className="text-lg font-black text-slate-900 tracking-tight leading-snug group-hover:text-indigo-600 transition-colors mb-8">
                                    {item.title}
                                </h4>
                                <div className="flex justify-between items-center pt-6 border-t border-slate-100">
                                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Read More</span>
                                    <ArrowRight size={16} className="text-slate-300 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── FOOTER ─── */}
            <footer className="bg-slate-950 text-white pt-24 pb-10 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-40" />
                <div className="container mx-auto px-6 lg:px-16">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-20">
                        {/* Brand */}
                        <div className="md:col-span-5 space-y-8">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 bg-indigo-600 flex items-center justify-center rounded-2xl shadow-lg font-black text-white text-xl">LN</div>
                                <div>
                                    <h2 className="text-2xl font-black tracking-tighter leading-none">LNMI <span className="text-indigo-400">.</span></h2>
                                    <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 mt-0.5">Excellence Since 1973</p>
                                </div>
                            </div>
                            <p className="text-slate-500 leading-relaxed font-medium text-sm max-w-sm italic">
                                "The task of the educational institution is to shape not just careers, but characters that define the future of our nation."
                            </p>
                            <div className="flex gap-3">
                                {[Globe, MapPin, Phone, Mail].map((Icon, i) => (
                                    <div key={i} className="w-11 h-11 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 hover:text-indigo-400 hover:border-indigo-500/30 transition-all cursor-pointer">
                                        <Icon size={17} />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Links */}
                        <div className="md:col-span-7 grid grid-cols-2 lg:grid-cols-3 gap-10">
                            <div className="space-y-5 text-slate-500">
                                <h4 className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Academics</h4>
                                {["Course Curriculum", "Faculty Profiles", "Research Projects", "Library Catalog"].map(l => (
                                    <a key={l} href="#" className="block text-sm font-bold hover:text-indigo-400 transition-colors">{l}</a>
                                ))}
                            </div>
                            <div className="space-y-5 text-slate-500">
                                <h4 className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Administration</h4>
                                {["Admissions", "Academic Calendar", "Fee Structure", "Grievance Cell"].map(l => (
                                    <a key={l} href="#" className="block text-sm font-bold hover:text-indigo-400 transition-colors">{l}</a>
                                ))}
                            </div>
                            <div className="hidden lg:block space-y-5 text-slate-500">
                                <h4 className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Contact</h4>
                                <div className="text-sm font-bold leading-relaxed">1, Nehru Marg, Patna<br />Bihar — 800001</div>
                                <div className="text-indigo-400 font-bold text-sm">+91 612 252 2320</div>
                                <div className="text-slate-500 font-bold text-sm">info@lnmi.ac.in</div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-10 border-t border-slate-900">
                        <div className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em]">© 2024 L.N. Mishra Institute • Govt. of Bihar • All Rights Reserved</div>
                        <div className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] flex items-center gap-2">
                            Engineered by <span className="text-indigo-400">Saksham</span>
                        </div>
                    </div>
                </div>
            </footer>

            {/* ─── SCROLL TO TOP BUTTON ─── */}
            <AnimatePresence>
                {showScrollTop && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.5, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.5, y: 20 }}
                        onClick={scrollToTop}
                        className="fixed bottom-8 right-8 z-[90] p-4 bg-indigo-600 text-white rounded-full shadow-2xl shadow-indigo-500/30 hover:bg-indigo-500 transition-all hover:-translate-y-1 group"
                    >
                        <ArrowUp size={24} className="group-hover:animate-bounce" />
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    );
};
