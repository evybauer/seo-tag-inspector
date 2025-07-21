import * as cheerio from 'cheerio';
import { SEOAnalysis, SEOMetaTag } from '@/types/seo';

export class SEOAnalyzer {
  private $: cheerio.CheerioAPI;

  constructor(html: string) {
    this.$ = cheerio.load(html);
  }

  async analyze(url: string): Promise<SEOAnalysis> {
    const title = this.extractTitle();
    const description = this.extractDescription();
    const metaTags = this.analyzeMetaTags();
    const openGraph = this.extractOpenGraph();
    const twitter = this.extractTwitter();
    const canonical = this.extractCanonical();
    const h1Tags = this.extractH1Tags();
    const robots = this.extractRobots();

    const score = this.calculateScore({
      title,
      description,
      metaTags,
      openGraph,
      twitter,
      canonical,
      h1Tags,
      robots
    });

    const recommendations = this.generateRecommendations({
      title,
      description,
      metaTags,
      openGraph,
      twitter,
      canonical,
      h1Tags,
      robots,
      score
    });

    return {
      url,
      title,
      description,
      metaTags,
      openGraph,
      twitter,
      canonical,
      h1Tags,
      robots,
      score,
      recommendations
    };
  }

  private extractTitle(): string {
    return this.$('title').text().trim() || '';
  }

  private extractDescription(): string {
    return this.$('meta[name="description"]').attr('content') || '';
  }

  private extractCanonical(): string {
    return this.$('link[rel="canonical"]').attr('href') || '';
  }

  private extractRobots(): string {
    return this.$('meta[name="robots"]').attr('content') || '';
  }

  private extractH1Tags(): string[] {
    return this.$('h1').map((_, el) => this.$(el).text().trim()).get();
  }

  private extractOpenGraph(): {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
    type?: string;
  } {
    return {
      title: this.$('meta[property="og:title"]').attr('content'),
      description: this.$('meta[property="og:description"]').attr('content'),
      image: this.$('meta[property="og:image"]').attr('content'),
      url: this.$('meta[property="og:url"]').attr('content'),
      type: this.$('meta[property="og:type"]').attr('content')
    };
  }

  private extractTwitter(): {
    card?: string;
    title?: string;
    description?: string;
    image?: string;
    creator?: string;
  } {
    return {
      card: this.$('meta[name="twitter:card"]').attr('content'),
      title: this.$('meta[name="twitter:title"]').attr('content'),
      description: this.$('meta[name="twitter:description"]').attr('content'),
      image: this.$('meta[name="twitter:image"]').attr('content'),
      creator: this.$('meta[name="twitter:creator"]').attr('content')
    };
  }

  private analyzeMetaTags(): SEOMetaTag[] {
    const tags: SEOMetaTag[] = [];

    // Title analysis
    const title = this.extractTitle();
    tags.push({
      name: 'Title',
      content: title,
      status: title ? 'present' : 'missing',
      score: this.scoreTitle(title),
      maxScore: 10,
      feedback: title ? 'Title is present and optimized' : 'Missing title tag',
      bestPractice: 'Keep title between 50-60 characters for optimal display in search results'
    });

    // Description analysis
    const description = this.extractDescription();
    tags.push({
      name: 'Meta Description',
      content: description,
      status: description ? 'present' : 'missing',
      score: this.scoreDescription(description),
      maxScore: 10,
      feedback: description ? 'Description is present' : 'Missing meta description',
      bestPractice: 'Keep description between 150-160 characters'
    });

    // Canonical analysis
    const canonical = this.extractCanonical();
    tags.push({
      name: 'Canonical URL',
      content: canonical,
      status: canonical ? 'present' : 'missing',
      score: canonical ? 5 : 0,
      maxScore: 5,
      feedback: canonical ? 'Canonical URL is set' : 'Missing canonical URL',
      bestPractice: 'Set canonical URL to prevent duplicate content issues'
    });

    // Robots analysis
    const robots = this.extractRobots();
    tags.push({
      name: 'Robots Meta',
      content: robots,
      status: robots ? 'present' : 'missing',
      score: robots ? 5 : 0,
      maxScore: 5,
      feedback: robots ? 'Robots meta tag is present' : 'Missing robots meta tag',
      bestPractice: 'Use robots meta tag to control search engine crawling'
    });

    // H1 analysis
    const h1Tags = this.extractH1Tags();
    tags.push({
      name: 'H1 Tags',
      content: h1Tags.join(', '),
      status: h1Tags.length > 0 ? 'present' : 'missing',
      score: this.scoreH1Tags(h1Tags),
      maxScore: 5,
      feedback: h1Tags.length > 0 ? `${h1Tags.length} H1 tag(s) found` : 'No H1 tags found',
      bestPractice: 'Use exactly one H1 tag per page for optimal SEO'
    });

    // Open Graph analysis
    const og = this.extractOpenGraph();
    const ogScore = this.scoreOpenGraph(og);
    tags.push({
      name: 'Open Graph Tags',
      content: Object.values(og).filter(Boolean).join(', '),
      status: ogScore > 0 ? 'present' : 'missing',
      score: ogScore,
      maxScore: 10,
      feedback: ogScore > 0 ? 'Open Graph tags are present' : 'Missing Open Graph tags',
      bestPractice: 'Include og:title, og:description, og:image, and og:url for social sharing'
    });

    // Twitter Card analysis
    const twitter = this.extractTwitter();
    const twitterScore = this.scoreTwitter(twitter);
    tags.push({
      name: 'Twitter Card Tags',
      content: Object.values(twitter).filter(Boolean).join(', '),
      status: twitterScore > 0 ? 'present' : 'missing',
      score: twitterScore,
      maxScore: 10,
      feedback: twitterScore > 0 ? 'Twitter Card tags are present' : 'Missing Twitter Card tags',
      bestPractice: 'Include twitter:card, twitter:title, twitter:description, and twitter:image'
    });

    return tags;
  }

