import { ReactNode } from 'react';

interface PrimaryButtonProps {
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}

export default function PrimaryButton({ onClick, disabled, loading, icon, children, className = '' }: PrimaryButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white font-bold py-3 px-8 rounded-md transition-colors shadow-lg flex items-center space-x-2 mx-auto ${className}`}
    >
      {icon && <span>{icon}</span>}
      <span>{children}</span>
      {loading && (
        <svg className="w-5 h-5 animate-spin ml-2" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
        </svg>
      )}
    </button>
  );
} 