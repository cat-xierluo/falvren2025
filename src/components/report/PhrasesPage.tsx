import { motion } from 'framer-motion';
import { ReportData } from '@/lib/reportData';
import { MessageSquare } from 'lucide-react';

interface PhrasesPageProps {
  data: ReportData;
  onNext: () => void;
}

export function PhrasesPage({ data, onNext }: PhrasesPageProps) {
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
          <MessageSquare className="w-5 h-5 text-muted-foreground" />
          <p className="font-mono text-sm text-muted-foreground tracking-wider">
            沟通数据分析
          </p>
        </div>
        <h2 className="text-2xl md:text-3xl font-medium text-foreground">
          年度高频话术 Top 3
        </h2>
      </motion.div>

      {/* Phrases list */}
      <div className="space-y-4">
        {data.topPhrases.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + index * 0.15, duration: 0.5 }}
            className="card-report"
          >
            <div className="flex items-start gap-4">
              <span className="font-mono text-2xl text-muted-foreground/50">
                {index + 1}
              </span>
              <div className="flex-1 space-y-3">
                <p className="text-lg text-foreground">
                  {item.phrase}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground/60">真实含义</span>
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                    → {item.meaning}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Soul text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="pt-6 border-t border-border/50"
      >
        <p className="soul-text">
          语言的艺术<br />
          在于说了什么都没说<br />
          又什么都说了
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
          继续查看 →
        </button>
      </motion.div>
    </motion.div>
  );
}
