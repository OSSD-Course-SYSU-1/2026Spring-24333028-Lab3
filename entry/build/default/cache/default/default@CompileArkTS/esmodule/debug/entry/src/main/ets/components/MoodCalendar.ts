if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface MoodCalendar_Params {
    entries?: MoodDiaryEntry[];
    isVisible?: boolean;
    isCompact?: boolean;
    isWide?: boolean;
    showClose?: boolean;
    selectedDateKey?: string;
    cardScale?: number;
    quoteIndex?: number;
}
interface CalendarDayCell_Params {
    day?: number;
    moodColor?: string;
    hasEntry?: boolean;
    selected?: boolean;
    visible?: boolean;
    isCompact?: boolean;
}
import { plazaQuotes } from "@bundle:com.dreamjourney.native/entry/ets/common/Models";
import type { MoodDiaryEntry } from "@bundle:com.dreamjourney.native/entry/ets/common/Models";
const weekLabels: string[] = ['一', '二', '三', '四', '五', '六', '日'];
const monthDays: number[] = [
    1, 2, 3, 4, 5, 6, 7,
    8, 9, 10, 11, 12, 13, 14,
    15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28,
    29, 30, 31
];
class CalendarDayCell extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__day = new SynchedPropertySimpleOneWayPU(params.day, this, "day");
        this.__moodColor = new SynchedPropertySimpleOneWayPU(params.moodColor, this, "moodColor");
        this.__hasEntry = new SynchedPropertySimpleOneWayPU(params.hasEntry, this, "hasEntry");
        this.__selected = new SynchedPropertySimpleOneWayPU(params.selected, this, "selected");
        this.__visible = new SynchedPropertySimpleOneWayPU(params.visible, this, "visible");
        this.__isCompact = new SynchedPropertySimpleOneWayPU(params.isCompact, this, "isCompact");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: CalendarDayCell_Params) {
        if (params.day === undefined) {
            this.__day.set(1);
        }
        if (params.moodColor === undefined) {
            this.__moodColor.set('#88FFFFFF');
        }
        if (params.hasEntry === undefined) {
            this.__hasEntry.set(false);
        }
        if (params.selected === undefined) {
            this.__selected.set(false);
        }
        if (params.visible === undefined) {
            this.__visible.set(true);
        }
        if (params.isCompact === undefined) {
            this.__isCompact.set(false);
        }
    }
    updateStateVars(params: CalendarDayCell_Params) {
        this.__day.reset(params.day);
        this.__moodColor.reset(params.moodColor);
        this.__hasEntry.reset(params.hasEntry);
        this.__selected.reset(params.selected);
        this.__visible.reset(params.visible);
        this.__isCompact.reset(params.isCompact);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__day.purgeDependencyOnElmtId(rmElmtId);
        this.__moodColor.purgeDependencyOnElmtId(rmElmtId);
        this.__hasEntry.purgeDependencyOnElmtId(rmElmtId);
        this.__selected.purgeDependencyOnElmtId(rmElmtId);
        this.__visible.purgeDependencyOnElmtId(rmElmtId);
        this.__isCompact.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__day.aboutToBeDeleted();
        this.__moodColor.aboutToBeDeleted();
        this.__hasEntry.aboutToBeDeleted();
        this.__selected.aboutToBeDeleted();
        this.__visible.aboutToBeDeleted();
        this.__isCompact.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __day: SynchedPropertySimpleOneWayPU<number>;
    get day() {
        return this.__day.get();
    }
    set day(newValue: number) {
        this.__day.set(newValue);
    }
    private __moodColor: SynchedPropertySimpleOneWayPU<string>;
    get moodColor() {
        return this.__moodColor.get();
    }
    set moodColor(newValue: string) {
        this.__moodColor.set(newValue);
    }
    private __hasEntry: SynchedPropertySimpleOneWayPU<boolean>;
    get hasEntry() {
        return this.__hasEntry.get();
    }
    set hasEntry(newValue: boolean) {
        this.__hasEntry.set(newValue);
    }
    private __selected: SynchedPropertySimpleOneWayPU<boolean>;
    get selected() {
        return this.__selected.get();
    }
    set selected(newValue: boolean) {
        this.__selected.set(newValue);
    }
    private __visible: SynchedPropertySimpleOneWayPU<boolean>;
    get visible() {
        return this.__visible.get();
    }
    set visible(newValue: boolean) {
        this.__visible.set(newValue);
    }
    private __isCompact: SynchedPropertySimpleOneWayPU<boolean>;
    get isCompact() {
        return this.__isCompact.get();
    }
    set isCompact(newValue: boolean) {
        this.__isCompact.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Context.animation({ duration: 460, curve: Curve.EaseOut });
            Column.width('14.2%');
            Column.height(this.isCompact ? 48 : 54);
            Column.justifyContent(FlexAlign.Center);
            Column.alignItems(HorizontalAlign.Center);
            Column.borderRadius(18);
            Column.backgroundColor(this.selected ? '#C8F7FBF8' : '#00FFFFFF');
            Column.opacity(this.visible ? 1 : 0);
            Context.animation(null);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`${this.day}`);
            Text.fontSize(this.isCompact ? 10 : 11);
            Text.fontColor(this.hasEntry ? '#506164' : '#A4AFB1');
            Text.opacity(this.visible ? 1 : 0);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Context.animation({ duration: 460, curve: Curve.FastOutSlowIn });
            Column.width(this.selected ? 18 : 12);
            Column.height(this.selected ? 18 : 12);
            Column.borderRadius(this.selected ? 9 : 6);
            Column.backgroundColor(this.hasEntry ? this.moodColor : '#82FFFFFF');
            Column.opacity(this.visible ? (this.hasEntry ? 0.92 : 0.46) : 0);
            Column.margin({ top: 5 });
            Column.shadow({
                radius: this.selected ? 12 : 3,
                color: this.hasEntry ? '#22506164' : '#10506164',
                offsetY: 4
            });
            Context.animation(null);
        }, Column);
        Column.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
