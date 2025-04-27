
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import AIConfidenceScore from './AIConfidenceScore';
import { BookOpen, MessageCircle } from 'lucide-react';

interface SummaryOutputProps {
  summary: string[];
  isLoading: boolean;
}

const SummaryOutput: React.FC<SummaryOutputProps> = ({ summary, isLoading }) => {
  const confidenceScore = Math.floor(Math.random() * (95 - 75 + 1)) + 75; // Simulated AI confidence score

  const keyInsights = summary.map(point => {
    const keywords = point.match(/\b(important|significant|key|critical|essential|primarily|mainly)\b/gi) || [];
    const hasKeywords = keywords.length > 0;
    return { text: point, isKeyInsight: hasKeywords };
  });

  if (isLoading) {
    return (
      <div className="space-y-4 animate-fade-in">
        <h2 className="text-2xl font-semibold">Summary</h2>
        <Card>
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <div className="h-5 w-5 rounded-full gradient-bg animate-spin"></div>
              Generating summary...
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Our AI is analyzing your text and extracting the key points...
            </p>
            <div className="mt-4 space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-6 bg-gray-100 rounded animate-pulse"></div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!summary.length) {
    return null;
  }

  return (
    <div className="space-y-4 animate-fade-in">
      <h2 className="text-2xl font-semibold">Summary</h2>
      <div className="grid gap-4 md:grid-cols-[2fr,1fr]">
        <Card className="order-2 md:order-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl gradient-text flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Key Points
            </CardTitle>
            <div className="flex items-center text-sm text-muted-foreground">
              <MessageCircle className="h-4 w-4 mr-1" />
              {summary.length} points
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-4">
              {keyInsights.map((point, index) => (
                <li key={index} className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full gradient-bg flex items-center justify-center text-white text-sm">
                    {index + 1}
                  </div>
                  <p className={point.isKeyInsight ? 'font-medium text-purple-900' : ''}>
                    {point.text}
                  </p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        
        <div className="order-1 md:order-2">
          <AIConfidenceScore score={confidenceScore} />
        </div>
      </div>
    </div>
  );
};

export default SummaryOutput;
