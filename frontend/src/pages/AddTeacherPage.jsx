import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { FormField, FormSection } from '@/components';
import { useFormData } from '@/hooks';
import { apiClient } from '@/services/api';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { ArrowLeft, Save } from 'lucide-react';
import { useThemeStore } from '@/store/theme';
const DEPARTMENT_OPTIONS = [
    { value: '', label: 'Select Department' },
    { value: 'Computer Science', label: 'Computer Science' },
    { value: 'Business Administration', label: 'Business Administration' },
    { value: 'Mathematics', label: 'Mathematics' },
    { value: 'English', label: 'English' },
    { value: 'Physics', label: 'Physics' },
];
const DESIGNATION_OPTIONS = [
    { value: '', label: 'Select Designation' },
    { value: 'Professor', label: 'Professor' },
    { value: 'Associate Professor', label: 'Associate Professor' },
    { value: 'Assistant Professor', label: 'Assistant Professor' },
    { value: 'Lecturer', label: 'Lecturer' },
];
const GENDER_OPTIONS = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' },
];
export const AddTeacherPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditMode = Boolean(id);
    const [loading, setLoading] = useState(false);
    const { isDarkMode } = useThemeStore();
    const { formData, handleChange, setFormData } = useFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: 'teacher123',
        gender: 'male',
        dateOfBirth: '',
        phone: '',
        employeeId: '',
        department: '',
        designation: '',
        joiningDate: '',
        salary: '',
        qualification: '',
        experience: '',
        address: {
            street: '',
            city: '',
            state: '',
            pinCode: '',
            country: 'India'
        }
    });
    useEffect(() => {
        if (isEditMode && id) {
            const fetchTeacher = async () => {
                try {
                    setLoading(true);
                    const response = await apiClient.get(`/teachers/${id}`);
                    const teacher = response.data.data;
                    // Parse address if needed, assuming backend stores it as string or object
                    // Adjust this parsing logic based on your backend response structure
                    // For now, assuming backend returns contactInfo with address string or object
                    // Flatten user object
                    const { userId, ...rest } = teacher;
                    setFormData({
                        ...formData,
                        ...rest,
                        firstName: userId?.firstName || userId?.fullName?.split(' ')[0] || '',
                        lastName: userId?.lastName || userId?.fullName?.split(' ').slice(1).join(' ') || '',
                        email: userId?.email || '',
                        // Keep password empty or placeholder to not overwrite if not changed
                        // Handle address simple parsing (if string) or mapping
                        // Making assumption it might be plain string in contactInfo or root
                        // For safety, pre-fill with defaults if parsing fails
                        address: {
                            street: teacher.contactInfo?.address || '',
                            city: '',
                            state: '',
                            pinCode: '',
                            country: 'India'
                        },
                        phone: teacher.contactInfo?.phone || ''
                    });
                }
                catch (error) {
                    console.error('Failed to fetch teacher:', error);
                    toast.error('Failed to load teacher details');
                    navigate('/teachers');
                }
                finally {
                    setLoading(false);
                }
            };
            fetchTeacher();
        }
    }, [id, isEditMode]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Format address object to string for backend
            const { address, ...rest } = formData;
            const formattedAddress = `${address.street}, ${address.city}, ${address.state} ${address.pinCode}, ${address.country}`;
            const payload = {
                ...rest,
                address: formattedAddress,
            };
            if (isEditMode && id) {
                await apiClient.put(`/teachers/${id}`, payload);
                toast.success('Teacher updated successfully');
            }
            else {
                await apiClient.post('/teachers', payload);
                toast.success('Teacher registered successfully');
            }
            navigate('/teachers');
        }
        catch (error) {
            console.error('Operation failed:', error);
            toast.error(error.response?.data?.message || `Failed to ${isEditMode ? 'update' : 'register'} teacher`);
        }
        finally {
            setLoading(false);
        }
    };
    return (<Layout>
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
                <button onClick={() => navigate('/teachers')} className={`flex items-center ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
                    <ArrowLeft size={20} className="mr-1" /> Back to Teachers
                </button>
                <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                    {isEditMode ? 'Edit Teacher' : 'Register New Teacher'}
                </h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Details */}
                <FormSection title="Personal Details">
                    <FormField label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} required />
                    <FormField label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} required />
                    <FormField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required />
                    <FormField label="Phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} required />
                    <FormField label="Date of Birth" name="dateOfBirth" type="date" value={formData.dateOfBirth} onChange={handleChange} />
                    <FormField label="Gender" name="gender" value={formData.gender} onChange={handleChange} as="select" options={GENDER_OPTIONS} />
                </FormSection>

                {/* Professional Details */}
                <FormSection title="Professional Details">
                    <FormField label="Employee ID" name="employeeId" value={formData.employeeId} onChange={handleChange} required />
                    <FormField label="Department" name="department" value={formData.department} onChange={handleChange} as="select" options={DEPARTMENT_OPTIONS} required />
                    <FormField label="Designation" name="designation" value={formData.designation} onChange={handleChange} as="select" options={DESIGNATION_OPTIONS} required />
                    <FormField label="Joining Date" name="joiningDate" type="date" value={formData.joiningDate} onChange={handleChange} />
                    <FormField label="Qualification" name="qualification" value={formData.qualification} onChange={handleChange} placeholder="e.g., PhD in Computer Science" />
                    <FormField label="Experience (years)" name="experience" type="number" value={formData.experience} onChange={handleChange} />
                    <FormField label="Annual Salary" name="salary" type="number" value={formData.salary} onChange={handleChange} required />
                </FormSection>

                {/* Address */}
                <FormSection title="Address">
                    <FormField label="Street" name="address.street" value={formData.address.street} onChange={handleChange} />
                    <FormField label="City" name="address.city" value={formData.address.city} onChange={handleChange} />
                    <FormField label="State" name="address.state" value={formData.address.state} onChange={handleChange} />
                    <FormField label="Pincode" name="address.pinCode" value={formData.address.pinCode} onChange={handleChange} />
                </FormSection>

                <div className="flex justify-end gap-4">
                    <button type="button" onClick={() => navigate('/teachers')} className={`px-6 py-2 border rounded transition-colors ${isDarkMode ? 'border-gray-700 text-gray-300 hover:bg-gray-800' : 'hover:bg-gray-50'}`}>
                        Cancel
                    </button>
                    <button type="submit" disabled={loading} className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded hover:shadow-lg transition-all flex items-center">
                        {loading ? 'Saving...' : <><Save size={18} className="mr-2" /> {isEditMode ? 'Update Teacher' : 'Register Teacher'}</>}
                    </button>
                </div>
            </form>
        </div>
    </Layout>);
};
