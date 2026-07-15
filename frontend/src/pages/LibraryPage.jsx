import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import {
    BookOpen, Plus, Search, Filter, AlertTriangle, CheckCircle,
    BookMarked, ArrowLeftRight, X, RotateCcw, Users, Library,
    Calendar, Hash, User, MapPin, Layers, IndianRupee
} from 'lucide-react';
import api from '@/services/api';
import toast from 'react-hot-toast';
import { format, formatDistanceToNow } from 'date-fns';

// ── API calls ─────────────────────────────────────────────────────────────────
const fetchBooks = (params) => api.get('/library/books', { params }).then(r => r.data);
const fetchIssues = (params) => api.get('/library/issues', { params }).then(r => r.data);
const fetchStats = () => api.get('/library/stats').then(r => r.data.data);
const fetchStudents = () => api.get('/students?limit=200').then(r => r.data);

const TABS = ['Catalog', 'Active Issues', 'Overdue', 'Add Book'];
const CATEGORIES = ['All', 'Science', 'Mathematics', 'Engineering', 'Computer Science', 'Arts', 'Commerce', 'History', 'Literature', 'Reference', 'Fiction', 'Research', 'Other'];

// ── Stat card ─────────────────────────────────────────────────────────────────
const StatCard = ({ label, value, icon: Icon, color }) => (
    <div className={`flex items-center gap-4 p-5 rounded-2xl bg-white dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 shadow-sm`}>
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${color}`}>
            <Icon size={20} className="text-white" />
        </div>
        <div>
            <p className="text-2xl font-black text-slate-900 dark:text-white">{value ?? '—'}</p>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{label}</p>
        </div>
    </div>
);

// ── Issue Book Modal ──────────────────────────────────────────────────────────
const IssueModal = ({ book, onClose }) => {
    const queryClient = useQueryClient();
    const [studentId, setStudentId] = useState('');
    const [dueDate, setDueDate] = useState(() => {
        const d = new Date();
        d.setDate(d.getDate() + 14); // default: 2 weeks
        return d.toISOString().split('T')[0];
    });

    const { data: studentsData } = useQuery({ queryKey: ['students-list'], queryFn: fetchStudents });
    const students = studentsData?.data || studentsData?.students || [];

    const { mutate, isPending } = useMutation({
        mutationFn: (payload) => api.post('/library/issue', payload),
        onSuccess: () => {
            toast.success(`"${book.title}" issued successfully!`);
            queryClient.invalidateQueries({ queryKey: ['library'] });
            onClose();
        },
        onError: (err) => toast.error(err.response?.data?.message || 'Failed to issue book'),
    });

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden"
            >
                <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800">
                    <div>
                        <h3 className="font-black text-slate-900 dark:text-white">Issue Book</h3>
                        <p className="text-sm text-slate-500 mt-0.5 truncate max-w-[280px]">"{book.title}"</p>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400">
                        <X size={18} />
                    </button>
                </div>
                <div className="p-6 space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Select Student</label>
                        <select
                            value={studentId}
                            onChange={e => setStudentId(e.target.value)}
                            className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/40"
                        >
                            <option value="">-- Select Student --</option>
                            {students.map(s => (
                                <option key={s._id} value={s._id}>
                                    {s.firstName} {s.lastName} ({s.rollNumber || s.studentId || 'N/A'})
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Due Date</label>
                        <input
                            type="date"
                            value={dueDate}
                            min={new Date().toISOString().split('T')[0]}
                            onChange={e => setDueDate(e.target.value)}
                            className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/40"
                        />
                    </div>
                    <div className="flex gap-3 pt-2">
                        <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition">Cancel</button>
                        <button
                            onClick={() => mutate({ bookId: book._id, studentId, dueDate })}
                            disabled={!studentId || isPending}
                            className="flex-1 py-2.5 rounded-xl bg-primary text-white text-sm font-bold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition"
                        >
                            {isPending ? 'Issuing...' : 'Issue Book'}
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

// ── Book Card ─────────────────────────────────────────────────────────────────
const BookCard = ({ book, onIssue }) => (
    <motion.div
        layout
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col bg-white dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 rounded-2xl overflow-hidden hover:shadow-lg hover:border-primary/20 transition-all group"
    >
        {/* Cover */}
        <div className="h-32 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center relative">
            <BookOpen size={40} className="text-primary/30" />
            <span className={`absolute top-2 right-2 px-2 py-0.5 text-[10px] font-black rounded-full ${
                book.availableCopies > 0 ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300' : 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300'
            }`}>
                {book.availableCopies > 0 ? `${book.availableCopies} Available` : 'All Issued'}
            </span>
        </div>
        <div className="p-4 flex-1 flex flex-col gap-1">
            <h3 className="font-black text-sm text-slate-900 dark:text-white line-clamp-2 leading-tight">{book.title}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">{book.author}</p>
            <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] px-2 py-0.5 bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-300 rounded-full font-bold">{book.category}</span>
                {book.isbn && <span className="text-[10px] text-slate-400">ISBN: {book.isbn}</span>}
            </div>
            <button
                onClick={() => book.availableCopies > 0 && onIssue(book)}
                disabled={book.availableCopies === 0}
                className="mt-auto pt-3 w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-primary/10 hover:bg-primary text-primary hover:text-white text-xs font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
                <BookMarked size={14} /> Issue Book
            </button>
        </div>
    </motion.div>
);

// ── Main Library Page ─────────────────────────────────────────────────────────
export function LibraryPage() {
    const [tab, setTab] = useState('Catalog');
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('All');
    const [issuingBook, setIssuingBook] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const queryClient = useQueryClient();

    // Queries
    const { data: statsData } = useQuery({ queryKey: ['library', 'stats'], queryFn: fetchStats, refetchInterval: 30000 });
    const { data: booksData, isLoading: booksLoading } = useQuery({
        queryKey: ['library', 'books', search, category],
        queryFn: () => fetchBooks({ search, category: category === 'All' ? undefined : category, limit: 50 }),
        keepPreviousData: true,
    });
    const { data: issuesData, isLoading: issuesLoading } = useQuery({
        queryKey: ['library', 'issues', tab],
        queryFn: () => fetchIssues({ status: tab === 'Overdue' ? 'overdue' : tab === 'Active Issues' ? 'issued' : 'all', limit: 50 }),
        enabled: tab === 'Active Issues' || tab === 'Overdue',
    });

    const books = booksData?.data || [];
    const issues = issuesData?.data || [];

    // Return mutation
    const returnMutation = useMutation({
        mutationFn: (issueId) => api.put(`/library/return/${issueId}`),
        onSuccess: (res) => {
            const { fineAmount, daysOverdue } = res.data;
            if (fineAmount > 0) {
                toast.success(`Returned! Fine: ₹${fineAmount} (${daysOverdue} days overdue)`, { duration: 6000 });
            } else {
                toast.success('Book returned successfully! No fine.');
            }
            queryClient.invalidateQueries({ queryKey: ['library'] });
        },
        onError: (err) => toast.error(err.response?.data?.message || 'Return failed'),
    });

    // Add Book mutation
    const [newBook, setNewBook] = useState({ title: '', author: '', isbn: '', category: 'Other', totalCopies: 1, publisher: '', publishedYear: '', location: '' });
    const addBookMutation = useMutation({
        mutationFn: (payload) => api.post('/library/books', payload),
        onSuccess: () => {
            toast.success('Book added to library!');
            queryClient.invalidateQueries({ queryKey: ['library'] });
            setNewBook({ title: '', author: '', isbn: '', category: 'Other', totalCopies: 1, publisher: '', publishedYear: '', location: '' });
        },
        onError: (err) => toast.error(err.response?.data?.message || 'Failed to add book'),
    });

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg">
                            <Library size={20} className="text-white" />
                        </div>
                        Library Management
                    </h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Book catalog, issue & return system</p>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard label="Total Books" value={statsData?.totalBooks} icon={BookOpen} color="bg-gradient-to-br from-blue-500 to-indigo-600" />
                <StatCard label="Available" value={statsData?.availableCopies} icon={CheckCircle} color="bg-gradient-to-br from-emerald-500 to-teal-600" />
                <StatCard label="Issued" value={statsData?.issued} icon={BookMarked} color="bg-gradient-to-br from-amber-500 to-orange-600" />
                <StatCard label="Overdue" value={statsData?.overdue} icon={AlertTriangle} color="bg-gradient-to-br from-red-500 to-rose-600" />
            </div>

            {/* Tabs */}
            <div className="flex gap-1 p-1 bg-slate-100 dark:bg-slate-800/50 rounded-xl w-fit">
                {TABS.map(t => (
                    <button
                        key={t}
                        onClick={() => setTab(t)}
                        className={`px-5 py-2.5 text-xs font-bold rounded-lg transition-all ${
                            tab === t
                                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                        }`}
                    >
                        {t}
                    </button>
                ))}
            </div>

            {/* ── Catalog Tab ── */}
            {tab === 'Catalog' && (
                <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row gap-3">
                        <div className="relative flex-1">
                            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by title, author, or ISBN..."
                                className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 text-slate-900 dark:text-white placeholder-slate-400" />
                        </div>
                        <select value={category} onChange={e => setCategory(e.target.value)}
                            className="px-4 py-2.5 bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/40">
                            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                        </select>
                    </div>

                    {booksLoading ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                            {[...Array(10)].map((_, i) => (
                                <div key={i} className="h-64 bg-white dark:bg-slate-800/40 rounded-2xl animate-pulse border border-slate-100 dark:border-slate-800" />
                            ))}
                        </div>
                    ) : books.length === 0 ? (
                        <div className="flex flex-col items-center py-16 gap-4 text-slate-400">
                            <BookOpen size={40} className="opacity-30" />
                            <p className="font-bold text-slate-600 dark:text-slate-300">No books found</p>
                            <p className="text-sm">Try a different search or add books using the "Add Book" tab</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                            {books.map(book => (
                                <BookCard key={book._id} book={book} onIssue={setIssuingBook} />
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* ── Active Issues / Overdue Tab ── */}
            {(tab === 'Active Issues' || tab === 'Overdue') && (
                <div className="bg-white dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/30">
                                    {['Book', 'Student', 'Issued', 'Due Date', 'Status', 'Fine', 'Action'].map(h => (
                                        <th key={h} className="px-5 py-3 text-left text-[11px] font-black uppercase tracking-wider text-slate-500">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
                                {issuesLoading ? (
                                    [...Array(5)].map((_, i) => (
                                        <tr key={i}><td colSpan={7} className="px-5 py-4"><div className="h-4 bg-slate-100 dark:bg-slate-700 rounded animate-pulse" /></td></tr>
                                    ))
                                ) : issues.length === 0 ? (
                                    <tr><td colSpan={7} className="px-5 py-12 text-center text-slate-400 font-medium">
                                        {tab === 'Overdue' ? '🎉 No overdue books!' : 'No active issues'}
                                    </td></tr>
                                ) : issues.map(issue => {
                                    const daysOverdue = issue.status === 'overdue'
                                        ? Math.floor((new Date() - new Date(issue.dueDate)) / (1000 * 60 * 60 * 24))
                                        : 0;
                                    const fine = daysOverdue * 2;
                                    return (
                                        <tr key={issue._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                                            <td className="px-5 py-4">
                                                <p className="font-bold text-slate-900 dark:text-white line-clamp-1">{issue.bookId?.title || 'N/A'}</p>
                                                <p className="text-xs text-slate-400">{issue.bookId?.author}</p>
                                            </td>
                                            <td className="px-5 py-4">
                                                <p className="font-semibold text-slate-700 dark:text-slate-200">
                                                    {issue.studentId?.firstName} {issue.studentId?.lastName}
                                                </p>
                                                <p className="text-xs text-slate-400">{issue.studentId?.rollNumber}</p>
                                            </td>
                                            <td className="px-5 py-4 text-slate-500 text-xs">{issue.issuedAt ? format(new Date(issue.issuedAt), 'dd MMM yyyy') : '—'}</td>
                                            <td className="px-5 py-4 text-xs font-semibold">
                                                <span className={issue.status === 'overdue' ? 'text-red-500' : 'text-slate-600 dark:text-slate-300'}>
                                                    {issue.dueDate ? format(new Date(issue.dueDate), 'dd MMM yyyy') : '—'}
                                                </span>
                                            </td>
                                            <td className="px-5 py-4">
                                                <span className={`px-2 py-1 text-[10px] font-black rounded-full ${
                                                    issue.status === 'overdue'
                                                        ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                                                        : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300'
                                                }`}>
                                                    {issue.status === 'overdue' ? `${daysOverdue}d overdue` : 'Issued'}
                                                </span>
                                            </td>
                                            <td className="px-5 py-4 text-xs font-bold">
                                                {fine > 0 ? <span className="text-red-500">₹{fine}</span> : <span className="text-slate-400">—</span>}
                                            </td>
                                            <td className="px-5 py-4">
                                                <button
                                                    onClick={() => returnMutation.mutate(issue._id)}
                                                    disabled={returnMutation.isPending}
                                                    className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-900/20 dark:hover:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 text-xs font-bold rounded-lg transition-colors"
                                                >
                                                    <RotateCcw size={12} /> Return
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* ── Add Book Tab ── */}
            {tab === 'Add Book' && (
                <div className="max-w-2xl">
                    <div className="bg-white dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 space-y-5">
                        <h2 className="font-black text-slate-900 dark:text-white flex items-center gap-2"><Plus size={18} /> Add New Book</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[
                                { label: 'Title *', key: 'title', placeholder: 'Book title' },
                                { label: 'Author *', key: 'author', placeholder: 'Author name' },
                                { label: 'ISBN', key: 'isbn', placeholder: 'e.g. 978-3-16-148410-0' },
                                { label: 'Publisher', key: 'publisher', placeholder: 'Publisher name' },
                                { label: 'Published Year', key: 'publishedYear', placeholder: '2023', type: 'number' },
                                { label: 'Total Copies', key: 'totalCopies', placeholder: '1', type: 'number' },
                                { label: 'Shelf Location', key: 'location', placeholder: 'e.g. A-12' },
                            ].map(({ label, key, placeholder, type }) => (
                                <div key={key}>
                                    <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">{label}</label>
                                    <input type={type || 'text'} value={newBook[key]} onChange={e => setNewBook(p => ({ ...p, [key]: e.target.value }))} placeholder={placeholder}
                                        className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/40" />
                                </div>
                            ))}
                            <div>
                                <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Category</label>
                                <select value={newBook.category} onChange={e => setNewBook(p => ({ ...p, category: e.target.value }))}
                                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/40">
                                    {CATEGORIES.filter(c => c !== 'All').map(c => <option key={c}>{c}</option>)}
                                </select>
                            </div>
                        </div>
                        <button
                            onClick={() => addBookMutation.mutate(newBook)}
                            disabled={!newBook.title || !newBook.author || addBookMutation.isPending}
                            className="w-full py-3 bg-gradient-to-r from-primary to-secondary text-white font-black rounded-xl hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-lg shadow-primary/20"
                        >
                            {addBookMutation.isPending ? 'Adding...' : '+ Add Book to Library'}
                        </button>
                    </div>
                </div>
            )}

            {/* Issue Modal */}
            <AnimatePresence>
                {issuingBook && <IssueModal book={issuingBook} onClose={() => setIssuingBook(null)} />}
            </AnimatePresence>
        </div>
    );
}
