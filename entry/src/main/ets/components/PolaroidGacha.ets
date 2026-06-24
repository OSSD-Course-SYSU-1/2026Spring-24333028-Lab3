import { CollectedCard, PolaroidCard } from '../common/Models';

@Component
export struct PolaroidGacha {
  @Watch('onActiveCardChange')
  @Link activeCard: PolaroidCard | undefined;
  @Link pendingPlacementCardId: string;
  @Link collectedCards: CollectedCard[];
  @State private revealProgress: number = 0;
  @State private cardTilt: number = -2;
  @State private hintOpacity: number = 1;

  aboutToAppear(): void {
    this.syncRevealState();
  }

  private onActiveCardChange(): void {
    this.syncRevealState();
  }

  private syncRevealState(): void {
    if (this.activeCard === undefined) {
      this.revealProgress = 0;
      this.hintOpacity = 1;
      this.cardTilt = -2;
      return;
    }
    if (this.activeCard.isRevealed) {
      this.revealProgress = 1;
      this.hintOpacity = 0;
      this.cardTilt = -2;
      return;
    }
    this.revealProgress = 0;
    this.hintOpacity = 1;
    this.cardTilt = -2;
  }

  private finishReveal(): void {
    if (this.activeCard === undefined) {
      return;
    }
    const revealedCard: PolaroidCard = {
      id: this.activeCard.id,
      type: this.activeCard.type,
      name: this.activeCard.name,
      imageRes: this.activeCard.imageRes,
      color: this.activeCard.color,
      buildingLabel: this.activeCard.buildingLabel,
      description: this.activeCard.description,
      isRevealed: true,
      unlockDate: this.activeCard.unlockDate
    };
    this.activeCard = revealedCard;
    this.pendingPlacementCardId = revealedCard.id;
    this.addCardToCollection(revealedCard);
  }

  private addCardToCollection(card: PolaroidCard): void {
    const nextCards: CollectedCard[] = [];
    let hasCard: boolean = false;
    for (let index = 0; index < this.collectedCards.length; index++) {
      const item: CollectedCard | undefined = this.collectedCards[index];
      if (item === undefined) {
        continue;
      }
      if (item.cardId === card.id) {
        nextCards.push({
          cardId: card.id,
          unlockDate: card.unlockDate
        });
        hasCard = true;
      } else {
        nextCards.push(item);
      }
    }
    if (!hasCard) {
      nextCards.push({
        cardId: card.id,
        unlockDate: card.unlockDate
      });
    }
    this.collectedCards = nextCards;
  }

  private increaseReveal(deltaX: number, deltaY: number): void {
    const distance: number = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const nextProgress: number = this.revealProgress + distance / 760;
    this.revealProgress = Math.min(1, nextProgress);
    this.hintOpacity = Math.max(0, 1 - this.revealProgress * 1.45);
    if (this.revealProgress >= 1) {
      this.finishReveal();
    }
  }

  build() {
    Column() {
      Stack() {
        Column()
          .width('100%')
          .height('100%')
          .borderRadius(18)
          .backgroundColor('#1C2325')
          .opacity(1 - this.revealProgress)
          .animation({ duration: 520, curve: Curve.EaseOut })

        if (this.activeCard !== undefined && this.activeCard.imageRes !== undefined) {
          Image(this.activeCard.imageRes)
            .width('100%')
            .height('100%')
            .objectFit(ImageFit.Cover)
            .borderRadius(18)
            .blur(22 * (1 - this.revealProgress))
            .opacity(Math.max(0.12, this.revealProgress))
            .animation({ duration: 800, curve: Curve.FastOutSlowIn })
        } else if (this.activeCard !== undefined) {
          Column()
            .width('100%')
            .height('100%')
            .borderRadius(18)
            .backgroundColor(this.activeCard.color)
            .opacity(Math.max(0.12, this.revealProgress))
            .animation({ duration: 800, curve: Curve.FastOutSlowIn })
        } else {
          Column() {
            Blank()

            Text('还没有新的旅行照片')
              .fontSize(16)
              .fontColor('#F7F1E6')
              .opacity(0.84)

            Text('用一枚情绪结晶唤醒它')
              .fontSize(12)
              .fontColor('#D6DDD8')
              .opacity(0.72)
              .margin({ top: 10 })

            Blank()
          }
          .width('100%')
          .height('100%')
          .justifyContent(FlexAlign.Center)
        }

        Column() {
          Blank()

          if (this.activeCard !== undefined) {
            Column() {
              Text(this.activeCard.buildingLabel)
                .fontSize(22)
                .fontWeight(FontWeight.Medium)
                .fontColor('#FFFFFFEE')

              Text(this.activeCard.description)
                .fontSize(11)
                .fontColor('#FFFFFFCC')
                .textAlign(TextAlign.Center)
                .maxLines(2)
                .margin({ top: 8, left: 18, right: 18 })
            }
            .padding({ left: 14, right: 14, top: 12, bottom: 12 })
            .borderRadius(16)
            .backgroundColor('#26313466')
            .backdropBlur(12)
            .margin({ left: 18, right: 18, bottom: 16 })
          }
        }
        .width('100%')
        .height('100%')
        .justifyContent(FlexAlign.End)

        if (this.activeCard !== undefined && !this.activeCard.isRevealed) {
          Text('轻轻摩挲，让画面显影')
            .fontSize(13)
            .fontColor('#F9F1E4')
            .padding({ left: 14, right: 14, top: 8, bottom: 8 })
            .borderRadius(18)
            .backgroundColor('#1D262866')
            .backdropBlur(10)
            .opacity(this.hintOpacity)
            .position({ x: 44, y: 228 })
            .animation({ duration: 420, curve: Curve.EaseOut })
        }

        if (this.activeCard !== undefined && this.activeCard.isRevealed) {
          Text('已显影，可放入小镇')
            .fontSize(13)
            .fontColor('#607174')
            .padding({ left: 14, right: 14, top: 7, bottom: 7 })
            .borderRadius(18)
            .backgroundColor('#FFFFFFBB')
            .position({ x: 52, y: 228 })
            .animation({ duration: 520, curve: Curve.EaseOut })
        }
      }
      .width(236)
      .height(278)
      .margin({ top: 18 })

      Text(this.activeCard !== undefined ? this.activeCard.name : '尚未命名的等待')
        .fontSize(18)
        .fontWeight(FontWeight.Medium)
        .fontColor('#5E6F72')
        .margin({ top: 18 })

      Text(this.activeCard !== undefined ? this.activeCard.unlockDate : '等待下一次温柔显影')
        .fontSize(12)
        .fontColor('#91A0A2')
        .margin({ top: 6, bottom: 8 })
    }
    .width(286)
    .padding({ left: 20, right: 20, top: 18, bottom: 22 })
    .borderRadius(24)
    .backgroundColor('#FFFDF6')
    .shadow({ radius: 24, color: '#3F535326', offsetY: 12 })
    .rotate({ angle: this.cardTilt })
    .animation({ duration: 620, curve: Curve.FastOutSlowIn })
    .gesture(
      PanGesture()
        .onActionStart(() => {
          this.cardTilt = 1.6;
        })
        .onActionUpdate((event: GestureEvent) => {
          if (!event || this.activeCard === undefined || this.activeCard.isRevealed) {
            return;
          }
          // 让拍立得随手势缓慢显影，而不是突兀地瞬间出现。
          this.increaseReveal(Math.abs(event.offsetX), Math.abs(event.offsetY));
        })
        .onActionEnd(() => {
          this.cardTilt = -2;
        })
    )
  }
}
