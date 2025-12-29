import { motion } from 'framer-motion';
import { GeneratedReport } from '@/lib/sceneLibrary';

interface IdentityPageProps {
  report: GeneratedReport;
  onNext: () => void;
}

export function IdentityPage({ report, onNext }: IdentityPageProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col h-full justify-between py-2 sm:py-0 sm:block sm:space-y-8 md:space-y-12"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="flex-shrink-0 space-y-2 sm:space-y-4"
      >
        <p className="font-mono text-xs sm:text-sm text-muted-foreground tracking-wider">
          📅 2025
        </p>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-medium text-foreground">
          你是一名法律人
        </h2>
        <p className="text-sm sm:text-lg text-muted-foreground">
          我们帮你回顾了这一年
        </p>
      </motion.div>

      {/* Stats grid - more compact on mobile */}
      <div className="flex-1 flex flex-col justify-center gap-3 sm:gap-6 sm:flex-none py-2 sm:py-0">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="card-report py-3 px-5 sm:py-8 sm:px-8 flex items-center justify-between sm:block"
        >
          <p className="text-xs sm:text-sm text-muted-foreground sm:mb-2">全年工作天数</p>
          <div className="flex items-baseline gap-1">
            <p className="text-3xl sm:text-5xl md:text-7xl font-mono font-semibold tracking-tighter">{report.workDays}</p>
            <p className="text-sm sm:text-lg text-muted-foreground">天</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="card-report py-3 px-5 sm:py-8 sm:px-8 flex items-center justify-between sm:block"
        >
          <p className="text-xs sm:text-sm text-muted-foreground sm:mb-2">真正完整休息的周末</p>
          <div className="flex items-baseline gap-1">
            <p className="text-3xl sm:text-5xl md:text-7xl font-mono font-semibold tracking-tighter">{report.fullRestWeekends}</p>
            <p className="text-sm sm:text-lg text-muted-foreground">个</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="card-report py-3 px-5 sm:py-8 sm:px-8 flex items-center justify-between sm:block"
        >
          <p className="text-xs sm:text-sm text-muted-foreground sm:mb-2 flex-1">对"明年一定轻松点"的信任度</p>
          <div className="flex items-baseline gap-0.5">
            <p className="text-3xl sm:text-5xl md:text-7xl font-mono font-semibold tracking-tighter">{report.trustInNextYear}</p>
            <p className="text-sm sm:text-lg text-muted-foreground">%</p>
          </div>
        </motion.div>
      </div>

      {/* Continue button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.4 }}
        className="flex-shrink-0 flex justify-center pt-2 sm:pt-4"
      >
        <button onClick={onNext} className="btn-secondary text-sm sm:text-base px-4 py-2 sm:px-6 sm:py-3">
          继续查看 →
        </button>
      </motion.div>
    </motion.div>
  );
}
