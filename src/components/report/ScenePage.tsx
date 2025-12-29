import { motion } from 'framer-motion';
import { 
  GeneratedScene, 
  formatSceneText, 
  formatSubtext, 
  formatSoulText,
  getSceneIcon,
  getCategoryName
} from '@/lib/sceneLibrary';

interface ScenePageProps {
  generated: GeneratedScene;
  onNext: () => void;
  isLast?: boolean;
}

// 解析 markdown 风格的加粗文本
function parseText(text: string): React.ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <span key={i} className="font-mono font-semibold text-foreground">
          {part.slice(2, -2)}
        </span>
      );
    }
    return part;
  });
}

export function ScenePage({ generated, onNext, isLast }: ScenePageProps) {
  const mainText = formatSceneText(generated);
  const subtext = formatSubtext(generated);
  const soulText = formatSoulText(generated);
  const icon = getSceneIcon(generated.scene.category);
  const categoryName = getCategoryName(generated.scene.category);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col h-full justify-between"
    >
      {/* Header - 类别标识 */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
        className="flex-shrink-0 flex items-center gap-2 mb-2 sm:mb-4"
      >
        <span className="text-base sm:text-lg">{icon}</span>
        <p className="font-mono text-xs sm:text-sm text-muted-foreground tracking-wider uppercase">
          {categoryName}
        </p>
      </motion.div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col justify-center min-h-0">
        {/* 主卡片 */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="card-report py-4 px-4 sm:py-6 sm:px-8"
        >
          {/* 主文案 - 移动端字体加大 */}
          <p className="text-lg leading-relaxed sm:text-xl md:text-2xl text-foreground whitespace-pre-line">
            {parseText(mainText)}
          </p>
          
          {/* 补充说明 */}
          {subtext && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.3 }}
              className="mt-3 sm:mt-5 pt-3 sm:pt-4 border-t border-border/30 text-sm sm:text-sm text-muted-foreground"
            >
              {parseText(subtext)}
            </motion.p>
          )}
        </motion.div>

        {/* 点睛句（灵魂吐槽）*/}
        {soulText && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-3 sm:mt-5 px-1"
          >
            <p className="text-sm sm:text-base text-muted-foreground/60 italic whitespace-pre-line leading-relaxed">
              {soulText}
            </p>
          </motion.div>
        )}
      </div>

      {/* 底部按钮 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.3 }}
        className="flex-shrink-0 flex justify-center mt-3 sm:mt-6"
      >
        <button 
          onClick={onNext} 
          className="btn-secondary text-sm sm:text-base px-5 py-2.5 sm:px-6 sm:py-3"
        >
          {isLast ? '查看年终结论 →' : '继续 →'}
        </button>
      </motion.div>
    </motion.div>
  );
}
