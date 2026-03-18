import { useState, useEffect, useCallback } from 'react';
import { apiClient } from '@/services/api';
import toast from 'react-hot-toast';
export const useResource = ({ endpoint, autoFetch = true, page = 1, pageSize = 25 }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);
    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const response = await apiClient.get(`${endpoint}?page=${page}&size=${pageSize}`);
            const rawData = response.data.data;
            // Backend can return array directly OR nested under a key (e.g. { students: [...] })
            const key = endpoint.replace(/^\//, ''); // strip leading slash
            const extracted = Array.isArray(rawData)
                ? rawData
                : (Array.isArray(rawData?.[key]) ? rawData[key] : []);
            setData(extracted);
            setTotal(response.data.data.total || 0);
        }
        catch (error) {
            toast.error(error.response?.data?.message || `Failed to fetch ${endpoint}`);
        }
        finally {
            setLoading(false);
        }
    }, [endpoint, page, pageSize]);
    const create = async (payload) => {
        try {
            await apiClient.post(endpoint, payload);
            toast.success('Created successfully');
            await fetchData();
            return true;
        }
        catch (error) {
            toast.error(error.response?.data?.message || 'Failed to create');
            return false;
        }
    };
    const update = async (id, payload) => {
        try {
            await apiClient.put(`${endpoint}/${id}`, payload);
            toast.success('Updated successfully');
            await fetchData();
            return true;
        }
        catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update');
            return false;
        }
    };
    const remove = async (id) => {
        try {
            await apiClient.delete(`${endpoint}/${id}`);
            toast.success('Deleted successfully');
            await fetchData();
            return true;
        }
        catch (error) {
            toast.error(error.response?.data?.message || 'Failed to delete');
            return false;
        }
    };
    useEffect(() => {
        if (autoFetch) {
            fetchData();
        }
    }, [autoFetch, fetchData]);
    return {
        data,
        loading,
        total,
        fetchData,
        create,
        update,
        remove
    };
};
