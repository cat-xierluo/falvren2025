import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { Upload, Download, ArrowRight, User, X } from 'lucide-react';
import { Conclusion, SystemNarration } from '@/lib/sceneLibrary';
import html2canvas from 'html2canvas';

interface SharePageProps {
  conclusion: Conclusion;
  narration: SystemNarration;
  onNext: () => void;
}

export function SharePage({ conclusion, narration, onNext }: SharePageProps) {
  const [userName, setUserName] = useState('');
  const [userQrImage, setUserQrImage] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const projectUrl = window.location.origin;

  const handleQrUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUserQrImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeQrImage = () => {
    setUserQrImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSaveCard = async () => {
    if (!cardRef.current) return;
    
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        backgroundColor: null,
        useCORS: true,
      });
      
      const link = document.createElement('a');
      link.download = `法律人2025年报-${userName || '我的'}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('保存失败', error);
      alert('保存失败，请重试');
    }
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
          📤 分享你的年报
        </p>
      </motion.div>

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="flex-1 flex flex-col justify-center min-h-0 overflow-y-auto py-2"
      >
        {!showPreview ? (
          /* Customization form */
          <div className="space-y-4">
            {/* Name input */}
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground flex items-center gap-2">
                <User className="w-4 h-4" />
                你的名字或ID（可选）
              </label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="例如：张律师"
                maxLength={20}
                className="w-full px-4 py-3 bg-muted/30 border border-border rounded-lg text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 text-base"
              />
            </div>

            {/* QR code upload */}
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground flex items-center gap-2">
                <Upload className="w-4 h-4" />
                上传你的微信二维码（可选）
              </label>
              
              {userQrImage ? (
                <div className="relative inline-block">
                  <img 
                    src={userQrImage} 
                    alt="我的二维码" 
                    className="w-24 h-24 object-contain bg-white rounded-lg p-1"
                  />
                  <button
                    onClick={removeQrImage}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full py-6 border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-primary/50 transition-colors"
                >
                  <Upload className="w-8 h-8 text-muted-foreground/50" />
                  <p className="text-sm text-muted-foreground/50">点击上传二维码图片</p>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleQrUpload}
                className="hidden"
              />
            </div>

            {/* Preview button */}
            <button
              onClick={() => setShowPreview(true)}
              className="w-full btn-primary flex items-center justify-center gap-2 text-base py-3"
            >
              生成分享卡片
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          /* Share card preview */
          <div className="space-y-4">
            <div
              ref={cardRef}
              className="bg-gradient-to-br from-background via-background to-muted/30 border border-border rounded-2xl p-5 space-y-4"
            >
              {/* Card header */}
              <div className="text-center">
                <p className="text-xs text-muted-foreground/60 font-mono">2025 法律人年度报告</p>
                {userName && (
                  <p className="text-lg font-medium text-foreground mt-1">{userName}</p>
                )}
              </div>

              {/* Conclusion */}
              <div className="text-center py-3">
                <p className="text-lg font-light text-foreground leading-relaxed">
                  {conclusion.mainText}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed mt-1 whitespace-pre-line">
                  {conclusion.subText}
                </p>
              </div>

              {/* Divider */}
              <div className="w-10 h-px bg-border mx-auto" />

              {/* Narration */}
              <p className="text-xs text-muted-foreground/50 text-center whitespace-pre-line">
                {narration.text}
              </p>

              {/* Footer with QR codes */}
              <div className="flex items-center justify-between gap-3 pt-2">
                {/* User QR (if uploaded) */}
                {userQrImage && (
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-16 h-16 bg-white rounded-lg p-1">
                      <img 
                        src={userQrImage} 
                        alt="我的二维码" 
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <p className="text-[10px] text-muted-foreground/50">
                      {userName ? `添加${userName}` : '添加我'}
                    </p>
                  </div>
                )}

                {/* Project QR */}
                <div className={`flex flex-col items-center gap-1 ${!userQrImage ? 'mx-auto' : ''}`}>
                  <div className="w-16 h-16 bg-white rounded-lg p-1.5 flex items-center justify-center">
                    <QRCodeSVG 
                      value={projectUrl} 
                      size={52}
                      level="M"
                    />
                  </div>
                  <p className="text-[10px] text-muted-foreground/50">扫码生成你的年报</p>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowPreview(false)}
                className="flex-1 btn-secondary py-3 text-base"
              >
                返回编辑
              </button>
              <button
                onClick={handleSaveCard}
                className="flex-1 btn-primary flex items-center justify-center gap-2 py-3 text-base"
              >
                <Download className="w-4 h-4" />
                保存图片
              </button>
            </div>
          </div>
        )}
      </motion.div>

      {/* Bottom hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.3 }}
        className="flex-shrink-0 text-center"
      >
        {!showPreview && (
          <button
            onClick={onNext}
            className="text-sm text-muted-foreground/50 underline underline-offset-4 hover:text-muted-foreground transition-colors"
          >
            跳过，直接去推广页 →
          </button>
        )}
      </motion.div>
    </motion.div>
  );
}
