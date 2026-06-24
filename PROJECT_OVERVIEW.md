# DreamJourney（梦想之旅）项目说明

## 1. 项目定位

DreamJourney 是一款面向内向者和情绪敏感用户的治愈系放置探索应用。它不是传统意义上追求数值成长、竞争排名或高压任务的游戏，而是一个可以被轻轻打开的数字避风港。

核心体验围绕三件事展开：

- 记录今天的心情，让世界根据情绪颜色被点亮。
- 用情绪结晶显影拍立得，逐步收集小镇建筑与梦境记忆。
- 通过旅行、信笺、心愿便笺和桌面化体验，把情绪记录延伸到更温柔的日常里。

应用视觉方向为水彩绘本、低饱和莫兰迪色、柔和光晕和半透明毛玻璃材质。交互上强调手势、缓慢动效和轻反馈，避免工业感强的系统默认按钮。

## 2. 当前核心功能

### 2.1 小镇主界面

入口页面由 `Index.ets` 统一调度状态，并根据当前页签切换不同模块。小镇页面负责承载情绪状态、建筑放置、心愿便笺、纸条入口和拍立得后的回流。

相关文件：

- `entry/src/main/ets/pages/Index.ets`
- `entry/src/main/ets/components/TownScene.ets`
- `entry/src/main/ets/common/Models.ets`

当前小镇功能包括：

- 根据心情颜色改变背景氛围。
- 展示心境之树、玻璃房、邮局、茶屋、渡口等核心建筑资产。
- 支持拍立得显影后返回小镇放置建筑。
- 心境之树提供“心愿便笺”和“纸条”入口。
- 底部使用柔和玻璃态页签，在小镇、心情日历、玻璃房、显影、旅行之间切换。

### 2.2 心情记录与心情日历

心情记录由 `MoodPalette.ets` 承载，支持选择预设心情色块，也支持自定义心情文字。用户记录后会获得情绪结晶，并生成当天的心情日记。

心情日历由 `MoodCalendar.ets` 承载，目标是让用户回看以往的情绪轨迹，而不是只看单次记录。

已实现/设计中的日历能力：

- 月度色谱：用每天的心情色彩组成一个月的情绪图谱。
- 连续记录：统计并展示连续记录天数，鼓励温和坚持。
- 匿名信件回访：用“回访一句话”的方式，让用户看到曾经被寄出或收到的柔软文字。

相关文件：

- `entry/src/main/ets/components/MoodPalette.ets`
- `entry/src/main/ets/components/MoodCalendar.ets`
- `entry/src/main/ets/common/Models.ets`

### 2.3 拍立得显影与玻璃房收藏

拍立得模块由 `PolaroidGacha.ets` 实现。用户消耗情绪结晶抽取一张未显影的拍立得，通过长按或滑动让图片逐渐显现。显影后的卡片会进入玻璃房收藏，也可以回到小镇放置建筑。

玻璃房由 `GreenhouseGallery.ets` 承载，是拍立得图鉴和故事空间。它不是单纯的卡片列表，而是每张卡片对应一个可进入的小叙事空间。

当前卡片方向：

- 茶屋：了解茶的故事，体验抹茶慢慢打出泡沫的过程。
- 星光邮局：承载匿名信件、纸条和未来的设备流转入口。
- 拾光玻璃房：保存显影后的风景和回忆。
- 风渊渡口：连接 Wonderland 旅行玩法。
- 心境之树：承接心愿便笺与情绪结晶的象征表达。

相关文件：

- `entry/src/main/ets/components/PolaroidGacha.ets`
- `entry/src/main/ets/components/GreenhouseGallery.ets`
- `entry/src/main/ets/common/Models.ets`

### 2.4 Wonderland 旅行模块

旅行模块由 `JourneyMap.ets` 实现，目前目的地为“琉璃星海”。它承担项目名称 DreamJourney 中“Journey”的核心意义：用户不是只在小镇里停留，还可以让纸船离岸，进入一段短而无失败惩罚的梦境旅行。

当前玩法包括：

- 消耗 1 枚情绪结晶启航。
- 在旅行画面中轻触梦境节点。
- 节点包括漂流瓶、发光水母、影子小人。
- 不同节点有不同互动次数和反馈。
- 完成节点后获得星尘与旅行札记。

已加入的互动表现：

