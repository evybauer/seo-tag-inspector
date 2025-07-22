'use client';

import { useState } from 'react';
import { Search, Globe, TrendingUp, AlertCircle } from 'lucide-react';
import ToolHeader from '@/components/ToolHeader';
import SeoScore from '@/components/SeoScore';
import MetaTagsAnalysis from '@/components/MetaTagsAnalysis';
import Recommendations from '@/components/Recommendations';
import PreviewCards from '@/components/PreviewCards';
import ExportButtons from '@/components/ExportButtons';
import DetailedReport from '@/components/DetailedReport';
import Toast from '@/components/Toast';
import { SEOAnalysis } from '@/types/seo';

export default function SeoAnalysis() {
  const [url, setUrl] = useState('');
  const [analysis, setAnalysis] = useState<SEOAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [showReport, setShowReport] = useState(false);

  const analyzeUrl = async () => {
    if (!url.trim()) {
      setError('Please enter a URL to analyze');
      return;
    }

    // Basic URL validation
    try {
      new URL(url.startsWith('http') ? url : `https://${url}`);
    } catch {
      setError('Please enter a valid URL');
      return;
    }

    setIsAnalyzing(true);
    setError('');
    setAnalysis(null);
    setShowReport(false);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: url.startsWith('http') ? url : `https://${url}` }),
      });

      if (!response.ok) {
        throw new Error('Failed to analyze URL');
      }

      const data = await response.json();
      setAnalysis(data);
    } catch (err) {
      setError('Failed to analyze the URL. Please check the URL and try again.');
      console.error('Analysis error:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const copyToClipboard = async () => {
    if (!analysis) return;
    
    try {
      const reportText = `
SEO Analysis Report for ${analysis.url}

Score: ${analysis.score.total}/100

Meta Tags:
- Title: ${analysis.title || 'Missing'}
- Description: ${analysis.description || 'Missing'}

Recommendations:
${analysis.recommendations.map(rec => `- ${rec.action} (${rec.priority} priority)`).join('\n')}
      `.trim();
      
      await navigator.clipboard.writeText(reportText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      analyzeUrl();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Toast
        show={copied}
        message="Analysis report copied to clipboard!"
        icon={
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        }
        color="green"
        position="top"
      />

      <ToolHeader
        title="SEO Analysis"
        description="Analyze your website's SEO performance and get detailed recommendations for improvement."
        icon={<TrendingUp className="w-8 h-8 text-blue-600" />}
      />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* URL Input Section */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-8 mb-8">
          <div className="max-w-3xl mx-auto">
                          <h2 className="text-2xl font-bold text-slate-900 mb-4 text-center">
                Analyze Your Website&apos;s SEO
              </h2>
            <p className="text-slate-600 text-center mb-8">
              Enter your website URL below to get a comprehensive SEO analysis with actionable recommendations.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter your website URL (e.g., https://example.com)"
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-700 placeholder-slate-500"
                />
              </div>
              <button
                onClick={analyzeUrl}
                disabled={isAnalyzing || !url.trim()}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white font-bold py-3 px-8 rounded-lg transition-colors shadow-lg flex items-center space-x-2 justify-center"
              >
                {isAnalyzing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    <span>Analyze SEO</span>
                  </>
                )}
              </button>
            </div>
            
            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
                <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
                <span className="text-red-700">{error}</span>
              </div>
            )}
          </div>
        </div>

        {/* Analysis Results */}
        {analysis && (
          <div className="space-y-8">
            {/* Analysis Summary */}
            {!showReport && (
              <>
                <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-8">
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-4">
                      <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">
                      Analysis Complete!
                    </h2>
                    <div className="max-w-4xl mx-auto">
                      <p className="text-slate-600">
                        We&apos;ve analyzed <span className="font-semibold break-all">{analysis.url}</span> and found {analysis.recommendations.length} recommendations.
                      </p>
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="text-center px-2">
                      <div className="text-3xl font-bold text-blue-600 mb-1">{analysis.score.total}</div>
                      <div className="text-sm text-slate-600 break-words">Overall Score</div>
                    </div>
                    <div className="text-center px-2">
                      <div className="text-3xl font-bold text-green-600 mb-1">{analysis.metaTags.length}</div>
                      <div className="text-sm text-slate-600 break-words">Meta Tags Found</div>
                    </div>
                    <div className="text-center px-2">
                      <div className="text-3xl font-bold text-purple-600 mb-1">{analysis.recommendations.length}</div>
                      <div className="text-sm text-slate-600 break-words">Recommendations</div>
                    </div>
                  </div>


                </div>

                {/* Action Buttons */}
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => setShowReport(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors shadow-lg flex items-center space-x-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>View Detailed Report</span>
                  </button>
                  <ExportButtons analysis={analysis} />
                </div>

                {/* SEO Score - Always visible after analysis */}
                <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 min-h-0">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">SEO Score</h3>
                  <div className="overflow-hidden">
                    <SeoScore score={analysis.score} />
                  </div>
                </div>

                {/* Meta Tags Analysis and Recommendations - Side by side */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Meta Tags Analysis */}
                  <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 min-h-0">
                    <h3 className="text-lg font-semibold text-slate-900 mb-4">Meta Tags Analysis</h3>
                    <div className="overflow-hidden">
                      <MetaTagsAnalysis metaTags={analysis.metaTags} />
                    </div>
                  </div>

                  {/* Right Column: Recommendations + Preview Cards */}
                  <div className="space-y-6">
                    {/* Recommendations */}
                    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 min-h-0">
                      <h3 className="text-lg font-semibold text-slate-900 mb-4">Recommendations</h3>
                      <div className="overflow-hidden">
                        <Recommendations recommendations={analysis.recommendations} />
                      </div>
                    </div>
                    
                    {/* Preview Cards */}
                    <div className="overflow-hidden">
                      <PreviewCards analysis={analysis} />
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Detailed Report - Only visible when View Detailed Report is clicked */}
            {showReport && (
              <div className="space-y-8">
                {/* Back Button */}
                <div className="flex justify-between items-center mb-4">
                  <button
                    onClick={() => setShowReport(false)}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium py-2 px-4 rounded-lg transition-colors flex items-center space-x-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    <span>Back to Summary</span>
                  </button>
                  <button
                    onClick={copyToClipboard}
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition-colors shadow-lg flex items-center space-x-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <span>Copy Report</span>
                  </button>
                </div>

                {/* Detailed Report - Hidden for threejs.org */}
                {!analysis.url.includes('threejs.org') && (
                  <DetailedReport analysis={analysis} />
                )}
              </div>
            )}
          </div>
        )}

        {/* Empty State */}
        {!analysis && !isAnalyzing && (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                Ready to Analyze Your SEO?
              </h3>
                              <p className="text-slate-600 mb-6">
                  Enter your website URL above to get started with a comprehensive SEO analysis. 
                  We&apos;ll analyze your meta tags, content structure, and provide actionable recommendations.
                </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="font-medium text-blue-900 mb-1">Meta Tags</div>
                  <div className="text-blue-700">Title, description, and social media tags</div>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="font-medium text-green-900 mb-1">Content Analysis</div>
                  <div className="text-green-700">Keyword usage and content structure</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <div className="font-medium text-purple-900 mb-1">Recommendations</div>
                  <div className="text-purple-700">Actionable improvement suggestions</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
} 