import { useState, useMemo, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { StartPage } from '@/components/report/StartPage';
import { ReportLayout } from '@/components/report/ReportLayout';
import { IdentityPage } from '@/components/report/IdentityPage';
import { ScenePage } from '@/components/report/ScenePage';
import { ConclusionPage } from '@/components/report/ConclusionPage';
import { generateReport, GeneratedReport } from '@/lib/sceneLibrary';

const Index = () => {
  const [started, setStarted] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [reportKey, setReportKey] = useState(0);

  // Generate new report when key changes
  const report: GeneratedReport = useMemo(() => generateReport(), [reportKey]);

  // Total pages = 1 (identity) + scenes count + 1 (conclusion)
  const totalPages = 1 + report.scenes.length + 1;

  const handleStart = useCallback(() => {
    setStarted(true);
    setCurrentPage(0);
  }, []);

  const handleNext = useCallback(() => {
    setCurrentPage(prev => prev + 1);
  }, []);

  const handleRestart = useCallback(() => {
    setReportKey(prev => prev + 1);
    setStarted(false);
    setCurrentPage(0);
  }, []);

  if (!started) {
    return <StartPage onStart={handleStart} />;
  }

  const renderPage = () => {
    // Page 0: Identity page
    if (currentPage === 0) {
      return <IdentityPage report={report} onNext={handleNext} />;
    }
    
    // Pages 1 to scenes.length: Scene pages
    const sceneIndex = currentPage - 1;
    if (sceneIndex < report.scenes.length) {
      const isLast = sceneIndex === report.scenes.length - 1;
      return (
        <ScenePage 
          generated={report.scenes[sceneIndex]} 
          onNext={handleNext}
          isLast={isLast}
        />
      );
    }
    
    // Last page: Conclusion
    return (
      <ConclusionPage 
        narration={report.systemNarration} 
        onRestart={handleRestart} 
      />
    );
  };

  return (
    <ReportLayout currentPage={currentPage + 1} totalPages={totalPages}>
      <AnimatePresence mode="wait">
        <div key={`${reportKey}-${currentPage}`}>
          {renderPage()}
        </div>
      </AnimatePresence>
    </ReportLayout>
  );
};

export default Index;
