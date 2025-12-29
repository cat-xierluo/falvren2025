import { motion } from 'framer-motion';
import { ReportData } from '@/lib/reportData';
import { TrendingDown } from 'lucide-react';

interface ConfidencePageProps {
  data: ReportData;
  onNext: () => void;
}

export function ConfidencePage({ data, onNext }: ConfidencePageProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-10"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="space-y-4"
      >
        <div className="flex items-center gap-3">
          <TrendingDown className="w-5 h-5 text-muted-foreground" />
          <p className="font-mono text-sm text-muted-foreground tracking-wider">
            情绪管理报告
          </p>
        </div>
        <h2 className="text-2xl md:text-3xl font-medium text-foreground">
          年度认知变化
        </h2>
      </motion.div>

      {/* Confidence chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="card-report space-y-6"
      >
        <p className="text-sm text-muted-foreground">对行业前景的信心</p>
        
        <div className="space-y-4">
          {/* January */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">1 月</span>
              <span className="font-mono text-foreground">{data.confidenceStart}%</span>
            </div>
            <div className="progress-bar">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${data.confidenceStart}%` }}
                transition={{ delay: 0.6, duration: 1, ease: [0.4, 0, 0.2, 1] }}
                className="progress-fill"
              />
            </div>
          </div>

          {/* Arrow indicator */}
          <div className="flex justify-center py-2">
            <TrendingDown className="w-5 h-5 text-muted-foreground/50" />
          </div>

          {/* December */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">12 月</span>
              <span className="font-mono text-foreground">{data.confidenceEnd}%</span>
            </div>
            <div className="progress-bar">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${data.confidenceEnd}%` }}
                transition={{ delay: 1, duration: 1, ease: [0.4, 0, 0.2, 1] }}
                className="progress-fill"
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Additional stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="card-report space-y-4"
      >
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">听到"就改一下"的心率反应</p>
          <span className="text-sm font-mono text-foreground">显著升高</span>
        </div>
        <div className="border-t border-border" />
        <div>
          <p className="text-sm text-muted-foreground mb-2">最大幻觉</p>
          <p className="text-foreground">
            "这个案子结束我就轻松了"
          </p>
        </div>
      </motion.div>

      {/* Soul text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="pt-6 border-t border-border/50"
      >
        <p className="soul-text">
          你不是失望<br />
          你只是更清楚<br />
          什么不会改变
        </p>
      </motion.div>

      {/* Continue button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="flex justify-center pt-4"
      >
        <button onClick={onNext} className="btn-secondary">
          查看年终结论 →
        </button>
      </motion.div>
    </motion.div>
  );
}
