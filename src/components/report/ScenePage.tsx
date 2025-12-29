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
      className="flex flex-col h-full justify-between py-2 sm:py-0 sm:block sm:space-y-6 md:space-y-10"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="flex-shrink-0"
      >
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="text-base sm:text-xl">{icon}</span>
          <p className="font-mono text-xs sm:text-sm text-muted-foreground tracking-wider">
            {categoryName}
          </p>
        </div>
      </motion.div>

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="flex-1 flex flex-col justify-center sm:flex-none"
      >
        <div className="card-report py-4 px-5 sm:py-8 sm:px-8">
          <p className="text-base sm:text-xl md:text-2xl text-foreground leading-relaxed whitespace-pre-line">
            {parseText(mainText)}
          </p>
          
          {subtext && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="mt-3 sm:mt-6 text-xs sm:text-sm text-muted-foreground"
            >
              {parseText(subtext)}
            </motion.p>
          )}
        </div>

        {/* Soul text */}
        {soulText && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-border/50"
          >
            <p className="text-xs sm:text-base text-muted-foreground/70 italic whitespace-pre-line leading-relaxed">
              {soulText}
            </p>
          </motion.div>
        )}
      </motion.div>

      {/* Continue button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.4 }}
        className="flex-shrink-0 flex justify-center pt-2 sm:pt-4"
      >
        <button onClick={onNext} className="btn-secondary text-sm sm:text-base px-4 py-2 sm:px-6 sm:py-3">
          {isLast ? '查看年终结论 →' : '继续查看 →'}
        </button>
      </motion.div>
    </motion.div>
  );
}
