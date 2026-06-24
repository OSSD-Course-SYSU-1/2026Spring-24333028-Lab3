export enum MoodType {
  PEACEFUL = '#A8D8EA',
  TIRED = '#AA96DA',
  HAPPY = '#FCBAD3',
  SAD = '#FFFFD2'
}

export interface MoodOption {
  id: string;
  color: string;
  name: string;
  hint: string;
  weather: string;
  fogColor: string;
  landColorAlpha: string;
  isCustom: boolean;
}

export interface CustomMoodColor {
  id: string;
  color: string;
  fogColor: string;
  landColorAlpha: string;
  name: string;
}

export interface PolaroidCard {
  id: string;
  type: 'BUILDING' | 'LANDSCAPE' | 'ITEM';
  name: string;
  imageRes?: Resource;
  color: string;
  buildingLabel: string;
  description: string;
  isRevealed: boolean;
  unlockDate: string;
}

export interface CollectedCard {
  cardId: string;
  unlockDate: string;
}

export interface BuildingSlot {
  slotId: number;
  buildingId: string | null;
  positionX: string;
  positionY: string;
}

export interface MoodDiaryEntry {
  dateKey: string;
  dayText: string;
  moodId: string;
  moodName: string;
  moodColor: string;
  weather: string;
  note: string;
}

export interface WishNote {
  id: string;
  text: string;
  createDate: string;
}

export interface JourneyState {
  crystals: number;
  hasMoodRewardedToday: boolean;
  currentCardId: string;
  pendingPlacementCardId: string;
}

export const peacefulMoodOption: MoodOption = {
  id: 'peaceful',
  color: MoodType.PEACEFUL,
  name: '宁静',
  hint: '像薄雾散开的湖面，今天可以慢一点。',
  weather: '湖风很轻',
  fogColor: '#F4FAFB',
  landColorAlpha: '#88D8EADF',
  isCustom: false
};

export const tiredMoodOption: MoodOption = {
  id: 'tired',
  color: MoodType.TIRED,
  name: '疲惫',
  hint: '让云替你把今天放软一点。',
  weather: '云层放慢',
  fogColor: '#F5F1FB',
  landColorAlpha: '#88DDD7EA',
  isCustom: false
};

export const happyMoodOption: MoodOption = {
  id: 'happy',
  color: MoodType.HAPPY,
  name: '开心',
  hint: '晚霞正在悄悄把小镇点亮。',
  weather: '晚霞升起',
  fogColor: '#FFF1F7',
  landColorAlpha: '#88F0D5E0',
  isCustom: false
};

export const sadMoodOption: MoodOption = {
  id: 'sad',
  color: MoodType.SAD,
  name: '低落',
  hint: '星光会留下来，陪你安静一会儿。',
  weather: '星光停留',
  fogColor: '#FFFDF2',
  landColorAlpha: '#88ECE5BE',
  isCustom: false
};

export const softMoodOption: MoodOption = {
  id: 'soft',
  color: '#D7E9C8',
  name: '松弛',
  hint: '把肩膀轻轻放下，风会替你整理情绪。',
  weather: '草坡有风',
  fogColor: '#F6FBF2',
  landColorAlpha: '#88D5E7C7',
  isCustom: false
};

export const worriedMoodOption: MoodOption = {
  id: 'worried',
  color: '#D2D7E8',
  name: '不安',
  hint: '云在聚拢，但灯还在亮着。',
  weather: '薄云经过',
  fogColor: '#F4F7FC',
  landColorAlpha: '#88D4DBEA',
  isCustom: false
};

export const hopefulMoodOption: MoodOption = {
  id: 'hopeful',
  color: '#F4D7B8',
  name: '期待',
  hint: '远处的窗，正在一点点亮起来。',
  weather: '晨光将至',
  fogColor: '#FFF8EF',
  landColorAlpha: '#88F1DDBE',
  isCustom: false
};

export const quietMoodOption: MoodOption = {
  id: 'quiet',
  color: '#C8DDE2',
  name: '放空',
  hint: '什么也不用急，水面会自己变平静。',
  weather: '水面无声',
  fogColor: '#F2F9FA',
  landColorAlpha: '#88D1E4E8',
  isCustom: false
};

export const morningCustomColor: CustomMoodColor = {
  id: 'morning',
  color: '#CDE7D8',
  fogColor: '#F3FAF4',
  landColorAlpha: '#88D4EBDD',
  name: '晨雾绿'
};

export const moonCustomColor: CustomMoodColor = {
  id: 'moon',
  color: '#C9C4E8',
  fogColor: '#F4F2FD',
  landColorAlpha: '#88D8D3F0',
  name: '月影紫'
};

export const roseCustomColor: CustomMoodColor = {
  id: 'rose',
  color: '#F2C6D3',
  fogColor: '#FFF1F6',
  landColorAlpha: '#88F0D3DE',
  name: '蔷薇粉'
};

