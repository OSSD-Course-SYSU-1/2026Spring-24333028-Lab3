import {
  CollectedCard,
  PolaroidCard,
  dockStoryLines,
  getBuildingAsset,
  greenhouseStoryLines,
  moodTreeStoryLines,
  polaroidPool,
  postcardStoryLines,
  teaStoryLines
} from '../common/Models';

@Component
struct GalleryCard {
  @Prop card: PolaroidCard;
  @Prop collectedCards: CollectedCard[] = [];
  @Prop isCompact: boolean = false;
  @Prop isWide: boolean = false;
  @Link selectedCardId: string;

  private getCollectedCard(): CollectedCard | undefined {
    for (let index = 0; index < this.collectedCards.length; index++) {
      const item: CollectedCard | undefined = this.collectedCards[index];
      if (item !== undefined && item.cardId === this.card.id) {
        return item;
      }
    }
    return undefined;
  }

  private isCollected(): boolean {
    return this.getCollectedCard() !== undefined;
  }

  private getUnlockDate(): string {
    const item: CollectedCard | undefined = this.getCollectedCard();
    if (item === undefined) {
      return '等待显影';
    }
    return item.unlockDate;
  }

  private getImageResource(): Resource | undefined {
    return getBuildingAsset(this.card.id);
  }

  build() {
    Column() {
      Stack({ alignContent: Alignment.Center }) {
        if (this.isCollected() && this.getImageResource() !== undefined) {
          Image(this.getImageResource())
            .width('100%')
            .height('100%')
            .objectFit(ImageFit.Cover)
            .borderRadius(16)
            .opacity(0.96)
        } else {
          Column()
            .width('100%')
            .height('100%')
            .borderRadius(16)
            .backgroundColor(this.card.color)
            .opacity(this.isCollected() ? 0.92 : 0.34)
            .blur(this.isCollected() ? 0 : 10)
        }

        if (!this.isCollected()) {
          Text('未显影')
            .fontSize(12)
            .fontColor('#6D7D80')
            .padding({ left: 12, right: 12, top: 7, bottom: 7 })
            .borderRadius(16)
            .backgroundColor('#F7FBF8C8')
            .backdropBlur(12)
        }
      }
      .width('100%')
      .height(this.isWide ? 138 : 112)

      Text(this.isCollected() ? this.card.name : '一张安静的底片')
        .fontSize(this.isCompact ? 13 : 14)
        .fontWeight(FontWeight.Medium)
        .fontColor('#506164')
        .maxLines(1)
        .textOverflow({ overflow: TextOverflow.Ellipsis })
        .margin({ top: 12 })

      Text(this.isCollected() ? this.card.description : '它还在玻璃房里慢慢等光。')
        .fontSize(11)
        .fontColor('#7E8E90')
        .lineHeight(17)
        .maxLines(2)
        .textOverflow({ overflow: TextOverflow.Ellipsis })
        .margin({ top: 6 })

      Row() {
        Text(this.card.buildingLabel)
          .fontSize(10)
          .fontColor('#6E7E81')
          .padding({ left: 9, right: 9, top: 5, bottom: 5 })
          .borderRadius(13)
          .backgroundColor('#EDF6F1D0')

        Blank()

        Text(this.getUnlockDate())
          .fontSize(10)
          .fontColor('#92A0A2')
      }
      .width('100%')
      .margin({ top: 10 })
    }
    .width(this.isWide ? 174 : this.isCompact ? 140 : 154)
    .padding({ left: 10, right: 10, top: 10, bottom: 12 })
    .borderRadius(22)
    .backgroundColor(this.isCollected() ? '#FDFEFADD' : '#F7FBF89C')
    .backdropBlur(16)
    .shadow({
      radius: this.isCollected() ? 18 : 8,
      color: '#31464A18',
      offsetY: 8
    })
    .animation({ duration: 520, curve: Curve.FastOutSlowIn })
    .onClick(() => {
      if (this.isCollected()) {
        this.selectedCardId = this.card.id;
      }
    })
  }
}

@Component
export struct GreenhouseGallery {
  @Prop collectedCards: CollectedCard[] = [];
  @Link isVisible: boolean;
  @Prop isCompact: boolean = false;
  @Prop isWide: boolean = false;
  @Prop showClose: boolean = true;
  @State private cardScale: number = 0.96;
  @State private selectedCardId: string = '';

  aboutToAppear(): void {
    this.cardScale = 1;
  }

  private getCollectedCount(): number {
    return this.collectedCards.length;
  }

  private getTotalCount(): number {
    return polaroidPool.length;
  }

