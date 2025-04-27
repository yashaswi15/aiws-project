
import React from 'react';
import { Sparkles } from 'lucide-react';

interface AIConfidenceScoreProps {
  score: number;
}

const AIConfidenceScore: React.FC<AIConfidenceScoreProps> = ({ score }) => {
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-500';
    if (score >= 70) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="flex items-center gap-2 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
      <Sparkles className="h-5 w-5 text-purple-500 animate-pulse" />
      <div className="flex flex-col">
        <span className="text-sm font-medium">AI Confidence Score</span>
        <span className={`text-2xl font-bold ${getScoreColor(score)}`}>
          {score}%
        </span>
      </div>
    </div>
  );
};

export default AIConfidenceScore;
