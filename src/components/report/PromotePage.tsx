import { motion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { RotateCcw, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { AuthorCard } from './AuthorCard';

interface PromotePageProps {
  onRestart: () => void;
}

export function PromotePage({ onRestart }: PromotePageProps) {
  const [copied, setCopied] = useState(false);
  const projectUrl = window.location.origin;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(projectUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col h-full justify-between"
    >
      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="flex-1 flex flex-col justify-center min-h-0 pt-8 sm:pt-12"
      >
        <div className="text-center space-y-6">
          {/* Title */}
          <div>
            <h2 className="text-xl sm:text-2xl font-light text-foreground">
              2025 法律人年度报告
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground mt-2">
              生成专属于你的法律人年度总结
            </p>
          </div>

          {/* QR Code */}
          <div className="flex justify-center">
            <div className="bg-white rounded-2xl p-4 shadow-lg">
              <QRCodeSVG 
                value={projectUrl} 
                size={160}
                level="M"
                includeMargin={false}
              />
            </div>
          </div>

          {/* URL display */}
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground/60">扫码或访问</p>
            <div className="flex items-center justify-center gap-2">
              <code className="text-sm sm:text-base font-mono text-foreground bg-muted/30 px-3 py-1.5 rounded-lg">
                {projectUrl.replace(/^https?:\/\//, '')}
              </code>
              <button
                onClick={handleCopyLink}
                className="p-2 hover:bg-muted/50 rounded-lg transition-colors"
                title="复制链接"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-[hsl(var(--data-accent))]" />
                ) : (
                  <Copy className="w-4 h-4 text-muted-foreground" />
                )}
              </button>
            </div>
          </div>

        </div>
      </motion.div>

      {/* Author section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.4 }}
      >
        <AuthorCard />
      </motion.div>

      {/* Restart button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.3 }}
        className="flex-shrink-0 flex justify-center mt-3"
      >
        <button 
          onClick={onRestart} 
          className="btn-secondary flex items-center gap-1.5 text-sm sm:text-base px-5 py-2.5"
        >
          <RotateCcw className="w-4 h-4" />
          再来一次
        </button>
      </motion.div>
    </motion.div>
  );
}
