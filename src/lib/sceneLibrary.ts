// Complete scene library for the lawyer annual report

export type SceneCategory =
  | 'phone'
  | 'system_12368'
  | 'late_night'
  | 'travel'
  | 'documents'
  | 'time_disorder'
  | 'industry_jargon'
  | 'cognition_change'
  | 'identity_overflow';

export type BusinessArea = 'litigation' | 'non_litigation' | 'random';
export type Gender = 'male' | 'female' | 'random';

export interface Scene {
  id: string;
  category: SceneCategory;
  template: string;
  subtext?: string;          // 小字补充
  soulText?: string;         // 点睛句（可选）
  hasRandomNumber?: boolean; // 是否有随机数字
  numberRange?: [number, number];
  numberSuffix?: string;
  hasRandomTime?: boolean;
  hasRandomName?: boolean;
  hasRandomCity?: boolean;
  hasRandomFileName?: boolean;
  businessArea?: BusinessArea; // 业务领域限制（可选）
}

export interface SystemNarration {
  id: string;
  text: string;
}

// 收件人名字池
const names = ['Annie', 'Alex', 'Lily', 'Kevin', 'Sophie', 'David', 'Emma', 'Michael', 'Linda', 'Jason', '张律', '王总', '李总', '陈经理'];

// 城市池
const cities = ['北京', '上海', '深圳', '广州', '杭州', '成都', '苏州', '南京', '武汉', '西安', '重庆', '天津'];

// 文件名前缀
const fileNamePrefixes = [
  '尽职调查报告', '法律意见书', '合同审查意见', '案件分析报告',
  '股权转让协议', '劳动合同', '保密协议', '投资协议', '合规报告',
  '诉讼策略分析', '仲裁申请书', '答辩状', '代理词'
];

// 文件名后缀
const fileNameSuffixes = [
  '_最终版_v6_客户确认_再改一次',
  '_终稿_已修改_再核实',
  '_定稿_v8_领导审批_客户意见',
  '_最新版_v12_务必使用这个',
  '_终版_客户确认后再改_v5',
  '_已定稿_紧急修改_最新',
  '_v3_修改意见_待确认_0328',
  '_最终最终版_真的最后一次'
];

// 邮件主题
const emailSubjects = [
  '尽职调查报告', '法律意见书（第三稿）', '合同修改意见',
  '关于XX项目的初步分析', '补充材料清单', '会议纪要及后续安排',
  '紧急 - 请审阅', '回复：关于合同条款的疑问'
];

// ========== 用户选择数据 ==========

// 所有可用城市
export const availableCities = [
  '北京', '上海', '深圳', '广州', '杭州', '成都',
  '苏州', '南京', '武汉', '西安', '重庆', '天津',
  '长沙', '青岛', '大连', '厦门', '昆明', '贵阳'
];

// 城市特色内容
export const cityFeatures: Record<string, {
  drink?: string;          // 特色饮品
  food?: string;           // 特色食物
  spot?: string;           // 特色地点
  weather?: string;        // 天气特征
  transportation?: string; // 交通特色
  easterEgg?: string;      // 彩蛋
}> = {
  '北京': {
    drink: '豆汁',
    food: '烤鸭',
    spot: '三里屯',
    weather: '干燥多风',
    transportation: '堵车'
  },
  '上海': {
    drink: '咖啡',
    food: '生煎包',
    spot: '外滩',
    weather: '湿润多雨',
    transportation: '地铁'
  },
  '深圳': {
    drink: '奶茶',
    food: '早茶点心',
    spot: '深圳湾',
    weather: '温暖湿润',
    transportation: '地铁'
  },
  '广州': {
    drink: '凉茶',
    food: '早茶',
    spot: '珠江新城',
    weather: '湿热',
    transportation: '地铁'
  },
  '杭州': {
    drink: '龙井茶',
    food: '西湖醋鱼',
    spot: '西湖',
    weather: '温和',
    transportation: '共享单车'
  },
  '成都': {
    drink: '盖碗茶',
    food: '火锅',
    spot: '春熙路',
    weather: '多云雾',
    transportation: '地铁'
  },
  '苏州': {
    drink: '碧螺春',
    food: '苏式面',
    spot: '平江路',
    weather: '温和',
    transportation: '地铁',
    easterEgg: '苏州梅友机场'
  },
  '南京': {
    drink: '鸭血粉丝汤',
    food: '盐水鸭',
    spot: '夫子庙',
    weather: '四季分明',
    transportation: '地铁'
  },
  '武汉': {
    drink: '热干面配豆浆',
    food: '热干面',
    spot: '江汉路',
    weather: '火炉城市',
    transportation: '地铁'
  },
  '西安': {
    drink: '冰峰',
    food: '肉夹馍',
    spot: '大雁塔',
    weather: '干燥',
    transportation: '地铁'
  },
  '重庆': {
    drink: '老鹰茶',
    food: '小面',
    spot: '解放碑',
    weather: '湿热多雾',
    transportation: '轻轨穿楼'
  },
  '天津': {
    drink: '面茶',
    food: '煎饼果子',
    spot: '五大道',
    weather: '多风',
    transportation: '地铁'
  },
  '长沙': {
    drink: '奶茶',
    food: '臭豆腐',
    spot: '五一广场',
    weather: '湿热',
    transportation: '地铁'
  },
  '青岛': {
    drink: '啤酒',
    food: '海鲜',
    spot: '五四广场',
    weather: '海洋性',
    transportation: '地铁'
  },
  '大连': {
    drink: '海鲜粥',
    food: '海鲜',
    spot: '星海广场',
    weather: '海洋性',
    transportation: '轻轨'
  },
  '厦门': {
    drink: '铁观音',
    food: '沙茶面',
    spot: '鼓浪屿',
    weather: '温暖湿润',
    transportation: 'BRT'
  },
  '昆明': {
    drink: '普洱茶',
    food: '过桥米线',
    spot: '滇池',
    weather: '四季如春',
    transportation: '地铁'
  },
  '贵阳': {
    drink: '折耳根水',
    food: '丝娃娃',
    spot: '甲秀楼',
    weather: '凉爽',
    transportation: '地铁'
  }
};

