import { motion } from 'framer-motion';
import { ReportData } from '@/lib/reportData';
import { FileText } from 'lucide-react';

interface WordPageProps {
  data: ReportData;
  onNext: () => void;
}

export function WordPage({ data, onNext }: WordPageProps) {
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
          <FileText className="w-5 h-5 text-muted-foreground" />
          <p className="font-mono text-sm text-muted-foreground tracking-wider">
            年度文档数据
          </p>
        </div>
        <h2 className="text-2xl md:text-3xl font-medium text-foreground">
          Word 修改地狱
        </h2>
      </motion.div>

      {/* Main stat */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="card-report"
      >
        <p className="text-sm text-muted-foreground mb-3">创建 Word 文档</p>
        <p className="stat-number">{data.wordDocuments}</p>
        <p className="stat-label mt-2">个</p>
        
        <div className="mt-6 pt-6 border-t border-border">
          <p className="text-sm text-muted-foreground mb-2">真正定稿的版本</p>
          <p className="stat-number text-4xl">0</p>
        </div>
      </motion.div>

      {/* File name */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="space-y-4"
      >
        <p className="text-muted-foreground">最常见的文件名：</p>
        <div className="card-report bg-muted/30 overflow-hidden">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[hsl(var(--data-accent)/0.18)] rounded flex items-center justify-center flex-shrink-0">
              <FileText className="w-5 h-5 text-[hsl(var(--data-accent))]" />
            </div>
            <p className="font-mono text-sm md:text-base text-foreground break-all">
              {data.mostCommonFileName}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Soul text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="pt-6 border-t border-border/50"
      >
        <p className="soul-text">
          律师的"最终版"<br />
          是一种精神状态<br />
          不是文件名
        </p>
      </motion.div>

      {/* Continue button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="flex justify-center pt-4"
      >
        <button onClick={onNext} className="btn-secondary">
          继续查看 →
        </button>
      </motion.div>
    </motion.div>
  );
}
