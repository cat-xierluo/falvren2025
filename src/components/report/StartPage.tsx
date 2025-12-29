import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { availableCities, BusinessArea, Gender } from '@/lib/sceneLibrary';

interface StartPageProps {
  onStart: (options: { city?: string; gender?: Gender; businessArea?: BusinessArea }) => void;
}

// 热门城市
const hotCities = ['北京', '上海', '深圳', '广州', '杭州', '成都'];

export function StartPage({ onStart }: StartPageProps) {
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [showAllCities, setShowAllCities] = useState(false);
  const [customCityInput, setCustomCityInput] = useState<string>('');
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [selectedGender, setSelectedGender] = useState<Gender>('random');
  const [selectedBusinessArea, setSelectedBusinessArea] = useState<BusinessArea>('random');
  const [showOptions, setShowOptions] = useState(false);

  const handleStart = () => {
    onStart({
      city: selectedCity === '自己填写' ? '随机' : (selectedCity || undefined),
      gender: selectedGender,
      businessArea: selectedBusinessArea
    });
  };

  const handleSkip = () => {
    onStart({
      city: '随机',
      gender: 'random',
      businessArea: 'random'
    });
  };
  return (
    <div className="h-[100dvh] bg-gradient-dark relative flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Animated glow orbs */}
      <div className="glow-orb glow-orb-1" />
      <div className="glow-orb glow-orb-2" />
      <div className="glow-orb glow-orb-3" />

      {/* Noise texture overlay */}
      <div className="absolute inset-0 bg-noise pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        className="text-center max-w-xl relative z-10 w-full"
      >
        {/* Year badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="inline-block mb-6 sm:mb-8"
        >
          <span className="font-mono text-xs sm:text-sm tracking-widest text-muted-foreground border border-border/50 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full backdrop-blur-sm bg-background/20">
            2025
          </span>
        </motion.div>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-foreground mb-4 sm:mb-6"
        >
          法律人年度报告生成器
        </motion.h1>

        {!showOptions ? (
          <>
            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-base sm:text-lg text-muted-foreground mb-8 sm:mb-12"
            >
              我们回顾了你这一年的使用情况
            </motion.p>

            {/* Start buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-3 justify-center items-center"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowOptions(true)}
                className="btn-primary text-sm sm:text-base px-6 py-3 sm:px-8 sm:py-4 shadow-lg shadow-primary/20 w-full sm:w-auto"
              >
                个性化设置
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSkip}
                className="text-sm sm:text-base px-6 py-3 sm:px-8 sm:py-4 border border-border/50 rounded-full bg-background/10 hover:bg-background/20 backdrop-blur-sm transition-colors w-full sm:w-auto"
              >
                直接开始
              </motion.button>
            </motion.div>
          </>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="space-y-6 sm:space-y-8"
            >
              {/* 城市选择 */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-left"
              >
                <label className="block text-sm font-medium text-foreground mb-3">
                  你在哪个城市？
                </label>
                <div className="grid grid-cols-3 gap-2 mb-2">
                  {hotCities.map((city) => (
                    <button
                      key={city}
                      onClick={() => {
                        setSelectedCity(city);
                        setShowAllCities(false);
                        setShowCustomInput(false);
                      }}
                      className={`px-3 py-2 text-xs sm:text-sm rounded-lg border transition-all ${
                        selectedCity === city
                          ? 'bg-primary text-primary-foreground border-primary'
                          : 'bg-background/20 border-border/50 hover:border-border hover:bg-background/30'
                      }`}
                    >
                      {city}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setShowAllCities(!showAllCities)}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-border/50 bg-background/20 hover:bg-background/30 transition-colors text-muted-foreground"
                >
                  {showAllCities ? '收起' : '更多城市'}
                </button>
                <AnimatePresence>
                  {showAllCities && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="grid grid-cols-3 gap-2 mt-2 overflow-hidden"
                    >
                      {availableCities
                        .filter(city => !hotCities.includes(city))
                        .map((city) => (
                          <button
                            key={city}
                            onClick={() => {
                              setSelectedCity(city);
                              setShowAllCities(false);
                              setShowCustomInput(false);
                            }}
                            className={`px-3 py-2 text-xs sm:text-sm rounded-lg border transition-all ${
                              selectedCity === city
                                ? 'bg-primary text-primary-foreground border-primary'
                                : 'bg-background/20 border-border/50 hover:border-border hover:bg-background/30'
                            }`}
                          >
                            {city}
                          </button>
                        ))}
                      <button
                        onClick={() => {
                          setSelectedCity('自己填写');
                          setShowAllCities(false);
                          setShowCustomInput(true);
                        }}
                        className={`px-3 py-2 text-xs sm:text-sm rounded-lg border transition-all ${
                          selectedCity === '自己填写'
                            ? 'bg-primary text-primary-foreground border-primary'
                            : 'bg-background/20 border-border/50 hover:border-border hover:bg-background/30'
                        }`}
                      >
                        自己填写
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
                <AnimatePresence>
                  {showCustomInput && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-2 overflow-hidden"
                    >
                      <input
                        type="text"
                        value={customCityInput}
                        onChange={(e) => setCustomCityInput(e.target.value)}
                        placeholder="输入你的城市"
                        maxLength={10}
                        className="w-full px-4 py-2 bg-background/20 border border-border/50 rounded-lg text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm"
                      />
                      <p className="mt-1.5 text-xs text-muted-foreground/60">
                        内容仍为随机生成，仅供展示
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* 性别选择 */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-left"
              >
                <label className="block text-sm font-medium text-foreground mb-3">
                  你的性别
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(() => {
                    const baseOptions = [
                      { value: 'male' as Gender, label: '男' },
                      { value: 'female' as Gender, label: '女' },
                      { value: 'random' as Gender, label: '随机' }
                    ];

                    // 成都彩蛋：添加"未知"选项
                    if (selectedCity === '成都') {
                      baseOptions.splice(2, 0, { value: 'random' as Gender, label: '未知' });
                    }

                    return baseOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setSelectedGender(option.value)}
                        className={`px-3 py-2 text-xs sm:text-sm rounded-lg border transition-all ${
                          selectedGender === option.value
                            ? 'bg-primary text-primary-foreground border-primary'
                            : 'bg-background/20 border-border/50 hover:border-border hover:bg-background/30'
                        }`}
                      >
                        {option.label}
                      </button>
                    ));
                  })()}
                </div>
              </motion.div>

              {/* 业务领域选择 */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-left"
              >
                <label className="block text-sm font-medium text-foreground mb-3">
                  你的主要业务领域
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { value: 'litigation' as BusinessArea, label: '诉讼' },
                    { value: 'non_litigation' as BusinessArea, label: '非诉' },
                    { value: 'random' as BusinessArea, label: '随机' }
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setSelectedBusinessArea(option.value)}
                      className={`px-3 py-2 text-xs sm:text-sm rounded-lg border transition-all ${
                        selectedBusinessArea === option.value
                          ? 'bg-primary text-primary-foreground border-primary'
                          : 'bg-background/20 border-border/50 hover:border-border hover:bg-background/30'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* 确认按钮 */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-3 pt-4"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleStart}
                  className="btn-primary text-sm sm:text-base px-6 py-3 sm:px-8 sm:py-4 shadow-lg shadow-primary/20 flex-1"
                >
                  生成我的年度报告
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSkip}
                  className="text-sm sm:text-base px-6 py-3 sm:px-8 sm:py-4 border border-border/50 rounded-full bg-background/10 hover:bg-background/20 backdrop-blur-sm transition-colors"
                >
                  随机生成
                </motion.button>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        )}

        {/* Bottom hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-10 sm:mt-16 text-xs text-muted-foreground/40"
        >
          {showOptions ? '选择让报告更个性化' : '点击开始 · 预计阅读时间 2 分钟'}
        </motion.p>
      </motion.div>
    </div>
  );
}
