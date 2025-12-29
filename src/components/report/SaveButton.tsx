import { useState, useRef } from 'react';
import { Download, X } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import html2canvas from 'html2canvas';

interface SaveButtonProps {
  pageRef: React.RefObject<HTMLDivElement>;
}

export function SaveButton({ pageRef }: SaveButtonProps) {
  const [showModal, setShowModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const captureRef = useRef<HTMLDivElement>(null);

  const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://falvren2025.lovable.app';

  const handleSave = async () => {
    if (!captureRef.current) return;
    
    setSaving(true);
    try {
      const canvas = await html2canvas(captureRef.current, {
        backgroundColor: '#0a0a0a',
        scale: 2,
        useCORS: true,
      });
      
      const link = document.createElement('a');
      link.download = `法律人年度报告-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Save failed:', error);
    } finally {
      setSaving(false);
      setShowModal(false);
    }
  };

  return (
    <>
      {/* Save button */}
      <button
        onClick={() => setShowModal(true)}
        className="fixed top-4 right-4 z-50 flex items-center gap-1.5 px-3 py-1.5 bg-secondary/80 backdrop-blur-sm text-secondary-foreground text-xs rounded-full border border-border hover:bg-secondary transition-colors"
      >
        <Download className="w-3 h-3" />
        <span className="hidden sm:inline">保存</span>
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/90 backdrop-blur-sm">
          <div className="relative w-full max-w-sm">
            {/* Close button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute -top-2 -right-2 z-10 p-1.5 bg-secondary rounded-full border border-border hover:bg-muted transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Capture area */}
            <div
              ref={captureRef}
              className="bg-background rounded-lg overflow-hidden"
            >
              {/* Header */}
              <div className="px-6 pt-6 pb-4 text-center border-b border-border/50">
                <p className="font-mono text-xs text-muted-foreground tracking-wider mb-1">2025</p>
                <h3 className="text-lg font-medium text-foreground">法律人年度报告</h3>
              </div>

              {/* Content preview - simplified version */}
              <div className="px-6 py-4">
                <p className="text-sm text-muted-foreground text-center mb-4">
                  数据为随机生成，但你会觉得很熟悉
                </p>
                <div className="text-center py-4">
                  <p className="text-base text-foreground leading-relaxed">
                    你没有热爱法律<br />
                    你只是比很多人<br />
                    更能忍受复杂、模糊和不被回应
                  </p>
                </div>
              </div>

              {/* QR Code section */}
              <div className="px-6 pb-6 pt-2">
                <div className="flex items-center justify-center gap-4 p-4 bg-card rounded-lg border border-border">
                  <div className="bg-white p-2 rounded">
                    <QRCodeSVG 
                      value={siteUrl} 
                      size={64}
                      level="M"
                    />
                  </div>
                  <div className="text-left">
                    <p className="text-xs text-muted-foreground mb-1">扫码生成你的报告</p>
                    <p className="text-xs font-mono text-muted-foreground/70 break-all">
                      {siteUrl.replace('https://', '')}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Save button */}
            <button
              onClick={handleSave}
              disabled={saving}
              className="w-full mt-4 btn-primary disabled:opacity-50"
            >
              {saving ? '保存中...' : '保存图片到本地'}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