// 业务领域相关文件名
const litigationFilePrefixes = [
  '起诉状', '答辩状', '代理词', '证据清单', '质证意见',
  '诉讼策略分析', '庭审提纲', '上诉状', '再审申请书',
  '保全申请书', '执行申请书', '管辖权异议', '回避申请书'
];

const nonLitigationFilePrefixes = [
  '尽职调查报告', '法律意见书', '合同审查意见', '股权转让协议',
  '投资协议', '合规报告', '公司章程', '股东会决议',
  '并购方案', '尽职调查清单', '交易结构设计', '法律备忘录'
];

// ========== 场景库 ==========

export const sceneLibrary: Scene[] = [
  // ===== 沟通地狱（电话/微信/邮件）=====
  {
    id: 'phone_late_calls',
    category: 'phone',
    template: '你这一年接到最多的电话\n发生在 **晚上 9:00** 以后',
    hasRandomNumber: true,
    numberRange: [156, 289],
    numberSuffix: '通',
    soulText: '有些电话\n你还没接起来\n就已经知道会聊很久'
  },
  {
    id: 'phone_simple_consult',
    category: 'phone',
    template: '通话时间最长的一次\n开头是：\n\n"我就简单咨询一下"',
    subtext: '实际通话时长：{number} 分钟',
    hasRandomNumber: true,
    numberRange: [47, 89],
    numberSuffix: ''
  },
  {
    id: 'phone_friend_said',
    category: 'phone',
    template: '你听到最多的一句话是：\n\n"我朋友说这个不复杂"',
    soulText: '你已经学会\n在心里默数三秒'
  },
  {
    id: 'phone_no_conclusion',
    category: 'phone',
    template: '有些电话你一接起来\n就已经知道\n这通不会有明确结论',
    hasRandomNumber: true,
    numberRange: [23, 67],
    numberSuffix: '通'
  },
  {
    id: 'phone_payment_prediction',
    category: 'phone',
    template: '你已经学会\n在对方说第三句话之前\n判断他会不会付费',
    subtext: '准确率约 {number}%',
    hasRandomNumber: true,
    numberRange: [78, 94],
    numberSuffix: ''
  },
  {
    id: 'phone_check_calendar',
    category: 'phone',
    template: '有几次你接起电话\n却下意识地\n先看了一眼日历',
    soulText: '你在确认\n这是不是一个\n可以说"不方便"的日子'
  },
  {
    id: 'phone_later_contact',
    category: 'phone',
    template: '你对"回头再联系"的理解\n已经非常具体',
    subtext: '通常意味着：不会再联系',
    soulText: '这不是冷漠\n这是经验'
  },
  {
    id: 'phone_wechat_unread',
    category: 'phone',
    template: '你的微信未读消息\n最高峰值达到 **{number}** 条',
    hasRandomNumber: true,
    numberRange: [99, 200],
    numberSuffix: '',
    subtext: '你已经学会选择性已读'
  },

  // ===== 12368 / 系统沟通 =====
  {
    id: 'system_12368_calls',
    category: 'system_12368',
    template: '你这一年拨打了 **{number}** 次 12368\n\n获得最多的回应是：\n「对方忙碌中，请稍后再拨」',
    hasRandomNumber: true,
    numberRange: [240, 520],
    numberSuffix: '',
    soulText: '你和 12368 的关系\n比你和很多当事人都稳定',
    businessArea: 'litigation' // 诉讼专属
  },
  {
    id: 'system_12368_hold_music',
    category: 'system_12368',
    template: '你已经记住了\n12368 的等待提示音',
    subtext: '甚至偶尔会哼出来',
    soulText: '它不回你电话\n但它至少每天都在',
    businessArea: 'litigation' // 诉讼专属
  },
  {
    id: 'system_12368_connection',
    category: 'system_12368',
    template: '年度 12368 接通率\n\n**{number}%**',
    hasRandomNumber: true,
    numberRange: [18, 36],
    numberSuffix: '',
    subtext: '系统检测到你仍然会继续拨打',
    businessArea: 'litigation' // 诉讼专属
  },
  {
    id: 'system_ddcx_calls',
    category: 'system_12368',
    template: '你这一年拨打了 **{number}** 次 12368\n\n主要用于查询案件进度',
    hasRandomNumber: true,
    numberRange: [20, 80],
    numberSuffix: '',
    soulText: '非诉律师和 12368\n基本不打交道',
    businessArea: 'non_litigation' // 非诉专属
  },
  {
    id: 'system_ddcx_rarely',
    category: 'system_12368',
    template: '你几乎不拨打 12368\n\n因为你的工作\n主要是和交易对手、监管机构打交道',
    subtext: '法院系统对你来说\n比较陌生',
    soulText: '你的战场在谈判桌\n不在法庭',
    businessArea: 'non_litigation' // 非诉专属
  },

  // ===== 深夜节点 =====
  {
    id: 'late_night_email',
    category: 'late_night',
    template: '你最晚的一次工作时间\n是 **凌晨 {time}**\n\n那天你发出了一封邮件',
    hasRandomTime: true,
    hasRandomName: true,
    soulText: '你已经不记得\n{name} 是客户、同事\n还是你的人生见证者'
  },
  {
    id: 'late_night_habit',
    category: 'late_night',
    template: '那一刻你已经不太确定\n自己是在工作\n还是在完成一种惯性',
    soulText: '有些夜晚\n不属于今天\n也不属于明天'
  },
  {
    id: 'late_night_drink',
    category: 'late_night',
    template: '你在深夜喝过最多的是\n\n**{cityDrink}**',
    subtext: '通常在加班时',
    soulText: '它让你保持清醒\n或者至少看起来清醒'
  },
  {
    id: 'late_night_delivery',
    category: 'late_night',
    template: '你在凌晨点过 **{number}** 次外卖',
    hasRandomNumber: true,
    numberRange: [12, 45],
    numberSuffix: '',
    subtext: '骑手已经认识你了'
  },
  {
    id: 'late_night_sunrise',
    category: 'late_night',
    template: '你有 **{number}** 次\n是看到日出之后才睡的',
    hasRandomNumber: true,
    numberRange: [3, 12],
    numberSuffix: '',
    soulText: '那不是熬夜\n是另一种作息'
  },

  // ===== 出差与异地 =====
  {
    id: 'travel_cities',
    category: 'travel',
    template: '你今年因为工作\n去过 **{number}** 个完全没来得及看的城市',
    hasRandomNumber: true,
    numberRange: [3, 8],
    numberSuffix: '',
    hasRandomCity: true,
    soulText: '你对城市的记忆\n主要来自：高铁站和酒店'
  },
  {
    id: 'travel_suzhou_easter_egg',
    category: 'travel',
    template: '你今年最常吐槽的是：\n\n**{easterEgg}**',
    subtext: '没有机场的苏州人\n都知道这是什么意思',
    soulText: '有些城市\n没有机场\n但有段子'
  },
  {
    id: 'travel_hotel_work',
    category: 'travel',
    template: '有一次出差\n你在酒店改文件\n改到忘了这是哪座城市',
    subtext: '窗外的风景\n你完全没注意过'
  },
  {
    id: 'travel_hotel_criteria',
    category: 'travel',
    template: '你判断一家酒店好不好\n的标准是：\n\n**网速稳不稳**',
    soulText: '五星级不重要\nWi-Fi 信号才重要'
  },
  {
    id: 'travel_landmark',
    category: 'travel',
    template: '你最熟悉的城市地标\n是打印店的位置',
    subtext: '以及 24 小时便利店'
  },
  {
    id: 'travel_photos',
    category: 'travel',
    template: '有些照片你没发朋友圈\n因为那天你太累了',
    hasRandomNumber: true,
    numberRange: [15, 45],
    numberSuffix: '张',
    soulText: '它们还在相册里\n等一个不会来的"有空"'
  },
  {
    id: 'travel_high_speed_rail',
    category: 'travel',
    template: '你今年坐了 **{number}** 趟高铁',
    hasRandomNumber: true,
    numberRange: [24, 68],
    numberSuffix: '',
    subtext: '已经能闭眼找到充电口的位置'
  },
  {
    id: 'travel_airport',
    category: 'travel',
    template: '你对机场的熟悉程度\n已经超过了家附近的商场',
    soulText: '安检员已经认识你了'
  },

  // ===== 文书/文件系统 =====
  {
    id: 'documents_word_count',
    category: 'documents',
    template: '你今年创建了 **{number}** 个 Word 文件\n\n没有任何一个\n真正是"最终版"',
    hasRandomNumber: true,
    numberRange: [300, 800],
    numberSuffix: '',
    soulText: '律师的"最终版"\n是一种精神状态\n不是文件名'
  },
  {
    id: 'documents_filename',
    category: 'documents',
    template: '你最常见的文件名是：\n\n**{filename}**',
    hasRandomFileName: true
  },
  {
    id: 'documents_outsider',
    category: 'documents',
    template: '你已经能一眼看出\n一份文件\n是不是给外行看的',
    soulText: '格式会说话'
  },
  {
    id: 'documents_one_more',
    category: 'documents',
    template: '你对"再补一个材料"的理解\n不再是数量\n而是心理准备',
    subtext: '通常意味着：再补 5-10 个'
  },
  {
    id: 'documents_track_changes',
    category: 'documents',
    template: '你开始用颜色\n区分不同版本的修改痕迹',
    subtext: '红色是客户的\n蓝色是自己的\n绿色是领导的'
  },
  {
    id: 'documents_find_file',
    category: 'documents',
    template: '你最熟练的技能之一\n是在三分钟内\n找到一份两年前的文件',
    soulText: '这不是记忆力\n是生存本能'
  },
  {
    id: 'documents_ctrl_s',
    category: 'documents',
    template: '你按 Ctrl+S 的频率\n平均每 **{number}** 秒一次',
    hasRandomNumber: true,
    numberRange: [30, 90],
    numberSuffix: '',
    subtext: '因为 Word 崩溃过'
  },
  {
    id: 'documents_pdf',
    category: 'documents',
    template: '你今年转换了 **{number}** 次 PDF',
    hasRandomNumber: true,
    numberRange: [200, 500],
    numberSuffix: '',
    subtext: '有 {ratio}% 的时候发现字体变了',
    soulText: '然后重新转一遍'
  },
  // 非诉专属文档场景
  {
    id: 'documents_dd_due_diligence',
    category: 'documents',
    template: '你最熟悉的文档类型\n是尽职调查报告',
    subtext: '你已经能闭着眼睛\n列出尽调清单的所有项目',
    soulText: '有些目录\n你背得比自己电话号码还熟',
    businessArea: 'non_litigation'
  },
  {
    id: 'documents_dd_contract_review',
    category: 'documents',
    template: '你今年审查的合同\n加起来有 **{number}** 份',
    hasRandomNumber: true,
    numberRange: [80, 200],
    numberSuffix: '',
    subtext: '每份都有\n至少3个版本',
    soulText: '你以为改完了\n客户说"再看看第12条"',
    businessArea: 'non_litigation'
  },
  {
    id: 'documents_dd_changes',
    category: 'documents',
    template: '你最怕听到的一句话：\n\n"这个条款我们再讨论一下"',
    subtext: '通常意味着\n还要再开3次会',
    soulText: '讨论不是结束\n是新一轮修改的开始',
    businessArea: 'non_litigation'
  },
  // 诉讼专属文档场景
  {
    id: 'documents_litigation_filing',
    category: 'documents',
    template: '你最熟悉的操作\n是在 deadline 当天\n提交立案材料',
    subtext: '法院的立案庭\n比你家还熟悉',
    soulText: '有些窗口的办事员\n已经认识你了',
    businessArea: 'litigation'
  },
  {
    id: 'documents_litigation_evidence',
    category: 'documents',
    template: '你今年整理的\n证据清单有 **{number}** 份',
    hasRandomNumber: true,
    numberRange: [50, 150],
    numberSuffix: '',
    subtext: '每一份都要\n编页码、做目录',
    soulText: '证据组织得好\n不一定能赢\n但不组织肯定输',
    businessArea: 'litigation'
  },

  // ===== 时间错乱 =====
  {
    id: 'time_no_weekend',
    category: 'time_disorder',
    template: '你不再区分\n工作日和周末\n\n只区分：\n**能不能回消息**',
    soulText: '日历只是参考\n不是规则'
  },
  {
    id: 'time_later',
    category: 'time_disorder',
    template: '你最常说的一句话是：\n\n"我晚点看"',
    subtext: '"晚点"的定义：不确定'
  },
  {
    id: 'time_holiday_work',
    category: 'time_disorder',
    template: '你有过\n明明在休息\n却突然开始处理工作的瞬间',
    hasRandomNumber: true,
    numberRange: [12, 35],
    numberSuffix: '次',
    soulText: '休息是一种状态\n不是一个时间段'
  },
  {
    id: 'time_off_work',
    category: 'time_disorder',
    template: '你已经不太记得\n上一次\n完整下班是什么感觉',
    subtext: '完整下班的定义：\n脑子里没有待办事项'
  },
  {
    id: 'time_deadline',
    category: 'time_disorder',
    template: '你听到"明天要"的次数\n已经多到\n不再有情绪波动',
    hasRandomNumber: true,
    numberRange: [80, 200],
    numberSuffix: '次'
  },
  {
    id: 'time_lunch',
    category: 'time_disorder',
    template: '你有 **{number}** 天\n是在下午两点之后才吃的午饭',
    hasRandomNumber: true,
    numberRange: [45, 120],
    numberSuffix: '',
    soulText: '有些时候\n午饭和晚饭合并了'
  },

  // ===== 行业语言/黑话 =====
  {
    id: 'jargon_principle',
    category: 'industry_jargon',
    template: '你已经完全听懂\n"原则上可以"\n的全部含义',
    subtext: '真实含义：实操可能不行'
  },
  {
    id: 'jargon_room',
    category: 'industry_jargon',
    template: '你知道\n哪些话\n是为了留下余地',
    soulText: '模糊不是逃避\n是专业'
  },
  {
    id: 'jargon_ambiguity',
    category: 'industry_jargon',
    template: '你学会用模糊\n对抗不确定性',
    subtext: '因为法律本身就很模糊'
  },
  {
    id: 'jargon_no_repeat',
    category: 'industry_jargon',
    template: '有些解释\n你已经不想再说第二遍',
    hasRandomNumber: true,
    numberRange: [15, 40],
    numberSuffix: '种',
    soulText: '不是不耐烦\n是累了'
  },
  {
    id: 'jargon_verify',
    category: 'industry_jargon',
    template: '"我需要再核实一下"\n\n你今年说了 **{number}** 次',
    hasRandomNumber: true,
    numberRange: [120, 300],
    numberSuffix: '',
    subtext: '真实含义：我现在也不确定'
  },
  {
    id: 'jargon_understand',
    category: 'industry_jargon',
    template: '"我理解您的感受"\n\n你今年说了 **{number}** 次',
    hasRandomNumber: true,
    numberRange: [80, 200],
    numberSuffix: '',
    subtext: '真实含义：但规则不允许'
  },

  // ===== 认知变化 =====
  {
    id: 'cognition_no_judge',
    category: 'cognition_change',
    template: '你不再轻易评价\n当事人"懂不懂法"',
    soulText: '因为很多时候\n懂不懂\n不影响结果'
  },
  {
    id: 'cognition_executable',
    category: 'cognition_change',
    template: '你开始更在意\n**可执行性**\n而不是道理本身',
    subtext: '道理赢不了官司'
  },
  {
    id: 'cognition_law_limit',
    category: 'cognition_change',
    template: '有些问题\n你已经知道\n法律解决不了',
    soulText: '但你还是会接\n因为那是工作'
  },
  {
    id: 'cognition_wont_change',
    category: 'cognition_change',
    template: '你比去年\n更清楚\n什么不会改变',
    subtext: '这不是悲观\n是清醒'
  },
  {
    id: 'cognition_confidence',
    category: 'cognition_change',
    template: '对行业前景的信心\n\n年初：**{start}%**\n年末：**{end}%**',
    hasRandomNumber: true,
    numberRange: [35, 48],
    soulText: '你不是失望\n你只是更清楚\n什么不会改变'
  },
  {
    id: 'cognition_illusion',
    category: 'cognition_change',
    template: '你这一年最大的幻觉：\n\n"这个案子结束我就轻松了"',
    subtext: '信了 {number} 次',
    hasRandomNumber: true,
    numberRange: [8, 20],
    numberSuffix: ''
  },
  {
    id: 'cognition_emotion',
    category: 'cognition_change',
    template: '你听到"就改一下"的心率反应\n\n**显著升高**',
    subtext: '尤其是周五下午 6 点之后'
  },

  // ===== 身份溢出（点睛类）=====
  {
    id: 'identity_names',
    category: 'identity_overflow',
    template: '有些名字\n你已经不记得\n是客户、同事\n还是你人生的一部分',
    hasRandomName: true,
    soulText: '工作和生活的边界\n早就模糊了'
  },
  {
    id: 'identity_case_end',
    category: 'identity_overflow',
    template: '有些案子\n你记得很清楚\n却已经不记得\n是什么时候结束的',
    soulText: '结案不是结束\n遗忘才是'
  },
  {
    id: 'identity_progress',
    category: 'identity_overflow',
    template: '有些关系\n只存在于\n工作进度里',
    subtext: '项目结束后\n就再也没联系过'
  },
  {
    id: 'identity_dream',
    category: 'identity_overflow',
    template: '你做过 **{number}** 次\n关于工作的梦',
    hasRandomNumber: true,
    numberRange: [5, 18],
    numberSuffix: '',
    soulText: '梦里还在改合同'
  },
  {
    id: 'identity_self',
    category: 'identity_overflow',
    template: '有时候你会突然想起\n自己好像\n还有别的身份',
    subtext: '但也只是想起而已'
  }
];

