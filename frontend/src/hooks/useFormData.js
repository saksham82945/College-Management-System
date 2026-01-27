import { useState } from 'react';
export const useFormData = (initialState) => {
    const [formData, setFormData] = useState(initialState);
    const handleChange = (e) => {
        const { name, value } = e.target;
        // Handle nested properties (e.g., "address.street")
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData(prev => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: value
                }
            }));
        }
        else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };
    const reset = () => setFormData(initialState);
    const setField = (name, value) => {
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
