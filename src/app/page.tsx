'use client';

import { useState, useEffect } from 'react';
import { SEOAnalysis } from '@/types/seo';
import UrlInput from '@/components/UrlInput';
import SeoScore from '@/components/SeoScore';
import MetaTagsAnalysis from '@/components/MetaTagsAnalysis';
import PreviewCards from '@/components/PreviewCards';
import Recommendations from '@/components/Recommendations';
import ExportButtons from '@/components/ExportButtons';
import { AlertCircle, CheckCircle } from 'lucide-react';

export default function Home() {
  const [analysis, setAnalysis] = useState<SEOAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSharedLink, setIsSharedLink] = useState(false);

  // Handle shared links on page load
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const shareData = urlParams.get('share');
    
    if (shareData) {
      try {
        const decodedData = JSON.parse(atob(shareData));
        
        // Reconstruct the full analysis object from shared data
        const sharedAnalysis: SEOAnalysis = {
          url: decodedData.url,
          title: decodedData.title || '',
          description: decodedData.description || '',
          metaTags: decodedData.metaTags || [],
          openGraph: {
            title: decodedData.title,
            description: decodedData.description,
            image: '',
            url: decodedData.url,
            type: ''
          },
          twitter: {
            card: '',
            title: decodedData.title,
            description: decodedData.description,
            image: '',
            creator: ''
          },
          canonical: '',
          h1Tags: [],
          robots: '',
          score: decodedData.score,
          recommendations: decodedData.recommendations || []
        };
        
        setAnalysis(sharedAnalysis);
        setIsSharedLink(true);
      } catch (error) {
        console.error('Error parsing shared link:', error);
        setError('Invalid or corrupted share link.');
      }
    }
  }, []);

  const handleAnalyze = async (url: string) => {
    setIsLoading(true);
    setError('');
    setAnalysis(null);
    setIsSharedLink(false);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to analyze URL');
      }

      const data = await response.json();
      setAnalysis(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setAnalysis(null);
    setError('');
    setIsSharedLink(false);
    // Clear any shared link from URL
    if (window.history.replaceState) {
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header Banner */}
      <header className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-50">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30px_30px,rgba(255,255,255,0.1)_2px,transparent_2px)] bg-[length:60px_60px]"></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="text-center">
            {/* Logo and Title */}
            <div className="flex flex-col sm:flex-row items-center justify-center mb-8 space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 shadow-xl">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h1 className="text-4xl sm:text-6xl font-bold text-white tracking-tight mb-2">
                  TagSnippet
                </h1>
                <div className="w-16 h-1 bg-gradient-to-r from-blue-400 to-indigo-400 mx-auto rounded-full"></div>
              </div>
            </div>
            
            {/* Description */}
            <p className="text-lg sm:text-xl text-slate-200 font-normal max-w-3xl mx-auto leading-relaxed mb-10">
              Analyze and optimize your website&apos;s SEO meta tags with 
              <span className="font-semibold text-white"> professional insights</span> and 
              <span className="font-semibold text-white"> actionable recommendations</span>
            </p>
            
            {/* Feature Pills */}
            <div className="flex flex-wrap items-center justify-center gap-3 text-slate-200">
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                <svg className="w-4 h-4 text-blue-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium">Instant Analysis</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                <svg className="w-4 h-4 text-blue-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium">Professional Reports</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                <svg className="w-4 h-4 text-blue-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium">Actionable Insights</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* URL Input */}
        <div className="mb-8">
          <UrlInput onAnalyze={handleAnalyze} onClear={handleClear} isLoading={isLoading} />
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-8 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-red-500" />
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        )}

        {/* Analysis Results */}
        {analysis && (
          <div id="seo-analysis-report" className="space-y-8">
            {/* Success Message */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-emerald-500" />
                <p className="text-emerald-700">
                  {isSharedLink ? (
                    <>Shared analysis for <span className="font-medium">{analysis.url}</span></>
                  ) : (
                    <>Successfully analyzed <span className="font-medium">{analysis.url}</span></>
                  )}
                </p>
              </div>
            </div>

            {/* Export Buttons */}
            <div className="flex justify-end">
              <ExportButtons analysis={analysis} />
            </div>

            {/* SEO Score */}
            <SeoScore score={analysis.score} />

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Meta Tags Analysis */}
              <MetaTagsAnalysis metaTags={analysis.metaTags} />

              {/* Right Column: Recommendations + Preview Cards */}
              <div className="space-y-8">
                {/* Recommendations */}
                <Recommendations recommendations={analysis.recommendations} />
                
                {/* Preview Cards */}
                <PreviewCards analysis={analysis} />
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-600 mx-auto mb-4"></div>
            <p className="text-slate-600">Analyzing your website...</p>
          </div>
        )}

        {/* Empty State */}
        {!analysis && !isLoading && !error && (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="bg-slate-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-slate-900 mb-2">
                Ready to analyze your website?
              </h3>
              <p className="text-slate-600">
                Enter a URL above to get started with your SEO analysis. We&apos;ll check your meta tags, 
                social media optimization, and provide actionable recommendations.
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-slate-600">
            <p>&copy; 2025 TagSnippet. Built with Next.js and Tailwind CSS.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
