if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface Index_Params {
    currentMood?: MoodOption;
    customMood?: MoodOption;
    showGacha?: boolean;
    showMoodWheel?: boolean;
    worldOpacity?: number;
    crystals?: number;
    hasMoodRewardedToday?: boolean;
    dailyNote?: string;
    showMoodCalendar?: boolean;
    showGreenhouse?: boolean;
    showWishPanel?: boolean;
    showPaperPanel?: boolean;
    wishDraft?: string;
    paperQuoteIndex?: number;
    transferOffsetX?: number;
    transferFlyX?: number;
    transferFlyY?: number;
    transferFoldScale?: number;
    transferPlaneTilt?: number;
    isTransferFlying?: boolean;
    transferStatus?: string;
    sentPackageCount?: number;
    activeTab?: string;
    diaryEntries?: MoodDiaryEntry[];
    collectedCards?: CollectedCard[];
    wishNotes?: WishNote[];
    activeCard?: PolaroidCard | undefined;
    pendingPlacementCardId?: string;
    slots?: BuildingSlot[];
    drawSeed?: number;
    isWindowWiped?: boolean;
    hasSelectedMood?: boolean;
    isCompact?: boolean;
    isWide?: boolean;
    compactListener?: mediaquery.MediaQueryListener;
    wideListener?: mediaquery.MediaQueryListener;
    diaryPreferences?: preferences.Preferences | undefined;
    hasLoadedDiaryStore?: boolean;
    diaryStoreName?: string;
    diaryEntriesKey?: string;
    collectedCardsKey?: string;
    buildingSlotsKey?: string;
    wishNotesKey?: string;
}
interface DreamTabItem_Params {
    labelText?: string;
    isSelected?: boolean;
    isCompact?: boolean;
    accentColor?: string;
}
import preferences from "@ohos:data.preferences";
import type common from "@ohos:app.ability.common";
import mediaquery from "@ohos:mediaquery";
import { buildCustomMood, clonePolaroidCard, initialBuildingSlots, morningCustomColor, peacefulMoodOption, polaroidPool, plazaQuotes, seedMoodDiaryEntries } from "@bundle:com.dreamjourney.native/entry/ets/common/Models";
import type { BuildingSlot, CollectedCard, MoodDiaryEntry, MoodOption, PolaroidCard, WishNote } from "@bundle:com.dreamjourney.native/entry/ets/common/Models";
import { WindowWiper } from "@bundle:com.dreamjourney.native/entry/ets/components/WindowWiper";
import { MoodPalette } from "@bundle:com.dreamjourney.native/entry/ets/components/MoodPalette";
import { MoodCalendar } from "@bundle:com.dreamjourney.native/entry/ets/components/MoodCalendar";
import { GreenhouseGallery } from "@bundle:com.dreamjourney.native/entry/ets/components/GreenhouseGallery";
import { TownScene } from "@bundle:com.dreamjourney.native/entry/ets/components/TownScene";
import { PolaroidGacha } from "@bundle:com.dreamjourney.native/entry/ets/components/PolaroidGacha";
import { JourneyMap } from "@bundle:com.dreamjourney.native/entry/ets/components/JourneyMap";
class DreamTabItem extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__labelText = new SynchedPropertySimpleOneWayPU(params.labelText, this, "labelText");
        this.__isSelected = new SynchedPropertySimpleOneWayPU(params.isSelected, this, "isSelected");
        this.__isCompact = new SynchedPropertySimpleOneWayPU(params.isCompact, this, "isCompact");
        this.__accentColor = new SynchedPropertySimpleOneWayPU(params.accentColor, this, "accentColor");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: DreamTabItem_Params) {
        if (params.labelText === undefined) {
            this.__labelText.set('');
        }
        if (params.isSelected === undefined) {
            this.__isSelected.set(false);
        }
        if (params.isCompact === undefined) {
            this.__isCompact.set(false);
        }
        if (params.accentColor === undefined) {
            this.__accentColor.set('#A8D8EA');
        }
    }
    updateStateVars(params: DreamTabItem_Params) {
        this.__labelText.reset(params.labelText);
        this.__isSelected.reset(params.isSelected);
        this.__isCompact.reset(params.isCompact);
        this.__accentColor.reset(params.accentColor);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__labelText.purgeDependencyOnElmtId(rmElmtId);
        this.__isSelected.purgeDependencyOnElmtId(rmElmtId);
        this.__isCompact.purgeDependencyOnElmtId(rmElmtId);
        this.__accentColor.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__labelText.aboutToBeDeleted();
        this.__isSelected.aboutToBeDeleted();
        this.__isCompact.aboutToBeDeleted();
        this.__accentColor.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __labelText: SynchedPropertySimpleOneWayPU<string>;
    get labelText() {
        return this.__labelText.get();
    }
    set labelText(newValue: string) {
        this.__labelText.set(newValue);
    }
    private __isSelected: SynchedPropertySimpleOneWayPU<boolean>;
    get isSelected() {
        return this.__isSelected.get();
    }
    set isSelected(newValue: boolean) {
        this.__isSelected.set(newValue);
    }
    private __isCompact: SynchedPropertySimpleOneWayPU<boolean>;
    get isCompact() {
        return this.__isCompact.get();
    }
    set isCompact(newValue: boolean) {
        this.__isCompact.set(newValue);
    }
    private __accentColor: SynchedPropertySimpleOneWayPU<string>;
    get accentColor() {
        return this.__accentColor.get();
    }
    set accentColor(newValue: string) {
        this.__accentColor.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Context.animation({ duration: 460, curve: Curve.FastOutSlowIn });
            Column.width(this.isCompact ? 58 : 72);
            Column.padding({ left: 8, right: 8, top: 8, bottom: 8 });
            Column.borderRadius(22);
            Column.backgroundColor(this.isSelected ? '#CCFDFEFA' : '#55FFFFFF');
            Column.backdropBlur(14);
            Column.shadow({
                radius: this.isSelected ? 14 : 0,
                color: '#1831464A',
                offsetY: 6
            });
            Context.animation(null);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Context.animation({ duration: 420, curve: Curve.FastOutSlowIn });
            Column.width(this.isSelected ? 22 : 6);
            Column.height(4);
            Column.borderRadius(2);
            Column.backgroundColor(this.isSelected ? this.accentColor : '#80AEBBBC');
            Column.opacity(this.isSelected ? 0.92 : 0.42);
            Context.animation(null);
        }, Column);
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.labelText);
            Text.fontSize(this.isCompact ? 11 : 12);
            Text.fontColor(this.isSelected ? '#506164' : '#7E8E90');
            Text.fontWeight(this.isSelected ? FontWeight.Medium : FontWeight.Regular);
            Text.margin({ top: 6 });
        }, Text);
        Text.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
