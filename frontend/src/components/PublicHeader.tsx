import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export const PublicHeader: React.FC = () => {
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
        { label: 'Alumni', href: '#' },
    ];

    return (
        <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-6'}`}>
            <div className="container mx-auto px-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center cursor-pointer gap-3" onClick={() => navigate('/')}>
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-xl shadow-lg transition-colors
                            ${scrolled ? 'bg-purple-600 text-white' : 'bg-white text-purple-900'}`}>
                            GU
                        </div>
                        <div>
                            <h1 className={`text-xl font-bold leading-none transition-colors ${scrolled ? 'text-gray-900' : 'text-white'}`}>LNMI</h1>
                            <p className={`text-xs font-semibold tracking-wider transition-colors ${scrolled ? 'text-gray-500' : 'text-gray-200'}`}>COLLEGE</p>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        {navLinks.map(link => (
                            <a
                                key={link.label}
                                href={link.href}
                                className={`font-medium transition-colors hover:text-purple-500 ${scrolled ? 'text-gray-600' : 'text-gray-200'}`}
                            >
                                {link.label}
                            </a>
                        ))}
                        <button
                            onClick={() => navigate('/login')}
                            className={`px-6 py-2.5 rounded-full font-bold transition-all hover:scale-105 shadow-lg
                                ${scrolled
                                    ? 'bg-purple-600 text-white hover:bg-purple-700'
                                    : 'bg-white text-purple-900 hover:bg-gray-100'}`}
                        >
                            Login Portal
                        </button>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className={`md:hidden p-2 rounded-lg ${scrolled ? 'text-gray-800' : 'text-white'}`}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl p-4 flex flex-col gap-4 animate-fade-in">
                        {navLinks.map(link => (
                            <a key={link.label} href={link.href} className="text-gray-700 font-medium p-2 hover:bg-gray-50 rounded-lg">
                                {link.label}
                            </a>
                        ))}
                        <button
                            onClick={() => navigate('/login')}
                            className="w-full bg-purple-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-purple-700"
                        >
                            Access Portal
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
};

