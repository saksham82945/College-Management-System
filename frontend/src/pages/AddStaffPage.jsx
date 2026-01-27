import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '@/services/api';
import toast from 'react-hot-toast';
import { useThemeStore } from '@/store/theme';
import { FormField, FormSection } from '@/components';
import { useFormData } from '@/hooks';

const ROLE_OPTIONS = [
    { value: '', label: 'Select Role' },
    { value: 'Librarian', label: 'Librarian' },
    { value: 'Accountant', label: 'Accountant' },
    { value: 'Admin', label: 'Admin' },
    { value: 'Security', label: 'Security' },
    { value: 'Maintenance', label: 'Maintenance' },
    { value: 'Lab Assistant', label: 'Lab Assistant' },
    { value: 'Office Staff', label: 'Office Staff' },
    { value: 'Other', label: 'Other' },
];

export const AddStaffPage = () => {
    const navigate = useNavigate();
    const { isDarkMode } = useThemeStore();
    const [loading, setLoading] = useState(false);

    const { formData, handleChange } = useFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: 'Staff@123',
        phone: '',
        employeeId: '',
        role: 'Librarian',
        department: '',
        joiningDate: '',
        salary: '',
        address: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const payload = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                password: formData.password,
                phone: formData.phone,
                employeeId: formData.employeeId,
                role: formData.role,
                department: formData.department,
                joiningDate: formData.joiningDate,
                salary: Number(formData.salary),
                contactInfo: {
                    phone: formData.phone,
                    address: formData.address
                }
            };

            await apiClient.post('/staff', payload);
            toast.success('Staff member added successfully!');
            navigate('/staff');
        } catch (error) {
            console.error('Error adding staff:', error);
            toast.error(error.response?.data?.message || 'Failed to add staff');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <button
                        onClick={() => navigate('/staff')}
                        className={`mb-4 ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
                    >
                        ← Back to Staff
                    </button>
                    <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                        Add New Staff Member
                    </h1>
                    <p className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
                        Fill in the details to add a new non-teaching staff member
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <FormSection title="Personal Information">
                        <FormField label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} required />
                        <FormField label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} required />
                        <FormField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required />
                        <FormField label="Phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} required />
                    </FormSection>

                    <FormSection title="Employment Details">
                        <FormField label="Employee ID" name="employeeId" value={formData.employeeId} onChange={handleChange} required />
                        <FormField label="Role" name="role" value={formData.role} onChange={handleChange} as="select" options={ROLE_OPTIONS} required />
                        <FormField label="Department" name="department" value={formData.department} onChange={handleChange} required />
                        <FormField label="Joining Date" name="joiningDate" type="date" value={formData.joiningDate} onChange={handleChange} required />
                        <FormField label="Base Salary (₹)" name="salary" type="number" value={formData.salary} onChange={handleChange} required />
                        <FormField label="Address" name="address" value={formData.address} onChange={handleChange} />
                    </FormSection>

                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={() => navigate('/staff')}
                            className={`px-6 py-2 rounded-lg font-medium ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:shadow-lg transition-all disabled:opacity-50"
                        >
                            {loading ? 'Adding...' : 'Add Staff Member'}
                        </button>
                    </div>
                </form>
            </div>
        </Layout>
    );
};
