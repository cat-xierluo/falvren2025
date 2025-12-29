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
      // 固定尺寸（9:16 比例，确保不显得过长）
      const cardWidth = 390;
      const cardHeight = Math.round((cardWidth * 16) / 9);
      const footerSpace = 120;
      const qrSize = 56;
      const contentOffset = 36;

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

      // 移除噪点层，避免导出过重
      pageClone.querySelectorAll('.bg-noise').forEach(node => node.remove());

      // 移除底部页码
      const dots = pageClone.querySelectorAll('.flex.items-center.gap-1\\.5, .flex.items-center.gap-2');
      dots.forEach(dot => {
        if (dot.querySelector('.rounded-full')) {
          dot.parentElement?.remove();
        }
      });

      // 隐藏所有按钮（保留布局占位）
      pageClone.querySelectorAll('button').forEach(btn => {
        (btn as HTMLElement).style.visibility = 'hidden';
      });

      // 为二维码预留空间（不增加总高度）
      const layoutRoot = pageClone.querySelector<HTMLElement>('.h-\\[100dvh\\]');
      const contentRoot = layoutRoot ?? pageClone;
      contentRoot.style.height = `${cardHeight}px`;
      contentRoot.style.boxSizing = 'border-box';
      contentRoot.style.position = 'relative';

      const contentWrapper = document.createElement('div');
      contentWrapper.style.cssText = `
        height: ${cardHeight - footerSpace}px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 0;
        transform: translateY(-${contentOffset}px);
      `;

      while (contentRoot.firstChild) {
        contentWrapper.appendChild(contentRoot.firstChild);
      }
      contentRoot.appendChild(contentWrapper);

      // 添加二维码覆盖层（嵌入图片内部）
      const footer = document.createElement('div');
      footer.style.cssText = `
        position: absolute;
        left: 0;
        right: 0;
        bottom: 16px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
        z-index: 5;
      `;

      const divider = document.createElement('div');
      divider.style.cssText = `
        width: 76%;
        height: 1px;
        background: rgba(255,255,255,0.08);
      `;
      footer.appendChild(divider);

      const label = document.createElement('div');
      label.textContent = '扫码生成你的法律人年度报告';
      label.style.cssText = `
        font-size: 9px;
        color: rgba(255,255,255,0.45);
        text-align: center;
      `;
      footer.appendChild(label);

      const qrBox = document.createElement('div');
      qrBox.style.cssText = `
        background: white;
        padding: 8px;
        border-radius: 6px;
      `;
      qrBox.id = 'site-qr-placeholder';
      footer.appendChild(qrBox);
      contentRoot.appendChild(footer);

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

      // 渲染二维码
      const qrPlaceholder = container.querySelector('#site-qr-placeholder');
      const qrRoot = qrPlaceholder ? createRoot(qrPlaceholder) : null;
      qrRoot?.render(<QRCodeSVG value={siteUrl} size={qrSize} level="M" />);

      // 等待渲染完成
      await new Promise(resolve => setTimeout(resolve, 200));

      // 适配内容高度，避免与二维码区重叠
      const available = cardHeight - footerSpace - contentOffset;
      const actual = contentWrapper.scrollHeight;
      if (actual > available && available > 0) {
        const scale = available / actual;
        contentWrapper.style.transformOrigin = 'top center';
        contentWrapper.style.transform = `translateY(-${contentOffset}px) scale(${scale})`;
      }

      // 截图
      const canvas = await html2canvas(container, {
        scale: 3,
        useCORS: true,
        allowTaint: true,
        logging: false,
        width: cardWidth,
        height: cardHeight,
      });

      // 清理
      qrRoot?.unmount();
      document.body.removeChild(container);

      // 转换为 blob
      canvas.toBlob(async (blob) => {
        if (!blob) {
          alert('图片生成失败，请重试');
          setSaving(false);
          return;
        }

        // 检测是否是移动端或微信浏览器
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        const isWeChat = /MicroMessenger/i.test(navigator.userAgent);

        if (isMobile || isWeChat) {
          // 移动端：显示图片长按提示
          const url = URL.createObjectURL(blob);
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
          URL.revokeObjectURL(url);
        } else {
          // 桌面端：直接下载
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = `法律人年度报告-${Date.now()}.png`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(link.href);
        }

        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      }, 'image/png');

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
