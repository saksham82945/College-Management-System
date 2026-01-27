import React, { useEffect, useRef } from 'react';

export const ThreeJSHero: React.FC = () => {
    return (
        <div className="absolute inset-0 z-0 overflow-hidden bg-gray-900">
            {/* Animated Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 animate-gradient-slow opacity-100"></div>

            {/* CSS Stars/Particles Effect */}
            <div className="absolute inset-0 opacity-50">
                {/* Large Glow Orb 1 */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl animate-pulse-slow"></div>
                {/* Large Glow Orb 2 */}
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/30 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
                {/* Large Glow Orb 3 */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[100px] animate-pulse-slower"></div>
            </div>

            {/* Grid Overlay for Texture */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>

            {/* Overlay gradient to blend with content */}
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/40 to-transparent pointer-events-none"></div>

            {/* Inline Styles for specific animations if tailwind config missing */}
            <style>{`
                @keyframes pulse-slow {
                    0%, 100% { opacity: 0.3; transform: scale(1); }
                    50% { opacity: 0.6; transform: scale(1.1); }
                }
                @keyframes pulse-slower {
                    0%, 100% { opacity: 0.2; transform: translate(-50%, -50%) scale(1); }
                    50% { opacity: 0.5; transform: translate(-50%, -50%) scale(1.2); }
                }
                .animate-pulse-slow {
                    animation: pulse-slow 8s ease-in-out infinite;
                }
                .animate-pulse-slower {
                    animation: pulse-slower 12s ease-in-out infinite;
                }
                .delay-1000 {
                    animation-delay: 2s;
                }
            `}</style>
        </div>
    );
};
