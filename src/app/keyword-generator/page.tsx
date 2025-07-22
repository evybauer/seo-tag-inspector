'use client';

import { useState } from 'react';
import { ArrowLeft, Copy, Download, Search, FileCode, Hash } from 'lucide-react';
import Link from 'next/link';
import ToolHeader from '@/components/ToolHeader';

interface KeywordResult {
  keyword: string;
  frequency: number;
  type: 'primary' | 'secondary' | 'long-tail' | 'question' | 'local';
  relevance: number; // 0-100 score
  wordLength: number;
}

interface AnalysisStats {
  totalWords: number;
  uniqueWords: number;
  averageWordLength: number;
  keywordDensity: number;
  readabilityScore: number;
}

export default function KeywordGenerator() {
  const [inputText, setInputText] = useState<string>('tes test test test');
  const [generatedKeywords, setGeneratedKeywords] = useState<KeywordResult[]>([]);
  const [analysisStats, setAnalysisStats] = useState<AnalysisStats | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showOutput, setShowOutput] = useState(false);

  const calculateReadabilityScore = (text: string): number => {
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const words = text.split(/\s+/).filter(w => w.length > 0);
    const syllables = text.toLowerCase().replace(/[^a-z]/g, '').replace(/[^aeiouy]+/g, ' ').trim().split(/\s+/).length;
    
    if (sentences.length === 0 || words.length === 0) return 0;
    
    // Flesch Reading Ease formula
    const score = 206.835 - (1.015 * (words.length / sentences.length)) - (84.6 * (syllables / words.length));
    return Math.max(0, Math.min(100, score));
  };

  const extractKeywords = (text: string): { keywords: KeywordResult[], stats: AnalysisStats } => {
    // Clean and normalize text
    const cleanText = text.toLowerCase()
      .replace(/[^\w\s]/g, ' ') // Remove punctuation
      .replace(/\s+/g, ' ') // Normalize whitespace
      .trim();

    // Split into words and filter out common stop words
    const stopWords = new Set([
      'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by',
      'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did',
      'will', 'would', 'could', 'should', 'may', 'might', 'must', 'can', 'this', 'that', 'these', 'those',
      'i', 'you', 'he', 'she', 'it', 'we', 'they', 'me', 'him', 'her', 'us', 'them',
      'my', 'your', 'his', 'her', 'its', 'our', 'their', 'mine', 'yours', 'hers', 'ours', 'theirs',
      'am', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
      'if', 'then', 'else', 'when', 'where', 'why', 'how', 'what', 'which', 'who', 'whom',
      'as', 'than', 'so', 'because', 'since', 'while', 'until', 'before', 'after', 'during',
      'up', 'down', 'out', 'off', 'over', 'under', 'again', 'further', 'then', 'once',
      'here', 'there', 'whence', 'wherever', 'now', 'then', 'here', 'there', 'anywhere', 'everywhere',
      'all', 'any', 'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such',
      'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'too', 'very', 'just', 'now'
    ]);

    const allWords = cleanText.split(' ');
    const words = allWords
      .filter(word => word.length > 2 && !stopWords.has(word))
      .filter(word => /^[a-zA-Z]+$/.test(word)); // Only alphabetic words

    // Count frequency
    const wordCount: { [key: string]: number } = {};
    words.forEach(word => {
      wordCount[word] = (wordCount[word] || 0) + 1;
    });

    // Generate long-tail keywords (2-3 word combinations)
    const longTailKeywords: { [key: string]: number } = {};
    for (let i = 0; i < words.length - 1; i++) {
      const phrase = `${words[i]} ${words[i + 1]}`;
      longTailKeywords[phrase] = (longTailKeywords[phrase] || 0) + 1;
    }

    // Generate question keywords
    const questionKeywords: { [key: string]: number } = {};
    const questionWords = ['what', 'how', 'why', 'when', 'where', 'which', 'who'];
    words.forEach(word => {
      questionWords.forEach(qWord => {
        const phrase = `${qWord} ${word}`;
        questionKeywords[phrase] = (questionKeywords[phrase] || 0) + 1;
      });
    });

    // Combine all keywords and categorize them
    const allKeywords = [
      ...Object.entries(wordCount).map(([keyword, frequency]) => ({
        keyword,
        frequency,
        type: 'primary' as const,
        relevance: Math.min(100, frequency * 10),
        wordLength: keyword.length
      })),
      ...Object.entries(longTailKeywords).map(([keyword, frequency]) => ({
        keyword,
        frequency,
        type: 'long-tail' as const,
        relevance: Math.min(100, frequency * 8),
        wordLength: keyword.length
      })),
      ...Object.entries(questionKeywords).map(([keyword, frequency]) => ({
        keyword,
        frequency,
        type: 'question' as const,
        relevance: Math.min(100, frequency * 6),
        wordLength: keyword.length
      }))
    ];

    // Sort by relevance and frequency
    const sortedKeywords = allKeywords
      .sort((a, b) => (b.relevance + b.frequency) - (a.relevance + a.frequency))
      .slice(0, 30); // Top 30 keywords

    // Calculate statistics
    const totalWords = allWords.length;
    const uniqueWords = new Set(allWords).size;
    const averageWordLength = allWords.reduce((sum, word) => sum + word.length, 0) / totalWords;
    const keywordDensity = (words.length / totalWords) * 100;
    const readabilityScore = calculateReadabilityScore(text);

    const stats: AnalysisStats = {
      totalWords,
      uniqueWords,
      averageWordLength: Math.round(averageWordLength * 10) / 10,
      keywordDensity: Math.round(keywordDensity * 10) / 10,
      readabilityScore: Math.round(readabilityScore)
    };

    return { keywords: sortedKeywords, stats };
  };

  const handleGenerate = () => {
    if (!inputText.trim()) {
      alert('Please enter some text to analyze');
      return;
    }

    setIsGenerating(true);
    setShowOutput(false);
    try {
      // Simulate processing delay
      setTimeout(() => {
        const result = extractKeywords(inputText);
        setGeneratedKeywords(result.keywords);
        setAnalysisStats(result.stats);
        setIsGenerating(false);
        setShowOutput(true);
      }, 1000);
    } catch (error) {
      console.error('Error generating keywords:', error);
      setIsGenerating(false);
    }
  };

  const copyToClipboard = async () => {
    const keywordsText = generatedKeywords.map(k => k.keyword).join(', ');
    try {
      await navigator.clipboard.writeText(keywordsText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const downloadKeywords = () => {
    const csvContent = [
      'Keyword,Frequency,Type,Relevance Score,Word Length',
      ...generatedKeywords.map(k => `${k.keyword},${k.frequency},${k.type},${k.relevance},${k.wordLength}`)
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'extracted-keywords.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Toast Notification */}
      {copied && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2 animate-fade-in-out">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Copied to clipboard!</span>
          </div>
        </div>
      )}

      <ToolHeader
        title="Keyword Generator"
        description="Extract keywords from your content for SEO optimization and content strategy planning."
        icon={<Hash className="w-8 h-8 text-blue-600" />}
      />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Informational Header */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-blue-900 mb-3">
            The Keyword Generator will take a blurb of your text content and show the most frequent keywords.
          </h2>
          <p className="text-blue-800 leading-relaxed">
            You can use these keywords in your keywords meta tag or search engine competition planning.
          </p>
        </div>

        {/* Input Section */}
        <div className="w-full">
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 w-full">
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Description</h3>
            <p className="text-sm text-slate-600 mb-4">Enter text blurb</p>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              rows={15}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-700 placeholder-slate-500 resize-none"
              placeholder="Paste your content here to extract keywords..."
            />
          </div>
        </div>

        {/* Generate Button */}
        <div className="mt-8 text-center">
          <button
            onClick={handleGenerate}
            disabled={isGenerating || !inputText.trim()}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white font-bold py-3 px-8 rounded-md transition-colors shadow-lg flex items-center space-x-2 mx-auto"
          >
            <FileCode className="w-5 h-5" />
            <span>Generate</span>
          </button>
        </div>

        {/* Output Section - Only show after Generate is clicked */}
        {showOutput && (
          <div className="mt-8 w-full">
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 w-full">
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Output</h3>
                <p className="text-sm text-slate-600 mb-4">Generated keywords</p>
                <div className="space-y-4">
                  {generatedKeywords.length > 0 ? (
                    <>
                      {/* Content Analysis Stats */}
                      {analysisStats && (
                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4">
                          <h4 className="font-medium text-slate-900 mb-3">Content Analysis</h4>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-blue-600">{analysisStats.totalWords}</div>
                              <div className="text-slate-600">Total Words</div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-purple-600">{analysisStats.uniqueWords}</div>
                              <div className="text-slate-600">Unique Words</div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-green-600">{analysisStats.keywordDensity}%</div>
                              <div className="text-slate-600">Keyword Density</div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-orange-600">{analysisStats.readabilityScore}</div>
                              <div className="text-slate-600">Readability Score</div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Keyword Categories */}
                      <div className="bg-slate-50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium text-slate-900">Keyword Analysis</h4>
                          <div className="flex space-x-2">
                            <button
                              onClick={copyToClipboard}
                              className="flex items-center space-x-1 px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                            >
                              <Copy className="w-3 h-3" />
                              <span>Copy</span>
                            </button>
                            <button
                              onClick={downloadKeywords}
                              className="flex items-center space-x-1 px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors"
                            >
                              <Download className="w-3 h-3" />
                              <span>CSV</span>
                            </button>
                          </div>
                        </div>
                        
                        {/* Keyword Type Filters */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          <button
                            onClick={() => setShowAdvanced(!showAdvanced)}
                            className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors"
                          >
                            {showAdvanced ? 'Hide' : 'Show'} Advanced
                          </button>
                        </div>

                        <div className="space-y-2 max-h-64 overflow-y-auto">
                          {generatedKeywords.map((keyword, index) => (
                            <div key={index} className="flex items-center justify-between p-2 bg-white rounded border">
                              <div className="flex-1">
                                <span className="font-medium text-slate-900">{keyword.keyword}</span>
                                {showAdvanced && (
                                  <div className="flex items-center space-x-2 mt-1">
                                    <span className={`px-2 py-1 text-xs rounded-full ${
                                      keyword.type === 'primary' ? 'bg-blue-100 text-blue-700' :
                                      keyword.type === 'long-tail' ? 'bg-green-100 text-green-700' :
                                      keyword.type === 'question' ? 'bg-purple-100 text-purple-700' :
                                      'bg-gray-100 text-gray-700'
                                    }`}>
                                      {keyword.type.replace('-', ' ')}
                                    </span>
                                    <span className="text-xs text-slate-500">
                                      Relevance: {keyword.relevance}%
                                    </span>
                                  </div>
                                )}
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className="text-sm text-slate-500 bg-slate-100 px-2 py-1 rounded">
                                  {keyword.frequency} {keyword.frequency === 1 ? 'time' : 'times'}
                                </span>
                                {showAdvanced && (
                                  <span className="text-xs text-slate-400">
                                    {keyword.wordLength} chars
                                  </span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Meta Keywords Section */}
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 className="font-medium text-blue-900 mb-2">Keywords for Meta Tag</h4>
                        <textarea
                          value={generatedKeywords.map(k => k.keyword).join(', ')}
                          readOnly
                          rows={3}
                          className="w-full px-3 py-2 bg-white border border-blue-200 rounded text-sm text-slate-700 resize-none"
                        />
                        <p className="text-xs text-blue-700 mt-2">
                          Copy this text to use in your meta keywords tag
                        </p>
                      </div>

                      {/* SEO Recommendations */}
                      {analysisStats && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                          <h4 className="font-medium text-yellow-900 mb-2">SEO Recommendations</h4>
                          <ul className="text-sm text-yellow-800 space-y-1">
                            {analysisStats.keywordDensity < 1 && (
                              <li>• Consider adding more relevant keywords to improve density</li>
                            )}
                            {analysisStats.keywordDensity > 3 && (
                              <li>• Keyword density is high - ensure natural keyword usage</li>
                            )}
                            {analysisStats.readabilityScore < 30 && (
                              <li>• Content may be too complex - consider simplifying language</li>
                            )}
                            {analysisStats.readabilityScore > 80 && (
                              <li>• Content is very readable - good for general audiences</li>
                            )}
                            {generatedKeywords.filter(k => k.type === 'long-tail').length > 0 && (
                              <li>• Long-tail keywords detected - great for targeted SEO</li>
                            )}
                            {generatedKeywords.filter(k => k.type === 'question').length > 0 && (
                              <li>• Question keywords found - perfect for FAQ content</li>
                            )}
                          </ul>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="bg-slate-50 rounded-lg p-8 text-center">
                      <Search className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                      <p className="text-slate-500">
                        {isGenerating ? 'Analyzing your content...' : 'Generated keywords will appear here'}
                      </p>
                      {isGenerating && (
                        <div className="mt-4">
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
          </div>
        )}

        {/* Tips Section */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">How to Use</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-slate-900 mb-2">For Meta Keywords</h4>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>• Copy the generated keywords to your meta keywords tag</li>
                <li>• Use the most frequent keywords for better SEO</li>
                <li>• Keep your meta keywords under 255 characters</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-slate-900 mb-2">For Content Planning</h4>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>• Focus on keywords with higher frequency</li>
                <li>• Use these keywords naturally in your content</li>
                <li>• Consider long-tail variations for better targeting</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 