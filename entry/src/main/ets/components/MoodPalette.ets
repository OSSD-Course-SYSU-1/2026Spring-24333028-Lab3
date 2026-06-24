import {
  CustomMoodColor,
  MoodDiaryEntry,
  MoodOption,
  buildCustomMood,
  customMoodColors,
  moodOptions,
  morningCustomColor
} from '../common/Models';

@Component
struct MoodTile {
  @Prop item: MoodOption;
  @Prop currentMood: MoodOption;
  @Prop isCompact: boolean = false;
  @Prop isWide: boolean = false;

  build() {
    Column() {
      Column()
        .width(this.isCompact ? 34 : this.isWide ? 48 : 40)
        .height(this.isCompact ? 34 : this.isWide ? 48 : 40)
        .borderRadius(this.isCompact ? 17 : this.isWide ? 24 : 20)
        .backgroundColor(this.item.color)
        .opacity(this.currentMood.id === this.item.id ? 1 : 0.72)
        .shadow({
          radius: this.currentMood.id === this.item.id ? 16 : 6,
          color: '#22506164',
          offsetY: 7
        })
        .animation({ duration: 480, curve: Curve.FastOutSlowIn })

      Text(this.item.name)
        .fontSize(this.isCompact ? 10 : 11)
        .fontColor('#5E7073')
        .margin({ top: 7 })
        .opacity(this.currentMood.id === this.item.id ? 1 : 0.72)
    }
    .width(this.isCompact ? 68 : this.isWide ? 94 : 78)
    .height(this.isCompact ? 68 : this.isWide ? 86 : 74)
    .justifyContent(FlexAlign.Center)
    .alignItems(HorizontalAlign.Center)
    .borderRadius(22)
    .backgroundColor(this.currentMood.id === this.item.id ? '#D8F7FBF8' : '#6EFFFFFF')
    .backdropBlur(12)
    .animation({ duration: 480, curve: Curve.FastOutSlowIn })
  }
}

@Component
struct CustomColorChip {
  @Prop item: CustomMoodColor;
  @Prop selected: boolean = false;

  build() {
    Row() {
      Column()
        .width(12)
        .height(12)
        .borderRadius(6)
        .backgroundColor(this.item.color)
        .opacity(0.9)

      Text(this.item.name)
        .fontSize(11)
        .fontColor('#5E7073')
        .margin({ left: 7 })
    }
    .padding({ left: 11, right: 12, top: 8, bottom: 8 })
    .borderRadius(17)
    .backgroundColor(this.selected ? '#D8F7FBF8' : '#70FFFFFF')
    .backdropBlur(10)
    .opacity(this.selected ? 1 : 0.74)
    .scale({ x: this.selected ? 1.03 : 1, y: this.selected ? 1.03 : 1 })
    .animation({ duration: 420, curve: Curve.EaseOut })
  }
}

@Component
export struct MoodPalette {
  @Link currentMood: MoodOption;
  @Link customMood: MoodOption;
  @Watch('onVisibleChange')
  @Link isVisible: boolean;
  @Link crystals: number;
  @Link hasMoodRewardedToday: boolean;
  @Link dailyNote: string;
  @Link diaryEntries: MoodDiaryEntry[];
  @Link hasSelectedMood: boolean;
  @Prop isCompact: boolean = false;
  @Prop isWide: boolean = false;
  @Prop todayKey: string = '';
  @Prop todayText: string = '';
  @State private showCustomEditor: boolean = false;
  @State private customNameDraft: string = '我的天气';
  @State private selectedColorId: string = morningCustomColor.id;
  @State private noteDraft: string = '';
  @State private cardScale: number = 0.96;

  aboutToAppear(): void {
    this.cardScale = 1;
    this.syncDraftFromState();
  }

  private onVisibleChange(): void {
    if (this.isVisible) {
      this.cardScale = 1;
      this.syncDraftFromState();
    }
  }

  private syncDraftFromState(): void {
    this.noteDraft = this.dailyNote;
    if (this.customMood.name.length > 0) {
      this.customNameDraft = this.customMood.name;
    }
  }

  private getSelectedCustomColor(): CustomMoodColor {
    for (let index = 0; index < customMoodColors.length; index++) {
      const item: CustomMoodColor | undefined = customMoodColors[index];
      if (item !== undefined && item.id === this.selectedColorId) {
        return item;
      }
    }
    return morningCustomColor;
  }

  private limitNote(value: string): string {
    if (value.length > 24) {
      return value.substring(0, 24);
    }
    return value;
  }

  private updateCustomMood(): void {
    const nextMood: MoodOption = buildCustomMood(this.customNameDraft, this.getSelectedCustomColor());
    this.customMood = nextMood;
    if (this.currentMood.id === 'custom') {
      this.currentMood = nextMood;
    }
  }

