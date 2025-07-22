'use client';

import { useState } from 'react';
import { ArrowLeft, Copy, Download, FileCode, Globe, Settings, Shield, Plus, X, Share2 } from 'lucide-react';
import Link from 'next/link';

interface RobotsRule {
  userAgent: string;
  allow: string[];
  disallow: string[];
  crawlDelay?: number;
}

interface RobotsConfig {
  defaultBehavior: 'allowed' | 'disallowed';
  crawlDelay: 'default' | '1' | '2' | '3' | '5' | '10';
  sitemap: string;
  host: string;
  restrictedDirectories: string[];
  searchRobots: {
    // Google
    google: 'default' | 'allowed' | 'disallowed';
    googleImage: 'default' | 'allowed' | 'disallowed';
    googleMobile: 'default' | 'allowed' | 'disallowed';
    googleNews: 'default' | 'allowed' | 'disallowed';
    googleVideo: 'default' | 'allowed' | 'disallowed';
    googleAdsBot: 'default' | 'allowed' | 'disallowed';
    
    // Bing/Microsoft
    bingbot: 'default' | 'allowed' | 'disallowed';
    msnbot: 'default' | 'allowed' | 'disallowed';
    msnbotMedia: 'default' | 'allowed' | 'disallowed';
    
    // Yahoo
    yahoo: 'default' | 'allowed' | 'disallowed';
    yahooMM: 'default' | 'allowed' | 'disallowed';
    yahooBlogs: 'default' | 'allowed' | 'disallowed';
    yahooSlurp: 'default' | 'allowed' | 'disallowed';
    
    // DuckDuckGo
    duckDuckBot: 'default' | 'allowed' | 'disallowed';
    
    // Baidu
    baiduspider: 'default' | 'allowed' | 'disallowed';
    baiduImage: 'default' | 'allowed' | 'disallowed';
    
    // Yandex
    yandexBot: 'default' | 'allowed' | 'disallowed';
    yandexImages: 'default' | 'allowed' | 'disallowed';
    yandexVideo: 'default' | 'allowed' | 'disallowed';
    yandexNews: 'default' | 'allowed' | 'disallowed';
    
    // Social Media
    facebookExternalHit: 'default' | 'allowed' | 'disallowed';
    twitterbot: 'default' | 'allowed' | 'disallowed';
    linkedInBot: 'default' | 'allowed' | 'disallowed';
    pinterest: 'default' | 'allowed' | 'disallowed';
    whatsapp: 'default' | 'allowed' | 'disallowed';
    
    // Other Search Engines
    seznamBot: 'default' | 'allowed' | 'disallowed';
    alexa: 'default' | 'allowed' | 'disallowed';
    ahrefsBot: 'default' | 'allowed' | 'disallowed';
    semrushBot: 'default' | 'allowed' | 'disallowed';
    mozBot: 'default' | 'allowed' | 'disallowed';
    dotBot: 'default' | 'allowed' | 'disallowed';
    rogerbot: 'default' | 'allowed' | 'disallowed';
    exabot: 'default' | 'allowed' | 'disallowed';
    sistrix: 'default' | 'allowed' | 'disallowed';
    bubing: 'default' | 'allowed' | 'disallowed';
    archiveOrg: 'default' | 'allowed' | 'disallowed';
  };
  userAgents: RobotsRule[];
  customRules: string[];
}

