'use client';

import { Search, FileText, Hash, FileCode, Settings, Network } from 'lucide-react';
import Link from 'next/link';

interface Tool {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  status: 'available' | 'coming-soon';
  color: string;
}

const tools: Tool[] = [
  {
    id: 'seo-analysis',
    name: 'SEO Analysis',
    description: 'Analyze website SEO performance and get detailed reports',
    icon: <Search className="w-5 h-5" />,
    status: 'available',
    color: 'bg-blue-500'
  },
  {
    id: 'meta-generator',
    name: 'Meta Tag Generator',
    description: 'Generate optimized meta tags for your web pages',
    icon: <FileText className="w-5 h-5" />,
    status: 'available',
    color: 'bg-green-500'
  },
  {
    id: 'keyword-generator',
    name: 'Keyword Generator',
    description: 'Find relevant keywords for your content strategy',
    icon: <Hash className="w-5 h-5" />,
    status: 'available',
    color: 'bg-purple-500'
  },
  {
    id: 'robots-generator',
    name: 'Robots.txt Generator',
    description: 'Create robots.txt files for search engine crawling',
    icon: <FileCode className="w-5 h-5" />,
    status: 'available',
    color: 'bg-orange-500'
  },
  {
    id: 'htaccess-generator',
    name: '.htaccess Generator',
    description: 'Generate .htaccess files for Apache server optimization',
    icon: <Settings className="w-5 h-5" />,
    status: 'coming-soon',
    color: 'bg-red-500'
  },
  {
    id: 'sitemap-generator',
    name: 'XML Sitemap Generator',
    description: 'Create XML sitemaps for better search engine indexing',
    icon: <Network className="w-5 h-5" />,
    status: 'coming-soon',
    color: 'bg-teal-500'
  }
];

export default function ToolNavigation() {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">
        SEO Toolbox
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch">
        {tools.map((tool) => {
          const ToolContent = (
            <div className="bg-white rounded-lg border border-slate-200 p-6 h-full">
              <div className="flex items-start space-x-4">
                <div className={`${tool.color} text-white p-3 rounded-lg flex-shrink-0`}>
                  {tool.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-lg font-semibold text-slate-900">
                      {tool.name}
                    </h3>
                    {tool.status === 'coming-soon' && (
                      <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                        Coming Soon
                      </span>
                    )}
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {tool.description}
                  </p>
                </div>
              </div>
              
              {tool.status === 'coming-soon' && (
                <div className="absolute inset-0 bg-slate-50/50 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-2">
                      <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <p className="text-xs text-slate-500 font-medium">Coming Soon</p>
                  </div>
                </div>
              )}
            </div>
          );

          return (
            <div
              key={tool.id}
              className={`relative group transition-all duration-200 h-full ${
                tool.status === 'available' 
                  ? 'hover:shadow-lg hover:-translate-y-1' 
                  : 'opacity-60 cursor-not-allowed'
              }`}
            >
              {tool.status === 'available' ? (
                <Link href={
                  tool.id === 'meta-generator' ? '/meta-tag-generator' :
                  tool.id === 'keyword-generator' ? '/keyword-generator' :
                  tool.id === 'robots-generator' ? '/robots-generator' :
                  '/'
                }>
                  <div className="cursor-pointer">
                    {ToolContent}
                  </div>
                </Link>
              ) : (
                <div className="cursor-not-allowed">
                  {ToolContent}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
} 