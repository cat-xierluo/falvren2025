import { ReactNode } from 'react';

interface ReportLayoutProps {
  children: ReactNode;
  currentPage: number;
  totalPages: number;
}

export function ReportLayout({ children, currentPage, totalPages }: ReportLayoutProps) {
  return (
    <div className="h-[100dvh] bg-background flex flex-col overflow-hidden">
      {/* Progress indicator */}
      <div className="flex-shrink-0">
        <div className="h-[2px] bg-muted">
          <div 
            className="h-full bg-muted-foreground/50 transition-all duration-500 ease-out"
            style={{ width: `${(currentPage / totalPages) * 100}%` }}
          />
        </div>
      </div>

      {/* Main content - fills remaining space */}
      <main className="flex-1 flex items-center justify-center px-4 py-3 sm:px-6 sm:py-8 overflow-hidden">
        <div className="w-full max-w-2xl mx-auto h-full flex flex-col justify-center">
          {children}
        </div>
      </main>

      {/* Page indicator */}
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
