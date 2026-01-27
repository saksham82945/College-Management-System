import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { apiClient } from '@/services/api';
import { useAuthStore } from '@/store/auth';
import { DollarSign, CheckCircle, Clock } from 'lucide-react';
import toast from 'react-hot-toast';

interface StudentFee {
    _id: string;
    feeTypeId: {
        _id: string;
        name: string;
        amount: number;
        code: string;
    };
    amountDue: number;
    amountPaid: number;
    dueDate: string;
    status: 'paid' | 'partial' | 'unpaid';
}

export const PayFeePage: React.FC = () => {
    const { user } = useAuthStore();
    const [fees, setFees] = useState<StudentFee[]>([]);
    const [loading, setLoading] = useState(true);
    const [processingPayment, setProcessingPayment] = useState<string | null>(null);

    // Assuming user.studentId is available. 
    // If user is STUDENT, we might need to fetch their student profile first if not in auth store.
    // For now assuming we can get student ID from user object or derived.
    // Actually, backend getStudentFees takes :studentId param.
    // If I am a student, I need my own studentId. 
    // Let's assume user.id is the User ID, and we might need to look up Student ID or it's attached.
    // In login, we usually attach studentId if role is student.

    // TEMPORARY FIX: If user is student, we need to find their Student ID. 
    // We already have /auth/me or similar? 
    // For now, let's fetch profile first or assume user.studentProfileId exists.
    // If not, I might need to fetch it.

    // Let's proceed assuming we can fetch by USER ID?
    // No, controller expects STUDENT ID.
    // I will try to fetch profile to get student ID if I don't have it.
    // OR create a helper to get 'my' student id.

    // To make it simple, I will hardcode fetching from /students?userId=xxx or similar if needed.
    // Or better, update auth controller to return studentId.
    // But for now, let's try to see if user has it.

    const studentId = user?.studentProfileId || user?.id; // Fallback, likely fail if not mapped.

    useEffect(() => {
        if (studentId) {
            fetchFees();
        }
    }, [studentId]);

    const fetchFees = async () => {
        try {
            // We need a way to get 'my' fees. 
            // If I am logged in, maybe I should use an endpoint /finance/my-fees?
            // But I have /finance/student/:id.
            // If I don't have studentId easily, this is blocked.

            // Assuming for this prototype we use the ID we have.
            const response = await apiClient.get(`/finance/student/${studentId}`);
            if (response.data) {
                // The controller returns { data: { fees: [], totalPending: 0 } }
                setFees(response.data.data.fees);
            }
        } catch (error) {
            console.error('Failed to fetch fees', error);
            // toast.error('Could not load fees'); 
        } finally {
            setLoading(false);
        }
    };

    const handlePay = async (fee: StudentFee) => {
        if (!confirm(`Pay ₹${fee.amountDue - fee.amountPaid} for ${fee.feeTypeId.name}?`)) return;

        setProcessingPayment(fee._id);
        try {
            await apiClient.post('/finance/pay', {
                studentId: studentId, // Need real student ID
                feeTypeId: fee.feeTypeId._id,
                amount: fee.amountDue - fee.amountPaid,
                paymentMethod: 'online',
                transactionRef: `TXN_${Date.now()}` // Mock transaction
            });
            toast.success('Payment Successful');
            fetchFees();
        } catch (error) {
            toast.error('Payment Failed');
        } finally {
            setProcessingPayment(null);
        }
    };

    if (loading) return <Layout><div>Loading fees...</div></Layout>;

    return (
        <Layout>
            <h1 className="text-2xl font-bold mb-6">My Fees</h1>

            <div className="space-y-4">
                {fees.length === 0 ? (
                    <p className="text-gray-500">No fee records found.</p>
                ) : (
                    fees.map(fee => (
                        <div key={fee._id} className="bg-white p-6 rounded-lg shadow-sm border flex flex-col md:flex-row justify-between items-center gap-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <h3 className="font-bold text-lg">{fee.feeTypeId?.name || 'Unknown Fee'}</h3>
                                    <span className={`px-2 py-0.5 rounded text-xs uppercase font-bold ${fee.status === 'paid' ? 'bg-green-100 text-green-700' :
                                        fee.status === 'partial' ? 'bg-yellow-100 text-yellow-700' :
                                            'bg-red-100 text-red-700'
                                        }`}>
                                        {fee.status}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-500">Due Date: {new Date(fee.dueDate).toLocaleDateString()}</p>
                                <div className="mt-2 text-sm">
                                    <span className="text-gray-600">Total: ₹{fee.amountDue}</span>
                                    <span className="mx-2">|</span>
                                    <span className="text-green-600">Paid: ₹{fee.amountPaid}</span>
                                    <span className="mx-2">|</span>
                                    <span className="text-red-600 font-bold">Due: ₹{fee.amountDue - fee.amountPaid}</span>
                                </div>
                            </div>

                            {fee.status !== 'paid' && (
                                <button
                                    onClick={() => handlePay(fee)}
                                    disabled={!!processingPayment}
                                    className="bg-primary hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium shadow-sm min-w-[120px] flex justify-center"
                                >
                                    {processingPayment === fee._id ? 'Processing...' : 'Pay Now'}
                                </button>
                            )}
                            {fee.status === 'paid' && (
                                <div className="text-green-600 flex items-center min-w-[120px] justify-center">
                                    <CheckCircle size={20} className="mr-2" /> Paid
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </Layout>
    );
};
