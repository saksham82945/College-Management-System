import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { FormField, FormSection, Button, PageHeader } from '@/components';
import { useFormData } from '@/hooks';
import { apiClient } from '@/services/api';
import toast from 'react-hot-toast';
import { 
    ChevronLeft, Save, User, Mail, Phone, Calendar, Hash, 
    MapPin, GraduationCap, ShieldCheck, Heart, UserPlus, 
    Smartphone, UserSquare 
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { motion } from 'framer-motion';

const COURSE_OPTIONS = [
    { value: '', label: 'Select' },
    { value: 'BCA', label: 'BCA' },
    { value: 'BBA', label: 'BBA' },
    { value: 'MBA (Finance)', label: 'MBA (Finance)' },
    { value: 'MBA (Marketing)', label: 'MBA (Marketing)' },
    { value: 'MBA (HR)', label: 'MBA (HR)' },
    { value: 'MBA (IT)', label: 'MBA (IT)' },
    { value: 'MCA', label: 'MCA' },
    { value: 'BSc IT', label: 'BSc IT' },
];

const SEMESTER_OPTIONS = [
    { value: '', label: 'Select' },
    { value: '1st', label: '1st Semester' },
    { value: '2nd', label: '2nd Semester' },
    { value: '3rd', label: '3rd Semester' },
    { value: '4th', label: '4th Semester' },
    { value: '5th', label: '5th Semester' },
    { value: '6th', label: '6th Semester' },
    { value: '7th', label: '7th Semester' },
    { value: '8th', label: '8th Semester' },
];

const GENDER_OPTIONS = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' },
];

export const AddStudentPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { isDarkMode } = useTheme();
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
            pinCode: '',
            country: 'India'
        },
        course: '',
        semester: '',
        section: 'A',
        guardianInfo: {
            fatherName: '',
            motherName: '',
            fatherPhone: '',
            motherPhone: '',
            primaryEmail: ''
        }
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await apiClient.post('/students', formData);
            toast.success('Student admitted successfully');
            navigate('/students');
        }
        catch (error) {
            toast.error(error.response?.data?.message || 'Admission process failed');
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <div className="max-w-5xl mx-auto px-4 pb-20">
                <PageHeader
                    title="Student Admission"
                    subtitle="Add a new student to the institution"
                    icon={UserPlus}
                    backTo="/students"
                />

                <form onSubmit={handleSubmit} className="space-y-12 mt-12">
                    {/* Primary Identity Section */}
                    <FormSection 
                        title="Personal Details" 
                        icon={UserSquare} 
                        description="Full name and contact information"
                    >
                        <FormField 
                            label="Full Name" 
                            name="fullName" 
                            value={formData.fullName} 
                            onChange={handleChange} 
                            required 
                            icon={User}
                            placeholder="Full Name"
                        />
                        <FormField 
                            label="Roll Number" 
                            name="rollNo" 
                            value={formData.rollNo} 
                            onChange={handleChange} 
                            required 
                            icon={Hash}
                            placeholder="Roll Number"
                        />
                        <FormField 
                            label="Email Address" 
                            name="email" 
                            type="email" 
                            value={formData.email} 
                            onChange={handleChange} 
                            required 
                            icon={Mail}
                            placeholder="email@lnmi.ac.in"
                        />
                        <FormField 
                            label="Phone Number" 
                            name="phone" 
                            type="tel" 
                            value={formData.phone} 
                            onChange={handleChange} 
                            required 
                            icon={Smartphone}
                            placeholder="Phone Number"
                        />
                        <FormField 
                            label="Date of Birth" 
                            name="dateOfBirth" 
                            type="date" 
                            value={formData.dateOfBirth} 
                            onChange={handleChange} 
                            icon={Calendar}
                        />
                        <FormField 
                            label="Gender" 
                            name="gender" 
                            value={formData.gender} 
                            onChange={handleChange} 
                            as="select" 
                            options={GENDER_OPTIONS} 
                            icon={Heart}
                        />
                    </FormSection>

                    {/* Academic Enrollment Section */}
                    <FormSection 
                        title="Academic Details" 
                        icon={ShieldCheck} 
                        description="Course and semester details"
                    >
                        <FormField 
                            label="Course" 
                            name="course" 
                            value={formData.course} 
                            onChange={handleChange} 
                            as="select" 
                            options={COURSE_OPTIONS} 
                            required 
                            icon={GraduationCap}
                        />
                        <FormField 
                            label="Semester" 
                            name="semester" 
                            value={formData.semester} 
                            onChange={handleChange} 
                            as="select" 
                            options={SEMESTER_OPTIONS} 
                            required 
                            icon={Calendar}
                        />
                        <FormField 
                            label="Section" 
                            name="section" 
                            value={formData.section} 
                            onChange={handleChange} 
                            placeholder="Section"
                        />
                    </FormSection>

                    {/* Geographical Baseline Section */}
                    <FormSection 
                        title="Address Details" 
                        icon={MapPin} 
                        description="Permanent address for official records"
                    >
                        <div className="md:col-span-2">
                            <FormField 
                                label="Street Address" 
                                name="address.street" 
                                value={formData.address.street} 
                                onChange={handleChange} 
                                placeholder="Street Address"
                            />
                        </div>
                        <FormField 
                            label="City" 
                            name="address.city" 
                            value={formData.address.city} 
                            onChange={handleChange} 
                        />
                        <FormField 
                            label="State" 
                            name="address.state" 
                            value={formData.address.state} 
                            onChange={handleChange} 
                        />
                    </FormSection>

                    {/* Guardian Proxy Section */}
                    <FormSection 
                        title="Guardian Information" 
                        icon={ShieldCheck} 
                        description="Parental details and emergency contacts"
                    >
                        <FormField 
                            label="Father's Name" 
                            name="guardianInfo.fatherName" 
                            value={formData.guardianInfo.fatherName} 
                            onChange={handleChange} 
                            required 
                        />
                        <FormField 
                            label="Mother's Name" 
                            name="guardianInfo.motherName" 
                            value={formData.guardianInfo.motherName} 
                            onChange={handleChange} 
                            required 
                        />
                        <FormField 
                            label="Father's Phone Number" 
                            name="guardianInfo.fatherPhone" 
                            type="tel" 
                            value={formData.guardianInfo.fatherPhone} 
                            onChange={handleChange} 
                            required 
                        />
                    </FormSection>

                    {/* Form Controls */}
                    <div className="flex justify-end gap-6 pt-8">
                        <Button 
                            variant="secondary" 
                            size="lg" 
                            onClick={() => navigate('/students')}
                            className="!px-10"
                        >
                            Cancel
                        </Button>
                        <Button 
                            variant="primary" 
                            type="submit" 
                            loading={loading}
                            icon={Save}
                            className="!px-12"
                        >
                            Add Student
                        </Button>
                    </div>
                </form>
            </div>
        </Layout>
    );
};

