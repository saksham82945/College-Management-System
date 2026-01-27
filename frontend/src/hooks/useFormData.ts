import { useState } from 'react';

export const useFormData = <T extends Record<string, any>>(initialState: T) => {
    const [formData, setFormData] = useState<T>(initialState);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        // Handle nested properties (e.g., "address.street")
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData(prev => ({
                ...prev,
                [parent]: {
                    ...(prev[parent] as any),
                    [child]: value
                }
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const reset = () => setFormData(initialState);

    const setField = (name: string, value: any) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return {
        formData,
        handleChange,
        reset,
        setField,
        setFormData
    };
};
