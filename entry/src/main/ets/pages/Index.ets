import preferences from '@ohos.data.preferences';
import common from '@ohos.app.ability.common';
import mediaquery from '@ohos.mediaquery';
import {
  BuildingSlot,
  CollectedCard,
  MoodDiaryEntry,
  MoodOption,
  PolaroidCard,
  WishNote,
  buildCustomMood,
  clonePolaroidCard,
  initialBuildingSlots,
  morningCustomColor,
  peacefulMoodOption,
  polaroidPool,
  plazaQuotes,
  seedMoodDiaryEntries
} from '../common/Models';
import { WindowWiper } from '../components/WindowWiper';
import { MoodPalette } from '../components/MoodPalette';
import { MoodCalendar } from '../components/MoodCalendar';
import { GreenhouseGallery } from '../components/GreenhouseGallery';
import { TownScene } from '../components/TownScene';
import { PolaroidGacha } from '../components/PolaroidGacha';
import { JourneyMap } from '../components/JourneyMap';

@Component
struct DreamTabItem {
  @Prop labelText: string = '';
  @Prop isSelected: boolean = false;
  @Prop isCompact: boolean = false;
  @Prop accentColor: string = '#A8D8EA';

  build() {
    Column() {
      Column()
        .width(this.isSelected ? 22 : 6)
        .height(4)
        .borderRadius(2)
        .backgroundColor(this.isSelected ? this.accentColor : '#80AEBBBC')
        .opacity(this.isSelected ? 0.92 : 0.42)
        .animation({ duration: 420, curve: Curve.FastOutSlowIn })

      Text(this.labelText)
        .fontSize(this.isCompact ? 11 : 12)
        .fontColor(this.isSelected ? '#506164' : '#7E8E90')
        .fontWeight(this.isSelected ? FontWeight.Medium : FontWeight.Regular)
        .margin({ top: 6 })
    }
    .width(this.isCompact ? 58 : 72)
    .padding({ left: 8, right: 8, top: 8, bottom: 8 })
    .borderRadius(22)
    .backgroundColor(this.isSelected ? '#CCFDFEFA' : '#55FFFFFF')
    .backdropBlur(14)
    .shadow({
      radius: this.isSelected ? 14 : 0,
      color: '#1831464A',
      offsetY: 6
    })
    .animation({ duration: 460, curve: Curve.FastOutSlowIn })
  }
}

@Entry
@Component
struct Index {
  @State private currentMood: MoodOption = peacefulMoodOption;
  @State private customMood: MoodOption = buildCustomMood('我的天气', morningCustomColor);
  @State private showGacha: boolean = false;
  @State private showMoodWheel: boolean = false;
  @State private worldOpacity: number = 0;
  @State private crystals: number = 0;
  @State private hasMoodRewardedToday: boolean = false;
  @State private dailyNote: string = '';
  @State private showMoodCalendar: boolean = false;
  @State private showGreenhouse: boolean = false;
  @State private showWishPanel: boolean = false;
  @State private showPaperPanel: boolean = false;
  @State private wishDraft: string = '';
  @State private paperQuoteIndex: number = 0;
  @State private transferOffsetX: number = 0;
  @State private transferFlyX: number = 0;
  @State private transferFlyY: number = 0;
  @State private transferFoldScale: number = 1;
  @State private transferPlaneTilt: number = 0;
  @State private isTransferFlying: boolean = false;
  @State private transferStatus: string = '按住纸条向右滑，寄给附近的小镇';
  @State private sentPackageCount: number = 0;
  @State private activeTab: string = 'town';
  @State
  @Watch('onDiaryEntriesChange')
  private diaryEntries: MoodDiaryEntry[] = seedMoodDiaryEntries;
  @State
  @Watch('onCollectedCardsChange')
  private collectedCards: CollectedCard[] = [];
  @State
  @Watch('onWishNotesChange')
  private wishNotes: WishNote[] = [];
  @State private activeCard: PolaroidCard | undefined = undefined;
  @State private pendingPlacementCardId: string = '';
  @State
  @Watch('onSlotsChange')
  private slots: BuildingSlot[] = initialBuildingSlots;
  @State private drawSeed: number = 0;
  @State
  @Watch('onWindowWipedChange')
  private isWindowWiped: boolean = false;
  @State
  @Watch('onMoodSelectedChange')
  private hasSelectedMood: boolean = false;
  @State private isCompact: boolean = false;
  @State private isWide: boolean = false;
  private compactListener: mediaquery.MediaQueryListener = mediaquery.matchMediaSync('(width <= 480vp)');
  private wideListener: mediaquery.MediaQueryListener = mediaquery.matchMediaSync('(width >= 840vp)');
  private diaryPreferences: preferences.Preferences | undefined = undefined;
  private hasLoadedDiaryStore: boolean = false;
  private readonly diaryStoreName: string = 'dream_journey_diary';
  private readonly diaryEntriesKey: string = 'mood_diary_entries';
  private readonly collectedCardsKey: string = 'collected_cards';
  private readonly buildingSlotsKey: string = 'building_slots';
  private readonly wishNotesKey: string = 'wish_notes';

  aboutToAppear(): void {
    this.worldOpacity = 1;
    this.isCompact = this.compactListener.matches;
    this.isWide = this.wideListener.matches;
    this.compactListener.on('change', (result: mediaquery.MediaQueryResult) => {
      this.isCompact = result.matches;
    });
    this.wideListener.on('change', (result: mediaquery.MediaQueryResult) => {
      this.isWide = result.matches;
    });
    this.loadDiaryEntries();
  }

  aboutToDisappear(): void {
    this.compactListener.off('change');
    this.wideListener.off('change');
  }