// ========== 系统旁白池 ==========

export const systemNarrations: SystemNarration[] = [
  { id: 'narration_1', text: '系统未读取你的隐私\n但好像什么都知道' },
  { id: 'narration_2', text: '数据为随机生成\n但你会觉得很熟悉' },
  { id: 'narration_3', text: '这不是你的全部一年\n但已经足够真实' },
  { id: 'narration_4', text: '有些内容\n不是记录\n是痕迹' },
  { id: 'narration_5', text: '这份报告\n不需要准确\n只需要真实' },
  { id: 'narration_6', text: '你看到的不是数据\n是一年的切片' },
];

// ========== 年终结论池 ==========

export interface Conclusion {
  id: string;
  mainText: string;
  subText: string;
}

export const conclusions: Conclusion[] = [
  {
    id: 'conclusion_1',
    mainText: '你没有热爱法律',
    subText: '你只是比很多人\n更能忍受复杂、模糊和不被回应'
  },
  {
    id: 'conclusion_2',
    mainText: '你不是变冷漠了',
    subText: '你只是学会了\n在情绪和规则之间选择后者'
  },
  {
    id: 'conclusion_3',
    mainText: '你没有麻木',
    subText: '你只是把敏感\n藏在了专业的外壳里'
  },
  {
    id: 'conclusion_4',
    mainText: '你不是不累',
    subText: '你只是习惯了\n把疲惫当成工作的一部分'
  },
  {
    id: 'conclusion_5',
    mainText: '你没有变强',
    subText: '你只是知道了\n哪些事不值得再期待'
  },
  {
    id: 'conclusion_6',
    mainText: '你不是无所谓',
    subText: '你只是学会了\n在失望之前降低预期'
  },
  {
    id: 'conclusion_7',
    mainText: '你没有看透一切',
    subText: '你只是比去年\n更清楚什么不会改变'
  },
  {
    id: 'conclusion_8',
    mainText: '你不是天生适合这行',
    subText: '你只是比很多人\n更能接受"没有标准答案"'
  },
  {
    id: 'conclusion_9',
    mainText: '你没有放弃理想',
    subText: '你只是把它\n放在了更安全的地方'
  },
  {
    id: 'conclusion_10',
    mainText: '你不是不在乎了',
    subText: '你只是学会了\n选择性在乎'
  },
  {
    id: 'conclusion_11',
    mainText: '你没有变得世故',
    subText: '你只是知道了\n哪些话不用再说第二遍'
  },
  {
    id: 'conclusion_12',
    mainText: '你不是失去热情',
    subText: '你只是把热情\n分配给了更值得的事'
  },
];

