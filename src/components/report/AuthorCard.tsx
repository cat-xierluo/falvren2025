import { motion } from 'framer-motion';
import wechatQr from '@/assets/wechat-qr.png';

export function AuthorCard() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="flex-shrink-0"
    >
      <div className="card-report bg-muted/20 py-3 px-4 sm:py-3 sm:px-6 max-w-md mx-auto">
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
            <p className="text-[10px] sm:text-[10px] text-muted-foreground/50 mt-0.5 leading-tight">
              那个也还在改文书的律师
            </p>
          </div>
          {/* Share hint */}
          <div className="text-right hidden sm:block">
            <p className="text-xs text-muted-foreground/50">扫码添加</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