export const wheatCustomColor: CustomMoodColor = {
  id: 'wheat',
  color: '#E8D8B8',
  fogColor: '#FFF9EE',
  landColorAlpha: '#88EEDFBF',
  name: '麦田金'
};

export const blueCustomColor: CustomMoodColor = {
  id: 'blue',
  color: '#BFDCE8',
  fogColor: '#F1F9FC',
  landColorAlpha: '#88D0E8F0',
  name: '浅海蓝'
};

export const customMoodColors: CustomMoodColor[] = [
  morningCustomColor,
  moonCustomColor,
  roseCustomColor,
  wheatCustomColor,
  blueCustomColor
];

export const moodOptions: MoodOption[] = [
  peacefulMoodOption,
  tiredMoodOption,
  happyMoodOption,
  sadMoodOption,
  softMoodOption,
  worriedMoodOption,
  hopefulMoodOption,
  quietMoodOption
];

export const seedMoodDiaryEntries: MoodDiaryEntry[] = [
  {
    dateKey: '2026-06-18',
    dayText: '6月18日',
    moodId: 'quiet',
    moodName: '放空',
    moodColor: quietMoodOption.color,
    weather: quietMoodOption.weather,
    note: '把很多事先放在风里。'
  },
  {
    dateKey: '2026-06-19',
    dayText: '6月19日',
    moodId: 'tired',
    moodName: '疲惫',
    moodColor: tiredMoodOption.color,
    weather: tiredMoodOption.weather,
    note: '今天需要一盏小灯。'
  },
  {
    dateKey: '2026-06-21',
    dayText: '6月21日',
    moodId: 'hopeful',
    moodName: '期待',
    moodColor: hopefulMoodOption.color,
    weather: hopefulMoodOption.weather,
    note: '远处好像有一点亮。'
  }
];

export const initialBuildingSlots: BuildingSlot[] = [
  { slotId: 1, buildingId: 'tea_house', positionX: '16%', positionY: '66%' },
  { slotId: 2, buildingId: null, positionX: '66%', positionY: '66%' },
  { slotId: 3, buildingId: null, positionX: '82%', positionY: '75%' }
];

export const polaroidPool: PolaroidCard[] = [
  {
    id: 'tea_house',
    type: 'BUILDING',
    name: '雾边茶屋',
    color: '#F2E4D2',
    buildingLabel: '茶屋',
    description: '一盏暖灯，适合把没说出口的话先安放下来。',
    isRevealed: false,
    unlockDate: ''
  },
  {
    id: 'star_post',
    type: 'BUILDING',
    name: '星光邮局',
    color: '#D9DCEC',
    buildingLabel: '邮局',
    description: '写不完的心事，会被温柔地寄往更远的地方。',
    isRevealed: false,
    unlockDate: ''
  },
  {
    id: 'greenhouse',
    type: 'BUILDING',
    name: '拾光玻璃房',
    color: '#D6EFD9',
    buildingLabel: '玻璃房',
    description: '把显影后的风景收藏起来，像留住一小片晴天。',
    isRevealed: false,
    unlockDate: ''
  },
  {
    id: 'wind_dock',
    type: 'BUILDING',
    name: '风渊渡口',
    color: '#D7E5F0',
    buildingLabel: '渡口',
    description: '纸船会从这里出发，去往更远的梦境海面。',
    isRevealed: false,
    unlockDate: ''
  },
  {
    id: 'mood_tree',
    type: 'LANDSCAPE',
    name: '心境之树',
    color: '#E6F0D1',
    buildingLabel: '心树',
    description: '所有真实的情绪，都会在树下长成同样珍贵的微光。',
    isRevealed: false,
    unlockDate: ''
  }
];

