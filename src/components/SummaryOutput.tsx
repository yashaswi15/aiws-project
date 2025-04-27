
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface SummaryOutputProps {
  summary: string[];
  isLoading: boolean;
}

const SummaryOutput: React.FC<SummaryOutputProps> = ({ summary, isLoading }) => {
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
      <Card>
        <CardHeader>
          <CardTitle className="text-xl gradient-text">Key Points</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ul className="space-y-4">
            {summary.map((point, index) => (
              <li key={index} className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full gradient-bg flex items-center justify-center text-white text-sm">
                  {index + 1}
                </div>
                <p>{point}</p>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default SummaryOutput;
