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
      className="flex flex-col h-full justify-between"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
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
        transition={{ delay: 0.2, duration: 0.5 }}
        className="flex-1 flex flex-col justify-center text-center min-h-0"
      >
        <p className="text-xl sm:text-2xl md:text-3xl font-light text-foreground leading-relaxed">
          你没有热爱法律
        </p>
        <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed mt-2 sm:mt-3">
          你只是比很多人<br />
          更能忍受复杂、模糊和不被回应
        </p>
        
        {/* Divider line */}
        <div className="w-12 h-px bg-border mx-auto my-3 sm:my-4" />
        
        {/* System narration */}
        <p className="text-xs sm:text-sm text-muted-foreground/50 whitespace-pre-line">
          {narration.text}
        </p>
      </motion.div>

      {/* Author section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.4 }}
        className="flex-shrink-0"
      >
        <div className="card-report bg-muted/20 py-3 px-4 sm:py-4 sm:px-5">
          <div className="flex items-center gap-3 sm:gap-4">
            {/* QR Code */}
            <div className="w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0 bg-white rounded-lg p-1.5 sm:p-1.5">
              <img 
                src={wechatQr} 
                alt="微信二维码" 
                className="w-full h-full object-contain"
              />
            </div>
            {/* Author info */}
            <div className="flex-1 text-left">
              <p className="text-xs sm:text-xs text-muted-foreground">作者</p>
              <p className="text-base sm:text-base text-foreground font-medium">杨卫薪律师</p>
              <p className="text-sm sm:text-sm text-muted-foreground font-mono">微信 ywxlaw</p>
            </div>
            {/* Share hint */}
            <div className="text-right hidden sm:block">
              <p className="text-xs text-muted-foreground/50">扫码添加</p>
            </div>
          </div>
        </div>
        
        {/* 底部提示 */}
        <p className="text-center text-xs sm:text-xs text-muted-foreground/40 mt-2">
          欢迎转给那个凌晨还在回你消息的法律人
        </p>
      </motion.div>

      {/* Action buttons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.3 }}
        className="flex-shrink-0 flex items-center justify-center gap-2 sm:gap-3 mt-2 sm:mt-4"
      >
        <button 
          onClick={handleShare} 
          className="btn-primary flex items-center gap-1.5 text-sm sm:text-base px-4 py-2.5 sm:px-6 sm:py-3"
        >
          <Share2 className="w-4 h-4 sm:w-4 sm:h-4" />
          分享报告
        </button>
        <button 
          onClick={onRestart} 
          className="btn-secondary flex items-center gap-1.5 text-sm sm:text-base px-4 py-2.5 sm:px-5 sm:py-3"
        >
          <RotateCcw className="w-4 h-4 sm:w-4 sm:h-4" />
          再来一次
        </button>
      </motion.div>
    </motion.div>
  );
}
