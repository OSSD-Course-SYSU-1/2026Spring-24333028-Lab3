import { BuildingSlot, MoodOption, PolaroidCard, peacefulMoodOption } from '../common/Models';

@Component
struct SceneSlot {
  @Prop slot: BuildingSlot;
  @Prop mood: MoodOption = peacefulMoodOption;
  @Prop isCompact: boolean = false;
  @Prop isWide: boolean = false;
  @Link slots: BuildingSlot[];
  @Link pendingPlacementCardId: string;
  @Link activeCard: PolaroidCard | undefined;
  @State private pulseScale: number = 1;

  private placePendingCard(): void {
    if (this.slot.buildingId !== null || this.pendingPlacementCardId.length === 0) {
      return;
    }
    const nextSlots: BuildingSlot[] = [];
    for (let index = 0; index < this.slots.length; index++) {
      const currentSlot: BuildingSlot | undefined = this.slots[index];
      if (currentSlot === undefined) {
        continue;
      }
      if (currentSlot.slotId === this.slot.slotId) {
        nextSlots.push({
          slotId: currentSlot.slotId,
          buildingId: this.pendingPlacementCardId,
          positionX: currentSlot.positionX,
          positionY: currentSlot.positionY
        });
      } else {
        nextSlots.push(currentSlot);
      }
    }
    this.slots = nextSlots;
    this.pendingPlacementCardId = '';
    this.activeCard = undefined;
  }

  private getPositionX(): string {
    if (this.isWide) {
      if (this.slot.slotId === 1) {
        return '21%';
      }
      if (this.slot.slotId === 2) {
        return '48%';
      }
      return '80%';
    }
    if (this.isCompact) {
      if (this.slot.slotId === 1) {
        return '14%';
      }
      if (this.slot.slotId === 2) {
        return '47%';
      }
      return '84%';
    }
    if (this.slot.slotId === 1) {
      return '16%';
    }
    if (this.slot.slotId === 2) {
      return '47%';
    }
    return '83%';
  }

  private getPositionY(): string {
    if (this.isWide) {
      if (this.slot.slotId === 1) {
        return '63%';
      }
      if (this.slot.slotId === 2) {
        return '55%';
      }
      return '73%';
    }
    if (this.isCompact) {
      if (this.slot.slotId === 1) {
        return '66%';
      }
      if (this.slot.slotId === 2) {
        return '58%';
      }
      return '74%';
    }
    if (this.slot.slotId === 1) {
      return '65%';
    }
    if (this.slot.slotId === 2) {
      return '57%';
    }
    return '73%';
  }

  private getHitSize(): number {
    if (this.isWide) {
      return 84;
    }
    if (this.isCompact) {
      return 76;
    }
    return 80;
  }

  build() {
    Stack({ alignContent: Alignment.Center }) {
      if (this.slot.buildingId === null && this.pendingPlacementCardId.length > 0) {
        Column() {
          Text('+')
            .fontSize(this.isWide ? 26 : 22)
            .fontColor('#6B7B7E')

          Text('放这里')
            .fontSize(10)
            .fontColor('#7A8A8D')
            .opacity(0.82)
            .margin({ top: 2 })
        }
        .width(this.isWide ? 66 : 58)
        .height(this.isWide ? 66 : 58)
        .justifyContent(FlexAlign.Center)
        .alignItems(HorizontalAlign.Center)
        .borderRadius(this.isWide ? 33 : 29)
        .backgroundColor('#F5FAF6D6')
        .backdropBlur(14)
        .shadow({ radius: 18, color: '#5A6D7028', offsetY: 8 })
        .onClick(() => {
          this.placePendingCard();
          this.pulseScale = this.pulseScale > 1 ? 0.98 : 1.04;
        })
      } else if (this.slot.buildingId !== null && this.pendingPlacementCardId.length > 0) {
        Column()
          .width(this.isWide ? 12 : 10)
          .height(this.isWide ? 12 : 10)
          .borderRadius(this.isWide ? 6 : 5)
          .backgroundColor(this.mood.color)
          .opacity(0.7)
          .shadow({ radius: 12, color: '#F4F7EF66', offsetY: 3 })
      } else {
        Column()
          .width(this.slot.buildingId !== null ? (this.isWide ? 10 : 8) : 1)
          .height(this.slot.buildingId !== null ? (this.isWide ? 10 : 8) : 1)
          .borderRadius(this.slot.buildingId !== null ? (this.isWide ? 5 : 4) : 1)
          .backgroundColor(this.slot.buildingId !== null ? this.mood.color : '#FFFFFF00')
          .opacity(this.slot.buildingId !== null ? 0.42 : 0)
          .shadow({
            radius: this.slot.buildingId !== null ? 10 : 0,
            color: '#F7FBF866',
            offsetY: 2
          })
      }
    }
    .width(this.getHitSize())
    .height(this.getHitSize())
    .borderRadius(this.getHitSize() / 2)
    .backgroundColor('#00FFFFFF')
    .scale({ x: this.pulseScale, y: this.pulseScale })
    .position({ x: this.getPositionX(), y: this.getPositionY() })
    .zIndex(this.pendingPlacementCardId.length > 0 ? 8 : 1)
    .animation({ duration: 680, curve: Curve.FastOutSlowIn })
    .onClick(() => {
      this.placePendingCard();
      this.pulseScale = this.pulseScale > 1 ? 0.98 : 1.04;
    })
  }
}

@Component
export struct TownScene {
  @Prop mood: MoodOption = peacefulMoodOption;
  @Prop isCompact: boolean = false;
  @Prop isWide: boolean = false;
  @Link slots: BuildingSlot[];
  @Link pendingPlacementCardId: string;
  @Link activeCard: PolaroidCard | undefined;

  private getBackgroundAsset(): Resource {
    if (this.isWide) {
      return $r('app.media.bg_town_tablet_landscape');
    }
    return $r('app.media.bg_town_phone');
  }

  build() {
    Stack() {
      Image(this.getBackgroundAsset())
        .width('100%')
        .height('100%')
        .objectFit(this.isWide ? ImageFit.Cover : ImageFit.Cover)

      Column()
        .width('100%')
        .height('100%')
        .backgroundColor(this.mood.landColorAlpha)
        .opacity(0.14)
        .animation({ duration: 760, curve: Curve.FastOutSlowIn })

      ForEach(this.slots, (slot: BuildingSlot) => {
        if (slot !== undefined) {
          SceneSlot({
            slot: slot,
            mood: this.mood,
            isCompact: this.isCompact,
            isWide: this.isWide,
            slots: this.slots,
            pendingPlacementCardId: this.pendingPlacementCardId,
            activeCard: this.activeCard
          })
        }
      }, (slot: BuildingSlot) => slot.slotId.toString())

      Column() {
        Blank()

        Text('纸船会在风里慢慢出发')
          .fontSize(this.isCompact ? 12 : 13)
          .fontColor('#627477')
          .opacity(0.52)
          .margin({ bottom: this.isCompact ? 22 : 28 })
      }
      .width('100%')
      .height('100%')
      .justifyContent(FlexAlign.End)
    }
    .width('100%')
    .height('100%')
  }
}
