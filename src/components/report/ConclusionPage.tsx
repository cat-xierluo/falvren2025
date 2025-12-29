import { motion } from 'framer-motion';
import { Share2, RotateCcw } from 'lucide-react';
import { SystemNarration } from '@/lib/sceneLibrary';

interface ConclusionPageProps {
  narration: SystemNarration;
  onRestart: () => void;
}

export function ConclusionPage({ narration, onRestart }: ConclusionPageProps) {
  const handleShare = async () => {
    const shareText = `2025 法律人年度报告

年终结论：
你没有热爱法律
你只是比很多人
更能忍受复杂、模糊和不被回应

${narration.text.replace(/\n/g, ' ')}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: '2025 法律人年度报告',
          text: shareText,
          url: window.location.href,
        });
      } catch {
        copyToClipboard(shareText);
      }
    } else {
      copyToClipboard(shareText);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text + '\n\n' + window.location.href);
    alert('已复制到剪贴板');
  };

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
        className="text-center"
      >
        <p className="font-mono text-sm text-muted-foreground tracking-wider mb-4">
          📌 年终结论
        </p>
      </motion.div>

      {/* Main conclusion */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="text-center space-y-6 py-8"
      >
        <p className="text-2xl md:text-3xl lg:text-4xl font-light text-foreground leading-relaxed">
          你没有热爱法律
        </p>
        <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
          你只是比很多人<br />
          更能忍受复杂、模糊和不被回应
        </p>
      </motion.div>

      {/* Divider */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="border-t border-border/50"
      />

      {/* System narration */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="text-center"
      >
        <p className="text-sm text-muted-foreground/60 whitespace-pre-line leading-relaxed">
          {narration.text}
        </p>
      </motion.div>

      {/* Closing remark */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="card-report bg-muted/20 text-center"
      >
        <p className="text-sm text-muted-foreground mb-2">
          如果这是你的 2025
        </p>
        <p className="text-sm text-muted-foreground/70">
          欢迎对号入座<br />
          或者转给那个凌晨还在回你消息的法律人
        </p>
      </motion.div>

      {/* Action buttons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
      >
        <button onClick={handleShare} className="btn-primary flex items-center gap-2">
          <Share2 className="w-4 h-4" />
          分享报告
        </button>
        <button onClick={onRestart} className="btn-secondary flex items-center gap-2">
          <RotateCcw className="w-4 h-4" />
          重新生成
        </button>
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
        className="text-center pt-8 space-y-2"
      >
        <p className="text-xs text-muted-foreground/40">
          明年会不会更好不知道
        </p>
        <p className="text-xs text-muted-foreground/30">
          但你已经知道哪些话可以不用再信了
        </p>
      </motion.div>
    </motion.div>
  );
}
