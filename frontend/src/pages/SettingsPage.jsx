import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { useAuthStore } from '@/store/auth';
import { useThemeStore } from '@/store/theme';
import { Save, Bell, Moon, Sun, Globe, Smartphone, Mail } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '@/services/api';
export const SettingsPage = () => {
    const { user, setUser } = useAuthStore();
    const { isDarkMode, toggleTheme } = useThemeStore();
    
    // Get preferences from user state, with fallbacks
    const prefs = user?.preferences || {};
    const [emailNotifications, setEmailNotifications] = useState(prefs.emailNotifications !== false);
    const [smsNotifications, setSmsNotifications] = useState(prefs.smsNotifications === true);
    
    const [profile, setProfile] = useState({
        fullName: user?.fullName || '',
        email: user?.email || '',
        phone: user?.phone || ''
    });

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const response = await api.put('/auth/preferences', {
                phone: profile.phone,
                emailNotifications,
                smsNotifications
            });
            
            // Update auth store with new data
            if (response.data?.success && response.data?.data) {
                const updatedUser = { ...user, phone: response.data.data.phone, preferences: response.data.data.preferences };
                setUser(updatedUser);
            }
            
            toast.success('Settings saved successfully');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to save settings');
        }
    };
    return (<Layout>
            <div className="max-w-4xl mx-auto">
                <h1 className={`text-2xl font-bold mb-6 tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Settings</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Sidebar / Navigation (Visual) */}
                    <div className="space-y-2">
                        <div className={`p-4 rounded-xl font-black text-[10px] uppercase tracking-widest cursor-pointer ${isDarkMode ? 'bg-gray-800 text-primary-light' : 'bg-indigo-50 text-primary'}`}>
                            Profile
                        </div>
                        <div className={`p-4 rounded-xl font-black text-[10px] uppercase tracking-widest cursor-pointer text-gray-500 hover:bg-gray-50 ${isDarkMode ? 'hover:bg-gray-800 hover:text-gray-300' : ''}`}>
                            Security
                        </div>
                        <div className={`p-4 rounded-xl font-black text-[10px] uppercase tracking-widest cursor-pointer text-gray-500 hover:bg-gray-50 ${isDarkMode ? 'hover:bg-gray-800 hover:text-gray-300' : ''}`}>
                            Notifications
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="md:col-span-2 space-y-6">

                        {/* Profile Section */}
                        <div className={`p-8 rounded-2xl border shadow-sm ${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100'}`}>
                            <h2 className={`text-lg font-black tracking-tight mb-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Profile Details</h2>
                            <form onSubmit={handleSave} className="space-y-6">
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Full Name</label>
                                        <input value={profile.fullName} onChange={e => setProfile({ ...profile, fullName: e.target.value })} className={`w-full p-2.5 rounded-lg border focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'border-gray-200'}`}/>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Phone</label>
                                        <input value={profile.phone} onChange={e => setProfile({ ...profile, phone: e.target.value })} className={`w-full p-2.5 rounded-lg border focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'border-gray-200'}`}/>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Email Address</label>
                                    <input disabled value={profile.email} // Fixed: was user?.email
                                        className={`w-full p-2.5 rounded-lg border opacity-60 cursor-not-allowed ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-400' : 'bg-gray-50 border-gray-200'}`}/>
                                    <p className="text-[10px] font-bold text-gray-400 mt-2 uppercase tracking-wide italic">Contact administration to update email address</p>
                                </div>

                                <div className="pt-4 flex justify-end">
                                    <button type="submit" className="flex items-center gap-2 px-8 py-3 bg-primary text-white text-xs font-black uppercase tracking-widest rounded-xl hover:bg-primary-dark transition-all active:scale-95 shadow-lg shadow-primary/20">
                                        <Save size={16}/> Save Changes
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Preferences Section */}
                        <div className={`p-8 rounded-2xl border shadow-sm ${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100'}`}>
                            <h2 className={`text-lg font-black tracking-tight mb-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Preferences</h2>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className={`p-2.5 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-indigo-50 text-indigo-600'}`}>
                                            {isDarkMode ? <Moon size={20}/> : <Sun size={20}/>}
                                        </div>
                                        <div>
                                            <p className={`text-sm font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Interface Theme</p>
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Dark mode toggle</p>
                                        </div>
                                    </div>
                                    <button onClick={toggleTheme} className={`w-12 h-6 rounded-full p-1 transition-colors ${isDarkMode ? 'bg-primary' : 'bg-gray-200'}`}>
                                        <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${isDarkMode ? 'translate-x-6' : 'translate-x-0'}`}/>
                                    </button>
                                </div>

                                <div className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className={`p-2.5 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-emerald-50 text-emerald-600'}`}>
                                            <Mail size={20}/>
                                        </div>
                                        <div>
                                            <p className={`text-sm font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Email Notifications</p>
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Receive institutional updates via Email</p>
                                        </div>
                                    </div>
                                    <button onClick={() => setEmailNotifications(!emailNotifications)} className={`w-12 h-6 rounded-full p-1 transition-colors ${emailNotifications ? 'bg-emerald-500' : 'bg-gray-200'}`}>
                                        <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${emailNotifications ? 'translate-x-6' : 'translate-x-0'}`}/>
                                    </button>
                                </div>

                                <div className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className={`p-2.5 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-blue-50 text-blue-600'}`}>
                                            <Smartphone size={20}/>
                                        </div>
                                        <div>
                                            <p className={`text-sm font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>SMS Notifications</p>
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Receive important alerts via SMS</p>
                                        </div>
                                    </div>
                                    <button onClick={() => setSmsNotifications(!smsNotifications)} className={`w-12 h-6 rounded-full p-1 transition-colors ${smsNotifications ? 'bg-blue-500' : 'bg-gray-200'}`}>
                                        <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${smsNotifications ? 'translate-x-6' : 'translate-x-0'}`}/>
                                    </button>
                                </div>

                                <div className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className={`p-2.5 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-amber-50 text-amber-600'}`}>
                                            <Globe size={20}/>
                                        </div>
                                        <div>
                                            <p className={`text-sm font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Language</p>
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">System display language</p>
                                        </div>
                                    </div>
                                    <select className={`text-xs font-black uppercase tracking-widest border-none bg-transparent outline-none cursor-pointer ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                        <option>English</option>
                                        <option>Hindi</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </Layout>);
};
