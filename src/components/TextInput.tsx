
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Upload, FileText } from 'lucide-react';
import { useToast } from '@/components/ui/toast';

interface TextInputProps {
  onSubmit: (text: string) => void;
  isProcessing: boolean;
}

const TextInput: React.FC<TextInputProps> = ({ onSubmit, isProcessing }) => {
  const [text, setText] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    setFile(null);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      try {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        
        // File validation
        if (selectedFile.size > 5 * 1024 * 1024) { // 5MB limit
          toast({
            title: "File too large",
            description: "Please upload a file smaller than 5MB",
            variant: "destructive",
          });
          setFile(null);
          return;
        }
        
        if (!selectedFile.type.includes('text') && 
            !selectedFile.type.includes('application/pdf') && 
            !selectedFile.type.includes('application/msword') &&
            !selectedFile.type.includes('application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
          toast({
            title: "Unsupported file type",
            description: "Please upload a text or document file",
            variant: "destructive",
          });
          setFile(null);
          return;
        }
        
        // Read file content
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target && typeof e.target.result === 'string') {
            setText(e.target.result);
          }
        };
        reader.onerror = () => {
          toast({
            title: "Error reading file",
            description: "There was an error reading your file",
            variant: "destructive",
          });
        };
        reader.readAsText(selectedFile);
      } catch (error) {
        toast({
          title: "Error processing file",
          description: "There was an error processing your file",
          variant: "destructive",
        });
      }
    }
  };

  const handleSubmit = () => {
    if (!text.trim()) {
      toast({
        title: "Empty text",
        description: "Please enter text or upload a file to summarize",
        variant: "destructive",
      });
      return;
    }
    onSubmit(text);
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <h2 className="text-2xl font-semibold">Input Text</h2>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={handleUploadClick}
            className="flex items-center gap-2"
          >
            <Upload className="h-4 w-4" /> Upload File
          </Button>
          <input 
            ref={fileInputRef}
            type="file" 
            className="hidden" 
            onChange={handleFileChange} 
            accept=".txt,.pdf,.doc,.docx" 
          />
          <Button 
            onClick={handleSubmit} 
            disabled={isProcessing || !text.trim()}
            className="gradient-bg text-white"
          >
            {isProcessing ? 'Summarizing...' : 'Summarize'}
          </Button>
        </div>
      </div>
      
      {file && (
        <div className="flex items-center gap-2 p-2 bg-muted rounded-md">
          <FileText className="h-4 w-4 text-purple-500" />
          <span className="text-sm font-medium truncate">{file.name}</span>
          <span className="text-xs text-muted-foreground">
            {(file.size / 1024).toFixed(1)} KB
          </span>
        </div>
      )}
      
      <Textarea 
        value={text} 
        onChange={handleTextChange} 
        placeholder="Paste article text or upload a document file..."
        className="min-h-[200px] focus:border-purple-400 focus:ring-purple-400"
      />
      
      <div className="text-xs text-muted-foreground">
        Max 5,000 words recommended. Supported file types: TXT, PDF, DOC, DOCX
      </div>
    </div>
  );
};

export default TextInput;
