import { motion } from 'framer-motion';
import { ReportData } from '@/lib/reportData';
import { Moon, Mail } from 'lucide-react';

interface LateNightPageProps {
  data: ReportData;
  onNext: () => void;
}

export function LateNightPage({ data, onNext }: LateNightPageProps) {
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
          <Moon className="w-5 h-5 text-muted-foreground" />
          <p className="font-mono text-sm text-muted-foreground tracking-wider">
            深夜工作记录
          </p>
        </div>
        <h2 className="text-2xl md:text-3xl font-medium text-foreground">
          最晚工作时间
        </h2>
      </motion.div>

      {/* Time display */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="card-report text-center py-12"
      >
        <p className="text-sm text-muted-foreground mb-4">凌晨</p>
        <p className="font-mono text-6xl md:text-8xl font-semibold text-foreground tracking-tighter">
          {data.latestWorkTime}
        </p>
      </motion.div>

      {/* Email details */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="space-y-4"
      >
        <div className="flex items-center gap-2 text-muted-foreground">
          <Mail className="w-4 h-4" />
          <p className="text-sm">你在做的事情是</p>
        </div>
        
        <div className="card-report space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">收件人</span>
            <span className="font-mono text-foreground">{data.recipientName}</span>
          </div>
          <div className="border-t border-border" />
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">主题</span>
            <span className="text-foreground">{data.emailSubject}</span>
          </div>
          <div className="border-t border-border" />
          <div>
            <p className="text-sm text-muted-foreground mb-2">邮件开头</p>
            <p className="text-foreground">
              "您好，附件是我方的初步意见"
            </p>
          </div>
        </div>
      </motion.div>

      {/* Soul text - the key punch line */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="pt-6 border-t border-border/50"
      >
        <p className="soul-text leading-relaxed">
          你已经不记得<br />
          {data.recipientName} 是客户、同事<br />
          还是你的人生见证者
        </p>
      </motion.div>

      {/* Continue button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="flex justify-center pt-1"
      >
        <button onClick={onNext} className="btn-secondary">
          继续查看 →
        </button>
      </motion.div>
    </motion.div>
  );
}
