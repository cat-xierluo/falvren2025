import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Download, Check } from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';
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
      const cardWidth = 390;
      const cardHeight = 844;
      const footerSpace = 140;
      const qrSize = 56;
      const scaleFactor = 3;

      // 创建临时容器
      const container = document.createElement('div');
      container.className = 'bg-gradient-dark';
      container.style.cssText = `
        position: fixed;
        left: -9999px;
        top: 0;
        width: ${cardWidth}px;
        height: ${cardHeight}px;
        overflow: hidden;
        z-index: 9999;
      `;

      // 克隆当前页面
      const pageClone = pageRef.current.cloneNode(true) as HTMLElement;
      pageClone.style.cssText = `
        width: 100%;
        height: 100%;
        position: relative;
        margin: 0;
      `;

      // 移除进度条
      const progressBar = pageClone.querySelector('.h-\\[2px\\]');
      if (progressBar?.parentElement) {
        progressBar.parentElement.remove();
      }

      // 移除底部页码
      const dots = pageClone.querySelectorAll('.flex.items-center.gap-1\\.5, .flex.items-center.gap-2');
      dots.forEach(dot => {
        if (dot.querySelector('.rounded-full')) {
          dot.parentElement?.remove();
        }
      });

      // 隐藏按钮区域，避免导出显示
      pageClone.querySelectorAll('button').forEach(btn => {
        (btn as HTMLElement).style.visibility = 'hidden';
      });

      const layoutRoot = pageClone.querySelector<HTMLElement>('.h-\\[100dvh\\]');
      const contentRoot = layoutRoot ?? pageClone;
      contentRoot.style.height = `${cardHeight}px`;
      contentRoot.style.boxSizing = 'border-box';
      contentRoot.style.position = 'relative';
      contentRoot.style.paddingBottom = `${footerSpace}px`;

      container.appendChild(pageClone);
      document.body.appendChild(container);

      // 强制显示动画元素，避免导出时仍处于初始透明状态
      pageClone.querySelectorAll<HTMLElement>('[style]').forEach(node => {
        if (node.style.opacity === '0') {
          node.style.opacity = '1';
        }
        if (node.style.transform && node.style.transform.includes('translate')) {
          node.style.transform = 'none';
        }
        if (node.style.transition) {
          node.style.transition = 'none';
        }
      });

      const baseCanvas = await html2canvas(container, {
        scale: scaleFactor,
        useCORS: true,
        allowTaint: true,
        logging: false,
        width: cardWidth,
        height: cardHeight,
        windowWidth: cardWidth,
        windowHeight: cardHeight,
      });

      // 清理
      document.body.removeChild(container);

      // 渲染二维码（离屏）
      const qrHolder = document.createElement('div');
      const qrRoot = createRoot(qrHolder);
      qrRoot.render(<QRCodeCanvas value={siteUrl} size={qrSize} level="M" />);
      await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
      const qrCanvas = qrHolder.querySelector('canvas') as HTMLCanvasElement | null;
      qrRoot.unmount();

      // 合成导出画布：固定手机比例 + 底部二维码区
      const exportCanvas = document.createElement('canvas');
      exportCanvas.width = cardWidth * scaleFactor;
      exportCanvas.height = cardHeight * scaleFactor;
      const ctx = exportCanvas.getContext('2d');
      if (!ctx) throw new Error('Canvas context unavailable');

      const footerPx = footerSpace * scaleFactor;
      const contentHeight = (cardHeight - footerSpace) * scaleFactor;

      // 绘制主内容（与移动端一致）
      ctx.drawImage(baseCanvas, 0, 0, exportCanvas.width, exportCanvas.height);

      // 分隔线
      ctx.strokeStyle = 'rgba(255,255,255,0.08)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(exportCanvas.width * 0.12, contentHeight + footerPx * 0.18);
      ctx.lineTo(exportCanvas.width * 0.88, contentHeight + footerPx * 0.18);
      ctx.stroke();

      // 文案
      ctx.fillStyle = 'rgba(255,255,255,0.45)';
      ctx.font = '30px "Noto Sans SC", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('扫码生成你的法律人年度报告', exportCanvas.width / 2, contentHeight + footerPx * 0.42);

      // 绘制二维码
      if (qrCanvas) {
        const qrSizePx = qrSize * scaleFactor;
        const padding = 24 * scaleFactor;
        const qrBox = qrSizePx + padding;
        const qrX = (exportCanvas.width - qrBox) / 2;
        const qrY = contentHeight + footerPx * 0.5;
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(qrX, qrY, qrBox, qrBox);
        ctx.drawImage(qrCanvas, qrX + padding / 2, qrY + padding / 2, qrSizePx, qrSizePx);
      }

      // 转换为 blob（使用 Promise 包装）
      const blob = await new Promise<Blob | null>((resolve) => {
        exportCanvas.toBlob((blob) => resolve(blob), 'image/png');
      });

      if (!blob) {
        throw new Error('Failed to generate image blob');
      }

      // 检测环境
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      const isWeChat = /MicroMessenger/i.test(navigator.userAgent);
      const supportsWebShare = 'share' in navigator;

      const url = URL.createObjectURL(blob);

      // 策略1: 微信浏览器 - 使用全屏模态框预览
      if (isWeChat) {
        const modal = document.createElement('div');
        modal.style.cssText = `
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.95);
          z-index: 99999;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        `;

        // 提示文字
        const tip = document.createElement('div');
        tip.innerHTML = `
          <div style="color: #ffd700; font-size: 18px; margin-bottom: 8px; font-weight: 500;">👆 长按图片保存到相册</div>
          <div style="color: rgba(255,255,255,0.5); font-size: 13px;">保存后点击右上角关闭</div>
        `;
        tip.style.cssText = `
          position: absolute;
          top: 70px;
          text-align: center;
          pointer-events: none;
          padding: 0 20px;
        `;
        modal.appendChild(tip);

        // 图片容器
        const imgContainer = document.createElement('div');
        imgContainer.style.cssText = `
          max-width: 90%;
          max-height: 75%;
          display: flex;
          align-items: center;
          justify-content: center;
        `;

        const img = document.createElement('img');
        img.src = url;
        img.style.cssText = `
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          border-radius: 8px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.3);
        `;
        imgContainer.appendChild(img);
        modal.appendChild(imgContainer);

        // 关闭按钮
        const closeBtn = document.createElement('button');
        closeBtn.textContent = '✕ 关闭';
        closeBtn.style.cssText = `
          position: absolute;
          top: 20px;
          right: 20px;
          padding: 10px 18px;
          background: rgba(255,255,255,0.15);
          color: white;
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 24px;
          font-size: 15px;
          cursor: pointer;
          backdrop-filter: blur(10px);
          transition: background 0.2s;
        `;
        closeBtn.onmouseenter = () => {
          closeBtn.style.background = 'rgba(255,255,255,0.25)';
        };
        closeBtn.onmouseleave = () => {
          closeBtn.style.background = 'rgba(255,255,255,0.15)';
        };
        closeBtn.onclick = () => {
          document.body.removeChild(modal);
          URL.revokeObjectURL(url);
        };
        modal.appendChild(closeBtn);

        // 点击背景关闭
        modal.onclick = (e) => {
          if (e.target === modal) {
            document.body.removeChild(modal);
            URL.revokeObjectURL(url);
          }
        };

        document.body.appendChild(modal);
      }
      // 策略2: 其他移动端 - Web Share API
      else if (isMobile && supportsWebShare) {
        const file = new File([blob], `法律人年度报告-${Date.now()}.png`, { type: 'image/png' });

        try {
          if (navigator.canShare?.({ files: [file] })) {
            await navigator.share({
              files: [file],
              title: '法律人年度报告',
              text: '查看我的2025年度报告'
            });
          } else {
            throw new Error('File sharing not supported');
          }
        } catch (err) {
          // 用户取消或分享失败，降级到新窗口方案
          const imgWindow = window.open();
          if (imgWindow) {
            imgWindow.document.write(`
              <!DOCTYPE html>
              <html>
              <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
                <title>长按保存图片</title>
                <style>
                  * { margin: 0; padding: 0; box-sizing: border-box; }
                  body {
                    background: #000;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    min-height: 100vh;
                    padding: 20px;
                  }
                  .tip {
                    color: #fff;
                    text-align: center;
                    margin-bottom: 20px;
                    font-size: 16px;
                  }
                  .tip strong {
                    color: #ffd700;
                  }
                  img {
                    max-width: 100%;
                    height: auto;
                    box-shadow: 0 4px 20px rgba(255,255,255,0.1);
                  }
                </style>
              </head>
              <body>
                <div class="tip">
                  <strong>长按图片</strong><br>
                  选择"保存图片"<br>
                  <small style="opacity: 0.6; margin-top: 10px; display: block;">（iOS 选择"存储到"照片"）</small>
                </div>
                <img src="${url}" alt="法律人年度报告" />
              </body>
              </html>
            `);
          }
        }
        URL.revokeObjectURL(url);
      }
      // 策略3: 桌面端 - 直接下载
      else {
        const link = document.createElement('a');
        link.href = url;
        link.download = `法律人年度报告-${Date.now()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }

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
      className="fixed top-3 right-3 sm:top-4 sm:right-4 z-50 flex items-center gap-1.5 px-3 py-1.5 bg-secondary/80 backdrop-blur-sm text-secondary-foreground text-xs rounded-full border border-border hover:bg-secondary transition-all disabled:opacity-50"
    >
      {saving ? (
        <>
          <div className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin" />
          <span className="hidden sm:inline">保存中</span>
        </>
      ) : saved ? (
        <>
          <Check className="w-3 h-3" />
          <span className="hidden sm:inline">已保存</span>
        </>
      ) : (
        <>
          <Download className="w-3 h-3" />
          <span className="hidden sm:inline">保存图片</span>
        </>
      )}
    </button>
  );
}
