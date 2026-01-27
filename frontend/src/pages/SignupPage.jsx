import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { apiClient } from '@/services/api';
import toast from 'react-hot-toast';
import { UserPlus, Eye, EyeOff } from 'lucide-react';
const signupSchema = Yup.object().shape({
    fullName: Yup.string().required('Full name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Confirm password is required'),
});
export const SignupPage = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
    const formik = useFormik({
        initialValues: {
            fullName: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: signupSchema,
        onSubmit: async (values) => {
            try {
                await apiClient.post('/auth/register', {
                    fullName: values.fullName,
                    email: values.email,
                    password: values.password,
                });
                toast.success('Account created successfully! Please login.');
                navigate('/login');
            }
            catch (error) {
                toast.error(error.response?.data?.message || 'Failed to create account');
            }
        },
    });
    return (<div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
                <div className="text-center mb-8">
                    <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <UserPlus className="text-white text-3xl"/>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900">Create Account</h1>
                    <p className="text-gray-600 mt-2">Sign up to get started</p>
                </div>

                <form onSubmit={formik.handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name
                        </label>
                        <input type="text" name="fullName" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.fullName} className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${formik.touched.fullName && formik.errors.fullName
            ? 'border-red-500'
            : 'border-gray-300'}`} placeholder="John Doe"/>
                        {formik.touched.fullName && formik.errors.fullName && (<p className="mt-1 text-sm text-red-500">{formik.errors.fullName}</p>)}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address
                        </label>
                        <input type="email" name="email" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${formik.touched.email && formik.errors.email
            ? 'border-red-500'
            : 'border-gray-300'}`} placeholder="you@example.com"/>
                        {formik.touched.email && formik.errors.email && (<p className="mt-1 text-sm text-red-500">{formik.errors.email}</p>)}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <div className="relative">
                            <input type={showPassword ? "text" : "password"} name="password" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${formik.touched.password && formik.errors.password
            ? 'border-red-500'
            : 'border-gray-300'}`} placeholder="••••••••"/>
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors focus:outline-none">
                                {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
                            </button>
                        </div>
                        {formik.touched.password && formik.errors.password && (<p className="mt-1 text-sm text-red-500">{formik.errors.password}</p>)}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Confirm Password
                        </label>
                        <div className="relative">
                            <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.confirmPassword} className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${formik.touched.confirmPassword && formik.errors.confirmPassword
            ? 'border-red-500'
            : 'border-gray-300'}`} placeholder="••••••••"/>
                            <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors focus:outline-none">
                                {showConfirmPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
                            </button>
                        </div>
                        {formik.touched.confirmPassword && formik.errors.confirmPassword && (<p className="mt-1 text-sm text-red-500">
                                {formik.errors.confirmPassword}
                            </p>)}
                    </div>

                    <button type="submit" disabled={formik.isSubmitting} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2">
                        {formik.isSubmitting ? ('Creating Account...') : (<>
                                <UserPlus size={20}/>
                                Create Account
                            </>)}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-gray-600">
                        Already have an account?{' '}
                        <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>);
};
