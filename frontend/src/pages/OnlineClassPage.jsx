import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { PageHeader } from '@/components/PageHeader';
import { Video, ArrowLeft } from 'lucide-react';
import { useAuthStore } from '@/store/auth';

export const OnlineClassPage = () => {
    const { roomId } = useParams();
    const navigate = useNavigate();
    const { user } = useAuthStore();
    
    // Generate a default room ID if not provided
    const jitsiRoomId = roomId || `cms-class-${Math.random().toString(36).substring(7)}`;
    const jitsiDomain = 'meet.jit.si';
    
    const url = `https://${jitsiDomain}/${jitsiRoomId}#userInfo.displayName="${encodeURIComponent(user?.fullName || 'Student')}"`;

    return (
        <Layout>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 pb-12">
                <div className="flex items-center gap-4 pt-6">
                    <button 
                        onClick={() => navigate(-1)}
                        className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                    </button>
                    <PageHeader 
                        title="Online Class" 
                        subtitle={`Room: ${jitsiRoomId}`}
                        icon={Video}
                    />
                </div>

                <div className="w-full h-[75vh] rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 bg-black">
                    <iframe
                        src={url}
                        allow="camera; microphone; display-capture; fullscreen"
                        style={{ height: '100%', width: '100%', border: '0px' }}
                        title="Online Class Video Conference"
                    />
                </div>
            </div>
        </Layout>
    );
};
