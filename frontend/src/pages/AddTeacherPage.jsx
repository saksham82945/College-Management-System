import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { FormField, FormSection, Button, PageHeader } from '@/components';
import { useFormData } from '@/hooks';
import { apiClient } from '@/services/api';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { 
    Save, User, Mail, Phone, Calendar, Briefcase, 
    GraduationCap, Award, MapPin, ShieldCheck, 
    Clock, Banknote, UserPlus, FileText
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { motion } from 'framer-motion';

const DEPARTMENT_OPTIONS = [
    { value: '', label: 'Select Departmental Unit' },
    { value: 'Computer Science', label: 'School of Computer Science' },
    { value: 'Business Administration', label: 'School of Business' },
    { value: 'Mathematics', label: 'Dept. of Mathematics' },
    { value: 'English', label: 'Dept. of Linguistics' },
    { value: 'Physics', label: 'Dept. of Physics' },
];

const DESIGNATION_OPTIONS = [
    { value: '', label: 'Select Academic Designation' },
    { value: 'Professor', label: 'Senior Professor' },
    { value: 'Associate Professor', label: 'Associate Professor' },
    { value: 'Assistant Professor', label: 'Assistant Professor' },
    { value: 'Lecturer', label: 'Visiting Lecturer' },
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
    const { isDarkMode } = useTheme();
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
                    const { userId, ...rest } = teacher;
                    setFormData({
                        ...formData,
                        ...rest,
                        firstName: userId?.firstName || userId?.fullName?.split(' ')[0] || '',
                        lastName: userId?.lastName || userId?.fullName?.split(' ').slice(1).join(' ') || '',
                        email: userId?.email || '',
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
                    toast.error('Failed to retrieve faculty archives');
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
            const { address, ...rest } = formData;
            const formattedAddress = `${address.street}, ${address.city}, ${address.state} ${address.pinCode}, ${address.country}`;
            const payload = {
                ...rest,
                address: formattedAddress,
            };
            if (isEditMode && id) {
                await apiClient.put(`/teachers/${id}`, payload);
                toast.success('Faculty profile synchronized');
            }
            else {
                await apiClient.post('/teachers', payload);
                toast.success('Faculty commissioned successfully');
            }
            navigate('/teachers');
        }
        catch (error) {
            toast.error(error.response?.data?.message || `Protocol failure during ${isEditMode ? 'update' : 'commissioning'}`);
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <div className="max-w-5xl mx-auto px-4 pb-20">
                <PageHeader
                    title={isEditMode ? "Faculty Update" : "Faculty Commissioning"}
                    subtitle={isEditMode ? "Modifying existing academic profile" : "Onboarding new instructional personnel"}
                    icon={isEditMode ? FileText : UserPlus}
                    backTo="/teachers"
                />

                <form onSubmit={handleSubmit} className="space-y-12 mt-12">
                    {/* Faculty Identity */}
                    <FormSection 
                        title="Faculty Identity" 
                        icon={User} 
                        description="Core biographical and contact coordinates"
                    >
                        <FormField 
                            label="Given Name" 
                            name="firstName" 
                            value={formData.firstName} 
                            onChange={handleChange} 
                            required 
                            icon={User}
                            placeholder="Arthur"
                        />
                        <FormField 
                            label="Surname" 
                            name="lastName" 
                            value={formData.lastName} 
                            onChange={handleChange} 
                            required 
                            icon={User}
                            placeholder="Morgan"
                        />
                        <FormField 
                            label="Institutional Registry (Email)" 
                            name="email" 
                            type="email" 
                            value={formData.email} 
                            onChange={handleChange} 
                            required 
                            icon={Mail}
                            placeholder="faculty@university.edu"
                        />
                        <FormField 
                            label="Primary Contact (Phone)" 
                            name="phone" 
                            type="tel" 
                            value={formData.phone} 
                            onChange={handleChange} 
                            required 
                            icon={Phone}
                            placeholder="+91 00000 00000"
                        />
                        <FormField 
                            label="Chronological Marker (DOB)" 
                            name="dateOfBirth" 
                            type="date" 
                            value={formData.dateOfBirth} 
                            onChange={handleChange} 
                            icon={Calendar}
                        />
                        <FormField 
                            label="Biological Marker (Gender)" 
                            name="gender" 
                            value={formData.gender} 
                            onChange={handleChange} 
                            as="select" 
                            options={GENDER_OPTIONS} 
                            icon={ShieldCheck}
                        />
                    </FormSection>

                    {/* Professional Appointment */}
                    <FormSection 
                        title="Professional Appointment" 
                        icon={Briefcase} 
                        description="Departmental placement and tenure details"
                    >
                        <FormField 
                            label="Staff ID" 
                            name="employeeId" 
                            value={formData.employeeId} 
                            onChange={handleChange} 
                            required 
                            icon={FileText}
                            placeholder="FAC-2024-X"
                        />
                        <FormField 
                            label="Primary Domain (Dept)" 
                            name="department" 
                            value={formData.department} 
                            onChange={handleChange} 
                            as="select" 
                            options={DEPARTMENT_OPTIONS} 
                            required 
                            icon={GraduationCap}
                        />
                        <FormField 
                            label="Academic Title (Rank)" 
                            name="designation" 
                            value={formData.designation} 
                            onChange={handleChange} 
                            as="select" 
                            options={DESIGNATION_OPTIONS} 
                            required 
                            icon={Award}
                        />
                        <FormField 
                            label="Date of Commissioning" 
                            name="joiningDate" 
                            type="date" 
                            value={formData.joiningDate} 
                            onChange={handleChange} 
                            icon={Clock}
                        />
                        <FormField 
                            label="Academic Credentials" 
                            name="qualification" 
                            value={formData.qualification} 
                            onChange={handleChange} 
                            placeholder="e.g., PhD in Neural Networks" 
                            icon={Award}
                        />
                        <FormField 
                            label="Net Remuneration" 
                            name="salary" 
                            type="number" 
                            value={formData.salary} 
                            onChange={handleChange} 
                            required 
                            icon={Banknote}
                            placeholder="Annualized CTC"
                        />
                        <div className="md:col-span-2">
                            <FormField 
                                label="Tenure Experience (Years)" 
                                name="experience" 
                                type="number" 
                                value={formData.experience} 
                                onChange={handleChange} 
                                icon={Clock}
                            />
                        </div>
                    </FormSection>

                    {/* Logistics & Residence */}
                    <FormSection 
                        title="Logistics & Residence" 
                        icon={MapPin} 
                        description="Physical coordinates for institutional assets"
                    >
                        <div className="md:col-span-2">
                            <FormField 
                                label="Primary Residence (Street)" 
                                name="address.street" 
                                value={formData.address.street} 
                                onChange={handleChange} 
                                icon={MapPin}
                            />
                        </div>
                        <FormField label="City" name="address.city" value={formData.address.city} onChange={handleChange} />
                        <FormField label="State" name="address.state" value={formData.address.state} onChange={handleChange} />
                        <FormField label="Postal Code" name="address.pinCode" value={formData.address.pinCode} onChange={handleChange} />
                    </FormSection>

                    {/* Action Controls */}
                    <div className="flex justify-end gap-6 pt-10">
                        <Button 
                            variant="secondary" 
                            size="lg" 
                            onClick={() => navigate('/teachers')}
                            className="!px-10"
                        >
                            Cancel Protocol
                        </Button>
                        <Button 
                            variant="primary" 
                            type="submit" 
                            loading={loading}
                            icon={Save}
                            className="!px-12"
                        >
                            {isEditMode ? 'Commit Changes' : 'Initialize Commission'}
                        </Button>
                    </div>
                </form>
            </div>
        </Layout>
    );
};

