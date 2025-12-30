import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { Upload, Download, ArrowRight, User, X, Shuffle } from 'lucide-react';
import { Conclusion, SystemNarration, conclusions } from '@/lib/sceneLibrary';
import html2canvas from 'html2canvas';

interface SharePageProps {
  conclusion: Conclusion;
  narration: SystemNarration;
  onNext: () => void;
}

export function SharePage({ conclusion: initialConclusion, narration, onNext }: SharePageProps) {
  const [userName, setUserName] = useState('');
  const [userQrImage, setUserQrImage] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [currentConclusion, setCurrentConclusion] = useState(initialConclusion);
  const cardRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const shuffleConclusion = () => {
    const available = conclusions.filter(c => c.id !== currentConclusion.id);
    const random = available[Math.floor(Math.random() * available.length)];
    setCurrentConclusion(random);
  };

  const projectUrl = 'https://falvren2025.lovable.app';

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

  // 确保引入 createRoot
  const handleSaveCard = async () => {
    if (!cardRef.current) return;

    // 隐藏随机按钮
    const shuffleButton = cardRef.current.querySelector('button[title="换一句"]');
    if (shuffleButton) {
      (shuffleButton as HTMLElement).style.display = 'none';
    }

    try {
      // 目标分辨率: 720x1280 (HD 9:16)
      const baseWidth = 360;
      const baseHeight = 640;
      const exportScale = 2;
      const exportWidth = baseWidth * exportScale;
      const exportHeight = baseHeight * exportScale;

      const container = document.createElement('div');
      container.className = 'font-serif text-foreground';
      container.style.cssText = `
        position: fixed;
        left: -9999px;
        top: 0;
        width: ${baseWidth}px;
        height: ${baseHeight}px;
        background-color: #0a0f1e;
        overflow: hidden;
      `;

      // 1. 内容层 (Cloned Page)
      const cardClone = cardRef.current.cloneNode(true) as HTMLElement;
      const cloneShuffleButton = cardClone.querySelector('button[title="换一句"]');
      if (cloneShuffleButton) {
        cloneShuffleButton.remove();
      }

      // 强制内容全屏适配 - 模拟手机视口并放大
      cardClone.style.cssText = `
        width: ${baseWidth}px;
        height: ${baseHeight}px;
        position: absolute;
        inset: 0;
        z-index: 0;
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        border-radius: 0;
      `;

      // 确保内容铺满
      cardClone.style.maxWidth = 'none';
      cardClone.style.maxHeight = 'none';

      // 修复 Clone 后的一些样式差异
      const contentContainer = cardClone.querySelector('#share-card-content') as HTMLElement;
      if (contentContainer) {
        contentContainer.style.display = 'flex';
        contentContainer.style.flexDirection = 'column';
        contentContainer.style.height = '100%';
        contentContainer.style.width = '100%';
        contentContainer.style.padding = '32px';
        contentContainer.style.boxSizing = 'border-box';
        contentContainer.style.visibility = 'visible';
        contentContainer.style.opacity = '1';
      }

      container.appendChild(cardClone);
      document.body.appendChild(container);

      // Wait for DOM layout and fonts
      await new Promise(resolve => setTimeout(resolve, 800));

      const canvas = await html2canvas(container, {
        scale: exportScale,
        backgroundColor: '#0a0f1e',
        useCORS: true,
        logging: false,
        width: baseWidth,
        height: baseHeight,
        windowWidth: baseWidth
      });

      document.body.removeChild(container);

      // Export Blob & Share (Logic from SaveButton)
      const blob = await new Promise<Blob | null>((resolve) => {
        canvas.toBlob((blob) => resolve(blob), 'image/png', 0.95);
      });

      if (!blob) throw new Error('Blob generation failed');

      const url = URL.createObjectURL(blob);
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      const supportsWebShare = 'share' in navigator;

      if (isMobile && supportsWebShare) {
        const file = new File([blob], `法律人年度报告.png`, { type: 'image/png' });
        try {
          if (navigator.canShare({ files: [file] })) {
            await navigator.share({
              files: [file],
              title: '法律人年度报告',
              text: '我的2025法律人年度报告'
            });
          } else {
            throw new Error('Share not supported');
          }
        } catch (e) {
          window.open(url, '_blank');
        }
      } else {
        const link = document.createElement('a');
        link.href = url;
        link.download = `法律人年度报告-${userName || '我的'}.png`;
        link.click();
      }

      URL.revokeObjectURL(url);

    } catch (error) {
      console.error('保存失败', error);
      alert('保存失败，请重试');
    } finally {
      // 恢复随机按钮显示
      if (shuffleButton) {
        (shuffleButton as HTMLElement).style.display = '';
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full flex flex-col"
    >
      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="flex-1 flex flex-col justify-center min-h-0 py-4 pt-8 sm:pt-12"
      >
        {!showPreview ? (
          /* Customization form */
          <div className="space-y-4 px-4 w-full max-w-sm mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-serif text-gradient-gold mb-2">生成你的年度报告</h2>
              <p className="text-muted-foreground text-sm">定制专属法律人名片，记录2025</p>
            </div>

            {/* Name input */}
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground flex items-center gap-2">
                <User className="w-4 h-4 text-[hsl(var(--gold-mid))]" />
                你的名字或ID
              </label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="例如：张律师"
                maxLength={20}
                className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-[hsl(var(--gold-mid))] focus:border-[hsl(var(--gold-mid))] transition-all text-base"
              />
            </div>

            {/* QR code upload */}
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground flex items-center gap-2">
                <Upload className="w-4 h-4 text-[hsl(var(--gold-mid))]" />
                上传微信二维码
              </label>

              {userQrImage ? (
                <div className="relative inline-block group">
                  <div className="border border-border rounded-lg p-1 bg-white/5">
                    <img
                      src={userQrImage}
                      alt="我的二维码"
                      className="w-24 h-24 object-contain bg-white rounded flex-none"
                    />
                  </div>
                  <button
                    onClick={removeQrImage}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center shadow-md transform transition-transform group-hover:scale-110"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full py-8 border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-[hsl(var(--gold-mid))/50] hover:bg-card/50 transition-all group"
                >
                  <div className="w-12 h-12 rounded-full bg-muted/30 flex items-center justify-center group-hover:bg-[hsl(var(--gold-mid))/10] transition-colors">
                    <Upload className="w-6 h-6 text-muted-foreground group-hover:text-[hsl(var(--gold-mid))]" />
                  </div>
                  <p className="text-sm text-muted-foreground/70">点击上传图片</p>
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
              className="w-full btn-primary flex items-center justify-center gap-2 text-base py-4 mt-4 font-serif tracking-wide shadow-lg shadow-primary/20"
            >
              生成预览
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        ) : (
          /* Share card preview */
          <div className="h-full flex flex-col items-center">
            <div className="flex-1 w-full flex items-center justify-center p-4 min-h-0 overflow-hidden">
              {/* CARD BEGINS */}
              <div
                ref={cardRef}
                className="relative bg-[#0a0f1e] text-foreground w-full max-w-[360px] aspect-[9/16] shadow-2xl overflow-hidden flex flex-col select-none group"
              >
                {/* Premium Background Layers */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#1a2333] via-[#0d1221] to-[#050810] z-0" />

                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#AA8E4A] to-transparent opacity-60 z-10" />
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#AA8E4A] to-transparent opacity-60 z-10" />
                <div className="absolute top-4 right-4 w-24 h-24 border-t border-r border-[#AA8E4A]/20 rounded-tr-3xl z-0" />
                <div className="absolute bottom-4 left-4 w-24 h-24 border-b border-l border-[#AA8E4A]/20 rounded-bl-3xl z-0" />

                {/* Content Container */}
                <div id="share-card-content" className="relative z-10 flex flex-col h-full p-8 px-10">

                  {/* Header - Using ultra-stable block centering for html2canvas */}
                  <div className="w-full mb-16" style={{ textAlign: 'center' }}>
                    <div className="w-[1px] h-8 bg-[#AA8E4A] opacity-40 mx-auto mb-6"></div>

                    <h1
                      className="text-[#AA8E4A] uppercase whitespace-nowrap leading-none mb-3 font-bold"
                      style={{
                        fontSize: '11px',
                        fontFamily: 'monospace',
                        letterSpacing: '3px',
                        display: 'block'
                      }}
                    >
                      LEGAL ANNUAL REPORT
                    </h1>

                    <p
                      className="text-[#AA8E4A]/80 whitespace-nowrap leading-none font-medium"
                      style={{
                        fontSize: '14px',
                        fontFamily: 'serif',
                        letterSpacing: '1px',
                        display: 'block'
                      }}
                    >
                      法律人 2025 年度报告
                    </p>
                  </div>

                  {/* Main Content Area */}
                  <div className="flex-1 flex flex-col justify-center relative">
                    {/* Checkbox / Quote Area */}
                    <div className="relative my-6 p-6 border-l-2 border-[#AA8E4A]/40 bg-gradient-to-r from-[#AA8E4A]/5 to-transparent rounded-r-lg">
                      {userName && (
                        <div className="absolute -top-[14px] right-2 inline-flex h-7 items-center justify-center bg-[#AA8E4A]/20 border border-[#AA8E4A]/30 px-3 rounded-full backdrop-blur-md z-20">
                          <span
                            className="text-[#F3EAC2] whitespace-nowrap"
                            style={{
                              fontSize: '11px',
                              fontFamily: 'monospace',
                              letterSpacing: '1px'
                            }}
                          >
                            {userName}
                          </span>
                        </div>
                      )}
                      <motion.button
                        onClick={shuffleConclusion}
                        className="absolute right-2 top-2 p-2 text-[#AA8E4A]/30 hover:text-[#AA8E4A] transition-colors z-20"
                        whileHover={{ rotate: 180 }}
                        title="换一句"
                      >
                        <Shuffle className="w-4 h-4" />
                      </motion.button>

                      <div className="space-y-4">
                        <h3 className="text-2xl sm:text-3xl font-serif leading-relaxed text-[#e0e0e0] font-medium tracking-wide">
                          {currentConclusion.mainText}
                        </h3>
                        {currentConclusion.subText && (
                          <div className="flex items-start gap-3 mt-4 pt-4 border-t border-[#AA8E4A]/10">
                            <span className="text-4xl text-[#AA8E4A]/20 font-serif leading-none">“</span>
                            <p className="text-sm sm:text-base font-light leading-7 text-muted-foreground/90 font-serif">
                              {currentConclusion.subText}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Footer Area */}
                  <div className="mt-auto space-y-6 pt-6 border-t border-[#AA8E4A]/10 relative">
                    {/* Narration Text */}
                    <p className="text-xs text-center text-muted-foreground/50 font-serif leading-relaxed px-4">
                      {narration.text}
                    </p>

                    {/* QR Codes Grid */}
                    <div className="grid grid-cols-2 gap-4">
                      {/* Left QR (User) or Placeholder */}
                      <div className="flex flex-col items-center justify-end gap-2">
                        {userQrImage ? (
                          <>
                            <div className="p-1 bg-white rounded shadow-lg">
                              <img src={userQrImage} className="w-16 h-16 object-contain" alt="QR" />
                            </div>
                            <span className="text-[10px] text-[#AA8E4A]/60 font-mono tracking-wider">CONNECT WITH ME</span>
                          </>
                        ) : (
                          <div className="h-full flex items-end opacity-30">
                            <span className="text-[10px] font-mono tracking-widest text-center w-full block">LAW & AI<br />2025</span>
                          </div>
                        )}
                      </div>

                      {/* Right QR (Project) */}
                      <div className="flex flex-col items-center justify-end gap-2 border-l border-[#AA8E4A]/10 pl-4">
                        <div className="p-1 bg-white rounded shadow-lg">
                          <QRCodeSVG value={projectUrl} size={64} level="M" />
                        </div>
                        <span className="text-[10px] text-[#AA8E4A]/60 font-mono tracking-wider">GET YOUR REPORT</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* CARD ENDS */}
            </div>

            {/* Action buttons */}
            <div className="w-full max-w-sm mx-auto px-4 mt-4 pb-4 flex gap-3">
              <button
                onClick={() => setShowPreview(false)}
                className="flex-[2] btn-secondary py-3 text-sm sm:text-base font-medium rounded-xl border-border/50 hover:bg-card"
              >
                返回编辑
              </button>
              <button
                onClick={handleSaveCard}
                className="flex-[3] btn-primary flex items-center justify-center gap-2 py-3 text-sm sm:text-base font-medium rounded-xl bg-[#AA8E4A] hover:bg-[#8e753b] text-white border-none shadow-[0_4px_12px_rgba(170,142,74,0.3)]"
              >
                <Download className="w-4 h-4" />
                保存海报
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div >
  );
}