export class MoodCalendar extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__entries = new SynchedPropertyObjectOneWayPU(params.entries, this, "entries");
        this.__isVisible = new SynchedPropertySimpleTwoWayPU(params.isVisible, this, "isVisible");
        this.__isCompact = new SynchedPropertySimpleOneWayPU(params.isCompact, this, "isCompact");
        this.__isWide = new SynchedPropertySimpleOneWayPU(params.isWide, this, "isWide");
        this.__showClose = new SynchedPropertySimpleOneWayPU(params.showClose, this, "showClose");
        this.__selectedDateKey = new ObservedPropertySimplePU('', this, "selectedDateKey");
        this.__cardScale = new ObservedPropertySimplePU(0.96, this, "cardScale");
        this.__quoteIndex = new ObservedPropertySimplePU(0, this, "quoteIndex");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: MoodCalendar_Params) {
        if (params.entries === undefined) {
            this.__entries.set([]);
        }
        if (params.isCompact === undefined) {
            this.__isCompact.set(false);
        }
        if (params.isWide === undefined) {
            this.__isWide.set(false);
        }
        if (params.showClose === undefined) {
            this.__showClose.set(true);
        }
        if (params.selectedDateKey !== undefined) {
            this.selectedDateKey = params.selectedDateKey;
        }
        if (params.cardScale !== undefined) {
            this.cardScale = params.cardScale;
        }
        if (params.quoteIndex !== undefined) {
            this.quoteIndex = params.quoteIndex;
        }
    }
    updateStateVars(params: MoodCalendar_Params) {
        this.__entries.reset(params.entries);
        this.__isCompact.reset(params.isCompact);
        this.__isWide.reset(params.isWide);
        this.__showClose.reset(params.showClose);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__entries.purgeDependencyOnElmtId(rmElmtId);
        this.__isVisible.purgeDependencyOnElmtId(rmElmtId);
        this.__isCompact.purgeDependencyOnElmtId(rmElmtId);
        this.__isWide.purgeDependencyOnElmtId(rmElmtId);
        this.__showClose.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedDateKey.purgeDependencyOnElmtId(rmElmtId);
        this.__cardScale.purgeDependencyOnElmtId(rmElmtId);
        this.__quoteIndex.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__entries.aboutToBeDeleted();
        this.__isVisible.aboutToBeDeleted();
        this.__isCompact.aboutToBeDeleted();
        this.__isWide.aboutToBeDeleted();
        this.__showClose.aboutToBeDeleted();
        this.__selectedDateKey.aboutToBeDeleted();
        this.__cardScale.aboutToBeDeleted();
        this.__quoteIndex.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __entries: SynchedPropertySimpleOneWayPU<MoodDiaryEntry[]>;
    get entries() {
        return this.__entries.get();
    }
    set entries(newValue: MoodDiaryEntry[]) {
        this.__entries.set(newValue);
    }
    private __isVisible: SynchedPropertySimpleTwoWayPU<boolean>;
    get isVisible() {
        return this.__isVisible.get();
    }
    set isVisible(newValue: boolean) {
        this.__isVisible.set(newValue);
    }
    private __isCompact: SynchedPropertySimpleOneWayPU<boolean>;
    get isCompact() {
        return this.__isCompact.get();
    }
    set isCompact(newValue: boolean) {
        this.__isCompact.set(newValue);
    }
    private __isWide: SynchedPropertySimpleOneWayPU<boolean>;
    get isWide() {
        return this.__isWide.get();
    }
    set isWide(newValue: boolean) {
        this.__isWide.set(newValue);
    }
    private __showClose: SynchedPropertySimpleOneWayPU<boolean>;
    get showClose() {
        return this.__showClose.get();
    }
    set showClose(newValue: boolean) {
        this.__showClose.set(newValue);
    }
    private __selectedDateKey: ObservedPropertySimplePU<string>;
    get selectedDateKey() {
        return this.__selectedDateKey.get();
    }
    set selectedDateKey(newValue: string) {
        this.__selectedDateKey.set(newValue);
    }
    private __cardScale: ObservedPropertySimplePU<number>;
    get cardScale() {
        return this.__cardScale.get();
    }
    set cardScale(newValue: number) {
        this.__cardScale.set(newValue);
    }
    private __quoteIndex: ObservedPropertySimplePU<number>;
    get quoteIndex() {
        return this.__quoteIndex.get();
    }
    set quoteIndex(newValue: number) {
        this.__quoteIndex.set(newValue);
    }
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
            }
            else {
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
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Context.animation({ duration: 560, curve: Curve.FastOutSlowIn });
            Column.width(this.isCompact ? '90%' : this.isWide ? '46%' : '76%');
            Column.padding({
                left: this.isCompact ? 16 : this.isWide ? 28 : 22,
                right: this.isCompact ? 16 : this.isWide ? 28 : 22,
                top: this.isCompact ? 18 : 24,
                bottom: this.isCompact ? 18 : 24
            });
            Column.borderRadius(30);
            Column.backgroundColor('#DDFDFEFA');
            Column.backdropBlur(22);
            Column.shadow({ radius: 28, color: '#2031464A', offsetY: 12 });
            Column.scale({ x: this.cardScale, y: this.cardScale });
            Context.animation(null);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.margin({ bottom: 18 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.alignItems(HorizontalAlign.Start);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('心情日历');
            Text.fontSize(this.isCompact ? 19 : this.isWide ? 25 : 21);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor('#506164');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`${this.getMonth()}月已经收集了 ${this.getMonthEntryCount()} 天颜色`);
            Text.fontSize(12);
            Text.fontColor('#849497');
            Text.margin({ top: 6 });
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.showClose) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('关闭');
                        Text.fontSize(13);
                        Text.fontColor('#6E7E81');
                        Text.padding({ left: 13, right: 13, top: 7, bottom: 7 });
                        Text.borderRadius(16);
                        Text.backgroundColor('#90F7FBF8');
                        Text.onClick(() => {
                            this.isVisible = false;
                        });
                    }, Text);
                    Text.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.padding({ left: 14, right: 14, top: 12, bottom: 12 });
            Column.borderRadius(22);
            Column.backgroundColor('#B8F7FBF8');
            Column.backdropBlur(14);
            Column.margin({ bottom: 14 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('月度色谱');
            Text.fontSize(13);
            Text.fontColor('#506164');
            Text.fontWeight(FontWeight.Medium);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`连续记录 ${this.getLongestStreak()} 天`);
            Text.fontSize(12);
            Text.fontColor('#7E8E90');
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.margin({ top: 12 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const day = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Context.animation({ duration: 420, curve: Curve.EaseOut });
                    Column.width(this.isCompact ? 7 : 8);
                    Column.height(this.isCompact ? 26 : 30);
                    Column.borderRadius(5);
                    Column.backgroundColor(this.getEntryByDay(day)?.moodColor ?? '#88FFFFFF');
                    Column.opacity(day <= this.getDaysInMonth() ? (this.hasEntryOnDay(day) ? 0.92 : 0.36) : 0);
                    Column.margin({ right: 3 });
                    Context.animation(null);
                }, Column);
                Column.pop();
            };
            this.forEachUpdateFunction(elmtId, monthDays, forEachItemGenFunction, (day: number) => `spectrum-${day}`, false, false);
        }, ForEach);
        ForEach.pop();
        Row.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.margin({ bottom: 4 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const label = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(label);
                    Text.width('14.2%');
                    Text.fontSize(11);
                    Text.fontColor('#9AA8AA');
                    Text.textAlign(TextAlign.Center);
                }, Text);
                Text.pop();
            };
            this.forEachUpdateFunction(elmtId, weekLabels, forEachItemGenFunction, (label: string) => label, false, false);
        }, ForEach);
        ForEach.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Flex.create({ wrap: FlexWrap.Wrap, justifyContent: FlexAlign.Start });
            Flex.width('100%');
        }, Flex);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const day = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    __Common__.create();
                    __Common__.onClick(() => {
                        if (day <= this.getDaysInMonth()) {
                            this.selectedDateKey = this.getDateKey(day);
                        }
                    });
                }, __Common__);
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new CalendarDayCell(this, {
                                day: day,
                                moodColor: this.getEntryByDay(day)?.moodColor ?? '#88FFFFFF',
                                hasEntry: this.getEntryByDay(day) !== undefined,
                                selected: this.selectedDateKey === this.getDateKey(day),
                                visible: day <= this.getDaysInMonth(),
                                isCompact: this.isCompact
                            }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/components/MoodCalendar.ets", line: 277, col: 11 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {
                                    day: day,
                                    moodColor: this.getEntryByDay(day)?.moodColor ?? '#88FFFFFF',
                                    hasEntry: this.getEntryByDay(day) !== undefined,
                                    selected: this.selectedDateKey === this.getDateKey(day),
                                    visible: day <= this.getDaysInMonth(),
                                    isCompact: this.isCompact
                                };
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {
                                day: day,
                                moodColor: this.getEntryByDay(day)?.moodColor ?? '#88FFFFFF',
                                hasEntry: this.getEntryByDay(day) !== undefined,
                                selected: this.selectedDateKey === this.getDateKey(day),
                                visible: day <= this.getDaysInMonth(),
                                isCompact: this.isCompact
                            });
                        }
                    }, { name: "CalendarDayCell" });
                }
                __Common__.pop();
            };
            this.forEachUpdateFunction(elmtId, monthDays, forEachItemGenFunction, (day: number) => day.toString(), false, false);
        }, ForEach);
        ForEach.pop();
        Flex.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Context.animation({ duration: 500, curve: Curve.EaseOut });
            Column.padding({ left: 16, right: 16, top: 14, bottom: 14 });
            Column.borderRadius(22);
            Column.backgroundColor('#C8F7FBF8');
            Column.backdropBlur(14);
            Column.margin({ top: 16 });
            Context.animation(null);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width(12);
            Column.height(12);
            Column.borderRadius(6);
            Column.backgroundColor(this.getSelectedEntry()?.moodColor ?? '#DDE8E2');
            Column.opacity(0.9);
        }, Column);
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.getSelectedDayText());
            Text.fontSize(12);
            Text.fontColor('#6E7E81');
            Text.margin({ left: 8 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.getSelectedMoodName());
            Text.fontSize(12);
            Text.fontColor('#6E7E81');
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.getSelectedNote());
            Text.fontSize(14);
            Text.fontColor('#506164');
            Text.lineHeight(22);
            Text.margin({ top: 12 });
            Text.width('100%');
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.padding({ left: 16, right: 16, top: 14, bottom: 14 });
            Column.borderRadius(22);
            Column.backgroundColor('#C8F7FBF8');
            Column.backdropBlur(14);
            Column.margin({ top: 14 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('匿名信件回访');
            Text.fontSize(13);
            Text.fontColor('#506164');
            Text.fontWeight(FontWeight.Medium);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('换一句');
            Text.fontSize(12);
            Text.fontColor('#6E7E81');
            Text.padding({ left: 10, right: 10, top: 5, bottom: 5 });
            Text.borderRadius(14);
            Text.backgroundColor('#90FFFFFF');
            Text.onClick(() => {
                this.showNextQuote();
            });
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.getQuote());
            Text.fontSize(13);
            Text.fontColor('#607174');
            Text.lineHeight(20);
            Text.margin({ top: 10 });
            Text.width('100%');
        }, Text);
        Text.pop();
        Column.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
