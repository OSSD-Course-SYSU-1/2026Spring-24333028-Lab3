if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface MoodPalette_Params {
    currentMood?: MoodOption;
    customMood?: MoodOption;
    isVisible?: boolean;
    crystals?: number;
    hasMoodRewardedToday?: boolean;
    dailyNote?: string;
    diaryEntries?: MoodDiaryEntry[];
    hasSelectedMood?: boolean;
    isCompact?: boolean;
    isWide?: boolean;
    todayKey?: string;
    todayText?: string;
    showCustomEditor?: boolean;
    customNameDraft?: string;
    selectedColorId?: string;
    noteDraft?: string;
    cardScale?: number;
}
interface CustomColorChip_Params {
    item?: CustomMoodColor;
    selected?: boolean;
}
interface MoodTile_Params {
    item?: MoodOption;
    currentMood?: MoodOption;
    isCompact?: boolean;
    isWide?: boolean;
}
import { buildCustomMood, customMoodColors, moodOptions, morningCustomColor } from "@bundle:com.dreamjourney.native/entry/ets/common/Models";
import type { CustomMoodColor, MoodDiaryEntry, MoodOption } from "@bundle:com.dreamjourney.native/entry/ets/common/Models";
class MoodTile extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__item = new SynchedPropertyObjectOneWayPU(params.item, this, "item");
        this.__currentMood = new SynchedPropertyObjectOneWayPU(params.currentMood, this, "currentMood");
        this.__isCompact = new SynchedPropertySimpleOneWayPU(params.isCompact, this, "isCompact");
        this.__isWide = new SynchedPropertySimpleOneWayPU(params.isWide, this, "isWide");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: MoodTile_Params) {
        if (params.isCompact === undefined) {
            this.__isCompact.set(false);
        }
        if (params.isWide === undefined) {
            this.__isWide.set(false);
        }
    }
    updateStateVars(params: MoodTile_Params) {
        this.__item.reset(params.item);
        this.__currentMood.reset(params.currentMood);
        this.__isCompact.reset(params.isCompact);
        this.__isWide.reset(params.isWide);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__item.purgeDependencyOnElmtId(rmElmtId);
        this.__currentMood.purgeDependencyOnElmtId(rmElmtId);
        this.__isCompact.purgeDependencyOnElmtId(rmElmtId);
        this.__isWide.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__item.aboutToBeDeleted();
        this.__currentMood.aboutToBeDeleted();
        this.__isCompact.aboutToBeDeleted();
        this.__isWide.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __item: SynchedPropertySimpleOneWayPU<MoodOption>;
    get item() {
        return this.__item.get();
    }
    set item(newValue: MoodOption) {
        this.__item.set(newValue);
    }
    private __currentMood: SynchedPropertySimpleOneWayPU<MoodOption>;
    get currentMood() {
        return this.__currentMood.get();
    }
    set currentMood(newValue: MoodOption) {
        this.__currentMood.set(newValue);
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
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Context.animation({ duration: 480, curve: Curve.FastOutSlowIn });
            Column.width(this.isCompact ? 68 : this.isWide ? 94 : 78);
            Column.height(this.isCompact ? 68 : this.isWide ? 86 : 74);
            Column.justifyContent(FlexAlign.Center);
            Column.alignItems(HorizontalAlign.Center);
            Column.borderRadius(22);
            Column.backgroundColor(this.currentMood.id === this.item.id ? '#D8F7FBF8' : '#6EFFFFFF');
            Column.backdropBlur(12);
            Context.animation(null);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Context.animation({ duration: 480, curve: Curve.FastOutSlowIn });
            Column.width(this.isCompact ? 34 : this.isWide ? 48 : 40);
            Column.height(this.isCompact ? 34 : this.isWide ? 48 : 40);
            Column.borderRadius(this.isCompact ? 17 : this.isWide ? 24 : 20);
            Column.backgroundColor(this.item.color);
            Column.opacity(this.currentMood.id === this.item.id ? 1 : 0.72);
            Column.shadow({
                radius: this.currentMood.id === this.item.id ? 16 : 6,
                color: '#22506164',
                offsetY: 7
            });
            Context.animation(null);
        }, Column);
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.item.name);
            Text.fontSize(this.isCompact ? 10 : 11);
            Text.fontColor('#5E7073');
            Text.margin({ top: 7 });
            Text.opacity(this.currentMood.id === this.item.id ? 1 : 0.72);
        }, Text);
        Text.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
