import { MoodOption, peacefulMoodOption } from '../common/Models';

interface DreamJourneyNode {
  id: string;
  name: string;
  hint: string;
  color: string;
  rewardText: string;
}

const dreamNodes: DreamJourneyNode[] = [
  {
    id: 'bottle',
    name: '漂流瓶',
    hint: '里面有一封被海风晒软的信。',
    color: '#D7E5F0',
    rewardText: '瓶里的纸条写着：今天不用急着抵达，先让自己漂一会儿。'
  },
  {
    id: 'jellyfish',
    name: '发光水母',
    hint: '它们像很小的月亮，慢慢游过水面。',
    color: '#C9C4E8',
    rewardText: '水母把海面照亮了一寸，你获得了一点安静的勇气。'
  },
  {
    id: 'shadow',
    name: '影子小人',
    hint: '静静等它三秒，它会钓上一颗星。',
    color: '#E8D8B8',
    rewardText: '影子小人为你钓到一颗星：愿你今晚被温柔地梦见。'
  }
];

@Component
struct JourneyNodeCard {
  @Prop node: DreamJourneyNode;
  @Prop selectedNodeId: string = '';
  @Prop visited: boolean = false;
  @Prop isEnabled: boolean = false;
  @Prop isCompact: boolean = false;

  private getNodeImageResource(): Resource {
    if (this.node.id === 'bottle') {
      return $r('app.media.journey_node_bottle');
    }
    if (this.node.id === 'jellyfish') {
      return $r('app.media.journey_node_jellyfish');
    }
    return $r('app.media.journey_node_shadow');
  }

  build() {
    Column() {
      Image(this.getNodeImageResource())
        .width(this.isCompact ? 52 : 62)
        .height(this.isCompact ? 52 : 62)
        .objectFit(ImageFit.Contain)
        .borderRadius(this.isCompact ? 20 : 24)
        .shadow({
          radius: this.selectedNodeId === this.node.id ? 18 : 8,
          color: '#1A31464A',
          offsetY: 7
        })
        .animation({ duration: 460, curve: Curve.FastOutSlowIn })

      Text(this.node.name)
        .fontSize(this.isCompact ? 12 : 13)
        .fontColor('#506164')
        .fontWeight(this.selectedNodeId === this.node.id ? FontWeight.Medium : FontWeight.Regular)
        .margin({ top: 8 })

      Text(this.node.hint)
        .fontSize(10)
        .fontColor('#849497')
        .lineHeight(15)
        .textAlign(TextAlign.Center)
        .maxLines(2)
        .margin({ top: 5 })

      Text(this.visited ? '已遇见' : (this.isEnabled ? '轻触靠近' : '等待启航'))
        .fontSize(10)
        .fontColor(this.visited ? '#6C8A7D' : '#7E8E90')
        .padding({ left: 9, right: 9, top: 4, bottom: 4 })
        .borderRadius(12)
        .backgroundColor(this.visited ? '#D8EDF6F1' : '#88FFFFFF')
        .margin({ top: 7 })
    }
    .width(this.isCompact ? 94 : 112)
    .height(this.isCompact ? 146 : 160)
    .padding({ left: 10, right: 10, top: 12, bottom: 12 })
    .borderRadius(24)
    .backgroundColor(this.selectedNodeId === this.node.id ? '#DDFDFEFA' : '#A8F7FBF8')
    .backdropBlur(14)
    .shadow({
      radius: this.selectedNodeId === this.node.id ? 20 : 10,
      color: '#1831464A',
      offsetY: 8
    })
    .scale({
      x: this.selectedNodeId === this.node.id ? 1.04 : 1,
      y: this.selectedNodeId === this.node.id ? 1.04 : 1
    })
    .animation({ duration: 520, curve: Curve.FastOutSlowIn })
  }
}

@Component
export struct JourneyMap {
  @Prop mood: MoodOption = peacefulMoodOption;
  @Link crystals: number;
  @Prop isCompact: boolean = false;
  @Prop isWide: boolean = false;
  @State private hasStarted: boolean = false;
  @State private selectedNodeId: string = '';
  @State private nodeActionCount: number = 0;
  @State private beamSweep: number = 0;
  @State private jellyGlowScale: number = 1;
  @State private fishingLineHeight: number = 18;
  @State private fishingStarRise: number = 0;
  @State private logText: string = '纸船还停在风渊渡口。消耗一枚情绪结晶，让它去琉璃星海走一小段路。';
  @State private stardust: number = 0;
  @State private visitedNodeIds: string[] = [];

