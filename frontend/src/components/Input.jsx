import React from 'react';
import { Eye, EyeOff } from 'lucide-react';
export const Input = ({ label, error, helperText, className, id, type, ...props }) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const isPassword = type === 'password';
    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;
    return (<div className="w-full relative">
      {label && (<label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>)}
      <div className="relative">
        <input id={id} type={inputType} className={`
            w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 
            ${error ? 'border-red-500' : 'border-gray-300'}
            ${className}
          `} {...props}/>
        {isPassword && (<button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors focus:outline-none">
            {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
          </button>)}
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      {helperText && <p className="text-gray-500 text-sm mt-1">{helperText}</p>}
    </div>);
};
