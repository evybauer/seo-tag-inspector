'use client';

import { useState } from 'react';
import { ArrowLeft, Copy, Download, FileText, Share2, Settings } from 'lucide-react';
import Link from 'next/link';

interface MetaTagForm {
  title: string;
  description: string;
  keywords: string;
  author: string;
  viewport: string;
  robots: string;
  canonical: string;
  language: string;
  charset: string;
  // Open Graph
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogUrl: string;
  ogType: string;
  ogSiteName: string;
  // Twitter Card
  twitterCard: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
  twitterCreator: string;
  twitterSite: string;
}

export default function MetaTagGenerator() {
  const [formData, setFormData] = useState<MetaTagForm>({
    title: '',
    description: '',
    keywords: '',
    author: '',
    viewport: 'width=device-width, initial-scale=1.0',
    robots: 'index, follow',
    canonical: '',
    language: 'en',
    charset: 'UTF-8',
    ogTitle: '',
    ogDescription: '',
    ogImage: '',
    ogUrl: '',
    ogType: 'website',
    ogSiteName: '',
    twitterCard: 'summary_large_image',
    twitterTitle: '',
    twitterDescription: '',
    twitterImage: '',
    twitterCreator: '',
    twitterSite: ''
  });

  const [generatedCode, setGeneratedCode] = useState<string>('');
  const [showGeneratedCode, setShowGeneratedCode] = useState(false);

  const handleInputChange = (field: keyof MetaTagForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateMetaTags = () => {
    const metaTags = [
      // Basic Meta Tags
      `<title>${formData.title}</title>`,
      `<meta charset="${formData.charset}">`,
      `<meta name="viewport" content="${formData.viewport}">`,
      `<meta name="description" content="${formData.description}">`,
      `<meta name="keywords" content="${formData.keywords}">`,
      `<meta name="author" content="${formData.author}">`,
      `<meta name="robots" content="${formData.robots}">`,
      `<meta name="language" content="${formData.language}">`,
      formData.canonical && `<link rel="canonical" href="${formData.canonical}">`,
      
      // Open Graph Tags
      `<meta property="og:title" content="${formData.ogTitle || formData.title}">`,
      `<meta property="og:description" content="${formData.ogDescription || formData.description}">`,
      `<meta property="og:image" content="${formData.ogImage}">`,
      `<meta property="og:url" content="${formData.ogUrl || formData.canonical}">`,
      `<meta property="og:type" content="${formData.ogType}">`,
      `<meta property="og:site_name" content="${formData.ogSiteName}">`,
      
      // Twitter Card Tags
      `<meta name="twitter:card" content="${formData.twitterCard}">`,
      `<meta name="twitter:title" content="${formData.twitterTitle || formData.title}">`,
      `<meta name="twitter:description" content="${formData.twitterDescription || formData.description}">`,
      `<meta name="twitter:image" content="${formData.twitterImage || formData.ogImage}">`,
      formData.twitterCreator && `<meta name="twitter:creator" content="${formData.twitterCreator}">`,
      formData.twitterSite && `<meta name="twitter:site" content="${formData.twitterSite}">`
    ].filter(Boolean).join('\n  ');

    const fullCode = `<!DOCTYPE html>
<html lang="${formData.language}">
<head>
  ${metaTags}
</head>
<body>
  <!-- Your content here -->
</body>
</html>`;

    setGeneratedCode(fullCode);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedCode);
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const downloadCode = () => {
    const blob = new Blob([generatedCode], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'meta-tags.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
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
              <h1 className="text-2xl font-bold text-slate-900">Meta Tag Generator</h1>
              <p className="text-slate-600">Generate optimized meta tags for your web pages</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Informational Header */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-blue-900 mb-3">
            The meta tag generator will create description, keyword and other important meta tags for you with provided content.
          </h2>
          <p className="text-blue-800 leading-relaxed">
            Meta tags are HTML tag content that provide metadata about your website such as description. 
            Meta tags are used by search engines to help index and to provide relevant content in their search results.
          </p>
        </div>

        {/* Form Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Basic Meta Tags */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-blue-500" />
                Basic Meta Tags
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Site Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-700 placeholder-slate-500"
                    placeholder="Title must be within 70 Characters"
                    maxLength={70}
                  />
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-xs text-slate-500">Keep your title between 50-60 characters for optimal display in search results</p>
                    <span className="text-xs text-slate-500">{formData.title.length}/70</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Site Description *
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-700 placeholder-slate-500"
                    placeholder="Description must be within 150 Characters"
                    maxLength={150}
                  />
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-xs text-slate-500">Write a compelling description that encourages users to click on your page</p>
                    <span className="text-xs text-slate-500">{formData.description.length}/150</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Site Keywords (Separate with commas) *
                  </label>
                  <textarea
                    value={formData.keywords}
                    onChange={(e) => handleInputChange('keywords', e.target.value)}
                    rows={2}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-700 placeholder-slate-500"
                    placeholder="keyword1, keyword2, keyword3"
                  />
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-xs text-slate-500">Include relevant keywords that users might search for</p>
                    <span className="text-xs text-slate-500">{formData.keywords.split(',').filter(k => k.trim()).length} keywords</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Canonical URL
                  </label>
                  <input
                    type="url"
                    value={formData.canonical}
                    onChange={(e) => handleInputChange('canonical', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-700 placeholder-slate-500"
                    placeholder="https://example.com/page"
                  />
                </div>
              </div>
            </div>

            {/* Social Media Tags */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                <Share2 className="w-5 h-5 mr-2 text-green-500" />
                Social Media Tags
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Open Graph Title
                  </label>
                  <input
                    type="text"
                    value={formData.ogTitle}
                    onChange={(e) => handleInputChange('ogTitle', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-700 placeholder-slate-500"
                    placeholder="Leave empty to use page title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Open Graph Description
                  </label>
                  <textarea
                    value={formData.ogDescription}
                    onChange={(e) => handleInputChange('ogDescription', e.target.value)}
                    rows={2}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-700 placeholder-slate-500"
                    placeholder="Leave empty to use meta description"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Open Graph Image URL
                  </label>
                  <input
                    type="url"
                    value={formData.ogImage}
                    onChange={(e) => handleInputChange('ogImage', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-700 placeholder-slate-500"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Site Name
                  </label>
                  <input
                    type="text"
                    value={formData.ogSiteName}
                    onChange={(e) => handleInputChange('ogSiteName', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-700 placeholder-slate-500"
                    placeholder="Your website name"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Advanced Settings */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                <Settings className="w-5 h-5 mr-2 text-purple-500" />
                Advanced Settings
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Allow robots to index your website?
                  </label>
                  <select
                    value={formData.robots.includes('noindex') ? 'no' : 'yes'}
                    onChange={(e) => handleInputChange('robots', e.target.value === 'yes' ? 'index, follow' : 'noindex, follow')}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-700"
                  >
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Allow robots to follow all links?
                  </label>
                  <select
                    value={formData.robots.includes('nofollow') ? 'no' : 'yes'}
                    onChange={(e) => {
                      const currentIndex = formData.robots.includes('noindex') ? 'noindex' : 'index';
                      const newFollow = e.target.value === 'yes' ? 'follow' : 'nofollow';
                      handleInputChange('robots', `${currentIndex}, ${newFollow}`);
                    }}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-700"
                  >
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    What is your site primary language?
                  </label>
                  <select
                    value={formData.language}
                    onChange={(e) => handleInputChange('language', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-700"
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                    <option value="it">Italian</option>
                    <option value="pt">Portuguese</option>
                    <option value="ru">Russian</option>
                    <option value="ja">Japanese</option>
                    <option value="ko">Korean</option>
                    <option value="zh">Chinese</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    What type of content will your site display?
                  </label>
                  <select
                    value={formData.charset}
                    onChange={(e) => handleInputChange('charset', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-700"
                  >
                    <option value="UTF-8">UTF-8</option>
                    <option value="ISO-8859-1">ISO-8859-1</option>
                    <option value="UTF-16">UTF-16</option>
                  </select>
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="revisit"
                    className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="revisit" className="text-sm font-medium text-slate-700">
                    Search engines should revisit this page after
                  </label>
                  <input
                    type="number"
                    className="w-16 px-2 py-1 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-700"
                    placeholder="7"
                    min="1"
                    max="365"
                  />
                  <span className="text-sm text-slate-700">days.</span>
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="author"
                    className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="author" className="text-sm font-medium text-slate-700">
                    Author:
                  </label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => handleInputChange('author', e.target.value)}
                    className="flex-1 px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-700 placeholder-slate-500"
                    placeholder="Your name or company"
                  />
                </div>
              </div>
            </div>

            {/* Twitter Card Settings */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                <Share2 className="w-5 h-5 mr-2 text-blue-400" />
                Twitter Card Settings
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Twitter Card Type
                  </label>
                  <select
                    value={formData.twitterCard}
                    onChange={(e) => handleInputChange('twitterCard', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-700"
                  >
                    <option value="summary">summary</option>
                    <option value="summary_large_image">summary_large_image</option>
                    <option value="app">app</option>
                    <option value="player">player</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Twitter Creator (@username)
                  </label>
                  <input
                    type="text"
                    value={formData.twitterCreator}
                    onChange={(e) => handleInputChange('twitterCreator', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-700 placeholder-slate-500"
                    placeholder="@username"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Twitter Site (@username)
                  </label>
                  <input
                    type="text"
                    value={formData.twitterSite}
                    onChange={(e) => handleInputChange('twitterSite', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-700 placeholder-slate-500"
                    placeholder="@username"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Generate Meta Tags Button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => {
              generateMetaTags();
              setShowGeneratedCode(true);
            }}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-8 rounded-md transition-colors shadow-lg"
          >
            Generate Meta Tags
          </button>
        </div>

        {/* Generated Code Section */}
        {showGeneratedCode && (
          <div className="mt-8 bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900">Your Generated Meta Tags</h3>
              <div className="flex space-x-2">
                <button
                  onClick={copyToClipboard}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  <Copy className="w-4 h-4" />
                  <span>Copy</span>
                </button>
                <button
                  onClick={downloadCode}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Download</span>
                </button>
              </div>
            </div>
            <textarea
              value={generatedCode}
              readOnly
              rows={20}
              className="w-full p-4 bg-slate-900 text-slate-100 rounded-lg font-mono text-sm resize-none border-0 focus:outline-none"
              placeholder="Generated meta tags will appear here..."
            />
          </div>
        )}
      </main>
    </div>
  );
} 