  private getBackgroundAsset(): Resource {
    if (this.isWide) {
      return $r('app.media.bg_journey_tablet_landscape');
    }
    return $r('app.media.bg_journey_phone');
  }

  private getNodeImageResource(nodeId: string): Resource {
    if (nodeId === 'bottle') {
      return $r('app.media.journey_node_bottle');
    }
    if (nodeId === 'jellyfish') {
      return $r('app.media.journey_node_jellyfish');
    }
    return $r('app.media.journey_node_shadow');
  }

  private getNodePositionX(nodeId: string): string {
    if (nodeId === 'bottle') {
      return this.isCompact ? '12%' : '16%';
    }
    if (nodeId === 'jellyfish') {
      return this.isCompact ? '43%' : '45%';
    }
    return this.isCompact ? '72%' : '74%';
  }

  private getNodePositionY(nodeId: string): string {
    if (nodeId === 'bottle') {
      return this.isCompact ? '55%' : '54%';
    }
    if (nodeId === 'jellyfish') {
      return this.isCompact ? '30%' : '28%';
    }
    return this.isCompact ? '50%' : '48%';
  }

  private isVisited(nodeId: string): boolean {
    for (let index = 0; index < this.visitedNodeIds.length; index++) {
      const item: string | undefined = this.visitedNodeIds[index];
      if (item !== undefined && item === nodeId) {
        return true;
      }
    }
    return false;
  }

  private getVisitedCount(): number {
    return this.visitedNodeIds.length;
  }

  private getSelectedNode(): DreamJourneyNode | undefined {
    for (let index = 0; index < dreamNodes.length; index++) {
      const item: DreamJourneyNode | undefined = dreamNodes[index];
      if (item !== undefined && item.id === this.selectedNodeId) {
        return item;
      }
    }
    return undefined;
  }

  private getNodeActionTarget(nodeId: string): number {
    if (nodeId === 'jellyfish') {
      return 3;
    }
    return 2;
  }

  private getNodeActionLabel(nodeId: string): string {
    if (nodeId === 'bottle') {
      return this.nodeActionCount === 0 ? '轻摇漂流瓶' : '拆开瓶中信';
    }
    if (nodeId === 'jellyfish') {
      if (this.nodeActionCount === 0) {
        return '跟随第一束光';
      }
      if (this.nodeActionCount === 1) {
        return '跟随第二束光';
      }
      return '让水母点亮海面';
    }
    return this.nodeActionCount === 0 ? '安静等它垂钓' : '收下那颗星星';
  }

  private getSelectedNodeHint(): string {
    const node: DreamJourneyNode | undefined = this.getSelectedNode();
    if (node === undefined) {
      return '选中画面里的一个微光节点，它会展开自己的小互动。';
    }
    if (this.isVisited(node.id)) {
      return `${node.name}已经被你遇见过了。它会继续留在星海里发光。`;
    }
    if (node.id === 'bottle') {
      return this.nodeActionCount === 0 ? '瓶身里有纸声。先轻轻摇一摇。' : '瓶塞松开了，可以读里面的信。';
    }
    if (node.id === 'jellyfish') {
      return `跟着水母的微光游动 ${this.nodeActionCount} / 3，海面会一点点亮起来。`;
    }
    return this.nodeActionCount === 0 ? '不要催它。影子小人需要一点安静的时间。' : '鱼线动了，它好像钓到了一颗星。';
  }

  private getRouteHint(): string {
    if (!this.hasStarted) {
      return '第一步：点击“启航”，让纸船离开渡口。';
    }
    if (this.getVisitedCount() >= dreamNodes.length) {
      return '今日航线完成了。你可以重新靠岸，再走一遍星海。';
    }
    return `第二步：轻触画面里的微光节点 ${this.getVisitedCount()} / ${dreamNodes.length}`;
  }

  private startJourney(): void {
    if (this.hasStarted) {
      return;
    }
    if (this.crystals <= 0) {
      this.logText = '今天还缺一枚情绪结晶。先记录心情，再让纸船出发。';
      return;
    }
    this.crystals -= 1;
    this.hasStarted = true;
    this.selectedNodeId = '';
    this.nodeActionCount = 0;
    this.beamSweep = 0;
    this.jellyGlowScale = 1;
    this.fishingLineHeight = 18;
    this.fishingStarRise = 0;
    this.visitedNodeIds = [];
    this.logText = '纸船离岸了。云海很安静，远处有几个微光节点在等你轻轻点亮。';
  }

