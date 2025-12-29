import { motion } from 'framer-motion';
import { RotateCcw, ArrowRight } from 'lucide-react';
import { SystemNarration, Conclusion } from '@/lib/sceneLibrary';
import { AuthorCard } from './AuthorCard';

interface ConclusionPageProps {
  narration: SystemNarration;
  conclusion: Conclusion;
  onRestart: () => void;
  onNext?: () => void;
}

export function ConclusionPage({ narration, conclusion, onRestart, onNext }: ConclusionPageProps) {

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col h-full justify-between"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
        className="flex-shrink-0 text-center"
      >
        <p className="font-mono text-xs sm:text-sm text-muted-foreground tracking-wider">
          📌 年终结论
        </p>
      </motion.div>

      {/* Main conclusion */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="flex-1 flex flex-col justify-center text-center min-h-0"
      >
        <p className="text-xl sm:text-2xl md:text-3xl font-light text-foreground leading-relaxed">
          {conclusion.mainText}
        </p>
        <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed mt-2 sm:mt-3 whitespace-pre-line">
          {conclusion.subText}
        </p>
        
        {/* Divider line */}
        <div className="w-12 h-px bg-border mx-auto my-3 sm:my-4" />
        
        {/* System narration */}
        <p className="text-xs sm:text-sm text-muted-foreground/50 whitespace-pre-line">
          {narration.text}
        </p>
      </motion.div>

      {/* Author section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.4 }}
      >
        <AuthorCard />
      </motion.div>

      {/* Action buttons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.3 }}
        className="flex-shrink-0 flex flex-col items-center gap-2 sm:gap-3 mt-2 sm:mt-4"
      >
        {onNext && (
          <button
            onClick={onNext}
            className="btn-primary flex items-center gap-1.5 text-sm sm:text-base px-6 py-2.5 sm:px-8 sm:py-3 w-full max-w-xs justify-center"
          >
            生成我的分享卡片
            <ArrowRight className="w-4 h-4 sm:w-4 sm:h-4" />
          </button>
        )}
        <button
          onClick={onRestart}
          className="btn-secondary flex items-center gap-1.5 text-sm sm:text-base px-4 py-2.5 sm:px-5 sm:py-3"
        >
          <RotateCcw className="w-4 h-4 sm:w-4 sm:h-4" />
          再来一次
        </button>
      </motion.div>
    </motion.div>
  );
}
