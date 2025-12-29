import { ReactNode } from 'react';

interface ReportLayoutProps {
  children: ReactNode;
  currentPage: number;
  totalPages: number;
}

export function ReportLayout({ children, currentPage, totalPages }: ReportLayoutProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Progress indicator */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <div className="h-[2px] bg-muted">
          <div 
            className="h-full bg-muted-foreground/50 transition-all duration-500 ease-out"
            style={{ width: `${(currentPage / totalPages) * 100}%` }}
          />
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center px-6 py-16 md:py-20">
        <div className="w-full max-w-2xl mx-auto">
          {children}
        </div>
      </main>

      {/* Page indicator */}
      <div className="fixed bottom-6 left-0 right-0 flex justify-center">
        <div className="flex items-center gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <div
              key={i}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                i + 1 === currentPage 
                  ? 'bg-foreground w-4' 
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
