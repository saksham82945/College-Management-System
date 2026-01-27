import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle, Calendar } from 'lucide-react';
gsap.registerPlugin(ScrollTrigger);
export const AdmissionsSection = () => {
    const sectionRef = useRef(null);
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.admission-step', {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 75%',
                },
                x: -30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.3,
                ease: "power2.out"
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);
    return (<section ref={sectionRef} className="py-24 bg-white relative z-20 overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    {/* Left Content */}
                    <div className="lg:w-1/2">
                        <span className="text-purple-600 font-semibold tracking-wider uppercase text-sm">Join Us</span>
                        <h2 className="text-4xl font-bold mt-2 mb-6 text-gray-900">Seamless Admission Process</h2>
                        <p className="text-lg text-gray-600 mb-8">
                            We've streamlined our application process to make your journey to our university as smooth as possible.
                        </p>

                        <div className="space-y-8">
                            <div className="admission-step flex gap-4">
                                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl">1</div>
                                <div>
                                    <h4 className="text-xl font-bold text-gray-800 mb-2">Online Application</h4>
                                    <p className="text-gray-600">Fill out our comprehensive online application form with your personal and academic details.</p>
                                </div>
                            </div>
                            <div className="admission-step flex gap-4">
                                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold text-xl">2</div>
                                <div>
                                    <h4 className="text-xl font-bold text-gray-800 mb-2">Document Submission</h4>
                                    <p className="text-gray-600">Upload necessary documents including transcripts, identification, and portfolios if applicable.</p>
                                </div>
                            </div>
                            <div className="admission-step flex gap-4">
                                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold text-xl">3</div>
                                <div>
                                    <h4 className="text-xl font-bold text-gray-800 mb-2">Interview & Selection</h4>
                                    <p className="text-gray-600">Shortlisted candidates will be invited for a personal interview, followed by the final selection offer.</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-10">
                            <button className="bg-gray-900 text-white px-8 py-4 rounded-full font-bold hover:bg-gray-800 transition-colors shadow-lg">
                                Apply Now
                            </button>
                        </div>
                    </div>

                    {/* Right Visual */}
                    <div className="lg:w-1/2 relative">
                        <div className="absolute -inset-4 bg-gradient-to-tr from-purple-200 to-blue-200 rounded-3xl blur-2xl opacity-50 -z-10"></div>
                        <div className="bg-gray-900 rounded-3xl p-8 relative overflow-hidden shadow-2xl">
                            {/* Abstract Decorative Elements */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

                            <h3 className="text-2xl font-bold text-white mb-6">Important Dates</h3>

                            <div className="space-y-4">
                                <div className="flex items-center gap-4 bg-white/10 p-4 rounded-xl border border-white/10 backdrop-blur-sm">
                                    <Calendar className="text-purple-400" size={24}/>
                                    <div>
                                        <p className="text-purple-200 text-sm">Early Decision Deadline</p>
                                        <p className="text-white font-bold">November 15, 2023</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 bg-white/10 p-4 rounded-xl border border-white/10 backdrop-blur-sm">
                                    <Calendar className="text-blue-400" size={24}/>
                                    <div>
                                        <p className="text-blue-200 text-sm">Regular Decision Deadline</p>
                                        <p className="text-white font-bold">January 15, 2024</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 pt-8 border-t border-white/10">
                                <div className="flex items-center gap-3 text-green-400">
                                    <CheckCircle size={20}/>
                                    <span className="font-medium">Applications are currently open</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>);
};
