import React from 'react';
export const Skeleton = ({ className = '', variant = 'rectangular', width, height, count = 1, }) => {
    const baseClasses = 'animate-pulse bg-gray-200 dark:bg-gray-700';
    const variantClasses = {
        text: 'h-4 rounded',
        rectangular: 'rounded-lg',
        circular: 'rounded-full',
    };
    const skeletonStyle = {
        width: width || '100%',
        height: height || (variant === 'text' ? '1rem' : '100%'),
    };
    const skeletons = Array.from({ length: count }, (_, i) => (<div key={i} className={`${baseClasses} ${variantClasses[variant]} ${className} ${i > 0 ? 'mt-2' : ''}`} style={skeletonStyle}/>));
    return <>{skeletons}</>;
};
export const ProjectCardSkeleton = () => {
    return (<div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                    <Skeleton variant="text" width="60%" height={24} className="mb-2"/>
                    <Skeleton variant="text" width="40%" height={16}/>
                </div>
                <Skeleton variant="rectangular" width={80} height={24}/>
            </div>
            <Skeleton variant="text" count={2} height={16} className="mb-4"/>
            <div className="flex gap-2">
                <Skeleton variant="rectangular" width={60} height={24}/>
                <Skeleton variant="rectangular" width={80} height={24}/>
            </div>
        </div>);
};
export const ProjectDetailsSkeleton = () => {
    return (<div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
                <Skeleton variant="text" width="40%" height={32} className="mb-4"/>
                <Skeleton variant="text" count={3} height={16} className="mb-6"/>
                <div className="flex gap-4">
                    <Skeleton variant="rectangular" width={120} height={40}/>
                    <Skeleton variant="rectangular" width={120} height={40}/>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
                <Skeleton variant="text" width="30%" height={24} className="mb-4"/>
                <Skeleton variant="rectangular" height={200}/>
            </div>
        </div>);
};
export const TableSkeleton = ({ rows = 5, columns = 4, }) => {
    return (<div className="space-y-3">
            {Array.from({ length: rows }, (_, rowIndex) => (<div key={rowIndex} className="flex gap-4">
                    {Array.from({ length: columns }, (_, colIndex) => (<Skeleton key={colIndex} variant="rectangular" height={40} className="flex-1"/>))}
                </div>))}
        </div>);
};
