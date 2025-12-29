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
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
          <div style={{ fontSize: '48px', marginBottom: '24px' }}>⚖️</div>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px', textAlign: 'center', color: '#fff' }}>法律人年度报告</h2>
          <p style={{ fontSize: '18px', color: '#a1a1aa', textAlign: 'center' }}>2025</p>
        </div>
      );
    }

    // Scene pages
    const sceneIndex = currentPage - 1;
    if (sceneIndex < report.scenes.length) {
      const scene = report.scenes[sceneIndex];
      const categoryName = scene.scene.category;

      return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          {/* Category header */}
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <span style={{ fontSize: '32px' }}>{scene.scene.icon}</span>
            <p style={{ fontSize: '14px', fontFamily: 'monospace', color: '#a1a1aa', letterSpacing: '2px', textTransform: 'uppercase', marginTop: '8px' }}>
              {categoryName}
            </p>
          </div>

          {/* Main card */}
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ textAlign: 'center', padding: '0 24px' }}>
              <div
                style={{ fontSize: '20px', fontWeight: 300, lineHeight: 1.6, whiteSpace: 'pre-line', color: '#fafafa' }}
                dangerouslySetInnerHTML={{ __html: scene.displayText }}
              />
              {scene.subtext && (
                <p style={{ fontSize: '14px', color: 'rgba(250, 250, 250, 0.8)', marginTop: '16px', lineHeight: 1.6 }}>
                  {scene.subtext}
                </p>
              )}
              {scene.soulText && (
                <p style={{ fontSize: '12px', color: 'rgba(250, 250, 250, 0.5)', marginTop: '12px', whiteSpace: 'pre-line' }}>
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
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 24px' }}>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '24px', fontWeight: 300, color: '#fafafa', lineHeight: 1.6, letterSpacing: '0.5px' }}>
                {report.conclusion.mainText}
              </p>
              <p style={{ fontSize: '16px', color: 'rgba(250, 250, 250, 0.8)', lineHeight: 1.6, marginTop: '16px', whiteSpace: 'pre-line' }}>
                {report.conclusion.subText}
              </p>
            </div>
          </div>

          {/* Author card */}
          <div style={{ flexShrink: 0 }}>
            <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', padding: '12px 24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '56px', height: '56px', flexShrink: 0, backgroundColor: 'white', borderRadius: '8px', padding: '6px' }}>
                  <img src={wechatQr} alt="微信二维码" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </div>
                <div style={{ flex: 1, textAlign: 'left' }}>
                  <p style={{ fontSize: '12px', color: '#a1a1aa' }}>作者</p>
                  <p style={{ fontSize: '16px', color: '#fafafa', fontWeight: 500 }}>杨卫薪律师</p>
                  <p style={{ fontSize: '14px', color: '#a1a1aa', fontFamily: 'monospace' }}>微信 ywxlaw</p>
                  <p style={{ fontSize: '10px', color: 'rgba(250, 250, 250, 0.5)', marginTop: '2px', lineHeight: 1.2 }}>
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
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
        <p style={{ fontSize: '20px', textAlign: 'center', color: '#fafafa' }}>感谢使用</p>
      </div>
    );
  };

  return (
    <div style={{
      width: '100%',
      height: '100%',
      backgroundColor: '#0a0a0a',
      display: 'flex',
      flexDirection: 'column',
      padding: '20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    }}>
      {/* Main content */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {getPageContent()}
      </div>

      {/* Divider */}
      <div style={{ width: '100%', height: '1px', backgroundColor: 'rgba(255, 255, 255, 0.1)', margin: '16px 0' }} />

      {/* Footer */}
      <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', paddingBottom: '8px' }}>
        <p style={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.35)', textAlign: 'center' }}>扫码生成你的法律人年度报告</p>
        <div style={{ backgroundColor: 'white', padding: '8px', borderRadius: '4px' }}>
          <QRCodeSVG value={siteUrl} size={48} level="M" />
        </div>
      </div>
    </div>
  );
}
