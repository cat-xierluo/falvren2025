import { useState } from 'react';
import { Download, Check } from 'lucide-react';
import html2canvas from 'html2canvas';

interface SaveButtonProps {
  pageRef: React.RefObject<HTMLDivElement>;
  currentPage: number;
  totalPages: number;
}

export function SaveButton({ pageRef }: SaveButtonProps) {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    if (!pageRef.current || saving) return;

    setSaving(true);

    try {
      const element = pageRef.current;

      // 创建固定尺寸的临时容器
      const cardWidth = 390;
      const cardHeight = 700;

      const container = document.createElement('div');
      container.style.cssText = `
        position: fixed;
        left: -9999px;
        top: 0;
        width: ${cardWidth}px;
        height: ${cardHeight}px;
        background: #0a0a0a;
        display: flex;
        flex-direction: column;
        overflow: hidden;
      `;

      // 克隆页面内容
      const pageClone = element.cloneNode(true) as HTMLElement;

      // 移除进度条
      const progressBar = pageClone.querySelector('.h-\\[2px\\]');
      if (progressBar?.parentElement) {
        progressBar.parentElement.remove();
      }

      // 移除返回按钮
      const backButtons = pageClone.querySelectorAll('button');
      backButtons.forEach(btn => btn.remove());

      // 移除页码指示器
      const pageDots = pageClone.querySelector('.pb-2.sm\\:pb-3');
      if (pageDots) {
        pageDots.remove();
      }

      // 显示二维码 footer
      const qrFooter = pageClone.querySelector('.save-footer-only');
      if (qrFooter instanceof HTMLElement) {
        qrFooter.classList.remove('hidden');
      }

      // 修正高度相关的样式
      const fullHeightNodes = pageClone.querySelectorAll<HTMLElement>('[class*="h-\\[100dvh\\]"]');
      fullHeightNodes.forEach(node => {
        node.style.height = 'auto';
        node.style.minHeight = 'auto';
      });

      // 设置克隆元素的样式
      pageClone.style.cssText = `
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        overflow: hidden;
      `;

      container.appendChild(pageClone);
      document.body.appendChild(container);

      await new Promise(resolve => setTimeout(resolve, 100));

      const canvas = await html2canvas(container, {
        backgroundColor: '#0a0a0a',
        scale: 3,
        useCORS: true,
        allowTaint: true,
        logging: false,
        width: cardWidth,
        height: cardHeight,
      });

      // 清理
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
