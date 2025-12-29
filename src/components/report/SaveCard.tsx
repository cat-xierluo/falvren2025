import { QRCodeSVG } from 'qrcode.react';
import { GeneratedReport } from '@/lib/sceneLibrary';
import wechatQr from '@/assets/wechat-qr.png';

interface SaveCardProps {
  report: GeneratedReport;
  currentPage: number;
}

const siteUrl = 'https://falvren2025.lovable.app';

export function SaveCard({ report, currentPage }: SaveCardProps) {
  // 计算当前是哪个场景
  const getPageContent = () => {
    // Page 0: Identity
    if (currentPage === 0) {
      return (
        <div className="flex flex-col items-center justify-center h-full">
          <div className="text-6xl mb-6">⚖️</div>
          <h2 className="text-2xl font-bold mb-4 text-center">法律人年度报告</h2>
          <p className="text-lg text-muted-foreground text-center">2025</p>
        </div>
      );
    }

    // Scene pages
    const sceneIndex = currentPage - 1;
    if (sceneIndex < report.scenes.length) {
      const scene = report.scenes[sceneIndex];
      const categoryName = scene.scene.category;

      return (
        <div className="flex flex-col h-full">
          {/* Category header */}
          <div className="text-center mb-6">
            <span className="text-4xl">{scene.scene.icon}</span>
            <p className="text-sm font-mono text-muted-foreground tracking-wider uppercase mt-2">
              {categoryName}
            </p>
          </div>

          {/* Main card */}
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center px-6">
              <div
                className="text-xl sm:text-2xl font-light leading-relaxed whitespace-pre-line"
                dangerouslySetInnerHTML={{ __html: scene.displayText }}
              />
              {scene.subtext && (
                <p className="text-sm text-muted-foreground/80 mt-4 leading-relaxed">
                  {scene.subtext}
                </p>
              )}
              {scene.soulText && (
                <p className="text-xs text-muted-foreground/50 mt-3 whitespace-pre-line">
                  {scene.soulText}
                </p>
              )}
            </div>
          </div>
        </div>
      );
    }

    // Conclusion page
    if (sceneIndex === report.scenes.length) {
      return (
        <div className="flex flex-col h-full">
          <div className="flex-1 flex items-center justify-center px-6">
            <div className="text-center">
              <p className="text-2xl font-light text-foreground leading-relaxed tracking-wide">
                {report.conclusion.mainText}
              </p>
              <p className="text-base text-muted-foreground/80 leading-relaxed mt-4 whitespace-pre-line">
                {report.conclusion.subText}
              </p>
            </div>
          </div>

          {/* Author card */}
          <div className="flex-shrink-0">
            <div className="bg-muted/20 py-3 px-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 flex-shrink-0 bg-white rounded-lg p-1.5">
                  <img src={wechatQr} alt="微信二维码" className="w-full h-full object-contain" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-xs text-muted-foreground">作者</p>
                  <p className="text-base text-foreground font-medium">杨卫薪律师</p>
                  <p className="text-sm text-muted-foreground font-mono">微信 ywxlaw</p>
                  <p className="text-[10px] text-muted-foreground/50 mt-0.5 leading-tight">
                    那个也还在改文书的律师
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Share/Promote pages
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <p className="text-xl text-center">感谢使用</p>
      </div>
    );
  };

  return (
    <div className="w-full h-full bg-[#0a0a0a] flex flex-col p-5">
      {/* Main content */}
      <div className="flex-1 flex items-center justify-center">
        {getPageContent()}
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-white/10 my-4" />

      {/* Footer */}
      <div className="flex-shrink-0 flex flex-col items-center gap-2 pb-2">
        <p className="text-[10px] text-white/35 text-center">扫码生成你的法律人年度报告</p>
        <div className="bg-white p-2 rounded">
          <QRCodeSVG value={siteUrl} size={48} level="M" />
        </div>
      </div>
    </div>
  );
}