class CustomColorChip extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__item = new SynchedPropertyObjectOneWayPU(params.item, this, "item");
        this.__selected = new SynchedPropertySimpleOneWayPU(params.selected, this, "selected");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: CustomColorChip_Params) {
        if (params.selected === undefined) {
            this.__selected.set(false);
        }
    }
    updateStateVars(params: CustomColorChip_Params) {
        this.__item.reset(params.item);
        this.__selected.reset(params.selected);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__item.purgeDependencyOnElmtId(rmElmtId);
        this.__selected.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__item.aboutToBeDeleted();
        this.__selected.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __item: SynchedPropertySimpleOneWayPU<CustomMoodColor>;
    get item() {
        return this.__item.get();
    }
    set item(newValue: CustomMoodColor) {
        this.__item.set(newValue);
    }
    private __selected: SynchedPropertySimpleOneWayPU<boolean>;
    get selected() {
        return this.__selected.get();
    }
    set selected(newValue: boolean) {
        this.__selected.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Context.animation({ duration: 420, curve: Curve.EaseOut });
            Row.padding({ left: 11, right: 12, top: 8, bottom: 8 });
            Row.borderRadius(17);
            Row.backgroundColor(this.selected ? '#D8F7FBF8' : '#70FFFFFF');
            Row.backdropBlur(10);
            Row.opacity(this.selected ? 1 : 0.74);
            Row.scale({ x: this.selected ? 1.03 : 1, y: this.selected ? 1.03 : 1 });
            Context.animation(null);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width(12);
            Column.height(12);
            Column.borderRadius(6);
            Column.backgroundColor(this.item.color);
            Column.opacity(0.9);
        }, Column);
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.item.name);
            Text.fontSize(11);
            Text.fontColor('#5E7073');
            Text.margin({ left: 7 });
        }, Text);
        Text.pop();
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
export class MoodPalette extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__currentMood = new SynchedPropertyObjectTwoWayPU(params.currentMood, this, "currentMood");
        this.__customMood = new SynchedPropertyObjectTwoWayPU(params.customMood, this, "customMood");
        this.__isVisible = new SynchedPropertySimpleTwoWayPU(params.isVisible, this, "isVisible");
        this.__crystals = new SynchedPropertySimpleTwoWayPU(params.crystals, this, "crystals");
        this.__hasMoodRewardedToday = new SynchedPropertySimpleTwoWayPU(params.hasMoodRewardedToday, this, "hasMoodRewardedToday");
        this.__dailyNote = new SynchedPropertySimpleTwoWayPU(params.dailyNote, this, "dailyNote");
        this.__diaryEntries = new SynchedPropertyObjectTwoWayPU(params.diaryEntries, this, "diaryEntries");
        this.__hasSelectedMood = new SynchedPropertySimpleTwoWayPU(params.hasSelectedMood, this, "hasSelectedMood");
        this.__isCompact = new SynchedPropertySimpleOneWayPU(params.isCompact, this, "isCompact");
        this.__isWide = new SynchedPropertySimpleOneWayPU(params.isWide, this, "isWide");
        this.__todayKey = new SynchedPropertySimpleOneWayPU(params.todayKey, this, "todayKey");
        this.__todayText = new SynchedPropertySimpleOneWayPU(params.todayText, this, "todayText");
        this.__showCustomEditor = new ObservedPropertySimplePU(false, this, "showCustomEditor");
        this.__customNameDraft = new ObservedPropertySimplePU('我的天气', this, "customNameDraft");
        this.__selectedColorId = new ObservedPropertySimplePU(morningCustomColor.id, this, "selectedColorId");
        this.__noteDraft = new ObservedPropertySimplePU('', this, "noteDraft");
        this.__cardScale = new ObservedPropertySimplePU(0.96, this, "cardScale");
        this.setInitiallyProvidedValue(params);
        this.declareWatch("isVisible", this.onVisibleChange);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: MoodPalette_Params) {
        if (params.isCompact === undefined) {
            this.__isCompact.set(false);
        }
        if (params.isWide === undefined) {
            this.__isWide.set(false);
        }
        if (params.todayKey === undefined) {
            this.__todayKey.set('');
        }
        if (params.todayText === undefined) {
            this.__todayText.set('');
        }
        if (params.showCustomEditor !== undefined) {
            this.showCustomEditor = params.showCustomEditor;
        }
        if (params.customNameDraft !== undefined) {
            this.customNameDraft = params.customNameDraft;
        }
        if (params.selectedColorId !== undefined) {
            this.selectedColorId = params.selectedColorId;
        }
        if (params.noteDraft !== undefined) {
            this.noteDraft = params.noteDraft;
        }
        if (params.cardScale !== undefined) {
            this.cardScale = params.cardScale;
        }
    }
    updateStateVars(params: MoodPalette_Params) {
        this.__isCompact.reset(params.isCompact);
        this.__isWide.reset(params.isWide);
        this.__todayKey.reset(params.todayKey);
        this.__todayText.reset(params.todayText);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__currentMood.purgeDependencyOnElmtId(rmElmtId);
        this.__customMood.purgeDependencyOnElmtId(rmElmtId);
        this.__isVisible.purgeDependencyOnElmtId(rmElmtId);
        this.__crystals.purgeDependencyOnElmtId(rmElmtId);
        this.__hasMoodRewardedToday.purgeDependencyOnElmtId(rmElmtId);
        this.__dailyNote.purgeDependencyOnElmtId(rmElmtId);
        this.__diaryEntries.purgeDependencyOnElmtId(rmElmtId);
        this.__hasSelectedMood.purgeDependencyOnElmtId(rmElmtId);
        this.__isCompact.purgeDependencyOnElmtId(rmElmtId);
        this.__isWide.purgeDependencyOnElmtId(rmElmtId);
        this.__todayKey.purgeDependencyOnElmtId(rmElmtId);
        this.__todayText.purgeDependencyOnElmtId(rmElmtId);
        this.__showCustomEditor.purgeDependencyOnElmtId(rmElmtId);
        this.__customNameDraft.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedColorId.purgeDependencyOnElmtId(rmElmtId);
        this.__noteDraft.purgeDependencyOnElmtId(rmElmtId);
        this.__cardScale.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__currentMood.aboutToBeDeleted();
        this.__customMood.aboutToBeDeleted();
        this.__isVisible.aboutToBeDeleted();
        this.__crystals.aboutToBeDeleted();
        this.__hasMoodRewardedToday.aboutToBeDeleted();
        this.__dailyNote.aboutToBeDeleted();
        this.__diaryEntries.aboutToBeDeleted();
        this.__hasSelectedMood.aboutToBeDeleted();
        this.__isCompact.aboutToBeDeleted();
        this.__isWide.aboutToBeDeleted();
        this.__todayKey.aboutToBeDeleted();
        this.__todayText.aboutToBeDeleted();
        this.__showCustomEditor.aboutToBeDeleted();
        this.__customNameDraft.aboutToBeDeleted();
        this.__selectedColorId.aboutToBeDeleted();
        this.__noteDraft.aboutToBeDeleted();
        this.__cardScale.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __currentMood: SynchedPropertySimpleOneWayPU<MoodOption>;
    get currentMood() {
        return this.__currentMood.get();
    }
    set currentMood(newValue: MoodOption) {
        this.__currentMood.set(newValue);
    }
    private __customMood: SynchedPropertySimpleOneWayPU<MoodOption>;
    get customMood() {
        return this.__customMood.get();
    }
    set customMood(newValue: MoodOption) {
        this.__customMood.set(newValue);
    }
    private __isVisible: SynchedPropertySimpleTwoWayPU<boolean>;
    get isVisible() {
        return this.__isVisible.get();
    }
    set isVisible(newValue: boolean) {
        this.__isVisible.set(newValue);
    }
    private __crystals: SynchedPropertySimpleTwoWayPU<number>;
    get crystals() {
        return this.__crystals.get();
    }
    set crystals(newValue: number) {
        this.__crystals.set(newValue);
    }
    private __hasMoodRewardedToday: SynchedPropertySimpleTwoWayPU<boolean>;
    get hasMoodRewardedToday() {
        return this.__hasMoodRewardedToday.get();
    }
    set hasMoodRewardedToday(newValue: boolean) {
        this.__hasMoodRewardedToday.set(newValue);
    }
    private __dailyNote: SynchedPropertySimpleTwoWayPU<string>;
    get dailyNote() {
        return this.__dailyNote.get();
    }
    set dailyNote(newValue: string) {
        this.__dailyNote.set(newValue);
    }
    private __diaryEntries: SynchedPropertySimpleOneWayPU<MoodDiaryEntry[]>;
    get diaryEntries() {
        return this.__diaryEntries.get();
    }
    set diaryEntries(newValue: MoodDiaryEntry[]) {
        this.__diaryEntries.set(newValue);
    }
    private __hasSelectedMood: SynchedPropertySimpleTwoWayPU<boolean>;
    get hasSelectedMood() {
        return this.__hasSelectedMood.get();
    }
    set hasSelectedMood(newValue: boolean) {
        this.__hasSelectedMood.set(newValue);
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
    private __todayKey: SynchedPropertySimpleOneWayPU<string>;
    get todayKey() {
        return this.__todayKey.get();
    }
    set todayKey(newValue: string) {
        this.__todayKey.set(newValue);
    }
    private __todayText: SynchedPropertySimpleOneWayPU<string>;
    get todayText() {
        return this.__todayText.get();
    }
    set todayText(newValue: string) {
        this.__todayText.set(newValue);
    }
    private __showCustomEditor: ObservedPropertySimplePU<boolean>;
    get showCustomEditor() {
        return this.__showCustomEditor.get();
    }
    set showCustomEditor(newValue: boolean) {
        this.__showCustomEditor.set(newValue);
    }
    private __customNameDraft: ObservedPropertySimplePU<string>;
    get customNameDraft() {
        return this.__customNameDraft.get();
    }
    set customNameDraft(newValue: string) {
        this.__customNameDraft.set(newValue);
    }
    private __selectedColorId: ObservedPropertySimplePU<string>;
    get selectedColorId() {
        return this.__selectedColorId.get();
    }
    set selectedColorId(newValue: string) {
        this.__selectedColorId.set(newValue);
    }
    private __noteDraft: ObservedPropertySimplePU<string>;
    get noteDraft() {
        return this.__noteDraft.get();
    }
    set noteDraft(newValue: string) {
        this.__noteDraft.set(newValue);
    }
    private __cardScale: ObservedPropertySimplePU<number>;
    get cardScale() {
        return this.__cardScale.get();
    }
    set cardScale(newValue: number) {
        this.__cardScale.set(newValue);
    }
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
            }
            else {
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
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create({ alignContent: Alignment.Center });
            Stack.width('100%');
            Stack.height('100%');
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (!this.showCustomEditor) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Context.animation({ duration: 560, curve: Curve.FastOutSlowIn });
                        Column.width(this.isCompact ? '90%' : this.isWide ? '52%' : '78%');
                        Column.padding({
                            left: this.isCompact ? 16 : this.isWide ? 28 : 22,
                            right: this.isCompact ? 16 : this.isWide ? 28 : 22,
                            top: this.isCompact ? 18 : 22,
                            bottom: this.isCompact ? 18 : 24
                        });
                        Column.borderRadius(28);
                        Column.backgroundColor('#DBFDFEFA');
                        Column.backdropBlur(22);
                        Column.shadow({ radius: 28, color: '#2031464A', offsetY: 12 });
                        Column.scale({ x: this.cardScale, y: this.cardScale });
                        Context.animation(null);
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                        Row.width('100%');
                        Row.margin({ bottom: this.isCompact ? 16 : 20 });
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.alignItems(HorizontalAlign.Start);
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('今天是什么颜色？');
                        Text.fontSize(this.isCompact ? 18 : this.isWide ? 24 : 20);
                        Text.fontWeight(FontWeight.Medium);
                        Text.fontColor('#56686B');
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('选一个心情，再写几个字留给小镇。');
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
                        Text.create('稍后');
                        Text.fontSize(13);
                        Text.fontColor('#6E7E81');
                        Text.padding({ left: 12, right: 12, top: 7, bottom: 7 });
                        Text.borderRadius(16);
                        Text.backgroundColor('#90F7FBF8');
                        Text.onClick(() => {
                            this.closePanel();
                        });
                    }, Text);
                    Text.pop();
                    Row.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Flex.create({ wrap: FlexWrap.Wrap, justifyContent: FlexAlign.SpaceBetween });
                        Flex.width('100%');
                    }, Flex);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        ForEach.create();
                        const forEachItemGenFunction = _item => {
                            const item = _item;
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                __Common__.create();
                                __Common__.margin({ bottom: this.isCompact ? 8 : 12 });
                                __Common__.onClick(() => {
                                    this.selectMood(item);
                                });
                            }, __Common__);
                            {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    if (isInitialRender) {
                                        let componentCall = new MoodTile(this, {
                                            item: item,
                                            currentMood: this.currentMood,
                                            isCompact: this.isCompact,
                                            isWide: this.isWide
                                        }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/components/MoodPalette.ets", line: 241, col: 15 });
                                        ViewPU.create(componentCall);
                                        let paramsLambda = () => {
                                            return {
                                                item: item,
                                                currentMood: this.currentMood,
                                                isCompact: this.isCompact,
                                                isWide: this.isWide
                                            };
                                        };
                                        componentCall.paramsGenerator_ = paramsLambda;
                                    }
                                    else {
                                        this.updateStateVarsOfChildByElmtId(elmtId, {
                                            item: item,
                                            currentMood: this.currentMood,
                                            isCompact: this.isCompact,
                                            isWide: this.isWide
                                        });
                                    }
                                }, { name: "MoodTile" });
                            }
                            __Common__.pop();
                        };
                        this.forEachUpdateFunction(elmtId, moodOptions, forEachItemGenFunction, (item: MoodOption) => item.id, false, false);
                    }, ForEach);
                    ForEach.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.width(this.isCompact ? 68 : this.isWide ? 94 : 78);
                        Column.height(this.isCompact ? 68 : this.isWide ? 86 : 74);
                        Column.justifyContent(FlexAlign.Center);
                        Column.alignItems(HorizontalAlign.Center);
                        Column.borderRadius(22);
                        Column.backgroundColor(this.currentMood.id === 'custom' ? '#D8F7FBF8' : '#6EFFFFFF');
                        Column.backdropBlur(12);
                        Column.onClick(() => {
                            this.showCustomEditor = true;
                        });
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Stack.create();
                    }, Stack);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.width(this.isCompact ? 34 : this.isWide ? 48 : 40);
                        Column.height(this.isCompact ? 34 : this.isWide ? 48 : 40);
                        Column.borderRadius(this.isCompact ? 17 : this.isWide ? 24 : 20);
                        Column.backgroundColor(this.customMood.color);
                        Column.opacity(0.86);
                    }, Column);
                    Column.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('+');
                        Text.fontSize(20);
                        Text.fontColor('#617275');
                    }, Text);
                    Text.pop();
                    Stack.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('自定义');
                        Text.fontSize(this.isCompact ? 10 : 11);
                        Text.fontColor('#5E7073');
                        Text.margin({ top: 7 });
                    }, Text);
                    Text.pop();
                    Column.pop();
                    Flex.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        TextInput.create({ text: this.noteDraft, placeholder: '例如：今天慢慢放晴' });
                        TextInput.height(44);
                        TextInput.fontSize(14);
                        TextInput.fontColor('#607174');
                        TextInput.placeholderColor('#9AA8AA');
                        TextInput.backgroundColor('#C8F7FBF8');
                        TextInput.borderRadius(22);
                        TextInput.padding({ left: 16, right: 16 });
                        TextInput.margin({ top: 10 });
                        TextInput.onChange((value: string) => {
                            this.noteDraft = this.limitNote(value);
                        });
                    }, TextInput);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                        Row.width('100%');
                        Row.margin({ top: 14 });
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.width(10);
                        Column.height(10);
                        Column.borderRadius(5);
                        Column.backgroundColor(this.currentMood.color);
                        Column.opacity(0.9);
                    }, Column);
                    Column.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.currentMood.name);
                        Text.fontSize(12);
                        Text.fontColor('#657679');
                        Text.margin({ left: 8 });
                    }, Text);
                    Text.pop();
                    Row.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Blank.create();
                    }, Blank);
                    Blank.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('收下今天');
                        Text.fontSize(14);
                        Text.fontColor('#56686B');
                        Text.padding({ left: 18, right: 18, top: 9, bottom: 9 });
                        Text.borderRadius(20);
                        Text.backgroundColor('#D8EDF6F1');
                        Text.backdropBlur(12);
                        Text.onClick(() => {
                            this.confirmMoodRecord();
                        });
                    }, Text);
                    Text.pop();
                    Row.pop();
                    Column.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Context.animation({ duration: 560, curve: Curve.FastOutSlowIn });
                        Column.width(this.isCompact ? '90%' : this.isWide ? '48%' : '76%');
                        Column.padding({
                            left: this.isCompact ? 16 : this.isWide ? 28 : 22,
                            right: this.isCompact ? 16 : this.isWide ? 28 : 22,
                            top: this.isCompact ? 18 : 22,
                            bottom: this.isCompact ? 18 : 22
                        });
                        Column.borderRadius(28);
                        Column.backgroundColor('#DBFDFEFA');
                        Column.backdropBlur(22);
                        Column.shadow({ radius: 28, color: '#2031464A', offsetY: 12 });
                        Column.scale({ x: this.cardScale, y: this.cardScale });
                        Context.animation(null);
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('自定义心情');
                        Text.fontSize(this.isCompact ? 18 : this.isWide ? 24 : 20);
                        Text.fontWeight(FontWeight.Medium);
                        Text.fontColor('#56686B');
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('给今天留一个只属于你的天气名字。');
                        Text.fontSize(12);
                        Text.fontColor('#849497');
                        Text.margin({ top: 6, bottom: 18 });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        TextInput.create({ text: this.customNameDraft, placeholder: '例如：慢慢放晴' });
                        TextInput.height(44);
                        TextInput.fontSize(14);
                        TextInput.fontColor('#607174');
                        TextInput.placeholderColor('#9AA8AA');
                        TextInput.backgroundColor('#C8F7FBF8');
                        TextInput.borderRadius(22);
                        TextInput.padding({ left: 16, right: 16 });
                        TextInput.onChange((value: string) => {
                            this.customNameDraft = value;
                            this.updateCustomMood();
                        });
                    }, TextInput);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        TextInput.create({ text: this.noteDraft, placeholder: '今天的一句话' });
                        TextInput.height(44);
                        TextInput.fontSize(14);
                        TextInput.fontColor('#607174');
                        TextInput.placeholderColor('#9AA8AA');
                        TextInput.backgroundColor('#C8F7FBF8');
                        TextInput.borderRadius(22);
                        TextInput.padding({ left: 16, right: 16 });
                        TextInput.margin({ top: 12 });
                        TextInput.onChange((value: string) => {
                            this.noteDraft = this.limitNote(value);
                        });
                    }, TextInput);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Flex.create({ wrap: FlexWrap.Wrap, justifyContent: FlexAlign.Start });
                        Flex.width('100%');
                        Flex.margin({ top: 16, bottom: 12 });
                    }, Flex);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        ForEach.create();
                        const forEachItemGenFunction = _item => {
                            const item = _item;
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                __Common__.create();
                                __Common__.margin({ right: 10, bottom: 10 });
                                __Common__.onClick(() => {
                                    this.selectedColorId = item.id;
                                    this.updateCustomMood();
                                });
                            }, __Common__);
                            {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    if (isInitialRender) {
                                        let componentCall = new CustomColorChip(this, {
                                            item: item,
                                            selected: this.selectedColorId === item.id
                                        }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/components/MoodPalette.ets", line: 382, col: 15 });
                                        ViewPU.create(componentCall);
                                        let paramsLambda = () => {
                                            return {
                                                item: item,
                                                selected: this.selectedColorId === item.id
                                            };
                                        };
                                        componentCall.paramsGenerator_ = paramsLambda;
                                    }
                                    else {
                                        this.updateStateVarsOfChildByElmtId(elmtId, {
                                            item: item,
                                            selected: this.selectedColorId === item.id
                                        });
                                    }
                                }, { name: "CustomColorChip" });
                            }
                            __Common__.pop();
                        };
                        this.forEachUpdateFunction(elmtId, customMoodColors, forEachItemGenFunction, (item: CustomMoodColor) => item.id, false, false);
                    }, ForEach);
                    ForEach.pop();
                    Flex.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                        Row.width('100%');
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('返回');
                        Text.fontSize(14);
                        Text.fontColor('#6E7E81');
                        Text.padding({ left: 18, right: 18, top: 9, bottom: 9 });
                        Text.borderRadius(18);
                        Text.backgroundColor('#90F7FBF8');
                        Text.onClick(() => {
                            this.showCustomEditor = false;
                        });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Blank.create();
                    }, Blank);
                    Blank.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('收下今天');
                        Text.fontSize(14);
                        Text.fontColor('#57686B');
                        Text.padding({ left: 18, right: 18, top: 9, bottom: 9 });
                        Text.borderRadius(18);
                        Text.backgroundColor('#D8EDF6F1');
                        Text.backdropBlur(12);
                        Text.onClick(() => {
                            this.confirmCustomMoodRecord();
                        });
                    }, Text);
                    Text.pop();
                    Row.pop();
                    Column.pop();
                });
            }
        }, If);
        If.pop();
        Stack.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
