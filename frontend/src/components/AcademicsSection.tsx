import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BookOpen, Award, Users, Globe } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const AcademicCard = ({ icon: Icon, title, description, delay }: { icon: any, title: string, description: string, delay: number }) => (
    <div className="academic-card bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow transform hover:-translate-y-1" data-delay={delay}>
        <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mb-6 text-purple-600">
            <Icon size={28} />
        </div>
        <h3 className="text-xl font-bold mb-3 text-gray-800">{title}</h3>
        <p className="text-gray-600 leading-relaxed">
            {description}
        </p>
    </div>
);

export const AcademicsSection: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.academic-card', {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "power3.out"
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-24 bg-gray-50 relative z-20">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-purple-600 font-semibold tracking-wider uppercase text-sm">World Class Education</span>
                    <h2 className="text-4xl font-bold mt-2 mb-4 text-gray-900">Academic Excellence</h2>
                    <p className="text-lg text-gray-600">
                        Our rigorous curriculum and innovative teaching methods prepare students for leadership in a rapidly changing world.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <AcademicCard
                        icon={BookOpen}
                        title="Diverse Programs"
                        description="Choose from over 50 undergraduate and graduate programs across various disciplines."
                        delay={0}
                    />
                    <AcademicCard
                        icon={Globe}
                        title="Global Exposure"
                        description="International partnerships and exchange programs to broaden your horizons."
                        delay={0.1}
                    />
                    <AcademicCard
                        icon={Users}
                        title="Expert Faculty"
                        description="Learn from distinguished professors and industry leaders dedicated to your success."
                        delay={0.2}
                    />
                    <AcademicCard
                        icon={Award}
                        title="Research & Innovation"
                        description="State-of-the-art labs and research centers fostering a culture of discovery."
                        delay={0.3}
                    />
                </div>
            </div>
        </section>
    );
};