// ========== 工具函数 ==========

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

function generateRandomTime(): string {
  const hour = randomBetween(1, 4);
  const minute = randomBetween(0, 59);
  return `${hour}:${minute.toString().padStart(2, '0')}`;
}

function generateRandomFileName(businessArea: BusinessArea = 'random'): string {
  // 根据业务领域选择不同的文件名前缀
  let prefixes = fileNamePrefixes;

  if (businessArea === 'litigation') {
    prefixes = litigationFilePrefixes;
  } else if (businessArea === 'non_litigation') {
    prefixes = nonLitigationFilePrefixes;
  } else {
    // 随机选择
    prefixes = Math.random() > 0.5
      ? [...litigationFilePrefixes, ...nonLitigationFilePrefixes]
      : fileNamePrefixes;
  }

  const prefix = randomFromArray(prefixes);
  const suffix = randomFromArray(fileNameSuffixes);
  return `${prefix}${suffix}.docx`;
}

// ========== 场景生成器 ==========

export interface GeneratedScene {
  scene: Scene;
  randomNumber?: number;
  randomTime?: string;
  randomName?: string;
  randomCity?: string;
  randomFileName?: string;
  cityDrink?: string;        // 城市特色饮品
  cityFood?: string;         // 城市特色食物
  citySpot?: string;         // 城市特色地点
  easterEgg?: string;        // 彩蛋
  confidenceStart?: number;
  confidenceEnd?: number;
}

