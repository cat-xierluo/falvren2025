import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Download, Check } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import html2canvas from 'html2canvas';

interface SaveButtonProps {
  pageRef: React.RefObject<HTMLDivElement>;
  currentPage: number;
}

export function SaveButton({ pageRef, currentPage }: SaveButtonProps) {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const siteUrl = 'https://falvren2025.lovable.app';

  const handleSave = async () => {
    if (!pageRef.current || saving) return;

    setSaving(true);

    try {
      // 目标分辨率: 720x1280 (HD 9:16)
      const exportWidth = 720;
      const exportHeight = 1280;
      // 缩放因子：内容适配到 720 宽度的缩放比例
      // 假设移动端基准宽度约 390
      // 720 / 390 ≈ 1.85，但我们直接让容器宽 720，让流式布局自适应

      const container = document.createElement('div');
      container.className = 'font-serif text-foreground'; // 继承基础字体颜色
      container.style.cssText = `
        position: fixed;
        left: -9999px;
        top: 0;
        width: ${exportWidth}px;
        height: ${exportHeight}px;
        background-color: #0a0f1e; /* Deep Blue Background */
        overflow: hidden;
      `;

      // 1. 内容层 (Cloned Page)
      const pageClone = pageRef.current.cloneNode(true) as HTMLElement;

      // 清理不需要的元素
      const uiElementsToRemove = [
        '.h-\\[2px\\]', // 顶部进度条
        '.fixed.top-3', // 自身按钮 (如果被克隆进去的话)
        'button', // 所有按钮
      ];
      uiElementsToRemove.forEach(selector => {
        pageClone.querySelectorAll(selector).forEach(el => el.remove());
      });

      // 移除底部页码指示器 (通常是 flex 容器中的圆点)
      // 这比较依赖结构，尝试移除所有仅包含 unicode 或空 div 的 flex 容器
      const bottomIndicators = pageClone.querySelectorAll('.flex.items-center.gap-1\\.5, .flex.items-center.gap-2, .absolute.bottom-8');
      bottomIndicators.forEach(el => el.remove());

      // 强制内容全屏适配
      pageClone.style.cssText = `
        width: 390px;
        height: 692px;
        position: absolute;
        inset: 0;
        z-index: 0;
        padding: 0;
        box-sizing: border-box;
        transform: scale(1.85);
        transform-origin: top left;
      `;

      // 强制让内部的 ReportLayout 铺满
      const reportLayoutDiv = pageClone.firstElementChild as HTMLElement;
      if (reportLayoutDiv) {
        reportLayoutDiv.style.width = '100%';
        reportLayoutDiv.style.height = '100%';
        reportLayoutDiv.classList.remove('h-[100dvh]');

        // 关键：重置 main 容器的 Padding，使其适应海报布局而不是网页响应式布局
        // 网页版有 pt-40 (160px) 的顶部留白，这对海报来说太大，导致内容被压缩剪切
        const mainEl = reportLayoutDiv.querySelector('main') as HTMLElement;
        if (mainEl) {
          mainEl.classList.remove('pt-40', 'overflow-hidden', 'h-full'); // 移除网页版的大额留白和高度限制
          mainEl.style.paddingTop = '80px'; // 留出顶部 LEGAL ANNUAL REPORT Header 的空间 (100px / 2 + buffer)
          mainEl.style.paddingBottom = '80px'; // 留出底部二维码 Footer 的空间
          mainEl.style.height = 'auto'; // 允许高度自适应
          mainEl.style.overflow = 'visible'; // 允许溢出显示
        }
      }

      // 强制重置 transform 避免定位偏移
      const animatedElements = pageClone.querySelectorAll('*');
      animatedElements.forEach((el: Element) => {
        const hEl = el as HTMLElement;
        hEl.style.transform = 'none';
        hEl.style.opacity = '1';
        if (hEl.style.animation) hEl.style.animation = 'none';
        hEl.style.transition = 'none';
      });

      container.appendChild(pageClone);

      // 2. 装饰层 (Overlay)
      const overlay = document.createElement('div');
      overlay.style.cssText = `
        position: absolute;
        inset: 0;
        z-index: 10;
        pointer-events: none;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      `;

      // Header Decoration
      const header = document.createElement('div');
      header.innerHTML = `
        <div style="
          width: 100%; 
          height: 100px; 
          background: linear-gradient(to bottom, #0a0f1e 0%, transparent 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding-top: 30px;
        ">
            <div style="color: rgba(170,142,74,0.9); font-family: monospace; font-size: 20px; letter-spacing: 4px; margin-bottom: 8px; font-weight: 700; white-space: nowrap;">LEGAL ANNUAL REPORT</div>
            <div style="color: rgba(255,255,255,0.5); font-size: 14px; font-weight: 300; letter-spacing: 2px; white-space: nowrap;">记录我的法律人年度足迹</div>
        </div>
      `;
      overlay.appendChild(header);

      // Footer Decoration
      const footer = document.createElement('div');
      footer.style.cssText = `
        width: 100%;
        padding-bottom: 40px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-end;
        background: linear-gradient(to top, #0a0f1e 0%, transparent 100%);
      `;

      footer.innerHTML = `
         <div style="width: 80%; height: 1px; background: rgba(255,255,255,0.1); margin-bottom: 20px;"></div>
         <div style="color: rgba(255,255,255,0.5); font-size: 14px; margin-bottom: 15px; letter-spacing: 1px;">扫码生成你的法律人年度报告</div>
      `;

      // QR Code
      const qrContainerBox = document.createElement('div');
      qrContainerBox.style.cssText = `
        background: white;
        padding: 6px;
        border-radius: 6px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      `;
      const qrContainer = document.createElement('div');
      const qrRoot = createRoot(qrContainer);
      qrRoot.render(<QRCodeSVG value={siteUrl} size={80} level="M" />);

      qrContainerBox.appendChild(qrContainer);
      footer.appendChild(qrContainerBox);
      overlay.appendChild(footer);

      // Gold Border


      container.appendChild(overlay);
      document.body.appendChild(container);

      // Wait for QR render and DOM layout - increased for font stability
      await new Promise(resolve => setTimeout(resolve, 1500));

      const canvas = await html2canvas(container, {
        scale: 2, // 2x scale for retina-like sharpness (resulting in 1440x2560 pixels internally, but outputting consistent size)
        backgroundColor: '#0a0f1e',
        useCORS: true,
        logging: false,
        width: exportWidth, // Force canvas size
        height: exportHeight
      });

      // Cleanup
      document.body.removeChild(container);
      qrRoot.unmount();

      // Export Blob & Share
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
          // Fallback to opening image
          window.open(url, '_blank');
        }
      } else {
        const link = document.createElement('a');
        link.href = url;
        link.download = `法律人年度报告-${Date.now()}.png`;
        link.click();
      }

      URL.revokeObjectURL(url);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);

    } catch (error) {
      console.error('Save failed:', error);
      alert('保存失败，请重试');
    } finally {
      setSaving(false);
    }
  };

  return (
    <button
      onClick={handleSave}
      disabled={saving}
      className="fixed top-3 right-3 sm:top-4 sm:right-4 z-50 flex items-center gap-1.5 px-3 py-1.5 bg-secondary/80 backdrop-blur-sm text-secondary-foreground text-xs rounded-full border border-border hover:bg-secondary transition-all disabled:opacity-50 shadow-lg"
    >
      {saving ? (
        <>
          <div className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin" />
          <span>生成中</span>
        </>
      ) : saved ? (
        <>
          <Check className="w-3 h-3" />
          <span>已保存</span>
        </>
      ) : (
        <>
          <Download className="w-3 h-3" />
          <span>保存本页</span>
        </>
      )}
    </button>
  );
}
