import { motion } from 'framer-motion';

interface StartPageProps {
  onStart: () => void;
}

export function StartPage({ onStart }: StartPageProps) {
  return (
    <div className="h-[100dvh] bg-background flex flex-col items-center justify-center px-6 overflow-hidden">
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
          className="inline-block mb-6 sm:mb-8"
        >
          <span className="font-mono text-xs sm:text-sm tracking-widest text-muted-foreground border border-border px-3 py-1.5 sm:px-4 sm:py-2 rounded-full">
            2025
          </span>
        </motion.div>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-foreground mb-4 sm:mb-6"
        >
          法律人年度报告生成器
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-base sm:text-lg text-muted-foreground mb-2 sm:mb-4"
        >
          我们回顾了你这一年的使用情况
        </motion.p>

        {/* Disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-xs sm:text-sm text-muted-foreground/60 mb-8 sm:mb-12"
        >
          数据为随机生成，但你会觉得很熟悉
        </motion.p>

        {/* Start button */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onStart}
          className="btn-primary text-sm sm:text-base px-6 py-3 sm:px-8 sm:py-4"
        >
          生成我的年度报告
        </motion.button>

        {/* Bottom hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-10 sm:mt-16 text-xs text-muted-foreground/40"
        >
          点击开始 · 预计阅读时间 2 分钟
        </motion.p>
      </motion.div>

      {/* Background decoration */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.03 }}
        transition={{ delay: 1, duration: 2 }}
        className="fixed inset-0 pointer-events-none overflow-hidden"
      >
        <div className="absolute top-1/4 left-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-foreground rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-48 sm:w-64 h-48 sm:h-64 bg-foreground rounded-full blur-3xl" />
      </motion.div>
    </div>
  );
}
