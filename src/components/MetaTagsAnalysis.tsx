'use client';

import { useState } from 'react';
import { CheckCircle, XCircle, AlertCircle, Info } from 'lucide-react';
import { SEOMetaTag } from '@/types/seo';

interface MetaTagsAnalysisProps {
  metaTags: SEOMetaTag[];
}

export default function MetaTagsAnalysis({ metaTags }: MetaTagsAnalysisProps) {
  const [expandedCards, setExpandedCards] = useState<number[]>([]);

  const toggleCard = (index: number) => {
    setExpandedCards(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present':
        return <CheckCircle className="h-6 w-6 text-emerald-500" />;
      case 'missing':
        return <XCircle className="h-6 w-6 text-rose-500" />;
      case 'invalid':
        return <AlertCircle className="h-6 w-6 text-amber-500" />;
      default:
        return <AlertCircle className="h-6 w-6 text-slate-500" />;
    }
  };

  const getStatusColor = (status: string, score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100;
    
    if (percentage >= 80) {
      return 'border-l-emerald-500 bg-emerald-50';
    } else if (percentage >= 60) {
      return 'border-l-blue-500 bg-blue-50';
    } else if (percentage >= 40) {
      return 'border-l-amber-500 bg-amber-50';
    } else {
      return 'border-l-rose-500 bg-rose-50';
    }
  };

  const getScoreColor = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 80) return 'bg-emerald-500 text-white';
    if (percentage >= 60) return 'bg-blue-500 text-white';
    if (percentage >= 40) return 'bg-amber-500 text-white';
    return 'bg-rose-500 text-white';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-slate-100 rounded-lg">
          <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900">Meta Tags Analysis</h3>
          <p className="text-sm text-slate-600">Detailed breakdown of your page&apos;s SEO elements</p>
        </div>
      </div>

      <div className="space-y-4">
        {metaTags.map((tag, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg border-l-4 ${getStatusColor(tag.status, tag.score, tag.maxScore)}`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  {getStatusIcon(tag.status)}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-lg">{tag.name}</h4>
                  <p className="text-sm text-slate-500">SEO Element</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                {tag.bestPractice && (
                  <button
                    onClick={() => toggleCard(index)}
                    className={`p-2 transition-all duration-200 rounded-lg ${
                      expandedCards.includes(index)
                        ? 'text-blue-600 bg-blue-100'
                        : 'text-slate-400 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                    title="Show more details"
                  >
                    <Info className="h-5 w-5" />
                  </button>
                )}
                <span className={`text-sm px-3 py-2 rounded-lg font-semibold ${getScoreColor(tag.score, tag.maxScore)}`}>
                  {tag.score}/{tag.maxScore}
                </span>
              </div>
            </div>

            {/* Content Display */}
            {tag.content && (
              <div className="mb-4">
                <div className="bg-white rounded-lg p-3 border border-slate-200">
                  <p className="text-sm text-slate-800 font-mono break-all leading-relaxed">
                    {tag.content}
                  </p>
                </div>
              </div>
            )}

            {/* Feedback Message */}
            <div className="mb-4">
              <div className="bg-white rounded-lg p-3 border border-slate-200">
                <div className="flex items-start space-x-3">
                  <div className="p-1 bg-slate-100 rounded">
                    <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-slate-600 font-semibold mb-1 uppercase tracking-wider">Status</p>
                    <p className="text-sm text-slate-800 leading-relaxed">{tag.feedback}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Best Practice Info - Collapsible */}
            {tag.bestPractice && expandedCards.includes(index) && (
              <div className="mb-4">
                <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                  <div className="flex items-start space-x-3">
                    <div className="p-1 bg-blue-100 rounded">
                      <Info className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs text-blue-600 font-semibold mb-1 uppercase tracking-wider">Best Practice</p>
                      <p className="text-sm text-blue-800 leading-relaxed">{tag.bestPractice}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Improvement Suggestions - Only for Non-Perfect Scores */}
            {tag.score < tag.maxScore && (
              <div>
                <div className="bg-amber-50 rounded-lg p-3 border border-amber-200">
                  <div className="flex items-start space-x-3">
                    <div className="p-1 bg-amber-100 rounded">
                      <AlertCircle className="w-4 h-4 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-xs text-amber-600 font-semibold mb-1 uppercase tracking-wider">Suggestion</p>
                      <div className="text-sm text-amber-800">
                        {tag.name === 'Title' && tag.score < 10 && (
                          <p>Optimize title length (current: <span className="font-bold bg-amber-200 px-2 py-1 rounded">{tag.content?.length || 0}</span> chars)</p>
                        )}
                        {tag.name === 'Meta Description' && tag.score < 10 && (
                          <p>Add a compelling meta description to improve click-through rates</p>
                        )}
                        {tag.name === 'Open Graph Tags' && tag.score < 10 && (
                          <p>Add Open Graph tags for better social media sharing</p>
                        )}
                        {tag.name === 'Twitter Card Tags' && tag.score < 10 && (
                          <p>Add Twitter Card tags for better Twitter sharing</p>
                        )}
                        {tag.name === 'H1 Tags' && tag.score < 5 && (
                          <p>Add an H1 tag to improve page structure and SEO</p>
                        )}
                        {tag.name === 'Canonical URL' && tag.score < 5 && (
                          <p>Add a canonical URL to prevent duplicate content issues and improve SEO</p>
                        )}
                        {(tag.name === 'Robots' || tag.name === 'Robots Meta') && tag.score < 5 && (
                          <p>Add robots meta tag to control search engine crawling and indexing</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 