  private scoreTitle(title: string): number {
    if (!title) return 0;
    if (title.length < 30) return 5;
    if (title.length <= 60) return 10;
    if (title.length <= 70) return 8;
    return 6;
  }

  private scoreDescription(description: string): number {
    if (!description) return 0;
    if (description.length < 120) return 5;
    if (description.length <= 160) return 10;
    if (description.length <= 200) return 8;
    return 6;
  }

  private scoreH1Tags(h1Tags: string[]): number {
    if (h1Tags.length === 0) return 0;
    if (h1Tags.length === 1) return 5;
    if (h1Tags.length <= 3) return 3;
    return 1;
  }

  private scoreOpenGraph(og: {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
    type?: string;
  }): number {
    let score = 0;
    if (og.title) score += 2;
    if (og.description) score += 2;
    if (og.image) score += 3;
    if (og.url) score += 2;
    if (og.type) score += 1;
    return score;
  }

  private scoreTwitter(twitter: {
    card?: string;
    title?: string;
    description?: string;
    image?: string;
    creator?: string;
  }): number {
    let score = 0;
    if (twitter.card) score += 2;
    if (twitter.title) score += 2;
    if (twitter.description) score += 2;
    if (twitter.image) score += 3;
    if (twitter.creator) score += 1;
    return score;
  }

  private calculateScore(data: {
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
    canonical: string;
    h1Tags: string[];
    robots: string;
  }) {
    const searchOptimization = Math.min(50, 
      (data.title ? this.scoreTitle(data.title) : 0) * 2 +
      (data.description ? this.scoreDescription(data.description) : 0) * 2 +
      (data.canonical ? 10 : 0) +
      (data.robots ? 10 : 0) +
      this.scoreH1Tags(data.h1Tags) * 2
    );

    const socialPreview = Math.min(30,
      this.scoreOpenGraph(data.openGraph) * 2 +
      this.scoreTwitter(data.twitter) * 2
    );

    const technicalStructure = Math.min(20,
      (data.title ? 5 : 0) +
      (data.description ? 5 : 0) +
      (data.canonical ? 5 : 0) +
      (data.robots ? 5 : 0)
    );

    return {
      total: searchOptimization + socialPreview + technicalStructure,
      searchOptimization,
      socialPreview,
      technicalStructure
    };
  }

  private generateRecommendations(data: {
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
    canonical: string;
    h1Tags: string[];
    robots: string;
    score: {
      total: number;
      searchOptimization: number;
      socialPreview: number;
      technicalStructure: number;
    };
  }): string[] {
    const recommendations: string[] = [];

    if (!data.title) {
      recommendations.push('Add a title tag to your page');
    } else if (data.title.length > 60) {
      recommendations.push('Consider shortening your title to under 60 characters');
    }

    if (!data.description) {
      recommendations.push('Add a meta description to improve click-through rates');
    } else if (data.description.length > 160) {
      recommendations.push('Consider shortening your meta description to under 160 characters');
    }

    if (!data.canonical) {
      recommendations.push('Add a canonical URL to prevent duplicate content issues');
    }

    if (data.h1Tags.length === 0) {
      recommendations.push('Add an H1 tag to your page for better SEO structure');
    } else if (data.h1Tags.length > 1) {
      recommendations.push('Consider using only one H1 tag per page');
    }

    if (!data.openGraph.title || !data.openGraph.description) {
      recommendations.push('Add Open Graph tags for better social media sharing');
    }

    if (!data.twitter.card || !data.twitter.title) {
      recommendations.push('Add Twitter Card tags for better Twitter sharing');
    }

    return recommendations;
  }
} 