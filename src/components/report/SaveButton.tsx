import { useState } from 'react';
import { Download, Check } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import html2canvas from 'html2canvas';
import wechatQr from '@/assets/wechat-qr.png';

interface SaveButtonProps {
  pageRef: React.RefObject<HTMLDivElement>;
}

export function SaveButton({ pageRef }: SaveButtonProps) {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const siteUrl = typeof window !== 'undefined' ? window.location.origin : '';

  const handleSave = async () => {
    if (!pageRef.current || saving) return;
    
    setSaving(true);
    
    try {
      // 创建一个临时容器来组合页面内容和底部信息
      const container = document.createElement('div');
      container.style.cssText = `
        position: fixed;
        left: -9999px;
        top: 0;
        width: 375px;
        background: #0a0a0a;
        padding: 20px;
        box-sizing: border-box;
      `;
      
      // 克隆当前页面内容
      const pageClone = pageRef.current.cloneNode(true) as HTMLElement;
      pageClone.style.cssText = `
        height: auto;
        min-height: auto;
        padding: 0;
      `;
      
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
      
      container.appendChild(pageClone);
      
      // 添加分隔线
      const divider = document.createElement('div');
      divider.style.cssText = `
        height: 1px;
        background: rgba(255,255,255,0.1);
        margin: 20px 0;
      `;
      container.appendChild(divider);
      
      // 添加底部信息区域
      const footer = document.createElement('div');
      footer.style.cssText = `
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 16px;
        background: rgba(255,255,255,0.05);
        border-radius: 8px;
      `;
      
      // 作者二维码
      const qrWrapper = document.createElement('div');
      qrWrapper.style.cssText = `
        width: 56px;
        height: 56px;
        background: white;
        border-radius: 6px;
        padding: 4px;
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
        <div style="font-size: 10px; color: rgba(255,255,255,0.5); margin-bottom: 2px;">作者</div>
        <div style="font-size: 14px; color: white; font-weight: 500;">杨卫薪律师</div>
        <div style="font-size: 12px; color: rgba(255,255,255,0.6); font-family: monospace;">微信 ywxlaw</div>
      `;
      footer.appendChild(authorInfo);
      
      // 网站二维码
      const siteQrWrapper = document.createElement('div');
      siteQrWrapper.style.cssText = `
        width: 56px;
        height: 56px;
        background: white;
        border-radius: 6px;
        padding: 4px;
        flex-shrink: 0;
      `;
      container.appendChild(footer);
      
      // 添加网站链接
      const siteLink = document.createElement('div');
      siteLink.style.cssText = `
        text-align: center;
        margin-top: 12px;
        font-size: 10px;
        color: rgba(255,255,255,0.3);
      `;
      siteLink.textContent = '扫码生成你的年度报告';
      container.appendChild(siteLink);
      
      // 网站二维码容器
      const siteQrContainer = document.createElement('div');
      siteQrContainer.style.cssText = `
        display: flex;
        justify-content: center;
        margin-top: 8px;
      `;
      const siteQrBox = document.createElement('div');
      siteQrBox.style.cssText = `
        background: white;
        padding: 8px;
        border-radius: 6px;
      `;
      siteQrBox.id = 'site-qr-placeholder';
      siteQrContainer.appendChild(siteQrBox);
      container.appendChild(siteQrContainer);
      
      document.body.appendChild(container);
      
      // 渲染网站二维码
      const qrPlaceholder = document.getElementById('site-qr-placeholder');
      if (qrPlaceholder) {
        const tempDiv = document.createElement('div');
        const root = await import('react-dom/client');
        const reactRoot = root.createRoot(tempDiv);
        reactRoot.render(
          <QRCodeSVG value={siteUrl} size={60} level="M" />
        );
        await new Promise(resolve => setTimeout(resolve, 100));
        qrPlaceholder.appendChild(tempDiv);
      }
      
      // 等待图片加载
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // 截图
      const canvas = await html2canvas(container, {
        backgroundColor: '#0a0a0a',
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
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