  private rewardMoodCrystal(): void {
    if (!this.hasMoodRewardedToday) {
      this.crystals += 3;
      this.hasMoodRewardedToday = true;
    }
  }

  private saveTodayDiary(): void {
    const nextEntry: MoodDiaryEntry = {
      dateKey: this.todayKey,
      dayText: this.todayText,
      moodId: this.currentMood.id,
      moodName: this.currentMood.name,
      moodColor: this.currentMood.color,
      weather: this.currentMood.weather,
      note: this.dailyNote
    };
    const nextEntries: MoodDiaryEntry[] = [];
    let hasUpdated: boolean = false;
    for (let index = 0; index < this.diaryEntries.length; index++) {
      const item: MoodDiaryEntry | undefined = this.diaryEntries[index];
      if (item === undefined) {
        continue;
      }
      if (item.dateKey === this.todayKey) {
        nextEntries.push(nextEntry);
        hasUpdated = true;
      } else {
        nextEntries.push(item);
      }
    }
    if (!hasUpdated) {
      nextEntries.push(nextEntry);
    }
    this.diaryEntries = nextEntries;
  }

  private closePanel(): void {
    this.showCustomEditor = false;
    this.isVisible = false;
  }

  private selectMood(item: MoodOption): void {
    // 这里只更新世界天气，不立即关闭弹窗，让玩家有时间写下今天的一句话。
    this.currentMood = item;
  }

  private confirmMoodRecord(): void {
    this.dailyNote = this.noteDraft.trim();
    this.saveTodayDiary();
    this.rewardMoodCrystal();
    this.hasSelectedMood = true;
    this.cardScale = 0.96;
    this.closePanel();
  }

  private confirmCustomMoodRecord(): void {
    this.updateCustomMood();
    this.currentMood = this.customMood;
    this.confirmMoodRecord();
  }

