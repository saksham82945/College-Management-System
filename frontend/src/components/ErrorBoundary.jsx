import React from 'react';
import { useNavigate } from 'react-router-dom';

// Class component required for error boundaries
class ErrorBoundaryClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, info) {
        console.error('ErrorBoundary caught:', error, info);
    }

    reset() {
        this.setState({ hasError: false, error: null });
    }

    render() {
        if (this.state.hasError) {
            return (
                <ErrorFallback
                    error={this.state.error}
                    onReset={() => this.reset()}
                />
            );
        }
        return this.props.children;
    }
}

function ErrorFallback({ error, onReset }) {
    const navigate = useNavigate();

    const handleBack = () => {
        onReset();
        navigate(-1);
    };

    const handleHome = () => {
        onReset();
        navigate('/dashboard');
    };

    return (
        <div className="min-h-[60vh] flex items-center justify-center p-8">
            <div className="max-w-md w-full text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-500 to-pink-600 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-red-500/30">
                    <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                    </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Something went wrong</h2>
                <p className="text-gray-500 mb-2 text-sm">
                    This page encountered an error. Other sections of the app are unaffected.
                </p>
                {error?.message && (
                    <code className="block bg-gray-100 text-red-600 text-xs rounded-lg p-3 mb-6 text-left overflow-auto">
                        {error.message}
                    </code>
                )}
                <div className="flex gap-3 justify-center">
                    <button
                        onClick={handleBack}
                        className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 font-medium transition-colors"
                    >
                        ← Go Back
                    </button>
                    <button
                        onClick={handleHome}
                        className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium hover:shadow-lg transition-all"
                    >
                        Go to Dashboard
                    </button>
                </div>
            </div>
        </div>
    );
}

export const ErrorBoundary = ErrorBoundaryClass;
