import { MoodOption, peacefulMoodOption } from '../common/Models';

@Component
export struct WindowWiper {
  @Link isWiped: boolean;
  @Prop mood: MoodOption = peacefulMoodOption;
  @Prop isCompact: boolean = false;
  @Prop isWide: boolean = false;
  @State private fogOpacity: number = 0.94;
  @State private hintOpacity: number = 1;
  private totalDistance: number = 0;
  private gestureStartOpacity: number = 0.94;

  private updateFogBySwipe(deltaX: number, deltaY: number): void {
    if (this.isWiped) {
      return;
    }
    const distance: number = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    this.totalDistance += distance;
    const nextOpacity: number = this.gestureStartOpacity - Math.min(this.totalDistance / 720, this.gestureStartOpacity);
    this.fogOpacity = Math.max(0, nextOpacity);
    this.hintOpacity = Math.max(0, this.fogOpacity - 0.12);
    if (this.fogOpacity <= 0.06) {
      this.fogOpacity = 0;
      this.hintOpacity = 0;
      this.isWiped = true;
    }
  }

  build() {
    Stack({ alignContent: Alignment.Center }) {
      Column()
        .width('100%')
        .height('100%')
        .backgroundColor(this.mood.fogColor)
        .opacity(this.fogOpacity)
        .backdropBlur(this.isWide ? 28 : 22)
        .animation({ duration: 620, curve: Curve.EaseOut })

      Column() {
        Text('轻轻擦亮今天')
          .fontSize(this.isCompact ? 18 : this.isWide ? 24 : 20)
          .fontWeight(FontWeight.Medium)
          .fontColor('#627376')

        Text('让雾慢慢散开，小镇会自己醒来')
          .fontSize(this.isCompact ? 12 : 13)
          .fontColor('#8C9A9D')
          .margin({ top: 8 })

        Text(this.mood.name)
          .fontSize(12)
          .fontColor('#718285')
          .padding({ left: 12, right: 12, top: 6, bottom: 6 })
          .borderRadius(16)
          .backgroundColor('#FFFFFF99')
          .backdropBlur(12)
          .margin({ top: 18 })
      }
      .alignItems(HorizontalAlign.Center)
      .opacity(this.hintOpacity)
      .animation({ duration: 520, curve: Curve.FastOutSlowIn })
    }
    .width('100%')
    .height('100%')
    .gesture(
      PanGesture()
        .onActionStart(() => {
          this.totalDistance = 0;
          this.gestureStartOpacity = this.fogOpacity;
        })
        .onActionUpdate((event: GestureEvent) => {
          if (!event) {
            return;
          }
          // 用更克制的整层雾幕递减，替代之前生硬的伪局部擦除手感。
          this.updateFogBySwipe(Math.abs(event.offsetX), Math.abs(event.offsetY));
        })
        .onActionEnd(() => {
          this.totalDistance = 0;
        })
    )
  }
}
