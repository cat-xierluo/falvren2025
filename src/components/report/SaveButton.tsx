import { useState } from 'react';
import { Download, Check } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import html2canvas from 'html2canvas';
import wechatQr from '@/assets/wechat-qr.png';

interface SaveButtonProps {
  pageRef: React.RefObject<HTMLDivElement>;
  currentPage: number;
  totalPages: number;
}

export function SaveButton({ pageRef, currentPage, totalPages }: SaveButtonProps) {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const siteUrl = 'https://falvren2025.lovable.app';

  // 判断是否是最后一页（推广页）
  const isLastPage = currentPage === totalPages - 1;

  const handleSave = async () => {
    if (!pageRef.current || saving) return;
    
    setSaving(true);
    
    try {
      // iPhone 屏幕比例：390x700 (更紧凑的尺寸)
      const cardWidth = 390;
      const cardHeight = 700;
      const paddingTop = 20;
      const paddingBottom = 16;
      const contentGap = 10;
      const dividerHeight = 1;
      const footerHeight = isLastPage ? 120 : 90;
      const contentHeight = cardHeight - paddingTop - paddingBottom - contentGap - dividerHeight - footerHeight;

      // 创建一个临时容器来组合页面内容和底部信息
      const container = document.createElement('div');
      container.style.cssText = `
        position: fixed;
        left: -9999px;
        top: 0;
        width: ${cardWidth}px;
        height: ${cardHeight}px;
        background: #0a0a0a;
        padding: ${paddingTop}px 20px ${paddingBottom}px 20px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        overflow: hidden;
      `;

      // 克隆当前页面内容
      const pageClone = pageRef.current.cloneNode(true) as HTMLElement;
      pageClone.style.cssText = `
        width: 100%;
        overflow: hidden;
        padding: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
      `;

      const pageWrapper = document.createElement('div');
      pageWrapper.style.cssText = `
        height: ${contentHeight}px;
        width: 100%;
        overflow: hidden;
        display: flex;
        align-items: flex-start;
        justify-content: center;
        flex-shrink: 0;
        position: relative;
      `;
      pageWrapper.appendChild(pageClone);

      // 移除进度条和页码指示器（保留主内容）
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

      // 移除底部按钮（保存图片按钮）
      const buttons = pageClone.querySelectorAll('button');
      buttons.forEach(btn => btn.remove());

      container.appendChild(pageWrapper);

      // 添加分隔线
      const divider = document.createElement('div');
      divider.style.cssText = `
        height: 1px;
        background: rgba(255,255,255,0.1);
        margin: ${contentGap}px 0 10px 0;
        flex-shrink: 0;
      `;
      container.appendChild(divider);

      // 根据是否是最后一页决定底部内容
      if (isLastPage) {
        // 最后一页：显示作者信息 + 网站二维码
        const footer = document.createElement('div');
        footer.style.cssText = `
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px;
          background: rgba(255,255,255,0.05);
          border-radius: 4px;
          margin-bottom: 3px;
          flex-shrink: 0;
          height: ${footerHeight - 22}px;
        `;

        // 作者二维码
        const qrWrapper = document.createElement('div');
        qrWrapper.style.cssText = `
          width: 32px;
          height: 32px;
          background: white;
          border-radius: 3px;
          padding: 1.5px;
          flex-shrink: 0;
        `;
        const qrImg = document.createElement('img');
        qrImg.src = wechatQr;
        qrImg.style.cssText = 'width: 100%; height: 100%; object-fit: contain;';
        qrWrapper.appendChild(qrImg);
        footer.appendChild(qrWrapper);

        // 作者信息
        const authorInfo = document.createElement('div');
        authorInfo.style.cssText = 'flex: 1;';
        authorInfo.innerHTML = `
          <div style="font-size: 7px; color: rgba(255,255,255,0.5); margin-bottom: 0.5px;">作者</div>
          <div style="font-size: 10px; color: white; font-weight: 500;">杨卫薪律师</div>
          <div style="font-size: 8px; color: rgba(255,255,255,0.6); font-family: monospace;">微信 ywxlaw</div>
        `;
        footer.appendChild(authorInfo);
        container.appendChild(footer);

        // 网站链接文字
        const siteLink = document.createElement('div');
        siteLink.style.cssText = `
          text-align: center;
          margin-bottom: 3px;
          font-size: 7px;
          color: rgba(255,255,255,0.35);
          flex-shrink: 0;
        `;
        siteLink.textContent = '扫码生成你的法律人年度报告';
        container.appendChild(siteLink);

        // 网站二维码容器
        const siteQrContainer = document.createElement('div');
        siteQrContainer.style.cssText = `
          display: flex;
          justify-content: center;
          padding-bottom: 0;
          flex-shrink: 0;
        `;
        const siteQrBox = document.createElement('div');
        siteQrBox.style.cssText = `
          background: white;
          padding: 3px;
          border-radius: 3px;
        `;
        siteQrBox.id = 'site-qr-placeholder';
        siteQrContainer.appendChild(siteQrBox);
        container.appendChild(siteQrContainer);
      } else {
        // 其他页面：只显示网站二维码
        // 添加网站链接文字
        const siteLink = document.createElement('div');
        siteLink.style.cssText = `
          text-align: center;
          margin-bottom: 3px;
          font-size: 8px;
          color: rgba(255,255,255,0.4);
          flex-shrink: 0;
        `;
        siteLink.textContent = '扫码生成你的法律人年度报告';
        container.appendChild(siteLink);

        // 网站二维码容器
        const siteQrContainer = document.createElement('div');
        siteQrContainer.style.cssText = `
          display: flex;
          justify-content: center;
          padding-bottom: 0;
          flex-shrink: 0;
        `;
        const siteQrBox = document.createElement('div');
        siteQrBox.style.cssText = `
          background: white;
          padding: 3px;
          border-radius: 3px;
        `;
        siteQrBox.id = 'site-qr-placeholder';
        siteQrContainer.appendChild(siteQrBox);
        container.appendChild(siteQrContainer);
      }
      
      document.body.appendChild(container);

      // 修正 100dvh 相关高度，并按内容高度缩放
      const fullHeightNodes = pageClone.querySelectorAll<HTMLElement>('[class*="h-\\[100dvh\\]"]');
      fullHeightNodes.forEach(node => {
        node.style.height = '100%';
      });
      await new Promise(resolve => setTimeout(resolve, 50));
      const actualHeight = pageClone.scrollHeight;
      if (actualHeight > contentHeight) {
        const scale = contentHeight / actualHeight;
        // 使用绝对定位确保缩放不影响布局
        pageClone.style.position = 'absolute';
        pageClone.style.transform = `scale(${scale})`;
        pageClone.style.transformOrigin = 'top center';
        // 调整宽度以匹配缩放
        pageClone.style.width = `${cardWidth / scale}px`;
        pageClone.style.maxWidth = 'none';
      }
      
      // 渲染网站二维码
      const qrPlaceholder = document.getElementById('site-qr-placeholder');
      if (qrPlaceholder) {
        const tempDiv = document.createElement('div');
        const root = await import('react-dom/client');
        const reactRoot = root.createRoot(tempDiv);
        reactRoot.render(
          <QRCodeSVG value={siteUrl} size={48} level="M" />
        );
        await new Promise(resolve => setTimeout(resolve, 100));
        qrPlaceholder.appendChild(tempDiv);
      }
      
      // 等待图片加载
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // 截图
      const canvas = await html2canvas(container, {
        backgroundColor: '#0a0a0a',
        scale: 3,
        useCORS: true,
        allowTaint: true,
        logging: false,
        width: cardWidth,
        height: cardHeight,
        windowWidth: cardWidth,
        windowHeight: cardHeight,
        scrollX: 0,
        scrollY: 0,
      });
      
      // 清理
      document.body.removeChild(container);
      
      // 下载图片
      const link = document.createElement('a');
      link.download = `法律人年度报告-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      
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
