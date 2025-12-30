// Random data generation for the lawyer annual report

const names = ['Annie', 'Alex', 'Lily', 'Kevin', 'Sophie', 'David', 'Emma', 'Michael', 'Chen', 'Wang'];

const fileNamePrefixes = [
  '尽职调查报告',
  '法律意见书',
  '合同审查意见',
  '案件分析报告',
  '股权转让协议',
  '劳动合同',
  '保密协议',
  '投资协议',
];

const fileNameSuffixes = [
  '_最终版_v6_客户确认_再改一次',
  '_终稿_已修改_再核实',
  '_定稿_v8_领导审批_客户意见',
  '_最新版_v12_务必使用这个',
  '_终版_客户确认后再改_v5',
  '_已定稿_紧急修改_最新',
];

const highFrequencyPhrases = [
  { phrase: '“这个问题我需要再核实一下”', meaning: '我现在也不确定' },
  { phrase: '“我们这边原则上是可以的”', meaning: '实操很可能不行' },
  { phrase: '“我理解您的感受”', meaning: '但规则不允许' },
  { phrase: '“这个时间节点比较紧张”', meaning: '根本做不完' },
  { phrase: '“我们会尽快处理”', meaning: '不知道什么时候' },
  { phrase: '“需要综合考虑各方面因素”', meaning: '没有标准答案' },
];

const emailSubjects = [
  '尽职调查报告',
  '法律意见书（第三稿）',
  '合同修改意见',
  '关于XX项目的初步分析',
  '补充材料清单',
  '会议纪要及后续安排',
];

export interface ReportData {
  // 12368 data
  calls12368: number;
  connectionRate: number;

  // Late night data
  latestWorkTime: string;
  latestWorkHour: number;
  latestWorkMinute: number;
  recipientName: string;
  emailSubject: string;

  // Word data
  wordDocuments: number;
  mostCommonFileName: string;

  // Phrases data
  topPhrases: typeof highFrequencyPhrases;

  // Confidence data
  confidenceStart: number;
  confidenceEnd: number;

  // Work days
  workDays: number;
  fullRestWeekends: number;
  trustInNextYear: number;
}

function randomBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomFromArray<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function generateReportData(): ReportData {
  const latestHour = randomBetween(1, 4);
  const latestMinute = randomBetween(0, 59);

  return {
    // 12368 data
    calls12368: randomBetween(240, 520),
    connectionRate: randomBetween(18, 36),

    // Late night data
    latestWorkTime: `${latestHour.toString().padStart(2, '0')}:${latestMinute.toString().padStart(2, '0')}`,
    latestWorkHour: latestHour,
    latestWorkMinute: latestMinute,
    recipientName: randomFromArray(names),
    emailSubject: randomFromArray(emailSubjects),

    // Word data
    wordDocuments: randomBetween(300, 800),
    mostCommonFileName: randomFromArray(fileNamePrefixes) + randomFromArray(fileNameSuffixes) + '.docx',

    // Phrases data
    topPhrases: shuffleArray(highFrequencyPhrases).slice(0, 3),

    // Confidence data
    confidenceStart: randomBetween(72, 85),
    confidenceEnd: randomBetween(35, 48),

    // Work days
    workDays: randomBetween(295, 335),
    fullRestWeekends: randomBetween(1, 4) + (Math.random() > 0.5 ? 0.5 : 0),
    trustInNextYear: randomBetween(8, 18),
  };
}
