
import React from 'react';
import { FileText } from 'lucide-react';

const Header = () => {
  return (
    <header className="py-6 px-4 md:px-6 flex items-center justify-between border-b">
      <div className="flex items-center gap-2">
        <FileText className="h-6 w-6 text-purple-500" />
        <h1 className="text-xl font-bold gradient-text">TextSummarizer</h1>
      </div>
      <div className="text-sm text-muted-foreground">Powered by AWS Comprehend</div>
    </header>
  );
};

export default Header;
