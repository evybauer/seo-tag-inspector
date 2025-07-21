import { NextRequest, NextResponse } from 'next/server';
import { SEOAnalyzer } from '@/lib/seoAnalyzer';

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      );
    }

    // Validate URL format
    let validUrl: URL;
    try {
      validUrl = new URL(url);
    } catch {
      return NextResponse.json(
        { error: 'Invalid URL format' },
        { status: 400 }
      );
    }

    // Fetch HTML content
    const response = await fetch(validUrl.toString(), {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; TagSnippet/1.0; +https://tagsnippet.com)',
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch URL: ${response.status} ${response.statusText}` },
        { status: response.status }
      );
    }

    const html = await response.text();

    // Analyze SEO
    const analyzer = new SEOAnalyzer(html);
    const analysis = await analyzer.analyze(validUrl.toString());

    return NextResponse.json(analysis);
  } catch (error) {
    console.error('SEO analysis error:', error);
    return NextResponse.json(
      { error: 'Failed to analyze URL. Please try again.' },
      { status: 500 }
    );
  }
} 