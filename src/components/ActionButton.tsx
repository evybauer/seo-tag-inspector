import { ReactNode } from 'react';

interface ActionButtonProps {
  onClick: () => void;
  icon: ReactNode;
  label: string;
  color?: 'blue' | 'green' | 'purple';
  className?: string;
  disabled?: boolean;
}

const colorMap = {
  blue: 'bg-blue-600 hover:bg-blue-700',
  green: 'bg-green-600 hover:bg-green-700',
  purple: 'bg-purple-600 hover:bg-purple-700',
};

export default function ActionButton({ onClick, icon, label, color = 'blue', className = '', disabled }: ActionButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center space-x-2 px-3 py-2 ${colorMap[color]} text-white rounded-md transition-colors text-sm ${className}`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
} 