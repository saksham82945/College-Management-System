import React, { useEffect, useRef } from 'react';
import { PublicHeader } from '@/components/PublicHeader';
import { ThreeJSHero } from '@/components/ThreeJSHero';
import { AcademicsSection } from '@/components/AcademicsSection';
import { AdmissionsSection } from '@/components/AdmissionsSection';
import { ArrowRight, Twitter, Facebook, Instagram, Linkedin } from 'lucide-react';
import gsap from 'gsap';

export const LandingPage: React.FC = () => {
    const heroContentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Hero Text Animation
        const ctx = gsap.context(() => {
            gsap.from('.hero-text', {
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                delay: 0.5,
                ease: "power3.out"
            });
        }, heroContentRef);
        return () => ctx.revert();
    }, []);

    return (
        <div className="min-h-screen font-sans bg-gray-50 flex flex-col">
            <PublicHeader />

            {/* Hero Section with Three.js Background */}
            <main className="flex-grow">
                <section className="relative h-screen flex items-center overflow-hidden">
                    {/* The 3D Canvas */}
                    <ThreeJSHero />

                    <div ref={heroContentRef} className="container mx-auto px-6 relative z-10 text-white">
                        <div className="max-w-3xl">
                            <span className="hero-text inline-block py-1 px-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-medium mb-6">
                                🚀 Admissions Open for 2024-25
                            </span>
                            <h1 className="hero-text text-6xl md:text-8xl font-black leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70">
                                Innovate. <br />
                                Lead. <br />
                                Succeed.
                            </h1>
                            <p className="hero-text text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed max-w-2xl">
                                Join a community of dreamers and doers. Experience world-class education at LNMI College.
                            </p>
                            <div className="hero-text flex flex-wrap gap-4">
                                <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-all hover:scale-105 shadow-xl shadow-purple-600/30 flex items-center gap-2">
                                    Start Application <ArrowRight size={20} />
                                </button>
                                <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-full font-bold text-lg transition-all hover:scale-105">
                                    Explore Campus
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Scroll Indicator */}
                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white animate-bounce">
                        <span className="text-xs uppercase tracking-widest opacity-70">Scroll Down</span>
                    </div>
                </section>

                <AcademicsSection />

                <AdmissionsSection />

                {/* Footer Preview / Call to Action */}
                <section className="py-20 bg-gradient-to-r from-purple-900 to-indigo-900 text-white text-center">
                    <div className="container mx-auto px-4">
                        <h2 className="text-4xl font-bold mb-6">Ready to Define Your Future?</h2>
                        <p className="text-xl text-purple-200 mb-10 max-w-2xl mx-auto">
                            Take the first step towards a career of impact and purpose.
                        </p>
                        <button className="bg-white text-purple-900 hover:bg-gray-100 px-10 py-4 rounded-full font-bold text-xl shadow-lg transition-transform hover:-translate-y-1">
                            Contact Admissions
                        </button>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-black text-white py-12 border-t border-white/10">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-4 gap-8 mb-12">
                        <div className="col-span-1 md:col-span-2">
                            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">LNMI CMS</h2>
                            <p className="text-gray-400 max-w-sm">
                                Creating future leaders through excellence in education, research, and innovation.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-lg font-bold mb-4 text-gray-200">Quick Links</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-purple-400 transition-colors">Academics</a></li>
                                <li><a href="#" className="hover:text-purple-400 transition-colors">Admissions</a></li>
                                <li><a href="#" className="hover:text-purple-400 transition-colors">Campus Life</a></li>
                                <li><a href="#" className="hover:text-purple-400 transition-colors">Research</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-lg font-bold mb-4 text-gray-200">Connect</h4>
                            <div className="flex gap-4">
                                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-purple-600 transition-colors"><Twitter size={18} /></a>
                                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-purple-600 transition-colors"><Facebook size={18} /></a>
                                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-purple-600 transition-colors"><Instagram size={18} /></a>
                                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-purple-600 transition-colors"><Linkedin size={18} /></a>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-white/10 pt-8 text-center text-gray-500 text-sm">
                        <p>© 2024 College Management System. All Rights Reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};
