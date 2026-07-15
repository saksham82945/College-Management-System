import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/services/api';

const NOTIFICATIONS_KEY = ['notifications'];

// Fetch all notifications
const fetchNotifications = async () => {
    const { data } = await api.get('/notifications');
    return data?.data || data || [];
};

// Mark one as read
const markOneRead = async (id) => {
    const { data } = await api.put(`/notifications/${id}/read`);
    return data;
};

// Mark all as read
const markAllRead = async () => {
    const { data } = await api.put('/notifications/read-all');
    return data;
};

// Delete a notification
const deleteOne = async (id) => {
    const { data } = await api.delete(`/notifications/${id}`);
    return data;
};

export function useNotifications() {
    const queryClient = useQueryClient();

    const { data: notifications = [], isLoading, isError } = useQuery({
        queryKey: NOTIFICATIONS_KEY,
        queryFn: fetchNotifications,
        refetchInterval: 30_000, // auto-refetch every 30 seconds
        staleTime: 15_000,
    });

    const unreadCount = notifications.filter((n) => !n.isRead).length;

    const markReadMutation = useMutation({
        mutationFn: markOneRead,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: NOTIFICATIONS_KEY }),
    });

    const markAllReadMutation = useMutation({
        mutationFn: markAllRead,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: NOTIFICATIONS_KEY }),
    });

    const deleteMutation = useMutation({
        mutationFn: deleteOne,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: NOTIFICATIONS_KEY }),
    });

    return {
        notifications,
        unreadCount,
        isLoading,
        isError,
        markRead: markReadMutation.mutate,
        markAllRead: markAllReadMutation.mutate,
        deleteNotification: deleteMutation.mutate,
    };
}
