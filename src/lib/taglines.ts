/**
 * 作者标语库 - 那个也还在改文书的律师的各种有趣版本
 */
export const TAGLINES = [
  "那个也还在改文书的律师",
  "改文书改到怀疑人生的律师",
  "和键盘最熟的律师",
  "咖啡是燃料的律师",
  "把 Ctrl+Z 当朋友的律师",
  "周末也在想文书的律师",
  "半夜也在改的律师",
  "文书改不动也得改的律师",
  "相信这一版是终版的律师",
  "为了一个词纠结半天的律师",
  "和标点符号较劲的律师",
  "终于改完了...等等还可以更好的律师",
  "客户的终版只是我的初稿的律师",
  "把简洁当成最高追求的律师",
  "在法律和文案之间找平衡的律师",
  "每个字都要斟酌的律师",
  "用文字战斗的律师",
  "相信好文书能改变结果的律师",
  "改到天荒地老的律师",
  "还在改，是的，还在改的律师",
  "以改文书为修行的律师",
  "追求完美的律师（虽然完美不存在）",
  "每一版都是最好的版本的律师",
  "法律文书强迫症患者",
  "对「对的」执着比对更强的律师",
  "把文字当成武器的律师",
];

/**
 * 随机获取一个标语
 */
export function getRandomTagline(): string {
  const index = Math.floor(Math.random() * TAGLINES.length);
  return TAGLINES[index];
}

/**
 * 根据日期获取每日标语（每天固定）
 */
export function getDailyTagline(): string {
  const today = new Date();
  const dayOfYear = Math.floor(
    (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000
  );
  return TAGLINES[dayOfYear % TAGLINES.length];
}

/**
 * 根据用户ID获取固定标语（同一用户始终看到相同的）
 */
export function getUserTagline(userId: string): string {
  let hash = 0;
  for (let i = 0; i < userId.length; i++) {
    const char = userId.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  const index = Math.abs(hash) % TAGLINES.length;
  return TAGLINES[index];
}
