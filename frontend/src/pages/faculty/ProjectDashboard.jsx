import React, { useState, useMemo } from 'react';
import { useProjects, useGradeProject } from '../../hooks/useProject';
import { ProjectStatus } from '../../types/project';
import { motion, AnimatePresence } from 'framer-motion';
import { ProjectCardSkeleton } from '../../components/common/Skeleton';
import toast from 'react-hot-toast';
// Debounce hook
function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    React.useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);
    return debouncedValue;
}
const ProjectDashboard = () => {
    const [filters, setFilters] = useState({
        batch: '',
        domain: '',
        status: '',
        page: 1,
        limit: 20,
        sort: 'updatedAt',
        order: 'desc'
    });
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearch = useDebounce(searchTerm, 300);
    const [selectedProject, setSelectedProject] = useState(null);
    const [grading, setGrading] = useState({ score: 0, feedback: '', status: ProjectStatus.GRADED });
    const [showGradingModal, setShowGradingModal] = useState(false);
    const { data, isLoading, error, refetch } = useProjects(filters);
    const gradeProject = useGradeProject();
    const projects = data?.data || [];
    const pagination = data?.pagination;
    const stats = data?.stats || {};
    const statusCounts = useMemo(() => ({
        total: projects.length,
        submitted: stats[ProjectStatus.SUBMITTED] || 0,
        graded: stats[ProjectStatus.GRADED] || 0,
        inProgress: stats[ProjectStatus.IN_PROGRESS] || 0
    }), [projects, stats]);
    // Filter projects by search term (client-side for demo)
    const filteredProjects = useMemo(() => {
        if (!debouncedSearch)
            return projects;
        return projects.filter(p => p.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
            p.description.toLowerCase().includes(debouncedSearch.toLowerCase()));
    }, [projects, debouncedSearch]);
    const handleGrade = async () => {
        if (!selectedProject)
            return;
        if (grading.score < 0 || grading.score > 100) {
            toast.error('Score must be between 0 and 100');
            return;
        }
        if (grading.feedback.length < 10) {
            toast.error('Feedback must be at least 10 characters');
            return;
        }
        await gradeProject.mutateAsync({
            id: selectedProject._id,
            data: {
                score: grading.score,
                feedback: grading.feedback,
                status: grading.status
            }
        });
        setShowGradingModal(false);
        setSelectedProject(null);
        setGrading({ score: 0, feedback: '', status: ProjectStatus.GRADED });
        refetch();
    };
    const openGradingModal = (project) => {
        setSelectedProject(project);
        setGrading({
            score: project.grading?.score || 0,
            feedback: project.grading?.feedback || '',
            status: ProjectStatus.GRADED
        });
        setShowGradingModal(true);
    };
    const getStatusColor = (status) => {
        const colors = {
            [ProjectStatus.PROPOSED]: 'bg-yellow-100 text-yellow-800',
            [ProjectStatus.APPROVED]: 'bg-blue-100 text-blue-800',
            [ProjectStatus.IN_PROGRESS]: 'bg-indigo-100 text-indigo-800',
            [ProjectStatus.SUBMITTED]: 'bg-purple-100 text-purple-800',
            [ProjectStatus.CHANGES_REQUESTED]: 'bg-orange-100 text-orange-800',
            [ProjectStatus.GRADED]: 'bg-green-100 text-green-800',
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    };
    return (<div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6">
            <div className="max-w-7xl mx-auto">
                <header className="mb-8 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Project Command Center</h1>
                        <p className="text-gray-600 dark:text-gray-400">Monitor and grade student project submissions</p>
                    </div>
                    <button onClick={() => refetch()} className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition border border-gray-200 dark:border-gray-700">
                        <svg className="w-4 h-4 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                        </svg>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Refresh</span>
                    </button>
                </header>

                {/* Stats Section */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border-l-4 border-indigo-500">
                        <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Total Projects</h3>
                        <p className="text-3xl font-bold text-gray-800 dark:text-white mt-2">{pagination?.total || 0}</p>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border-l-4 border-purple-500">
                        <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Awaiting Review</h3>
                        <p className="text-3xl font-bold text-gray-800 dark:text-white mt-2">{statusCounts.submitted}</p>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border-l-4 border-green-500">
                        <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Graded</h3>
                        <p className="text-3xl font-bold text-gray-800 dark:text-white mt-2">{statusCounts.graded}</p>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border-l-4 border-blue-500">
                        <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">In Progress</h3>
                        <p className="text-3xl font-bold text-gray-800 dark:text-white mt-2">{statusCounts.inProgress}</p>
                    </motion.div>
                </div>

                {/* Filters */}
                <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <input type="text" placeholder="Search by title or description..." className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none transition" value={searchTerm} onChange={e => setSearchTerm(e.target.value)}/>
                        <input type="text" placeholder="Filter by Batch (e.g. 2024-CSE)" className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none transition" value={filters.batch} onChange={e => setFilters({ ...filters, batch: e.target.value, page: 1 })}/>
                        <select className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none transition" value={filters.status} onChange={e => setFilters({ ...filters, status: e.target.value, page: 1 })}>
                            <option value="">All Statuses</option>
                            {Object.values(ProjectStatus).map(status => (<option key={status} value={status}>{status.replace('_', ' ')}</option>))}
                        </select>
                        <input type="text" placeholder="Filter by Domain" className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none transition" value={filters.domain} onChange={e => setFilters({ ...filters, domain: e.target.value, page: 1 })}/>
                    </div>
                </div>

                {/* Projects List */}
                {isLoading ? (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, i) => <ProjectCardSkeleton key={i}/>)}
                    </div>) : error ? (<div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 text-center">
                        <div className="text-red-500 text-5xl mb-4">⚠️</div>
                        <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Error Loading Projects</h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">{error.message}</p>
                        <button onClick={() => refetch()} className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition">
                            Try Again
                        </button>
                    </div>) : filteredProjects.length === 0 ? (<div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-12 text-center">
                        <div className="text-6xl mb-4">📂</div>
                        <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">No Projects Found</h2>
                        <p className="text-gray-600 dark:text-gray-400">Try adjusting your filters or search term</p>
                    </div>) : (<>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredProjects.map((project, index) => (<motion.div key={project._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} onClick={() => setSelectedProject(project)} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:border-indigo-300 dark:hover:border-indigo-600 cursor-pointer transition-all group">
                                    <div className="flex justify-between items-start mb-3">
                                        <h3 className="font-semibold text-gray-800 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition line-clamp-2">
                                            {project.title}
                                        </h3>
                                        <span className={`text-xs px-2 py-1 rounded-full font-medium flex-shrink-0 ml-2 ${getStatusColor(project.status)}`}>
                                            {project.status.replace('_', ' ')}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">{project.description}</p>
                                    <div className="flex flex-wrap gap-1 mb-3">
                                        {project.domain.slice(0, 2).map(d => (<span key={d} className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded">
                                                {d}
                                            </span>))}
                                        {project.domain.length > 2 && (<span className="text-xs px-2 py-1 text-gray-500">+{project.domain.length - 2}</span>)}
                                    </div>
                                    <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                                        <span>{project.batch}</span>
                                        {project.submission && (<span className="flex items-center gap-1">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                                </svg>
                                                Submitted
                                            </span>)}
                                    </div>
                                    {project.status === ProjectStatus.SUBMITTED && !project.grading && (<button onClick={(e) => {
                        e.stopPropagation();
                        openGradingModal(project);
                    }} className="mt-4 w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 rounded-lg font-medium hover:opacity-90 transition shadow-md">
                                            Grade Now
                                        </button>)}
                                </motion.div>))}
                        </div>

                        {/* Pagination */}
                        {pagination && pagination.totalPages > 1 && (<div className="mt-8 flex justify-center items-center gap-2">
                                <button onClick={() => setFilters({ ...filters, page: filters.page - 1 })} disabled={filters.page === 1} className="px-4 py-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                                    Previous
                                </button>
                                <span className="text-gray-600 dark:text-gray-400 text-sm">
                                    Page {pagination.page} of {pagination.totalPages}
                                </span>
                                <button onClick={() => setFilters({ ...filters, page: filters.page + 1 })} disabled={filters.page === pagination.totalPages} className="px-4 py-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                                    Next
                                </button>
                            </div>)}
                    </>)}

                {/* Grading Modal */}
                <AnimatePresence>
                    {showGradingModal && selectedProject && (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setShowGradingModal(false)}>
                            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} onClick={(e) => e.stopPropagation()} className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                                <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">{selectedProject.title}</h2>

                                {selectedProject.submission && (<div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                        <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Submission Details</h3>
                                        <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                                            <p><strong>File:</strong> {selectedProject.submission.originalName}</p>
                                            <p><strong>Pages:</strong> {selectedProject.submission.pageCount || 'N/A'}</p>
                                            <p><strong>Size:</strong> {(selectedProject.submission.size / 1024 / 1024).toFixed(2)} MB</p>
                                            {selectedProject.submission.plagiarismScore !== undefined && (<p>
                                                    <strong>Plagiarism:</strong>{' '}
                                                    <span className={selectedProject.submission.plagiarismScore > 20 ? 'text-red-600' : 'text-green-600'}>
                                                        {selectedProject.submission.plagiarismScore}%
                                                    </span>
                                                </p>)}
                                            <a href={selectedProject.submission.fileUrl} target="_blank" rel="noreferrer" className="inline-block mt-2 text-indigo-600 dark:text-indigo-400 hover:underline">
                                                View Document →
                                            </a>
                                        </div>
                                    </div>)}

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            Score (0-100) *
                                        </label>
                                        <input type="number" min="0" max="100" value={grading.score} onChange={(e) => setGrading({ ...grading, score: Number(e.target.value) })} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none transition"/>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            Feedback *
                                        </label>
                                        <textarea value={grading.feedback} onChange={(e) => setGrading({ ...grading, feedback: e.target.value })} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none transition" rows={4} placeholder="Provide detailed feedback..."/>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                            {grading.feedback.length} characters (minimum 10)
                                        </p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            Final Status
                                        </label>
                                        <select value={grading.status} onChange={(e) => setGrading({ ...grading, status: e.target.value })} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none transition">
                                            <option value={ProjectStatus.GRADED}>Graded (Approved)</option>
                                            <option value={ProjectStatus.CHANGES_REQUESTED}>Changes Requested</option>
                                        </select>
                                    </div>

                                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                                        <button onClick={() => setShowGradingModal(false)} className="px-6 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition" disabled={gradeProject.isPending}>
                                            Cancel
                                        </button>
                                        <button onClick={handleGrade} disabled={gradeProject.isPending} className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed">
                                            {gradeProject.isPending ? 'Submitting...' : 'Submit Grade'}
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>)}
                </AnimatePresence>
            </div>
        </div>);
};
export default ProjectDashboard;


