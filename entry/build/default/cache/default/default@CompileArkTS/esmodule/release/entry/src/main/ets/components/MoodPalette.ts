if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface MoodPalette_Params {
    currentMood?: MoodOption;
    customMood?: MoodOption;
    isVisible?: boolean;
    crystals?: number;
    hasMoodRewardedToday?: boolean;
    hasSelectedMood?: boolean;
    isCompact?: boolean;
    isWide?: boolean;
    showCustomEditor?: boolean;
    customNameDraft?: string;
    customColorIndex?: number;
    cardScale?: number;
    cueOpacity?: number;
}
interface CustomMoodTile_Params {
    customMood?: MoodOption;
    isCompact?: boolean;
    isWide?: boolean;
}
interface MoodTile_Params {
    item?: MoodOption;
    currentMood?: MoodOption;
    isCompact?: boolean;
    isWide?: boolean;
}
import { blueCustomColor, buildCustomMood, customMoodColors, happyMoodOption, hopefulMoodOption, moonCustomColor, morningCustomColor, peacefulMoodOption, quietMoodOption, roseCustomColor, sadMoodOption, softMoodOption, tiredMoodOption, worriedMoodOption, wheatCustomColor } from "@bundle:com.dreamjourney.native/entry/ets/common/Models";
import type { CustomMoodColor, MoodOption } from "@bundle:com.dreamjourney.native/entry/ets/common/Models";
class MoodTile extends ViewPU {
    constructor(u6, v6, w6, x6 = -1, y6 = undefined, z6) {
        super(u6, w6, x6, z6);
        if (typeof y6 === "function") {
            this.paramsGenerator_ = y6;
        }
        this.__item = new SynchedPropertyObjectOneWayPU(v6.item, this, "item");
        this.__currentMood = new SynchedPropertyObjectOneWayPU(v6.currentMood, this, "currentMood");
        this.__isCompact = new SynchedPropertySimpleOneWayPU(v6.isCompact, this, "isCompact");
        this.__isWide = new SynchedPropertySimpleOneWayPU(v6.isWide, this, "isWide");
        this.setInitiallyProvidedValue(v6);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(t6: MoodTile_Params) {
        if (t6.isCompact === undefined) {
            this.__isCompact.set(false);
        }
        if (t6.isWide === undefined) {
            this.__isWide.set(false);
        }
    }
    updateStateVars(s6: MoodTile_Params) {
        this.__item.reset(s6.item);
        this.__currentMood.reset(s6.currentMood);
        this.__isCompact.reset(s6.isCompact);
        this.__isWide.reset(s6.isWide);
    }
    purgeVariableDependenciesOnElmtId(r6) {
        this.__item.purgeDependencyOnElmtId(r6);
        this.__currentMood.purgeDependencyOnElmtId(r6);
        this.__isCompact.purgeDependencyOnElmtId(r6);
        this.__isWide.purgeDependencyOnElmtId(r6);
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
    set item(q6: MoodOption) {
        this.__item.set(q6);
    }
    private __currentMood: SynchedPropertySimpleOneWayPU<MoodOption>;
    get currentMood() {
        return this.__currentMood.get();
    }
    set currentMood(p6: MoodOption) {
        this.__currentMood.set(p6);
    }
    private __isCompact: SynchedPropertySimpleOneWayPU<boolean>;
    get isCompact() {
        return this.__isCompact.get();
    }
    set isCompact(o6: boolean) {
        this.__isCompact.set(o6);
    }
    private __isWide: SynchedPropertySimpleOneWayPU<boolean>;
    get isWide() {
        return this.__isWide.get();
    }
    set isWide(n6: boolean) {
        this.__isWide.set(n6);
    }
    initialRender() {
        this.observeComponentCreation2((l6, m6) => {
            Column.create();
            Context.animation({ duration: 480, curve: Curve.FastOutSlowIn });
            Column.width(this.isCompact ? 70 : this.isWide ? 104 : 86);
            Column.height(this.isCompact ? 66 : this.isWide ? 88 : 76);
            Column.justifyContent(FlexAlign.Center);
            Column.alignItems(HorizontalAlign.Center);
            Column.borderRadius(22);
            Column.backgroundColor(this.currentMood.id === this.item.id ? '#FFFFFFAA' : '#FFFFFF55');
            Column.backdropBlur(10);
            Context.animation(null);
        }, Column);
        this.observeComponentCreation2((j6, k6) => {
            Column.create();
            Context.animation({ duration: 480, curve: Curve.FastOutSlowIn });
            Column.width(this.isCompact ? 36 : this.isWide ? 50 : 42);
            Column.height(this.isCompact ? 36 : this.isWide ? 50 : 42);
            Column.borderRadius(this.isCompact ? 18 : this.isWide ? 25 : 21);
            Column.backgroundColor(this.item.color);
            Column.opacity(this.currentMood.id === this.item.id ? 1 : 0.76);
            Column.shadow({
                radius: this.currentMood.id === this.item.id ? 16 : 6,
                color: '#2B4A4A20',
                offsetY: 6
            });
            Context.animation(null);
        }, Column);
        Column.pop();
        this.observeComponentCreation2((h6, i6) => {
            Text.create(this.item.name);
            Context.animation({ duration: 420, curve: Curve.EaseOut });
            Text.fontSize(this.isCompact ? 11 : this.isWide ? 13 : 12);
            Text.fontColor('#5F7073');
            Text.margin({ top: 8 });
            Text.opacity(this.currentMood.id === this.item.id ? 1 : 0.72);
            Context.animation(null);
        }, Text);
        Text.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
class CustomMoodTile extends ViewPU {
    constructor(b6, c6, d6, e6 = -1, f6 = undefined, g6) {
        super(b6, d6, e6, g6);
        if (typeof f6 === "function") {
            this.paramsGenerator_ = f6;
        }
        this.__customMood = new SynchedPropertyObjectOneWayPU(c6.customMood, this, "customMood");
        this.__isCompact = new SynchedPropertySimpleOneWayPU(c6.isCompact, this, "isCompact");
        this.__isWide = new SynchedPropertySimpleOneWayPU(c6.isWide, this, "isWide");
        this.setInitiallyProvidedValue(c6);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(a6: CustomMoodTile_Params) {
        if (a6.isCompact === undefined) {
            this.__isCompact.set(false);
        }
        if (a6.isWide === undefined) {
            this.__isWide.set(false);
        }
    }
    updateStateVars(z5: CustomMoodTile_Params) {
        this.__customMood.reset(z5.customMood);
        this.__isCompact.reset(z5.isCompact);
        this.__isWide.reset(z5.isWide);
    }
    purgeVariableDependenciesOnElmtId(y5) {
        this.__customMood.purgeDependencyOnElmtId(y5);
        this.__isCompact.purgeDependencyOnElmtId(y5);
        this.__isWide.purgeDependencyOnElmtId(y5);
    }
    aboutToBeDeleted() {
        this.__customMood.aboutToBeDeleted();
        this.__isCompact.aboutToBeDeleted();
        this.__isWide.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __customMood: SynchedPropertySimpleOneWayPU<MoodOption>;
    get customMood() {
        return this.__customMood.get();
    }
    set customMood(x5: MoodOption) {
        this.__customMood.set(x5);
    }
    private __isCompact: SynchedPropertySimpleOneWayPU<boolean>;
    get isCompact() {
        return this.__isCompact.get();
    }
    set isCompact(w5: boolean) {
        this.__isCompact.set(w5);
    }
    private __isWide: SynchedPropertySimpleOneWayPU<boolean>;
    get isWide() {
        return this.__isWide.get();
    }
    set isWide(v5: boolean) {
        this.__isWide.set(v5);
    }
    initialRender() {
        this.observeComponentCreation2((t5, u5) => {
            Column.create();
            Context.animation({ duration: 480, curve: Curve.FastOutSlowIn });
            Column.width(this.isCompact ? 70 : this.isWide ? 104 : 86);
            Column.height(this.isCompact ? 66 : this.isWide ? 88 : 76);
            Column.justifyContent(FlexAlign.Center);
            Column.alignItems(HorizontalAlign.Center);
            Column.borderRadius(22);
            Column.backgroundColor('#FFFFFF55');
            Column.backdropBlur(10);
            Context.animation(null);
        }, Column);
        this.observeComponentCreation2((r5, s5) => {
            Stack.create();
        }, Stack);
        this.observeComponentCreation2((p5, q5) => {
            Column.create();
            Column.width(this.isCompact ? 36 : this.isWide ? 50 : 42);
            Column.height(this.isCompact ? 36 : this.isWide ? 50 : 42);
            Column.borderRadius(this.isCompact ? 18 : this.isWide ? 25 : 21);
            Column.backgroundColor(this.customMood.color);
            Column.opacity(0.84);
        }, Column);
        Column.pop();
        this.observeComponentCreation2((n5, o5) => {
            Text.create('+');
            Text.fontSize(22);
            Text.fontColor('#65787B');
        }, Text);
        Text.pop();
        Stack.pop();
        this.observeComponentCreation2((l5, m5) => {
            Text.create('自定义');
            Text.fontSize(this.isCompact ? 11 : this.isWide ? 13 : 12);
            Text.fontColor('#5F7073');
            Text.margin({ top: 8 });
        }, Text);
        Text.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
export class MoodPalette extends ViewPU {
    constructor(f5, g5, h5, i5 = -1, j5 = undefined, k5) {
        super(f5, h5, i5, k5);
        if (typeof j5 === "function") {
            this.paramsGenerator_ = j5;
        }
        this.__currentMood = new SynchedPropertyObjectTwoWayPU(g5.currentMood, this, "currentMood");
        this.__customMood = new SynchedPropertyObjectTwoWayPU(g5.customMood, this, "customMood");
        this.__isVisible = new SynchedPropertySimpleTwoWayPU(g5.isVisible, this, "isVisible");
        this.__crystals = new SynchedPropertySimpleTwoWayPU(g5.crystals, this, "crystals");
        this.__hasMoodRewardedToday = new SynchedPropertySimpleTwoWayPU(g5.hasMoodRewardedToday, this, "hasMoodRewardedToday");
        this.__hasSelectedMood = new SynchedPropertySimpleTwoWayPU(g5.hasSelectedMood, this, "hasSelectedMood");
        this.__isCompact = new SynchedPropertySimpleOneWayPU(g5.isCompact, this, "isCompact");
        this.__isWide = new SynchedPropertySimpleOneWayPU(g5.isWide, this, "isWide");
        this.__showCustomEditor = new ObservedPropertySimplePU(false, this, "showCustomEditor");
        this.__customNameDraft = new ObservedPropertySimplePU('我的天气', this, "customNameDraft");
        this.__customColorIndex = new ObservedPropertySimplePU(0, this, "customColorIndex");
        this.__cardScale = new ObservedPropertySimplePU(0.96, this, "cardScale");
        this.__cueOpacity = new ObservedPropertySimplePU(0, this, "cueOpacity");
        this.setInitiallyProvidedValue(g5);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(e5: MoodPalette_Params) {
        if (e5.isCompact === undefined) {
            this.__isCompact.set(false);
        }
        if (e5.isWide === undefined) {
            this.__isWide.set(false);
        }
        if (e5.showCustomEditor !== undefined) {
            this.showCustomEditor = e5.showCustomEditor;
        }
        if (e5.customNameDraft !== undefined) {
            this.customNameDraft = e5.customNameDraft;
        }
        if (e5.customColorIndex !== undefined) {
            this.customColorIndex = e5.customColorIndex;
        }
        if (e5.cardScale !== undefined) {
            this.cardScale = e5.cardScale;
        }
        if (e5.cueOpacity !== undefined) {
            this.cueOpacity = e5.cueOpacity;
        }
    }
    updateStateVars(d5: MoodPalette_Params) {
        this.__isCompact.reset(d5.isCompact);
        this.__isWide.reset(d5.isWide);
    }
    purgeVariableDependenciesOnElmtId(c5) {
        this.__currentMood.purgeDependencyOnElmtId(c5);
        this.__customMood.purgeDependencyOnElmtId(c5);
        this.__isVisible.purgeDependencyOnElmtId(c5);
        this.__crystals.purgeDependencyOnElmtId(c5);
        this.__hasMoodRewardedToday.purgeDependencyOnElmtId(c5);
        this.__hasSelectedMood.purgeDependencyOnElmtId(c5);
        this.__isCompact.purgeDependencyOnElmtId(c5);
        this.__isWide.purgeDependencyOnElmtId(c5);
        this.__showCustomEditor.purgeDependencyOnElmtId(c5);
        this.__customNameDraft.purgeDependencyOnElmtId(c5);
        this.__customColorIndex.purgeDependencyOnElmtId(c5);
        this.__cardScale.purgeDependencyOnElmtId(c5);
        this.__cueOpacity.purgeDependencyOnElmtId(c5);
    }
    aboutToBeDeleted() {
        this.__currentMood.aboutToBeDeleted();
        this.__customMood.aboutToBeDeleted();
        this.__isVisible.aboutToBeDeleted();
        this.__crystals.aboutToBeDeleted();
        this.__hasMoodRewardedToday.aboutToBeDeleted();
        this.__hasSelectedMood.aboutToBeDeleted();
        this.__isCompact.aboutToBeDeleted();
        this.__isWide.aboutToBeDeleted();
        this.__showCustomEditor.aboutToBeDeleted();
        this.__customNameDraft.aboutToBeDeleted();
        this.__customColorIndex.aboutToBeDeleted();
        this.__cardScale.aboutToBeDeleted();
        this.__cueOpacity.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __currentMood: SynchedPropertySimpleOneWayPU<MoodOption>;
    get currentMood() {
        return this.__currentMood.get();
    }
    set currentMood(b5: MoodOption) {
        this.__currentMood.set(b5);
    }
    private __customMood: SynchedPropertySimpleOneWayPU<MoodOption>;
    get customMood() {
        return this.__customMood.get();
    }
    set customMood(a5: MoodOption) {
        this.__customMood.set(a5);
    }
    private __isVisible: SynchedPropertySimpleTwoWayPU<boolean>;
    get isVisible() {
        return this.__isVisible.get();
    }
    set isVisible(z4: boolean) {
        this.__isVisible.set(z4);
    }
    private __crystals: SynchedPropertySimpleTwoWayPU<number>;
    get crystals() {
        return this.__crystals.get();
    }
    set crystals(y4: number) {
        this.__crystals.set(y4);
    }
    private __hasMoodRewardedToday: SynchedPropertySimpleTwoWayPU<boolean>;
    get hasMoodRewardedToday() {
        return this.__hasMoodRewardedToday.get();
    }
    set hasMoodRewardedToday(x4: boolean) {
        this.__hasMoodRewardedToday.set(x4);
    }
    private __hasSelectedMood: SynchedPropertySimpleTwoWayPU<boolean>;
    get hasSelectedMood() {
        return this.__hasSelectedMood.get();
    }
    set hasSelectedMood(w4: boolean) {
        this.__hasSelectedMood.set(w4);
    }
    private __isCompact: SynchedPropertySimpleOneWayPU<boolean>;
    get isCompact() {
        return this.__isCompact.get();
    }
    set isCompact(v4: boolean) {
        this.__isCompact.set(v4);
    }
    private __isWide: SynchedPropertySimpleOneWayPU<boolean>;
    get isWide() {
        return this.__isWide.get();
    }
    set isWide(u4: boolean) {
        this.__isWide.set(u4);
    }
    private __showCustomEditor: ObservedPropertySimplePU<boolean>;
    get showCustomEditor() {
        return this.__showCustomEditor.get();
    }
    set showCustomEditor(t4: boolean) {
        this.__showCustomEditor.set(t4);
    }
    private __customNameDraft: ObservedPropertySimplePU<string>;
    get customNameDraft() {
        return this.__customNameDraft.get();
    }
    set customNameDraft(s4: string) {
        this.__customNameDraft.set(s4);
    }
    private __customColorIndex: ObservedPropertySimplePU<number>;
    get customColorIndex() {
        return this.__customColorIndex.get();
    }
    set customColorIndex(r4: number) {
        this.__customColorIndex.set(r4);
    }
    private __cardScale: ObservedPropertySimplePU<number>;
    get cardScale() {
        return this.__cardScale.get();
    }
    set cardScale(q4: number) {
        this.__cardScale.set(q4);
    }
    private __cueOpacity: ObservedPropertySimplePU<number>;
    get cueOpacity() {
        return this.__cueOpacity.get();
    }
    set cueOpacity(p4: number) {
        this.__cueOpacity.set(p4);
    }
    aboutToAppear(): void {
        this.cardScale = 1;
    }
    private getColorOption(o4: number): CustomMoodColor {
        if (o4 === 1) {
            return moonCustomColor;
        }
        if (o4 === 2) {
            return roseCustomColor;
        }
        if (o4 === 3) {
            return wheatCustomColor;
        }
        if (o4 === 4) {
            return blueCustomColor;
        }
        return morningCustomColor;
    }
    private getMoodByIndex(n4: number): MoodOption {
        if (n4 === 0) {
            return peacefulMoodOption;
        }
        if (n4 === 1) {
            return tiredMoodOption;
        }
        if (n4 === 2) {
            return happyMoodOption;
        }
        if (n4 === 3) {
            return sadMoodOption;
        }
        if (n4 === 4) {
            return softMoodOption;
        }
        if (n4 === 5) {
            return worriedMoodOption;
        }
        if (n4 === 6) {
            return hopefulMoodOption;
        }
        return quietMoodOption;
    }
    private updateCustomMood(): void {
        const m4: MoodOption = buildCustomMood(this.customNameDraft, this.getColorOption(this.customColorIndex));
        this.customMood = m4;
        if (this.currentMood.id === 'custom') {
            this.currentMood = m4;
        }
    }
    private rewardMoodCrystal(): void {
        if (!this.hasMoodRewardedToday) {
            this.crystals += 3;
            this.hasMoodRewardedToday = true;
        }
    }
    private selectMood(l4: MoodOption): void {
        this.currentMood = l4;
        this.rewardMoodCrystal();
        this.hasSelectedMood = true;
        this.cueOpacity = 0.32;
        this.cueOpacity = 0;
        this.isVisible = false;
    }
    private confirmCustomMood(): void {
        this.updateCustomMood();
        this.currentMood = this.customMood;
        this.rewardMoodCrystal();
        this.hasSelectedMood = true;
        this.isVisible = false;
    }
    initialRender() {
        this.observeComponentCreation2((j4, k4) => {
            Stack.create({ alignContent: Alignment.Center });
            Stack.width('100%');
            Stack.height('100%');
        }, Stack);
        this.observeComponentCreation2((h4, i4) => {
            Column.create();
            Context.animation({ duration: 620, curve: Curve.EaseOut });
            Column.width(120);
            Column.height(120);
            Column.borderRadius(60);
            Column.backgroundColor(this.currentMood.color);
            Column.opacity(this.cueOpacity);
            Column.scale({ x: 4.8, y: 4.8 });
            Context.animation(null);
        }, Column);
        Column.pop();
        this.observeComponentCreation2((f, g) => {
            If.create();
            if (!this.showCustomEditor) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((f4, g4) => {
                        Column.create();
                        Context.animation({ duration: 560, curve: Curve.FastOutSlowIn });
                        Column.width(this.isCompact ? '94%' : this.isWide ? '58%' : '88%');
                        Column.padding({
                            left: this.isCompact ? 14 : this.isWide ? 30 : 22,
                            right: this.isCompact ? 14 : this.isWide ? 30 : 22,
                            top: this.isCompact ? 16 : 22,
                            bottom: this.isCompact ? 18 : 24
                        });
                        Column.borderRadius(28);
                        Column.backgroundColor('#FFFFFFCC');
                        Column.backdropBlur(20);
                        Column.scale({ x: this.cardScale, y: this.cardScale });
                        Context.animation(null);
                    }, Column);
                    this.observeComponentCreation2((d4, e4) => {
                        Row.create();
                        Row.width('100%');
                        Row.margin({ bottom: this.isCompact ? 14 : 20 });
                    }, Row);
                    this.observeComponentCreation2((b4, c4) => {
                        Column.create();
                        Column.alignItems(HorizontalAlign.Start);
                    }, Column);
                    this.observeComponentCreation2((z3, a4) => {
                        Text.create('选择今天的心情');
                        Text.fontSize(this.isCompact ? 18 : this.isWide ? 24 : 20);
                        Text.fontWeight(FontWeight.Medium);
                        Text.fontColor('#5E7073');
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((x3, y3) => {
                        Text.create('选中后，天气会慢慢变成它的颜色');
                        Text.fontSize(12);
                        Text.fontColor('#879599');
                        Text.margin({ top: 6 });
                    }, Text);
                    Text.pop();
                    Column.pop();
                    this.observeComponentCreation2((v3, w3) => {
                        Blank.create();
                    }, Blank);
                    Blank.pop();
                    this.observeComponentCreation2((t3, u3) => {
                        Text.create('稍后');
                        Text.fontSize(13);
                        Text.fontColor('#7A898C');
                        Text.padding({ left: 12, right: 12, top: 7, bottom: 7 });
                        Text.borderRadius(16);
                        Text.backgroundColor('#FFFFFF77');
                        Text.onClick(() => {
                            this.isVisible = false;
                        });
                    }, Text);
                    Text.pop();
                    Row.pop();
                    this.observeComponentCreation2((r3, s3) => {
                        Row.create();
                    }, Row);
                    this.observeComponentCreation2((p3, q3) => {
                        __Common__.create();
                        __Common__.onClick(() => {
                            this.selectMood(this.getMoodByIndex(0));
                        });
                    }, __Common__);
                    {
                        this.observeComponentCreation2((l3, m3) => {
                            if (m3) {
                                let n3 = new MoodTile(this, { item: this.getMoodByIndex(0), currentMood: this.currentMood, isCompact: this.isCompact, isWide: this.isWide }, undefined, l3, () => { }, { page: "entry/src/main/ets/components/MoodPalette.ets", line: 235, col: 13 });
                                ViewPU.create(n3);
                                let o3 = () => {
                                    return {
                                        item: this.getMoodByIndex(0),
                                        currentMood: this.currentMood,
                                        isCompact: this.isCompact,
                                        isWide: this.isWide
                                    };
                                };
                                n3.paramsGenerator_ = o3;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(l3, {
                                    item: this.getMoodByIndex(0), currentMood: this.currentMood, isCompact: this.isCompact, isWide: this.isWide
                                });
                            }
                        }, { name: "MoodTile" });
                    }
                    __Common__.pop();
                    this.observeComponentCreation2((j3, k3) => {
                        __Common__.create();
                        __Common__.margin({ left: this.isCompact ? 6 : this.isWide ? 18 : 12 });
                        __Common__.onClick(() => {
                            this.selectMood(this.getMoodByIndex(1));
                        });
                    }, __Common__);
                    {
                        this.observeComponentCreation2((f3, g3) => {
                            if (g3) {
                                let h3 = new MoodTile(this, { item: this.getMoodByIndex(1), currentMood: this.currentMood, isCompact: this.isCompact, isWide: this.isWide }, undefined, f3, () => { }, { page: "entry/src/main/ets/components/MoodPalette.ets", line: 240, col: 13 });
                                ViewPU.create(h3);
                                let i3 = () => {
                                    return {
                                        item: this.getMoodByIndex(1),
                                        currentMood: this.currentMood,
                                        isCompact: this.isCompact,
                                        isWide: this.isWide
                                    };
                                };
                                h3.paramsGenerator_ = i3;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(f3, {
                                    item: this.getMoodByIndex(1), currentMood: this.currentMood, isCompact: this.isCompact, isWide: this.isWide
                                });
                            }
                        }, { name: "MoodTile" });
                    }
                    __Common__.pop();
                    this.observeComponentCreation2((d3, e3) => {
                        __Common__.create();
                        __Common__.margin({ left: this.isCompact ? 6 : this.isWide ? 18 : 12 });
                        __Common__.onClick(() => {
                            this.selectMood(this.getMoodByIndex(2));
                        });
                    }, __Common__);
                    {
                        this.observeComponentCreation2((z2, a3) => {
                            if (a3) {
                                let b3 = new MoodTile(this, { item: this.getMoodByIndex(2), currentMood: this.currentMood, isCompact: this.isCompact, isWide: this.isWide }, undefined, z2, () => { }, { page: "entry/src/main/ets/components/MoodPalette.ets", line: 246, col: 13 });
                                ViewPU.create(b3);
                                let c3 = () => {
                                    return {
                                        item: this.getMoodByIndex(2),
                                        currentMood: this.currentMood,
                                        isCompact: this.isCompact,
                                        isWide: this.isWide
                                    };
                                };
                                b3.paramsGenerator_ = c3;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(z2, {
                                    item: this.getMoodByIndex(2), currentMood: this.currentMood, isCompact: this.isCompact, isWide: this.isWide
                                });
                            }
                        }, { name: "MoodTile" });
                    }
                    __Common__.pop();
                    Row.pop();
                    this.observeComponentCreation2((x2, y2) => {
                        Row.create();
                        Row.margin({ top: this.isCompact ? 8 : 12 });
                    }, Row);
                    this.observeComponentCreation2((v2, w2) => {
                        __Common__.create();
                        __Common__.onClick(() => {
                            this.selectMood(this.getMoodByIndex(3));
                        });
                    }, __Common__);
                    {
                        this.observeComponentCreation2((r2, s2) => {
                            if (s2) {
                                let t2 = new MoodTile(this, { item: this.getMoodByIndex(3), currentMood: this.currentMood, isCompact: this.isCompact, isWide: this.isWide }, undefined, r2, () => { }, { page: "entry/src/main/ets/components/MoodPalette.ets", line: 254, col: 13 });
                                ViewPU.create(t2);
                                let u2 = () => {
                                    return {
                                        item: this.getMoodByIndex(3),
                                        currentMood: this.currentMood,
                                        isCompact: this.isCompact,
                                        isWide: this.isWide
                                    };
                                };
                                t2.paramsGenerator_ = u2;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(r2, {
                                    item: this.getMoodByIndex(3), currentMood: this.currentMood, isCompact: this.isCompact, isWide: this.isWide
                                });
                            }
                        }, { name: "MoodTile" });
                    }
                    __Common__.pop();
                    this.observeComponentCreation2((p2, q2) => {
                        __Common__.create();
                        __Common__.margin({ left: this.isCompact ? 6 : this.isWide ? 18 : 12 });
                        __Common__.onClick(() => {
                            this.selectMood(this.getMoodByIndex(4));
                        });
                    }, __Common__);
                    {
                        this.observeComponentCreation2((l2, m2) => {
                            if (m2) {
                                let n2 = new MoodTile(this, { item: this.getMoodByIndex(4), currentMood: this.currentMood, isCompact: this.isCompact, isWide: this.isWide }, undefined, l2, () => { }, { page: "entry/src/main/ets/components/MoodPalette.ets", line: 259, col: 13 });
                                ViewPU.create(n2);
                                let o2 = () => {
                                    return {
                                        item: this.getMoodByIndex(4),
                                        currentMood: this.currentMood,
                                        isCompact: this.isCompact,
                                        isWide: this.isWide
                                    };
                                };
                                n2.paramsGenerator_ = o2;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(l2, {
                                    item: this.getMoodByIndex(4), currentMood: this.currentMood, isCompact: this.isCompact, isWide: this.isWide
                                });
                            }
                        }, { name: "MoodTile" });
                    }
                    __Common__.pop();
                    this.observeComponentCreation2((j2, k2) => {
                        __Common__.create();
                        __Common__.margin({ left: this.isCompact ? 6 : this.isWide ? 18 : 12 });
                        __Common__.onClick(() => {
                            this.selectMood(this.getMoodByIndex(5));
                        });
                    }, __Common__);
                    {
                        this.observeComponentCreation2((f2, g2) => {
                            if (g2) {
                                let h2 = new MoodTile(this, { item: this.getMoodByIndex(5), currentMood: this.currentMood, isCompact: this.isCompact, isWide: this.isWide }, undefined, f2, () => { }, { page: "entry/src/main/ets/components/MoodPalette.ets", line: 265, col: 13 });
                                ViewPU.create(h2);
                                let i2 = () => {
                                    return {
                                        item: this.getMoodByIndex(5),
                                        currentMood: this.currentMood,
                                        isCompact: this.isCompact,
                                        isWide: this.isWide
                                    };
                                };
                                h2.paramsGenerator_ = i2;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(f2, {
                                    item: this.getMoodByIndex(5), currentMood: this.currentMood, isCompact: this.isCompact, isWide: this.isWide
                                });
                            }
                        }, { name: "MoodTile" });
                    }
                    __Common__.pop();
                    Row.pop();
                    this.observeComponentCreation2((d2, e2) => {
                        Row.create();
                        Row.margin({ top: this.isCompact ? 8 : 12 });
                    }, Row);
                    this.observeComponentCreation2((b2, c2) => {
                        __Common__.create();
                        __Common__.onClick(() => {
                            this.selectMood(this.getMoodByIndex(6));
                        });
                    }, __Common__);
                    {
                        this.observeComponentCreation2((x1, y1) => {
                            if (y1) {
                                let z1 = new MoodTile(this, { item: this.getMoodByIndex(6), currentMood: this.currentMood, isCompact: this.isCompact, isWide: this.isWide }, undefined, x1, () => { }, { page: "entry/src/main/ets/components/MoodPalette.ets", line: 274, col: 13 });
                                ViewPU.create(z1);
                                let a2 = () => {
                                    return {
                                        item: this.getMoodByIndex(6),
                                        currentMood: this.currentMood,
                                        isCompact: this.isCompact,
                                        isWide: this.isWide
                                    };
                                };
                                z1.paramsGenerator_ = a2;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(x1, {
                                    item: this.getMoodByIndex(6), currentMood: this.currentMood, isCompact: this.isCompact, isWide: this.isWide
                                });
                            }
                        }, { name: "MoodTile" });
                    }
                    __Common__.pop();
                    this.observeComponentCreation2((v1, w1) => {
                        __Common__.create();
                        __Common__.margin({ left: this.isCompact ? 6 : this.isWide ? 18 : 12 });
                        __Common__.onClick(() => {
                            this.selectMood(this.getMoodByIndex(7));
                        });
                    }, __Common__);
                    {
                        this.observeComponentCreation2((r1, s1) => {
                            if (s1) {
                                let t1 = new MoodTile(this, { item: this.getMoodByIndex(7), currentMood: this.currentMood, isCompact: this.isCompact, isWide: this.isWide }, undefined, r1, () => { }, { page: "entry/src/main/ets/components/MoodPalette.ets", line: 279, col: 13 });
                                ViewPU.create(t1);
                                let u1 = () => {
                                    return {
                                        item: this.getMoodByIndex(7),
                                        currentMood: this.currentMood,
                                        isCompact: this.isCompact,
                                        isWide: this.isWide
                                    };
                                };
                                t1.paramsGenerator_ = u1;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(r1, {
                                    item: this.getMoodByIndex(7), currentMood: this.currentMood, isCompact: this.isCompact, isWide: this.isWide
                                });
                            }
                        }, { name: "MoodTile" });
                    }
                    __Common__.pop();
                    this.observeComponentCreation2((p1, q1) => {
                        __Common__.create();
                        __Common__.margin({ left: this.isCompact ? 6 : this.isWide ? 18 : 12 });
                        __Common__.onClick(() => {
                            this.showCustomEditor = true;
                        });
                    }, __Common__);
                    {
                        this.observeComponentCreation2((l1, m1) => {
                            if (m1) {
                                let n1 = new CustomMoodTile(this, { customMood: this.customMood, isCompact: this.isCompact, isWide: this.isWide }, undefined, l1, () => { }, { page: "entry/src/main/ets/components/MoodPalette.ets", line: 285, col: 13 });
                                ViewPU.create(n1);
                                let o1 = () => {
                                    return {
                                        customMood: this.customMood,
                                        isCompact: this.isCompact,
                                        isWide: this.isWide
                                    };
                                };
                                n1.paramsGenerator_ = o1;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(l1, {
                                    customMood: this.customMood, isCompact: this.isCompact, isWide: this.isWide
                                });
                            }
                        }, { name: "CustomMoodTile" });
                    }
                    __Common__.pop();
                    Row.pop();
                    Column.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((j1, k1) => {
                        Column.create();
                        Context.animation({ duration: 560, curve: Curve.FastOutSlowIn });
                        Column.width(this.isCompact ? '92%' : this.isWide ? '54%' : '84%');
                        Column.padding({
                            left: this.isCompact ? 16 : this.isWide ? 30 : 22,
                            right: this.isCompact ? 16 : this.isWide ? 30 : 22,
                            top: this.isCompact ? 18 : 22,
                            bottom: this.isCompact ? 18 : 22
                        });
                        Column.borderRadius(28);
                        Column.backgroundColor('#FFFFFFCC');
                        Column.backdropBlur(20);
                        Column.scale({ x: this.cardScale, y: this.cardScale });
                        Context.animation(null);
                    }, Column);
                    this.observeComponentCreation2((h1, i1) => {
                        Text.create('自定义心情');
                        Text.fontSize(this.isCompact ? 18 : this.isWide ? 24 : 20);
                        Text.fontWeight(FontWeight.Medium);
                        Text.fontColor('#5E7073');
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((f1, g1) => {
                        Text.create('给今天留一个只属于你的天气');
                        Text.fontSize(12);
                        Text.fontColor('#879599');
                        Text.margin({ top: 6, bottom: 18 });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((c1, d1) => {
                        TextInput.create({ text: this.customNameDraft, placeholder: '例如：慢慢恢复' });
                        TextInput.height(42);
                        TextInput.fontSize(14);
                        TextInput.fontColor('#607174');
                        TextInput.backgroundColor('#FFFFFF99');
                        TextInput.borderRadius(21);
                        TextInput.padding({ left: 16, right: 16 });
                        TextInput.onChange((e1: string) => {
                            this.customNameDraft = e1;
                            this.updateCustomMood();
                        });
                    }, TextInput);
                    this.observeComponentCreation2((a1, b1) => {
                        Flex.create({ wrap: FlexWrap.Wrap, justifyContent: FlexAlign.SpaceAround });
                        Flex.width('100%');
                        Flex.margin({ top: 16, bottom: 18 });
                    }, Flex);
                    this.observeComponentCreation2((p, q) => {
                        ForEach.create();
                        const r = (t, u: number) => {
                            const v = t;
                            this.observeComponentCreation2((y, z) => {
                                Column.create();
                                Context.animation({ duration: 420, curve: Curve.EaseOut });
                                Column.width(this.isCompact ? 64 : 76);
                                Column.height(34);
                                Column.justifyContent(FlexAlign.Center);
                                Column.borderRadius(17);
                                Column.backgroundColor(v.color);
                                Column.opacity(this.customColorIndex === u ? 1 : 0.62);
                                Column.scale({
                                    x: this.customColorIndex === u ? 1.05 : 1,
                                    y: this.customColorIndex === u ? 1.05 : 1
                                });
                                Context.animation(null);
                                Column.onClick(() => {
                                    this.customColorIndex = u;
                                    this.updateCustomMood();
                                });
                                Column.margin({ bottom: this.isCompact ? 8 : 0 });
                            }, Column);
                            this.observeComponentCreation2((w, x) => {
                                Text.create(v.name);
                                Text.fontSize(11);
                                Text.fontColor('#66777A');
                            }, Text);
                            Text.pop();
                            Column.pop();
                        };
                        this.forEachUpdateFunction(p, customMoodColors, r, (s: CustomMoodColor) => s.id, true, false);
                    }, ForEach);
                    ForEach.pop();
                    Flex.pop();
                    this.observeComponentCreation2((n, o) => {
                        Row.create();
                        Row.width('100%');
                    }, Row);
                    this.observeComponentCreation2((l, m) => {
                        Text.create('返回');
                        Text.fontSize(14);
                        Text.fontColor('#7A898C');
                        Text.padding({ left: 18, right: 18, top: 9, bottom: 9 });
                        Text.borderRadius(20);
                        Text.backgroundColor('#FFFFFF77');
                        Text.onClick(() => {
                            this.showCustomEditor = false;
                        });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((j, k) => {
                        Blank.create();
                    }, Blank);
                    Blank.pop();
                    this.observeComponentCreation2((h, i) => {
                        Text.create('收下这个心情');
                        Text.fontSize(14);
                        Text.fontColor('#5E7073');
                        Text.padding({ left: 18, right: 18, top: 9, bottom: 9 });
                        Text.borderRadius(20);
                        Text.backgroundColor(this.getColorOption(this.customColorIndex).color);
                        Text.opacity(0.92);
                        Text.onClick(() => {
                            this.confirmCustomMood();
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
