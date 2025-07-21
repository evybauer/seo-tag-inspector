'use client';

import { useState } from 'react';
import { Search, Loader2, X } from 'lucide-react';

interface UrlInputProps {
  onAnalyze: (url: string) => void;
  onClear: () => void;
  isLoading: boolean;
}

export default function UrlInput({ onAnalyze, onClear, isLoading }: UrlInputProps) {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!url.trim()) {
      setError('Please enter a URL');
      return;
    }

    // Basic URL validation
    try {
      new URL(url);
    } catch {
      setError('Please enter a valid URL (e.g., https://example.com)');
      return;
    }

    onAnalyze(url.trim());
  };

  const handleClear = () => {
    setUrl('');
    setError('');
    onClear(); // Reset the entire page state
  };

  return (
    <div className="w-full min-w-[30vw] max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter website URL (e.g., example.com)"
            className="block w-full pl-10 pr-32 py-4 text-lg border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-900 placeholder-slate-500"
            disabled={isLoading}
          />
          
          {/* Clear button */}
          {url && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute inset-y-0 right-24 px-3 flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-700 transition-all duration-200 mx-3 my-1 rounded-lg"
              disabled={isLoading}
              title="Clear URL"
            >
              <X className="h-5 w-5" />
            </button>
          )}
          
          {/* Analyze button */}
          <button
            type="submit"
            disabled={isLoading || !url.trim()}
            className="absolute inset-y-0 right-0 px-6 flex items-center bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white font-medium text-lg rounded-r-lg transition-colors"
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              'Analyze'
            )}
          </button>
        </div>
        {error && (
          <p className="text-red-600 text-sm">{error}</p>
        )}
      </form>
    </div>
  );
} 