  private resetJourney(): void {
    this.hasStarted = false;
    this.selectedNodeId = '';
    this.nodeActionCount = 0;
    this.beamSweep = 0;
    this.jellyGlowScale = 1;
    this.fishingLineHeight = 18;
    this.fishingStarRise = 0;
    this.visitedNodeIds = [];
    this.logText = '纸船重新靠回渡口。下一次启航，也可以很慢。';
  }

  private selectNode(node: DreamJourneyNode): void {
    if (!this.hasStarted) {
      this.logText = '先让纸船启航，再靠近梦境节点。';
      return;
    }
    this.selectedNodeId = node.id;
    this.nodeActionCount = 0;
    this.beamSweep = 0;
    this.jellyGlowScale = 1;
    this.fishingLineHeight = 18;
    this.fishingStarRise = 0;
    if (this.isVisited(node.id)) {
      this.logText = `${node.name}还在原地发光。你已经收下过它给你的那一句话。`;
      return;
    }
    this.logText = `${node.name}靠近了。${node.hint}`;
  }

  private completeNode(node: DreamJourneyNode): void {
    if (this.isVisited(node.id)) {
      this.logText = `${node.name}还在原地发光。你已经收下过它给你的那一句话。`;
      return;
    }
    const nextVisitedIds: string[] = [];
    for (let index = 0; index < this.visitedNodeIds.length; index++) {
      const item: string | undefined = this.visitedNodeIds[index];
      if (item !== undefined) {
        nextVisitedIds.push(item);
      }
    }
    nextVisitedIds.push(node.id);
    this.visitedNodeIds = nextVisitedIds;
    this.logText = node.rewardText;
    this.stardust += 1;
    if (nextVisitedIds.length >= dreamNodes.length) {
      this.logText = `${node.rewardText} 今日航线完成，纸船带回了一张还没显影的梦。`;
    }
  }

  private performNodeAction(): void {
    const node: DreamJourneyNode | undefined = this.getSelectedNode();
    if (node === undefined) {
      this.logText = '先在星海画面里选一个微光节点。';
      return;
    }
    if (this.isVisited(node.id)) {
      this.logText = `${node.name}已经完成了。试试靠近另一个微光节点。`;
      return;
    }
    const nextCount: number = this.nodeActionCount + 1;
    this.nodeActionCount = nextCount;
    if (node.id === 'jellyfish') {
      this.beamSweep = Math.min(3, nextCount);
      this.jellyGlowScale = this.jellyGlowScale > 1 ? 1 : 1.18;
    }
    if (node.id === 'shadow') {
      this.fishingLineHeight = nextCount === 1 ? 54 : 28;
      this.fishingStarRise = nextCount === 1 ? 0 : 26;
    }
    if (nextCount >= this.getNodeActionTarget(node.id)) {
      this.completeNode(node);
      return;
    }
    if (node.id === 'bottle') {
      this.logText = '瓶子里的纸条贴着玻璃晃了一下，瓶塞变松了。';
      return;
    }
    if (node.id === 'jellyfish') {
      this.logText = '水母拖出一条浅蓝色光痕。继续跟着它，海面会更亮一点。';
      return;
    }
    this.logText = '影子小人没有说话，只把鱼竿往星海深处放了放。';
  }

