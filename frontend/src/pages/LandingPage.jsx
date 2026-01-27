import React, { useEffect, useRef, useState } from 'react';
import { PublicHeader } from '@/components/PublicHeader';
import { useNavigate } from 'react-router-dom';
import {
    ArrowRight, BookOpen, Users, Award, Building2, TrendingUp, Calendar,
    Sparkles, GraduationCap, FlaskConical, Briefcase, Globe, ChevronRight,
    CheckCircle, MapPin, Library, Trophy, Heart, Music, PenTool, Microscope,
    Coffee, Home, BookMarked, UserCheck
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const LandingPage = () => {
    const navigate = useNavigate();
    const [currentSlide, setCurrentSlide] = useState(0);
    const statsRef = useRef(null);

    const heroSlides = [
        {
            title: "Welcome to L.N. Mishra Institute",
            subtitle: "Creating Leaders for Tomorrow",
            gradient: "from-blue-400 via-purple-400 to-pink-400"
        },
        {
            title: "Excellence in Education",
            subtitle: "Ranked Amongst Top Institutions",
            gradient: "from-cyan-400 via-blue-400 to-purple-400"
        },
        {
            title: "Research & Innovation",
            subtitle: "Advancing Knowledge, Transforming Lives",
            gradient: "from-green-400 via-teal-400 to-blue-400"
        }
    ];

    const announcements = [
        { id: 1, title: "Student Registration Form in Admission Section of Admission Year 2024-25", date: "Feb 05, 2024", isNew: true },
        { id: 2, title: "Special Examination Time Schedule", date: "Feb 04, 2024", isNew: true },
        { id: 3, title: "Class Timetable for 1st Semester MBA/Mcom-A and MBA-LSCM", date: "Feb 03, 2024", isNew: false },
        { id: 4, title: "Urgent Notice for Registration Form Submission", date: "Feb 01, 2024", isNew: false },
    ];

    const stats = [
        { icon: Users, label: "Students", value: 5000, suffix: "+", color: "text-blue-500" },
        { icon: BookOpen, label: "Faculty Members", value: 250, suffix: "+", color: "text-purple-500" },
        { icon: Award, label: "Programs", value: 45, suffix: "+", color: "text-green-500" },
        { icon: Building2, label: "Years of Excellence", value: 30, suffix: "+", color: "text-orange-500" }
    ];

    const features = [
        {
            icon: GraduationCap,
            title: "Academic Excellence",
            description: "World-class curriculum designed to meet global standards",
            gradient: "from-blue-400 to-blue-500"
        },
        {
            icon: FlaskConical,
            title: "Research & Innovation",
            description: "State-of-the-art labs and research facilities",
            gradient: "from-purple-400 to-purple-500"
        },
        {
            icon: Briefcase,
            title: "Placement Support",
            description: "95% placement record with top companies",
            gradient: "from-green-400 to-green-500"
        },
        {
            icon: Globe,
            title: "Global Exposure",
            description: "International collaborations and exchange programs",
            gradient: "from-orange-400 to-orange-500"
        }
    ];

    const campusLife = [
        { icon: Music, title: "Cultural Events", description: "Annual fests and cultural programs" },
        { icon: Trophy, title: "Sports Facilities", description: "State-of-the-art sports complex" },
        { icon: Library, title: "Modern Library", description: "Digital and physical resources" },
        { icon: Coffee, title: "Campus Amenities", description: "Cafeteria, gym, and recreation" }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            stats.forEach((stat, index) => {
                gsap.to(`.stat-${index}`, {
                    innerText: stat.value,
                    duration: 2,
                    snap: { innerText: 1 },
                    scrollTrigger: {
                        trigger: statsRef.current,
                        start: "top 80%"
                    }
                });
            });

            gsap.utils.toArray('.animate-on-scroll').forEach((element) => {
                gsap.from(element, {
                    y: 50,
                    opacity: 0,
                    duration: 0.8,
                    scrollTrigger: {
                        trigger: element,
                        start: "top 85%",
                        toggleActions: "play none none none"
                    }
                });
            });
        }, statsRef);

        return () => ctx.revert();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <PublicHeader />

            {/* Hero Section with Animated Gradient Slider */}
            <section className="relative h-[600px] mt-[200px] lg:mt-[180px] overflow-hidden">
                {heroSlides.map((slide, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                            }`}
                    >
                        <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient} animate-pulse`}></div>
                        <div className="absolute inset-0 bg-black/20"></div>
                        <div className="container mx-auto px-6 h-full flex items-center relative z-10">
                            <div className="text-white max-w-3xl animate-slide-up">
                                <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight drop-shadow-lg">
                                    {slide.title}
                                </h1>
                                <p className="text-xl md:text-2xl mb-8 text-white/90 drop-shadow">
                                    {slide.subtitle}
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl transition-all transform hover:scale-105 flex items-center gap-2 group">
                                        Start Application
                                        <ArrowRight className="group-hover:translate-x-2 transition-transform" size={20} />
                                    </button>
                                    <button className="bg-white/20 backdrop-blur-md border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/30 transition-all transform hover:scale-105">
                                        Explore Campus
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Slide Indicators */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
                    {heroSlides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`h-3 rounded-full transition-all transform hover:scale-110 ${index === currentSlide ? 'w-12 bg-white shadow-lg' : 'w-3 bg-white/60 hover:bg-white/80'
                                }`}
                        />
                    ))}
                </div>
            </section>

            {/* About Us Section */}
            <section id="about" className="py-20 bg-gradient-to-br from-white via-blue-50 to-purple-50">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16 animate-on-scroll">
                        <h2 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                            About LNMI College
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            Established with a vision to provide world-class education, LNMI has been shaping brilliant minds for over 30 years.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="animate-on-scroll">
                            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl h-96 flex items-center justify-center shadow-2xl transform hover:scale-105 transition-all">
                                <div className="text-white text-center p-8">
                                    <Building2 size={80} className="mx-auto mb-4 animate-bounce" />
                                    <h3 className="text-3xl font-bold">30+ Years</h3>
                                    <p className="text-xl">of Educational Excellence</p>
                                </div>
                            </div>
                        </div>
                        <div className="animate-on-scroll space-y-6">
                            <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all">
                                <CheckCircle className="text-green-500 flex-shrink-0" size={28} />
                                <div>
                                    <h4 className="font-bold text-lg text-gray-900 mb-1">Autonomous Institution</h4>
                                    <p className="text-gray-600">Recognized by Government of Bihar and affiliated with prestigious universities</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all">
                                <CheckCircle className="text-blue-500 flex-shrink-0" size={28} />
                                <div>
                                    <h4 className="font-bold text-lg text-gray-900 mb-1">AICTE Approved</h4>
                                    <p className="text-gray-600">All programs approved by AICTE and Govt. of India</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all">
                                <CheckCircle className="text-purple-500 flex-shrink-0" size={28} />
                                <div>
                                    <h4 className="font-bold text-lg text-gray-900 mb-1">Top Rankings</h4>
                                    <p className="text-gray-600">Ranked among top institutions in Eastern India</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Announcements Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 animate-on-scroll">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-3">
                                    <Sparkles className="text-yellow-500" />
                                    Latest Updates / Notices
                                </h2>
                                <a href="#" className="text-blue-600 hover:text-purple-600 font-semibold flex items-center gap-1 transition-colors">
                                    View All <ChevronRight size={18} />
                                </a>
                            </div>
                            <div className="space-y-3">
                                {announcements.map((announcement) => (
                                    <div
                                        key={announcement.id}
                                        className="flex items-start gap-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 rounded-xl transition-all cursor-pointer group border-l-4 border-blue-500"
                                    >
                                        <div className="flex-shrink-0">
                                            {announcement.isNew && (
                                                <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse shadow-lg">
                                                    NEW
                                                </span>
                                            )}
                                            {!announcement.isNew && (
                                                <Calendar className="text-blue-400 mt-1" size={20} />
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-gray-800 group-hover:text-blue-700 transition-colors">
                                                {announcement.title}
                                            </h3>
                                            <p className="text-sm text-gray-500 mt-1">{announcement.date}</p>
                                        </div>
                                        <ChevronRight className="text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" size={20} />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="animate-on-scroll">
                            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">Quick Links</h3>
                            <div className="space-y-3">
                                {[
                                    { name: 'Online Admission Portal', gradient: 'from-blue-500 to-blue-600' },
                                    { name: 'Academic Calendar', gradient: 'from-purple-500 to-purple-600' },
                                    { name: 'Examination Schedule', gradient: 'from-green-500 to-green-600' },
                                    { name: 'Scholarship Information', gradient: 'from-orange-500 to-orange-600' },
                                    { name: 'Student Login', gradient: 'from-pink-500 to-pink-600' },
                                    { name: 'Faculty Portal', gradient: 'from-cyan-500 to-cyan-600' }
                                ].map((link, index) => (
                                    <a
                                        key={index}
                                        href="#"
                                        className={`block p-4 bg-gradient-to-r ${link.gradient} text-white rounded-xl hover:shadow-xl transition-all transform hover:scale-105 group`}
                                    >
                                        <span className="flex items-center justify-between">
                                            <span className="font-medium">{link.name}</span>
                                            <ChevronRight className="group-hover:translate-x-2 transition-transform" size={20} />
                                        </span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Statistics Section */}
            <section ref={statsRef} className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-12 animate-on-scroll">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white drop-shadow-lg">Our Achievements</h2>
                        <p className="text-xl text-white/90">Excellence in Numbers</p>
                    </div>
                    <div className="grid md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => {
                            const Icon = stat.icon;
                            return (
                                <div
                                    key={index}
                                    className="text-center p-8 bg-white/10 backdrop-blur-lg rounded-2xl hover:bg-white/20 transition-all transform hover:scale-110 animate-on-scroll shadow-2xl"
                                >
                                    <Icon size={56} className="mx-auto mb-4 text-yellow-300 drop-shadow-lg" />
                                    <div className="text-5xl font-bold mb-2 text-white">
                                        <span className={`stat-${index}`}>0</span>
                                        <span>{stat.suffix}</span>
                                    </div>
                                    <div className="text-lg text-white/90 font-medium">{stat.label}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Admissions Section */}
            <section id="admissions" className="py-20 bg-gradient-to-br from-orange-50 via-white to-pink-50">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16 animate-on-scroll">
                        <h2 className="text-5xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent mb-4">
                            Admissions 2024-25
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Join our prestigious institution and start your journey towards excellence
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 mb-12">
                        {[
                            {
                                step: "1",
                                title: "Apply Online",
                                desc: "Fill the application form with your details",
                                icon: PenTool,
                                color: "from-blue-500 to-blue-600"
                            },
                            {
                                step: "2",
                                title: "Submit Documents",
                                desc: "Upload required certificates and documents",
                                icon: BookMarked,
                                color: "from-purple-500 to-purple-600"
                            },
                            {
                                step: "3",
                                title: "Get Admitted",
                                desc: "Complete the admission process and join us",
                                icon: UserCheck,
                                color: "from-green-500 to-green-600"
                            }
                        ].map((step, index) => {
                            const Icon = step.icon;
                            return (
                                <div key={index} className="animate-on-scroll">
                                    <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
                                        <div className={`w-20 h-20 bg-gradient-to-br ${step.color} rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                                            <Icon size={36} className="text-white" />
                                        </div>
                                        <div className={`text-4xl font-bold bg-gradient-to-r ${step.color} bg-clip-text text-transparent mb-3 text-center`}>
                                            Step {step.step}
                                        </div>
                                        <h3 className="text-xl font-bold text-center text-gray-900 mb-3">{step.title}</h3>
                                        <p className="text-gray-600 text-center">{step.desc}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="text-center animate-on-scroll">
                        <button className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-12 py-5 rounded-full font-bold text-xl hover:shadow-2xl transition-all transform hover:scale-110">
                            Apply Now for 2024-25
                        </button>
                    </div>
                </div>
            </section>

            {/* Campus Life Section */}
            <section id="campus" className="py-20 bg-gradient-to-br from-green-50 via-white to-teal-50">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16 animate-on-scroll">
                        <h2 className="text-5xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent mb-4">
                            Campus Life
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Experience vibrant campus life with diverse activities and facilities
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {campusLife.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <div key={index} className="animate-on-scroll">
                                    <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 text-center h-full">
                                        <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <Icon size={32} className="text-white" />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                                        <p className="text-gray-600">{item.description}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Research Section */}
            <section id="research" className="py-20 bg-gradient-to-br from-purple-50 via-white to-indigo-50">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16 animate-on-scroll">
                        <h2 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
                            Research & Innovation
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Advancing knowledge through cutting-edge research and innovation
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div className="animate-on-scroll">
                            <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-3xl h-96 flex items-center justify-center shadow-2xl transform hover:scale-105 transition-all">
                                <div className="text-white text-center p-8">
                                    <Microscope size={80} className="mx-auto mb-4 animate-pulse" />
                                    <h3 className="text-3xl font-bold">50+ Research Projects</h3>
                                    <p className="text-xl mt-2">Ongoing Across Departments</p>
                                </div>
                            </div>
                        </div>
                        <div className="animate-on-scroll space-y-4">
                            {[
                                { title: "State-of-the-Art Labs", desc: "Equipped with latest technology and equipment" },
                                { title: "Industry Collaborations", desc: "Partnerships with leading companies and institutions" },
                                { title: "Research Publications", desc: "Published in top national and international journals" },
                                { title: "Innovation Hub", desc: "Dedicated space for student startups and innovations" }
                            ].map((item, index) => (
                                <div key={index} className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all border-l-4 border-purple-500">
                                    <FlaskConical className="text-purple-500 flex-shrink-0 mt-1" size={28} />
                                    <div>
                                        <h4 className="font-bold text-lg text-gray-900 mb-1">{item.title}</h4>
                                        <p className="text-gray-600">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16 animate-on-scroll">
                        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                            Why Choose LNMI?
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Discover what makes us one of the leading institutions in the country
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <div
                                    key={index}
                                    className="group bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all cursor-pointer animate-on-scroll transform hover:scale-105"
                                >
                                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                                        <Icon size={32} className="text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-20 bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600">
                <div className="container mx-auto px-6 text-center animate-on-scroll">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white drop-shadow-lg">
                        Ready to Shape Your Future?
                    </h2>
                    <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-3xl mx-auto">
                        Join thousands of successful alumni who started their journey at LNMI College
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <button className="bg-white text-purple-600 px-10 py-5 rounded-full font-bold text-xl hover:shadow-2xl transition-all transform hover:scale-110">
                            Apply Now
                        </button>
                        <button className="bg-white/20 backdrop-blur-md border-2 border-white text-white px-10 py-5 rounded-full font-bold text-xl hover:bg-white/30 transition-all transform hover:scale-110">
                            Contact Admissions
                        </button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-gray-300 py-12">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-4 gap-8 mb-8">
                        <div className="md:col-span-2">
                            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
                                L.N. Mishra Institute
                            </h3>
                            <p className="text-gray-400 mb-4 leading-relaxed">
                                Creating future leaders through excellence in education, research, and innovation.
                                An Autonomous Institute under Government of Bihar.
                            </p>
                            <div className="flex gap-4">
                                {['F', 'T', 'L', 'I'].map((social, index) => (
                                    <a
                                        key={social}
                                        href="#"
                                        className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 flex items-center justify-center transition-all transform hover:scale-110 shadow-lg"
                                    >
                                        <span className="text-white font-bold">{social}</span>
                                    </a>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h4 className="text-lg font-bold text-white mb-4">Quick Links</h4>
                            <ul className="space-y-2">
                                {['About Us', 'Academics', 'Admissions', 'Research', 'Campus Life'].map((link) => (
                                    <li key={link}>
                                        <a href={`#${link.toLowerCase().replace(' ', '')}`} className="hover:text-blue-400 transition-colors flex items-center gap-2">
                                            <ChevronRight size={16} />
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-lg font-bold text-white mb-4">Contact</h4>
                            <ul className="space-y-3 text-sm">
                                <li className="flex items-start gap-2">
                                    <MapPin size={16} className="mt-1 text-blue-400" />
                                    <span>1, Nehru Marg<br />Patna - 800001, Bihar</span>
                                </li>
                                <li>Phone: +91 123-456-7890</li>
                                <li>Email: info@lnmi.ac.in</li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-700 pt-8 text-center text-sm text-gray-500">
                        <p>© 2024 L.N. Mishra Institute. All Rights Reserved.</p>
                        <p className="mt-2 flex items-center justify-center gap-2">
                            Made with <Heart className="inline text-red-500 animate-pulse" size={14} /> by LNMI Team
                        </p>
                        <p className="mt-2 text-xs text-gray-600">
                            Developed by <span className="text-blue-400 font-semibold">Saksham</span>
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};