  private onWindowWipedChange(): void {
    if (this.isWindowWiped && !this.hasSelectedMood) {
      this.showMoodWheel = true;
      this.showGacha = false;
      this.activeTab = 'town';
    }
  }

  private onMoodSelectedChange(): void {
    if (this.hasSelectedMood) {
      this.showMoodWheel = false;
    }
  }

  private getTodayDiaryEntry(): MoodDiaryEntry | undefined {
    const todayKey: string = this.getTodayKey();
    for (let index = 0; index < this.diaryEntries.length; index++) {
      const item: MoodDiaryEntry | undefined = this.diaryEntries[index];
      if (item !== undefined && item.dateKey === todayKey) {
        return item;
      }
    }
    return undefined;
  }

  private onDiaryEntriesChange(): void {
    if (this.hasLoadedDiaryStore) {
      this.persistDiaryEntries();
    }
  }

  private onCollectedCardsChange(): void {
    if (this.hasLoadedDiaryStore) {
      this.persistCollectedCards();
    }
  }

  private onSlotsChange(): void {
    if (this.hasLoadedDiaryStore) {
      this.persistBuildingSlots();
    }
  }

  private onWishNotesChange(): void {
    if (this.hasLoadedDiaryStore) {
      this.persistWishNotes();
    }
  }

  private encodeField(value: string): string {
    return encodeURIComponent(value);
  }

  private decodeField(value: string): string {
    try {
      return decodeURIComponent(value);
    } catch {
      return value;
    }
  }

  private serializeDiaryEntries(entries: MoodDiaryEntry[]): string {
    const rows: string[] = [];
    for (let index = 0; index < entries.length; index++) {
      const item: MoodDiaryEntry | undefined = entries[index];
      if (item === undefined) {
        continue;
      }
      rows.push([
        this.encodeField(item.dateKey),
        this.encodeField(item.dayText),
        this.encodeField(item.moodId),
        this.encodeField(item.moodName),
        this.encodeField(item.moodColor),
        this.encodeField(item.weather),
        this.encodeField(item.note)
      ].join('|'));
    }
    return rows.join('\n');
  }

  private deserializeDiaryEntries(content: string): MoodDiaryEntry[] {
    const rows: string[] = content.split('\n');
    const entries: MoodDiaryEntry[] = [];
    for (let index = 0; index < rows.length; index++) {
      const row: string | undefined = rows[index];
      if (row === undefined || row.trim().length === 0) {
        continue;
      }
      const fields: string[] = row.split('|');
      if (fields.length < 7) {
        continue;
      }
      const dateKey: string | undefined = fields[0];
      const dayText: string | undefined = fields[1];
      const moodId: string | undefined = fields[2];
      const moodName: string | undefined = fields[3];
      const moodColor: string | undefined = fields[4];
      const weather: string | undefined = fields[5];
      const note: string | undefined = fields[6];
      if (
        dateKey === undefined ||
        dayText === undefined ||
        moodId === undefined ||
        moodName === undefined ||
        moodColor === undefined ||
        weather === undefined ||
        note === undefined
      ) {
        continue;
      }
      entries.push({
        dateKey: this.decodeField(dateKey),
        dayText: this.decodeField(dayText),
        moodId: this.decodeField(moodId),
        moodName: this.decodeField(moodName),
        moodColor: this.decodeField(moodColor),
        weather: this.decodeField(weather),
        note: this.decodeField(note)
      });
    }
    return entries;
  }

  private serializeCollectedCards(cards: CollectedCard[]): string {
    const rows: string[] = [];
    for (let index = 0; index < cards.length; index++) {
      const item: CollectedCard | undefined = cards[index];
      if (item === undefined) {
        continue;
      }
      rows.push([
        this.encodeField(item.cardId),
        this.encodeField(item.unlockDate)
      ].join('|'));
    }
    return rows.join('\n');
  }

  private deserializeCollectedCards(content: string): CollectedCard[] {
    const rows: string[] = content.split('\n');
    const cards: CollectedCard[] = [];
    for (let index = 0; index < rows.length; index++) {
      const row: string | undefined = rows[index];
      if (row === undefined || row.trim().length === 0) {
        continue;
      }
      const fields: string[] = row.split('|');
      const cardId: string | undefined = fields[0];
      const unlockDate: string | undefined = fields[1];
      if (cardId === undefined || unlockDate === undefined) {
        continue;
      }
      cards.push({
        cardId: this.decodeField(cardId),
        unlockDate: this.decodeField(unlockDate)
      });
    }
    return cards;
  }

  private serializeBuildingSlots(slots: BuildingSlot[]): string {
    const rows: string[] = [];
    for (let index = 0; index < slots.length; index++) {
      const item: BuildingSlot | undefined = slots[index];
      if (item === undefined) {
        continue;
      }
      rows.push([
        this.encodeField(item.slotId.toString()),
        this.encodeField(item.buildingId === null ? '' : item.buildingId),
        this.encodeField(item.positionX),
        this.encodeField(item.positionY)
      ].join('|'));
    }
    return rows.join('\n');
  }

  private deserializeBuildingSlots(content: string): BuildingSlot[] {
    const rows: string[] = content.split('\n');
    const slots: BuildingSlot[] = [];
    for (let index = 0; index < rows.length; index++) {
      const row: string | undefined = rows[index];
      if (row === undefined || row.trim().length === 0) {
        continue;
      }
      const fields: string[] = row.split('|');
      const slotIdText: string | undefined = fields[0];
      const buildingIdText: string | undefined = fields[1];
      const positionX: string | undefined = fields[2];
      const positionY: string | undefined = fields[3];
      if (
        slotIdText === undefined ||
        buildingIdText === undefined ||
        positionX === undefined ||
        positionY === undefined
      ) {
        continue;
      }
      const slotId: number = Number(this.decodeField(slotIdText));
      if (Number.isNaN(slotId)) {
        continue;
      }
      const decodedBuildingId: string = this.decodeField(buildingIdText);
      slots.push({
        slotId: slotId,
        buildingId: decodedBuildingId.length > 0 ? decodedBuildingId : null,
        positionX: this.decodeField(positionX),
        positionY: this.decodeField(positionY)
      });
    }
    return slots.length > 0 ? slots : initialBuildingSlots;
  }

