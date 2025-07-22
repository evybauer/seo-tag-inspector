import { ReactNode } from 'react';

interface ToastProps {
  show: boolean;
  message: string;
  icon?: ReactNode;
  color?: 'green' | 'blue' | 'red' | 'yellow';
  position?: 'top' | 'bottom';
}

const colorMap = {
  green: 'bg-green-600',
  blue: 'bg-blue-600',
  red: 'bg-red-600',
  yellow: 'bg-yellow-500',
};

export default function Toast({ show, message, icon, color = 'green', position = 'top' }: ToastProps) {
  if (!show) return null;
  return (
    <div className={`fixed ${position}-6 left-1/2 transform -translate-x-1/2 z-50`}>
      <div className={`${colorMap[color]} text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2 animate-fade-in-out`}>
        {icon}
        <span>{message}</span>
      </div>
    </div>
  );
} 