export interface GeneratedReport {
  scenes: GeneratedScene[];
  systemNarration: SystemNarration;
  conclusion: Conclusion;
  workDays: number;
  fullRestWeekends: number;
  trustInNextYear: number;
}

export interface UserOptions {
  city?: string;
  gender?: Gender;
  businessArea?: BusinessArea;
}

export function generateReport(userOptions?: UserOptions): GeneratedReport {
  // 解析用户选项
  const selectedCity = userOptions?.city && userOptions.city !== '随机'
    ? userOptions.city
    : randomFromArray(availableCities);

  const businessArea = userOptions?.businessArea || 'random';

  // 辅助函数：过滤适合当前业务领域的场景
  const filterScenesByBusinessArea = (scenes: Scene[]): Scene[] => {
    if (businessArea === 'random') {
      return scenes;
    }
    // 如果指定了业务领域，只返回没有限制或匹配该领域的场景
    return scenes.filter(scene =>
      !scene.businessArea || scene.businessArea === businessArea || scene.businessArea === 'random'
    );
  };

  // 必选场景类别（各选1个）
  const mustHaveCategories: SceneCategory[] = ['system_12368', 'late_night', 'documents'];

  // 可选场景类别
  const optionalCategories: SceneCategory[] = ['phone', 'travel', 'time_disorder', 'industry_jargon', 'cognition_change', 'identity_overflow'];

  const selectedScenes: GeneratedScene[] = [];

  // 从必选类别各选1个
  mustHaveCategories.forEach(category => {
    const categoryScenes = filterScenesByBusinessArea(sceneLibrary.filter(s => s.category === category));
    const scene = randomFromArray(categoryScenes);
    selectedScenes.push(generateSceneData(scene, selectedCity, businessArea));
  });

  // 从可选类别随机选4-5个（确保类别不重复）
  const shuffledOptional = shuffleArray(optionalCategories);
  const optionalCount = randomBetween(4, 5);

  for (let i = 0; i < Math.min(optionalCount, shuffledOptional.length); i++) {
    const category = shuffledOptional[i];
    const categoryScenes = filterScenesByBusinessArea(sceneLibrary.filter(s => s.category === category));

    // 苏州彩蛋：如果是苏州且选择了 travel 类别，必定显示"苏州梅友机场"彩蛋
    if (category === 'travel' && selectedCity === '苏州') {
      const easterEggScene = sceneLibrary.find(s => s.id === 'travel_suzhou_easter_egg');
      if (easterEggScene) {
        selectedScenes.push(generateSceneData(easterEggScene, selectedCity, businessArea));
        continue;
      }
    }

    const scene = randomFromArray(categoryScenes);
    selectedScenes.push(generateSceneData(scene, selectedCity, businessArea));
  }

  // 打乱顺序（但保持12368在前面）
  const first = selectedScenes[0];
  const rest = shuffleArray(selectedScenes.slice(1));

  // 随机选择一个年终结论
  const conclusion = randomFromArray(conclusions);

  return {
    scenes: [first, ...rest],
    systemNarration: randomFromArray(systemNarrations),
    conclusion,
    workDays: randomBetween(295, 335),
    fullRestWeekends: randomBetween(1, 4) + (Math.random() > 0.5 ? 0.5 : 0),
    trustInNextYear: randomBetween(8, 18),
  };
}

