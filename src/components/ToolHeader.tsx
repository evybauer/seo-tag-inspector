'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { ReactNode } from 'react';

interface ToolHeaderProps {
  title: string;
  description: string;
  icon: ReactNode;
}

export default function ToolHeader({ title, description, icon }: ToolHeaderProps) {
  return (
    <header className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center space-x-4">
          <Link 
            href="/" 
            className="flex items-center space-x-2 text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to SEO Toolbox</span>
          </Link>
          <div className="flex-1 text-center">
            <div className="flex flex-col items-center mb-2">
              <div className="bg-blue-100 p-3 rounded-full mb-3">
                {icon}
              </div>
              <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
            </div>
            <p className="text-slate-600 max-w-2xl mx-auto">{description}</p>
          </div>
        </div>
      </div>
    </header>
  );
} 