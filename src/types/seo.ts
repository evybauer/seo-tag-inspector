export interface SEOMetaTag {
  name: string;
  content: string;
  property?: string;
  status: 'present' | 'missing' | 'invalid';
  score: number;
  maxScore: number;
  feedback: string;
  bestPractice?: string;
}

export interface SEOAnalysis {
  url: string;
  title: string;
  description: string;
  metaTags: SEOMetaTag[];
  openGraph: {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
    type?: string;
  };
  twitter: {
    card?: string;
    title?: string;
    description?: string;
    image?: string;
    creator?: string;
  };
  canonical?: string;
  h1Tags: string[];
  robots?: string;
  score: {
    total: number;
    searchOptimization: number;
    socialPreview: number;
    technicalStructure: number;
  };
  recommendations: string[];
}

export interface PreviewData {
  google: {
    title: string;
    url: string;
    description: string;
  };
  facebook: {
    title: string;
    description: string;
    image: string;
    url: string;
  };
  twitter: {
    title: string;
    description: string;
    image: string;
    url: string;
  };
} 