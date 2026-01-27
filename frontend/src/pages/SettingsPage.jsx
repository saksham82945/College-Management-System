import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { useAuthStore } from '@/store/auth';
import { useThemeStore } from '@/store/theme';
import { Save, Bell, Moon, Sun, Globe } from 'lucide-react';
import toast from 'react-hot-toast';
export const SettingsPage = () => {
    const { user } = useAuthStore();
    const { isDarkMode, toggleTheme } = useThemeStore();
    const [notifications, setNotifications] = useState(true);
    const [profile, setProfile] = useState({
        fullName: user?.fullName || '',
        email: user?.email || '',
        phone: '9876543210'
    });
    const handleSave = (e) => {
        e.preventDefault();
        toast.success('Settings saved successfully');
    };
    return (<Layout>
            <div className="max-w-4xl mx-auto">
                <h1 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Settings & Preferences</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Sidebar / Navigation (Visual) */}
                    <div className="space-y-2">
                        <div className={`p-3 rounded-xl font-medium cursor-pointer ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-purple-50 text-purple-700'}`}>
                            General Profile
                        </div>
                        <div className={`p-3 rounded-xl font-medium cursor-pointer text-gray-500 hover:bg-gray-50 ${isDarkMode ? 'hover:bg-gray-800 hover:text-gray-300' : ''}`}>
                            Security
                        </div>
                        <div className={`p-3 rounded-xl font-medium cursor-pointer text-gray-500 hover:bg-gray-50 ${isDarkMode ? 'hover:bg-gray-800 hover:text-gray-300' : ''}`}>
                            Notifications
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="md:col-span-2 space-y-6">

                        {/* Profile Section */}
                        <div className={`p-6 rounded-2xl border shadow-sm ${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100'}`}>
                            <h2 className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Personal Information</h2>
                            <form onSubmit={handleSave} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-500 mb-1">Full Name</label>
                                        <input value={profile.fullName} onChange={e => setProfile({ ...profile, fullName: e.target.value })} className={`w-full p-2 rounded-lg border ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'border-gray-200'}`}/>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-500 mb-1">Phone</label>
                                        <input value={profile.phone} onChange={e => setProfile({ ...profile, phone: e.target.value })} className={`w-full p-2 rounded-lg border ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'border-gray-200'}`}/>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-500 mb-1">Email Address</label>
                                    <input disabled value={profile.email} // Fixed: was user?.email
     className={`w-full p-2 rounded-lg border opacity-70 cursor-not-allowed ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-400' : 'bg-gray-50 border-gray-200'}`}/>
                                    <p className="text-xs text-gray-400 mt-1">Contact admin to change email</p>
                                </div>

                                <div className="pt-4 flex justify-end">
                                    <button type="submit" className="flex items-center gap-2 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                                        <Save size={18}/> Save Changes
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Preferences Section */}
                        <div className={`p-6 rounded-2xl border shadow-sm ${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100'}`}>
                            <h2 className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>System Preferences</h2>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-purple-50 text-purple-600'}`}>
                                            {isDarkMode ? <Moon size={20}/> : <Sun size={20}/>}
                                        </div>
                                        <div>
                                            <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Dark Mode</p>
                                            <p className="text-xs text-gray-500">Toggle system theme</p>
                                        </div>
                                    </div>
                                    <button onClick={toggleTheme} className={`w-12 h-6 rounded-full p-1 transition-colors ${isDarkMode ? 'bg-purple-600' : 'bg-gray-200'}`}>
                                        <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${isDarkMode ? 'translate-x-6' : 'translate-x-0'}`}/>
                                    </button>
                                </div>

                                <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-blue-50 text-blue-600'}`}>
                                            <Bell size={20}/>
                                        </div>
                                        <div>
                                            <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Email Notifications</p>
                                            <p className="text-xs text-gray-500">Receive weekly digests</p>
                                        </div>
                                    </div>
                                    <button onClick={() => setNotifications(!notifications)} className={`w-12 h-6 rounded-full p-1 transition-colors ${notifications ? 'bg-green-500' : 'bg-gray-200'}`}>
                                        <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${notifications ? 'translate-x-6' : 'translate-x-0'}`}/>
                                    </button>
                                </div>

                                <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-orange-50 text-orange-600'}`}>
                                            <Globe size={20}/>
                                        </div>
                                        <div>
                                            <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Language</p>
                                            <p className="text-xs text-gray-500">System display language</p>
                                        </div>
                                    </div>
                                    <select className={`text-sm border-none bg-transparent font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                        <option>English</option>
                                        <option>Hindi</option>
                                        <option>Spanish</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </Layout>);
};
