'use client';

import { useState } from 'react';
import { Download, FileText, Code, Share2 } from 'lucide-react';
import { SEOAnalysis } from '@/types/seo';
import jsPDF from 'jspdf';

interface ExportButtonsProps {
  analysis: SEOAnalysis;
}

export default function ExportButtons({ analysis }: ExportButtonsProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  const exportToJSON = () => {
    const dataStr = JSON.stringify(analysis, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `seo-analysis-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const createShareLink = async () => {
    setIsSharing(true);
    try {
      // Create a compressed version of the analysis for URL sharing
      const shareData = {
        url: analysis.url,
        score: analysis.score,
        title: analysis.title,
        description: analysis.description,
        metaTags: analysis.metaTags.map(tag => ({
          name: tag.name,
          score: tag.score,
          maxScore: tag.maxScore,
          status: tag.status,
          feedback: tag.feedback
        })),
        recommendations: analysis.recommendations
      };

      const encodedData = btoa(JSON.stringify(shareData));
      const shareUrl = `${window.location.origin}?share=${encodedData}`;
      
      // Copy to clipboard
      await navigator.clipboard.writeText(shareUrl);
      alert('Share link copied to clipboard!');
    } catch (error) {
      console.error('Error creating share link:', error);
      
      // Fallback for older browsers
      try {
        const shareData = {
          url: analysis.url,
          score: analysis.score,
          title: analysis.title,
          description: analysis.description,
          metaTags: analysis.metaTags.map(tag => ({
            name: tag.name,
            score: tag.score,
            maxScore: tag.maxScore,
            status: tag.status,
            feedback: tag.feedback
          })),
          recommendations: analysis.recommendations
        };

        const encodedData = btoa(JSON.stringify(shareData));
        const shareUrl = `${window.location.origin}?share=${encodedData}`;
        
        const textArea = document.createElement('textarea');
        textArea.value = shareUrl;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert('Share link copied to clipboard!');
      } catch (fallbackError) {
        console.error('Fallback share link error:', fallbackError);
        alert('Failed to create share link. Please try again.');
      }
    } finally {
      setIsSharing(false);
    }
  };

  const exportToPDF = async () => {
    setIsExporting(true);
    try {
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const margin = 20;
      const contentWidth = pageWidth - (2 * margin);
      let yPosition = 20;

      // Helper function to add text with word wrapping
      const addWrappedText = (text: string, fontSize: number = 12, maxWidth: number = contentWidth) => {
        const lines = pdf.splitTextToSize(text, maxWidth);
        pdf.setFontSize(fontSize);
        pdf.text(lines, margin, yPosition);
        yPosition += (lines.length * fontSize * 0.4) + 5;
      };

      // Helper function to check if we need a new page
      const checkNewPage = () => {
        if (yPosition > 270) {
          pdf.addPage();
          yPosition = 20;
        }
      };

      // Title
      pdf.setFontSize(24);
      pdf.setFont('helvetica', 'bold');
      pdf.text('SEO Analysis Report', margin, yPosition);
      yPosition += 15;

      // URL
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'normal');
      addWrappedText(`URL: ${analysis.url}`, 12);
      checkNewPage();

      // Overall Score
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      addWrappedText(`Overall SEO Score: ${analysis.score.total}/100`, 16);
      checkNewPage();

      // Score breakdown
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      addWrappedText('Score Breakdown:', 14);
      checkNewPage();

      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'normal');
      addWrappedText(`• Search Optimization: ${analysis.score.searchOptimization}/50`, 12);
      addWrappedText(`• Social Preview: ${analysis.score.socialPreview}/30`, 12);
      addWrappedText(`• Technical Structure: ${analysis.score.technicalStructure}/20`, 12);
      checkNewPage();

      // Meta Tags Analysis
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      addWrappedText('Meta Tags Analysis:', 16);
      checkNewPage();

      analysis.metaTags.forEach((tag) => {
        pdf.setFontSize(14);
        pdf.setFont('helvetica', 'bold');
        addWrappedText(`${tag.name}: ${tag.score}/${tag.maxScore}`, 14);
        checkNewPage();

        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'normal');
        if (tag.content) {
          addWrappedText(`Content: ${tag.content}`, 12);
          checkNewPage();
        }
        addWrappedText(`Status: ${tag.feedback}`, 12);
        checkNewPage();
      });

      // Recommendations
      if (analysis.recommendations.length > 0) {
        pdf.setFontSize(16);
        pdf.setFont('helvetica', 'bold');
        addWrappedText('Recommendations:', 16);
        checkNewPage();

        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'normal');
        analysis.recommendations.forEach((recommendation, index) => {
          addWrappedText(`${index + 1}. ${recommendation}`, 12);
          checkNewPage();
        });
      }

      // Footer
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'italic');
      const footerText = `Generated by TagSnippet on ${new Date().toLocaleDateString()}`;
      pdf.text(footerText, margin, 280);

      pdf.save(`seo-analysis-${new Date().toISOString().split('T')[0]}.pdf`);
    } catch (error) {
      console.error('PDF export error:', error);
      alert('Failed to export PDF. Please try again or use JSON export instead.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="flex space-x-4">
      <button
        onClick={createShareLink}
        disabled={isSharing}
        className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-400 text-white rounded-lg transition-colors"
      >
        {isSharing ? (
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
        ) : (
          <Share2 className="h-4 w-4" />
        )}
        <span>{isSharing ? 'Copying...' : 'Share Link'}</span>
      </button>

      <button
        onClick={exportToJSON}
        className="flex items-center space-x-2 px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg transition-colors"
      >
        <Code className="h-4 w-4" />
        <span>Export JSON</span>
      </button>
      
      <button
        onClick={exportToPDF}
        disabled={isExporting}
        className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white rounded-lg transition-colors"
      >
        {isExporting ? (
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
        ) : (
          <FileText className="h-4 w-4" />
        )}
        <span>{isExporting ? 'Generating...' : 'Export PDF'}</span>
      </button>
    </div>
  );
} 