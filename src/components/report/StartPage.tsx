import { motion } from 'framer-motion';

interface StartPageProps {
  onStart: () => void;
}

export function StartPage({ onStart }: StartPageProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        className="text-center max-w-xl"
      >
        {/* Year badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="inline-block mb-8"
        >
          <span className="font-mono text-sm tracking-widest text-muted-foreground border border-border px-4 py-2 rounded-full">
            2025
          </span>
        </motion.div>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-foreground mb-6"
        >
          法律人年度报告生成器
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-lg text-muted-foreground mb-4"
        >
          我们回顾了你这一年的使用情况
        </motion.p>

        {/* Disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-sm text-muted-foreground/60 mb-12"
        >
          数据为随机生成，但你会觉得很熟悉
        </motion.p>

        {/* Start button */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          onClick={onStart}
          className="group relative inline-flex items-center justify-center"
        >
          <span className="btn-primary text-base">
            生成我的年度报告
          </span>
          <motion.span
            className="absolute -inset-1 rounded-lg bg-foreground/5 opacity-0 group-hover:opacity-100 transition-opacity"
            layoutId="button-hover"
          />
        </motion.button>

        {/* Bottom hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-16 text-xs text-muted-foreground/40"
        >
          点击开始 · 预计阅读时间 2 分钟
        </motion.p>
      </motion.div>
    </div>
  );
}
