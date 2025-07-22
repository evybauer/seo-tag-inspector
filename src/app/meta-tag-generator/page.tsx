'use client';

import { useState } from 'react';
import { ArrowLeft, Copy, Download, Eye, FileText, Hash, Share2, Settings } from 'lucide-react';
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
  const [activeTab, setActiveTab] = useState<'form' | 'preview' | 'code'>('form');

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
        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="border-b border-slate-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('form')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'form'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                }`}
              >
                <FileText className="w-4 h-4 inline mr-2" />
                Form
              </button>
              <button
                onClick={() => {
                  generateMetaTags();
                  setActiveTab('preview');
                }}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'preview'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                }`}
              >
                <Eye className="w-4 h-4 inline mr-2" />
                Preview
              </button>
              <button
                onClick={() => {
                  generateMetaTags();
                  setActiveTab('code');
                }}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'code'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                }`}
              >
                <Hash className="w-4 h-4 inline mr-2" />
                Generated Code
              </button>
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'form' && (
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
                      Page Title *
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your page title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Meta Description *
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your meta description"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Keywords
                    </label>
                    <input
                      type="text"
                      value={formData.keywords}
                      onChange={(e) => handleInputChange('keywords', e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="keyword1, keyword2, keyword3"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Author
                    </label>
                    <input
                      type="text"
                      value={formData.author}
                      onChange={(e) => handleInputChange('author', e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Your name or company"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Canonical URL
                    </label>
                    <input
                      type="url"
                      value={formData.canonical}
                      onChange={(e) => handleInputChange('canonical', e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                      Robots Meta
                    </label>
                    <select
                      value={formData.robots}
                      onChange={(e) => handleInputChange('robots', e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="index, follow">index, follow</option>
                      <option value="noindex, follow">noindex, follow</option>
                      <option value="index, nofollow">index, nofollow</option>
                      <option value="noindex, nofollow">noindex, nofollow</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Language
                    </label>
                    <select
                      value={formData.language}
                      onChange={(e) => handleInputChange('language', e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                      Character Encoding
                    </label>
                    <select
                      value={formData.charset}
                      onChange={(e) => handleInputChange('charset', e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="UTF-8">UTF-8</option>
                      <option value="ISO-8859-1">ISO-8859-1</option>
                      <option value="UTF-16">UTF-16</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Open Graph Type
                    </label>
                    <select
                      value={formData.ogType}
                      onChange={(e) => handleInputChange('ogType', e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="website">website</option>
                      <option value="article">article</option>
                      <option value="book">book</option>
                      <option value="profile">profile</option>
                      <option value="music.song">music.song</option>
                      <option value="music.album">music.album</option>
                      <option value="video.movie">video.movie</option>
                    </select>
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
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="@username"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'preview' && (
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Preview</h3>
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Google Search Result Preview</h4>
                <div className="bg-white border border-gray-200 rounded p-3">
                  <div className="text-blue-600 text-sm mb-1">{formData.canonical || 'https://example.com'}</div>
                  <div className="text-lg text-blue-600 font-medium mb-1">{formData.title || 'Page Title'}</div>
                  <div className="text-sm text-gray-600">{formData.description || 'Page description will appear here...'}</div>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Facebook Share Preview</h4>
                <div className="bg-white border border-gray-200 rounded p-3 max-w-md">
                  {formData.ogImage && (
                    <img src={formData.ogImage} alt="" className="w-full h-32 object-cover rounded mb-2" />
                  )}
                  <div className="text-sm text-gray-500 mb-1">{formData.ogSiteName || 'Website Name'}</div>
                  <div className="font-medium text-gray-900 mb-1">{formData.ogTitle || formData.title || 'Page Title'}</div>
                  <div className="text-sm text-gray-600">{formData.ogDescription || formData.description || 'Description...'}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'code' && (
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900">Generated HTML Code</h3>
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
            <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-sm">
              <code>{generatedCode}</code>
            </pre>
          </div>
        )}
      </main>
    </div>
  );
} 