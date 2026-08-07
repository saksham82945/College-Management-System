import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { PageHeader } from '@/components/PageHeader';
import { ShieldAlert, Video, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

export const ProctoredExamPage = () => {
    const { examId } = useParams();
    const navigate = useNavigate();
    const videoRef = useRef(null);
    const [warnings, setWarnings] = useState(0);
    const [status, setStatus] = useState('initializing');
    const maxWarnings = 3;

    useEffect(() => {
        // Initialize Webcam
        const startVideo = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    setStatus('recording');
                }
            } catch (err) {
                console.error("Error accessing webcam:", err);
                setStatus('error');
            }
        };

        startVideo();

        // Track Tab Visibility for Proctoring
        const handleVisibilityChange = () => {
            if (document.hidden) {
                setWarnings(prev => {
                    const newCount = prev + 1;
                    if (newCount >= maxWarnings) {
                        alert("Exam Terminated: You have exceeded the maximum number of warnings for leaving the tab.");
                        navigate('/exams'); // Redirect on failure
                    } else {
                        alert(`Warning ${newCount}/${maxWarnings}: Please do not switch tabs during the exam!`);
                    }
                    return newCount;
                });
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            // Stop webcam stream on unmount
            if (videoRef.current && videoRef.current.srcObject) {
                const tracks = videoRef.current.srcObject.getTracks();
                tracks.forEach(track => track.stop());
            }
        };
    }, [navigate]);

    return (
        <Layout>
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 pb-12">
                <PageHeader 
                    title="Proctored Exam Environment" 
                    subtitle={`Exam ID: ${examId || 'Sample Exam'}`}
                    icon={ShieldAlert}
                />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Exam Area */}
                    <div className="lg:col-span-2 glass-card p-8 rounded-[2.5rem] min-h-[60vh] flex flex-col">
                        <div className="flex justify-between items-center mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
                            <h2 className="text-2xl font-black text-slate-900 dark:text-white">Section 1: General Knowledge</h2>
                            <div className="flex items-center gap-2 text-primary font-bold bg-primary/10 px-4 py-2 rounded-xl">
                                <Clock size={18} /> 45:00 Remaining
                            </div>
                        </div>

                        <div className="flex-1 space-y-8">
                            <div className="space-y-4">
                                <p className="text-lg font-bold text-slate-700 dark:text-slate-300">1. What is the main design pattern used in React for managing component states?</p>
                                <div className="space-y-2">
                                    {['MVC', 'Hooks', 'Observer', 'Singleton'].map((opt, i) => (
                                        <label key={i} className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                            <input type="radio" name="q1" className="w-4 h-4 text-primary" />
                                            <span className="text-sm font-medium">{opt}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 flex justify-end">
                            <button className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-primary-dark transition-colors shadow-lg shadow-primary/30">
                                Submit Exam
                            </button>
                        </div>
                    </div>

                    {/* Proctoring Sidebar */}
                    <div className="space-y-6">
                        <div className="glass-card p-6 rounded-3xl">
                            <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
                                <Video size={16} /> Live Proctoring
                            </h3>
                            <div className="relative rounded-2xl overflow-hidden bg-slate-900 aspect-video shadow-inner">
                                <video 
                                    ref={videoRef} 
                                    autoPlay 
                                    playsInline 
                                    muted 
                                    className="w-full h-full object-cover"
                                />
                                {status === 'recording' && (
                                    <div className="absolute top-3 right-3 flex items-center gap-2 bg-black/50 backdrop-blur px-3 py-1.5 rounded-lg border border-white/10">
                                        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                                        <span className="text-[10px] font-bold text-white uppercase tracking-wider">Recording</span>
                                    </div>
                                )}
                                {status === 'error' && (
                                    <div className="absolute inset-0 flex items-center justify-center p-4 text-center">
                                        <div className="bg-red-500/20 text-red-500 p-4 rounded-xl backdrop-blur text-xs font-bold">
                                            Camera access denied or unavailable. Exam cannot proceed.
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="glass-card p-6 rounded-3xl">
                            <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
                                <AlertTriangle size={16} /> Integrity Status
                            </h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Tab Switches</span>
                                    <span className={`px-3 py-1 rounded-full text-xs font-black ${
                                        warnings === 0 ? 'bg-emerald-100 text-emerald-700' : 
                                        warnings < maxWarnings ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                                    }`}>
                                        {warnings} / {maxWarnings}
                                    </span>
                                </div>
                                <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
                                    <ul className="text-xs text-slate-500 space-y-2 list-disc list-inside">
                                        <li>Do not switch tabs</li>
                                        <li>Keep face visible</li>
                                        <li>No multiple people in frame</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};