  build() {
    Column() {
      Row() {
        Column() {
          Text('Wonderland · 琉璃星海')
            .fontSize(this.isCompact ? 20 : this.isWide ? 26 : 22)
            .fontWeight(FontWeight.Medium)
            .fontColor('#506164')

          Text('一次很短、不会失败的梦境旅行')
            .fontSize(12)
            .fontColor('#849497')
            .margin({ top: 6 })
        }
        .alignItems(HorizontalAlign.Start)

        Blank()

        Text(`星尘 ${this.stardust}`)
          .fontSize(12)
          .fontColor('#607174')
          .padding({ left: 12, right: 12, top: 7, bottom: 7 })
          .borderRadius(17)
          .backgroundColor('#B8F7FBF8')
          .backdropBlur(12)
      }
      .width('100%')

      Stack({ alignContent: Alignment.Center }) {
        Image(this.getBackgroundAsset())
          .width('100%')
          .height(this.isCompact ? 246 : 286)
          .borderRadius(30)
          .objectFit(ImageFit.Cover)

        Column()
          .width('100%')
          .height(this.isCompact ? 246 : 286)
          .borderRadius(30)
          .backgroundColor('#26F7FBF8')

        Column()
          .width('82%')
          .height(1)
          .backgroundColor('#AAF7FBF8')
          .opacity(0.58)
          .rotate({ angle: -8 })

        ForEach(dreamNodes, (node: DreamJourneyNode) => {
          Column() {
            if (node.id === 'jellyfish' && this.selectedNodeId === 'jellyfish') {
              Stack() {
                Column()
                  .width(86)
                  .height(3)
                  .borderRadius(2)
                  .backgroundColor('#99DDF4FF')
                  .opacity(this.beamSweep > 0 ? 0.78 : 0.16)
                  .rotate({ angle: -13 })
                  .translate({ x: this.beamSweep * 18 - 30, y: 8 })
                  .animation({ duration: 620, curve: Curve.FastOutSlowIn })

                Column()
                  .width(58)
                  .height(2)
                  .borderRadius(1)
                  .backgroundColor('#88FFFFFF')
                  .opacity(this.beamSweep > 1 ? 0.68 : 0.12)
                  .rotate({ angle: 18 })
                  .translate({ x: this.beamSweep * 14 - 20, y: 22 })
                  .animation({ duration: 620, curve: Curve.EaseOut })
              }
              .width(96)
              .height(34)
              .margin({ bottom: -8 })
            }

            Image(this.getNodeImageResource(node.id))
              .width(this.selectedNodeId === node.id ? 58 : 50)
              .height(this.selectedNodeId === node.id ? 58 : 50)
              .objectFit(ImageFit.Contain)
              .opacity(this.hasStarted ? (this.isVisited(node.id) ? 0.86 : 1) : 0.48)
              .scale({
                x: node.id === 'jellyfish' && this.selectedNodeId === node.id ? this.jellyGlowScale : 1,
                y: node.id === 'jellyfish' && this.selectedNodeId === node.id ? this.jellyGlowScale : 1
              })
              .shadow({
                radius: node.id === 'jellyfish' && this.selectedNodeId === node.id ? 28 : (this.selectedNodeId === node.id ? 22 : 12),
                color: node.id === 'jellyfish' && this.selectedNodeId === node.id ? '#88DDF4FF' : (this.isVisited(node.id) ? '#66F7FBF8' : '#2231464A'),
                offsetY: 8
              })
              .animation({ duration: 620, curve: Curve.FastOutSlowIn })

            if (node.id === 'shadow' && this.selectedNodeId === 'shadow') {
              Stack({ alignContent: Alignment.Top }) {
                Column()
                  .width(2)
                  .height(this.fishingLineHeight)
                  .borderRadius(1)
                  .backgroundColor('#AA506164')
                  .animation({ duration: 680, curve: Curve.EaseOut })

                Text('✦')
                  .fontSize(16)
                  .fontColor('#FFF7C8')
                  .opacity(this.nodeActionCount > 0 ? 0.92 : 0)
                  .translate({ y: this.fishingLineHeight - this.fishingStarRise })
                  .shadow({ radius: 16, color: '#AAFFF7C8', offsetY: 0 })
                  .animation({ duration: 760, curve: Curve.FastOutSlowIn })
              }
              .height(66)
              .margin({ top: -4, bottom: -16 })
            }

            Text(this.isVisited(node.id) ? '已遇见' : node.name)
              .fontSize(10)
              .fontColor('#506164')
              .padding({ left: 8, right: 8, top: 4, bottom: 4 })
              .borderRadius(12)
              .backgroundColor('#CCFDFEFA')
              .backdropBlur(10)
              .margin({ top: 4 })
          }
          .position({ x: this.getNodePositionX(node.id), y: this.getNodePositionY(node.id) })
          .scale({
            x: this.selectedNodeId === node.id ? 1.08 : 1,
            y: this.selectedNodeId === node.id ? 1.08 : 1
          })
          .animation({ duration: 520, curve: Curve.FastOutSlowIn })
          .onClick(() => {
            this.selectNode(node);
          })
        }, (node: DreamJourneyNode) => `scene-${node.id}`)

        Row() {
          Column()
            .width(8)
            .height(8)
            .borderRadius(4)
            .backgroundColor(this.mood.color)
            .opacity(0.86)

          Text(this.getRouteHint())
            .fontSize(12)
            .fontColor('#607174')
            .margin({ left: 8 })
        }
        .padding({ left: 14, right: 14, top: 8, bottom: 8 })
        .borderRadius(18)
        .backgroundColor('#CCFDFEFA')
        .backdropBlur(14)
        .position({ x: this.isCompact ? '7%' : '12%', y: this.isCompact ? '8%' : '9%' })
      }
      .width('100%')
      .height(this.isCompact ? 246 : 286)
      .margin({ top: 18 })
      .animation({ duration: 620, curve: Curve.FastOutSlowIn })

      Row() {
        Text(this.hasStarted ? '重新靠岸' : '消耗 1 枚结晶启航')
          .fontSize(14)
          .fontColor('#56686B')
          .padding({ left: 18, right: 18, top: 9, bottom: 9 })
          .borderRadius(20)
          .backgroundColor('#CCF7FBF8')
          .backdropBlur(14)
          .onClick(() => {
            if (this.hasStarted) {
              this.resetJourney();
            } else {
              this.startJourney();
            }
          })

        Blank()

        Text(`情绪结晶 ${this.crystals}`)
          .fontSize(12)
          .fontColor('#7E8E90')
      }
      .width('100%')
      .margin({ top: 16 })

      Row() {
        ForEach(dreamNodes, (node: DreamJourneyNode) => {
          JourneyNodeCard({
            node: node,
            selectedNodeId: this.selectedNodeId,
            visited: this.isVisited(node.id),
            isEnabled: this.hasStarted,
            isCompact: this.isCompact
          })
            .margin({ right: this.isCompact ? 8 : 12 })
            .onClick(() => {
              this.selectNode(node);
            })
        }, (node: DreamJourneyNode) => node.id)
      }
      .width('100%')
      .margin({ top: 18 })

      Column() {
        Row() {
          Text('节点互动')
            .fontSize(14)
            .fontWeight(FontWeight.Medium)
            .fontColor('#506164')

          Blank()

          Text(this.selectedNodeId.length === 0 ? '未选中' : `${this.nodeActionCount}/${this.getNodeActionTarget(this.selectedNodeId)}`)
            .fontSize(12)
            .fontColor('#7E8E90')
        }
        .width('100%')

        Text(this.getSelectedNodeHint())
          .fontSize(12)
          .fontColor('#607174')
          .lineHeight(19)
          .margin({ top: 8 })
          .width('100%')

        Text(this.selectedNodeId.length === 0 ? '先选一个节点' : this.getNodeActionLabel(this.selectedNodeId))
          .fontSize(13)
          .fontColor('#56686B')
          .textAlign(TextAlign.Center)
          .padding({ left: 18, right: 18, top: 9, bottom: 9 })
          .borderRadius(20)
          .backgroundColor('#D8EDF6F1')
          .backdropBlur(12)
          .margin({ top: 12 })
          .onClick(() => {
            this.performNodeAction();
          })
      }
      .width('100%')
      .padding({ left: 16, right: 16, top: 14, bottom: 14 })
      .borderRadius(22)
      .backgroundColor('#CCFDFEFA')
      .backdropBlur(16)
      .margin({ top: 14 })

      Column() {
        Text('旅行札记')
          .fontSize(14)
          .fontWeight(FontWeight.Medium)
          .fontColor('#506164')
          .width('100%')

        Text(this.logText)
          .fontSize(13)
          .fontColor('#607174')
          .lineHeight(21)
          .margin({ top: 10 })
          .width('100%')
      }
      .padding({ left: 16, right: 16, top: 14, bottom: 14 })
      .borderRadius(22)
      .backgroundColor('#CCFDFEFA')
      .backdropBlur(16)
      .margin({ top: 16 })
    }
    .width(this.isCompact ? '92%' : this.isWide ? '58%' : '82%')
    .padding({
      left: this.isCompact ? 16 : this.isWide ? 28 : 22,
      right: this.isCompact ? 16 : this.isWide ? 28 : 22,
      top: this.isCompact ? 18 : 24,
      bottom: this.isCompact ? 18 : 24
    })
    .borderRadius(30)
    .backgroundColor('#DDFDFEFA')
    .backdropBlur(22)
    .shadow({ radius: 28, color: '#2031464A', offsetY: 12 })
    .animation({ duration: 560, curve: Curve.FastOutSlowIn })
  }
}
