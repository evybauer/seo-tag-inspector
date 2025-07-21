'use client';

import { Lightbulb, CheckCircle } from 'lucide-react';

interface RecommendationsProps {
  recommendations: string[];
}

export default function Recommendations({ recommendations }: RecommendationsProps) {
  if (recommendations.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
        <div className="flex items-center space-x-2 mb-4">
          <CheckCircle className="h-5 w-5 text-emerald-500" />
          <h3 className="text-xl font-bold text-slate-900">Great Job!</h3>
        </div>
        <p className="text-slate-600">
          Your page has excellent SEO optimization. All major meta tags are properly configured.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Lightbulb className="h-5 w-5 text-amber-500" />
        <h3 className="text-xl font-bold text-slate-900">Recommendations</h3>
      </div>
      <div className="space-y-3">
        {recommendations.map((recommendation, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-2 h-2 bg-slate-400 rounded-full mt-2"></div>
            <p className="text-slate-700">{recommendation}</p>
          </div>
        ))}
      </div>
    </div>
  );
} 