function generateSceneData(
  scene: Scene,
  city: string,
  businessArea: BusinessArea
): GeneratedScene {
  const generated: GeneratedScene = { scene };

  if (scene.hasRandomNumber && scene.numberRange) {
    generated.randomNumber = randomBetween(scene.numberRange[0], scene.numberRange[1]);
  }

  if (scene.hasRandomTime) {
    generated.randomTime = generateRandomTime();
  }

  if (scene.hasRandomName) {
    generated.randomName = randomFromArray(names);
  }

  if (scene.hasRandomCity) {
    // 使用传入的城市参数
    generated.randomCity = city;
  }

  if (scene.hasRandomFileName) {
    generated.randomFileName = generateRandomFileName(businessArea);
  }

  // 添加城市特色内容
  const cityFeature = cityFeatures[city];
  if (cityFeature) {
    // 根据场景 ID 决定添加哪些城市特色
    if (scene.id === 'late_night_drink' && cityFeature.drink) {
      generated.cityDrink = cityFeature.drink;
    }
    if (scene.template.includes('{cityFood}') && cityFeature.food) {
      generated.cityFood = cityFeature.food;
    }
    if (scene.template.includes('{citySpot}') && cityFeature.spot) {
      generated.citySpot = cityFeature.spot;
    }
    // 彩蛋支持
    if (scene.template.includes('{easterEgg}') && cityFeature.easterEgg) {
      generated.easterEgg = cityFeature.easterEgg;
    }
  }

  if (scene.id === 'cognition_confidence') {
    generated.confidenceStart = randomBetween(72, 85);
    generated.confidenceEnd = randomBetween(35, 48);
  }

  return generated;
}

