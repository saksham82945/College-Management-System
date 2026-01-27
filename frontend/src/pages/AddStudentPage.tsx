import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { FormField, FormSection } from '@/components';
import { useFormData } from '@/hooks';
import { apiClient } from '@/services/api';
import toast from 'react-hot-toast';
import { ChevronLeft, Save } from 'lucide-react';
import { useThemeStore } from '@/store/theme';

const COURSE_OPTIONS = [
    { value: '', label: 'Select Course' },
    { value: 'BCA', label: 'BCA' },
    { value: 'BBA', label: 'BBA' },
    { value: 'MBA (Finance)', label: 'MBA (Finance)' },
    { value: 'MBA (Marketing)', label: 'MBA (Marketing)' },
    { value: 'MBA (HR)', label: 'MBA (HR)' },
    { value: 'MBA (IT)', label: 'MBA (IT)' },
    { value: 'MCA', label: 'MCA' },
    { value: 'BSc IT', label: 'BSc IT' },
];

const GENDER_OPTIONS = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' },
];

export const AddStudentPage: React.FC = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { isDarkMode } = useThemeStore();

    const { formData, handleChange } = useFormData({
        fullName: '',
        email: '',
        password: 'password123',
        phone: '',
        rollNo: '',
        dateOfBirth: '',
        gender: 'male',
        address: {
            street: '',
            city: '',
            state: '',
            zipCode: '',
            country: 'India'
        },
        course: '',
        section: 'A',
        guardianInfo: {
            fatherName: '',
            motherName: '',
            fatherPhone: '',
            motherPhone: '',
            primaryEmail: ''
        }
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await apiClient.post('/students', formData);
            toast.success('Student admitted successfully');
            navigate('/students');
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Failed to add student');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                    <button
                        onClick={() => navigate('/students')}
                        className={`flex items-center ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
                    >
                        <ChevronLeft size={20} className="mr-1" /> Back to Students
                    </button>
                    <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                        New Admission
                    </h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Student Details */}
                    <FormSection title="Student Details">
                        <FormField label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} required />
                        <FormField label="Roll Number" name="rollNo" value={formData.rollNo} onChange={handleChange} required />
                        <FormField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required />
                        <FormField label="Phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} required />
                        <FormField label="Date of Birth" name="dateOfBirth" type="date" value={formData.dateOfBirth} onChange={handleChange} />
                        <FormField label="Gender" name="gender" value={formData.gender} onChange={handleChange} as="select" options={GENDER_OPTIONS} />
                    </FormSection>

                    {/* Academic Info */}
                    <FormSection title="Academic Info">
                        <FormField label="Course" name="course" value={formData.course} onChange={handleChange} as="select" options={COURSE_OPTIONS} required />
                        <FormField label="Section" name="section" value={formData.section} onChange={handleChange} />
                    </FormSection>

                    {/* Guardian Info */}
                    <FormSection title="Guardian Info">
                        <FormField label="Father Name" name="guardianInfo.fatherName" value={formData.guardianInfo.fatherName} onChange={handleChange} required />
                        <FormField label="Mother Name" name="guardianInfo.motherName" value={formData.guardianInfo.motherName} onChange={handleChange} required />
                        <FormField label="Father Phone" name="guardianInfo.fatherPhone" type="tel" value={formData.guardianInfo.fatherPhone} onChange={handleChange} required />
                    </FormSection>

                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={() => navigate('/students')}
                            className={`px-6 py-2 border rounded transition-colors ${isDarkMode ? 'border-gray-700 text-gray-300 hover:bg-gray-800' : 'hover:bg-gray-50'}`}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded hover:shadow-lg transition-all flex items-center"
                        >
                            {loading ? 'Saving...' : <><Save size={18} className="mr-2" /> Submit Admission</>}
                        </button>
                    </div>
                </form>
            </div>
        </Layout>
    );
};