- 发光水母：点击后出现扫过水面的光束，节点产生柔和光晕。
- 影子小人：点击后鱼线拉长，并出现“钓起星星”的动画。
- 纸船旅行：通过视觉场景、节点路线和札记文字，形成轻探索体验。

相关文件：

- `entry/src/main/ets/components/JourneyMap.ets`
- `entry/src/main/resources/base/media/bg_journey_phone.png`
- `entry/src/main/resources/base/media/bg_journey_tablet_landscape.png`
- `entry/src/main/resources/base/media/journey_node_bottle.png`
- `entry/src/main/resources/base/media/journey_node_jellyfish.png`
- `entry/src/main/resources/base/media/journey_node_shadow.png`

### 2.5 信笺与文件流转功能

DreamJourney 的文件流转功能设计为“情绪包裹”的形式，而不是传统文件列表。用户可以把一张心情纸条、匿名信笺或拍立得卡片打包成一个可流转的小包裹，在两台设备靠近时进行传递。

当前已实现的是“流转交互层”：

- 在心情广场纸条界面中，纸条可以被手指向右滑动。
- 当滑动超过阈值时，纸条会折成纸飞机并飞出。
- 飞出动画用于表达“正在寄往附近的小镇”。
- 页面会记录本次寄出的流转包数量。

相关状态位于 `Index.ets`：

- `transferOffsetX`：纸条横向拖拽距离。
- `transferFlyX` / `transferFlyY`：纸条飞出位移。
- `transferFoldScale`：折叠缩放比例。
- `transferPlaneTilt`：飞出时的旋转角度。
- `isTransferFlying`：是否正在执行飞行动画。
- `sentPackageCount`：已寄出的流转包数量。

未来可接入鸿蒙多设备能力，让这套交互动效真正连接设备间传输：

- 使用分布式能力发现附近设备。
- 将纸条、拍立得 ID、解锁时间、心情颜色等序列化为轻量 JSON 包。
- 通过系统流转能力或近场能力发送给另一台设备。
- 对方设备收到后，在小镇里以“漂来的纸飞机 / 千纸鹤 / 信笺”的形式出现。

建议的流转数据结构：

```ts
interface TransferPackage {
  id: string;
  type: 'NOTE' | 'POLAROID' | 'MOOD_LETTER';
  title: string;
  payload: string;
  moodColor: string;
  createTime: string;
}
```

设计目标不是“传文件”，而是“把情绪轻轻递给另一个小镇”。因此 UI 表达优先使用纸飞机、千纸鹤、漂流瓶、星光邮戳等梦境意象。

## 3. 技术架构

### 3.1 总体结构

项目采用 HarmonyOS Stage 模型，使用 ArkTS + ArkUI 声明式开发。

核心目录：

```text
entry/src/main/ets
├─ pages
│  └─ Index.ets                 # 应用主入口，负责状态、持久化、页签和模块切换
├─ components
│  ├─ WindowWiper.ets            # 初始擦窗/雾气交互
│  ├─ MoodPalette.ets            # 心情选择与自定义心情
│  ├─ MoodCalendar.ets           # 心情日历、月度色谱、连续记录
│  ├─ TownScene.ets              # 小镇场景与建筑槽位
│  ├─ PolaroidGacha.ets          # 拍立得抽取和显影
│  ├─ GreenhouseGallery.ets      # 玻璃房收藏与卡片故事
│  └─ JourneyMap.ets             # Wonderland 旅行玩法
├─ common
│  └─ Models.ets                 # 数据模型、卡池、心情配置、文案池
└─ entryability
   └─ EntryAbility.ts            # Stage 模型入口 Ability
```

### 3.2 状态管理

项目主要使用 ArkUI 状态装饰器完成页面联动：

- `@State`：组件内部状态，例如当前心情、当前页签、显影状态、旅行节点进度。
- `@Prop`：父组件向子组件传递只读数据，例如 `isCompact`、`isWide`、当前心情。
- `@Link`：父子组件双向绑定，例如情绪结晶数量、建筑槽位、待放置卡片。
- `@Watch`：监听状态变化后自动持久化，例如心情日记、收藏卡片、心愿便笺、建筑槽位。

### 3.3 数据模型

核心模型集中在 `Models.ets`：

- `MoodOption`：心情颜色、天气文案、雾气颜色、世界叠色。
- `PolaroidCard`：拍立得卡片，包含类型、名称、资源、描述、显影状态。
- `CollectedCard`：已收集卡片。
- `BuildingSlot`：小镇固定构图槽位。
- `MoodDiaryEntry`：心情日记记录。
- `WishNote`：心愿便笺。
- `JourneyState`：旅行和结晶相关状态预留。

