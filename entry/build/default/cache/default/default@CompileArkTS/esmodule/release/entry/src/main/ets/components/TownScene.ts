if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface TownScene_Params {
    mood?: MoodOption;
    isCompact?: boolean;
    isWide?: boolean;
    slots?: BuildingSlot[];
    pendingPlacementCardId?: string;
    activeCard?: PolaroidCard | undefined;
}
interface SlotMarker_Params {
    slot?: BuildingSlot;
    mood?: MoodOption;
    isCompact?: boolean;
    isWide?: boolean;
    slots?: BuildingSlot[];
    pendingPlacementCardId?: string;
    activeCard?: PolaroidCard | undefined;
    breathingScale?: number;
}
import { peacefulMoodOption } from "@bundle:com.dreamjourney.native/entry/ets/common/Models";
import type { BuildingSlot, MoodOption, PolaroidCard } from "@bundle:com.dreamjourney.native/entry/ets/common/Models";
class SlotMarker extends ViewPU {
    constructor(j11, k11, l11, m11 = -1, n11 = undefined, o11) {
        super(j11, l11, m11, o11);
        if (typeof n11 === "function") {
            this.paramsGenerator_ = n11;
        }
        this.__slot = new SynchedPropertyObjectOneWayPU(k11.slot, this, "slot");
        this.__mood = new SynchedPropertyObjectOneWayPU(k11.mood, this, "mood");
        this.__isCompact = new SynchedPropertySimpleOneWayPU(k11.isCompact, this, "isCompact");
        this.__isWide = new SynchedPropertySimpleOneWayPU(k11.isWide, this, "isWide");
        this.__slots = new SynchedPropertyObjectTwoWayPU(k11.slots, this, "slots");
        this.__pendingPlacementCardId = new SynchedPropertySimpleTwoWayPU(k11.pendingPlacementCardId, this, "pendingPlacementCardId");
        this.__activeCard = new SynchedPropertyObjectTwoWayPU(k11.activeCard, this, "activeCard");
        this.__breathingScale = new ObservedPropertySimplePU(1, this, "breathingScale");
        this.setInitiallyProvidedValue(k11);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(i11: SlotMarker_Params) {
        if (i11.mood === undefined) {
            this.__mood.set(peacefulMoodOption);
        }
        if (i11.isCompact === undefined) {
            this.__isCompact.set(false);
        }
        if (i11.isWide === undefined) {
            this.__isWide.set(false);
        }
        if (i11.breathingScale !== undefined) {
            this.breathingScale = i11.breathingScale;
        }
    }
    updateStateVars(h11: SlotMarker_Params) {
        this.__slot.reset(h11.slot);
        this.__mood.reset(h11.mood);
        this.__isCompact.reset(h11.isCompact);
        this.__isWide.reset(h11.isWide);
    }
    purgeVariableDependenciesOnElmtId(g11) {
        this.__slot.purgeDependencyOnElmtId(g11);
        this.__mood.purgeDependencyOnElmtId(g11);
        this.__isCompact.purgeDependencyOnElmtId(g11);
        this.__isWide.purgeDependencyOnElmtId(g11);
        this.__slots.purgeDependencyOnElmtId(g11);
        this.__pendingPlacementCardId.purgeDependencyOnElmtId(g11);
        this.__activeCard.purgeDependencyOnElmtId(g11);
        this.__breathingScale.purgeDependencyOnElmtId(g11);
    }
    aboutToBeDeleted() {
        this.__slot.aboutToBeDeleted();
        this.__mood.aboutToBeDeleted();
        this.__isCompact.aboutToBeDeleted();
        this.__isWide.aboutToBeDeleted();
        this.__slots.aboutToBeDeleted();
        this.__pendingPlacementCardId.aboutToBeDeleted();
        this.__activeCard.aboutToBeDeleted();
        this.__breathingScale.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __slot: SynchedPropertySimpleOneWayPU<BuildingSlot>;
    get slot() {
        return this.__slot.get();
    }
    set slot(f11: BuildingSlot) {
        this.__slot.set(f11);
    }
    private __mood: SynchedPropertySimpleOneWayPU<MoodOption>;
    get mood() {
        return this.__mood.get();
    }
    set mood(e11: MoodOption) {
        this.__mood.set(e11);
    }
    private __isCompact: SynchedPropertySimpleOneWayPU<boolean>;
    get isCompact() {
        return this.__isCompact.get();
    }
    set isCompact(d11: boolean) {
        this.__isCompact.set(d11);
    }
    private __isWide: SynchedPropertySimpleOneWayPU<boolean>;
    get isWide() {
        return this.__isWide.get();
    }
    set isWide(c11: boolean) {
        this.__isWide.set(c11);
    }
    private __slots: SynchedPropertySimpleOneWayPU<BuildingSlot[]>;
    get slots() {
        return this.__slots.get();
    }
    set slots(b11: BuildingSlot[]) {
        this.__slots.set(b11);
    }
    private __pendingPlacementCardId: SynchedPropertySimpleTwoWayPU<string>;
    get pendingPlacementCardId() {
        return this.__pendingPlacementCardId.get();
    }
    set pendingPlacementCardId(a11: string) {
        this.__pendingPlacementCardId.set(a11);
    }
    private __activeCard: SynchedPropertySimpleOneWayPU<PolaroidCard | undefined>;
    get activeCard() {
        return this.__activeCard.get();
    }
    set activeCard(z10: PolaroidCard | undefined) {
        this.__activeCard.set(z10);
    }
    private __breathingScale: ObservedPropertySimplePU<number>;
    get breathingScale() {
        return this.__breathingScale.get();
    }
    set breathingScale(y10: number) {
        this.__breathingScale.set(y10);
    }
    private getBuildingLabel(): string {
        if (this.slot.buildingId === 'tea_house') {
            return '茶屋';
        }
        if (this.slot.buildingId === 'star_post') {
            return '邮局';
        }
        if (this.slot.buildingId === 'greenhouse') {
            return '玻璃房';
        }
        if (this.slot.buildingId === 'wind_dock') {
            return '渡口';
        }
        if (this.slot.buildingId === 'mood_tree') {
            return '心树';
        }
        return '小屋';
    }
    private placePendingCard(): void {
        if (this.slot.buildingId !== null || this.pendingPlacementCardId.length === 0) {
            return;
        }
        const v10: BuildingSlot[] = [];
        for (let w10 = 0; w10 < this.slots.length; w10++) {
            const x10: BuildingSlot | undefined = this.slots[w10];
            if (x10 === undefined) {
                continue;
            }
            if (x10.slotId === this.slot.slotId) {
                v10.push({
                    slotId: x10.slotId,
                    buildingId: this.pendingPlacementCardId,
                    positionX: x10.positionX,
                    positionY: x10.positionY
                });
            }
            else {
                v10.push(x10);
            }
        }
        this.slots = v10;
        this.pendingPlacementCardId = '';
        this.activeCard = undefined;
    }
    private getPositionX(): string {
        if (this.isCompact) {
            if (this.slot.slotId === 1) {
                return '8%';
            }
            if (this.slot.slotId === 2) {
                return '66%';
            }
            return '40%';
        }
        if (this.isWide) {
            if (this.slot.slotId === 1) {
                return '20%';
            }
            if (this.slot.slotId === 2) {
                return '64%';
            }
            return '43%';
        }
        return this.slot.positionX;
    }
    private getPositionY(): string {
        if (this.isCompact) {
            if (this.slot.slotId === 1) {
                return '56%';
            }
            if (this.slot.slotId === 2) {
                return '49%';
            }
            return '70%';
        }
        if (this.isWide) {
            if (this.slot.slotId === 1) {
                return '52%';
            }
            if (this.slot.slotId === 2) {
                return '45%';
            }
            return '66%';
        }
        return this.slot.positionY;
    }
    initialRender() {
        this.observeComponentCreation2((t10, u10) => {
            Column.create();
            Context.animation({ duration: 700, curve: Curve.EaseOut });
            Column.width(this.slot.buildingId ? this.isCompact ? 70 : this.isWide ? 108 : 86 : this.isCompact ? 48 : this.isWide ? 70 : 58);
            Column.height(this.slot.buildingId ? this.isCompact ? 58 : this.isWide ? 88 : 70 : this.isCompact ? 48 : this.isWide ? 70 : 58);
            Column.justifyContent(FlexAlign.Center);
            Column.borderRadius(this.slot.buildingId ? 18 : 29);
            Column.backgroundColor(this.slot.buildingId ? '#FFF7EDCC' : this.pendingPlacementCardId.length > 0 ? '#FFF9D6CC' : '#FFFFFF88');
            Column.backdropBlur(12);
            Column.shadow({
                radius: this.pendingPlacementCardId.length > 0 && this.slot.buildingId === null ? 24 : 16,
                color: this.pendingPlacementCardId.length > 0 && this.slot.buildingId === null ? '#D8C97E44' : '#58707322',
                offsetY: 8
            });
            Column.scale({ x: this.breathingScale, y: this.breathingScale });
            Column.position({ x: this.getPositionX(), y: this.getPositionY() });
            Context.animation(null);
            Column.onAppear(() => {
                this.breathingScale = this.slot.buildingId ? 1.02 : 1;
            });
            Column.onClick(() => {
                this.placePendingCard();
                this.breathingScale = this.breathingScale > 1 ? 0.98 : 1.04;
            });
        }, Column);
        this.observeComponentCreation2((r10, s10) => {
            Text.create(this.slot.buildingId ? this.getBuildingLabel() : '+');
            Text.fontSize(this.slot.buildingId ? 13 : 24);
            Text.fontColor('#66777A');
            Text.textAlign(TextAlign.Center);
        }, Text);
        Text.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
export class TownScene extends ViewPU {
    constructor(l10, m10, n10, o10 = -1, p10 = undefined, q10) {
        super(l10, n10, o10, q10);
        if (typeof p10 === "function") {
            this.paramsGenerator_ = p10;
        }
        this.__mood = new SynchedPropertyObjectOneWayPU(m10.mood, this, "mood");
        this.__isCompact = new SynchedPropertySimpleOneWayPU(m10.isCompact, this, "isCompact");
        this.__isWide = new SynchedPropertySimpleOneWayPU(m10.isWide, this, "isWide");
        this.__slots = new SynchedPropertyObjectTwoWayPU(m10.slots, this, "slots");
        this.__pendingPlacementCardId = new SynchedPropertySimpleTwoWayPU(m10.pendingPlacementCardId, this, "pendingPlacementCardId");
        this.__activeCard = new SynchedPropertyObjectTwoWayPU(m10.activeCard, this, "activeCard");
        this.setInitiallyProvidedValue(m10);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(k10: TownScene_Params) {
        if (k10.mood === undefined) {
            this.__mood.set(peacefulMoodOption);
        }
        if (k10.isCompact === undefined) {
            this.__isCompact.set(false);
        }
        if (k10.isWide === undefined) {
            this.__isWide.set(false);
        }
    }
    updateStateVars(j10: TownScene_Params) {
        this.__mood.reset(j10.mood);
        this.__isCompact.reset(j10.isCompact);
        this.__isWide.reset(j10.isWide);
    }
    purgeVariableDependenciesOnElmtId(i10) {
        this.__mood.purgeDependencyOnElmtId(i10);
        this.__isCompact.purgeDependencyOnElmtId(i10);
        this.__isWide.purgeDependencyOnElmtId(i10);
        this.__slots.purgeDependencyOnElmtId(i10);
        this.__pendingPlacementCardId.purgeDependencyOnElmtId(i10);
        this.__activeCard.purgeDependencyOnElmtId(i10);
    }
    aboutToBeDeleted() {
        this.__mood.aboutToBeDeleted();
        this.__isCompact.aboutToBeDeleted();
        this.__isWide.aboutToBeDeleted();
        this.__slots.aboutToBeDeleted();
        this.__pendingPlacementCardId.aboutToBeDeleted();
        this.__activeCard.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __mood: SynchedPropertySimpleOneWayPU<MoodOption>;
    get mood() {
        return this.__mood.get();
    }
    set mood(h10: MoodOption) {
        this.__mood.set(h10);
    }
    private __isCompact: SynchedPropertySimpleOneWayPU<boolean>;
    get isCompact() {
        return this.__isCompact.get();
    }
    set isCompact(g10: boolean) {
        this.__isCompact.set(g10);
    }
    private __isWide: SynchedPropertySimpleOneWayPU<boolean>;
    get isWide() {
        return this.__isWide.get();
    }
    set isWide(f10: boolean) {
        this.__isWide.set(f10);
    }
    private __slots: SynchedPropertySimpleOneWayPU<BuildingSlot[]>;
    get slots() {
        return this.__slots.get();
    }
    set slots(e10: BuildingSlot[]) {
        this.__slots.set(e10);
    }
    private __pendingPlacementCardId: SynchedPropertySimpleTwoWayPU<string>;
    get pendingPlacementCardId() {
        return this.__pendingPlacementCardId.get();
    }
    set pendingPlacementCardId(d10: string) {
        this.__pendingPlacementCardId.set(d10);
    }
    private __activeCard: SynchedPropertySimpleOneWayPU<PolaroidCard | undefined>;
    get activeCard() {
        return this.__activeCard.get();
    }
    set activeCard(c10: PolaroidCard | undefined) {
        this.__activeCard.set(c10);
    }
    initialRender() {
        this.observeComponentCreation2((a10, b10) => {
            Stack.create();
            Stack.width('100%');
            Stack.height('100%');
        }, Stack);
        this.observeComponentCreation2((y9, z9) => {
            Column.create();
            Context.animation({ duration: 760, curve: Curve.FastOutSlowIn });
            Column.width('100%');
            Column.height('100%');
            Column.linearGradient({
                angle: 180,
                colors: [[this.mood.color, 0], ['#F6F1E7', 0.68], ['#DDE9DD', 1]]
            });
            Context.animation(null);
        }, Column);
        this.observeComponentCreation2((w9, x9) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((u9, v9) => {
            Row.create();
            Row.width('100%');
            Row.justifyContent(FlexAlign.Center);
            Row.margin({ bottom: 28 });
        }, Row);
        this.observeComponentCreation2((s9, t9) => {
            Text.create('风车慢慢转着');
            Text.fontSize(13);
            Text.fontColor('#6F7F82');
            Text.opacity(0.72);
        }, Text);
        Text.pop();
        Row.pop();
        Column.pop();
        this.observeComponentCreation2((q9, r9) => {
            Column.create();
            Context.animation({ duration: 760, curve: Curve.FastOutSlowIn });
            Column.width('84%');
            Column.height(this.isCompact ? 94 : this.isWide ? 154 : 120);
            Column.borderRadius(60);
            Column.backgroundColor(this.mood.landColorAlpha);
            Column.blur(2);
            Column.position({ x: '8%', y: this.isCompact ? '64%' : this.isWide ? '60%' : '62%' });
            Context.animation(null);
        }, Column);
        Column.pop();
        this.observeComponentCreation2((e9, f9) => {
            ForEach.create();
            const g9 = i9 => {
                const j9 = i9;
                this.observeComponentCreation2((k9, l9) => {
                    If.create();
                    if (j9 !== undefined) {
                        this.ifElseBranchUpdateFunction(0, () => {
                            {
                                this.observeComponentCreation2((m9, n9) => {
                                    if (n9) {
                                        let o9 = new SlotMarker(this, {
                                            slot: j9,
                                            mood: this.mood,
                                            isCompact: this.isCompact,
                                            isWide: this.isWide,
                                            slots: this.__slots,
                                            pendingPlacementCardId: this.__pendingPlacementCardId,
                                            activeCard: this.__activeCard
                                        }, undefined, m9, () => { }, { page: "entry/src/main/ets/components/TownScene.ets", line: 177, col: 11 });
                                        ViewPU.create(o9);
                                        let p9 = () => {
                                            return {
                                                slot: j9,
                                                mood: this.mood,
                                                isCompact: this.isCompact,
                                                isWide: this.isWide,
                                                slots: this.slots,
                                                pendingPlacementCardId: this.pendingPlacementCardId,
                                                activeCard: this.activeCard
                                            };
                                        };
                                        o9.paramsGenerator_ = p9;
                                    }
                                    else {
                                        this.updateStateVarsOfChildByElmtId(m9, {
                                            slot: j9,
                                            mood: this.mood,
                                            isCompact: this.isCompact,
                                            isWide: this.isWide
                                        });
                                    }
                                }, { name: "SlotMarker" });
                            }
                        });
                    }
                    else {
                        this.ifElseBranchUpdateFunction(1, () => {
                        });
                    }
                }, If);
                If.pop();
            };
            this.forEachUpdateFunction(e9, this.slots, g9, (h9: BuildingSlot) => h9.slotId.toString(), false, false);
        }, ForEach);
        ForEach.pop();
        Stack.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
