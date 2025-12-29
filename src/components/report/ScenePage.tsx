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
      className="space-y-10"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="space-y-3"
      >
        <div className="flex items-center gap-3">
          <span className="text-xl">{icon}</span>
          <p className="font-mono text-sm text-muted-foreground tracking-wider">
            {categoryName}
          </p>
        </div>
      </motion.div>

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="card-report"
      >
        <p className="text-xl md:text-2xl text-foreground leading-relaxed whitespace-pre-line">
          {parseText(mainText)}
        </p>
        
        {subtext && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-6 text-sm text-muted-foreground"
          >
            {parseText(subtext)}
          </motion.p>
        )}
      </motion.div>

      {/* Soul text */}
      {soulText && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="pt-4 border-t border-border/50"
        >
          <p className="soul-text whitespace-pre-line">
            {soulText}
          </p>
        </motion.div>
      )}

      {/* Continue button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="flex justify-center pt-4"
      >
        <button onClick={onNext} className="btn-secondary">
          {isLast ? '查看年终结论 →' : '继续查看 →'}
        </button>
      </motion.div>
    </motion.div>
  );
}