  private serializeWishNotes(notes: WishNote[]): string {
    const rows: string[] = [];
    for (let index = 0; index < notes.length; index++) {
      const item: WishNote | undefined = notes[index];
      if (item === undefined) {
        continue;
      }
      rows.push([
        this.encodeField(item.id),
        this.encodeField(item.text),
        this.encodeField(item.createDate)
      ].join('|'));
    }
    return rows.join('\n');
  }

  private deserializeWishNotes(content: string): WishNote[] {
    const rows: string[] = content.split('\n');
    const notes: WishNote[] = [];
    for (let index = 0; index < rows.length; index++) {
      const row: string | undefined = rows[index];
      if (row === undefined || row.trim().length === 0) {
        continue;
      }
      const fields: string[] = row.split('|');
      const id: string | undefined = fields[0];
      const text: string | undefined = fields[1];
      const createDate: string | undefined = fields[2];
      if (id === undefined || text === undefined || createDate === undefined) {
        continue;
      }
      notes.push({
        id: this.decodeField(id),
        text: this.decodeField(text),
        createDate: this.decodeField(createDate)
      });
    }
    return notes;
  }

  private loadDiaryEntries(): void {
    const context: common.UIAbilityContext = getContext(this) as common.UIAbilityContext;
    preferences.getPreferences(context, this.diaryStoreName)
      .then((store: preferences.Preferences) => {
        this.diaryPreferences = store;
        store.get(this.diaryEntriesKey, '')
          .then((value: preferences.ValueType) => {
            if (typeof value === 'string' && value.length > 0) {
              const entries: MoodDiaryEntry[] = this.deserializeDiaryEntries(value);
              if (entries.length > 0) {
                this.diaryEntries = entries;
              }
            }
            this.loadCollectedCards(store);
          })
          .catch(() => {
            this.loadCollectedCards(store);
          });
      })
      .catch(() => {
        this.hasLoadedDiaryStore = true;
      });
  }

  private loadCollectedCards(store: preferences.Preferences): void {
    store.get(this.collectedCardsKey, '')
      .then((value: preferences.ValueType) => {
        if (typeof value === 'string' && value.length > 0) {
          this.collectedCards = this.deserializeCollectedCards(value);
        }
        this.loadBuildingSlots(store);
      })
      .catch(() => {
        this.loadBuildingSlots(store);
      });
  }

  private loadBuildingSlots(store: preferences.Preferences): void {
    store.get(this.buildingSlotsKey, '')
      .then((value: preferences.ValueType) => {
        if (typeof value === 'string' && value.length > 0) {
          this.slots = this.deserializeBuildingSlots(value);
        }
        this.loadWishNotes(store);
      })
      .catch(() => {
        this.loadWishNotes(store);
      });
  }

  private loadWishNotes(store: preferences.Preferences): void {
    store.get(this.wishNotesKey, '')
      .then((value: preferences.ValueType) => {
        if (typeof value === 'string' && value.length > 0) {
          this.wishNotes = this.deserializeWishNotes(value);
        }
        this.hasLoadedDiaryStore = true;
        this.persistWishNotes();
      })
      .catch(() => {
        this.hasLoadedDiaryStore = true;
      });
  }

  private persistDiaryEntries(): void {
    const store: preferences.Preferences | undefined = this.diaryPreferences;
    if (store === undefined) {
      return;
    }
    store.put(this.diaryEntriesKey, this.serializeDiaryEntries(this.diaryEntries))
      .then(() => {
        store.flush();
      })
      .catch(() => {
      });
  }

  private persistCollectedCards(): void {
    const store: preferences.Preferences | undefined = this.diaryPreferences;
    if (store === undefined) {
      return;
    }
    store.put(this.collectedCardsKey, this.serializeCollectedCards(this.collectedCards))
      .then(() => {
        store.flush();
      })
      .catch(() => {
      });
  }

  private persistBuildingSlots(): void {
    const store: preferences.Preferences | undefined = this.diaryPreferences;
    if (store === undefined) {
      return;
    }
    store.put(this.buildingSlotsKey, this.serializeBuildingSlots(this.slots))
      .then(() => {
        store.flush();
      })
      .catch(() => {
      });
  }

  private persistWishNotes(): void {
    const store: preferences.Preferences | undefined = this.diaryPreferences;
    if (store === undefined) {
      return;
    }
    store.put(this.wishNotesKey, this.serializeWishNotes(this.wishNotes))
      .then(() => {
        store.flush();
      })
      .catch(() => {
      });
  }

  private getTodayText(): string {
    const now: Date = new Date();
    const month: number = now.getMonth() + 1;
    const day: number = now.getDate();
    return `${month}月${day}日`;
  }

  private twoDigit(value: number): string {
    if (value < 10) {
      return `0${value}`;
    }
    return `${value}`;
  }

  private getTodayKey(): string {
    const now: Date = new Date();
    const year: number = now.getFullYear();
    const month: number = now.getMonth() + 1;
    const day: number = now.getDate();
    return `${year}-${this.twoDigit(month)}-${this.twoDigit(day)}`;
  }

  private canOpenGacha(): boolean {
    return this.isWindowWiped && this.hasSelectedMood;
  }

