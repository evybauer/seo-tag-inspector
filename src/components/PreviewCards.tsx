'use client';

import { Search, Facebook, Twitter } from 'lucide-react';
import { SEOAnalysis } from '@/types/seo';

interface PreviewCardsProps {
  analysis: SEOAnalysis;
}

export default function PreviewCards({ analysis }: PreviewCardsProps) {
  const googlePreview = {
    title: analysis.title || 'No title available',
    url: analysis.url,
    description: analysis.description || 'No description available'
  };

  const facebookPreview = {
    title: analysis.openGraph.title || analysis.title || 'No title available',
    description: analysis.openGraph.description || analysis.description || 'No description available',
    image: analysis.openGraph.image || '/placeholder-image.jpg',
    url: analysis.openGraph.url || analysis.url
  };

  const twitterPreview = {
    title: analysis.twitter.title || analysis.title || 'No title available',
    description: analysis.twitter.description || analysis.description || 'No description available',
    image: analysis.twitter.image || '/placeholder-image.jpg',
    url: analysis.url
  };

  return (
    <div className="space-y-6">
      {/* Google Search Preview */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Search className="h-5 w-5 text-slate-600" />
          <h3 className="text-xl font-bold text-slate-900">Google Search Preview</h3>
        </div>
        <div className="border border-slate-200 rounded-lg p-4 bg-slate-50">
          <div className="space-y-2">
            <div className="text-sm text-emerald-700 font-medium break-all overflow-x-auto">
              {googlePreview.url}
            </div>
            <div className="text-lg text-blue-600 font-medium hover:underline cursor-pointer break-all overflow-x-auto">
              {googlePreview.title}
            </div>
            <div className="text-sm text-slate-600 break-words">
              {googlePreview.description}
            </div>
          </div>
        </div>
      </div>

      {/* Facebook Preview */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Facebook className="h-5 w-5 text-blue-600" />
          <h3 className="text-xl font-bold text-slate-900">Facebook Preview</h3>
        </div>
        <div className="border border-slate-200 rounded-lg overflow-hidden max-w-sm">
          <div className="aspect-video bg-slate-200 relative">
            {facebookPreview.image && (
              <img
                src={facebookPreview.image}
                alt="Facebook preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            )}
          </div>
          <div className="p-3">
            <div className="text-sm text-slate-500 mb-1 break-all overflow-x-auto">
              {facebookPreview.url}
            </div>
            <div className="font-semibold text-slate-900 mb-1 line-clamp-2 break-all overflow-x-auto">
              {facebookPreview.title}
            </div>
            <div className="text-sm text-slate-600 line-clamp-2 break-words">
              {facebookPreview.description}
            </div>
          </div>
        </div>
      </div>

      {/* Twitter Preview */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Twitter className="h-5 w-5 text-blue-400" />
          <h3 className="text-xl font-bold text-slate-900">Twitter Preview</h3>
        </div>
        <div className="border border-slate-200 rounded-lg overflow-hidden max-w-sm">
          <div className="aspect-video bg-slate-200 relative">
            {twitterPreview.image && (
              <img
                src={twitterPreview.image}
                alt="Twitter preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            )}
          </div>
          <div className="p-3">
            <div className="text-sm text-slate-500 mb-1 break-all overflow-x-auto">
              {twitterPreview.url}
            </div>
            <div className="font-semibold text-slate-900 mb-1 line-clamp-2 break-all overflow-x-auto">
              {twitterPreview.title}
            </div>
            <div className="text-sm text-slate-600 line-clamp-2 break-words">
              {twitterPreview.description}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 