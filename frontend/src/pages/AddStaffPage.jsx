import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '@/services/api';
import toast from 'react-hot-toast';
import { 
    UserPlus, User, Mail, Phone, Briefcase, 
    Calendar, Banknote, MapPin, Archive, 
    Save, ShieldCheck, ClipboardList 
} from 'lucide-react';
import { FormField, FormSection, Button, PageHeader } from '@/components';
import { useFormData } from '@/hooks';
import { useTheme } from '@/context/ThemeContext';

const ROLE_OPTIONS = [
    { value: '', label: 'Select Operational Role' },
    { value: 'Librarian', label: 'Knowledge Custodian (Librarian)' },
    { value: 'Accountant', label: 'Fiscal Analyst (Accountant)' },
    { value: 'Admin', label: 'System Executive (Admin)' },
    { value: 'Security', label: 'Asset Protection (Security)' },
    { value: 'Maintenance', label: 'Infrastructure Support' },
    { value: 'Lab Assistant', label: 'Technical Laboratory Assistant' },
    { value: 'Office Staff', label: 'Administrative Secretary' },
    { value: 'Other', label: 'Miscellaneous Operations' },
];

export const AddStaffPage = () => {
    const navigate = useNavigate();
    const { isDarkMode } = useTheme();
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
            toast.success('Member inducted into institutional workforce');
            navigate('/staff');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Induction protocol failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <div className="max-w-5xl mx-auto px-4 pb-20">
                <PageHeader
                    title="Staff Induction"
                    subtitle="Onboarding technical and administrative personnel"
                    icon={UserPlus}
                    backTo="/staff"
                />

                <form onSubmit={handleSubmit} className="space-y-12 mt-12">
                    {/* Personnel Identity */}
                    <FormSection 
                        title="Personnel Identity" 
                        icon={User} 
                        description="Biographical markers and digital contact points"
                    >
                        <FormField 
                            label="First Name" 
                            name="firstName" 
                            value={formData.firstName} 
                            onChange={handleChange} 
                            required 
                            icon={User}
                            placeholder="John"
                        />
                        <FormField 
                            label="Last Name" 
                            name="lastName" 
                            value={formData.lastName} 
                            onChange={handleChange} 
                            required 
                            icon={User}
                            placeholder="Doe"
                        />
                        <FormField 
                            label="Operational Email" 
                            name="email" 
                            type="email" 
                            value={formData.email} 
                            onChange={handleChange} 
                            required 
                            icon={Mail}
                            placeholder="staff@university.edu"
                        />
                        <FormField 
                            label="Secure Communication (Phone)" 
                            name="phone" 
                            type="tel" 
                            value={formData.phone} 
                            onChange={handleChange} 
                            required 
                            icon={Phone}
                            placeholder="+91 00000 00000"
                        />
                    </FormSection>

                    {/* Operational Assignment */}
                    <FormSection 
                        title="Operational Assignment" 
                        icon={Briefcase} 
                        description="Employment metrics and role classification"
                    >
                        <FormField 
                            label="Personnel ID" 
                            name="employeeId" 
                            value={formData.employeeId} 
                            onChange={handleChange} 
                            required 
                            icon={ShieldCheck}
                            placeholder="STF-2024-X"
                        />
                        <FormField 
                            label="Professional Role" 
                            name="role" 
                            value={formData.role} 
                            onChange={handleChange} 
                            as="select" 
                            options={ROLE_OPTIONS} 
                            required 
                            icon={ClipboardList}
                        />
                        <FormField 
                            label="Operational Department" 
                            name="department" 
                            value={formData.department} 
                            onChange={handleChange} 
                            required 
                            icon={Archive}
                            placeholder="Administration"
                        />
                        <FormField 
                            label="Date of Induction" 
                            name="joiningDate" 
                            type="date" 
                            value={formData.joiningDate} 
                            onChange={handleChange} 
                            required 
                            icon={Calendar}
                        />
                        <FormField 
                            label="Base Remuneration (₹)" 
                            name="salary" 
                            type="number" 
                            value={formData.salary} 
                            onChange={handleChange} 
                            required 
                            icon={Banknote}
                            placeholder="Gross Monthly"
                        />
                    </FormSection>

                    {/* Logistics */}
                    <FormSection 
                        title="Logistics" 
                        icon={MapPin} 
                        description="Physical occupancy and residence coordinates"
                    >
                        <div className="md:col-span-2">
                            <FormField 
                                label="Primary Residence (Address)" 
                                name="address" 
                                value={formData.address} 
                                onChange={handleChange} 
                                icon={MapPin}
                                placeholder="Full residential coordinates"
                            />
                        </div>
                    </FormSection>

                    {/* Action Controls */}
                    <div className="flex justify-end gap-6 pt-10">
                        <Button 
                            variant="secondary" 
                            size="lg" 
                            onClick={() => navigate('/staff')}
                            className="!px-10"
                        >
                            Abort Protocol
                        </Button>
                        <Button 
                            variant="primary" 
                            type="submit" 
                            loading={loading}
                            icon={Save}
                            className="!px-12"
                        >
                            Complete Induction
                        </Button>
                    </div>
                </form>
            </div>
        </Layout>
    );
};

