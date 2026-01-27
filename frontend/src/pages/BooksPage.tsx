import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Book, Plus, Search, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuthStore } from '@/store/auth';

export const BooksPage: React.FC = () => {
    const { user } = useAuthStore();
    const isStudent = user?.roles?.includes('STUDENT');
    const [showIssueModal, setShowIssueModal] = useState(false);

    // Mock Data reflecting backend 'Book' model potential
    const [books, setBooks] = useState([
        { id: 1, title: 'Introduction to Physics', author: 'H.C. Verma', isbn: '978-81-770-0000-0', copies: 5, available: 3 },
        { id: 2, title: 'Organic Chemistry', author: 'Morrison & Boyd', isbn: '978-01-300-0000-0', copies: 8, available: 8 },
        { id: 3, title: 'World History', author: 'Norman Lowe', isbn: '978-00-111-0000-0', copies: 2, available: 0 },
        { id: 4, title: 'Advanced Mathematics', author: 'R.D. Sharma', isbn: '978-11-222-0000-0', copies: 10, available: 6 },
    ]);

    const handleIssueBook = (e: React.FormEvent) => {
        e.preventDefault();
        toast.success('Book issued successfully to student');
        setShowIssueModal(false);
    };

    return (
        <Layout>
            {isStudent ? (
                /* STUDENT LIBRARY VIEW */
                <div className="p-6">
                    <h1 className="text-3xl font-bold mb-6 text-gray-800">Library</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {books.map(book => (
                            <div key={book.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                <div className="flex items-start justify-between mb-3">
                                    <Book className="text-blue-600" size={28} />
                                    {book.available > 0 ? (
                                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                                            <CheckCircle size={12} /> Available
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-red-100 text-red-700 text-xs font-medium">
                                            <AlertCircle size={12} /> Out of Stock
                                        </span>
                                    )}
                                </div>
                                <h3 className="text-lg font-bold text-gray-800 mb-1">{book.title}</h3>
                                <p className="text-sm text-gray-500 mb-3">{book.author}</p>
                                <p className="text-xs text-gray-400 font-mono mb-4">ISBN: {book.isbn}</p>
                                <button
                                    disabled={book.available === 0}
                                    className={`w-full py-2 rounded-lg font-medium transition-colors ${book.available > 0
                                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                        }`}
                                >
                                    {book.available > 0 ? 'Request Book' : 'Out of Stock'}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                /* ADMIN LIBRARY MANAGEMENT VIEW */
                <>
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">Library Management</h1>
                            <p className="text-gray-500 text-sm">Manage inventory and book issuing</p>
                        </div>
                        <div className="flex gap-2">
                            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                                <Plus size={18} /> Add Book
                            </button>
                            <button
                                onClick={() => setShowIssueModal(true)}
                                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
                            >
                                <Book size={18} /> Issue Book
                            </button>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                            <p className="text-gray-500 text-xs font-semibold uppercase">Total Books</p>
                            <p className="text-2xl font-bold text-gray-800">{books.reduce((acc, b) => acc + b.copies, 0)}</p>
                        </div>
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                            <p className="text-gray-500 text-xs font-semibold uppercase">Available</p>
                            <p className="text-2xl font-bold text-green-600">{books.reduce((acc, b) => acc + b.available, 0)}</p>
                        </div>
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                            <p className="text-gray-500 text-xs font-semibold uppercase">Issued</p>
                            <p className="text-2xl font-bold text-blue-600">{books.reduce((acc, b) => acc + (b.copies - b.available), 0)}</p>
                        </div>
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                            <p className="text-gray-500 text-xs font-semibold uppercase">Overdue</p>
                            <p className="text-2xl font-bold text-red-500">2</p>
                        </div>
                    </div>

                    {/* Books List */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-4 border-b flex justify-between items-center gap-4">
                            <h3 className="font-bold text-gray-800">Book Inventory</h3>
                            <div className="relative max-w-xs w-full">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                <input
                                    type="text"
                                    placeholder="Search by title, author, or ISBN..."
                                    className="w-full pl-9 pr-4 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-gray-50 text-gray-500 uppercase font-medium">
                                    <tr>
                                        <th className="px-6 py-3">Title / Author</th>
                                        <th className="px-6 py-3">ISBN</th>
                                        <th className="px-6 py-3 text-center">Status</th>
                                        <th className="px-6 py-3 text-center">Copies</th>
                                        <th className="px-6 py-3 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {books.map(book => (
                                        <tr key={book.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <p className="font-bold text-gray-800">{book.title}</p>
                                                <p className="text-gray-500 text-xs">{book.author}</p>
                                            </td>
                                            <td className="px-6 py-4 font-mono text-gray-600">
                                                {book.isbn}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                {book.available > 0 ? (
                                                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                                                        <CheckCircle size={12} /> Available
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-red-100 text-red-700 text-xs font-medium">
                                                        <AlertCircle size={12} /> Out of Stock
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className="font-bold text-gray-700">{book.available}</span>
                                                <span className="text-gray-400 mx-1">/</span>
                                                <span className="text-gray-500">{book.copies}</span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button className="text-blue-600 hover:text-blue-800 font-medium text-xs">Edit</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Issue Modal */}
                    {showIssueModal && (
                        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
                            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
                                <div className="p-6 border-b">
                                    <h2 className="text-xl font-bold text-gray-800">Issue Book to Student</h2>
                                </div>
                                <form onSubmit={handleIssueBook} className="p-6 space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Student ID / Roll No</label>
                                        <input required placeholder="e.g. STU-2024-001" className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Book ISBN or Title</label>
                                        <div className="relative">
                                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                            <input required placeholder="Search book..." className="w-full pl-9 pr-4 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Issue Date</label>
                                        <input type="date" defaultValue={new Date().toISOString().split('T')[0]} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                                        <input type="date" className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
                                    </div>

                                    <div className="flex justify-end gap-3 mt-8">
                                        <button
                                            type="button"
                                            onClick={() => setShowIssueModal(false)}
                                            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
                                        >
                                            Confirm Issue
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </>
            )}
        </Layout>
    );
};

