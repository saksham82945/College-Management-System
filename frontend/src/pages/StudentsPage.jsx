import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { Button, Table, Input, Modal } from '@/components';
import { apiClient } from '@/services/api';
import toast from 'react-hot-toast';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
export const StudentsPage = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    phone: '',
    rollNo: '',
    course: '',
    semester: '',
    section: '',
  });
  useEffect(() => {
    fetchStudents();
  }, [page, searchTerm]);
  const fetchStudents = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get(`/students?page=${page}&size=25`);
      setStudents(response.data.data.students);
      setTotal(response.data.data.total);
    }
    catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch students');
    }
    finally {
      setLoading(false);
    }
  };
  const handleCreateStudent = async (e) => {
    e.preventDefault();
    try {
      await apiClient.post('/students', formData);
      toast.success('Student created successfully');
      setModalOpen(false);
      setFormData({
        email: '',
        password: '',
        fullName: '',
        phone: '',
        rollNo: '',
        course: '',
        section: '',
      });
      fetchStudents();
    }
    catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create student');
    }
  };
  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'rollNo', label: 'Roll No' },
    { key: 'course', label: 'Course' },
    { key: 'semester', label: 'Semester' },
    { key: 'section', label: 'Section' },
    {
      key: 'status',
      label: 'Status',
      render: (value) => (<span className={`px-3 py-1 rounded-full text-sm font-medium ${value === 'active'
        ? 'bg-green-100 text-green-800'
        : 'bg-gray-100 text-gray-800'}`}>
        {value}
      </span>),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_, row) => (<Button variant="outline" size="sm" onClick={() => navigate(`/students/${row.id}`)}>
        View Profile
      </Button>)
    }
  ];
  return (<Layout>
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Students</h1>
        <Button onClick={() => navigate('/students/add')} variant="primary">
          <Plus size={20} className="inline mr-2" />
          Add Student
        </Button>
      </div>

      <div className="mb-6">
        <Input type="search" placeholder="Search students..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      </div>

      <div className="bg-white rounded-lg shadow">
        <Table columns={columns} data={students} loading={loading} />
      </div>

      {/* Create Student Modal */}
      <Modal open={modalOpen} title="Add New Student" onClose={() => setModalOpen(false)} footer={<>
        <Button variant="outline" onClick={() => setModalOpen(false)}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleCreateStudent}>
          Create
        </Button>
      </>}>
        <form className="space-y-4">
          <Input label="Full Name" value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} required />
          <Input label="Email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
          <Input label="Password" type="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />
          <Input label="Roll Number" value={formData.rollNo} onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })} required />
          <Input label="Semester" value={formData.semester} onChange={(e) => setFormData({ ...formData, semester: e.target.value })} required />
          <Input label="Phone" type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
        </form>
      </Modal>
    </div>
  </Layout>);
};
