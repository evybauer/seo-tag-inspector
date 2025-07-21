'use client';

import { TrendingUp, Share2, Settings } from 'lucide-react';

interface SeoScoreProps {
  score: {
    total: number;
    searchOptimization: number;
    socialPreview: number;
    technicalStructure: number;
  };
}

export default function SeoScore({ score }: SeoScoreProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-600 bg-emerald-100';
    if (score >= 60) return 'text-blue-600 bg-blue-100';
    if (score >= 40) return 'text-amber-600 bg-amber-100';
    return 'text-rose-600 bg-rose-100';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Poor';
  };

  const categories = [
    {
      name: 'Search Optimization',
      score: score.searchOptimization,
      maxScore: 50,
      icon: TrendingUp,
      description: 'Title, description, and basic SEO elements'
    },
    {
      name: 'Social Preview',
      score: score.socialPreview,
      maxScore: 30,
      icon: Share2,
      description: 'Open Graph and Twitter Card tags'
    },
    {
      name: 'Technical Structure',
      score: score.technicalStructure,
      maxScore: 20,
      icon: Settings,
      description: 'Canonical URLs, robots, and H1 tags'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 space-y-6">
      {/* Overall Score */}
      <div className="text-center">
        <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full ${getScoreColor(score.total)} mb-4`}>
          <span className="text-3xl font-bold">{score.total}</span>
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          {getScoreLabel(score.total)} SEO Score
        </h2>
        <p className="text-slate-600">Out of 100 points</p>
      </div>

      {/* Category Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((category) => {
          const percentage = (category.score / category.maxScore) * 100;
          const Icon = category.icon;
          
          return (
            <div key={category.name} className="bg-slate-50 rounded-lg p-4 space-y-3 border border-slate-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    <Icon className="h-5 w-5 text-slate-600" />
                  </div>
                  <span className="font-medium text-slate-900">{category.name}</span>
                </div>
                <span className={`text-sm px-3 py-2 rounded-lg font-semibold ${
                  percentage >= 80 ? 'bg-emerald-500 text-white' :
                  percentage >= 60 ? 'bg-blue-500 text-white' :
                  percentage >= 40 ? 'bg-amber-500 text-white' : 'bg-rose-500 text-white'
                }`}>
                  {category.score}/{category.maxScore}
                </span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${
                    percentage >= 80 ? 'bg-emerald-500' :
                    percentage >= 60 ? 'bg-blue-500' :
                    percentage >= 40 ? 'bg-amber-500' : 'bg-rose-500'
                  }`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{category.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
} 