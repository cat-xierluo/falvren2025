import { motion } from 'framer-motion';
import { ReportData } from '@/lib/reportData';

interface IdentityPageProps {
  data: ReportData;
  onNext: () => void;
}

export function IdentityPage({ data, onNext }: IdentityPageProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-12"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="space-y-4"
      >
        <p className="font-mono text-sm text-muted-foreground tracking-wider">
          📅 2025
        </p>
        <h2 className="text-2xl md:text-3xl font-medium text-foreground">
          你是一名法律人
        </h2>
        <p className="text-lg text-muted-foreground">
          我们帮你回顾了这一年
        </p>
      </motion.div>

      {/* Stats grid */}
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="card-report"
        >
          <p className="text-sm text-muted-foreground mb-2">全年工作天数</p>
          <p className="stat-number">{data.workDays}</p>
          <p className="stat-label mt-2">天</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="card-report"
        >
          <p className="text-sm text-muted-foreground mb-2">真正完整休息的周末</p>
          <p className="stat-number">{data.fullRestWeekends}</p>
          <p className="stat-label mt-2">个</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="card-report"
        >
          <p className="text-sm text-muted-foreground mb-2">对"明年一定轻松点"的信任度</p>
          <p className="stat-number">{data.trustInNextYear}%</p>
        </motion.div>
      </div>

      {/* Continue button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="flex justify-center pt-4"
      >
        <button onClick={onNext} className="btn-secondary">
          继续查看 →
        </button>
      </motion.div>
    </motion.div>
  );
}