  private getSelectedCard(): PolaroidCard | undefined {
    for (let index = 0; index < polaroidPool.length; index++) {
      const card: PolaroidCard | undefined = polaroidPool[index];
      if (card !== undefined && card.id === this.selectedCardId) {
        return card;
      }
    }
    return undefined;
  }

  private getSelectedTitle(): string {
    const card: PolaroidCard | undefined = this.getSelectedCard();
    if (card === undefined) {
      return '点一张已显影卡片';
    }
    if (card.id === 'tea_house') {
      return '茶屋体验 · 抹茶慢慢打出泡沫';
    }
    if (card.id === 'star_post') {
      return '星光邮局 · 给远方的一句话';
    }
    if (card.id === 'greenhouse') {
      return '拾光玻璃房 · 整理发光植物';
    }
    if (card.id === 'wind_dock') {
      return '风渊渡口 · 纸船启航前';
    }
    return '心境之树 · 情绪都会发光';
  }

  private getDetailLines(): string[] {
    if (this.selectedCardId === 'tea_house') {
      return teaStoryLines;
    }
    if (this.selectedCardId === 'star_post') {
      return postcardStoryLines;
    }
    if (this.selectedCardId === 'greenhouse') {
      return greenhouseStoryLines;
    }
    if (this.selectedCardId === 'wind_dock') {
      return dockStoryLines;
    }
    if (this.selectedCardId === 'mood_tree') {
      return moodTreeStoryLines;
    }
    return ['点击一张已显影的拍立得，它会在这里展开自己的小故事。'];
  }

  build() {
    Column() {
      Row() {
        Column() {
          Text('拾光玻璃房')
            .fontSize(this.isCompact ? 19 : this.isWide ? 25 : 21)
            .fontWeight(FontWeight.Medium)
            .fontColor('#506164')

          Text(`已收藏 ${this.getCollectedCount()} / ${this.getTotalCount()} 张拍立得`)
            .fontSize(12)
            .fontColor('#849497')
            .margin({ top: 6 })
        }
        .alignItems(HorizontalAlign.Start)

        Blank()

        if (this.showClose) {
          Text('关闭')
            .fontSize(13)
            .fontColor('#6E7E81')
            .padding({ left: 13, right: 13, top: 7, bottom: 7 })
            .borderRadius(16)
            .backgroundColor('#F7FBF890')
            .onClick(() => {
              this.isVisible = false;
            })
        }
      }
      .width('100%')
      .margin({ bottom: 18 })

      Scroll() {
        Flex({ wrap: FlexWrap.Wrap, justifyContent: this.isWide ? FlexAlign.Center : FlexAlign.SpaceBetween }) {
          ForEach(polaroidPool, (card: PolaroidCard) => {
            GalleryCard({
              card: card,
              collectedCards: this.collectedCards,
              isCompact: this.isCompact,
              isWide: this.isWide,
              selectedCardId: this.selectedCardId
            })
              .margin({ bottom: 14 })
          }, (card: PolaroidCard) => card.id)
        }
        .width('100%')
      }
      .height(this.isCompact ? 430 : this.isWide ? 430 : 460)
      .scrollBar(BarState.Off)

      Column() {
        Text(this.getSelectedTitle())
          .fontSize(14)
          .fontColor('#506164')
          .fontWeight(FontWeight.Medium)
          .width('100%')

        ForEach(this.getDetailLines(), (line: string) => {
          Text(line)
            .fontSize(12)
            .fontColor('#6E7E81')
            .lineHeight(19)
            .margin({ top: 8 })
            .width('100%')
        }, (line: string) => line)
      }
      .padding({ left: 16, right: 16, top: 14, bottom: 14 })
      .borderRadius(22)
      .backgroundColor('#F7FBF8C8')
      .backdropBlur(14)
      .margin({ top: 12 })
    }
    .width(this.isCompact ? '92%' : this.isWide ? '62%' : '84%')
    .padding({
      left: this.isCompact ? 16 : this.isWide ? 28 : 22,
      right: this.isCompact ? 16 : this.isWide ? 28 : 22,
      top: this.isCompact ? 18 : 24,
      bottom: this.isCompact ? 18 : 24
    })
    .borderRadius(30)
    .backgroundColor('#FDFEFADD')
    .backdropBlur(22)
    .shadow({ radius: 28, color: '#31464A20', offsetY: 12 })
    .scale({ x: this.cardScale, y: this.cardScale })
    .animation({ duration: 560, curve: Curve.FastOutSlowIn })
  }
}