  private getDrawSourceCard(index: number): PolaroidCard | undefined {
    if (index < 0 || index >= polaroidPool.length) {
      return undefined;
    }
    return polaroidPool[index];
  }

  private getGachaEntryLabel(): string {
    if (!this.isWindowWiped) {
      return '先擦亮';
    }
    if (!this.hasSelectedMood) {
      return '选心情';
    }
    return this.showGacha ? '回到小镇' : '显影';
  }

  private getMoodEntryLabel(): string {
    return this.hasSelectedMood ? '调整心情' : '记录心情';
  }

  private getMoodEntryHint(): string {
    if (!this.hasSelectedMood) {
      return '选一个颜色，再给今天留一句很短的话。';
    }
    if (this.dailyNote.trim().length > 0) {
      return `“${this.dailyNote.trim()}”`;
    }
    return this.currentMood.hint;
  }

  private getGachaActionText(): string {
    if (this.crystals > 0) {
      return '消耗 1 枚结晶抽取拍立得';
    }
    if (this.pendingPlacementCardId.length > 0) {
      return '回到小镇，点亮一个空槽位';
    }
    return '先记录心情，获得情绪结晶';
  }

  private openMoodPalette(): void {
    const todayEntry: MoodDiaryEntry | undefined = this.getTodayDiaryEntry();
    if (todayEntry !== undefined) {
      this.dailyNote = todayEntry.note;
    }
    this.showMoodCalendar = false;
    this.showGreenhouse = false;
    this.showGacha = false;
    this.showWishPanel = false;
    this.showPaperPanel = false;
    this.activeTab = 'town';
    this.showMoodWheel = true;
  }

  private openMoodCalendar(): void {
    if (!this.isWindowWiped) {
      return;
    }
    this.showMoodWheel = false;
    this.showGreenhouse = false;
    this.showMoodCalendar = true;
    this.showGacha = false;
    this.showWishPanel = false;
    this.showPaperPanel = false;
    this.activeTab = 'diary';
  }

  private openGreenhouse(): void {
    if (!this.isWindowWiped) {
      return;
    }
    this.showMoodWheel = false;
    this.showMoodCalendar = false;
    this.showGreenhouse = true;
    this.showGacha = false;
    this.showWishPanel = false;
    this.showPaperPanel = false;
    this.activeTab = 'greenhouse';
  }

  private openJourney(): void {
    if (!this.isWindowWiped) {
      return;
    }
    this.showMoodWheel = false;
    this.showMoodCalendar = false;
    this.showGreenhouse = false;
    this.showGacha = false;
    this.showWishPanel = false;
    this.showPaperPanel = false;
    this.activeTab = 'journey';
  }

  private toggleGachaPanel(): void {
    if (!this.isWindowWiped) {
      return;
    }
    if (!this.hasSelectedMood) {
      this.showMoodWheel = true;
      return;
    }
    this.showMoodCalendar = false;
    this.showGreenhouse = false;
    this.showWishPanel = false;
    this.showPaperPanel = false;
    this.showGacha = true;
    this.activeTab = 'gacha';
  }

  private openTownTab(): void {
    if (!this.isWindowWiped) {
      return;
    }
    this.showGacha = false;
    this.showMoodCalendar = false;
    this.showGreenhouse = false;
    this.showMoodWheel = false;
    this.showWishPanel = false;
    this.showPaperPanel = false;
    this.activeTab = 'town';
  }

  private getPaperQuote(): string {
    const quote: string | undefined = plazaQuotes[this.paperQuoteIndex % plazaQuotes.length];
    if (quote === undefined) {
      return '愿你慢慢来，也一样抵达。';
    }
    return quote;
  }

  private showNextPaperQuote(): void {
    this.paperQuoteIndex += 1;
    this.resetTransferLetter();
  }

  private openWishPanel(): void {
    this.showPaperPanel = false;
    this.showWishPanel = true;
  }

  private openPaperPanel(): void {
    this.showWishPanel = false;
    this.showPaperPanel = true;
    this.resetTransferLetter();
  }

  private resetTransferLetter(): void {
    this.transferOffsetX = 0;
    this.transferFlyX = 0;
    this.transferFlyY = 0;
    this.transferFoldScale = 1;
    this.transferPlaneTilt = 0;
    this.isTransferFlying = false;
    this.transferStatus = '按住纸条向右滑，寄给附近的小镇';
  }

  private updateTransferDrag(offsetX: number): void {
    const nextOffset: number = Math.max(0, Math.min(160, offsetX));
    this.transferOffsetX = nextOffset;
    if (nextOffset > 118) {
      this.transferStatus = '松手寄出这一张纸条';
    } else if (nextOffset > 48) {
      this.transferStatus = '正在靠近对方的小镇...';
    } else {
      this.transferStatus = '按住纸条向右滑，寄给附近的小镇';
    }
  }

  private finishTransferDrag(): void {
    if (this.transferOffsetX > 118) {
      this.sentPackageCount += 1;
      this.isTransferFlying = true;
      this.transferOffsetX = 126;
      this.transferFlyX = this.isCompact ? 210 : 260;
      this.transferFlyY = -92;
      this.transferFoldScale = 0.38;
      this.transferPlaneTilt = 24;
      this.transferStatus = '纸条折成纸飞机，正飞向附近的小镇';
      return;
    }
    this.resetTransferLetter();
  }

  private addWishNote(): void {
    const text: string = this.wishDraft.trim();
    if (text.length === 0) {
      return;
    }
    const nextNotes: WishNote[] = [];
    for (let index = 0; index < this.wishNotes.length; index++) {
      const item: WishNote | undefined = this.wishNotes[index];
      if (item !== undefined) {
        nextNotes.push(item);
      }
    }
    nextNotes.push({
      id: `${this.getTodayKey()}-${nextNotes.length + 1}`,
      text: text,
      createDate: this.getTodayText()
    });
    this.wishNotes = nextNotes;
    this.wishDraft = '';
  }

