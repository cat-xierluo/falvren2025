import { ReactNode } from 'react';
import { ChevronLeft } from 'lucide-react';

interface ReportLayoutProps {
  children: ReactNode;
  currentPage: number;
  totalPages: number;
  onBack?: () => void;
  canGoBack?: boolean;
}

export function ReportLayout({ children, currentPage, totalPages, onBack, canGoBack }: ReportLayoutProps) {
  return (
    <div className="h-[100dvh] bg-background flex flex-col overflow-hidden">
      {/* Top bar with progress and back button */}
      <div className="flex-shrink-0">
        {/* Progress bar */}
        <div className="h-[2px] bg-muted">
          <div 
            className="h-full bg-muted-foreground/50 transition-all duration-500 ease-out"
            style={{ width: `${(currentPage / totalPages) * 100}%` }}
          />
        </div>
        
        {/* Back button */}
        {canGoBack && onBack && (
          <button
            onClick={onBack}
            className="absolute top-3 left-3 sm:top-4 sm:left-4 z-40 flex items-center gap-1 px-2 py-1.5 text-muted-foreground hover:text-foreground text-xs transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">返回</span>
          </button>
        )}
      </div>

      {/* Main content - fills remaining space */}
      <main className="flex-1 flex items-center justify-center px-4 py-3 sm:px-6 sm:py-8 overflow-hidden">
        <div className="w-full max-w-2xl mx-auto h-full flex flex-col justify-center">
          {children}
        </div>
      </main>

      {/* Page indicator - clickable dots */}
      <div className="flex-shrink-0 pb-3 sm:pb-6 flex justify-center">
        <div className="flex items-center gap-1.5 sm:gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <div
              key={i}
              className={`w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full transition-all duration-300 ${
                i + 1 === currentPage 
                  ? 'bg-foreground w-3 sm:w-4' 
                  : i + 1 < currentPage 
                    ? 'bg-muted-foreground/50' 
                    : 'bg-muted'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