export const plazaQuotes: string[] = [
  '你不必把今天过得很用力，能安静抵达夜晚，也是一种了不起。',
  '云会替山停一会儿，风也会替你轻轻翻页。',
  '如果暂时没有答案，就先把自己照顾好。',
  '低落不是失败，它只是心里正在下小雨。',
  '愿你在无人看见的地方，也能被自己的温柔接住。',
  '有些光不是突然到来，而是一点点学会停在你身边。',
  '今天没有盛大地变好也没关系，微小的松动也算数。',
  '你可以慢一点，世界不会因为你停下来呼吸就把你落下。',
  '把心里的褶皱摊开晒一晒，风会帮你带走一点沉重。',
  '如果今天只完成了起床、吃饭、撑过去，那也已经很好。',
  '不要急着证明自己，先把自己安稳地放回身体里。',
  '雨天也有自己的秩序，它只是把脚步声放得更轻。',
  '你已经走了很远，只是有时候累会让远方看起来像原地。',
  '愿你把不被理解的那部分，也轻轻留给自己爱护。',
  '今晚可以不总结人生，只总结一杯热水和一盏灯。',
  '有些答案会晚一点抵达，在那之前，你先不用责怪自己。',
  '心软不是缺点，它只是说明你还愿意和世界保持联系。',
  '别把一时的沉默误会成退步，那可能是心正在修复。',
  '你不需要一直明亮，偶尔成为一片安静的云也很好。',
  '把今天过小一点，过稳一点，也是一种很珍贵的能力。',
  '真正的休息不是浪费时间，是给明天留一条温柔的路。',
  '你可以先不勇敢，先诚实地承认自己有点累。',
  '愿你被允许慢慢来，也被允许重新开始很多次。',
  '当你觉得自己不够好时，请记得你不是一个任务清单。',
  '有些花不是不开，只是在等一场更适合自己的雨。',
  '你身上的柔软，不需要变硬才值得被尊重。',
  '今天的你已经很努力了，哪怕努力只是没有放弃自己。',
  '请把一点点宽容留给此刻的自己，它也走了很久的路。',
  '星星不会催促夜晚结束，温柔的人也不必催促自己。',
  '如果心里很乱，就先整理一小块桌面，给自己一个入口。',
  '愿你在普通的一天里，也能捡到一粒很小的光。',
  '没有人能一直稳定，摇晃也可以是生命正在寻找平衡。',
  '你可以把难过放在旁边，不必马上把它解释清楚。',
  '今天先成为自己的避风港，明天再慢慢去看海。',
  '请相信，安静地恢复也是一种向前。',
  '世界很大，但你只需要先照顾好眼前这一小步。',
  '愿你在风很轻的地方，重新听见自己的心跳。'
];

export const teaStoryLines: string[] = [
  '茶屋收留的是没有说完的话。水烧开以后，心事会先变轻一点。',
  '抹茶的绿色来自被遮阴养护的茶叶，像把阳光慢慢藏进叶脉。',
  '制作抹茶时，茶粉、温水和茶筅会一起打出细密泡沫。不是为了完美，而是为了让手慢下来。'
];

export const postcardStoryLines: string[] = [
  '星光邮局负责把不敢说出口的句子寄给远方。',
  '每一封匿名信都不会要求回复，它只是在某个夜晚轻轻亮一下。',
  '如果你愿意，也可以把一句祝福投进邮筒，留给下一个路过的人。'
];

export const greenhouseStoryLines: string[] = [
  '拾光玻璃房保存显影后的风景，也保存你慢慢恢复的证据。',
  '发光植物喜欢安静的日子，它们会在无人催促的时候长出新叶。',
  '这里适合整理拍立得、回看月度色谱，也适合什么都不做。'
];

export const dockStoryLines: string[] = [
  '风渊渡口通向 Wonderland。纸船不会赶路，它只顺着风慢慢出发。',
  '你可以把一枚情绪结晶放进船舱，换一段很短的梦境航行。',
  '远处也许会遇见漂流瓶、发光水母，或者一只从星海路过的鲸。'
];

export const moodTreeStoryLines: string[] = [
  '心境之树不评判天气。晴天会结晶，雨天也会长出微光。',
  '它记得每一次被你认真命名的心情。',
  '当你写下心愿，树叶会替你把它轻轻挂住。'
];

export function clonePolaroidCard(card: PolaroidCard, unlockDate: string): PolaroidCard {
  return {
    id: card.id,
    type: card.type,
    name: card.name,
    imageRes: getBuildingAsset(card.id),
    color: card.color,
    buildingLabel: card.buildingLabel,
    description: card.description,
    isRevealed: false,
    unlockDate: unlockDate
  };
}

export function buildCustomMood(name: string, colorOption: CustomMoodColor): MoodOption {
  const moodName: string = name.trim().length > 0 ? name.trim() : '我的天气';
  return {
    id: 'custom',
    color: colorOption.color,
    name: moodName,
    hint: `${moodName}正在小镇里慢慢展开。`,
    weather: colorOption.name,
    fogColor: colorOption.fogColor,
    landColorAlpha: colorOption.landColorAlpha,
    isCustom: true
  };
}

export function getBuildingLabel(buildingId: string | null): string {
  if (buildingId === 'tea_house') {
    return '茶屋';
  }
  if (buildingId === 'star_post') {
    return '邮局';
  }
  if (buildingId === 'greenhouse') {
    return '玻璃房';
  }
  if (buildingId === 'wind_dock') {
    return '渡口';
  }
  if (buildingId === 'mood_tree') {
    return '心树';
  }
  return '小屋';
}

export function getBuildingAsset(buildingId: string | null): Resource | undefined {
  if (buildingId === 'tea_house') {
    return $r('app.media.tea_house');
  }
  if (buildingId === 'star_post') {
    return $r('app.media.post_office');
  }
  if (buildingId === 'greenhouse') {
    return $r('app.media.greenhouse');
  }
  if (buildingId === 'wind_dock') {
    return $r('app.media.wind_dock');
  }
  if (buildingId === 'mood_tree') {
    return $r('app.media.mood_tree');
  }
  return undefined;
}