  private drawPolaroid(): void {
    if (this.crystals <= 0 || polaroidPool.length === 0) {
      return;
    }
    const poolIndex: number = this.drawSeed % polaroidPool.length;
    const sourceCard: PolaroidCard | undefined = this.getDrawSourceCard(poolIndex);
    if (sourceCard === undefined) {
      return;
    }
    const nextCard: PolaroidCard = clonePolaroidCard(sourceCard, this.getTodayText());
    this.activeCard = nextCard;
    this.pendingPlacementCardId = '';
    this.drawSeed += 1;
    this.crystals -= 1;
  }

  build() {
    Stack() {
      TownScene({
        mood: this.currentMood,
        isCompact: this.isCompact,
        isWide: this.isWide,
        slots: this.slots,
        pendingPlacementCardId: this.pendingPlacementCardId,
        activeCard: this.activeCard
      })
        .opacity(this.worldOpacity)
        .animation({ duration: 760, curve: Curve.FastOutSlowIn })

      if (!this.isWindowWiped) {
        WindowWiper({
          mood: this.currentMood,
          isCompact: this.isCompact,
          isWide: this.isWide,
          isWiped: this.isWindowWiped
        })
          .opacity(1)
          .animation({ duration: 680, curve: Curve.EaseOut })
      }

      if (this.isWindowWiped) {
        Row() {
          Column() {
            Text('DreamJourney')
              .fontSize(this.isCompact ? 22 : this.isWide ? 30 : 24)
              .fontWeight(FontWeight.Medium)
              .fontColor('#506164')

            Text('梦想之旅')
              .fontSize(this.isCompact ? 11 : 12)
              .fontColor('#7A8A8D')
              .opacity(0.9)
              .margin({ top: 3 })

            Row() {
              Text(this.getTodayText())
                .fontSize(11)
                .fontColor('#607174')

              Text(this.currentMood.weather)
                .fontSize(11)
                .fontColor('#7A8A8D')
                .margin({ left: 10 })
            }
            .padding({ left: 10, right: 12, top: 6, bottom: 6 })
            .borderRadius(16)
            .backgroundColor('#F7FBF8A8')
            .backdropBlur(12)
            .margin({ top: 8 })
          }
          .alignItems(HorizontalAlign.Start)

          Blank()
        }
        .width('100%')
        .padding({
          left: this.isCompact ? 18 : this.isWide ? 44 : 24,
          right: this.isCompact ? 18 : this.isWide ? 44 : 24,
          top: this.isCompact ? 28 : this.isWide ? 48 : 38
        })
        .align(Alignment.Top)
        .animation({ duration: 560, curve: Curve.EaseOut })
      }

      if (
        this.isWindowWiped &&
        this.activeTab === 'town' &&
        !this.showMoodWheel &&
        !this.showWishPanel &&
        !this.showPaperPanel
      ) {
        Column() {
          Row() {
            Column()
              .width(7)
              .height(7)
              .borderRadius(4)
              .backgroundColor(this.currentMood.color)
              .opacity(0.86)

            Text('心愿便笺')
              .fontSize(12)
              .fontColor('#5C6D70')
              .margin({ left: 8 })
          }
          .padding({ left: 13, right: 15, top: 8, bottom: 8 })
          .borderRadius(18)
          .backgroundColor('#FFF8E9C8')
          .backdropBlur(16)
          .shadow({ radius: 14, color: '#6B5D3C1C', offsetY: 6 })
          .rotate({ angle: -4 })
          .onClick(() => {
            this.openWishPanel();
          })

          Row() {
            Column()
              .width(7)
              .height(7)
              .borderRadius(4)
              .backgroundColor('#C7D9C8')
              .opacity(0.9)

            Text('树下纸条')
              .fontSize(12)
              .fontColor('#5C6D70')
              .margin({ left: 8 })
          }
          .padding({ left: 13, right: 15, top: 8, bottom: 8 })
          .borderRadius(18)
          .backgroundColor('#F7FBF8C8')
          .backdropBlur(16)
          .shadow({ radius: 14, color: '#31464A18', offsetY: 6 })
          .margin({ top: 8, left: 20 })
          .rotate({ angle: 3 })
          .onClick(() => {
            this.openPaperPanel();
          })
        }
        .position({ x: this.isCompact ? '58%' : this.isWide ? '60%' : '58%', y: this.isCompact ? '35%' : '32%' })
        .zIndex(6)
        .animation({ duration: 520, curve: Curve.EaseOut })

        Column() {
          Text(this.getMoodEntryHint())
            .fontSize(this.isCompact ? 12 : 13)
            .fontColor('#607174')
            .textAlign(TextAlign.Center)
            .maxLines(2)
            .opacity(0.9)
            .margin({ left: 18, right: 18, bottom: 12 })

          Row() {
            Column()
              .width(9)
              .height(9)
              .borderRadius(5)
              .backgroundColor(this.currentMood.color)
              .opacity(0.84)

            Text(this.getMoodEntryLabel())
              .fontSize(13)
              .fontColor('#607174')
              .margin({ left: 8 })
          }
          .padding({ left: 14, right: 14, top: 9, bottom: 9 })
          .borderRadius(20)
          .backgroundColor('#F7FBF8CC')
          .backdropBlur(16)
          .animation({ duration: 520, curve: Curve.EaseOut })
          .onClick(() => {
            this.openMoodPalette();
          })
        }
        .width(this.isWide ? '46%' : (this.isCompact ? '90%' : '82%'))
        .alignItems(HorizontalAlign.Center)
        .align(Alignment.Bottom)
        .margin({ bottom: this.isCompact ? 86 : this.isWide ? 112 : 96 })
        .animation({ duration: 620, curve: Curve.FastOutSlowIn })
      }

      if (this.isWindowWiped && this.activeTab === 'gacha') {
        Column() {
          Row() {
            Text(`情绪结晶 ${this.crystals}`)
              .fontSize(13)
              .fontColor('#607174')
              .padding({ left: 16, right: 16, top: 8, bottom: 8 })
              .borderRadius(18)
              .backgroundColor('#FFFFFF99')
              .backdropBlur(16)

            Blank()

            Text(this.pendingPlacementCardId.length > 0 ? '有建筑待放置' : '拍立得显影')
              .fontSize(12)
              .fontColor('#7E8E90')
          }
          .width(this.isWide ? '52%' : '86%')
          .margin({ bottom: 20 })

          PolaroidGacha({
            activeCard: this.activeCard,
            pendingPlacementCardId: this.pendingPlacementCardId,
            collectedCards: this.collectedCards
          })

          if (this.activeCard === undefined || this.activeCard.isRevealed) {
            Text(this.getGachaActionText())
              .fontSize(13)
              .fontColor('#607174')
              .padding({ left: 18, right: 18, top: 10, bottom: 10 })
              .borderRadius(22)
              .backgroundColor('#FFFFFFBB')
              .backdropBlur(16)
              .margin({ top: 18 })
              .opacity(0.96)
              .animation({ duration: 520, curve: Curve.EaseOut })
              .onClick(() => {
                if (this.crystals > 0) {
                  this.drawPolaroid();
                  return;
                }
                if (this.pendingPlacementCardId.length > 0) {
                  this.openTownTab();
                  return;
                }
              })
          }

          if (this.pendingPlacementCardId.length > 0) {
            Text('回小镇放置')
              .fontSize(13)
              .fontColor('#607174')
              .padding({ left: 18, right: 18, top: 9, bottom: 9 })
              .borderRadius(20)
              .backgroundColor('#F7FBF8C8')
              .backdropBlur(14)
              .margin({ top: 10 })
              .onClick(() => {
                this.openTownTab();
              })
          }
        }
        .width('100%')
        .height('100%')
        .justifyContent(FlexAlign.Center)
        .padding({ bottom: 86 })
        .backgroundColor('#EAF1F088')
        .backdropBlur(18)
        .opacity(this.activeTab === 'gacha' ? 1 : 0)
        .animation({ duration: 620, curve: Curve.FastOutSlowIn })
      }

      if (this.showMoodWheel) {
        Column() {
          MoodPalette({
            currentMood: this.currentMood,
            customMood: this.customMood,
            isVisible: this.showMoodWheel,
            crystals: this.crystals,
            hasMoodRewardedToday: this.hasMoodRewardedToday,
            dailyNote: this.dailyNote,
            diaryEntries: this.diaryEntries,
            todayKey: this.getTodayKey(),
            todayText: this.getTodayText(),
            hasSelectedMood: this.hasSelectedMood,
            isCompact: this.isCompact,
            isWide: this.isWide
          })
        }
        .width('100%')
        .height('100%')
        .justifyContent(FlexAlign.Center)
        .alignItems(HorizontalAlign.Center)
        .backgroundColor('#1F2D3028')
        .backdropBlur(18)
        .opacity(this.showMoodWheel ? 1 : 0)
        .animation({ duration: 560, curve: Curve.FastOutSlowIn })
      }

      if (this.showWishPanel) {
        Column() {
          Row() {
            Text('心愿便笺')
              .fontSize(19)
              .fontWeight(FontWeight.Medium)
              .fontColor('#506164')

            Blank()

            Text('收起')
              .fontSize(13)
              .fontColor('#6E7E81')
              .padding({ left: 12, right: 12, top: 7, bottom: 7 })
              .borderRadius(16)
              .backgroundColor('#F7FBF890')
              .onClick(() => {
                this.showWishPanel = false;
              })
          }
          .width('100%')

          Text('把一个愿望挂在心境之树上，不需要今天就实现。')
            .fontSize(12)
            .fontColor('#849497')
            .margin({ top: 8, bottom: 14 })
            .width('100%')

          TextInput({ text: this.wishDraft, placeholder: '例如：希望自己慢慢有勇气' })
            .height(44)
            .fontSize(14)
            .fontColor('#607174')
            .placeholderColor('#9AA8AA')
            .backgroundColor('#F7FBF8C8')
            .borderRadius(22)
            .padding({ left: 16, right: 16 })
            .onChange((value: string) => {
              this.wishDraft = value.length > 28 ? value.substring(0, 28) : value;
            })

          Text('挂上树梢')
            .fontSize(14)
            .fontColor('#56686B')
            .padding({ left: 18, right: 18, top: 9, bottom: 9 })
            .borderRadius(20)
            .backgroundColor('#EDF6F1D8')
            .backdropBlur(12)
            .margin({ top: 12 })
            .onClick(() => {
              this.addWishNote();
            })

          Scroll() {
            Column() {
              ForEach(this.wishNotes, (note: WishNote) => {
                Row() {
                  Column()
                    .width(8)
                    .height(8)
                    .borderRadius(4)
                    .backgroundColor(this.currentMood.color)
                    .opacity(0.82)

                  Column() {
                    Text(note.text)
                      .fontSize(13)
                      .fontColor('#506164')
                      .lineHeight(20)
                      .width('100%')

                    Text(note.createDate)
                      .fontSize(10)
                      .fontColor('#92A0A2')
                      .margin({ top: 4 })
                  }
                  .margin({ left: 10 })
                  .layoutWeight(1)
                }
                .width('100%')
                .padding({ left: 12, right: 12, top: 10, bottom: 10 })
                .borderRadius(18)
                .backgroundColor('#F7FBF8AA')
                .margin({ top: 10 })
              }, (note: WishNote) => note.id)
            }
          }
          .height(180)
          .scrollBar(BarState.Off)
          .margin({ top: 8 })
        }
        .width(this.isCompact ? '90%' : this.isWide ? '44%' : '76%')
        .padding({ left: 18, right: 18, top: 18, bottom: 18 })
        .borderRadius(28)
        .backgroundColor('#FDFEFADD')
        .backdropBlur(22)
        .shadow({ radius: 28, color: '#31464A20', offsetY: 12 })
        .align(Alignment.Center)
        .animation({ duration: 560, curve: Curve.FastOutSlowIn })
      }

      if (this.showPaperPanel) {
        Stack({ alignContent: Alignment.Center }) {
          Column()
            .width(this.isCompact ? '82%' : this.isWide ? '34%' : '64%')
            .height(this.isCompact ? 232 : 250)
            .borderRadius(24)
            .backgroundColor('#EEDFC7A8')
            .rotate({ angle: -3 })
            .translate({ x: -8, y: 10 })
            .shadow({ radius: 18, color: '#6B5D3C18', offsetY: 8 })

          Column()
            .width(this.isCompact ? '82%' : this.isWide ? '34%' : '64%')
            .height(this.isCompact ? 232 : 250)
            .borderRadius(24)
            .backgroundColor('#FFF9EACC')
            .rotate({ angle: 2 })
            .translate({ x: 8, y: 4 })

          Column() {
            Row() {
              Text('纸条from心情广场')
                .fontSize(18)
                .fontWeight(FontWeight.Medium)
                .fontColor('#506164')

              Blank()

              Text('收起')
                .fontSize(12)
                .fontColor('#6E7E81')
                .padding({ left: 11, right: 11, top: 6, bottom: 6 })
                .borderRadius(15)
                .backgroundColor('#F7FBF8A8')
                .onClick(() => {
                  this.showPaperPanel = false;
                })
            }
            .width('100%')

            Column()
              .width('100%')
              .height(1)
              .backgroundColor('#D8C99D66')
              .margin({ top: 12, bottom: 18 })

            Column() {
              if (this.isTransferFlying) {
                Column()
                  .width(74)
                  .height(2)
                  .borderRadius(1)
                  .backgroundColor('#88BFDCE8')
                  .opacity(0.72)
                  .rotate({ angle: -12 })
                  .translate({ x: -62, y: 18 })
                  .animation({ duration: 760, curve: Curve.EaseOut })
              }

              Row() {
                Column()
                  .width(8)
                  .height(8)
                  .borderRadius(4)
                  .backgroundColor(this.currentMood.color)
                  .opacity(0.82)

                Text(`流转包 ${this.sentPackageCount}`)
                  .fontSize(11)
                  .fontColor('#7E8E90')
                  .margin({ left: 7 })

                Blank()

                Text('右滑寄出')
                  .fontSize(11)
                  .fontColor('#7E8E90')
              }
              .width('100%')
              .opacity(this.isTransferFlying ? 0 : 1)

              if (this.isTransferFlying) {
                Stack({ alignContent: Alignment.Center }) {
                  Column()
                    .width(72)
                    .height(42)
                    .borderRadius(8)
                    .backgroundColor('#FDFEFACC')
                    .rotate({ angle: -18 })

                  Column()
                    .width(56)
                    .height(28)
                    .borderRadius(6)
                    .backgroundColor('#D8EDF6F1')
                    .rotate({ angle: 16 })

                  Text('纸飞机')
                    .fontSize(10)
                    .fontColor('#607174')
                }
                .width('100%')
                .height(82)
                .animation({ duration: 760, curve: Curve.FastOutSlowIn })
              } else {
                Text(this.getPaperQuote())
                  .fontSize(16)
                  .fontColor('#506164')
                  .lineHeight(26)
                  .margin({ top: 14 })
                  .width('100%')
              }

              Row() {
                Column()
                  .width(9)
                  .height(9)
                  .borderRadius(5)
                  .backgroundColor(this.transferOffsetX > 118 ? '#BFDCE8' : this.currentMood.color)
                  .opacity(0.86)

                Text(this.transferStatus)
                  .fontSize(12)
                  .fontColor('#6E7E81')
                  .margin({ left: 8 })
                  .maxLines(1)
              }
              .width('100%')
              .margin({ top: 16 })
            }
            .width('100%')
            .padding({ left: 16, right: 16, top: 14, bottom: 14 })
            .borderRadius(22)
            .backgroundColor('#CCFDFEFA')
            .backdropBlur(12)
            .translate({ x: this.transferOffsetX + this.transferFlyX, y: this.transferFlyY })
            .scale({ x: this.transferFoldScale, y: this.transferFoldScale })
            .rotate({ angle: this.transferPlaneTilt })
            .shadow({
              radius: this.transferOffsetX > 16 || this.isTransferFlying ? 22 : 8,
              color: '#1831464A',
              offsetY: 8
            })
            .layoutWeight(1)
            .animation({ duration: this.isTransferFlying ? 760 : 360, curve: Curve.FastOutSlowIn })
            .gesture(
              PanGesture({ direction: PanDirection.Horizontal })
                .onActionUpdate((event: GestureEvent) => {
                  if (!event) {
                    return;
                  }
                  this.updateTransferDrag(event.offsetX);
                })
                .onActionEnd(() => {
                  this.finishTransferDrag();
                })
            )

            Row() {
              Column()
                .width(8)
                .height(8)
                .borderRadius(4)
                .backgroundColor(this.currentMood.color)
                .opacity(0.82)

              Text('换一张纸条')
                .fontSize(14)
                .fontColor('#56686B')
                .margin({ left: 8 })
            }
            .padding({ left: 18, right: 18, top: 9, bottom: 9 })
            .borderRadius(20)
            .backgroundColor('#EDF6F1D8')
            .backdropBlur(12)
            .align(Alignment.Center)
            .onClick(() => {
              this.showNextPaperQuote();
            })
          }
          .width(this.isCompact ? '84%' : this.isWide ? '36%' : '66%')
          .height(this.isCompact ? 250 : 268)
          .padding({ left: 20, right: 20, top: 18, bottom: 18 })
          .borderRadius(26)
          .backgroundColor('#FFFDF2E8')
          .backdropBlur(20)
          .shadow({ radius: 30, color: '#31464A20', offsetY: 12 })
        }
        .width('100%')
        .height('100%')
        .align(Alignment.Center)
        .animation({ duration: 560, curve: Curve.FastOutSlowIn })
      }

      if (this.isWindowWiped && this.activeTab === 'diary') {
        Scroll() {
          Column() {
            MoodCalendar({
              entries: this.diaryEntries,
              isVisible: this.showMoodCalendar,
              isCompact: this.isCompact,
              isWide: this.isWide,
              showClose: false
            })
          }
          .width('100%')
          .alignItems(HorizontalAlign.Center)
          .padding({ top: 86, bottom: 140 })
        }
        .width('100%')
        .height('100%')
        .scrollBar(BarState.Off)
        .backgroundColor('#EAF1F088')
        .backdropBlur(18)
        .opacity(this.activeTab === 'diary' ? 1 : 0)
        .animation({ duration: 560, curve: Curve.FastOutSlowIn })
      }

      if (this.isWindowWiped && this.activeTab === 'greenhouse') {
        Scroll() {
          Column() {
            GreenhouseGallery({
              collectedCards: this.collectedCards,
              isVisible: this.showGreenhouse,
              isCompact: this.isCompact,
              isWide: this.isWide,
              showClose: false
            })
          }
          .width('100%')
          .alignItems(HorizontalAlign.Center)
          .padding({ top: 86, bottom: 140 })
        }
        .width('100%')
        .height('100%')
        .scrollBar(BarState.Off)
        .backgroundColor('#EAF1F088')
        .backdropBlur(18)
        .opacity(this.activeTab === 'greenhouse' ? 1 : 0)
        .animation({ duration: 560, curve: Curve.FastOutSlowIn })
      }

      if (this.isWindowWiped && this.activeTab === 'journey') {
        Scroll() {
          Column() {
            JourneyMap({
              mood: this.currentMood,
              crystals: this.crystals,
              isCompact: this.isCompact,
              isWide: this.isWide
            })
          }
          .width('100%')
          .alignItems(HorizontalAlign.Center)
          .padding({ top: 86, bottom: 140 })
        }
        .width('100%')
        .height('100%')
        .scrollBar(BarState.Off)
        .backgroundColor('#EAF1F088')
        .backdropBlur(18)
        .opacity(this.activeTab === 'journey' ? 1 : 0)
        .animation({ duration: 560, curve: Curve.FastOutSlowIn })
      }

      if (this.isWindowWiped && !this.showMoodWheel && !this.showWishPanel && !this.showPaperPanel) {
        Row() {
          DreamTabItem({
            labelText: '小镇',
            isSelected: this.activeTab === 'town',
            isCompact: this.isCompact,
            accentColor: this.currentMood.color
          })
            .onClick(() => {
              this.openTownTab();
            })

          DreamTabItem({
            labelText: '心情',
            isSelected: this.activeTab === 'diary',
            isCompact: this.isCompact,
            accentColor: this.currentMood.color
          })
            .margin({ left: this.isCompact ? 4 : 8 })
            .onClick(() => {
              this.openMoodCalendar();
            })

          DreamTabItem({
            labelText: '玻璃房',
            isSelected: this.activeTab === 'greenhouse',
            isCompact: this.isCompact,
            accentColor: this.currentMood.color
          })
            .margin({ left: this.isCompact ? 4 : 8 })
            .onClick(() => {
              this.openGreenhouse();
            })

          DreamTabItem({
            labelText: '显影',
            isSelected: this.activeTab === 'gacha',
            isCompact: this.isCompact,
            accentColor: this.currentMood.color
          })
            .margin({ left: this.isCompact ? 4 : 8 })
            .onClick(() => {
              this.toggleGachaPanel();
            })

          DreamTabItem({
            labelText: '旅行',
            isSelected: this.activeTab === 'journey',
            isCompact: this.isCompact,
            accentColor: this.currentMood.color
          })
            .margin({ left: this.isCompact ? 4 : 8 })
            .onClick(() => {
              this.openJourney();
            })
        }
        .padding({ left: this.isCompact ? 8 : 12, right: this.isCompact ? 8 : 12, top: 8, bottom: 8 })
        .width(this.isCompact ? '96%' : this.isWide ? '54%' : '82%')
        .justifyContent(FlexAlign.Center)
        .borderRadius(30)
        .backgroundColor('#B8EDF6F1')
        .backdropBlur(24)
        .shadow({ radius: 20, color: '#1831464A', offsetY: 9 })
        .position({
          x: this.isCompact ? '6%' : this.isWide ? '28%' : '14%',
          y: this.isCompact ? '88%' : '89%'
        })
        .animation({ duration: 560, curve: Curve.FastOutSlowIn })
      }
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#EDF4F0')
    .animation({ duration: 780, curve: Curve.FastOutSlowIn })
  }
}
