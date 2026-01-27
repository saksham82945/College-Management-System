import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { projectService } from '../services/project.service';
import toast from 'react-hot-toast';
// Query keys for cache management
export const projectKeys = {
    all: ['projects'],
    lists: () => [...projectKeys.all, 'list'],
    list: (filters) => [...projectKeys.lists(), filters],
    details: () => [...projectKeys.all, 'detail'],
    detail: (id) => [...projectKeys.details(), id],
    myProject: () => [...projectKeys.all, 'my-project'],
};
/**
 * Hook to fetch current user's project
 */
export const useMyProject = () => {
    return useQuery({
        queryKey: projectKeys.myProject(),
        queryFn: async () => {
            const response = await projectService.getMyProject();
            if (!response.success) {
                return null;
            }
            return response.data;
        },
        retry: 1,
        staleTime: 30000, // 30 seconds
    });
};
/**
 * Hook to create a new project
 */
export const useCreateProject = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data) => projectService.createProject(data),
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: projectKeys.myProject() });
            toast.success(response.message || 'Project created successfully!');
        },
        onError: (error) => {
            toast.error(error.message || 'Failed to create project');
        },
    });
};
/**
 * Hook to submit project report
 */
export const useSubmitReport = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }) => projectService.submitReport(id, data),
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: projectKeys.myProject() });
            toast.success(response.message || 'Report submitted successfully!', {
                icon: '🎉',
                duration: 5000,
            });
        },
        onError: (error) => {
            toast.error(error.message || 'Failed to submit report');
        },
    });
};
/**
 * Hook to fetch all projects with filters (Faculty)
 */
export const useProjects = (filters) => {
    return useQuery({
        queryKey: projectKeys.list(filters),
        queryFn: async () => {
            const response = await projectService.getAllProjects(filters);
            return response;
        },
        staleTime: 10000, // 10 seconds
        keepPreviousData: true, // For pagination
    });
};
/**
 * Hook to fetch project by ID
 */
export const useProject = (id, enabled = true) => {
    return useQuery({
        queryKey: projectKeys.detail(id),
        queryFn: async () => {
            const response = await projectService.getProjectById(id);
            return response.data;
        },
        enabled: enabled && !!id,
    });
};
/**
 * Hook to grade a project (Faculty)
 */
export const useGradeProject = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }) => projectService.gradeProject(id, data),
        onSuccess: (response, variables) => {
            queryClient.invalidateQueries({ queryKey: projectKeys.lists() });
            queryClient.invalidateQueries({ queryKey: projectKeys.detail(variables.id) });
            toast.success(response.message || 'Project graded successfully!');
        },
        onError: (error) => {
            toast.error(error.message || 'Failed to grade project');
        },
    });
};
/**
 * Hook for optimistic updates when updating project status
 */
export const useUpdateProjectStatus = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, status }) => {
            // This would be a real API call
            return { success: true, message: 'Status updated' };
        },
        onMutate: async ({ id, status }) => {
            // Cancel any outgoing refetches
            await queryClient.cancelQueries({ queryKey: projectKeys.detail(id) });
            // Snapshot the previous value
            const previousProject = queryClient.getQueryData(projectKeys.detail(id));
            // Optimistically update
            queryClient.setQueryData(projectKeys.detail(id), (old) => ({
                ...old,
                status,
            }));
            return { previousProject };
        },
        onError: (err, variables, context) => {
            // Rollback on error
            if (context?.previousProject) {
                queryClient.setQueryData(projectKeys.detail(variables.id), context.previousProject);
            }
            toast.error('Failed to update status');
        },
        onSettled: (data, error, variables) => {
            queryClient.invalidateQueries({ queryKey: projectKeys.detail(variables.id) });
        },
    });
};
