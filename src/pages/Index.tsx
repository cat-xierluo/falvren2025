import { useState, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import { StartPage } from '@/components/report/StartPage';
import { ReportLayout } from '@/components/report/ReportLayout';
import { IdentityPage } from '@/components/report/IdentityPage';
import { PhonePage } from '@/components/report/PhonePage';
import { LateNightPage } from '@/components/report/LateNightPage';
import { WordPage } from '@/components/report/WordPage';
import { PhrasesPage } from '@/components/report/PhrasesPage';
import { ConfidencePage } from '@/components/report/ConfidencePage';
import { ConclusionPage } from '@/components/report/ConclusionPage';
import { generateReportData } from '@/lib/reportData';

const TOTAL_PAGES = 7;

const Index = () => {
  const [started, setStarted] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [reportKey, setReportKey] = useState(0);

  // Generate new data when report key changes
  const reportData = useMemo(() => generateReportData(), [reportKey]);

  const handleStart = () => {
    setStarted(true);
    setCurrentPage(1);
  };

  const handleNext = () => {
    if (currentPage < TOTAL_PAGES) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handleRestart = () => {
    setReportKey(prev => prev + 1);
    setStarted(false);
    setCurrentPage(1);
  };

  if (!started) {
    return <StartPage onStart={handleStart} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 1:
        return <IdentityPage data={reportData} onNext={handleNext} />;
      case 2:
        return <PhonePage data={reportData} onNext={handleNext} />;
      case 3:
        return <LateNightPage data={reportData} onNext={handleNext} />;
      case 4:
        return <WordPage data={reportData} onNext={handleNext} />;
      case 5:
        return <PhrasesPage data={reportData} onNext={handleNext} />;
      case 6:
        return <ConfidencePage data={reportData} onNext={handleNext} />;
      case 7:
        return <ConclusionPage onRestart={handleRestart} />;
      default:
        return null;
    }
  };

  return (
    <ReportLayout currentPage={currentPage} totalPages={TOTAL_PAGES}>
      <AnimatePresence mode="wait">
        <div key={currentPage}>
          {renderPage()}
        </div>
      </AnimatePresence>
    </ReportLayout>
  );
};

export default Index;
