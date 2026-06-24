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
}
import mediaquery from "@ohos:mediaquery";
import { buildCustomMood, clonePolaroidCard, initialBuildingSlots, morningCustomColor, peacefulMoodOption, polaroidPool } from "@bundle:com.dreamjourney.native/entry/ets/common/Models";
import type { BuildingSlot, MoodOption, PolaroidCard } from "@bundle:com.dreamjourney.native/entry/ets/common/Models";
import { WindowWiper } from "@bundle:com.dreamjourney.native/entry/ets/components/WindowWiper";
import { MoodPalette } from "@bundle:com.dreamjourney.native/entry/ets/components/MoodPalette";
import { TownScene } from "@bundle:com.dreamjourney.native/entry/ets/components/TownScene";
import { PolaroidGacha } from "@bundle:com.dreamjourney.native/entry/ets/components/PolaroidGacha";
class Index extends ViewPU {
    constructor(m17, n17, o17, p17 = -1, q17 = undefined, r17) {
        super(m17, o17, p17, r17);
        if (typeof q17 === "function") {
            this.paramsGenerator_ = q17;
        }
        this.__currentMood = new ObservedPropertyObjectPU(peacefulMoodOption, this, "currentMood");
        this.__customMood = new ObservedPropertyObjectPU(buildCustomMood('我的天气', morningCustomColor), this, "customMood");
        this.__showGacha = new ObservedPropertySimplePU(false, this, "showGacha");
        this.__showMoodWheel = new ObservedPropertySimplePU(false, this, "showMoodWheel");
        this.__worldOpacity = new ObservedPropertySimplePU(0, this, "worldOpacity");
        this.__crystals = new ObservedPropertySimplePU(0, this, "crystals");
        this.__hasMoodRewardedToday = new ObservedPropertySimplePU(false, this, "hasMoodRewardedToday");
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
        this.setInitiallyProvidedValue(n17);
        this.declareWatch("isWindowWiped", this.onWindowWipedChange);
        this.declareWatch("hasSelectedMood", this.onMoodSelectedChange);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(l17: Index_Params) {
        if (l17.currentMood !== undefined) {
            this.currentMood = l17.currentMood;
        }
        if (l17.customMood !== undefined) {
            this.customMood = l17.customMood;
        }
        if (l17.showGacha !== undefined) {
            this.showGacha = l17.showGacha;
        }
        if (l17.showMoodWheel !== undefined) {
            this.showMoodWheel = l17.showMoodWheel;
        }
        if (l17.worldOpacity !== undefined) {
            this.worldOpacity = l17.worldOpacity;
        }
        if (l17.crystals !== undefined) {
            this.crystals = l17.crystals;
        }
        if (l17.hasMoodRewardedToday !== undefined) {
            this.hasMoodRewardedToday = l17.hasMoodRewardedToday;
        }
        if (l17.activeCard !== undefined) {
            this.activeCard = l17.activeCard;
        }
        if (l17.pendingPlacementCardId !== undefined) {
            this.pendingPlacementCardId = l17.pendingPlacementCardId;
        }
        if (l17.slots !== undefined) {
            this.slots = l17.slots;
        }
        if (l17.drawSeed !== undefined) {
            this.drawSeed = l17.drawSeed;
        }
        if (l17.isWindowWiped !== undefined) {
            this.isWindowWiped = l17.isWindowWiped;
        }
        if (l17.hasSelectedMood !== undefined) {
            this.hasSelectedMood = l17.hasSelectedMood;
        }
        if (l17.isCompact !== undefined) {
            this.isCompact = l17.isCompact;
        }
        if (l17.isWide !== undefined) {
            this.isWide = l17.isWide;
        }
        if (l17.compactListener !== undefined) {
            this.compactListener = l17.compactListener;
        }
        if (l17.wideListener !== undefined) {
            this.wideListener = l17.wideListener;
        }
    }
    updateStateVars(k17: Index_Params) {
    }
    purgeVariableDependenciesOnElmtId(j17) {
        this.__currentMood.purgeDependencyOnElmtId(j17);
        this.__customMood.purgeDependencyOnElmtId(j17);
        this.__showGacha.purgeDependencyOnElmtId(j17);
        this.__showMoodWheel.purgeDependencyOnElmtId(j17);
        this.__worldOpacity.purgeDependencyOnElmtId(j17);
        this.__crystals.purgeDependencyOnElmtId(j17);
        this.__hasMoodRewardedToday.purgeDependencyOnElmtId(j17);
        this.__activeCard.purgeDependencyOnElmtId(j17);
        this.__pendingPlacementCardId.purgeDependencyOnElmtId(j17);
        this.__slots.purgeDependencyOnElmtId(j17);
        this.__drawSeed.purgeDependencyOnElmtId(j17);
        this.__isWindowWiped.purgeDependencyOnElmtId(j17);
        this.__hasSelectedMood.purgeDependencyOnElmtId(j17);
        this.__isCompact.purgeDependencyOnElmtId(j17);
        this.__isWide.purgeDependencyOnElmtId(j17);
    }
    aboutToBeDeleted() {
        this.__currentMood.aboutToBeDeleted();
        this.__customMood.aboutToBeDeleted();
        this.__showGacha.aboutToBeDeleted();
        this.__showMoodWheel.aboutToBeDeleted();
        this.__worldOpacity.aboutToBeDeleted();
        this.__crystals.aboutToBeDeleted();
        this.__hasMoodRewardedToday.aboutToBeDeleted();
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
    set currentMood(i17: MoodOption) {
        this.__currentMood.set(i17);
    }
    private __customMood: ObservedPropertyObjectPU<MoodOption>;
    get customMood() {
        return this.__customMood.get();
    }
    set customMood(h17: MoodOption) {
        this.__customMood.set(h17);
    }
    private __showGacha: ObservedPropertySimplePU<boolean>;
    get showGacha() {
        return this.__showGacha.get();
    }
    set showGacha(g17: boolean) {
        this.__showGacha.set(g17);
    }
    private __showMoodWheel: ObservedPropertySimplePU<boolean>;
    get showMoodWheel() {
        return this.__showMoodWheel.get();
    }
    set showMoodWheel(f17: boolean) {
        this.__showMoodWheel.set(f17);
    }
    private __worldOpacity: ObservedPropertySimplePU<number>;
    get worldOpacity() {
        return this.__worldOpacity.get();
    }
    set worldOpacity(e17: number) {
        this.__worldOpacity.set(e17);
    }
    private __crystals: ObservedPropertySimplePU<number>;
    get crystals() {
        return this.__crystals.get();
    }
    set crystals(d17: number) {
        this.__crystals.set(d17);
    }
    private __hasMoodRewardedToday: ObservedPropertySimplePU<boolean>;
    get hasMoodRewardedToday() {
        return this.__hasMoodRewardedToday.get();
    }
    set hasMoodRewardedToday(c17: boolean) {
        this.__hasMoodRewardedToday.set(c17);
    }
    private __activeCard: ObservedPropertyObjectPU<PolaroidCard | undefined>;
    get activeCard() {
        return this.__activeCard.get();
    }
    set activeCard(b17: PolaroidCard | undefined) {
        this.__activeCard.set(b17);
    }
    private __pendingPlacementCardId: ObservedPropertySimplePU<string>;
    get pendingPlacementCardId() {
        return this.__pendingPlacementCardId.get();
    }
    set pendingPlacementCardId(a17: string) {
        this.__pendingPlacementCardId.set(a17);
    }
    private __slots: ObservedPropertyObjectPU<BuildingSlot[]>;
    get slots() {
        return this.__slots.get();
    }
    set slots(z16: BuildingSlot[]) {
        this.__slots.set(z16);
    }
    private __drawSeed: ObservedPropertySimplePU<number>;
    get drawSeed() {
        return this.__drawSeed.get();
    }
    set drawSeed(y16: number) {
        this.__drawSeed.set(y16);
    }
    private __isWindowWiped: ObservedPropertySimplePU<boolean>;
    get isWindowWiped() {
        return this.__isWindowWiped.get();
    }
    set isWindowWiped(x16: boolean) {
        this.__isWindowWiped.set(x16);
    }
    private __hasSelectedMood: ObservedPropertySimplePU<boolean>;
    get hasSelectedMood() {
        return this.__hasSelectedMood.get();
    }
    set hasSelectedMood(w16: boolean) {
        this.__hasSelectedMood.set(w16);
    }
    private __isCompact: ObservedPropertySimplePU<boolean>;
    get isCompact() {
        return this.__isCompact.get();
    }
    set isCompact(v16: boolean) {
        this.__isCompact.set(v16);
    }
    private __isWide: ObservedPropertySimplePU<boolean>;
    get isWide() {
        return this.__isWide.get();
    }
    set isWide(u16: boolean) {
        this.__isWide.set(u16);
    }
    private compactListener: mediaquery.MediaQueryListener;
    private wideListener: mediaquery.MediaQueryListener;
    aboutToAppear(): void {
        this.worldOpacity = 1;
        this.isCompact = this.compactListener.matches;
        this.isWide = this.wideListener.matches;
        this.compactListener.on('change', (t16: mediaquery.MediaQueryResult) => {
            this.isCompact = t16.matches;
        });
        this.wideListener.on('change', (s16: mediaquery.MediaQueryResult) => {
            this.isWide = s16.matches;
        });
    }
    aboutToDisappear(): void {
        this.compactListener.off('change');
        this.wideListener.off('change');
    }
    private onWindowWipedChange(): void {
        if (this.isWindowWiped && !this.hasSelectedMood) {
            this.showMoodWheel = true;
            this.showGacha = false;
        }
    }
    private onMoodSelectedChange(): void {
        if (this.hasSelectedMood) {
            this.showMoodWheel = false;
            this.showGacha = true;
        }
    }
    private getTodayText(): string {
        const p16: Date = new Date();
        const q16: number = p16.getMonth() + 1;
        const r16: number = p16.getDate();
        return `${q16}月${r16}日`;
    }
    private canOpenGacha(): boolean {
        return this.isWindowWiped && this.hasSelectedMood;
    }
    private getDrawSourceCard(o16: number): PolaroidCard | undefined {
        if (o16 < 0 || o16 >= polaroidPool.length) {
            return undefined;
        }
        return polaroidPool[o16];
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
    private getGachaActionText(): string {
        if (this.pendingPlacementCardId.length > 0) {
            return '回到小镇，点亮一个空槽位';
        }
        if (this.crystals > 0) {
            return '消耗 1 枚结晶抽取拍立得';
        }
        return '先记录心情，获得情绪结晶';
    }
    private openMoodPalette(): void {
        this.showGacha = false;
        this.showMoodWheel = true;
    }
    private toggleGachaPanel(): void {
        if (!this.isWindowWiped) {
            return;
        }
        if (!this.hasSelectedMood) {
            this.showMoodWheel = true;
            return;
        }
        this.showGacha = !this.showGacha;
    }
    private drawPolaroid(): void {
        if (this.crystals <= 0 || polaroidPool.length === 0) {
            return;
        }
        const l16: number = this.drawSeed % polaroidPool.length;
        const m16: PolaroidCard | undefined = this.getDrawSourceCard(l16);
        if (m16 === undefined) {
            return;
        }
        const n16: PolaroidCard = clonePolaroidCard(m16, this.getTodayText());
        this.activeCard = n16;
        this.pendingPlacementCardId = '';
        this.drawSeed += 1;
        this.crystals -= 1;
    }
    initialRender() {
        this.observeComponentCreation2((j16, k16) => {
            Stack.create();
            Context.animation({ duration: 780, curve: Curve.FastOutSlowIn });
            Stack.width('100%');
            Stack.height('100%');
            Stack.backgroundColor('#F7F3EA');
            Context.animation(null);
        }, Stack);
        this.observeComponentCreation2((h16, i16) => {
            __Common__.create();
            Context.animation({ duration: 760, curve: Curve.FastOutSlowIn });
            __Common__.opacity(this.worldOpacity);
            Context.animation(null);
        }, __Common__);
        {
            this.observeComponentCreation2((d16, e16) => {
                if (e16) {
                    let f16 = new TownScene(this, {
                        mood: this.currentMood,
                        isCompact: this.isCompact,
                        isWide: this.isWide,
                        slots: this.__slots,
                        pendingPlacementCardId: this.__pendingPlacementCardId,
                        activeCard: this.__activeCard
                    }, undefined, d16, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 150, col: 7 });
                    ViewPU.create(f16);
                    let g16 = () => {
                        return {
                            mood: this.currentMood,
                            isCompact: this.isCompact,
                            isWide: this.isWide,
                            slots: this.slots,
                            pendingPlacementCardId: this.pendingPlacementCardId,
                            activeCard: this.activeCard
                        };
                    };
                    f16.paramsGenerator_ = g16;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(d16, {
                        mood: this.currentMood,
                        isCompact: this.isCompact,
                        isWide: this.isWide
                    });
                }
            }, { name: "TownScene" });
        }
        __Common__.pop();
        this.observeComponentCreation2((b16, c16) => {
            __Common__.create();
            Context.animation({ duration: 680, curve: Curve.EaseOut });
            __Common__.opacity(this.isWindowWiped ? 0 : 0.92);
            Context.animation(null);
        }, __Common__);
        {
            this.observeComponentCreation2((x15, y15) => {
                if (y15) {
                    let z15 = new WindowWiper(this, {
                        mood: this.currentMood,
                        isCompact: this.isCompact,
                        isWide: this.isWide,
                        isWiped: this.__isWindowWiped
                    }, undefined, x15, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 161, col: 7 });
                    ViewPU.create(z15);
                    let a16 = () => {
                        return {
                            mood: this.currentMood,
                            isCompact: this.isCompact,
                            isWide: this.isWide,
                            isWiped: this.isWindowWiped
                        };
                    };
                    z15.paramsGenerator_ = a16;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(x15, {
                        mood: this.currentMood,
                        isCompact: this.isCompact,
                        isWide: this.isWide
                    });
                }
            }, { name: "WindowWiper" });
        }
        __Common__.pop();
        this.observeComponentCreation2((v15, w15) => {
            Row.create();
            Row.width('100%');
            Row.padding({
                left: this.isCompact ? 18 : this.isWide ? 48 : 24,
                right: this.isCompact ? 18 : this.isWide ? 48 : 24,
                top: this.isCompact ? 30 : this.isWide ? 64 : 46
            });
            Row.align(Alignment.Top);
        }, Row);
        this.observeComponentCreation2((t15, u15) => {
            Column.create();
            Column.alignItems(HorizontalAlign.Start);
        }, Column);
        this.observeComponentCreation2((r15, s15) => {
            Text.create('DreamJourney');
            Text.fontSize(this.isCompact ? 20 : this.isWide ? 28 : 22);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor('#5B6B6E');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((p15, q15) => {
            Row.create();
            Context.animation({ duration: 560, curve: Curve.FastOutSlowIn });
            Row.padding({ left: 10, right: 12, top: 6, bottom: 6 });
            Row.borderRadius(16);
            Row.backgroundColor('#FFFFFF88');
            Row.backdropBlur(12);
            Row.margin({ top: 6 });
            Context.animation(null);
        }, Row);
        this.observeComponentCreation2((n15, o15) => {
            Column.create();
            Column.width(10);
            Column.height(10);
            Column.borderRadius(5);
            Column.backgroundColor(this.currentMood.color);
            Column.opacity(0.88);
        }, Column);
        Column.pop();
        this.observeComponentCreation2((l15, m15) => {
            Text.create(this.currentMood.name);
            Text.fontSize(12);
            Text.fontColor('#607174');
            Text.margin({ left: 8 });
            Text.maxLines(1);
            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
            Text.constraintSize({ maxWidth: this.isCompact ? 62 : this.isWide ? 150 : 92 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((j15, k15) => {
            Text.create(this.currentMood.weather);
            Text.fontSize(this.isCompact ? 11 : 13);
            Text.fontColor('#879599');
            Text.margin({ left: 10 });
            Text.maxLines(1);
            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
            Text.constraintSize({ maxWidth: this.isCompact ? 72 : this.isWide ? 180 : 110 });
        }, Text);
        Text.pop();
        Row.pop();
        Column.pop();
        this.observeComponentCreation2((h15, i15) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((f15, g15) => {
            Row.create();
            Row.padding({
                left: this.isCompact ? 12 : 14,
                right: this.isCompact ? 12 : 14,
                top: this.isCompact ? 8 : 10,
                bottom: this.isCompact ? 8 : 10
            });
            Row.borderRadius(22);
            Row.backgroundColor('#FFFFFF99');
            Row.backdropBlur(16);
            Row.margin({ right: this.isCompact ? 8 : 12 });
        }, Row);
        this.observeComponentCreation2((d15, e15) => {
            Column.create();
            Column.width(9);
            Column.height(9);
            Column.borderRadius(5);
            Column.backgroundColor(this.hasMoodRewardedToday ? '#F4D7B8' : '#FFFFFF99');
            Column.opacity(0.88);
        }, Column);
        Column.pop();
        this.observeComponentCreation2((b15, c15) => {
            Text.create(`${this.crystals}`);
            Text.fontSize(this.isCompact ? 13 : 14);
            Text.fontColor('#607174');
            Text.margin({ left: 7 });
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((z14, a15) => {
            Text.create(this.getGachaEntryLabel());
            Context.animation({ duration: 420, curve: Curve.EaseOut });
            Text.fontSize(this.isCompact ? 13 : 14);
            Text.fontColor('#607174');
            Text.padding({
                left: this.isCompact ? 14 : 18,
                right: this.isCompact ? 14 : 18,
                top: this.isCompact ? 8 : 10,
                bottom: this.isCompact ? 8 : 10
            });
            Text.borderRadius(22);
            Text.backgroundColor('#FFFFFF99');
            Text.backdropBlur(16);
            Text.opacity(this.isWindowWiped ? 1 : 0.56);
            Context.animation(null);
            Text.onClick(() => {
                this.toggleGachaPanel();
            });
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((n14, o14) => {
            If.create();
            if (this.isWindowWiped) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((x14, y14) => {
                        Column.create();
                        Context.animation({ duration: 620, curve: Curve.FastOutSlowIn });
                        Column.width(this.isWide ? '70%' : '100%');
                        Column.alignItems(HorizontalAlign.Center);
                        Column.align(Alignment.Bottom);
                        Column.margin({ bottom: this.isCompact ? 28 : this.isWide ? 58 : 42 });
                        Context.animation(null);
                    }, Column);
                    this.observeComponentCreation2((v14, w14) => {
                        Text.create(this.currentMood.hint);
                        Context.animation({ duration: 520, curve: Curve.EaseOut });
                        Text.fontSize(this.isCompact ? 12 : 13);
                        Text.fontColor('#6E7C80');
                        Text.opacity(0.86);
                        Text.margin({ bottom: 10 });
                        Text.maxLines(2);
                        Text.textAlign(TextAlign.Center);
                        Context.animation(null);
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((t14, u14) => {
                        Row.create();
                        Context.animation({ duration: 520, curve: Curve.EaseOut });
                        Row.padding({ left: 16, right: 18, top: 9, bottom: 9 });
                        Row.borderRadius(20);
                        Row.backgroundColor('#FFFFFF99');
                        Row.backdropBlur(16);
                        Row.opacity(0.9);
                        Context.animation(null);
                        Row.onClick(() => {
                            this.openMoodPalette();
                        });
                    }, Row);
                    this.observeComponentCreation2((r14, s14) => {
                        Column.create();
                        Column.width(9);
                        Column.height(9);
                        Column.borderRadius(5);
                        Column.backgroundColor(this.currentMood.color);
                        Column.opacity(0.82);
                    }, Column);
                    Column.pop();
                    this.observeComponentCreation2((p14, q14) => {
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
        this.observeComponentCreation2((t13, u13) => {
            If.create();
            if (this.showGacha) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((l14, m14) => {
                        Column.create();
                        Context.animation({ duration: 620, curve: Curve.FastOutSlowIn });
                        Column.width('100%');
                        Column.height('100%');
                        Column.justifyContent(FlexAlign.Center);
                        Column.backgroundColor('#EEF5F4AA');
                        Column.backdropBlur(24);
                        Column.opacity(this.showGacha ? 1 : 0);
                        Context.animation(null);
                    }, Column);
                    this.observeComponentCreation2((j14, k14) => {
                        Row.create();
                        Row.width(this.isWide ? '54%' : '86%');
                        Row.margin({ bottom: 20 });
                    }, Row);
                    this.observeComponentCreation2((h14, i14) => {
                        Text.create(`情绪结晶 ${this.crystals}`);
                        Text.fontSize(13);
                        Text.fontColor('#607174');
                        Text.padding({ left: 16, right: 16, top: 8, bottom: 8 });
                        Text.borderRadius(18);
                        Text.backgroundColor('#FFFFFF99');
                        Text.backdropBlur(16);
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((f14, g14) => {
                        Blank.create();
                    }, Blank);
                    Blank.pop();
                    this.observeComponentCreation2((d14, e14) => {
                        Text.create('关闭');
                        Text.fontSize(13);
                        Text.fontColor('#607174');
                        Text.padding({ left: 16, right: 16, top: 8, bottom: 8 });
                        Text.borderRadius(18);
                        Text.backgroundColor('#FFFFFF99');
                        Text.backdropBlur(16);
                        Text.onClick(() => {
                            this.showGacha = false;
                        });
                    }, Text);
                    Text.pop();
                    Row.pop();
                    {
                        this.observeComponentCreation2((z13, a14) => {
                            if (a14) {
                                let b14 = new PolaroidGacha(this, {
                                    activeCard: this.__activeCard,
                                    pendingPlacementCardId: this.__pendingPlacementCardId
                                }, undefined, z13, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 330, col: 11 });
                                ViewPU.create(b14);
                                let c14 = () => {
                                    return {
                                        activeCard: this.activeCard,
                                        pendingPlacementCardId: this.pendingPlacementCardId
                                    };
                                };
                                b14.paramsGenerator_ = c14;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(z13, {});
                            }
                        }, { name: "PolaroidGacha" });
                    }
                    this.observeComponentCreation2((v13, w13) => {
                        If.create();
                        if (this.activeCard === undefined || this.activeCard.isRevealed) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                this.observeComponentCreation2((x13, y13) => {
                                    Text.create(this.getGachaActionText());
                                    Context.animation({ duration: 520, curve: Curve.EaseOut });
                                    Text.fontSize(13);
                                    Text.fontColor('#607174');
                                    Text.padding({ left: 18, right: 18, top: 10, bottom: 10 });
                                    Text.borderRadius(22);
                                    Text.backgroundColor('#FFFFFFAA');
                                    Text.backdropBlur(16);
                                    Text.margin({ top: 18 });
                                    Text.opacity(0.92);
                                    Context.animation(null);
                                    Text.onClick(() => {
                                        if (this.pendingPlacementCardId.length > 0) {
                                            this.showGacha = false;
                                            return;
                                        }
                                        this.drawPolaroid();
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
        this.observeComponentCreation2((l13, m13) => {
            If.create();
            if (this.showMoodWheel) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((r13, s13) => {
                        Column.create();
                        Context.animation({ duration: 560, curve: Curve.FastOutSlowIn });
                        Column.width('100%');
                        Column.height('100%');
                        Column.justifyContent(FlexAlign.Center);
                        Column.alignItems(HorizontalAlign.Center);
                        Column.backgroundColor('#1F2D3026');
                        Column.backdropBlur(15);
                        Column.opacity(this.showMoodWheel ? 1 : 0);
                        Context.animation(null);
                    }, Column);
                    {
                        this.observeComponentCreation2((n13, o13) => {
                            if (o13) {
                                let p13 = new MoodPalette(this, {
                                    currentMood: this.__currentMood,
                                    customMood: this.__customMood,
                                    isVisible: this.__showMoodWheel,
                                    crystals: this.__crystals,
                                    hasMoodRewardedToday: this.__hasMoodRewardedToday,
                                    hasSelectedMood: this.__hasSelectedMood,
                                    isCompact: this.isCompact,
                                    isWide: this.isWide
                                }, undefined, n13, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 366, col: 11 });
                                ViewPU.create(p13);
                                let q13 = () => {
                                    return {
                                        currentMood: this.currentMood,
                                        customMood: this.customMood,
                                        isVisible: this.showMoodWheel,
                                        crystals: this.crystals,
                                        hasMoodRewardedToday: this.hasMoodRewardedToday,
                                        hasSelectedMood: this.hasSelectedMood,
                                        isCompact: this.isCompact,
                                        isWide: this.isWide
                                    };
                                };
                                p13.paramsGenerator_ = q13;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(n13, {
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
