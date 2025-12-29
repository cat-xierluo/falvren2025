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
    <div className="h-[100dvh] bg-gradient-dark relative flex flex-col overflow-hidden">
      {/* Animated glow orbs */}
      <div className="glow-orb glow-orb-1" />
      <div className="glow-orb glow-orb-2" />
      <div className="glow-orb glow-orb-3" />
      
      {/* Noise texture overlay */}
      <div className="absolute inset-0 bg-noise pointer-events-none" />
      {/* Top bar with progress and back button */}
      <div className="flex-shrink-0 relative z-10">
        {/* Progress bar */}
        <div className="h-[2px] bg-muted/50">
          <div 
            className="h-full bg-gradient-to-r from-[hsl(var(--glow-amber)/0.7)] via-[hsl(var(--glow-orange)/0.6)] to-[hsl(var(--glow-rose)/0.55)] transition-all duration-500 ease-out"
            style={{ width: `${(currentPage / totalPages) * 100}%` }}
          />
        </div>
        
        {/* Back button */}
        {canGoBack && onBack && (
          <button
            onClick={onBack}
            className="absolute top-3 left-3 sm:top-4 sm:left-4 z-40 flex items-center gap-1 px-2 py-1.5 text-muted-foreground hover:text-foreground text-xs transition-colors backdrop-blur-sm bg-background/20 rounded-full"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">返回</span>
          </button>
        )}
      </div>

      {/* Main content - fills remaining space */}
      <main className="flex-1 flex items-center justify-center px-4 py-3 sm:px-6 sm:py-8 overflow-hidden relative z-10">
        <div className="w-full max-w-2xl mx-auto h-full flex flex-col justify-center">
          {children}
        </div>
      </main>

      {/* Page indicator - clickable dots */}
      <div className="flex-shrink-0 pb-3 sm:pb-6 flex justify-center relative z-10">
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
