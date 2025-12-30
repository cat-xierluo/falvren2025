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

  const handleSaveCard = async () => {
    if (!cardRef.current) return;

    // 隐藏随机按钮
    const shuffleButton = cardRef.current.querySelector('button[title="换一句"]');
    if (shuffleButton) {
      (shuffleButton as HTMLElement).style.display = 'none';
    }

    try {
      // 保持海报比例 9:16
      const exportWidth = 720; // 提高基础分辨率
      const exportHeight = 1280;

      const exportContainer = document.createElement('div');
      exportContainer.style.cssText = `
        position: fixed;
        left: -9999px;
        top: 0;
        width: ${exportWidth}px;
        height: ${exportHeight}px;
      `;

      const cardClone = cardRef.current.cloneNode(true) as HTMLElement;
      // 强制应用导出样式
      cardClone.style.width = `${exportWidth}px`;
      cardClone.style.height = `${exportHeight}px`;
      cardClone.style.maxWidth = 'none';
      cardClone.style.maxHeight = 'none';
      cardClone.style.borderRadius = '0'; // 导出时不需要圆角
      cardClone.style.margin = '0';
      cardClone.style.overflow = 'hidden';

      // 调整内容比例以适应更高分辨率的导出
      // 注意：这里简单缩放可能不够，但为了保持 React 组件的一致性，
      // 我们依赖 HTML/CSS 的流式布局自动适应更大的容器

      exportContainer.appendChild(cardClone);
      document.body.appendChild(exportContainer);
      await new Promise(resolve => setTimeout(resolve, 300)); // 增加等待时间确保渲染

      const canvas = await html2canvas(cardClone, {
        scale: 2, // 已经放大了基础尺寸，scale 2 足够
        backgroundColor: '#0a0f1e', // 确保背景色
        useCORS: true,
        logging: false,
      });

      document.body.removeChild(exportContainer);

      const link = document.createElement('a');
      link.download = `法律人2025年报-${userName || '我的'}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
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
                <div className="relative z-10 flex flex-col h-full p-8">

                  {/* Header */}
                  <div className="flex flex-col items-center space-y-3 mb-8">
                    <div className="w-1 h-8 bg-gradient-to-b from-transparent via-[#AA8E4A] to-transparent opacity-50 mb-2"></div>
                    <h1 className="text-xs font-mono tracking-[0.4em] text-[#AA8E4A]/80 uppercase">Legal Annual Report</h1>
                    <div className="flex items-center gap-3 w-full justify-center">
                      <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#AA8E4A]/30"></div>
                      <span className="text-base font-serif text-gradient-gold font-bold tracking-widest whitespace-nowrap">2025 · 法律人</span>
                      <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#AA8E4A]/30"></div>
                    </div>
                  </div>

                  {/* Main Content Area */}
                  <div className="flex-1 flex flex-col justify-center relative">
                    {/* User ID - Badge Style */}
                    {userName && (
                      <div className="absolute -top-2 right-0 bg-[#AA8E4A]/10 border border-[#AA8E4A]/20 px-3 py-1 rounded-full backdrop-blur-sm">
                        <span className="text-xs font-mono text-[#F3EAC2] tracking-wider">{userName}</span>
                      </div>
                    )}

                    {/* Checkbox / Quote Area */}
                    <div className="relative my-6 p-6 border-l-2 border-[#AA8E4A]/40 bg-gradient-to-r from-[#AA8E4A]/5 to-transparent rounded-r-lg">
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
                            <p className="text-sm sm:text-base font-light leading-7 text-muted-foreground/90 font-sans">
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
                    <p className="text-xs text-center text-muted-foreground/50 font-sans leading-relaxed px-4">
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
    </motion.div>
  );
}
