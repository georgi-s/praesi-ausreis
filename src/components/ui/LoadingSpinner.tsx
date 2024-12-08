import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  return (
    <div
      className={`
        relative
        ${sizeClasses[size]}
        ${className}
      `}
      role="status"
      aria-label="Laden"
    >
      {/* Äußerer Ring */}
      <div className="absolute inset-0 rounded-full border-2 border-gray-200" />
      
      {/* Animierter Ring */}
      <div
        className={`
          absolute inset-0
          rounded-full
          border-2 border-transparent
          border-t-blue-500
          animate-spin-fast
        `}
      />

      {/* Innerer Punkt */}
      <div className="absolute inset-[25%] rounded-full bg-blue-500 animate-pulse" />
      
      <span className="sr-only">Laden...</span>
    </div>
  );
};
