
import React, { useState } from 'react';
import Header from '@/components/Header';
import TextInput from '@/components/TextInput';
import SummaryOutput from '@/components/SummaryOutput';
import { summarizeText } from '@/services/awsService';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/toast';

const Index = () => {
  const [summary, setSummary] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (text: string) => {
    try {
      setIsProcessing(true);
      setSummary([]);
      
      // Call AWS service to process the text
      const result = await summarizeText(text);
      
      setSummary(result);
      
      toast({
        title: "Summary generated",
        description: "Successfully analyzed your text",
      });
    } catch (error) {
      console.error("Error summarizing text:", error);
      toast({
        title: "Error",
        description: "Failed to summarize text. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 container max-w-4xl py-8 px-4 md:px-6 space-y-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
            AI Text Summarizer
          </h1>
          <p className="text-lg text-muted-foreground">
            Upload an article or paste text to generate a concise summary
          </p>
        </div>

        <TextInput onSubmit={handleSubmit} isProcessing={isProcessing} />
        
        <SummaryOutput summary={summary} isLoading={isProcessing} />
      </main>
      <Toaster />
    </div>
  );
};

export default Index;