  build() {
    Stack({ alignContent: Alignment.Center }) {
      if (!this.showCustomEditor) {
        Column() {
          Row() {
            Column() {
              Text('今天是什么颜色？')
                .fontSize(this.isCompact ? 18 : this.isWide ? 24 : 20)
                .fontWeight(FontWeight.Medium)
                .fontColor('#56686B')

              Text('选一个心情，再写几个字留给小镇。')
                .fontSize(12)
                .fontColor('#849497')
                .margin({ top: 6 })
            }
            .alignItems(HorizontalAlign.Start)

            Blank()

            Text('稍后')
              .fontSize(13)
              .fontColor('#6E7E81')
              .padding({ left: 12, right: 12, top: 7, bottom: 7 })
              .borderRadius(16)
              .backgroundColor('#90F7FBF8')
              .onClick(() => {
                this.closePanel();
              })
          }
          .width('100%')
          .margin({ bottom: this.isCompact ? 16 : 20 })

          Flex({ wrap: FlexWrap.Wrap, justifyContent: FlexAlign.SpaceBetween }) {
            ForEach(moodOptions, (item: MoodOption) => {
              MoodTile({
                item: item,
                currentMood: this.currentMood,
                isCompact: this.isCompact,
                isWide: this.isWide
              })
                .margin({ bottom: this.isCompact ? 8 : 12 })
                .onClick(() => {
                  this.selectMood(item);
                })
            }, (item: MoodOption) => item.id)

            Column() {
              Stack() {
                Column()
                  .width(this.isCompact ? 34 : this.isWide ? 48 : 40)
                  .height(this.isCompact ? 34 : this.isWide ? 48 : 40)
                  .borderRadius(this.isCompact ? 17 : this.isWide ? 24 : 20)
                  .backgroundColor(this.customMood.color)
                  .opacity(0.86)

                Text('+')
                  .fontSize(20)
                  .fontColor('#617275')
              }

              Text('自定义')
                .fontSize(this.isCompact ? 10 : 11)
                .fontColor('#5E7073')
                .margin({ top: 7 })
            }
            .width(this.isCompact ? 68 : this.isWide ? 94 : 78)
            .height(this.isCompact ? 68 : this.isWide ? 86 : 74)
            .justifyContent(FlexAlign.Center)
            .alignItems(HorizontalAlign.Center)
            .borderRadius(22)
            .backgroundColor(this.currentMood.id === 'custom' ? '#D8F7FBF8' : '#6EFFFFFF')
            .backdropBlur(12)
            .onClick(() => {
              this.showCustomEditor = true;
            })
          }
          .width('100%')

          TextInput({ text: this.noteDraft, placeholder: '例如：今天慢慢放晴' })
            .height(44)
            .fontSize(14)
            .fontColor('#607174')
            .placeholderColor('#9AA8AA')
            .backgroundColor('#C8F7FBF8')
            .borderRadius(22)
            .padding({ left: 16, right: 16 })
            .margin({ top: 10 })
            .onChange((value: string) => {
              this.noteDraft = this.limitNote(value);
            })

          Row() {
            Row() {
              Column()
                .width(10)
                .height(10)
                .borderRadius(5)
                .backgroundColor(this.currentMood.color)
                .opacity(0.9)

              Text(this.currentMood.name)
                .fontSize(12)
                .fontColor('#657679')
                .margin({ left: 8 })
            }

            Blank()

            Text('收下今天')
              .fontSize(14)
              .fontColor('#56686B')
              .padding({ left: 18, right: 18, top: 9, bottom: 9 })
              .borderRadius(20)
              .backgroundColor('#D8EDF6F1')
              .backdropBlur(12)
              .onClick(() => {
                this.confirmMoodRecord();
              })
          }
          .width('100%')
          .margin({ top: 14 })
        }
        .width(this.isCompact ? '90%' : this.isWide ? '52%' : '78%')
        .padding({
          left: this.isCompact ? 16 : this.isWide ? 28 : 22,
          right: this.isCompact ? 16 : this.isWide ? 28 : 22,
          top: this.isCompact ? 18 : 22,
          bottom: this.isCompact ? 18 : 24
        })
        .borderRadius(28)
        .backgroundColor('#DBFDFEFA')
        .backdropBlur(22)
        .shadow({ radius: 28, color: '#2031464A', offsetY: 12 })
        .scale({ x: this.cardScale, y: this.cardScale })
        .animation({ duration: 560, curve: Curve.FastOutSlowIn })
      } else {
        Column() {
          Text('自定义心情')
            .fontSize(this.isCompact ? 18 : this.isWide ? 24 : 20)
            .fontWeight(FontWeight.Medium)
            .fontColor('#56686B')

          Text('给今天留一个只属于你的天气名字。')
            .fontSize(12)
            .fontColor('#849497')
            .margin({ top: 6, bottom: 18 })

          TextInput({ text: this.customNameDraft, placeholder: '例如：慢慢放晴' })
            .height(44)
            .fontSize(14)
            .fontColor('#607174')
            .placeholderColor('#9AA8AA')
            .backgroundColor('#C8F7FBF8')
            .borderRadius(22)
            .padding({ left: 16, right: 16 })
            .onChange((value: string) => {
              this.customNameDraft = value;
              this.updateCustomMood();
            })

          TextInput({ text: this.noteDraft, placeholder: '今天的一句话' })
            .height(44)
            .fontSize(14)
            .fontColor('#607174')
            .placeholderColor('#9AA8AA')
            .backgroundColor('#C8F7FBF8')
            .borderRadius(22)
            .padding({ left: 16, right: 16 })
            .margin({ top: 12 })
            .onChange((value: string) => {
              this.noteDraft = this.limitNote(value);
            })

          Flex({ wrap: FlexWrap.Wrap, justifyContent: FlexAlign.Start }) {
            ForEach(customMoodColors, (item: CustomMoodColor) => {
              CustomColorChip({
                item: item,
                selected: this.selectedColorId === item.id
              })
                .margin({ right: 10, bottom: 10 })
                .onClick(() => {
                  this.selectedColorId = item.id;
                  this.updateCustomMood();
                })
            }, (item: CustomMoodColor) => item.id)
          }
          .width('100%')
          .margin({ top: 16, bottom: 12 })

          Row() {
            Text('返回')
              .fontSize(14)
              .fontColor('#6E7E81')
              .padding({ left: 18, right: 18, top: 9, bottom: 9 })
              .borderRadius(18)
              .backgroundColor('#90F7FBF8')
              .onClick(() => {
                this.showCustomEditor = false;
              })

            Blank()

            Text('收下今天')
              .fontSize(14)
              .fontColor('#57686B')
              .padding({ left: 18, right: 18, top: 9, bottom: 9 })
              .borderRadius(18)
              .backgroundColor('#D8EDF6F1')
              .backdropBlur(12)
              .onClick(() => {
                this.confirmCustomMoodRecord();
              })
          }
          .width('100%')
        }
        .width(this.isCompact ? '90%' : this.isWide ? '48%' : '76%')
        .padding({
          left: this.isCompact ? 16 : this.isWide ? 28 : 22,
          right: this.isCompact ? 16 : this.isWide ? 28 : 22,
          top: this.isCompact ? 18 : 22,
          bottom: this.isCompact ? 18 : 22
        })
        .borderRadius(28)
        .backgroundColor('#DBFDFEFA')
        .backdropBlur(22)
        .shadow({ radius: 28, color: '#2031464A', offsetY: 12 })
        .scale({ x: this.cardScale, y: this.cardScale })
        .animation({ duration: 560, curve: Curve.FastOutSlowIn })
      }
    }
    .width('100%')
    .height('100%')
  }
}
