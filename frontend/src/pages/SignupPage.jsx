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
                    roleName: 'STUDENT',
                });
                toast.success('Registration successful. Please sign in to your account.');
                navigate('/login');
            }
            catch (error) {
                toast.error(error.response?.data?.message || 'Registration Failed');
            }
        },
    });
    return (<div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
                <div className="text-center mb-8">
                    <div className="bg-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <UserPlus className="text-white text-3xl"/>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Account Registration</h1>
                    <p className="text-gray-600 mt-2 text-sm font-medium">Register for institutional access</p>
                </div>

                <form onSubmit={formik.handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">
                            Full Name
                        </label>
                        <input type="text" name="fullName" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.fullName} className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all ${formik.touched.fullName && formik.errors.fullName
            ? 'border-red-500'
            : 'border-gray-300'}`} placeholder="Full Name"/>
                        {formik.touched.fullName && formik.errors.fullName && (<p className="mt-1 text-xs text-red-500 font-medium">{formik.errors.fullName}</p>)}
                    </div>

                    <div>
                        <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">
                            Email Address
                        </label>
                        <input type="email" name="email" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all ${formik.touched.email && formik.errors.email
            ? 'border-red-500'
            : 'border-gray-300'}`} placeholder="email@lnmi.ac.in"/>
                        {formik.touched.email && formik.errors.email && (<p className="mt-1 text-xs text-red-500 font-medium">{formik.errors.email}</p>)}
                    </div>

                    <div>
                        <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">
                            Password
                        </label>
                        <div className="relative">
                            <input type={showPassword ? "text" : "password"} name="password" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all ${formik.touched.password && formik.errors.password
            ? 'border-red-500'
            : 'border-gray-300'}`} placeholder="••••••••"/>
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors focus:outline-none">
                                {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
                            </button>
                        </div>
                        {formik.touched.password && formik.errors.password && (<p className="mt-1 text-xs text-red-500 font-medium">{formik.errors.password}</p>)}
                    </div>

                    <div>
                        <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">
                            Confirm Password
                        </label>
                        <div className="relative">
                            <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.confirmPassword} className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all ${formik.touched.confirmPassword && formik.errors.confirmPassword
            ? 'border-red-500'
            : 'border-gray-300'}`} placeholder="••••••••"/>
                            <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors focus:outline-none">
                                {showConfirmPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
                            </button>
                        </div>
                        {formik.touched.confirmPassword && formik.errors.confirmPassword && (<p className="mt-1 text-xs text-red-500 font-medium">
                                {formik.errors.confirmPassword}
                            </p>)}
                    </div>

                    <button type="submit" disabled={formik.isSubmitting} className="w-full bg-primary hover:bg-primary-dark text-white font-black text-xs uppercase tracking-widest py-3.5 rounded-lg transition-all flex items-center justify-center gap-2 active:scale-95 shadow-lg shadow-primary/20">
                        {formik.isSubmitting ? ('Processing...') : (<>
                                <UserPlus size={18}/>
                                Register Account
                            </>)}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-gray-600 text-sm font-medium">
                        Already have an account?{' '}
                        <Link to="/login" className="text-primary hover:text-primary-dark font-black tracking-tight underline underline-offset-4">
                            Log In
                        </Link>
                    </p>
                </div>
            </div>
        </div>);
};
