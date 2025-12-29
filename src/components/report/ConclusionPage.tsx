import { motion } from 'framer-motion';
import { Share2, RotateCcw } from 'lucide-react';
import { SystemNarration } from '@/lib/sceneLibrary';
import wechatQr from '@/assets/wechat-qr.png';

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

${narration.text.replace(/\n/g, ' ')}

作者：杨卫薪律师（微信 ywxlaw）`;

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
      className="flex flex-col h-full justify-between py-2 sm:py-0 sm:block sm:space-y-6 md:space-y-8"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="flex-shrink-0 text-center"
      >
        <p className="font-mono text-xs sm:text-sm text-muted-foreground tracking-wider">
          📌 年终结论
        </p>
      </motion.div>

      {/* Main conclusion */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="flex-1 flex flex-col justify-center text-center space-y-2 sm:space-y-4 sm:flex-none sm:py-4"
      >
        <p className="text-lg sm:text-2xl md:text-3xl font-light text-foreground leading-relaxed">
          你没有热爱法律
        </p>
        <p className="text-sm sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
          你只是比很多人<br />
          更能忍受复杂、模糊和不被回应
        </p>
        
        {/* System narration */}
        <p className="text-xs text-muted-foreground/50 whitespace-pre-line pt-2">
          {narration.text}
        </p>
      </motion.div>

      {/* Author section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="flex-shrink-0"
      >
        <div className="card-report bg-muted/20 py-3 px-4 sm:py-4 sm:px-6">
          <div className="flex items-center justify-center gap-4">
            {/* QR Code */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 bg-white rounded-lg p-1.5 sm:p-2">
              <img 
                src={wechatQr} 
                alt="微信二维码" 
                className="w-full h-full object-contain"
              />
            </div>
            {/* Author info */}
            <div className="text-left">
              <p className="text-xs text-muted-foreground mb-1">作者</p>
              <p className="text-sm sm:text-base text-foreground font-medium">杨卫薪律师</p>
              <p className="text-xs sm:text-sm text-muted-foreground font-mono">微信 ywxlaw</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Action buttons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.4 }}
        className="flex-shrink-0 flex items-center justify-center gap-3 pt-2 sm:pt-4"
      >
        <button onClick={handleShare} className="btn-primary flex items-center gap-2 text-sm sm:text-base px-4 py-2 sm:px-8 sm:py-4">
          <Share2 className="w-3 h-3 sm:w-4 sm:h-4" />
          分享报告
        </button>
        <button onClick={onRestart} className="btn-secondary flex items-center gap-2 text-sm sm:text-base px-4 py-2 sm:px-6 sm:py-3">
          <RotateCcw className="w-3 h-3 sm:w-4 sm:h-4" />
          重新生成
        </button>
      </motion.div>

      {/* Footer hint */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.4 }}
        className="flex-shrink-0 text-center text-xs text-muted-foreground/30 pt-1 sm:pt-2"
      >
        欢迎转给那个凌晨还在回你消息的法律人
      </motion.p>
    </motion.div>
  );
}
