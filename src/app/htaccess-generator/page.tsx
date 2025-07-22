'use client';

import { useState } from 'react';
import { 
  FileCode, 
  Copy, 
  Download, 
  Share2, 
  Shield, 
  Zap, 
  Globe, 
  Lock,
  Settings,
  ArrowRight,
  RefreshCw,
  AlertTriangle,
  Ban,
  FolderOpen,
  List,
  Plus,
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link';
import ToolHeader from '@/components/ToolHeader';

interface HtaccessConfig {
  // Error Documents
  errorDocuments: {
    '401': string;
    '404': string;
    '500': string;
  };
  
  // IP Deny/Allow
  ipDenyAllow: {
    denyIps: string[];
    allowIps: string[];
  };
  
  // Directory Index
  directoryIndex: {
    enabled: boolean;
    defaultFiles: string[];
  };
  
  // Directory Listings
  directoryListings: {
    enabled: boolean;
    excludeFiles: string[];
  };
  
  // Additional Options
  additionalOptions: {
    enableCompression: boolean;
    enableCaching: boolean;
    enableSecurityHeaders: boolean;
    enableHttpsRedirect: boolean;
    blockBadBots: boolean;
    blockHotlinking: boolean;
  };
  
  // Redirects
  redirects: Array<{
    from: string;
    to: string;
    type: '301' | '302';
  }>;
  
  // Custom Rules
  customRules: string[];
}

type ActiveSection = 'error-documents' | 'ip-deny-allow' | 'directory-index' | 'directory-listings' | 'additional-options' | 'redirects' | 'custom-rules';

export default function HtaccessGenerator() {
  const [config, setConfig] = useState<HtaccessConfig>({
    errorDocuments: {
      '401': '/401.html',
      '404': '/404.html',
      '500': '/500.html'
    },
    ipDenyAllow: {
      denyIps: [],
      allowIps: []
    },
    directoryIndex: {
      enabled: true,
      defaultFiles: ['index.html', 'index.php', 'default.html']
    },
    directoryListings: {
      enabled: false,
      excludeFiles: ['.htaccess', '.htpasswd', '.env']
    },
    additionalOptions: {
      enableCompression: true,
      enableCaching: true,
      enableSecurityHeaders: true,
      enableHttpsRedirect: true,
      blockBadBots: true,
      blockHotlinking: true
    },
    redirects: [],
    customRules: []
  });

  const [activeSection, setActiveSection] = useState<ActiveSection>('error-documents');
  const [generatedHtaccess, setGeneratedHtaccess] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const addIpDeny = () => {
    setConfig({
      ...config,
      ipDenyAllow: {
        ...config.ipDenyAllow,
        denyIps: [...config.ipDenyAllow.denyIps, '']
      }
    });
  };

  const updateIpDeny = (index: number, value: string) => {
    const newDenyIps = [...config.ipDenyAllow.denyIps];
    newDenyIps[index] = value;
    setConfig({
      ...config,
      ipDenyAllow: { ...config.ipDenyAllow, denyIps: newDenyIps }
    });
  };

  const removeIpDeny = (index: number) => {
    setConfig({
      ...config,
      ipDenyAllow: {
        ...config.ipDenyAllow,
        denyIps: config.ipDenyAllow.denyIps.filter((_, i) => i !== index)
      }
    });
  };

  const addIpAllow = () => {
    setConfig({
      ...config,
      ipDenyAllow: {
        ...config.ipDenyAllow,
        allowIps: [...config.ipDenyAllow.allowIps, '']
      }
    });
  };

  const updateIpAllow = (index: number, value: string) => {
    const newAllowIps = [...config.ipDenyAllow.allowIps];
    newAllowIps[index] = value;
    setConfig({
      ...config,
      ipDenyAllow: { ...config.ipDenyAllow, allowIps: newAllowIps }
    });
  };

  const removeIpAllow = (index: number) => {
    setConfig({
      ...config,
      ipDenyAllow: {
        ...config.ipDenyAllow,
        allowIps: config.ipDenyAllow.allowIps.filter((_, i) => i !== index)
      }
    });
  };

  const addDefaultFile = () => {
    setConfig({
      ...config,
      directoryIndex: {
        ...config.directoryIndex,
        defaultFiles: [...config.directoryIndex.defaultFiles, '']
      }
    });
  };

  const updateDefaultFile = (index: number, value: string) => {
    const newFiles = [...config.directoryIndex.defaultFiles];
    newFiles[index] = value;
    setConfig({
      ...config,
      directoryIndex: { ...config.directoryIndex, defaultFiles: newFiles }
    });
  };

  const removeDefaultFile = (index: number) => {
    setConfig({
      ...config,
      directoryIndex: {
        ...config.directoryIndex,
        defaultFiles: config.directoryIndex.defaultFiles.filter((_, i) => i !== index)
      }
    });
  };

  const addExcludeFile = () => {
    setConfig({
      ...config,
      directoryListings: {
        ...config.directoryListings,
        excludeFiles: [...config.directoryListings.excludeFiles, '']
      }
    });
  };

  const updateExcludeFile = (index: number, value: string) => {
    const newFiles = [...config.directoryListings.excludeFiles];
    newFiles[index] = value;
    setConfig({
      ...config,
      directoryListings: { ...config.directoryListings, excludeFiles: newFiles }
    });
  };

  const removeExcludeFile = (index: number) => {
    setConfig({
      ...config,
      directoryListings: {
        ...config.directoryListings,
        excludeFiles: config.directoryListings.excludeFiles.filter((_, i) => i !== index)
      }
    });
  };

  const addRedirect = () => {
    setConfig({
      ...config,
      redirects: [...config.redirects, { from: '', to: '', type: '301' }]
    });
  };

  const updateRedirect = (index: number, field: 'from' | 'to' | 'type', value: string) => {
    const newRedirects = [...config.redirects];
    newRedirects[index] = { ...newRedirects[index], [field]: value };
    setConfig({ ...config, redirects: newRedirects });
  };

  const removeRedirect = (index: number) => {
    setConfig({
      ...config,
      redirects: config.redirects.filter((_, i) => i !== index)
    });
  };

  const addCustomRule = () => {
    setConfig({
      ...config,
      customRules: [...config.customRules, '']
    });
  };

  const updateCustomRule = (index: number, value: string) => {
    const newRules = [...config.customRules];
    newRules[index] = value;
    setConfig({ ...config, customRules: newRules });
  };

  const removeCustomRule = (index: number) => {
    setConfig({
      ...config,
      customRules: config.customRules.filter((_, i) => i !== index)
    });
  };

  const generateHtaccess = () => {
    setIsGenerating(true);
    
    let htaccess = '# .htaccess File Generated by SEO Toolbox\n';
    htaccess += '# Generated on: ' + new Date().toLocaleDateString() + '\n\n';

    // Error Documents
    Object.entries(config.errorDocuments).forEach(([code, path]) => {
      if (path.trim()) {
        htaccess += `ErrorDocument ${code} ${path}\n`;
      }
    });
    if (Object.values(config.errorDocuments).some(path => path.trim())) {
      htaccess += '\n';
    }

    // IP Deny/Allow
    if (config.ipDenyAllow.denyIps.length > 0 || config.ipDenyAllow.allowIps.length > 0) {
      htaccess += '# IP Access Control\n';
      if (config.ipDenyAllow.denyIps.length > 0) {
        config.ipDenyAllow.denyIps.forEach(ip => {
          if (ip.trim()) {
            htaccess += `Deny from ${ip}\n`;
          }
        });
      }
      if (config.ipDenyAllow.allowIps.length > 0) {
        config.ipDenyAllow.allowIps.forEach(ip => {
          if (ip.trim()) {
            htaccess += `Allow from ${ip}\n`;
          }
        });
      }
      htaccess += '\n';
    }

    // Directory Index
    if (config.directoryIndex.enabled) {
      htaccess += '# Directory Index\n';
      htaccess += 'DirectoryIndex ' + config.directoryIndex.defaultFiles.filter(f => f.trim()).join(' ') + '\n\n';
    }

    // Directory Listings
    if (!config.directoryListings.enabled) {
      htaccess += '# Disable Directory Listings\n';
      htaccess += 'Options -Indexes\n\n';
    }

    // Additional Options
    if (config.additionalOptions.enableCompression) {
      htaccess += '# Enable Compression\n';
      htaccess += '<IfModule mod_deflate.c>\n';
      htaccess += '    AddOutputFilterByType DEFLATE text/plain\n';
      htaccess += '    AddOutputFilterByType DEFLATE text/html\n';
      htaccess += '    AddOutputFilterByType DEFLATE text/css\n';
      htaccess += '    AddOutputFilterByType DEFLATE application/javascript\n';
      htaccess += '    AddOutputFilterByType DEFLATE application/x-javascript\n';
      htaccess += '</IfModule>\n\n';
    }

    if (config.additionalOptions.enableCaching) {
      htaccess += '# Browser Caching\n';
      htaccess += '<IfModule mod_expires.c>\n';
      htaccess += '    ExpiresActive on\n';
      htaccess += '    ExpiresByType image/jpg "access plus 1 month"\n';
      htaccess += '    ExpiresByType image/jpeg "access plus 1 month"\n';
      htaccess += '    ExpiresByType image/gif "access plus 1 month"\n';
      htaccess += '    ExpiresByType image/png "access plus 1 month"\n';
      htaccess += '    ExpiresByType text/css "access plus 1 week"\n';
      htaccess += '    ExpiresByType application/javascript "access plus 1 week"\n';
      htaccess += '    ExpiresDefault "access plus 1 hour"\n';
      htaccess += '</IfModule>\n\n';
    }

    if (config.additionalOptions.enableSecurityHeaders) {
      htaccess += '# Security Headers\n';
      htaccess += '<IfModule mod_headers.c>\n';
      htaccess += '    Header always set X-Content-Type-Options nosniff\n';
      htaccess += '    Header always set X-Frame-Options DENY\n';
      htaccess += '    Header always set X-XSS-Protection "1; mode=block"\n';
      htaccess += '</IfModule>\n\n';
    }

    if (config.additionalOptions.enableHttpsRedirect) {
      htaccess += '# Force HTTPS\n';
      htaccess += '<IfModule mod_rewrite.c>\n';
      htaccess += '    RewriteEngine On\n';
      htaccess += '    RewriteCond %{HTTPS} off\n';
      htaccess += '    RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]\n';
      htaccess += '</IfModule>\n\n';
    }

    if (config.additionalOptions.blockBadBots) {
      htaccess += '# Block Bad Bots\n';
      htaccess += '<IfModule mod_rewrite.c>\n';
      htaccess += '    RewriteEngine On\n';
      htaccess += '    RewriteCond %{HTTP_USER_AGENT} ^$ [OR]\n';
      htaccess += '    RewriteCond %{HTTP_USER_AGENT} ^(java|curl|wget).* [NC,OR]\n';
      htaccess += '    RewriteCond %{HTTP_USER_AGENT} ^.*(libwww-perl|curl|wget|python|nikto|scan).* [NC]\n';
      htaccess += '    RewriteRule .* - [F,L]\n';
      htaccess += '</IfModule>\n\n';
    }

    if (config.additionalOptions.blockHotlinking) {
      htaccess += '# Block Image Hotlinking\n';
      htaccess += '<IfModule mod_rewrite.c>\n';
      htaccess += '    RewriteEngine On\n';
      htaccess += '    RewriteCond %{HTTP_REFERER} !^$\n';
      htaccess += '    RewriteCond %{HTTP_REFERER} !^http(s)?://(www\\.)?yourdomain.com [NC]\n';
      htaccess += '    RewriteRule \\.(jpg|jpeg|png|gif|webp)$ - [NC,F,L]\n';
      htaccess += '</IfModule>\n\n';
    }

    // Redirects
    if (config.redirects.length > 0) {
      htaccess += '# Custom Redirects\n';
      htaccess += '<IfModule mod_rewrite.c>\n';
      htaccess += '    RewriteEngine On\n';
      config.redirects.forEach(redirect => {
        if (redirect.from && redirect.to) {
          htaccess += '    RewriteRule ^' + redirect.from + '$ ' + redirect.to + ' [R=' + redirect.type + ',L]\n';
        }
      });
      htaccess += '</IfModule>\n\n';
    }

    // Custom Rules
    if (config.customRules.length > 0) {
      htaccess += '# Custom Rules\n';
      config.customRules.forEach(rule => {
        if (rule.trim()) {
          htaccess += rule + '\n';
        }
      });
      htaccess += '\n';
    }

    setGeneratedHtaccess(htaccess);
    setIsGenerating(false);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedHtaccess);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const downloadHtaccess = () => {
    const blob = new Blob([generatedHtaccess], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = '.htaccess';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const shareHtaccess = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: '.htaccess File',
          text: 'Generated .htaccess file from SEO Toolbox',
          url: window.location.href
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      copyToClipboard();
    }
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'error-documents':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-900">Error Documents</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">401 Location</label>
                <input
                  type="text"
                  value={config.errorDocuments['401']}
                  onChange={(e) => setConfig({
                    ...config,
                    errorDocuments: { ...config.errorDocuments, '401': e.target.value }
                  })}
                  placeholder="/401.html"
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-slate-700 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">404 Location</label>
                <input
                  type="text"
                  value={config.errorDocuments['404']}
                  onChange={(e) => setConfig({
                    ...config,
                    errorDocuments: { ...config.errorDocuments, '404': e.target.value }
                  })}
                  placeholder="/404.html"
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-slate-700 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">500 Location</label>
                <input
                  type="text"
                  value={config.errorDocuments['500']}
                  onChange={(e) => setConfig({
                    ...config,
                    errorDocuments: { ...config.errorDocuments, '500': e.target.value }
                  })}
                  placeholder="/500.html"
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-slate-700 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        );

      case 'ip-deny-allow':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-900">IP Deny/Allow</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-medium text-slate-700 mb-3">Deny IP Addresses</h4>
                <div className="space-y-2">
                  {config.ipDenyAllow.denyIps.map((ip, index) => (
                    <div key={index} className="flex space-x-2">
                      <input
                        type="text"
                        value={ip}
                        onChange={(e) => updateIpDeny(index, e.target.value)}
                        placeholder="192.168.1.1"
                        className="flex-1 px-3 py-2 border border-slate-300 rounded-md text-slate-700 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <button
                        onClick={() => removeIpDeny(index)}
                        className="px-3 py-2 text-red-600 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={addIpDeny}
                    className="w-full py-2 px-4 border-2 border-dashed border-slate-300 rounded-lg text-slate-600 hover:border-slate-400 hover:text-slate-700 transition-colors"
                  >
                    + Add IP to Deny
                  </button>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-slate-700 mb-3">Allow IP Addresses</h4>
                <div className="space-y-2">
                  {config.ipDenyAllow.allowIps.map((ip, index) => (
                    <div key={index} className="flex space-x-2">
                      <input
                        type="text"
                        value={ip}
                        onChange={(e) => updateIpAllow(index, e.target.value)}
                        placeholder="192.168.1.1"
                        className="flex-1 px-3 py-2 border border-slate-300 rounded-md text-slate-700 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <button
                        onClick={() => removeIpAllow(index)}
                        className="px-3 py-2 text-red-600 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={addIpAllow}
                    className="w-full py-2 px-4 border-2 border-dashed border-slate-300 rounded-lg text-slate-600 hover:border-slate-400 hover:text-slate-700 transition-colors"
                  >
                    + Add IP to Allow
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'directory-index':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-900">Directory Index</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-slate-700">Enable Directory Index</label>
                  <p className="text-xs text-slate-500">Show default files when accessing directories</p>
                </div>
                <input
                  type="checkbox"
                  checked={config.directoryIndex.enabled}
                  onChange={(e) => setConfig({
                    ...config,
                    directoryIndex: { ...config.directoryIndex, enabled: e.target.checked }
                  })}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">Default Files (in order of preference)</label>
                <div className="space-y-2">
                  {config.directoryIndex.defaultFiles.map((file, index) => (
                    <div key={index} className="flex space-x-2">
                      <input
                        type="text"
                        value={file}
                        onChange={(e) => updateDefaultFile(index, e.target.value)}
                        placeholder="index.html"
                        className="flex-1 px-3 py-2 border border-slate-300 rounded-md text-slate-700 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <button
                        onClick={() => removeDefaultFile(index)}
                        className="px-3 py-2 text-red-600 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={addDefaultFile}
                    className="w-full py-2 px-4 border-2 border-dashed border-slate-300 rounded-lg text-slate-600 hover:border-slate-400 hover:text-slate-700 transition-colors"
                  >
                    + Add Default File
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'directory-listings':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-900">Directory Listings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-slate-700">Enable Directory Listings</label>
                  <p className="text-xs text-slate-500">Show file listings when no index file exists</p>
                </div>
                <input
                  type="checkbox"
                  checked={config.directoryListings.enabled}
                  onChange={(e) => setConfig({
                    ...config,
                    directoryListings: { ...config.directoryListings, enabled: e.target.checked }
                  })}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">Exclude Files from Listings</label>
                <div className="space-y-2">
                  {config.directoryListings.excludeFiles.map((file, index) => (
                    <div key={index} className="flex space-x-2">
                      <input
                        type="text"
                        value={file}
                        onChange={(e) => updateExcludeFile(index, e.target.value)}
                        placeholder=".htaccess"
                        className="flex-1 px-3 py-2 border border-slate-300 rounded-md text-slate-700 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <button
                        onClick={() => removeExcludeFile(index)}
                        className="px-3 py-2 text-red-600 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={addExcludeFile}
                    className="w-full py-2 px-4 border-2 border-dashed border-slate-300 rounded-lg text-slate-600 hover:border-slate-400 hover:text-slate-700 transition-colors"
                  >
                    + Add Exclude File
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'additional-options':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-900">Additional Options</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-slate-700">Enable Compression</label>
                  <p className="text-xs text-slate-500">Gzip/deflate compression for better performance</p>
                </div>
                <input
                  type="checkbox"
                  checked={config.additionalOptions.enableCompression}
                  onChange={(e) => setConfig({
                    ...config,
                    additionalOptions: { ...config.additionalOptions, enableCompression: e.target.checked }
                  })}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-slate-700">Enable Caching</label>
                  <p className="text-xs text-slate-500">Browser caching for static assets</p>
                </div>
                <input
                  type="checkbox"
                  checked={config.additionalOptions.enableCaching}
                  onChange={(e) => setConfig({
                    ...config,
                    additionalOptions: { ...config.additionalOptions, enableCaching: e.target.checked }
                  })}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-slate-700">Security Headers</label>
                  <p className="text-xs text-slate-500">Add security headers (XSS protection, etc.)</p>
                </div>
                <input
                  type="checkbox"
                  checked={config.additionalOptions.enableSecurityHeaders}
                  onChange={(e) => setConfig({
                    ...config,
                    additionalOptions: { ...config.additionalOptions, enableSecurityHeaders: e.target.checked }
                  })}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-slate-700">Force HTTPS</label>
                  <p className="text-xs text-slate-500">Redirect HTTP to HTTPS</p>
                </div>
                <input
                  type="checkbox"
                  checked={config.additionalOptions.enableHttpsRedirect}
                  onChange={(e) => setConfig({
                    ...config,
                    additionalOptions: { ...config.additionalOptions, enableHttpsRedirect: e.target.checked }
                  })}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-slate-700">Block Bad Bots</label>
                  <p className="text-xs text-slate-500">Block malicious bots and crawlers</p>
                </div>
                <input
                  type="checkbox"
                  checked={config.additionalOptions.blockBadBots}
                  onChange={(e) => setConfig({
                    ...config,
                    additionalOptions: { ...config.additionalOptions, blockBadBots: e.target.checked }
                  })}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-slate-700">Block Hotlinking</label>
                  <p className="text-xs text-slate-500">Prevent image hotlinking from other sites</p>
                </div>
                <input
                  type="checkbox"
                  checked={config.additionalOptions.blockHotlinking}
                  onChange={(e) => setConfig({
                    ...config,
                    additionalOptions: { ...config.additionalOptions, blockHotlinking: e.target.checked }
                  })}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        );

      case 'redirects':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-900">Redirects</h3>
            <div className="space-y-4">
              {config.redirects.map((redirect, index) => (
                <div key={index} className="border border-slate-200 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">From</label>
                      <input
                        type="text"
                        value={redirect.from}
                        onChange={(e) => updateRedirect(index, 'from', e.target.value)}
                        placeholder="/old-page"
                        className="w-full px-3 py-2 border border-slate-300 rounded-md text-slate-700 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">To</label>
                      <input
                        type="text"
                        value={redirect.to}
                        onChange={(e) => updateRedirect(index, 'to', e.target.value)}
                        placeholder="/new-page"
                        className="w-full px-3 py-2 border border-slate-300 rounded-md text-slate-700 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Type</label>
                      <select
                        value={redirect.type}
                        onChange={(e) => updateRedirect(index, 'type', e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="301">301 (Permanent)</option>
                        <option value="302">302 (Temporary)</option>
                      </select>
                    </div>
                  </div>
                  <button
                    onClick={() => removeRedirect(index)}
                    className="mt-2 text-red-600 hover:text-red-700 text-sm"
                  >
                    Remove
                  </button>
                </div>
              ))}
              
              <button
                onClick={addRedirect}
                className="w-full py-2 px-4 border-2 border-dashed border-slate-300 rounded-lg text-slate-600 hover:border-slate-400 hover:text-slate-700 transition-colors"
              >
                + Add Redirect
              </button>
            </div>
          </div>
        );

      case 'custom-rules':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-900">Custom Rules</h3>
            <div className="space-y-4">
              {config.customRules.map((rule, index) => (
                <div key={index} className="flex space-x-2">
                  <textarea
                    value={rule}
                    onChange={(e) => updateCustomRule(index, e.target.value)}
                    placeholder="Enter custom .htaccess rule..."
                    className="flex-1 px-3 py-2 border border-slate-300 rounded-md text-slate-700 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={2}
                  />
                  <button
                    onClick={() => removeCustomRule(index)}
                    className="px-3 py-2 text-red-600 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              ))}
              
              <button
                onClick={addCustomRule}
                className="w-full py-2 px-4 border-2 border-dashed border-slate-300 rounded-lg text-slate-600 hover:border-slate-400 hover:text-slate-700 transition-colors"
              >
                + Add Custom Rule
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
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
        title=".htaccess Generator"
        description="Create powerful .htaccess files for Apache servers. Configure error pages, IP restrictions, directory settings, and more to optimize your website's performance and security."
        icon={<FileCode className="w-8 h-8 text-blue-600" />}
      />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">


        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Column - Options Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-slate-200 p-4">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Options</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setActiveSection('error-documents')}
                  className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                    activeSection === 'error-documents'
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  Error Documents
                </button>
                <button
                  onClick={() => setActiveSection('ip-deny-allow')}
                  className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                    activeSection === 'ip-deny-allow'
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  IP Deny/Allow
                </button>
                <button
                  onClick={() => setActiveSection('directory-index')}
                  className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                    activeSection === 'directory-index'
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  Directory Index
                </button>
                <button
                  onClick={() => setActiveSection('directory-listings')}
                  className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                    activeSection === 'directory-listings'
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  Directory Listings
                </button>
                <button
                  onClick={() => setActiveSection('additional-options')}
                  className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                    activeSection === 'additional-options'
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  Additional Options
                </button>
                <button
                  onClick={() => setActiveSection('redirects')}
                  className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                    activeSection === 'redirects'
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  Redirects
                </button>
                <button
                  onClick={() => setActiveSection('custom-rules')}
                  className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                    activeSection === 'custom-rules'
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  Custom Rules
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Configuration */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg border border-slate-200 p-6">
              {renderSection()}
            </div>
          </div>
        </div>

        {/* Generate Button */}
        <div className="mt-8 text-center">
          <button
            onClick={generateHtaccess}
            disabled={isGenerating}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white font-bold py-3 px-8 rounded-md transition-colors shadow-lg flex items-center space-x-2 mx-auto"
          >
            <FileCode className="w-5 h-5" />
            <span>Generate</span>
          </button>
        </div>

        {/* Generated .htaccess */}
        {generatedHtaccess && (
          <div className="mt-8 bg-white rounded-lg border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900">Your Generated Htaccess File</h3>
              <div className="flex items-center space-x-2">
                <button onClick={copyToClipboard} className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm">
                  <Copy className="w-4 h-4" />
                  <span>Copy</span>
                </button>
                <button onClick={downloadHtaccess} className="flex items-center space-x-2 px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm">
                  <Download className="w-4 h-4" />
                  <span>Download</span>
                </button>
                <button onClick={shareHtaccess} className="flex items-center space-x-2 px-3 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors text-sm">
                  <Share2 className="w-4 h-4" />
                  <span>Share</span>
                </button>
              </div>
            </div>
            
            <textarea
              value={generatedHtaccess}
              readOnly
              className="w-full h-64 p-4 border border-slate-300 rounded-lg bg-slate-50 text-slate-700 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        )}

        {/* How to Use */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">How to Use</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-blue-800">
            <div>
              <h4 className="font-medium mb-2">1. Upload to Server</h4>
              <p>Upload the generated .htaccess file to your website's root directory (public_html, www, or htdocs).</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">2. Test Configuration</h4>
              <p>Test your website to ensure all redirects and security rules work correctly before going live.</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">3. Monitor Performance</h4>
              <p>Use tools like Google PageSpeed Insights to verify that compression and caching are working.</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">4. Backup Original</h4>
              <p>Always backup your original .htaccess file before replacing it with the new one.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 