### 3.4 本地持久化

`Index.ets` 使用 `@ohos.data.preferences` 进行轻量持久化，保存内容包括：

- 心情日记列表。
- 已收藏拍立得。
- 小镇建筑槽位。
- 心愿便笺。

这种方式适合 MVP 阶段，数据规模小、读写简单。后续如果需要更复杂的数据查询，可以迁移到关系型数据库或统一的数据仓库层。

## 4. 大小屏适应

DreamJourney 当前采用“一次开发，多端适配”的响应式策略。

入口组件 `Index.ets` 使用 `@ohos.mediaquery` 判断屏幕宽度：

- `isCompact`：宽度小于等于 `480vp`，主要面向手机竖屏。
- `isWide`：宽度大于等于 `840vp`，主要面向平板、折叠屏展开态或横屏。

适配方式包括：

- 根据 `isCompact` 和 `isWide` 调整字号、间距、卡片宽度和弹层高度。
- 小屏使用更紧凑的底部页签和更高的弹层避让。
- 大屏限制内容最大宽度，避免 UI 被拉得过散。
- 旅行模块根据屏幕类型切换竖版或横版背景图资源。
- 小镇建筑槽位使用百分比定位，使构图能跟随画布缩放。

典型适配代码位置：

- `Index.ets`：全局媒体查询、页签位置、弹层宽度。
- `TownScene.ets`：建筑槽位大小和位置。
- `MoodPalette.ets`：心情色块网格和弹窗宽度。
- `MoodCalendar.ets`：日历格尺寸和面板宽度。
- `JourneyMap.ets`：旅行背景资源、节点位置、卡片尺寸。

适配目标：

- 手机竖屏：优先保证第一屏清爽、按钮不重叠、底部页签不遮挡内容。
- 平板/横屏：优先保证画面完整、场景更沉浸、主要内容居中但不过度放大。
- 折叠屏：通过宽度断点在紧凑布局和宽屏布局之间自然切换。

## 5. 视觉与交互规范

项目遵循以下设计约束：

- 避免系统默认硬边界按钮，优先使用 `Text` / `Image` / `Column` 自定义柔和按钮。
- 大量使用 `Stack` 叠加背景、雾气、光晕、卡片和交互层。
- 弹层使用半透明背景、圆角和 `backdropBlur` 做毛玻璃质感。
- 所有状态切换尽量使用 `.animation()`，曲线优先选择 `Curve.EaseOut` 或 `Curve.FastOutSlowIn`。
- 色彩使用低饱和、高明度的水彩色，避免刺眼高饱和黄色。
- 交互优先使用拖拽、滑动、长按等手势，点击只用于必要的轻操作。

## 6. 后续完善方向

优先级建议如下：

1. 接入真实多设备流转能力  
   在现有“纸条折成纸飞机飞出”的交互层后，接入鸿蒙分布式能力，实现两台设备之间传递信笺、纸条和拍立得卡片。

2. 完善旅行玩法  
   将漂流瓶、水母、影子小人升级为更完整的小互动，例如拖动光束、等待垂钓、打开漂流瓶阅读信件、收集星尘兑换动态拍立得。

3. 优化底部页签  
   当前页签已经从普通按钮改为玻璃态导航，但仍可继续做成“浮岛码头”或“纸船航线”式导航，让导航本身也成为世界观的一部分。

4. 增强玻璃房内容  
   为每张卡片增加独立小体验，例如茶屋抹茶工艺、邮局寄信、玻璃房植物养护、渡口启航、心境之树结晶回看。

5. 加入桌面万能卡片  
   读取最近一次心情颜色和当天心情短句，在桌面上展示一个 2x2 的微型情绪小镇。

## 7. 当前 MVP 闭环

当前工程已经形成一个可验证的 MVP 闭环：

```text
擦亮今天
  -> 选择心情并写一句话
  -> 获得情绪结晶
  -> 消耗结晶显影拍立得
  -> 收集到玻璃房 / 回小镇放置建筑
  -> 从小镇进入心情日历、纸条、心愿便笺和 Wonderland 旅行
```

这条闭环已经能够表达 DreamJourney 的核心：玩家不是为了赢，而是为了让今天被温柔地接住。
