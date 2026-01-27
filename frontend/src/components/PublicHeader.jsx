import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X, Phone, Mail, MapPin } from 'lucide-react';

export const PublicHeader = () => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { label: 'About Us', href: '#about' },
        { label: 'Academics', href: '#academics' },
        { label: 'Admissions', href: '#admissions' },
        { label: 'Research', href: '#research' },
        { label: 'Campus Life', href: '#campus' },
        { label: 'Placements', href: '#placements' },
    ];

    return (
        <header className="fixed w-full top-0 z-50 bg-white shadow-md">
            {/* Top Info Bar */}
            <div style={{ backgroundColor: 'var(--college-primary)' }} className="text-white text-sm py-2">
                <div className="container mx-auto px-6">
                    <div className="flex flex-wrap justify-between items-center gap-4">
                        <div className="flex flex-wrap items-center gap-6">
                            <span className="flex items-center gap-2">
                                <Phone size={14} />
                                <span>+91 123-456-7890</span>
                            </span>
                            <span className="flex items-center gap-2">
                                <Mail size={14} />
                                <span>info@lnmi.ac.in</span>
                            </span>
                            <span className="hidden lg:flex items-center gap-2">
                                <MapPin size={14} />
                                <span>Nehru Marg, Patna - 800001</span>
                            </span>
                        </div>
                        <button
                            onClick={() => navigate('/login')}
                            className="bg-white text-blue-900 px-4 py-1 rounded-full text-xs font-semibold hover:bg-blue-50 transition-all"
                        >
                            Admin Portal
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Header */}
            <div className="bg-white border-b">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        {/* College Logo & Name */}
                        <div className="flex items-center gap-4 cursor-pointer" onClick={() => navigate('/')}>
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shadow-lg">
                                <span className="text-white font-bold text-2xl">LN</span>
                            </div>
                            <div>
                                <h1 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight">
                                    L. N. Mishra Institute
                                </h1>
                                <p className="text-xs md:text-sm text-gray-600 font-medium">
                                    of Economic Development &amp; Social Change, Patna
                                </p>
                                <p className="text-xs text-blue-700 font-semibold">
                                    An Autonomous Institute under Govt. of Bihar
                                </p>
                            </div>
                        </div>

                        {/* Desktop Navigation */}
                        <button
                            className="hidden lg:block bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-2.5 rounded-md font-semibold hover:shadow-lg transition-all"
                            onClick={() => navigate('/login')}
                        >
                            Login Portal
                        </button>

                        {/* Mobile Menu Button */}
                        <button
                            className="lg:hidden p-2 rounded-lg text-gray-800 hover:bg-gray-100"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Navigation Bar */}
            <nav style={{ backgroundColor: 'var(--college-primary)' }} className="hidden lg:block">
                <div className="container mx-auto px-6">
                    <div className="flex items-center justify-center gap-1">
                        {navLinks.map((link, index) => (
                            <a
                                key={link.label}
                                href={link.href}
                                className="text-white px-5 py-3.5 font-medium text-sm hover:bg-blue-700 transition-colors relative group"
                            >
                                {link.label}
                                <span className="absolute bottom-0 left-0 w-0 h-1 bg-orange-400 group-hover:w-full transition-all duration-300"></span>
                            </a>
                        ))}
                    </div>
                </div>
            </nav>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-xl animate-fade-in">
                    <div className="container mx-auto px-6 py-4 flex flex-col gap-2">
                        {navLinks.map(link => (
                            <a
                                key={link.label}
                                href={link.href}
                                className="text-gray-700 font-medium px-4 py-3 hover:bg-blue-50 rounded-lg transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {link.label}
                            </a>
                        ))}
                        <button
                            onClick={() => { navigate('/login'); setIsMenuOpen(false); }}
                            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 mt-2"
                        >
                            Login Portal
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
};
