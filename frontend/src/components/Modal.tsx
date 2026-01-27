import React from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useThemeStore } from '@/store/theme';

interface ModalProps {
  open: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  footer?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export const Modal: React.FC<ModalProps> = ({
  open,
  title,
  children,
  onClose,
  footer,
  size = 'md'
}) => {
  const { isDarkMode } = useThemeStore();

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg'
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`relative w-full mx-4 ${sizeClasses[size]} rounded-2xl shadow-xl ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
              }`}
          >
            <div className={`flex justify-between items-center p-6 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-100'
              }`}>
              <h2 className="text-xl font-bold">{title}</h2>
              <button
                onClick={onClose}
                className={`p-1 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                  }`}
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6">{children}</div>
            {footer && (
              <div className={`p-6 border-t flex gap-4 justify-end ${isDarkMode ? 'border-gray-700' : 'border-gray-100'
                }`}>
                {footer}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
