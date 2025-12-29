import { useState, useMemo, useCallback, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { StartPage } from '@/components/report/StartPage';
import { ReportLayout } from '@/components/report/ReportLayout';
import { IdentityPage } from '@/components/report/IdentityPage';
import { ScenePage } from '@/components/report/ScenePage';
import { ConclusionPage } from '@/components/report/ConclusionPage';
import { SharePage } from '@/components/report/SharePage';
import { PromotePage } from '@/components/report/PromotePage';
import { SaveButton } from '@/components/report/SaveButton';
import { generateReport, GeneratedReport, UserOptions } from '@/lib/sceneLibrary';

const Index = () => {
  const [started, setStarted] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
  const [reportKey, setReportKey] = useState(0);
  const [userOptions, setUserOptions] = useState<UserOptions | undefined>(undefined);
  const pageRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Generate new report when key changes or user options change
  const report: GeneratedReport = useMemo(() => generateReport(userOptions), [reportKey, userOptions]);

  // Total pages = 1 (identity) + scenes count + 1 (conclusion) + 1 (share) + 1 (promote)
  const totalPages = 1 + report.scenes.length + 1 + 1 + 1;

  const handleStart = useCallback((options?: UserOptions) => {
    setUserOptions(options);
    setStarted(true);
    setCurrentPage(0);
    setDirection(1);
  }, []);

  const handleNext = useCallback(() => {
    if (currentPage < totalPages - 1) {
      setDirection(1);
      setCurrentPage(prev => prev + 1);
    }
  }, [currentPage, totalPages]);

  const handleBack = useCallback(() => {
    if (currentPage > 0) {
      setDirection(-1);
      setCurrentPage(prev => prev - 1);
    }
  }, [currentPage]);

  const handleRestart = useCallback(() => {
    setReportKey(prev => prev + 1);
    setStarted(false);
    setCurrentPage(0);
    setDirection(1);
  }, []);

  // Touch handlers for swipe navigation
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(() => {
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 50; // minimum swipe distance

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        // Swipe left -> next page
        handleNext();
      } else {
        // Swipe right -> previous page
        handleBack();
      }
    }
    
    // Reset
    touchStartX.current = 0;
    touchEndX.current = 0;
  }, [handleNext, handleBack]);

  if (!started) {
    return <StartPage onStart={handleStart} />;
  }

  // Animation variants
  const pageVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -50 : 50,
      opacity: 0,
    }),
  };

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
    
    // Conclusion page (after all scenes)
    if (sceneIndex === report.scenes.length) {
      return (
        <ConclusionPage 
          narration={report.systemNarration}
          conclusion={report.conclusion}
          onRestart={handleRestart}
          onNext={handleNext}
        />
      );
    }

    // Share page (after conclusion)
    if (sceneIndex === report.scenes.length + 1) {
      return (
        <SharePage
          conclusion={report.conclusion}
          narration={report.systemNarration}
          onNext={handleNext}
        />
      );
    }

    // Last page: Promote page
    return (
      <PromotePage onRestart={handleRestart} />
    );
  };

  return (
    <>
      <SaveButton pageRef={pageRef} currentPage={currentPage} totalPages={totalPages} />
      <div
        ref={pageRef}
        className="relative"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <ReportLayout 
          currentPage={currentPage + 1} 
          totalPages={totalPages}
          onBack={handleBack}
          canGoBack={currentPage > 0}
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div 
              key={`${reportKey}-${currentPage}`}
              custom={direction}
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="h-full"
            >
              {renderPage()}
            </motion.div>
          </AnimatePresence>
        </ReportLayout>
      </div>
    </>
  );
};

export default Index;
