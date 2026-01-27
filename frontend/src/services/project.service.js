import axios from './api';
const API_URL = '/projects';
export const projectService = {
    /**
     * Create a new project (Student)
     */
    createProject: async (data) => {
        try {
            const response = await axios.post(API_URL, data);
            return response.data;
        }
        catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to create project');
        }
    },
    /**
     * Get current user's project (Student)
     */
    getMyProject: async () => {
        try {
            const response = await axios.get(`${API_URL}/my-project`);
            return response.data;
        }
        catch (error) {
            if (error.response?.status === 404) {
                return { success: false, message: 'No project found' };
            }
            throw new Error(error.response?.data?.message || 'Failed to fetch project');
        }
    },
    /**
     * Submit project report (Student)
     */
    submitReport: async (id, fileData) => {
        try {
            const response = await axios.post(`${API_URL}/${id}/submit`, fileData);
            return response.data;
        }
        catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to submit report');
        }
    },
    /**
     * Get all projects with filters (Faculty)
     */
    getAllProjects: async (filters = {}) => {
        try {
            const response = await axios.get(API_URL, { params: filters });
            return response.data;
        }
        catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to fetch projects');
        }
    },
    /**
     * Get project by ID
     */
    getProjectById: async (id) => {
        try {
            const response = await axios.get(`${API_URL}/${id}`);
            return response.data;
        }
        catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to fetch project');
        }
    },
    /**
     * Grade a project (Faculty)
     */
    gradeProject: async (id, gradeData) => {
        try {
            const response = await axios.post(`${API_URL}/${id}/grade`, gradeData);
            return response.data;
        }
        catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to grade project');
        }
    },
    /**
     * Export projects to CSV (Faculty)
     */
    exportToCSV: async (filters = {}) => {
        try {
            const response = await axios.get(`${API_URL}/export/csv`, {
                params: filters,
                responseType: 'blob'
            });
            return response.data;
        }
        catch (error) {
            throw new Error('Failed to export projects');
        }
    }
};
