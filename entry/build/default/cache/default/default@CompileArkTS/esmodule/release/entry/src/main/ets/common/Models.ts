export enum MoodType {
    PEACEFUL = "#A8D8EA",
    TIRED = "#AA96DA",
    HAPPY = "#FCBAD3",
    SAD = "#FFFFD2"
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
export interface BuildingSlot {
    slotId: number;
    buildingId: string | null;
    positionX: string;
    positionY: string;
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
    hint: '像薄雾散开的湖面',
    weather: '湖风很轻',
    fogColor: '#F7FAFA',
    landColorAlpha: '#B9D7C680',
    isCustom: false
};
export const tiredMoodOption: MoodOption = {
    id: 'tired',
    color: MoodType.TIRED,
    name: '疲惫',
    hint: '让云替你慢慢停一会儿',
    weather: '云层放慢',
    fogColor: '#F2F0FA',
    landColorAlpha: '#C9C1DC80',
    isCustom: false
};
export const happyMoodOption: MoodOption = {
    id: 'happy',
    color: MoodType.HAPPY,
    name: '开心',
    hint: '晚霞把小镇轻轻点亮',
    weather: '晚霞升起',
    fogColor: '#FFF0F5',
    landColorAlpha: '#EBC2CF80',
    isCustom: false
};
export const sadMoodOption: MoodOption = {
    id: 'sad',
    color: MoodType.SAD,
    name: '低落',
    hint: '星光会留下来陪你',
    weather: '星光停留',
    fogColor: '#FFFFF2',
    landColorAlpha: '#E2DCB480',
    isCustom: false
};
export const softMoodOption: MoodOption = {
    id: 'soft',
    color: '#D7E9C8',
    name: '松弛',
    hint: '把肩膀放下来，风会替你慢慢整理',
    weather: '草坡有风',
    fogColor: '#F6FBF0',
    landColorAlpha: '#C8DDB880',
    isCustom: false
};
export const worriedMoodOption: MoodOption = {
    id: 'worried',
    color: '#D2D7E8',
    name: '不安',
    hint: '云在聚拢，但灯还亮着',
    weather: '薄云经过',
    fogColor: '#F4F6FB',
    landColorAlpha: '#BFC7D880',
    isCustom: false
};
export const hopefulMoodOption: MoodOption = {
    id: 'hopeful',
    color: '#F4D7B8',
    name: '期待',
    hint: '远处有一扇窗，正在慢慢亮起',
    weather: '晨光将至',
    fogColor: '#FFF7EE',
    landColorAlpha: '#E7C9A980',
    isCustom: false
};
export const quietMoodOption: MoodOption = {
    id: 'quiet',
    color: '#C8DDE2',
    name: '放空',
    hint: '什么也不急，河流会自己找到方向',
    weather: '水面无声',
    fogColor: '#F0F8F8',
    landColorAlpha: '#B7CFD380',
    isCustom: false
};
export const morningCustomColor: CustomMoodColor = {
    id: 'morning',
    color: '#CDE7D8',
    fogColor: '#F3FAF4',
    landColorAlpha: '#B8D8C580',
    name: '晨雾绿'
};
export const moonCustomColor: CustomMoodColor = {
    id: 'moon',
    color: '#C9C4E8',
    fogColor: '#F5F2FF',
    landColorAlpha: '#C7C0DF80',
    name: '月影紫'
};
export const roseCustomColor: CustomMoodColor = {
    id: 'rose',
    color: '#F2C6D3',
    fogColor: '#FFF1F6',
    landColorAlpha: '#E8BCCC80',
    name: '蔷薇粉'
};
export const wheatCustomColor: CustomMoodColor = {
    id: 'wheat',
    color: '#E8D8B8',
    fogColor: '#FFF9EE',
    landColorAlpha: '#DCCAA880',
    name: '麦田金'
};
export const blueCustomColor: CustomMoodColor = {
    id: 'blue',
    color: '#BFDCE8',
    fogColor: '#F0F8FC',
    landColorAlpha: '#AECEDB80',
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
export const moodWheelIndexes: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8];
export const initialBuildingSlots: BuildingSlot[] = [
    { slotId: 1, buildingId: 'tea_house', positionX: '12%', positionY: '54%' },
    { slotId: 2, buildingId: null, positionX: '58%', positionY: '47%' },
    { slotId: 3, buildingId: null, positionX: '38%', positionY: '68%' }
];
export const polaroidPool: PolaroidCard[] = [
    {
        id: 'tea_house',
        type: 'BUILDING',
        name: '雾边茶屋',
        color: '#DDECD7',
        buildingLabel: '茶屋',
        description: '一盏温热的灯，适合把没说出口的话放一会儿。',
        isRevealed: false,
        unlockDate: ''
    },
    {
        id: 'star_post',
        type: 'BUILDING',
        name: '星光邮局',
        color: '#D8D4EC',
        buildingLabel: '邮局',
        description: '信件会在夜里发光，替你把心事寄给远方。',
        isRevealed: false,
        unlockDate: ''
    },
    {
        id: 'greenhouse',
        type: 'BUILDING',
        name: '拾光玻璃房',
        color: '#D8E8DF',
        buildingLabel: '玻璃房',
        description: '把显影后的风景轻轻收好，像保存一小片晴天。',
        isRevealed: false,
        unlockDate: ''
    },
    {
        id: 'wind_dock',
        type: 'BUILDING',
        name: '风渊渡口',
        color: '#CFE1EA',
        buildingLabel: '渡口',
        description: '纸船从这里出发，去往琉璃星海的第一段航线。',
        isRevealed: false,
        unlockDate: ''
    },
    {
        id: 'mood_tree',
        type: 'LANDSCAPE',
        name: '心境之树',
        color: '#E4E8C9',
        buildingLabel: '心树',
        description: '开心与低落都会在树下结晶，价值完全一样。',
        isRevealed: false,
        unlockDate: ''
    }
];
export function clonePolaroidCard(d: PolaroidCard, e: string): PolaroidCard {
    return {
        id: d.id,
        type: d.type,
        name: d.name,
        color: d.color,
        buildingLabel: d.buildingLabel,
        description: d.description,
        isRevealed: false,
        unlockDate: e
    };
}
export function buildCustomMood(a: string, b: CustomMoodColor): MoodOption {
    const c: string = a.length > 0 ? a : '我的天气';
    return {
        id: 'custom',
        color: b.color,
        name: c,
        hint: `${c}正在小镇里慢慢展开`,
        weather: b.name,
        fogColor: b.fogColor,
        landColorAlpha: b.landColorAlpha,
        isCustom: true
    };
}
