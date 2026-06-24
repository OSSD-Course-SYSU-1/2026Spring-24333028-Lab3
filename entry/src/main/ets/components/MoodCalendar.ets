import { MoodDiaryEntry, plazaQuotes } from '../common/Models';

const weekLabels: string[] = ['一', '二', '三', '四', '五', '六', '日'];
const monthDays: number[] = [
  1, 2, 3, 4, 5, 6, 7,
  8, 9, 10, 11, 12, 13, 14,
  15, 16, 17, 18, 19, 20, 21,
  22, 23, 24, 25, 26, 27, 28,
  29, 30, 31
];

@Component
struct CalendarDayCell {
  @Prop day: number = 1;
  @Prop moodColor: string = '#88FFFFFF';
  @Prop hasEntry: boolean = false;
  @Prop selected: boolean = false;
  @Prop visible: boolean = true;
  @Prop isCompact: boolean = false;

  build() {
    Column() {
      Text(`${this.day}`)
        .fontSize(this.isCompact ? 10 : 11)
        .fontColor(this.hasEntry ? '#506164' : '#A4AFB1')
        .opacity(this.visible ? 1 : 0)

      Column()
        .width(this.selected ? 18 : 12)
        .height(this.selected ? 18 : 12)
        .borderRadius(this.selected ? 9 : 6)
        .backgroundColor(this.hasEntry ? this.moodColor : '#82FFFFFF')
        .opacity(this.visible ? (this.hasEntry ? 0.92 : 0.46) : 0)
        .margin({ top: 5 })
        .shadow({
          radius: this.selected ? 12 : 3,
          color: this.hasEntry ? '#22506164' : '#10506164',
          offsetY: 4
        })
        .animation({ duration: 460, curve: Curve.FastOutSlowIn })
    }
    .width('14.2%')
    .height(this.isCompact ? 48 : 54)
    .justifyContent(FlexAlign.Center)
    .alignItems(HorizontalAlign.Center)
    .borderRadius(18)
    .backgroundColor(this.selected ? '#C8F7FBF8' : '#00FFFFFF')
    .opacity(this.visible ? 1 : 0)
    .animation({ duration: 460, curve: Curve.EaseOut })
  }
}

@Component
export struct MoodCalendar {
  @Prop entries: MoodDiaryEntry[] = [];
  @Link isVisible: boolean;
  @Prop isCompact: boolean = false;
  @Prop isWide: boolean = false;
  @Prop showClose: boolean = true;
  @State private selectedDateKey: string = '';
  @State private cardScale: number = 0.96;
  @State private quoteIndex: number = 0;

  aboutToAppear(): void {
    this.cardScale = 1;
    this.selectedDateKey = this.getTodayKey();
  }

  private twoDigit(value: number): string {
    if (value < 10) {
      return `0${value}`;
    }
    return `${value}`;
  }

  private getYear(): number {
    const now: Date = new Date();
    return now.getFullYear();
  }

  private getMonth(): number {
    const now: Date = new Date();
    return now.getMonth() + 1;
  }

  private getMonthPrefix(): string {
    return `${this.getYear()}-${this.twoDigit(this.getMonth())}`;
  }

  private getTodayKey(): string {
    const now: Date = new Date();
    return `${this.getMonthPrefix()}-${this.twoDigit(now.getDate())}`;
  }

  private getDateKey(day: number): string {
    return `${this.getMonthPrefix()}-${this.twoDigit(day)}`;
  }

  private getDaysInMonth(): number {
    const now: Date = new Date();
    return new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  }

  private getEntryByKey(dateKey: string): MoodDiaryEntry | undefined {
    for (let index = 0; index < this.entries.length; index++) {
      const item: MoodDiaryEntry | undefined = this.entries[index];
      if (item !== undefined && item.dateKey === dateKey) {
        return item;
      }
    }
    return undefined;
  }

  private getEntryByDay(day: number): MoodDiaryEntry | undefined {
    return this.getEntryByKey(this.getDateKey(day));
  }

  private getSelectedEntry(): MoodDiaryEntry | undefined {
    return this.getEntryByKey(this.selectedDateKey);
  }

  private getMonthEntryCount(): number {
    let count: number = 0;
    const prefix: string = this.getMonthPrefix();
    for (let index = 0; index < this.entries.length; index++) {
      const item: MoodDiaryEntry | undefined = this.entries[index];
      if (item !== undefined && item.dateKey.indexOf(prefix) === 0) {
        count += 1;
      }
    }
    return count;
  }

  private hasEntryOnDay(day: number): boolean {
    return this.getEntryByDay(day) !== undefined;
  }

  private getLongestStreak(): number {
    let longest: number = 0;
    let current: number = 0;
    const days: number = this.getDaysInMonth();
    for (let day = 1; day <= days; day++) {
      if (this.hasEntryOnDay(day)) {
        current += 1;
        if (current > longest) {
          longest = current;
        }
      } else {
        current = 0;
      }
    }
    return longest;
  }

  private getQuote(): string {
    const item: string | undefined = plazaQuotes[this.quoteIndex % plazaQuotes.length];
    if (item === undefined) {
      return '愿你慢慢来，也一样抵达。';
    }
    return item;
  }

  private showNextQuote(): void {
    this.quoteIndex += 1;
  }

  private getSelectedMoodName(): string {
    const item: MoodDiaryEntry | undefined = this.getSelectedEntry();
    if (item === undefined) {
      return '还没有记录';
    }
    return `${item.moodName} · ${item.weather}`;
  }