export default function RobotsGenerator() {
  const [config, setConfig] = useState<RobotsConfig>({
    defaultBehavior: 'allowed',
    crawlDelay: 'default',
    sitemap: 'http://example.com/sitemap.xml',
    host: '',
    restrictedDirectories: ['/admin/', '/private/', '/temp/'],
    searchRobots: {
      // Google
      google: 'default',
      googleImage: 'default',
      googleMobile: 'default',
      googleNews: 'default',
      googleVideo: 'default',
      googleAdsBot: 'default',
      
      // Bing/Microsoft
      bingbot: 'default',
      msnbot: 'default',
      msnbotMedia: 'default',
      
      // Yahoo
      yahoo: 'default',
      yahooMM: 'default',
      yahooBlogs: 'default',
      yahooSlurp: 'default',
      
      // DuckDuckGo
      duckDuckBot: 'default',
      
      // Baidu
      baiduspider: 'default',
      baiduImage: 'default',
      
      // Yandex
      yandexBot: 'default',
      yandexImages: 'default',
      yandexVideo: 'default',
      yandexNews: 'default',
      
      // Social Media
      facebookExternalHit: 'default',
      twitterbot: 'default',
      linkedInBot: 'default',
      pinterest: 'default',
      whatsapp: 'default',
      
      // Other Search Engines
      seznamBot: 'default',
      alexa: 'default',
      ahrefsBot: 'default',
      semrushBot: 'default',
      mozBot: 'default',
      dotBot: 'default',
      rogerbot: 'default',
      exabot: 'default',
      sistrix: 'default',
      bubing: 'default',
      archiveOrg: 'default'
    },
    userAgents: [
      {
        userAgent: '*',
        allow: ['/'],
        disallow: ['/admin/', '/private/', '/temp/']
      }
    ],
    customRules: []
  });

  const [generatedRobots, setGeneratedRobots] = useState<string>('');
  const [showResults, setShowResults] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSearchRobotChange = (robot: keyof RobotsConfig['searchRobots'], value: string) => {
    setConfig({
      ...config,
      searchRobots: {
        ...config.searchRobots,
        [robot]: value as 'default' | 'allowed' | 'disallowed'
      }
    });
  };

  const handleUserAgentChange = (index: number, field: keyof RobotsRule, value: string | number | string[] | undefined) => {
    const updatedUserAgents = [...config.userAgents];
    updatedUserAgents[index] = { ...updatedUserAgents[index], [field]: value };
    setConfig({ ...config, userAgents: updatedUserAgents });
  };

  const addUserAgent = () => {
    setConfig({
      ...config,
      userAgents: [
        ...config.userAgents,
        {
          userAgent: '*',
          allow: ['/'],
          disallow: []
        }
      ]
    });
  };

  const removeUserAgent = (index: number) => {
    if (config.userAgents.length > 1) {
      const updatedUserAgents = config.userAgents.filter((_, i) => i !== index);
      setConfig({ ...config, userAgents: updatedUserAgents });
    }
  };

  const addAllowRule = (userAgentIndex: number) => {
    const updatedUserAgents = [...config.userAgents];
    updatedUserAgents[userAgentIndex].allow.push('/');
    setConfig({ ...config, userAgents: updatedUserAgents });
  };

  const removeAllowRule = (userAgentIndex: number, ruleIndex: number) => {
    const updatedUserAgents = [...config.userAgents];
    updatedUserAgents[userAgentIndex].allow.splice(ruleIndex, 1);
    setConfig({ ...config, userAgents: updatedUserAgents });
  };

  const addDisallowRule = (userAgentIndex: number) => {
    const updatedUserAgents = [...config.userAgents];
    updatedUserAgents[userAgentIndex].disallow.push('/');
    setConfig({ ...config, userAgents: updatedUserAgents });
  };

  const removeDisallowRule = (userAgentIndex: number, ruleIndex: number) => {
    const updatedUserAgents = [...config.userAgents];
    updatedUserAgents[userAgentIndex].disallow.splice(ruleIndex, 1);
    setConfig({ ...config, userAgents: updatedUserAgents });
  };

  const addCustomRule = () => {
    setConfig({
      ...config,
      customRules: [...config.customRules, '']
    });
  };

  const updateCustomRule = (index: number, value: string) => {
    const updatedRules = [...config.customRules];
    updatedRules[index] = value;
    setConfig({ ...config, customRules: updatedRules });
  };

  const removeCustomRule = (index: number) => {
    const updatedRules = config.customRules.filter((_, i) => i !== index);
    setConfig({ ...config, customRules: updatedRules });
  };

  const addRestrictedDirectory = () => {
    setConfig({
      ...config,
      restrictedDirectories: [...config.restrictedDirectories, '']
    });
  };

  const updateRestrictedDirectory = (index: number, value: string) => {
    const updatedDirectories = [...config.restrictedDirectories];
    updatedDirectories[index] = value;
    setConfig({ ...config, restrictedDirectories: updatedDirectories });
  };

  const removeRestrictedDirectory = (index: number) => {
    const updatedDirectories = config.restrictedDirectories.filter((_, i) => i !== index);
    setConfig({ ...config, restrictedDirectories: updatedDirectories });
  };

  const generateRobotsTxt = () => {
    setIsGenerating(true);
    
    // Simulate processing delay
    setTimeout(() => {
      let robotsContent = '';
      
      // Add host directive if specified
      if (config.host) {
        robotsContent += `Host: ${config.host}\n\n`;
      }
      
      // Add default behavior
      if (config.defaultBehavior === 'disallowed') {
        robotsContent += 'User-agent: *\n';
        robotsContent += 'Disallow: /\n\n';
      } else {
        // Add restricted directories for all robots
        const validRestrictedDirs = config.restrictedDirectories.filter(dir => dir.trim());
        if (validRestrictedDirs.length > 0) {
          robotsContent += 'User-agent: *\n';
          validRestrictedDirs.forEach(dir => {
            robotsContent += `Disallow: ${dir}\n`;
          });
          robotsContent += '\n';
        }
      }
      
      // Add specific robot rules
      const robotConfigs = [
        // Google
        { name: 'Googlebot', key: 'google' },
        { name: 'Googlebot-Image', key: 'googleImage' },
        { name: 'Googlebot-Mobile', key: 'googleMobile' },
        { name: 'Googlebot-News', key: 'googleNews' },
        { name: 'Googlebot-Video', key: 'googleVideo' },
        { name: 'AdsBot-Google', key: 'googleAdsBot' },
        
        // Bing/Microsoft
        { name: 'bingbot', key: 'bingbot' },
        { name: 'msnbot', key: 'msnbot' },
        { name: 'msnbot-media', key: 'msnbotMedia' },
        
        // Yahoo
        { name: 'Slurp', key: 'yahooSlurp' },
        { name: 'Yahoo-MMCrawler', key: 'yahooMM' },
        { name: 'Yahoo-Blogs', key: 'yahooBlogs' },
        
        // Other Search Engines
        { name: 'DuckDuckBot', key: 'duckDuckBot' },
        { name: 'Baiduspider', key: 'baiduspider' },
        { name: 'YandexBot', key: 'yandexBot' },
        
        // Social Media
        { name: 'facebookexternalhit', key: 'facebookExternalHit' },
        { name: 'Twitterbot', key: 'twitterbot' },
        { name: 'LinkedInBot', key: 'linkedInBot' },
        
        // SEO Tools
        { name: 'AhrefsBot', key: 'ahrefsBot' },
        { name: 'SemrushBot', key: 'semrushBot' },
        { name: 'MozBot', key: 'mozBot' }
      ];
      
      robotConfigs.forEach(robot => {
        const behavior = config.searchRobots[robot.key as keyof RobotsConfig['searchRobots']];
        if (behavior !== 'default') {
          robotsContent += `User-agent: ${robot.name}\n`;
          if (behavior === 'disallowed') {
            robotsContent += 'Disallow: /\n';
          } else {
            robotsContent += 'Allow: /\n';
          }
          robotsContent += '\n';
        }
      });
      
      // Add user agent rules
      config.userAgents.forEach((userAgent, index) => {
        robotsContent += `User-agent: ${userAgent.userAgent}\n`;
        
        // Add allow rules
        userAgent.allow.forEach(rule => {
          robotsContent += `Allow: ${rule}\n`;
        });
        
        // Add disallow rules
        userAgent.disallow.forEach(rule => {
          robotsContent += `Disallow: ${rule}\n`;
        });
        
        // Add crawl delay if specified
        if (userAgent.crawlDelay) {
          robotsContent += `Crawl-delay: ${userAgent.crawlDelay}\n`;
        }
        
        // Add separator between user agents
        if (index < config.userAgents.length - 1) {
          robotsContent += '\n';
        }
      });
      
      // Add global crawl delay if specified
      if (config.crawlDelay !== 'default') {
        robotsContent += `User-agent: *\n`;
        robotsContent += `Crawl-delay: ${config.crawlDelay}\n\n`;
      }
      
      // Add custom rules
      if (config.customRules.length > 0) {
        robotsContent += '\n';
        config.customRules.forEach(rule => {
          if (rule.trim()) {
            robotsContent += `${rule}\n`;
          }
        });
      }
      
      // Add sitemap if specified
      if (config.sitemap.trim()) {
        robotsContent += `\nSitemap: ${config.sitemap}\n`;
      }
      
      setGeneratedRobots(robotsContent);
      setShowResults(true);
      setIsGenerating(false);
    }, 1000);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedRobots);
      alert('Robots.txt copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const downloadRobotsTxt = () => {
    const blob = new Blob([generatedRobots], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'robots.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const commonUserAgents = [
    { value: '*', label: 'All robots (*)' },
    { value: 'Googlebot', label: 'Googlebot' },
    { value: 'Bingbot', label: 'Bingbot' },
    { value: 'Slurp', label: 'Yahoo! Slurp' },
    { value: 'DuckDuckBot', label: 'DuckDuckBot' },
    { value: 'Baiduspider', label: 'Baiduspider' },
    { value: 'YandexBot', label: 'YandexBot' },
    { value: 'facebookexternalhit', label: 'Facebook' },
    { value: 'Twitterbot', label: 'Twitterbot' },
    { value: 'LinkedInBot', label: 'LinkedInBot' }
  ];

  const commonDisallowPaths = [
    '/admin/',
    '/private/',
    '/temp/',
    '/cache/',
    '/logs/',
    '/backup/',
    '/config/',
    '/includes/',
    '/wp-admin/',
    '/wp-includes/',
    '/search?',
    '/login',
    '/register',
    '/cart/',
    '/checkout/',
    '/api/',
    '/.env',
    '/.htaccess'
  ];

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
              <h1 className="text-2xl font-bold text-slate-900">Robots.txt Generator</h1>
              <p className="text-slate-600">Create robots.txt files to control search engine crawling</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Informational Header */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-blue-900 mb-3">
            Robots.txt Configuration
          </h2>
          <p className="text-blue-800 leading-relaxed">
            Robots.txt is a file placed in the root folder of a website to help search engines index the site appropriately. 
            Search engines like Google use website crawlers (robots) to review content. Parts of a website (e.g., admin pages) 
            can be explicitly ignored by adding them to this file, which uses the &ldquo;Robots Exclusion Protocol.&rdquo; 
            This website will easily generate the file for you with inputs of pages to be excluded.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Basic Configuration & Restricted Directories */}
          <div className="space-y-6">
            {/* Basic Configuration */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                <Globe className="w-5 h-5 mr-2 text-blue-500" />
                Basic Configuration
              </h3>
              <div className="space-y-4">
                {/* Default Behavior */}
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-slate-700">
                    Default - All Robots are:
                  </label>
                  <select
                    value={config.defaultBehavior}
                    onChange={(e) => setConfig({ ...config, defaultBehavior: e.target.value as 'allowed' | 'disallowed' })}
                    className="px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-700"
                  >
                    <option value="allowed">Allowed</option>
                    <option value="disallowed">Disallowed</option>
                  </select>
                </div>

                {/* Crawl Delay */}
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-slate-700">
                    Crawl-Delay:
                  </label>
                  <select
                    value={config.crawlDelay}
                    onChange={(e) => setConfig({ ...config, crawlDelay: e.target.value as 'default' | '1' | '2' | '3' | '5' | '10' })}
                    className="px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-700"
                  >
                    <option value="default">Default - No Delay</option>
                    <option value="1">1 second</option>
                    <option value="2">2 seconds</option>
                    <option value="3">3 seconds</option>
                    <option value="5">5 seconds</option>
                    <option value="10">10 seconds</option>
                  </select>
                </div>

                {/* Sitemap */}
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-slate-700">
                    Sitemap:
                  </label>
                  <input
                    type="url"
                    value={config.sitemap}
                    onChange={(e) => setConfig({ ...config, sitemap: e.target.value })}
                    className="flex-1 ml-4 px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-700"
                    placeholder="http://example.com/sitemap.xml"
                  />
                </div>

                {/* Host */}
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-slate-700">
                    Host (Optional):
                  </label>
                  <input
                    type="text"
                    value={config.host}
                    onChange={(e) => setConfig({ ...config, host: e.target.value })}
                    className="flex-1 ml-4 px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-700"
                    placeholder="example.com"
                  />
                </div>
              </div>
            </div>

            {/* Restricted Directories */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                <Shield className="w-5 h-5 mr-2 text-red-500" />
                Restricted Directories
              </h3>
              <p className="text-sm text-slate-600 mb-4">
                These directories will be blocked from all search engines. Click common paths below or add your own custom paths.
              </p>
              <p className="text-sm text-slate-600 mb-4 italic">
                The path is relative to root and must contain a trailing slash &ldquo;/&rdquo;
              </p>
              
              {/* Quick Add Common Paths */}
              <div className="mb-6 p-4 bg-slate-50 rounded-lg">
                <h4 className="text-sm font-semibold text-slate-800 mb-3">Quick Add Common Paths</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {commonDisallowPaths.map((path, index) => {
                    const isSelected = config.restrictedDirectories.includes(path);
                    return (
                      <button
                        key={index}
                        onClick={() => {
                          if (!isSelected) {
                            setConfig({
                              ...config,
                              restrictedDirectories: [...config.restrictedDirectories, path]
                            });
                          }
                        }}
                        className={`text-left p-2 border rounded transition-colors text-sm 
                          ${isSelected
                            ? 'bg-blue-100 border-blue-400 text-blue-800 cursor-default'
                            : 'border-slate-200 bg-white text-slate-700 hover:bg-white hover:text-slate-900 cursor-pointer'}
                        `}
                        disabled={isSelected}
                      >
                        {path}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Custom Directory Inputs */}
              <div className="space-y-3">
                {config.restrictedDirectories.map((directory, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={directory}
                      onChange={(e) => updateRestrictedDirectory(index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-slate-700"
                      placeholder="/admin/"
                    />
                    <button
                      onClick={() => removeRestrictedDirectory(index)}
                      className="text-red-600 hover:text-red-700 p-2"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={addRestrictedDirectory}
                  className="text-red-600 hover:text-red-700 text-sm flex items-center space-x-1"
                >
                  <Plus className="w-3 h-3" />
                  <span>Add Custom Directory</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Search Robots */}
          <div className="space-y-6">
            {/* Search Robots Section */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Search Robots</h3>
              <div className="space-y-4">
                {/* Google */}
                <div className="border-b border-slate-100 pb-2">
                  <h4 className="text-sm font-semibold text-slate-800 mb-2">Google</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-slate-700">Googlebot:</label>
                      <select
                        value={config.searchRobots.google}
                        onChange={(e) => handleSearchRobotChange('google', e.target.value)}
                        className="px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-700"
                      >
                        <option value="default">Default</option>
                        <option value="allowed">Allowed</option>
                        <option value="disallowed">Disallowed</option>
                      </select>
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-slate-700">Google Image:</label>
                      <select
                        value={config.searchRobots.googleImage}
                        onChange={(e) => handleSearchRobotChange('googleImage', e.target.value)}
                        className="px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-700"
                      >
                        <option value="default">Default</option>
                        <option value="allowed">Allowed</option>
                        <option value="disallowed">Disallowed</option>
                      </select>
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-slate-700">Google Mobile:</label>
                      <select
                        value={config.searchRobots.googleMobile}
                        onChange={(e) => handleSearchRobotChange('googleMobile', e.target.value)}
                        className="px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-700"
                      >
                        <option value="default">Default</option>
                        <option value="allowed">Allowed</option>
                        <option value="disallowed">Disallowed</option>
                      </select>
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-slate-700">Google News:</label>
                      <select
                        value={config.searchRobots.googleNews}
                        onChange={(e) => handleSearchRobotChange('googleNews', e.target.value)}
                        className="px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-700"
                      >
                        <option value="default">Default</option>
                        <option value="allowed">Allowed</option>
                        <option value="disallowed">Disallowed</option>
                      </select>
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-slate-700">Google Video:</label>
                      <select
                        value={config.searchRobots.googleVideo}
                        onChange={(e) => handleSearchRobotChange('googleVideo', e.target.value)}
                        className="px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-700"
                      >
                        <option value="default">Default</option>
                        <option value="allowed">Allowed</option>
                        <option value="disallowed">Disallowed</option>
                      </select>
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-slate-700">Google AdsBot:</label>
                      <select
                        value={config.searchRobots.googleAdsBot}
                        onChange={(e) => handleSearchRobotChange('googleAdsBot', e.target.value)}
                        className="px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-700"
                      >
                        <option value="default">Default</option>
                        <option value="allowed">Allowed</option>
                        <option value="disallowed">Disallowed</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Bing/Microsoft */}
                <div className="border-b border-slate-100 pb-2">
                  <h4 className="text-sm font-semibold text-slate-800 mb-2">Bing/Microsoft</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-slate-700">Bingbot:</label>
                      <select
                        value={config.searchRobots.bingbot}
                        onChange={(e) => handleSearchRobotChange('bingbot', e.target.value)}
                        className="px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-700"
                      >
                        <option value="default">Default</option>
                        <option value="allowed">Allowed</option>
                        <option value="disallowed">Disallowed</option>
                      </select>
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-slate-700">MSNbot:</label>
                      <select
                        value={config.searchRobots.msnbot}
                        onChange={(e) => handleSearchRobotChange('msnbot', e.target.value)}
                        className="px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-700"
                      >
                        <option value="default">Default</option>
                        <option value="allowed">Allowed</option>
                        <option value="disallowed">Disallowed</option>
                      </select>
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-slate-700">MSNbot Media:</label>
                      <select
                        value={config.searchRobots.msnbotMedia}
                        onChange={(e) => handleSearchRobotChange('msnbotMedia', e.target.value)}
                        className="px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-700"
                      >
                        <option value="default">Default</option>
                        <option value="allowed">Allowed</option>
                        <option value="disallowed">Disallowed</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Yahoo */}
                <div className="border-b border-slate-100 pb-2">
                  <h4 className="text-sm font-semibold text-slate-800 mb-2">Yahoo</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-slate-700">Yahoo Slurp:</label>
                      <select
                        value={config.searchRobots.yahooSlurp}
                        onChange={(e) => handleSearchRobotChange('yahooSlurp', e.target.value)}
                        className="px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-700"
                      >
                        <option value="default">Default</option>
                        <option value="allowed">Allowed</option>
                        <option value="disallowed">Disallowed</option>
                      </select>
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-slate-700">Yahoo MM:</label>
                      <select
                        value={config.searchRobots.yahooMM}
                        onChange={(e) => handleSearchRobotChange('yahooMM', e.target.value)}
                        className="px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-700"
                      >
                        <option value="default">Default</option>
                        <option value="allowed">Allowed</option>
                        <option value="disallowed">Disallowed</option>
                      </select>
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-slate-700">Yahoo Blogs:</label>
                      <select
                        value={config.searchRobots.yahooBlogs}
                        onChange={(e) => handleSearchRobotChange('yahooBlogs', e.target.value)}
                        className="px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-700"
                      >
                        <option value="default">Default</option>
                        <option value="allowed">Allowed</option>
                        <option value="disallowed">Disallowed</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Other Major Search Engines */}
                <div className="border-b border-slate-100 pb-2">
                  <h4 className="text-sm font-semibold text-slate-800 mb-2">Other Search Engines</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-slate-700">DuckDuckGo:</label>
                      <select
                        value={config.searchRobots.duckDuckBot}
                        onChange={(e) => handleSearchRobotChange('duckDuckBot', e.target.value)}
                        className="px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-700"
                      >
                        <option value="default">Default</option>
                        <option value="allowed">Allowed</option>
                        <option value="disallowed">Disallowed</option>
                      </select>
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-slate-700">Baidu:</label>
                      <select
                        value={config.searchRobots.baiduspider}
                        onChange={(e) => handleSearchRobotChange('baiduspider', e.target.value)}
                        className="px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-700"
                      >
                        <option value="default">Default</option>
                        <option value="allowed">Allowed</option>
                        <option value="disallowed">Disallowed</option>
                      </select>
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-slate-700">Yandex:</label>
                      <select
                        value={config.searchRobots.yandexBot}
                        onChange={(e) => handleSearchRobotChange('yandexBot', e.target.value)}
                        className="px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-700"
                      >
                        <option value="default">Default</option>
                        <option value="allowed">Allowed</option>
                        <option value="disallowed">Disallowed</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Social Media */}
                <div className="border-b border-slate-100 pb-2">
                  <h4 className="text-sm font-semibold text-slate-800 mb-2">Social Media</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-slate-700">Facebook:</label>
                      <select
                        value={config.searchRobots.facebookExternalHit}
                        onChange={(e) => handleSearchRobotChange('facebookExternalHit', e.target.value)}
                        className="px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-700"
                      >
                        <option value="default">Default</option>
                        <option value="allowed">Allowed</option>
                        <option value="disallowed">Disallowed</option>
                      </select>
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-slate-700">Twitter:</label>
                      <select
                        value={config.searchRobots.twitterbot}
                        onChange={(e) => handleSearchRobotChange('twitterbot', e.target.value)}
                        className="px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-700"
                      >
                        <option value="default">Default</option>
                        <option value="allowed">Allowed</option>
                        <option value="disallowed">Disallowed</option>
                      </select>
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-slate-700">LinkedIn:</label>
                      <select
                        value={config.searchRobots.linkedInBot}
                        onChange={(e) => handleSearchRobotChange('linkedInBot', e.target.value)}
                        className="px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-700"
                      >
                        <option value="default">Default</option>
                        <option value="allowed">Allowed</option>
                        <option value="disallowed">Disallowed</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* SEO Tools */}
                <div>
                  <h4 className="text-sm font-semibold text-slate-800 mb-2">SEO Tools</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-slate-700">Ahrefs:</label>
                      <select
                        value={config.searchRobots.ahrefsBot}
                        onChange={(e) => handleSearchRobotChange('ahrefsBot', e.target.value)}
                        className="px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-700"
                      >
                        <option value="default">Default</option>
                        <option value="allowed">Allowed</option>
                        <option value="disallowed">Disallowed</option>
                      </select>
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-slate-700">SEMrush:</label>
                      <select
                        value={config.searchRobots.semrushBot}
                        onChange={(e) => handleSearchRobotChange('semrushBot', e.target.value)}
                        className="px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-700"
                      >
                        <option value="default">Default</option>
                        <option value="allowed">Allowed</option>
                        <option value="disallowed">Disallowed</option>
                      </select>
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-slate-700">Moz:</label>
                      <select
                        value={config.searchRobots.mozBot}
                        onChange={(e) => handleSearchRobotChange('mozBot', e.target.value)}
                        className="px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-700"
                      >
                        <option value="default">Default</option>
                        <option value="allowed">Allowed</option>
                        <option value="disallowed">Disallowed</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>


        </div>

        {/* Advanced Options Toggle */}
        <div className="mt-8 text-center">
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-2 mx-auto"
          >
            <Settings className="w-4 h-4" />
            <span>{showAdvanced ? 'Hide' : 'Show'} Advanced Options</span>
          </button>
        </div>

        {/* Advanced Configuration */}
        {showAdvanced && (
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - User Agent Rules & Templates */}
            <div className="space-y-6">
              {/* User Agent Rules & Templates */}
              <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-slate-900 flex items-center">
                    <Shield className="w-5 h-5 mr-2 text-green-500" />
                    User Agent Rules & Templates
                  </h3>
                  <button
                    onClick={addUserAgent}
                    className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                  >
                    Add Rule
                  </button>
                </div>

                {/* Quick Templates */}
                <div className="mb-6 p-4 bg-slate-50 rounded-lg">
                  <h4 className="text-sm font-semibold text-slate-800 mb-3 flex items-center">
                    <FileCode className="w-4 h-4 mr-2 text-orange-500" />
                    Quick Templates
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <button
                      onClick={() => {
                        setConfig({
                          ...config,
                          userAgents: [{ userAgent: '*', allow: ['/'], disallow: ['/admin/', '/private/'] }],
                          sitemap: config.sitemap,
                          host: config.host,
                          customRules: []
                        });
                      }}
                      className="text-left p-3 border border-slate-200 rounded-lg hover:bg-white transition-colors bg-white"
                    >
                      <div className="font-medium text-slate-900">Standard Website</div>
                      <div className="text-xs text-slate-600">Allow all, block admin areas</div>
                    </button>
                    
                    <button
                      onClick={() => {
                        setConfig({
                          ...config,
                          userAgents: [{ userAgent: '*', allow: ['/'], disallow: ['/admin/', '/api/', '/config/'] }],
                          sitemap: config.sitemap,
                          host: config.host,
                          customRules: []
                        });
                      }}
                      className="text-left p-3 border border-slate-200 rounded-lg hover:bg-white transition-colors bg-white"
                    >
                      <div className="font-medium text-slate-900">E-commerce Site</div>
                      <div className="text-xs text-slate-600">Block admin, API, and config areas</div>
                    </button>
                    
                    <button
                      onClick={() => {
                        setConfig({
                          ...config,
                          userAgents: [
                            { userAgent: '*', allow: ['/'], disallow: ['/admin/'] },
                            { userAgent: 'Googlebot', allow: ['/'], disallow: [], crawlDelay: 1 }
                          ],
                          sitemap: config.sitemap,
                          host: config.host,
                          customRules: []
                        });
                      }}
                      className="text-left p-3 border border-slate-200 rounded-lg hover:bg-white transition-colors bg-white"
                    >
                      <div className="font-medium text-slate-900">Google Optimized</div>
                      <div className="text-xs text-slate-600">Special rules for Googlebot</div>
                    </button>
                  </div>
                </div>

                {/* User Agent Rules */}
                <div className="space-y-6">
                  {config.userAgents.map((userAgent, userAgentIndex) => (
                    <div key={userAgentIndex} className="border border-slate-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-medium text-slate-900">Rule {userAgentIndex + 1}</h4>
                        {config.userAgents.length > 1 && (
                          <button
                            onClick={() => removeUserAgent(userAgentIndex)}
                            className="text-red-600 hover:text-red-700 text-sm"
                          >
                            Remove
                          </button>
                        )}
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">
                            User Agent
                          </label>
                          <select
                            value={userAgent.userAgent}
                            onChange={(e) => handleUserAgentChange(userAgentIndex, 'userAgent', e.target.value)}
                            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-700"
                          >
                            {commonUserAgents.map(agent => (
                              <option key={agent.value} value={agent.value}>
                                {agent.label}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Allow Rules
                          </label>
                          <div className="space-y-2">
                            {userAgent.allow.map((rule, ruleIndex) => (
                              <div key={ruleIndex} className="flex items-center space-x-2">
                                <input
                                  type="text"
                                  value={rule}
                                  onChange={(e) => {
                                    const updatedAllow = [...userAgent.allow];
                                    updatedAllow[ruleIndex] = e.target.value;
                                    handleUserAgentChange(userAgentIndex, 'allow', updatedAllow);
                                  }}
                                  className="flex-1 px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-700"
                                  placeholder="/"
                                />
                                <button
                                  onClick={() => removeAllowRule(userAgentIndex, ruleIndex)}
                                  className="text-red-600 hover:text-red-700"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            ))}
                            <button
                              onClick={() => addAllowRule(userAgentIndex)}
                              className="text-blue-600 hover:text-blue-700 text-sm flex items-center space-x-1"
                            >
                              <Plus className="w-3 h-3" />
                              <span>Add Allow Rule</span>
                            </button>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Disallow Rules
                          </label>
                          <div className="space-y-2">
                            {userAgent.disallow.map((rule, ruleIndex) => (
                              <div key={ruleIndex} className="flex items-center space-x-2">
                                <input
                                  type="text"
                                  value={rule}
                                  onChange={(e) => {
                                    const updatedDisallow = [...userAgent.disallow];
                                    updatedDisallow[ruleIndex] = e.target.value;
                                    handleUserAgentChange(userAgentIndex, 'disallow', updatedDisallow);
                                  }}
                                  className="flex-1 px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-700"
                                  placeholder="/admin/"
                                />
                                <button
                                  onClick={() => removeDisallowRule(userAgentIndex, ruleIndex)}
                                  className="text-red-600 hover:text-red-700"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            ))}
                            <button
                              onClick={() => addDisallowRule(userAgentIndex)}
                              className="text-blue-600 hover:text-blue-700 text-sm flex items-center space-x-1"
                            >
                              <Plus className="w-3 h-3" />
                              <span>Add Disallow Rule</span>
                            </button>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">
                            Crawl Delay (Optional)
                          </label>
                          <input
                            type="number"
                            value={userAgent.crawlDelay || ''}
                            onChange={(e) => handleUserAgentChange(userAgentIndex, 'crawlDelay', e.target.value ? parseInt(e.target.value) : undefined)}
                            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-700"
                            placeholder="1"
                            min="0"
                            step="0.1"
                          />
                          <p className="text-xs text-slate-500 mt-1">
                            Number of seconds to wait between requests
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Custom Rules */}
            <div className="space-y-6">
              {/* Custom Rules */}
              <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-slate-900 flex items-center">
                    <Settings className="w-5 h-5 mr-2 text-purple-500" />
                    Custom Rules
                  </h3>
                  <button
                    onClick={addCustomRule}
                    className="px-3 py-1 bg-purple-600 text-white text-sm rounded hover:bg-purple-700 transition-colors"
                  >
                    Add Rule
                  </button>
                </div>

                <div className="space-y-2">
                  {config.customRules.map((rule, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={rule}
                        onChange={(e) => updateCustomRule(index, e.target.value)}
                        className="flex-1 px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-700"
                        placeholder="Custom rule (e.g., Clean-param: utm_source)"
                      />
                      <button
                        onClick={() => removeCustomRule(index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-8 text-center">
          <button
            onClick={generateRobotsTxt}
            disabled={isGenerating}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white font-bold py-3 px-8 rounded-md transition-colors shadow-lg flex items-center space-x-2 mx-auto"
          >
            <FileCode className="w-5 h-5" />
            <span>Generate</span>
          </button>
        </div>

        {/* Generated Results */}
        {showResults && (
          <div className="mt-8 bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900">Your Generated Robots.txt File</h3>
              <div className="flex items-center space-x-2">
                <button
                  onClick={copyToClipboard}
                  className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
                >
                  <Copy className="w-4 h-4" />
                  <span>Copy</span>
                </button>
                <button
                  onClick={downloadRobotsTxt}
                  className="flex items-center space-x-2 px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm"
                >
                  <Download className="w-4 h-4" />
                  <span>Download</span>
                </button>
                <button
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: 'Generated Robots.txt File',
                        text: 'Check out this robots.txt file I generated:',
                        url: window.location.href
                      });
                    } else {
                      copyToClipboard();
                    }
                  }}
                  className="flex items-center space-x-2 px-3 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors text-sm"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share</span>
                </button>
              </div>
            </div>
            <textarea
              value={generatedRobots}
              readOnly
              rows={20}
              className="w-full p-4 bg-slate-900 text-slate-100 rounded-lg font-mono text-sm resize-none border-0 focus:outline-none"
              placeholder="Generated robots.txt content will appear here..."
            />
          </div>
        )}



        {/* Tips Section */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">How to Use</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-slate-900 mb-2">File Placement</h4>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>• Upload robots.txt to your website root (e.g., example.com/robots.txt)</li>
                <li>• The file must be accessible at yourdomain.com/robots.txt</li>
                <li>• Use lowercase filename: robots.txt</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-slate-900 mb-2">Configuration Tips</h4>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>• &ldquo;Default&rdquo; means the robot follows the main setting</li>
                <li>• &ldquo;Allowed&rdquo; explicitly permits crawling</li>
                <li>• &ldquo;Disallowed&rdquo; blocks the robot completely</li>
                <li>• Include your sitemap URL for better indexing</li>
                <li>• Use advanced options for custom user agent rules</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 