// 格式化场景文本
export function formatSceneText(generated: GeneratedScene): string {
  let text = generated.scene.template;

  if (generated.randomNumber !== undefined) {
    text = text.replace('{number}', generated.randomNumber.toString());
  }

  if (generated.randomTime) {
    text = text.replace('{time}', generated.randomTime);
  }

  if (generated.randomName) {
    text = text.replace('{name}', generated.randomName);
  }

  if (generated.randomCity) {
    text = text.replace('{city}', generated.randomCity);
  }

  if (generated.randomFileName) {
    text = text.replace('{filename}', generated.randomFileName);
  }

  if (generated.cityDrink) {
    text = text.replace('{cityDrink}', generated.cityDrink);
  }

  if (generated.cityFood) {
    text = text.replace('{cityFood}', generated.cityFood);
  }

  if (generated.citySpot) {
    text = text.replace('{citySpot}', generated.citySpot);
  }

  if (generated.easterEgg) {
    text = text.replace('{easterEgg}', generated.easterEgg);
  }

  if (generated.confidenceStart !== undefined && generated.confidenceEnd !== undefined) {
    text = text.replace('{start}', generated.confidenceStart.toString());
    text = text.replace('{end}', generated.confidenceEnd.toString());
  }

  return text;
}

export function formatSubtext(generated: GeneratedScene): string | undefined {
  if (!generated.scene.subtext) return undefined;
  
  let text = generated.scene.subtext;
  
  if (generated.randomNumber !== undefined) {
    text = text.replace('{number}', generated.randomNumber.toString());
    text = text.replace('{ratio}', randomBetween(30, 60).toString());
  }
  
  return text;
}

export function formatSoulText(generated: GeneratedScene): string | undefined {
  if (!generated.scene.soulText) return undefined;
  
  let text = generated.scene.soulText;
  
  if (generated.randomName) {
    text = text.replace('{name}', generated.randomName);
  }
  
  return text;
}

// 获取场景图标
export function getSceneIcon(category: SceneCategory): string {
  const icons: Record<SceneCategory, string> = {
    phone: '📞',
    system_12368: '📱',
    late_night: '🌙',
    travel: '✈️',
    documents: '📄',
    time_disorder: '⏰',
    industry_jargon: '💬',
    cognition_change: '🧠',
    identity_overflow: '👤',
  };
  return icons[category];
}

// 获取场景类别名称
export function getCategoryName(category: SceneCategory): string {
  const names: Record<SceneCategory, string> = {
    phone: '沟通记录',
    system_12368: '系统通讯',
    late_night: '深夜时刻',
    travel: '差旅数据',
    documents: '文档统计',
    time_disorder: '时间感知',
    industry_jargon: '行业语言',
    cognition_change: '认知变化',
    identity_overflow: '身份边界',
  };
  return names[category];
}
