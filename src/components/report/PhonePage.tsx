import { motion } from 'framer-motion';
import { ReportData } from '@/lib/reportData';
import { Phone } from 'lucide-react';

interface PhonePageProps {
  data: ReportData;
  onNext: () => void;
}

export function PhonePage({ data, onNext }: PhonePageProps) {
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
          <Phone className="w-5 h-5 text-muted-foreground" />
          <p className="font-mono text-sm text-muted-foreground tracking-wider">
            年度高频拨号对象
          </p>
        </div>
        <h2 className="text-4xl md:text-5xl font-mono font-semibold text-foreground tracking-tight">
          12368
        </h2>
      </motion.div>

      {/* Main stat */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="card-report space-y-6"
      >
        <div>
          <p className="text-sm text-muted-foreground mb-3">拨打次数</p>
          <p className="stat-number">{data.calls12368}</p>
          <p className="stat-label mt-1">次</p>
        </div>

        <div className="border-t border-border pt-6">
          <p className="text-sm text-muted-foreground mb-3">接通率</p>
          <div className="flex items-end gap-4">
            <p className="stat-number text-4xl md:text-5xl">{data.connectionRate}%</p>
          </div>
          <div className="progress-bar mt-4">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${data.connectionRate}%` }}
              transition={{ delay: 0.8, duration: 1, ease: [0.4, 0, 0.2, 1] }}
              className="progress-fill"
            />
          </div>
        </div>
      </motion.div>

      {/* Response message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="space-y-4"
      >
        <p className="text-muted-foreground">获得最多的回应是：</p>
        <div className="card-report bg-muted/30">
          <p className="font-mono text-lg md:text-xl text-foreground">
            「对方忙碌中，请稍后再拨」
          </p>
        </div>
      </motion.div>

      {/* Soul text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="pt-4 border-t border-border/50"
      >
        <p className="soul-text">
          你和 12368 的关系<br />
          比你和很多当事人都稳定
        </p>
      </motion.div>

      {/* System hint */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="text-xs text-muted-foreground/50 text-center"
      >
        系统检测到你仍然会继续拨打
      </motion.p>

      {/* Continue button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="flex justify-center pt-1"
      >
        <button onClick={onNext} className="btn-secondary">
          继续查看 →
        </button>
      </motion.div>
    </motion.div>
  );
}
