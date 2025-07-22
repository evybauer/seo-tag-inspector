'use client';

import { useState } from 'react';
import { 
  FileCode, 
  Copy, 
  Download, 
  Share2, 
  Globe
} from 'lucide-react';
import ToolHeader from '@/components/ToolHeader';
import ActionButton from '@/components/ActionButton';
import Toast from '@/components/Toast';

interface SitemapConfig {
  domain: string;
  includeModifiedDate: boolean;
  modifiedDate: string;
  changeFrequency: string;
  defaultPriority: string;
  pageCount: number;
}

const validateDomain = (domain: string): boolean => {
  if (!domain.trim()) return false;
  
  // Remove protocol if present
  const cleanDomain = domain.replace(/^https?:\/\//, '');
  
  // Basic domain regex pattern
  const domainRegex = /^[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;
  
  return domainRegex.test(cleanDomain);
};

export default function XmlSitemapGenerator() {
  const [config, setConfig] = useState<SitemapConfig>({
    domain: '',
    includeModifiedDate: false,
    modifiedDate: '',
    changeFrequency: 'none',
    defaultPriority: 'none',
    pageCount: 50
  });

  const [generatedSitemap, setGeneratedSitemap] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [domainError, setDomainError] = useState<string>('');
  const [isDomainValid, setIsDomainValid] = useState<boolean>(false);

  const handleDomainChange = (value: string) => {
    setConfig({...config, domain: value});
    
    if (!value.trim()) {
      setDomainError('');
      setIsDomainValid(false);
      return;
    }
    
    if (validateDomain(value)) {
      setDomainError('');
      setIsDomainValid(true);
    } else {
      setDomainError('Please enter a valid domain name (e.g., example.com or https://example.com)');
      setIsDomainValid(false);
    }
  };

  const generateSitemap = () => {
    if (!config.domain.trim()) {
      alert('Please enter a domain name');
      return;
    }
    
    if (!isDomainValid) {
      alert('Please enter a valid domain name');
      return;
    }

    setIsGenerating(true);
    
    try {
      let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
      sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

      // Generate URLs based on page count
      for (let i = 1; i <= config.pageCount; i++) {
        sitemap += '  <url>\n';
        sitemap += `    <loc>${config.domain}${i === 1 ? '' : `/page-${i}`}</loc>\n`;
        
        if (config.includeModifiedDate && config.modifiedDate) {
          sitemap += `    <lastmod>${config.modifiedDate}</lastmod>\n`;
        }
        
        if (config.changeFrequency !== 'none') {
          sitemap += `    <changefreq>${config.changeFrequency}</changefreq>\n`;
        }
        
        if (config.defaultPriority !== 'none') {
          sitemap += `    <priority>${config.defaultPriority}</priority>\n`;
        }
        
        sitemap += '  </url>\n';
      }

      sitemap += '</urlset>';

      setGeneratedSitemap(sitemap);
      setIsGenerating(false);
    } catch (error) {
      console.error('Error generating sitemap:', error);
      setIsGenerating(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedSitemap);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const downloadSitemap = () => {
    const blob = new Blob([generatedSitemap], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sitemap.xml';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const shareSitemap = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Generated XML Sitemap',
          text: 'Check out this XML sitemap I generated:',
          url: window.location.href
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      copyToClipboard();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Toast
        show={copied}
        message="Copied to clipboard!"
        icon={
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        }
        color="green"
        position="top"
      />

      <ToolHeader
        title="XML Sitemap Generator"
        description="Create XML sitemaps to help search engines discover and index your website pages efficiently."
        icon={<Globe className="w-8 h-8 text-blue-600" />}
      />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Configuration Form */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-8 mb-8">
          <div className="space-y-6">
            {/* Domain Name */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Enter a domain name *
              </label>
              <input
                type="text"
                value={config.domain}
                onChange={(e) => handleDomainChange(e.target.value)}
                placeholder="example.com or https://example.com"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent text-slate-700 placeholder-slate-500 ${
                  config.domain.trim() 
                    ? isDomainValid 
                      ? 'border-green-300 focus:ring-green-500' 
                      : 'border-red-300 focus:ring-red-500'
                    : 'border-slate-300 focus:ring-blue-500'
                }`}
              />
              {domainError && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {domainError}
                </p>
              )}
              {isDomainValid && (
                <p className="mt-1 text-sm text-green-600 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Valid domain name
                </p>
              )}
            </div>

            {/* Modified Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Modified date
                </label>
                <select
                  value={config.includeModifiedDate ? 'include' : 'none'}
                  onChange={(e) => setConfig({
                    ...config, 
                    includeModifiedDate: e.target.value === 'include'
                  })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-700"
                >
                  <option value="none">Do not include</option>
                  <option value="include">Include modified date</option>
                </select>
              </div>
              {config.includeModifiedDate && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    value={config.modifiedDate}
                    onChange={(e) => setConfig({...config, modifiedDate: e.target.value})}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-700"
                  />
                </div>
              )}
            </div>

            {/* Change Frequency and Priority */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Change frequency
                </label>
                <select
                  value={config.changeFrequency}
                  onChange={(e) => setConfig({...config, changeFrequency: e.target.value})}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-700"
                >
                  <option value="none">None</option>
                  <option value="always">Always</option>
                  <option value="hourly">Hourly</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                  <option value="never">Never</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Default priority
                </label>
                <select
                  value={config.defaultPriority}
                  onChange={(e) => setConfig({...config, defaultPriority: e.target.value})}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-700"
                >
                  <option value="none">None</option>
                  <option value="1.0">1.0 (Highest)</option>
                  <option value="0.9">0.9</option>
                  <option value="0.8">0.8</option>
                  <option value="0.7">0.7</option>
                  <option value="0.6">0.6</option>
                  <option value="0.5">0.5 (Default)</option>
                  <option value="0.4">0.4</option>
                  <option value="0.3">0.3</option>
                  <option value="0.2">0.2</option>
                  <option value="0.1">0.1</option>
                  <option value="0.0">0.0 (Lowest)</option>
                </select>
              </div>
            </div>

            {/* Page Count */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                How many pages do I need to crawl?
              </label>
              <input
                type="number"
                value={config.pageCount}
                onChange={(e) => setConfig({...config, pageCount: parseInt(e.target.value) || 1})}
                min="1"
                max="1000"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-700"
              />
            </div>
          </div>
        </div>

        {/* Generate Button */}
        <div className="text-center mb-8">
          <button
            onClick={generateSitemap}
            disabled={isGenerating || !config.domain.trim() || !isDomainValid}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white font-bold py-3 px-8 rounded-md transition-colors shadow-lg flex items-center space-x-2 mx-auto"
          >
            <FileCode className="w-5 h-5" />
            <span>Generate</span>
          </button>
        </div>

        {/* Generated Sitemap */}
        {generatedSitemap && (
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900">Your Generated XML Sitemap</h3>
              <div className="flex items-center space-x-2">
                <ActionButton
                  onClick={copyToClipboard}
                  icon={<Copy className="w-4 h-4" />}
                  label="Copy"
                  color="blue"
                />
                <ActionButton
                  onClick={downloadSitemap}
                  icon={<Download className="w-4 h-4" />}
                  label="Download"
                  color="green"
                />
                <ActionButton
                  onClick={shareSitemap}
                  icon={<Share2 className="w-4 h-4" />}
                  label="Share"
                  color="purple"
                />
              </div>
            </div>
            
            <textarea
              value={generatedSitemap}
              readOnly
              rows={20}
              className="w-full p-4 bg-slate-900 text-slate-100 rounded-lg font-mono text-sm resize-none border-0 focus:outline-none"
              placeholder="Generated XML sitemap will appear here..."
            />
          </div>
        )}

        {/* How to Use */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">How to Use</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-blue-800">
            <div>
              <h4 className="font-medium mb-2">1. Upload to Server</h4>
              <p>Upload the generated sitemap.xml file to your website&apos;s root directory (public_html, www, or htdocs).</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">2. Submit to Search Engines</h4>
              <p>Submit your sitemap URL to Google Search Console, Bing Webmaster Tools, and other search engines.</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">3. Add to robots.txt</h4>
              <p>Add &quot;Sitemap: https://yourdomain.com/sitemap.xml&quot; to your robots.txt file for better discovery.</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">4. Keep Updated</h4>
              <p>Update your sitemap regularly when you add new pages or change existing content.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 