class Index extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__currentMood = new ObservedPropertyObjectPU(peacefulMoodOption, this, "currentMood");
        this.__customMood = new ObservedPropertyObjectPU(buildCustomMood('我的天气', morningCustomColor), this, "customMood");
        this.__showGacha = new ObservedPropertySimplePU(false, this, "showGacha");
        this.__showMoodWheel = new ObservedPropertySimplePU(false, this, "showMoodWheel");
        this.__worldOpacity = new ObservedPropertySimplePU(0, this, "worldOpacity");
        this.__crystals = new ObservedPropertySimplePU(0, this, "crystals");
        this.__hasMoodRewardedToday = new ObservedPropertySimplePU(false, this, "hasMoodRewardedToday");
        this.__dailyNote = new ObservedPropertySimplePU('', this, "dailyNote");
        this.__showMoodCalendar = new ObservedPropertySimplePU(false, this, "showMoodCalendar");
        this.__showGreenhouse = new ObservedPropertySimplePU(false, this, "showGreenhouse");
        this.__showWishPanel = new ObservedPropertySimplePU(false, this, "showWishPanel");
        this.__showPaperPanel = new ObservedPropertySimplePU(false, this, "showPaperPanel");
        this.__wishDraft = new ObservedPropertySimplePU('', this, "wishDraft");
        this.__paperQuoteIndex = new ObservedPropertySimplePU(0, this, "paperQuoteIndex");
        this.__transferOffsetX = new ObservedPropertySimplePU(0, this, "transferOffsetX");
        this.__transferFlyX = new ObservedPropertySimplePU(0, this, "transferFlyX");
        this.__transferFlyY = new ObservedPropertySimplePU(0, this, "transferFlyY");
        this.__transferFoldScale = new ObservedPropertySimplePU(1, this, "transferFoldScale");
        this.__transferPlaneTilt = new ObservedPropertySimplePU(0, this, "transferPlaneTilt");
        this.__isTransferFlying = new ObservedPropertySimplePU(false, this, "isTransferFlying");
        this.__transferStatus = new ObservedPropertySimplePU('按住纸条向右滑，寄给附近的小镇', this, "transferStatus");
        this.__sentPackageCount = new ObservedPropertySimplePU(0, this, "sentPackageCount");
        this.__activeTab = new ObservedPropertySimplePU('town', this, "activeTab");
        this.__diaryEntries = new ObservedPropertyObjectPU(seedMoodDiaryEntries, this, "diaryEntries");
        this.__collectedCards = new ObservedPropertyObjectPU([], this, "collectedCards");
        this.__wishNotes = new ObservedPropertyObjectPU([], this, "wishNotes");
        this.__activeCard = new ObservedPropertyObjectPU(undefined, this, "activeCard");
        this.__pendingPlacementCardId = new ObservedPropertySimplePU('', this, "pendingPlacementCardId");
        this.__slots = new ObservedPropertyObjectPU(initialBuildingSlots, this, "slots");
        this.__drawSeed = new ObservedPropertySimplePU(0, this, "drawSeed");
        this.__isWindowWiped = new ObservedPropertySimplePU(false, this, "isWindowWiped");
        this.__hasSelectedMood = new ObservedPropertySimplePU(false, this, "hasSelectedMood");
        this.__isCompact = new ObservedPropertySimplePU(false, this, "isCompact");
        this.__isWide = new ObservedPropertySimplePU(false, this, "isWide");
        this.compactListener = mediaquery.matchMediaSync('(width <= 480vp)');
        this.wideListener = mediaquery.matchMediaSync('(width >= 840vp)');
        this.diaryPreferences = undefined;
        this.hasLoadedDiaryStore = false;
        this.diaryStoreName = 'dream_journey_diary';
        this.diaryEntriesKey = 'mood_diary_entries';
        this.collectedCardsKey = 'collected_cards';
        this.buildingSlotsKey = 'building_slots';
        this.wishNotesKey = 'wish_notes';
        this.setInitiallyProvidedValue(params);
        this.declareWatch("diaryEntries", this.onDiaryEntriesChange);
        this.declareWatch("collectedCards", this.onCollectedCardsChange);
        this.declareWatch("wishNotes", this.onWishNotesChange);
        this.declareWatch("slots", this.onSlotsChange);
        this.declareWatch("isWindowWiped", this.onWindowWipedChange);
        this.declareWatch("hasSelectedMood", this.onMoodSelectedChange);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: Index_Params) {
        if (params.currentMood !== undefined) {
            this.currentMood = params.currentMood;
        }
        if (params.customMood !== undefined) {
            this.customMood = params.customMood;
        }
        if (params.showGacha !== undefined) {
            this.showGacha = params.showGacha;
        }
        if (params.showMoodWheel !== undefined) {
            this.showMoodWheel = params.showMoodWheel;
        }
        if (params.worldOpacity !== undefined) {
            this.worldOpacity = params.worldOpacity;
        }
        if (params.crystals !== undefined) {
            this.crystals = params.crystals;
        }
        if (params.hasMoodRewardedToday !== undefined) {
            this.hasMoodRewardedToday = params.hasMoodRewardedToday;
        }
        if (params.dailyNote !== undefined) {
            this.dailyNote = params.dailyNote;
        }
        if (params.showMoodCalendar !== undefined) {
            this.showMoodCalendar = params.showMoodCalendar;
        }
        if (params.showGreenhouse !== undefined) {
            this.showGreenhouse = params.showGreenhouse;
        }
        if (params.showWishPanel !== undefined) {
            this.showWishPanel = params.showWishPanel;
        }
        if (params.showPaperPanel !== undefined) {
            this.showPaperPanel = params.showPaperPanel;
        }
        if (params.wishDraft !== undefined) {
            this.wishDraft = params.wishDraft;
        }
        if (params.paperQuoteIndex !== undefined) {
            this.paperQuoteIndex = params.paperQuoteIndex;
        }
        if (params.transferOffsetX !== undefined) {
            this.transferOffsetX = params.transferOffsetX;
        }
        if (params.transferFlyX !== undefined) {
            this.transferFlyX = params.transferFlyX;
        }
        if (params.transferFlyY !== undefined) {
            this.transferFlyY = params.transferFlyY;
        }
        if (params.transferFoldScale !== undefined) {
            this.transferFoldScale = params.transferFoldScale;
        }
        if (params.transferPlaneTilt !== undefined) {
            this.transferPlaneTilt = params.transferPlaneTilt;
        }
        if (params.isTransferFlying !== undefined) {
            this.isTransferFlying = params.isTransferFlying;
        }
        if (params.transferStatus !== undefined) {
            this.transferStatus = params.transferStatus;
        }
        if (params.sentPackageCount !== undefined) {
            this.sentPackageCount = params.sentPackageCount;
        }
        if (params.activeTab !== undefined) {
            this.activeTab = params.activeTab;
        }
        if (params.diaryEntries !== undefined) {
            this.diaryEntries = params.diaryEntries;
        }
        if (params.collectedCards !== undefined) {
            this.collectedCards = params.collectedCards;
        }
        if (params.wishNotes !== undefined) {
            this.wishNotes = params.wishNotes;
        }
        if (params.activeCard !== undefined) {
            this.activeCard = params.activeCard;
        }
        if (params.pendingPlacementCardId !== undefined) {
            this.pendingPlacementCardId = params.pendingPlacementCardId;
        }
        if (params.slots !== undefined) {
            this.slots = params.slots;
        }
        if (params.drawSeed !== undefined) {
            this.drawSeed = params.drawSeed;
        }
        if (params.isWindowWiped !== undefined) {
            this.isWindowWiped = params.isWindowWiped;
        }
        if (params.hasSelectedMood !== undefined) {
            this.hasSelectedMood = params.hasSelectedMood;
        }
        if (params.isCompact !== undefined) {
            this.isCompact = params.isCompact;
        }
        if (params.isWide !== undefined) {
            this.isWide = params.isWide;
        }
        if (params.compactListener !== undefined) {
            this.compactListener = params.compactListener;
        }
        if (params.wideListener !== undefined) {
            this.wideListener = params.wideListener;
        }
        if (params.diaryPreferences !== undefined) {
            this.diaryPreferences = params.diaryPreferences;
        }
        if (params.hasLoadedDiaryStore !== undefined) {
            this.hasLoadedDiaryStore = params.hasLoadedDiaryStore;
        }
        if (params.diaryStoreName !== undefined) {
            this.diaryStoreName = params.diaryStoreName;
        }
        if (params.diaryEntriesKey !== undefined) {
            this.diaryEntriesKey = params.diaryEntriesKey;
        }
        if (params.collectedCardsKey !== undefined) {
            this.collectedCardsKey = params.collectedCardsKey;
        }
        if (params.buildingSlotsKey !== undefined) {
            this.buildingSlotsKey = params.buildingSlotsKey;
        }
        if (params.wishNotesKey !== undefined) {
            this.wishNotesKey = params.wishNotesKey;
        }
    }
    updateStateVars(params: Index_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__currentMood.purgeDependencyOnElmtId(rmElmtId);
        this.__customMood.purgeDependencyOnElmtId(rmElmtId);
        this.__showGacha.purgeDependencyOnElmtId(rmElmtId);
        this.__showMoodWheel.purgeDependencyOnElmtId(rmElmtId);
        this.__worldOpacity.purgeDependencyOnElmtId(rmElmtId);
        this.__crystals.purgeDependencyOnElmtId(rmElmtId);
        this.__hasMoodRewardedToday.purgeDependencyOnElmtId(rmElmtId);
        this.__dailyNote.purgeDependencyOnElmtId(rmElmtId);
        this.__showMoodCalendar.purgeDependencyOnElmtId(rmElmtId);
        this.__showGreenhouse.purgeDependencyOnElmtId(rmElmtId);
        this.__showWishPanel.purgeDependencyOnElmtId(rmElmtId);
        this.__showPaperPanel.purgeDependencyOnElmtId(rmElmtId);
        this.__wishDraft.purgeDependencyOnElmtId(rmElmtId);
        this.__paperQuoteIndex.purgeDependencyOnElmtId(rmElmtId);
        this.__transferOffsetX.purgeDependencyOnElmtId(rmElmtId);
        this.__transferFlyX.purgeDependencyOnElmtId(rmElmtId);
        this.__transferFlyY.purgeDependencyOnElmtId(rmElmtId);
        this.__transferFoldScale.purgeDependencyOnElmtId(rmElmtId);
        this.__transferPlaneTilt.purgeDependencyOnElmtId(rmElmtId);
        this.__isTransferFlying.purgeDependencyOnElmtId(rmElmtId);
        this.__transferStatus.purgeDependencyOnElmtId(rmElmtId);
        this.__sentPackageCount.purgeDependencyOnElmtId(rmElmtId);
        this.__activeTab.purgeDependencyOnElmtId(rmElmtId);
        this.__diaryEntries.purgeDependencyOnElmtId(rmElmtId);
        this.__collectedCards.purgeDependencyOnElmtId(rmElmtId);
        this.__wishNotes.purgeDependencyOnElmtId(rmElmtId);
        this.__activeCard.purgeDependencyOnElmtId(rmElmtId);
        this.__pendingPlacementCardId.purgeDependencyOnElmtId(rmElmtId);
        this.__slots.purgeDependencyOnElmtId(rmElmtId);
        this.__drawSeed.purgeDependencyOnElmtId(rmElmtId);
        this.__isWindowWiped.purgeDependencyOnElmtId(rmElmtId);
        this.__hasSelectedMood.purgeDependencyOnElmtId(rmElmtId);
        this.__isCompact.purgeDependencyOnElmtId(rmElmtId);
        this.__isWide.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__currentMood.aboutToBeDeleted();
        this.__customMood.aboutToBeDeleted();
        this.__showGacha.aboutToBeDeleted();
        this.__showMoodWheel.aboutToBeDeleted();
        this.__worldOpacity.aboutToBeDeleted();
        this.__crystals.aboutToBeDeleted();
        this.__hasMoodRewardedToday.aboutToBeDeleted();
        this.__dailyNote.aboutToBeDeleted();
        this.__showMoodCalendar.aboutToBeDeleted();
        this.__showGreenhouse.aboutToBeDeleted();
        this.__showWishPanel.aboutToBeDeleted();
        this.__showPaperPanel.aboutToBeDeleted();
        this.__wishDraft.aboutToBeDeleted();
        this.__paperQuoteIndex.aboutToBeDeleted();
        this.__transferOffsetX.aboutToBeDeleted();
        this.__transferFlyX.aboutToBeDeleted();
        this.__transferFlyY.aboutToBeDeleted();
        this.__transferFoldScale.aboutToBeDeleted();
        this.__transferPlaneTilt.aboutToBeDeleted();
        this.__isTransferFlying.aboutToBeDeleted();
        this.__transferStatus.aboutToBeDeleted();
        this.__sentPackageCount.aboutToBeDeleted();
        this.__activeTab.aboutToBeDeleted();
        this.__diaryEntries.aboutToBeDeleted();
        this.__collectedCards.aboutToBeDeleted();
        this.__wishNotes.aboutToBeDeleted();
        this.__activeCard.aboutToBeDeleted();
        this.__pendingPlacementCardId.aboutToBeDeleted();
        this.__slots.aboutToBeDeleted();
        this.__drawSeed.aboutToBeDeleted();
        this.__isWindowWiped.aboutToBeDeleted();
        this.__hasSelectedMood.aboutToBeDeleted();
        this.__isCompact.aboutToBeDeleted();
        this.__isWide.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __currentMood: ObservedPropertyObjectPU<MoodOption>;
    get currentMood() {
        return this.__currentMood.get();
    }
    set currentMood(newValue: MoodOption) {
        this.__currentMood.set(newValue);
    }
    private __customMood: ObservedPropertyObjectPU<MoodOption>;
    get customMood() {
        return this.__customMood.get();
    }
    set customMood(newValue: MoodOption) {
        this.__customMood.set(newValue);
    }
    private __showGacha: ObservedPropertySimplePU<boolean>;
    get showGacha() {
        return this.__showGacha.get();
    }
    set showGacha(newValue: boolean) {
        this.__showGacha.set(newValue);
    }
    private __showMoodWheel: ObservedPropertySimplePU<boolean>;
    get showMoodWheel() {
        return this.__showMoodWheel.get();
    }
    set showMoodWheel(newValue: boolean) {
        this.__showMoodWheel.set(newValue);
    }
    private __worldOpacity: ObservedPropertySimplePU<number>;
    get worldOpacity() {
        return this.__worldOpacity.get();
    }
    set worldOpacity(newValue: number) {
        this.__worldOpacity.set(newValue);
    }
    private __crystals: ObservedPropertySimplePU<number>;
    get crystals() {
        return this.__crystals.get();
    }
    set crystals(newValue: number) {
        this.__crystals.set(newValue);
    }
    private __hasMoodRewardedToday: ObservedPropertySimplePU<boolean>;
    get hasMoodRewardedToday() {
        return this.__hasMoodRewardedToday.get();
    }
    set hasMoodRewardedToday(newValue: boolean) {
        this.__hasMoodRewardedToday.set(newValue);
    }
    private __dailyNote: ObservedPropertySimplePU<string>;
    get dailyNote() {
        return this.__dailyNote.get();
    }
    set dailyNote(newValue: string) {
        this.__dailyNote.set(newValue);
    }
    private __showMoodCalendar: ObservedPropertySimplePU<boolean>;
    get showMoodCalendar() {
        return this.__showMoodCalendar.get();
    }
    set showMoodCalendar(newValue: boolean) {
        this.__showMoodCalendar.set(newValue);
    }
    private __showGreenhouse: ObservedPropertySimplePU<boolean>;
    get showGreenhouse() {
        return this.__showGreenhouse.get();
    }
    set showGreenhouse(newValue: boolean) {
        this.__showGreenhouse.set(newValue);
    }
    private __showWishPanel: ObservedPropertySimplePU<boolean>;
    get showWishPanel() {
        return this.__showWishPanel.get();
    }
    set showWishPanel(newValue: boolean) {
        this.__showWishPanel.set(newValue);
    }
    private __showPaperPanel: ObservedPropertySimplePU<boolean>;
    get showPaperPanel() {
        return this.__showPaperPanel.get();
    }
    set showPaperPanel(newValue: boolean) {
        this.__showPaperPanel.set(newValue);
    }
    private __wishDraft: ObservedPropertySimplePU<string>;
    get wishDraft() {
        return this.__wishDraft.get();
    }
    set wishDraft(newValue: string) {
        this.__wishDraft.set(newValue);
    }
    private __paperQuoteIndex: ObservedPropertySimplePU<number>;
    get paperQuoteIndex() {
        return this.__paperQuoteIndex.get();
    }
    set paperQuoteIndex(newValue: number) {
        this.__paperQuoteIndex.set(newValue);
    }
    private __transferOffsetX: ObservedPropertySimplePU<number>;
    get transferOffsetX() {
        return this.__transferOffsetX.get();
    }
    set transferOffsetX(newValue: number) {
        this.__transferOffsetX.set(newValue);
    }
    private __transferFlyX: ObservedPropertySimplePU<number>;
    get transferFlyX() {
        return this.__transferFlyX.get();
    }
    set transferFlyX(newValue: number) {
        this.__transferFlyX.set(newValue);
    }
    private __transferFlyY: ObservedPropertySimplePU<number>;
    get transferFlyY() {
        return this.__transferFlyY.get();
    }
    set transferFlyY(newValue: number) {
        this.__transferFlyY.set(newValue);
    }
    private __transferFoldScale: ObservedPropertySimplePU<number>;
    get transferFoldScale() {
        return this.__transferFoldScale.get();
    }
    set transferFoldScale(newValue: number) {
        this.__transferFoldScale.set(newValue);
    }
    private __transferPlaneTilt: ObservedPropertySimplePU<number>;
    get transferPlaneTilt() {
        return this.__transferPlaneTilt.get();
    }
    set transferPlaneTilt(newValue: number) {
        this.__transferPlaneTilt.set(newValue);
    }
    private __isTransferFlying: ObservedPropertySimplePU<boolean>;
    get isTransferFlying() {
        return this.__isTransferFlying.get();
    }
    set isTransferFlying(newValue: boolean) {
        this.__isTransferFlying.set(newValue);
    }
    private __transferStatus: ObservedPropertySimplePU<string>;
    get transferStatus() {
        return this.__transferStatus.get();
    }
    set transferStatus(newValue: string) {
        this.__transferStatus.set(newValue);
    }
    private __sentPackageCount: ObservedPropertySimplePU<number>;
    get sentPackageCount() {
        return this.__sentPackageCount.get();
    }
    set sentPackageCount(newValue: number) {
        this.__sentPackageCount.set(newValue);
    }
    private __activeTab: ObservedPropertySimplePU<string>;
    get activeTab() {
        return this.__activeTab.get();
    }
    set activeTab(newValue: string) {
        this.__activeTab.set(newValue);
    }
    private __diaryEntries: ObservedPropertyObjectPU<MoodDiaryEntry[]>;
    get diaryEntries() {
        return this.__diaryEntries.get();
    }
    set diaryEntries(newValue: MoodDiaryEntry[]) {
        this.__diaryEntries.set(newValue);
    }
    private __collectedCards: ObservedPropertyObjectPU<CollectedCard[]>;
    get collectedCards() {
        return this.__collectedCards.get();
    }
    set collectedCards(newValue: CollectedCard[]) {
        this.__collectedCards.set(newValue);
    }
    private __wishNotes: ObservedPropertyObjectPU<WishNote[]>;
    get wishNotes() {
        return this.__wishNotes.get();
    }
    set wishNotes(newValue: WishNote[]) {
        this.__wishNotes.set(newValue);
    }
    private __activeCard: ObservedPropertyObjectPU<PolaroidCard | undefined>;
    get activeCard() {
        return this.__activeCard.get();
    }
    set activeCard(newValue: PolaroidCard | undefined) {
        this.__activeCard.set(newValue);
    }
    private __pendingPlacementCardId: ObservedPropertySimplePU<string>;
    get pendingPlacementCardId() {
        return this.__pendingPlacementCardId.get();
    }
    set pendingPlacementCardId(newValue: string) {
        this.__pendingPlacementCardId.set(newValue);
    }
    private __slots: ObservedPropertyObjectPU<BuildingSlot[]>;
    get slots() {
        return this.__slots.get();
    }
    set slots(newValue: BuildingSlot[]) {
        this.__slots.set(newValue);
    }
    private __drawSeed: ObservedPropertySimplePU<number>;
    get drawSeed() {
        return this.__drawSeed.get();
    }
    set drawSeed(newValue: number) {
        this.__drawSeed.set(newValue);
    }
    private __isWindowWiped: ObservedPropertySimplePU<boolean>;
    get isWindowWiped() {
        return this.__isWindowWiped.get();
    }
    set isWindowWiped(newValue: boolean) {
        this.__isWindowWiped.set(newValue);
    }
    private __hasSelectedMood: ObservedPropertySimplePU<boolean>;
    get hasSelectedMood() {
        return this.__hasSelectedMood.get();
    }
    set hasSelectedMood(newValue: boolean) {
        this.__hasSelectedMood.set(newValue);
    }
    private __isCompact: ObservedPropertySimplePU<boolean>;
    get isCompact() {
        return this.__isCompact.get();
    }
    set isCompact(newValue: boolean) {
        this.__isCompact.set(newValue);
    }
    private __isWide: ObservedPropertySimplePU<boolean>;
    get isWide() {
        return this.__isWide.get();
    }
    set isWide(newValue: boolean) {
        this.__isWide.set(newValue);
    }
    private compactListener: mediaquery.MediaQueryListener;
    private wideListener: mediaquery.MediaQueryListener;
    private diaryPreferences: preferences.Preferences | undefined;
    private hasLoadedDiaryStore: boolean;
    private readonly diaryStoreName: string;
    private readonly diaryEntriesKey: string;
    private readonly collectedCardsKey: string;
    private readonly buildingSlotsKey: string;
    private readonly wishNotesKey: string;
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
        }
        catch {
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
            if (dateKey === undefined ||
                dayText === undefined ||
                moodId === undefined ||
                moodName === undefined ||
                moodColor === undefined ||
                weather === undefined ||
                note === undefined) {
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
            if (slotIdText === undefined ||
                buildingIdText === undefined ||
                positionX === undefined ||
                positionY === undefined) {
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
        }
        else if (nextOffset > 48) {
            this.transferStatus = '正在靠近对方的小镇...';
        }
        else {
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
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create();
            Context.animation({ duration: 780, curve: Curve.FastOutSlowIn });
            Stack.width('100%');
            Stack.height('100%');
            Stack.backgroundColor('#EDF4F0');
            Context.animation(null);
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            __Common__.create();
            Context.animation({ duration: 760, curve: Curve.FastOutSlowIn });
            __Common__.opacity(this.worldOpacity);
            Context.animation(null);
        }, __Common__);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new TownScene(this, {
                        mood: this.currentMood,
                        isCompact: this.isCompact,
                        isWide: this.isWide,
                        slots: this.__slots,
                        pendingPlacementCardId: this.__pendingPlacementCardId,
                        activeCard: this.__activeCard
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 761, col: 7 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            mood: this.currentMood,
                            isCompact: this.isCompact,
                            isWide: this.isWide,
                            slots: this.slots,
                            pendingPlacementCardId: this.pendingPlacementCardId,
                            activeCard: this.activeCard
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        mood: this.currentMood,
                        isCompact: this.isCompact,
                        isWide: this.isWide
                    });
                }
            }, { name: "TownScene" });
        }
        __Common__.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (!this.isWindowWiped) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        __Common__.create();
                        Context.animation({ duration: 680, curve: Curve.EaseOut });
                        __Common__.opacity(1);
                        Context.animation(null);
                    }, __Common__);
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new WindowWiper(this, {
                                    mood: this.currentMood,
                                    isCompact: this.isCompact,
                                    isWide: this.isWide,
                                    isWiped: this.__isWindowWiped
                                }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 773, col: 9 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        mood: this.currentMood,
                                        isCompact: this.isCompact,
                                        isWide: this.isWide,
                                        isWiped: this.isWindowWiped
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {
                                    mood: this.currentMood,
                                    isCompact: this.isCompact,
                                    isWide: this.isWide
                                });
                            }
                        }, { name: "WindowWiper" });
                    }
                    __Common__.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.isWindowWiped) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                        Context.animation({ duration: 560, curve: Curve.EaseOut });
                        Row.width('100%');
                        Row.padding({
                            left: this.isCompact ? 18 : this.isWide ? 44 : 24,
                            right: this.isCompact ? 18 : this.isWide ? 44 : 24,
                            top: this.isCompact ? 28 : this.isWide ? 48 : 38
                        });
                        Row.align(Alignment.Top);
                        Context.animation(null);
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.alignItems(HorizontalAlign.Start);
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('DreamJourney');
                        Text.fontSize(this.isCompact ? 22 : this.isWide ? 30 : 24);
                        Text.fontWeight(FontWeight.Medium);
                        Text.fontColor('#506164');
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('梦想之旅');
                        Text.fontSize(this.isCompact ? 11 : 12);
                        Text.fontColor('#7A8A8D');
                        Text.opacity(0.9);
                        Text.margin({ top: 3 });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                        Row.padding({ left: 10, right: 12, top: 6, bottom: 6 });
                        Row.borderRadius(16);
                        Row.backgroundColor('#F7FBF8A8');
                        Row.backdropBlur(12);
                        Row.margin({ top: 8 });
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.getTodayText());
                        Text.fontSize(11);
                        Text.fontColor('#607174');
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.currentMood.weather);
                        Text.fontSize(11);
                        Text.fontColor('#7A8A8D');
                        Text.margin({ left: 10 });
                    }, Text);
                    Text.pop();
                    Row.pop();
                    Column.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Blank.create();
                    }, Blank);
                    Blank.pop();
                    Row.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.isWindowWiped &&
                this.activeTab === 'town' &&
                !this.showMoodWheel &&
                !this.showWishPanel &&
                !this.showPaperPanel) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Context.animation({ duration: 520, curve: Curve.EaseOut });
                        Column.position({ x: this.isCompact ? '58%' : this.isWide ? '60%' : '58%', y: this.isCompact ? '35%' : '32%' });
                        Column.zIndex(6);
                        Context.animation(null);
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                        Row.padding({ left: 13, right: 15, top: 8, bottom: 8 });
                        Row.borderRadius(18);
                        Row.backgroundColor('#FFF8E9C8');
                        Row.backdropBlur(16);
                        Row.shadow({ radius: 14, color: '#6B5D3C1C', offsetY: 6 });
                        Row.rotate({ angle: -4 });
                        Row.onClick(() => {
                            this.openWishPanel();
                        });
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.width(7);
                        Column.height(7);
                        Column.borderRadius(4);
                        Column.backgroundColor(this.currentMood.color);
                        Column.opacity(0.86);
                    }, Column);
                    Column.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('心愿便笺');
                        Text.fontSize(12);
                        Text.fontColor('#5C6D70');
                        Text.margin({ left: 8 });
                    }, Text);
                    Text.pop();
                    Row.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                        Row.padding({ left: 13, right: 15, top: 8, bottom: 8 });
                        Row.borderRadius(18);
                        Row.backgroundColor('#F7FBF8C8');
                        Row.backdropBlur(16);
                        Row.shadow({ radius: 14, color: '#31464A18', offsetY: 6 });
                        Row.margin({ top: 8, left: 20 });
                        Row.rotate({ angle: 3 });
                        Row.onClick(() => {
                            this.openPaperPanel();
                        });
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.width(7);
                        Column.height(7);
                        Column.borderRadius(4);
                        Column.backgroundColor('#C7D9C8');
                        Column.opacity(0.9);
                    }, Column);
                    Column.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('树下纸条');
                        Text.fontSize(12);
                        Text.fontColor('#5C6D70');
                        Text.margin({ left: 8 });
                    }, Text);
                    Text.pop();
                    Row.pop();
                    Column.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Context.animation({ duration: 620, curve: Curve.FastOutSlowIn });
                        Column.width(this.isWide ? '46%' : (this.isCompact ? '90%' : '82%'));
                        Column.alignItems(HorizontalAlign.Center);
                        Column.align(Alignment.Bottom);
                        Column.margin({ bottom: this.isCompact ? 86 : this.isWide ? 112 : 96 });
                        Context.animation(null);
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.getMoodEntryHint());
                        Text.fontSize(this.isCompact ? 12 : 13);
                        Text.fontColor('#607174');
                        Text.textAlign(TextAlign.Center);
                        Text.maxLines(2);
                        Text.opacity(0.9);
                        Text.margin({ left: 18, right: 18, bottom: 12 });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                        Context.animation({ duration: 520, curve: Curve.EaseOut });
                        Row.padding({ left: 14, right: 14, top: 9, bottom: 9 });
                        Row.borderRadius(20);
                        Row.backgroundColor('#F7FBF8CC');
                        Row.backdropBlur(16);
                        Context.animation(null);
                        Row.onClick(() => {
                            this.openMoodPalette();
                        });
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.width(9);
                        Column.height(9);
                        Column.borderRadius(5);
                        Column.backgroundColor(this.currentMood.color);
                        Column.opacity(0.84);
                    }, Column);
                    Column.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.getMoodEntryLabel());
                        Text.fontSize(13);
                        Text.fontColor('#607174');
                        Text.margin({ left: 8 });
                    }, Text);
                    Text.pop();
                    Row.pop();
                    Column.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.isWindowWiped && this.activeTab === 'gacha') {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Context.animation({ duration: 620, curve: Curve.FastOutSlowIn });
                        Column.width('100%');
                        Column.height('100%');
                        Column.justifyContent(FlexAlign.Center);
                        Column.padding({ bottom: 86 });
                        Column.backgroundColor('#EAF1F088');
                        Column.backdropBlur(18);
                        Column.opacity(this.activeTab === 'gacha' ? 1 : 0);
                        Context.animation(null);
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                        Row.width(this.isWide ? '52%' : '86%');
                        Row.margin({ bottom: 20 });
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(`情绪结晶 ${this.crystals}`);
                        Text.fontSize(13);
                        Text.fontColor('#607174');
                        Text.padding({ left: 16, right: 16, top: 8, bottom: 8 });
                        Text.borderRadius(18);
                        Text.backgroundColor('#FFFFFF99');
                        Text.backdropBlur(16);
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Blank.create();
                    }, Blank);
                    Blank.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.pendingPlacementCardId.length > 0 ? '有建筑待放置' : '拍立得显影');
                        Text.fontSize(12);
                        Text.fontColor('#7E8E90');
                    }, Text);
                    Text.pop();
                    Row.pop();
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new PolaroidGacha(this, {
                                    activeCard: this.__activeCard,
                                    pendingPlacementCardId: this.__pendingPlacementCardId,
                                    collectedCards: this.__collectedCards
                                }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 944, col: 11 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        activeCard: this.activeCard,
                                        pendingPlacementCardId: this.pendingPlacementCardId,
                                        collectedCards: this.collectedCards
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                            }
                        }, { name: "PolaroidGacha" });
                    }
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        If.create();
                        if (this.activeCard === undefined || this.activeCard.isRevealed) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Text.create(this.getGachaActionText());
                                    Context.animation({ duration: 520, curve: Curve.EaseOut });
                                    Text.fontSize(13);
                                    Text.fontColor('#607174');
                                    Text.padding({ left: 18, right: 18, top: 10, bottom: 10 });
                                    Text.borderRadius(22);
                                    Text.backgroundColor('#FFFFFFBB');
                                    Text.backdropBlur(16);
                                    Text.margin({ top: 18 });
                                    Text.opacity(0.96);
                                    Context.animation(null);
                                    Text.onClick(() => {
                                        if (this.crystals > 0) {
                                            this.drawPolaroid();
                                            return;
                                        }
                                        if (this.pendingPlacementCardId.length > 0) {
                                            this.openTownTab();
                                            return;
                                        }
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
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        If.create();
                        if (this.pendingPlacementCardId.length > 0) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Text.create('回小镇放置');
                                    Text.fontSize(13);
                                    Text.fontColor('#607174');
                                    Text.padding({ left: 18, right: 18, top: 9, bottom: 9 });
                                    Text.borderRadius(20);
                                    Text.backgroundColor('#F7FBF8C8');
                                    Text.backdropBlur(14);
                                    Text.margin({ top: 10 });
                                    Text.onClick(() => {
                                        this.openTownTab();
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
                    Column.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.showMoodWheel) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Context.animation({ duration: 560, curve: Curve.FastOutSlowIn });
                        Column.width('100%');
                        Column.height('100%');
                        Column.justifyContent(FlexAlign.Center);
                        Column.alignItems(HorizontalAlign.Center);
                        Column.backgroundColor('#1F2D3028');
                        Column.backdropBlur(18);
                        Column.opacity(this.showMoodWheel ? 1 : 0);
                        Context.animation(null);
                    }, Column);
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new MoodPalette(this, {
                                    currentMood: this.__currentMood,
                                    customMood: this.__customMood,
                                    isVisible: this.__showMoodWheel,
                                    crystals: this.__crystals,
                                    hasMoodRewardedToday: this.__hasMoodRewardedToday,
                                    dailyNote: this.__dailyNote,
                                    diaryEntries: this.__diaryEntries,
                                    todayKey: this.getTodayKey(),
                                    todayText: this.getTodayText(),
                                    hasSelectedMood: this.__hasSelectedMood,
                                    isCompact: this.isCompact,
                                    isWide: this.isWide
                                }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 999, col: 11 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
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
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {
                                    todayKey: this.getTodayKey(),
                                    todayText: this.getTodayText(),
                                    isCompact: this.isCompact,
                                    isWide: this.isWide
                                });
                            }
                        }, { name: "MoodPalette" });
                    }
                    Column.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.showWishPanel) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Context.animation({ duration: 560, curve: Curve.FastOutSlowIn });
                        Column.width(this.isCompact ? '90%' : this.isWide ? '44%' : '76%');
                        Column.padding({ left: 18, right: 18, top: 18, bottom: 18 });
                        Column.borderRadius(28);
                        Column.backgroundColor('#FDFEFADD');
                        Column.backdropBlur(22);
                        Column.shadow({ radius: 28, color: '#31464A20', offsetY: 12 });
                        Column.align(Alignment.Center);
                        Context.animation(null);
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                        Row.width('100%');
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('心愿便笺');
                        Text.fontSize(19);
                        Text.fontWeight(FontWeight.Medium);
                        Text.fontColor('#506164');
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Blank.create();
                    }, Blank);
                    Blank.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('收起');
                        Text.fontSize(13);
                        Text.fontColor('#6E7E81');
                        Text.padding({ left: 12, right: 12, top: 7, bottom: 7 });
                        Text.borderRadius(16);
                        Text.backgroundColor('#F7FBF890');
                        Text.onClick(() => {
                            this.showWishPanel = false;
                        });
                    }, Text);
                    Text.pop();
                    Row.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('把一个愿望挂在心境之树上，不需要今天就实现。');
                        Text.fontSize(12);
                        Text.fontColor('#849497');
                        Text.margin({ top: 8, bottom: 14 });
                        Text.width('100%');
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        TextInput.create({ text: this.wishDraft, placeholder: '例如：希望自己慢慢有勇气' });
                        TextInput.height(44);
                        TextInput.fontSize(14);
                        TextInput.fontColor('#607174');
                        TextInput.placeholderColor('#9AA8AA');
                        TextInput.backgroundColor('#F7FBF8C8');
                        TextInput.borderRadius(22);
                        TextInput.padding({ left: 16, right: 16 });
                        TextInput.onChange((value: string) => {
                            this.wishDraft = value.length > 28 ? value.substring(0, 28) : value;
                        });
                    }, TextInput);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('挂上树梢');
                        Text.fontSize(14);
                        Text.fontColor('#56686B');
                        Text.padding({ left: 18, right: 18, top: 9, bottom: 9 });
                        Text.borderRadius(20);
                        Text.backgroundColor('#EDF6F1D8');
                        Text.backdropBlur(12);
                        Text.margin({ top: 12 });
                        Text.onClick(() => {
                            this.addWishNote();
                        });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Scroll.create();
                        Scroll.height(180);
                        Scroll.scrollBar(BarState.Off);
                        Scroll.margin({ top: 8 });
                    }, Scroll);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        ForEach.create();
                        const forEachItemGenFunction = _item => {
                            const note = _item;
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Row.create();
                                Row.width('100%');
                                Row.padding({ left: 12, right: 12, top: 10, bottom: 10 });
                                Row.borderRadius(18);
                                Row.backgroundColor('#F7FBF8AA');
                                Row.margin({ top: 10 });
                            }, Row);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Column.create();
                                Column.width(8);
                                Column.height(8);
                                Column.borderRadius(4);
                                Column.backgroundColor(this.currentMood.color);
                                Column.opacity(0.82);
                            }, Column);
                            Column.pop();
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Column.create();
                                Column.margin({ left: 10 });
                                Column.layoutWeight(1);
                            }, Column);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create(note.text);
                                Text.fontSize(13);
                                Text.fontColor('#506164');
                                Text.lineHeight(20);
                                Text.width('100%');
                            }, Text);
                            Text.pop();
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create(note.createDate);
                                Text.fontSize(10);
                                Text.fontColor('#92A0A2');
                                Text.margin({ top: 4 });
                            }, Text);
                            Text.pop();
                            Column.pop();
                            Row.pop();
                        };
                        this.forEachUpdateFunction(elmtId, this.wishNotes, forEachItemGenFunction, (note: WishNote) => note.id, false, false);
                    }, ForEach);
                    ForEach.pop();
                    Column.pop();
                    Scroll.pop();
                    Column.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.showPaperPanel) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Stack.create({ alignContent: Alignment.Center });
                        Context.animation({ duration: 560, curve: Curve.FastOutSlowIn });
                        Stack.width('100%');
                        Stack.height('100%');
                        Stack.align(Alignment.Center);
                        Context.animation(null);
                    }, Stack);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.width(this.isCompact ? '82%' : this.isWide ? '34%' : '64%');
                        Column.height(this.isCompact ? 232 : 250);
                        Column.borderRadius(24);
                        Column.backgroundColor('#EEDFC7A8');
                        Column.rotate({ angle: -3 });
                        Column.translate({ x: -8, y: 10 });
                        Column.shadow({ radius: 18, color: '#6B5D3C18', offsetY: 8 });
                    }, Column);
                    Column.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.width(this.isCompact ? '82%' : this.isWide ? '34%' : '64%');
                        Column.height(this.isCompact ? 232 : 250);
                        Column.borderRadius(24);
                        Column.backgroundColor('#FFF9EACC');
                        Column.rotate({ angle: 2 });
                        Column.translate({ x: 8, y: 4 });
                    }, Column);
                    Column.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.width(this.isCompact ? '84%' : this.isWide ? '36%' : '66%');
                        Column.height(this.isCompact ? 250 : 268);
                        Column.padding({ left: 20, right: 20, top: 18, bottom: 18 });
                        Column.borderRadius(26);
                        Column.backgroundColor('#FFFDF2E8');
                        Column.backdropBlur(20);
                        Column.shadow({ radius: 30, color: '#31464A20', offsetY: 12 });
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                        Row.width('100%');
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('纸条from心情广场');
                        Text.fontSize(18);
                        Text.fontWeight(FontWeight.Medium);
                        Text.fontColor('#506164');
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Blank.create();
                    }, Blank);
                    Blank.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('收起');
                        Text.fontSize(12);
                        Text.fontColor('#6E7E81');
                        Text.padding({ left: 11, right: 11, top: 6, bottom: 6 });
                        Text.borderRadius(15);
                        Text.backgroundColor('#F7FBF8A8');
                        Text.onClick(() => {
                            this.showPaperPanel = false;
                        });
                    }, Text);
                    Text.pop();
                    Row.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.width('100%');
                        Column.height(1);
                        Column.backgroundColor('#D8C99D66');
                        Column.margin({ top: 12, bottom: 18 });
                    }, Column);
                    Column.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Context.animation({ duration: this.isTransferFlying ? 760 : 360, curve: Curve.FastOutSlowIn });
                        Column.width('100%');
                        Column.padding({ left: 16, right: 16, top: 14, bottom: 14 });
                        Column.borderRadius(22);
                        Column.backgroundColor('#CCFDFEFA');
                        Column.backdropBlur(12);
                        Column.translate({ x: this.transferOffsetX + this.transferFlyX, y: this.transferFlyY });
                        Column.scale({ x: this.transferFoldScale, y: this.transferFoldScale });
                        Column.rotate({ angle: this.transferPlaneTilt });
                        Column.shadow({
                            radius: this.transferOffsetX > 16 || this.isTransferFlying ? 22 : 8,
                            color: '#1831464A',
                            offsetY: 8
                        });
                        Column.layoutWeight(1);
                        Context.animation(null);
                        Gesture.create(GesturePriority.Low);
                        PanGesture.create({ direction: PanDirection.Horizontal });
                        PanGesture.onActionUpdate((event: GestureEvent) => {
                            if (!event) {
                                return;
                            }
                            this.updateTransferDrag(event.offsetX);
                        });
                        PanGesture.onActionEnd(() => {
                            this.finishTransferDrag();
                        });
                        PanGesture.pop();
                        Gesture.pop();
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        If.create();
                        if (this.isTransferFlying) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Column.create();
                                    Context.animation({ duration: 760, curve: Curve.EaseOut });
                                    Column.width(74);
                                    Column.height(2);
                                    Column.borderRadius(1);
                                    Column.backgroundColor('#88BFDCE8');
                                    Column.opacity(0.72);
                                    Column.rotate({ angle: -12 });
                                    Column.translate({ x: -62, y: 18 });
                                    Context.animation(null);
                                }, Column);
                                Column.pop();
                            });
                        }
                        else {
                            this.ifElseBranchUpdateFunction(1, () => {
                            });
                        }
                    }, If);
                    If.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                        Row.width('100%');
                        Row.opacity(this.isTransferFlying ? 0 : 1);
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.width(8);
                        Column.height(8);
                        Column.borderRadius(4);
                        Column.backgroundColor(this.currentMood.color);
                        Column.opacity(0.82);
                    }, Column);
                    Column.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(`流转包 ${this.sentPackageCount}`);
                        Text.fontSize(11);
                        Text.fontColor('#7E8E90');
                        Text.margin({ left: 7 });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Blank.create();
                    }, Blank);
                    Blank.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('右滑寄出');
                        Text.fontSize(11);
                        Text.fontColor('#7E8E90');
                    }, Text);
                    Text.pop();
                    Row.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        If.create();
                        if (this.isTransferFlying) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Stack.create({ alignContent: Alignment.Center });
                                    Context.animation({ duration: 760, curve: Curve.FastOutSlowIn });
                                    Stack.width('100%');
                                    Stack.height(82);
                                    Context.animation(null);
                                }, Stack);
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Column.create();
                                    Column.width(72);
                                    Column.height(42);
                                    Column.borderRadius(8);
                                    Column.backgroundColor('#FDFEFACC');
                                    Column.rotate({ angle: -18 });
                                }, Column);
                                Column.pop();
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Column.create();
                                    Column.width(56);
                                    Column.height(28);
                                    Column.borderRadius(6);
                                    Column.backgroundColor('#D8EDF6F1');
                                    Column.rotate({ angle: 16 });
                                }, Column);
                                Column.pop();
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Text.create('纸飞机');
                                    Text.fontSize(10);
                                    Text.fontColor('#607174');
                                }, Text);
                                Text.pop();
                                Stack.pop();
                            });
                        }
                        else {
                            this.ifElseBranchUpdateFunction(1, () => {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Text.create(this.getPaperQuote());
                                    Text.fontSize(16);
                                    Text.fontColor('#506164');
                                    Text.lineHeight(26);
                                    Text.margin({ top: 14 });
                                    Text.width('100%');
                                }, Text);
                                Text.pop();
                            });
                        }
                    }, If);
                    If.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                        Row.width('100%');
                        Row.margin({ top: 16 });
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.width(9);
                        Column.height(9);
                        Column.borderRadius(5);
                        Column.backgroundColor(this.transferOffsetX > 118 ? '#BFDCE8' : this.currentMood.color);
                        Column.opacity(0.86);
                    }, Column);
                    Column.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.transferStatus);
                        Text.fontSize(12);
                        Text.fontColor('#6E7E81');
                        Text.margin({ left: 8 });
                        Text.maxLines(1);
                    }, Text);
                    Text.pop();
                    Row.pop();
                    Column.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                        Row.padding({ left: 18, right: 18, top: 9, bottom: 9 });
                        Row.borderRadius(20);
                        Row.backgroundColor('#EDF6F1D8');
                        Row.backdropBlur(12);
                        Row.align(Alignment.Center);
                        Row.onClick(() => {
                            this.showNextPaperQuote();
                        });
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.width(8);
                        Column.height(8);
                        Column.borderRadius(4);
                        Column.backgroundColor(this.currentMood.color);
                        Column.opacity(0.82);
                    }, Column);
                    Column.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('换一张纸条');
                        Text.fontSize(14);
                        Text.fontColor('#56686B');
                        Text.margin({ left: 8 });
                    }, Text);
                    Text.pop();
                    Row.pop();
                    Column.pop();
                    Stack.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.isWindowWiped && this.activeTab === 'diary') {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Scroll.create();
                        Context.animation({ duration: 560, curve: Curve.FastOutSlowIn });
                        Scroll.width('100%');
                        Scroll.height('100%');
                        Scroll.scrollBar(BarState.Off);
                        Scroll.backgroundColor('#EAF1F088');
                        Scroll.backdropBlur(18);
                        Scroll.opacity(this.activeTab === 'diary' ? 1 : 0);
                        Context.animation(null);
                    }, Scroll);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.width('100%');
                        Column.alignItems(HorizontalAlign.Center);
                        Column.padding({ top: 86, bottom: 140 });
                    }, Column);
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new MoodCalendar(this, {
                                    entries: this.diaryEntries,
                                    isVisible: this.__showMoodCalendar,
                                    isCompact: this.isCompact,
                                    isWide: this.isWide,
                                    showClose: false
                                }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 1321, col: 13 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        entries: this.diaryEntries,
                                        isVisible: this.showMoodCalendar,
                                        isCompact: this.isCompact,
                                        isWide: this.isWide,
                                        showClose: false
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {
                                    entries: this.diaryEntries,
                                    isCompact: this.isCompact,
                                    isWide: this.isWide,
                                    showClose: false
                                });
                            }
                        }, { name: "MoodCalendar" });
                    }
                    Column.pop();
                    Scroll.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.isWindowWiped && this.activeTab === 'greenhouse') {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Scroll.create();
                        Context.animation({ duration: 560, curve: Curve.FastOutSlowIn });
                        Scroll.width('100%');
                        Scroll.height('100%');
                        Scroll.scrollBar(BarState.Off);
                        Scroll.backgroundColor('#EAF1F088');
                        Scroll.backdropBlur(18);
                        Scroll.opacity(this.activeTab === 'greenhouse' ? 1 : 0);
                        Context.animation(null);
                    }, Scroll);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.width('100%');
                        Column.alignItems(HorizontalAlign.Center);
                        Column.padding({ top: 86, bottom: 140 });
                    }, Column);
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new GreenhouseGallery(this, {
                                    collectedCards: this.collectedCards,
                                    isVisible: this.__showGreenhouse,
                                    isCompact: this.isCompact,
                                    isWide: this.isWide,
                                    showClose: false
                                }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 1345, col: 13 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        collectedCards: this.collectedCards,
                                        isVisible: this.showGreenhouse,
                                        isCompact: this.isCompact,
                                        isWide: this.isWide,
                                        showClose: false
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {
                                    collectedCards: this.collectedCards,
                                    isCompact: this.isCompact,
                                    isWide: this.isWide,
                                    showClose: false
                                });
                            }
                        }, { name: "GreenhouseGallery" });
                    }
                    Column.pop();
                    Scroll.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.isWindowWiped && this.activeTab === 'journey') {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Scroll.create();
                        Context.animation({ duration: 560, curve: Curve.FastOutSlowIn });
                        Scroll.width('100%');
                        Scroll.height('100%');
                        Scroll.scrollBar(BarState.Off);
                        Scroll.backgroundColor('#EAF1F088');
                        Scroll.backdropBlur(18);
                        Scroll.opacity(this.activeTab === 'journey' ? 1 : 0);
                        Context.animation(null);
                    }, Scroll);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.width('100%');
                        Column.alignItems(HorizontalAlign.Center);
                        Column.padding({ top: 86, bottom: 140 });
                    }, Column);
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new JourneyMap(this, {
                                    mood: this.currentMood,
                                    crystals: this.__crystals,
                                    isCompact: this.isCompact,
                                    isWide: this.isWide
                                }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 1369, col: 13 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        mood: this.currentMood,
                                        crystals: this.crystals,
                                        isCompact: this.isCompact,
                                        isWide: this.isWide
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {
                                    mood: this.currentMood,
                                    isCompact: this.isCompact,
                                    isWide: this.isWide
                                });
                            }
                        }, { name: "JourneyMap" });
                    }
                    Column.pop();
                    Scroll.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.isWindowWiped && !this.showMoodWheel && !this.showWishPanel && !this.showPaperPanel) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                        Context.animation({ duration: 560, curve: Curve.FastOutSlowIn });
                        Row.padding({ left: this.isCompact ? 8 : 12, right: this.isCompact ? 8 : 12, top: 8, bottom: 8 });
                        Row.width(this.isCompact ? '96%' : this.isWide ? '54%' : '82%');
                        Row.justifyContent(FlexAlign.Center);
                        Row.borderRadius(30);
                        Row.backgroundColor('#B8EDF6F1');
                        Row.backdropBlur(24);
                        Row.shadow({ radius: 20, color: '#1831464A', offsetY: 9 });
                        Row.position({
                            x: this.isCompact ? '6%' : this.isWide ? '28%' : '14%',
                            y: this.isCompact ? '88%' : '89%'
                        });
                        Context.animation(null);
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        __Common__.create();
                        __Common__.onClick(() => {
                            this.openTownTab();
                        });
                    }, __Common__);
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new DreamTabItem(this, {
                                    labelText: '小镇',
                                    isSelected: this.activeTab === 'town',
                                    isCompact: this.isCompact,
                                    accentColor: this.currentMood.color
                                }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 1391, col: 11 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        labelText: '小镇',
                                        isSelected: this.activeTab === 'town',
                                        isCompact: this.isCompact,
                                        accentColor: this.currentMood.color
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {
                                    labelText: '小镇',
                                    isSelected: this.activeTab === 'town',
                                    isCompact: this.isCompact,
                                    accentColor: this.currentMood.color
                                });
                            }
                        }, { name: "DreamTabItem" });
                    }
                    __Common__.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        __Common__.create();
                        __Common__.margin({ left: this.isCompact ? 4 : 8 });
                        __Common__.onClick(() => {
                            this.openMoodCalendar();
                        });
                    }, __Common__);
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new DreamTabItem(this, {
                                    labelText: '心情',
                                    isSelected: this.activeTab === 'diary',
                                    isCompact: this.isCompact,
                                    accentColor: this.currentMood.color
                                }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 1401, col: 11 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        labelText: '心情',
                                        isSelected: this.activeTab === 'diary',
                                        isCompact: this.isCompact,
                                        accentColor: this.currentMood.color
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {
                                    labelText: '心情',
                                    isSelected: this.activeTab === 'diary',
                                    isCompact: this.isCompact,
                                    accentColor: this.currentMood.color
                                });
                            }
                        }, { name: "DreamTabItem" });
                    }
                    __Common__.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        __Common__.create();
                        __Common__.margin({ left: this.isCompact ? 4 : 8 });
                        __Common__.onClick(() => {
                            this.openGreenhouse();
                        });
                    }, __Common__);
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new DreamTabItem(this, {
                                    labelText: '玻璃房',
                                    isSelected: this.activeTab === 'greenhouse',
                                    isCompact: this.isCompact,
                                    accentColor: this.currentMood.color
                                }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 1412, col: 11 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        labelText: '玻璃房',
                                        isSelected: this.activeTab === 'greenhouse',
                                        isCompact: this.isCompact,
                                        accentColor: this.currentMood.color
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {
                                    labelText: '玻璃房',
                                    isSelected: this.activeTab === 'greenhouse',
                                    isCompact: this.isCompact,
                                    accentColor: this.currentMood.color
                                });
                            }
                        }, { name: "DreamTabItem" });
                    }
                    __Common__.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        __Common__.create();
                        __Common__.margin({ left: this.isCompact ? 4 : 8 });
                        __Common__.onClick(() => {
                            this.toggleGachaPanel();
                        });
                    }, __Common__);
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new DreamTabItem(this, {
                                    labelText: '显影',
                                    isSelected: this.activeTab === 'gacha',
                                    isCompact: this.isCompact,
                                    accentColor: this.currentMood.color
                                }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 1423, col: 11 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        labelText: '显影',
                                        isSelected: this.activeTab === 'gacha',
                                        isCompact: this.isCompact,
                                        accentColor: this.currentMood.color
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {
                                    labelText: '显影',
                                    isSelected: this.activeTab === 'gacha',
                                    isCompact: this.isCompact,
                                    accentColor: this.currentMood.color
                                });
                            }
                        }, { name: "DreamTabItem" });
                    }
                    __Common__.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        __Common__.create();
                        __Common__.margin({ left: this.isCompact ? 4 : 8 });
                        __Common__.onClick(() => {
                            this.openJourney();
                        });
                    }, __Common__);
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new DreamTabItem(this, {
                                    labelText: '旅行',
                                    isSelected: this.activeTab === 'journey',
                                    isCompact: this.isCompact,
                                    accentColor: this.currentMood.color
                                }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 1434, col: 11 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        labelText: '旅行',
                                        isSelected: this.activeTab === 'journey',
                                        isCompact: this.isCompact,
                                        accentColor: this.currentMood.color
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {
                                    labelText: '旅行',
                                    isSelected: this.activeTab === 'journey',
                                    isCompact: this.isCompact,
                                    accentColor: this.currentMood.color
                                });
                            }
                        }, { name: "DreamTabItem" });
                    }
                    __Common__.pop();
                    Row.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        Stack.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "Index";
    }
}
registerNamedRoute(() => new Index(undefined, {}), "", { bundleName: "com.dreamjourney.native", moduleName: "entry", pagePath: "pages/Index", pageFullPath: "entry/src/main/ets/pages/Index", integratedHsp: "false", moduleType: "followWithHap" });
