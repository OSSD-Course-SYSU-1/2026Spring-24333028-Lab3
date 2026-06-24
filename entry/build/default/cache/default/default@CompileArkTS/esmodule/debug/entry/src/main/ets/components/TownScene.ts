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
interface SceneSlot_Params {
    slot?: BuildingSlot;
    mood?: MoodOption;
    isCompact?: boolean;
    isWide?: boolean;
    slots?: BuildingSlot[];
    pendingPlacementCardId?: string;
    activeCard?: PolaroidCard | undefined;
    pulseScale?: number;
}
import { peacefulMoodOption } from "@bundle:com.dreamjourney.native/entry/ets/common/Models";
import type { BuildingSlot, MoodOption, PolaroidCard } from "@bundle:com.dreamjourney.native/entry/ets/common/Models";
class SceneSlot extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__slot = new SynchedPropertyObjectOneWayPU(params.slot, this, "slot");
        this.__mood = new SynchedPropertyObjectOneWayPU(params.mood, this, "mood");
        this.__isCompact = new SynchedPropertySimpleOneWayPU(params.isCompact, this, "isCompact");
        this.__isWide = new SynchedPropertySimpleOneWayPU(params.isWide, this, "isWide");
        this.__slots = new SynchedPropertyObjectTwoWayPU(params.slots, this, "slots");
        this.__pendingPlacementCardId = new SynchedPropertySimpleTwoWayPU(params.pendingPlacementCardId, this, "pendingPlacementCardId");
        this.__activeCard = new SynchedPropertyObjectTwoWayPU(params.activeCard, this, "activeCard");
        this.__pulseScale = new ObservedPropertySimplePU(1, this, "pulseScale");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: SceneSlot_Params) {
        if (params.mood === undefined) {
            this.__mood.set(peacefulMoodOption);
        }
        if (params.isCompact === undefined) {
            this.__isCompact.set(false);
        }
        if (params.isWide === undefined) {
            this.__isWide.set(false);
        }
        if (params.pulseScale !== undefined) {
            this.pulseScale = params.pulseScale;
        }
    }
    updateStateVars(params: SceneSlot_Params) {
        this.__slot.reset(params.slot);
        this.__mood.reset(params.mood);
        this.__isCompact.reset(params.isCompact);
        this.__isWide.reset(params.isWide);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__slot.purgeDependencyOnElmtId(rmElmtId);
        this.__mood.purgeDependencyOnElmtId(rmElmtId);
        this.__isCompact.purgeDependencyOnElmtId(rmElmtId);
        this.__isWide.purgeDependencyOnElmtId(rmElmtId);
        this.__slots.purgeDependencyOnElmtId(rmElmtId);
        this.__pendingPlacementCardId.purgeDependencyOnElmtId(rmElmtId);
        this.__activeCard.purgeDependencyOnElmtId(rmElmtId);
        this.__pulseScale.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__slot.aboutToBeDeleted();
        this.__mood.aboutToBeDeleted();
        this.__isCompact.aboutToBeDeleted();
        this.__isWide.aboutToBeDeleted();
        this.__slots.aboutToBeDeleted();
        this.__pendingPlacementCardId.aboutToBeDeleted();
        this.__activeCard.aboutToBeDeleted();
        this.__pulseScale.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __slot: SynchedPropertySimpleOneWayPU<BuildingSlot>;
    get slot() {
        return this.__slot.get();
    }
    set slot(newValue: BuildingSlot) {
        this.__slot.set(newValue);
    }
    private __mood: SynchedPropertySimpleOneWayPU<MoodOption>;
    get mood() {
        return this.__mood.get();
    }
    set mood(newValue: MoodOption) {
        this.__mood.set(newValue);
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
    private __slots: SynchedPropertySimpleOneWayPU<BuildingSlot[]>;
    get slots() {
        return this.__slots.get();
    }
    set slots(newValue: BuildingSlot[]) {
        this.__slots.set(newValue);
    }
    private __pendingPlacementCardId: SynchedPropertySimpleTwoWayPU<string>;
    get pendingPlacementCardId() {
        return this.__pendingPlacementCardId.get();
    }
    set pendingPlacementCardId(newValue: string) {
        this.__pendingPlacementCardId.set(newValue);
    }
    private __activeCard: SynchedPropertySimpleOneWayPU<PolaroidCard | undefined>;
    get activeCard() {
        return this.__activeCard.get();
    }
    set activeCard(newValue: PolaroidCard | undefined) {
        this.__activeCard.set(newValue);
    }
    private __pulseScale: ObservedPropertySimplePU<number>;
    get pulseScale() {
        return this.__pulseScale.get();
    }
    set pulseScale(newValue: number) {
        this.__pulseScale.set(newValue);
    }
    private placePendingCard(): void {
        if (this.slot.buildingId !== null || this.pendingPlacementCardId.length === 0) {
            return;
        }
        const nextSlots: BuildingSlot[] = [];
        for (let index = 0; index < this.slots.length; index++) {
            const currentSlot: BuildingSlot | undefined = this.slots[index];
            if (currentSlot === undefined) {
                continue;
            }
            if (currentSlot.slotId === this.slot.slotId) {
                nextSlots.push({
                    slotId: currentSlot.slotId,
                    buildingId: this.pendingPlacementCardId,
                    positionX: currentSlot.positionX,
                    positionY: currentSlot.positionY
                });
            }
            else {
                nextSlots.push(currentSlot);
            }
        }
        this.slots = nextSlots;
        this.pendingPlacementCardId = '';
        this.activeCard = undefined;
    }
    private getPositionX(): string {
        if (this.isWide) {
            if (this.slot.slotId === 1) {
                return '21%';
            }
            if (this.slot.slotId === 2) {
                return '48%';
            }
            return '80%';
        }
        if (this.isCompact) {
            if (this.slot.slotId === 1) {
                return '14%';
            }
            if (this.slot.slotId === 2) {
                return '47%';
            }
            return '84%';
        }
        if (this.slot.slotId === 1) {
            return '16%';
        }
        if (this.slot.slotId === 2) {
            return '47%';
        }
        return '83%';
    }
    private getPositionY(): string {
        if (this.isWide) {
            if (this.slot.slotId === 1) {
                return '63%';
            }
            if (this.slot.slotId === 2) {
                return '55%';
            }
            return '73%';
        }
        if (this.isCompact) {
            if (this.slot.slotId === 1) {
                return '66%';
            }
            if (this.slot.slotId === 2) {
                return '58%';
            }
            return '74%';
        }
        if (this.slot.slotId === 1) {
            return '65%';
        }
        if (this.slot.slotId === 2) {
            return '57%';
        }
        return '73%';
    }
    private getHitSize(): number {
        if (this.isWide) {
            return 84;
        }
        if (this.isCompact) {
            return 76;
        }
        return 80;
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create({ alignContent: Alignment.Center });
            Context.animation({ duration: 680, curve: Curve.FastOutSlowIn });
            Stack.width(this.getHitSize());
            Stack.height(this.getHitSize());
            Stack.borderRadius(this.getHitSize() / 2);
            Stack.backgroundColor('#00FFFFFF');
            Stack.scale({ x: this.pulseScale, y: this.pulseScale });
            Stack.position({ x: this.getPositionX(), y: this.getPositionY() });
            Stack.zIndex(this.pendingPlacementCardId.length > 0 ? 8 : 1);
            Context.animation(null);
            Stack.onClick(() => {
                this.placePendingCard();
                this.pulseScale = this.pulseScale > 1 ? 0.98 : 1.04;
            });
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.slot.buildingId === null && this.pendingPlacementCardId.length > 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.width(this.isWide ? 66 : 58);
                        Column.height(this.isWide ? 66 : 58);
                        Column.justifyContent(FlexAlign.Center);
                        Column.alignItems(HorizontalAlign.Center);
                        Column.borderRadius(this.isWide ? 33 : 29);
                        Column.backgroundColor('#F5FAF6D6');
                        Column.backdropBlur(14);
                        Column.shadow({ radius: 18, color: '#5A6D7028', offsetY: 8 });
                        Column.onClick(() => {
                            this.placePendingCard();
                            this.pulseScale = this.pulseScale > 1 ? 0.98 : 1.04;
                        });
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('+');
                        Text.fontSize(this.isWide ? 26 : 22);
                        Text.fontColor('#6B7B7E');
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('放这里');
                        Text.fontSize(10);
                        Text.fontColor('#7A8A8D');
                        Text.opacity(0.82);
                        Text.margin({ top: 2 });
                    }, Text);
                    Text.pop();
                    Column.pop();
                });
            }
            else if (this.slot.buildingId !== null && this.pendingPlacementCardId.length > 0) {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.width(this.isWide ? 12 : 10);
                        Column.height(this.isWide ? 12 : 10);
                        Column.borderRadius(this.isWide ? 6 : 5);
                        Column.backgroundColor(this.mood.color);
                        Column.opacity(0.7);
                        Column.shadow({ radius: 12, color: '#F4F7EF66', offsetY: 3 });
                    }, Column);
                    Column.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(2, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.width(this.slot.buildingId !== null ? (this.isWide ? 10 : 8) : 1);
                        Column.height(this.slot.buildingId !== null ? (this.isWide ? 10 : 8) : 1);
                        Column.borderRadius(this.slot.buildingId !== null ? (this.isWide ? 5 : 4) : 1);
                        Column.backgroundColor(this.slot.buildingId !== null ? this.mood.color : '#FFFFFF00');
                        Column.opacity(this.slot.buildingId !== null ? 0.42 : 0);
                        Column.shadow({
                            radius: this.slot.buildingId !== null ? 10 : 0,
                            color: '#F7FBF866',
                            offsetY: 2
                        });
                    }, Column);
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
export class TownScene extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__mood = new SynchedPropertyObjectOneWayPU(params.mood, this, "mood");
        this.__isCompact = new SynchedPropertySimpleOneWayPU(params.isCompact, this, "isCompact");
        this.__isWide = new SynchedPropertySimpleOneWayPU(params.isWide, this, "isWide");
        this.__slots = new SynchedPropertyObjectTwoWayPU(params.slots, this, "slots");
        this.__pendingPlacementCardId = new SynchedPropertySimpleTwoWayPU(params.pendingPlacementCardId, this, "pendingPlacementCardId");
        this.__activeCard = new SynchedPropertyObjectTwoWayPU(params.activeCard, this, "activeCard");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: TownScene_Params) {
        if (params.mood === undefined) {
            this.__mood.set(peacefulMoodOption);
        }
        if (params.isCompact === undefined) {
            this.__isCompact.set(false);
        }
        if (params.isWide === undefined) {
            this.__isWide.set(false);
        }
    }
    updateStateVars(params: TownScene_Params) {
        this.__mood.reset(params.mood);
        this.__isCompact.reset(params.isCompact);
        this.__isWide.reset(params.isWide);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__mood.purgeDependencyOnElmtId(rmElmtId);
        this.__isCompact.purgeDependencyOnElmtId(rmElmtId);
        this.__isWide.purgeDependencyOnElmtId(rmElmtId);
        this.__slots.purgeDependencyOnElmtId(rmElmtId);
        this.__pendingPlacementCardId.purgeDependencyOnElmtId(rmElmtId);
        this.__activeCard.purgeDependencyOnElmtId(rmElmtId);
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
    set mood(newValue: MoodOption) {
        this.__mood.set(newValue);
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
    private __slots: SynchedPropertySimpleOneWayPU<BuildingSlot[]>;
    get slots() {
        return this.__slots.get();
    }
    set slots(newValue: BuildingSlot[]) {
        this.__slots.set(newValue);
    }
    private __pendingPlacementCardId: SynchedPropertySimpleTwoWayPU<string>;
    get pendingPlacementCardId() {
        return this.__pendingPlacementCardId.get();
    }
    set pendingPlacementCardId(newValue: string) {
        this.__pendingPlacementCardId.set(newValue);
    }
    private __activeCard: SynchedPropertySimpleOneWayPU<PolaroidCard | undefined>;
    get activeCard() {
        return this.__activeCard.get();
    }
    set activeCard(newValue: PolaroidCard | undefined) {
        this.__activeCard.set(newValue);
    }
    private getBackgroundAsset(): Resource {
        if (this.isWide) {
            return { "id": 16777225, "type": 20000, params: [], "bundleName": "com.dreamjourney.native", "moduleName": "entry" };
        }
        return { "id": 16777224, "type": 20000, params: [], "bundleName": "com.dreamjourney.native", "moduleName": "entry" };
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create();
            Stack.width('100%');
            Stack.height('100%');
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create(this.getBackgroundAsset());
            Image.width('100%');
            Image.height('100%');
            Image.objectFit(this.isWide ? ImageFit.Cover : ImageFit.Cover);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Context.animation({ duration: 760, curve: Curve.FastOutSlowIn });
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor(this.mood.landColorAlpha);
            Column.opacity(0.14);
            Context.animation(null);
        }, Column);
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const slot = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    If.create();
                    if (slot !== undefined) {
                        this.ifElseBranchUpdateFunction(0, () => {
                            {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    if (isInitialRender) {
                                        let componentCall = new SceneSlot(this, {
                                            slot: slot,
                                            mood: this.mood,
                                            isCompact: this.isCompact,
                                            isWide: this.isWide,
                                            slots: this.__slots,
                                            pendingPlacementCardId: this.__pendingPlacementCardId,
                                            activeCard: this.__activeCard
                                        }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/components/TownScene.ets", line: 201, col: 11 });
                                        ViewPU.create(componentCall);
                                        let paramsLambda = () => {
                                            return {
                                                slot: slot,
                                                mood: this.mood,
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
                                            slot: slot,
                                            mood: this.mood,
                                            isCompact: this.isCompact,
                                            isWide: this.isWide
                                        });
                                    }
                                }, { name: "SceneSlot" });
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
            this.forEachUpdateFunction(elmtId, this.slots, forEachItemGenFunction, (slot: BuildingSlot) => slot.slotId.toString(), false, false);
        }, ForEach);
        ForEach.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.justifyContent(FlexAlign.End);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('纸船会在风里慢慢出发');
            Text.fontSize(this.isCompact ? 12 : 13);
            Text.fontColor('#627477');
            Text.opacity(0.52);
            Text.margin({ bottom: this.isCompact ? 22 : 28 });
        }, Text);
        Text.pop();
        Column.pop();
        Stack.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
