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
      className="flex flex-col h-full justify-between"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="flex-shrink-0"
      >
        <p className="font-mono text-xs sm:text-sm text-muted-foreground tracking-wider mb-1 sm:mb-2">
          📅 2025
        </p>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-medium text-foreground">
          你是一名法律人
        </h2>
        <p className="text-base sm:text-lg text-muted-foreground mt-1">
          我们帮你回顾了这一年
        </p>
      </motion.div>

      {/* Stats cards */}
      <div className="flex-1 flex flex-col justify-center gap-3 sm:gap-4 min-h-0 py-2 sm:py-4">
        {/* 工作天数 */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="card-report py-3 px-4 sm:py-5 sm:px-6"
        >
          <div className="flex items-center justify-between">
            <p className="text-sm sm:text-sm text-muted-foreground">全年工作天数</p>
            <div className="flex items-baseline gap-1">
              <p className="text-3xl sm:text-4xl md:text-5xl font-mono font-bold tracking-tighter text-foreground">
                {report.workDays}
              </p>
              <p className="text-sm sm:text-base text-muted-foreground">天</p>
            </div>
          </div>
          <p className="text-xs sm:text-xs text-muted-foreground/50 mt-1.5 sm:mt-2">
            剩下的日子，你也没闲着
          </p>
        </motion.div>

        {/* 完整休息的周末 */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="card-report py-3 px-4 sm:py-5 sm:px-6"
        >
          <div className="flex items-center justify-between">
            <p className="text-sm sm:text-sm text-muted-foreground">真正完整休息的周末</p>
            <div className="flex items-baseline gap-1">
              <p className="text-3xl sm:text-4xl md:text-5xl font-mono font-bold tracking-tighter text-foreground">
                {report.fullRestWeekends}
              </p>
              <p className="text-sm sm:text-base text-muted-foreground">个</p>
            </div>
          </div>
          <p className="text-xs sm:text-xs text-muted-foreground/50 mt-1.5 sm:mt-2">
            "完整"的定义：脑子里没有待办事项
          </p>
        </motion.div>

        {/* 信任度 */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="card-report py-3 px-4 sm:py-5 sm:px-6"
        >
          <div className="flex items-center justify-between">
            <p className="text-sm sm:text-sm text-muted-foreground flex-1 pr-2">
              对"明年一定轻松点"的信任度
            </p>
            <div className="flex items-baseline gap-0.5">
              <p className="text-3xl sm:text-4xl md:text-5xl font-mono font-bold tracking-tighter text-foreground">
                {report.trustInNextYear}
              </p>
              <p className="text-sm sm:text-base text-muted-foreground">%</p>
            </div>
          </div>
          <p className="text-xs sm:text-xs text-muted-foreground/50 mt-1.5 sm:mt-2">
            去年这个数字是 {report.trustInNextYear + 15}%
          </p>
        </motion.div>
      </div>

      {/* Continue button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.3 }}
        className="flex-shrink-0 flex justify-center"
      >
        <button 
          onClick={onNext} 
          className="btn-secondary text-sm sm:text-base px-5 py-2.5 sm:px-6 sm:py-3"
        >
          继续查看 →
        </button>
      </motion.div>
    </motion.div>
  );
}
