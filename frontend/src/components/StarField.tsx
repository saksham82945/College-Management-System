import React, { useEffect, useRef } from 'react';

export const StarField: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let stars: { x: number; y: number; z: number; size: number }[] = [];

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const initStars = () => {
            stars = [];
            const numStars = 800; // Count
            for (let i = 0; i < numStars; i++) {
                stars.push({
                    x: Math.random() * canvas.width - canvas.width / 2,
                    y: Math.random() * canvas.height - canvas.height / 2,
                    z: Math.random() * 2000, // Depth
                    size: Math.random() * 2,
                });
            }
        };

        const draw = () => {
            ctx.fillStyle = '#0F172A'; // Dark bg clearing
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const cx = canvas.width / 2;
            const cy = canvas.height / 2;

            stars.forEach((star) => {
                // Move stars towards viewer
                star.z -= 4; // Speed
                if (star.z <= 0) {
                    star.z = 2000;
                    star.x = Math.random() * canvas.width - canvas.width / 2;
                    star.y = Math.random() * canvas.height - canvas.height / 2;
                }

                // 3D Projection
                const scale = 500 / star.z;
                const x2d = cx + star.x * scale;
                const y2d = cy + star.y * scale;
                const size = Math.max(0.2, star.size * scale);

                // Draw Star
                const alpha = Math.min(1, (2000 - star.z) / 1000);

                // Glow effect for "great" look
                ctx.beginPath();
                ctx.arc(x2d, y2d, size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
                ctx.fill();

                if (size > 1.5) {
                    ctx.shadowBlur = 10;
                    ctx.shadowColor = 'white';
                } else {
                    ctx.shadowBlur = 0;
                }
            });

            animationFrameId = requestAnimationFrame(draw);
        };

        window.addEventListener('resize', resize);
        resize();
        initStars();
        draw();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-0 pointer-events-none"
        />
    );
};