  private getSelectedNote(): string {
    const item: MoodDiaryEntry | undefined = this.getSelectedEntry();
    if (item === undefined) {
      return '这一天还很安静，等你来留下一点颜色。';
    }
    if (item.note.trim().length === 0) {
      return '这一天只留下了一种颜色。';
    }
    return item.note;
  }

  private getSelectedDayText(): string {
    const item: MoodDiaryEntry | undefined = this.getSelectedEntry();
    if (item !== undefined) {
      return item.dayText;
    }
    return this.selectedDateKey.length > 8 ? `${this.selectedDateKey.substring(5, 7)}月${this.selectedDateKey.substring(8, 10)}日` : '今天';
  }

  build() {
    Column() {
      Row() {
        Column() {
          Text('心情日历')
            .fontSize(this.isCompact ? 19 : this.isWide ? 25 : 21)
            .fontWeight(FontWeight.Medium)
            .fontColor('#506164')

          Text(`${this.getMonth()}月已经收集了 ${this.getMonthEntryCount()} 天颜色`)
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
            .backgroundColor('#90F7FBF8')
            .onClick(() => {
              this.isVisible = false;
            })
        }
      }
      .width('100%')
      .margin({ bottom: 18 })

      Column() {
        Row() {
          Text('月度色谱')
            .fontSize(13)
            .fontColor('#506164')
            .fontWeight(FontWeight.Medium)

          Blank()

          Text(`连续记录 ${this.getLongestStreak()} 天`)
            .fontSize(12)
            .fontColor('#7E8E90')
        }
        .width('100%')

        Row() {
          ForEach(monthDays, (day: number) => {
            Column()
              .width(this.isCompact ? 7 : 8)
              .height(this.isCompact ? 26 : 30)
              .borderRadius(5)
              .backgroundColor(this.getEntryByDay(day)?.moodColor ?? '#88FFFFFF')
              .opacity(day <= this.getDaysInMonth() ? (this.hasEntryOnDay(day) ? 0.92 : 0.36) : 0)
              .margin({ right: 3 })
              .animation({ duration: 420, curve: Curve.EaseOut })
          }, (day: number) => `spectrum-${day}`)
        }
        .width('100%')
        .margin({ top: 12 })
      }
      .padding({ left: 14, right: 14, top: 12, bottom: 12 })
      .borderRadius(22)
      .backgroundColor('#B8F7FBF8')
      .backdropBlur(14)
      .margin({ bottom: 14 })

      Row() {
        ForEach(weekLabels, (label: string) => {
          Text(label)
            .width('14.2%')
            .fontSize(11)
            .fontColor('#9AA8AA')
            .textAlign(TextAlign.Center)
        }, (label: string) => label)
      }
      .width('100%')
      .margin({ bottom: 4 })

      Flex({ wrap: FlexWrap.Wrap, justifyContent: FlexAlign.Start }) {
        ForEach(monthDays, (day: number) => {
          CalendarDayCell({
            day: day,
            moodColor: this.getEntryByDay(day)?.moodColor ?? '#88FFFFFF',
            hasEntry: this.getEntryByDay(day) !== undefined,
            selected: this.selectedDateKey === this.getDateKey(day),
            visible: day <= this.getDaysInMonth(),
            isCompact: this.isCompact
          })
            .onClick(() => {
              if (day <= this.getDaysInMonth()) {
                this.selectedDateKey = this.getDateKey(day);
              }
            })
        }, (day: number) => day.toString())
      }
      .width('100%')

      Column() {
        Row() {
          Column()
            .width(12)
            .height(12)
            .borderRadius(6)
            .backgroundColor(this.getSelectedEntry()?.moodColor ?? '#DDE8E2')
            .opacity(0.9)

          Text(this.getSelectedDayText())
            .fontSize(12)
            .fontColor('#6E7E81')
            .margin({ left: 8 })

          Blank()

          Text(this.getSelectedMoodName())
            .fontSize(12)
            .fontColor('#6E7E81')
        }
        .width('100%')

        Text(this.getSelectedNote())
          .fontSize(14)
          .fontColor('#506164')
          .lineHeight(22)
          .margin({ top: 12 })
          .width('100%')
      }
      .padding({ left: 16, right: 16, top: 14, bottom: 14 })
      .borderRadius(22)
      .backgroundColor('#C8F7FBF8')
      .backdropBlur(14)
      .margin({ top: 16 })
      .animation({ duration: 500, curve: Curve.EaseOut })

      Column() {
        Row() {
          Text('匿名信件回访')
            .fontSize(13)
            .fontColor('#506164')
            .fontWeight(FontWeight.Medium)

          Blank()

          Text('换一句')
            .fontSize(12)
            .fontColor('#6E7E81')
            .padding({ left: 10, right: 10, top: 5, bottom: 5 })
            .borderRadius(14)
            .backgroundColor('#90FFFFFF')
            .onClick(() => {
              this.showNextQuote();
            })
        }
        .width('100%')

        Text(this.getQuote())
          .fontSize(13)
          .fontColor('#607174')
          .lineHeight(20)
          .margin({ top: 10 })
          .width('100%')
      }
      .padding({ left: 16, right: 16, top: 14, bottom: 14 })
      .borderRadius(22)
      .backgroundColor('#C8F7FBF8')
      .backdropBlur(14)
      .margin({ top: 14 })
    }
    .width(this.isCompact ? '90%' : this.isWide ? '46%' : '76%')
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
    .scale({ x: this.cardScale, y: this.cardScale })
    .animation({ duration: 560, curve: Curve.FastOutSlowIn })
  }
}
