import React from 'react';
import { Layout } from '@/components/Layout';
import { FormField, SearchBar, PageHeader } from '@/components';
import { useModal } from '@/hooks/useModal';
import { useFormData } from '@/hooks/useFormData';
import { Mail, Phone, Briefcase, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

const INITIAL_STAFF = [
    { id: 1, name: 'Rajesh Kumar', role: 'Librarian', email: 'rajesh.lib@college.edu', phone: '9876543210', status: 'Active' },
    { id: 2, name: 'Priya Sharma', role: 'Accountant', email: 'priya.acc@college.edu', phone: '9876543211', status: 'Active' },
    { id: 3, name: 'Amit Singh', role: 'Maintenance', email: 'amit.fix@college.edu', phone: '9876543212', status: 'On Leave' },
    { id: 4, name: 'Sunita Patel', role: 'Clerk', email: 'sunita.clerk@college.edu', phone: '9876543213', status: 'Active' },
];

const ROLE_OPTIONS = [
    { value: 'Librarian', label: 'Librarian' },
    { value: 'Accountant', label: 'Accountant' },
    { value: 'Clerk', label: 'Clerk' },
    { value: 'Maintenance', label: 'Maintenance' },
    { value: 'Security', label: 'Security' },
];

export const StaffPage: React.FC = () => {
    const [staff, setStaff] = React.useState(INITIAL_STAFF);
    const [searchTerm, setSearchTerm] = React.useState('');
    const [roleFilter, setRoleFilter] = React.useState('All Roles');

    const modal = useModal();
    const { formData, handleChange, reset } = useFormData({
        firstName: '',
        lastName: '',
        email: '',
        role: 'Librarian',
        joiningDate: ''
    });

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to remove this staff member?')) {
            setStaff(staff.filter(s => s.id !== id));
            toast.success('Staff member removed');
        }
    };

    const filteredStaff = staff.filter(member => {
        const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = roleFilter === 'All Roles' || member.role === roleFilter;
        return matchesSearch && matchesRole;
    });

    const handleAddStaff = (e: React.FormEvent) => {
        e.preventDefault();
        const newStaff = {
            id: staff.length + 1,
            name: `${formData.firstName} ${formData.lastName}`,
            role: formData.role,
            email: formData.email,
            phone: 'N/A',
            status: 'Active'
        };
        setStaff([...staff, newStaff]);
        toast.success('New staff member added successfully');
        modal.close();
        reset();
    };

    return (
        <Layout>
            <PageHeader
                title="Staff Management"
                subtitle="Manage non-teaching staff members"
                actionLabel="Add Staff"
                onAction={modal.open}
            />

            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 flex gap-4">
                <SearchBar
                    value={searchTerm}
                    onChange={setSearchTerm}
                    placeholder="Search staff by name or role..."
                    className="flex-1"
                />
                <select
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none bg-white"
                >
                    <option>All Roles</option>
                    {ROLE_OPTIONS.map(opt => <option key={opt.value}>{opt.value}</option>)}
                </select>
            </div>

            {/* Staff Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredStaff.map(member => (
                    <div key={member.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                        <div className="p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold text-lg">
                                    {member.name.charAt(0)}
                                </div>
                                <span className={`px-2 py-1 rounded text-xs font-medium ${member.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                    {member.status}
                                </span>
                            </div>
                            <h3 className="text-lg font-bold text-gray-800">{member.name}</h3>
                            <p className="text-purple-600 text-sm font-medium mb-4 flex items-center gap-1">
                                <Briefcase size={14} /> {member.role}
                            </p>
                            <div className="space-y-2 text-sm text-gray-500">
                                <div className="flex items-center gap-2"><Mail size={16} /> {member.email}</div>
                                <div className="flex items-center gap-2"><Phone size={16} /> {member.phone}</div>
                            </div>
                        </div>
                        <div className="px-6 py-3 bg-gray-50 border-t flex justify-end gap-2">
                            <button className="text-gray-500 hover:text-purple-600 text-sm font-medium px-2 py-1">Edit</button>
                            <button
                                onClick={() => handleDelete(member.id)}
                                className="text-red-500 hover:text-red-700 text-sm font-medium px-2 py-1 flex items-center gap-1"
                            >
                                <Trash2 size={14} /> Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Add Staff Modal */}
            {modal.isOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden">
                        <div className="p-6 border-b">
                            <h2 className="text-xl font-bold text-gray-800">Add New Staff Member</h2>
                        </div>
                        <form onSubmit={handleAddStaff} className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <FormField label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} required />
                                <FormField label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} required />
                            </div>
                            <FormField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required />
                            <FormField label="Role/Designation" name="role" value={formData.role} onChange={handleChange} as="select" options={ROLE_OPTIONS} />
                            <FormField label="Joining Date" name="joiningDate" type="date" value={formData.joiningDate} onChange={handleChange} />

                            <div className="flex justify-end gap-3 mt-8">
                                <button
                                    type="button"
                                    onClick={modal.close}
                                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700"
                                >
                                    Add Staff
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </Layout>
    );
};
