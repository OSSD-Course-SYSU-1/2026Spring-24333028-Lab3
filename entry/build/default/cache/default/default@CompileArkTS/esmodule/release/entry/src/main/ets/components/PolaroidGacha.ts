if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface PolaroidGacha_Params {
    activeCard?: PolaroidCard | undefined;
    pendingPlacementCardId?: string;
    revealProgress?: number;
    cardTilt?: number;
    hintOpacity?: number;
}
import type { PolaroidCard } from '../common/Models';
export class PolaroidGacha extends ViewPU {
    constructor(y8, z8, a9, b9 = -1, c9 = undefined, d9) {
        super(y8, a9, b9, d9);
        if (typeof c9 === "function") {
            this.paramsGenerator_ = c9;
        }
        this.__activeCard = new SynchedPropertyObjectTwoWayPU(z8.activeCard, this, "activeCard");
        this.__pendingPlacementCardId = new SynchedPropertySimpleTwoWayPU(z8.pendingPlacementCardId, this, "pendingPlacementCardId");
        this.__revealProgress = new ObservedPropertySimplePU(0, this, "revealProgress");
        this.__cardTilt = new ObservedPropertySimplePU(-2, this, "cardTilt");
        this.__hintOpacity = new ObservedPropertySimplePU(1, this, "hintOpacity");
        this.setInitiallyProvidedValue(z8);
        this.declareWatch("activeCard", this.onActiveCardChange);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(x8: PolaroidGacha_Params) {
        if (x8.revealProgress !== undefined) {
            this.revealProgress = x8.revealProgress;
        }
        if (x8.cardTilt !== undefined) {
            this.cardTilt = x8.cardTilt;
        }
        if (x8.hintOpacity !== undefined) {
            this.hintOpacity = x8.hintOpacity;
        }
    }
    updateStateVars(w8: PolaroidGacha_Params) {
    }
    purgeVariableDependenciesOnElmtId(v8) {
        this.__activeCard.purgeDependencyOnElmtId(v8);
        this.__pendingPlacementCardId.purgeDependencyOnElmtId(v8);
        this.__revealProgress.purgeDependencyOnElmtId(v8);
        this.__cardTilt.purgeDependencyOnElmtId(v8);
        this.__hintOpacity.purgeDependencyOnElmtId(v8);
    }
    aboutToBeDeleted() {
        this.__activeCard.aboutToBeDeleted();
        this.__pendingPlacementCardId.aboutToBeDeleted();
        this.__revealProgress.aboutToBeDeleted();
        this.__cardTilt.aboutToBeDeleted();
        this.__hintOpacity.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __activeCard: SynchedPropertySimpleOneWayPU<PolaroidCard | undefined>;
    get activeCard() {
        return this.__activeCard.get();
    }
    set activeCard(u8: PolaroidCard | undefined) {
        this.__activeCard.set(u8);
    }
    private __pendingPlacementCardId: SynchedPropertySimpleTwoWayPU<string>;
    get pendingPlacementCardId() {
        return this.__pendingPlacementCardId.get();
    }
    set pendingPlacementCardId(t8: string) {
        this.__pendingPlacementCardId.set(t8);
    }
    private __revealProgress: ObservedPropertySimplePU<number>;
    get revealProgress() {
        return this.__revealProgress.get();
    }
    set revealProgress(s8: number) {
        this.__revealProgress.set(s8);
    }
    private __cardTilt: ObservedPropertySimplePU<number>;
    get cardTilt() {
        return this.__cardTilt.get();
    }
    set cardTilt(r8: number) {
        this.__cardTilt.set(r8);
    }
    private __hintOpacity: ObservedPropertySimplePU<number>;
    get hintOpacity() {
        return this.__hintOpacity.get();
    }
    set hintOpacity(q8: number) {
        this.__hintOpacity.set(q8);
    }
    aboutToAppear(): void {
        this.syncRevealState();
    }
    private onActiveCardChange(): void {
        this.syncRevealState();
    }
    private syncRevealState(): void {
        if (this.activeCard === undefined) {
            this.revealProgress = 0;
            this.hintOpacity = 1;
            this.cardTilt = -2;
            return;
        }
        if (this.activeCard.isRevealed) {
            this.revealProgress = 1;
            this.hintOpacity = 0;
            this.cardTilt = -2;
            return;
        }
        this.revealProgress = 0;
        this.hintOpacity = 1;
        this.cardTilt = -2;
    }
    private finishReveal(): void {
        if (this.activeCard === undefined) {
            return;
        }
        const p8: PolaroidCard = {
            id: this.activeCard.id,
            type: this.activeCard.type,
            name: this.activeCard.name,
            color: this.activeCard.color,
            buildingLabel: this.activeCard.buildingLabel,
            description: this.activeCard.description,
            isRevealed: true,
            unlockDate: this.activeCard.unlockDate
        };
        this.activeCard = p8;
        this.pendingPlacementCardId = p8.id;
    }
    private increaseReveal(l8: number, m8: number): void {
        const n8: number = Math.sqrt(l8 * l8 + m8 * m8);
        const o8: number = this.revealProgress + n8 / 760;
        this.revealProgress = Math.min(1, o8);
        this.hintOpacity = Math.max(0, 1 - this.revealProgress * 1.4);
        if (this.revealProgress >= 1) {
            this.finishReveal();
        }
    }
    initialRender() {
        this.observeComponentCreation2((i8, j8) => {
            Column.create();
            Context.animation({ duration: 620, curve: Curve.FastOutSlowIn });
            Column.width(286);
            Column.padding({ left: 20, right: 20, top: 18, bottom: 22 });
            Column.borderRadius(24);
            Column.backgroundColor('#FFFDF6');
            Column.shadow({ radius: 24, color: '#3F535326', offsetY: 12 });
            Column.rotate({ angle: this.cardTilt });
            Context.animation(null);
            Gesture.create(GesturePriority.Low);
            PanGesture.create();
            PanGesture.onActionStart(() => {
                this.cardTilt = 1.6;
            });
            PanGesture.onActionUpdate((k8: GestureEvent) => {
                if (!k8 || this.activeCard === undefined || this.activeCard.isRevealed) {
                    return;
                }
                this.increaseReveal(Math.abs(k8.offsetX), Math.abs(k8.offsetY));
            });
            PanGesture.onActionEnd(() => {
                this.cardTilt = -2;
            });
            PanGesture.pop();
            Gesture.pop();
        }, Column);
        this.observeComponentCreation2((g8, h8) => {
            Stack.create();
            Stack.width(236);
            Stack.height(278);
            Stack.margin({ top: 18 });
        }, Stack);
        this.observeComponentCreation2((e8, f8) => {
            Column.create();
            Context.animation({ duration: 520, curve: Curve.EaseOut });
            Column.width('100%');
            Column.height('100%');
            Column.borderRadius(18);
            Column.backgroundColor('#2E3133');
            Column.opacity(1 - this.revealProgress);
            Context.animation(null);
        }, Column);
        Column.pop();
        this.observeComponentCreation2((m7, n7) => {
            If.create();
            if (this.activeCard !== undefined) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((c8, d8) => {
                        Column.create();
                        Context.animation({ duration: 800, curve: Curve.FastOutSlowIn });
                        Column.width('100%');
                        Column.height('100%');
                        Column.justifyContent(FlexAlign.Center);
                        Column.alignItems(HorizontalAlign.Center);
                        Column.borderRadius(18);
                        Column.backgroundColor(this.activeCard.color);
                        Column.blur(24 * (1 - this.revealProgress));
                        Column.opacity(Math.max(0.10, this.revealProgress));
                        Context.animation(null);
                    }, Column);
                    this.observeComponentCreation2((a8, b8) => {
                        Text.create(this.activeCard.buildingLabel);
                        Text.fontSize(28);
                        Text.fontWeight(FontWeight.Medium);
                        Text.fontColor('#5E7073');
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((y7, z7) => {
                        Text.create(this.activeCard.description);
                        Text.fontSize(12);
                        Text.fontColor('#6F7F82');
                        Text.textAlign(TextAlign.Center);
                        Text.maxLines(3);
                        Text.margin({ left: 18, right: 18, top: 14 });
                    }, Text);
                    Text.pop();
                    Column.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((w7, x7) => {
                        Column.create();
                        Column.width('100%');
                        Column.height('100%');
                        Column.justifyContent(FlexAlign.Center);
                    }, Column);
                    this.observeComponentCreation2((u7, v7) => {
                        Blank.create();
                    }, Blank);
                    Blank.pop();
                    this.observeComponentCreation2((s7, t7) => {
                        Text.create('还没有新的旅照片');
                        Text.fontSize(16);
                        Text.fontColor('#F7F1E6');
                        Text.opacity(0.84);
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((q7, r7) => {
                        Text.create('用一枚情绪结晶唤醒它');
                        Text.fontSize(12);
                        Text.fontColor('#D6DDD8');
                        Text.opacity(0.72);
                        Text.margin({ top: 10 });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((o7, p7) => {
                        Blank.create();
                    }, Blank);
                    Blank.pop();
                    Column.pop();
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((i7, j7) => {
            If.create();
            if (this.activeCard !== undefined && !this.activeCard.isRevealed) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((k7, l7) => {
                        Text.create('轻轻摩挲，让画面显影');
                        Context.animation({ duration: 420, curve: Curve.EaseOut });
                        Text.fontSize(13);
                        Text.fontColor('#F9F1E4');
                        Text.opacity(this.hintOpacity);
                        Text.position({ x: 38, y: 232 });
                        Context.animation(null);
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
        this.observeComponentCreation2((e7, f7) => {
            If.create();
            if (this.activeCard !== undefined && this.activeCard.isRevealed) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((g7, h7) => {
                        Text.create('已显影，可放入小镇');
                        Context.animation({ duration: 520, curve: Curve.EaseOut });
                        Text.fontSize(13);
                        Text.fontColor('#607174');
                        Text.padding({ left: 14, right: 14, top: 7, bottom: 7 });
                        Text.borderRadius(18);
                        Text.backgroundColor('#FFFFFF99');
                        Text.position({ x: 52, y: 230 });
                        Context.animation(null);
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
        Stack.pop();
        this.observeComponentCreation2((c7, d7) => {
            Text.create(this.activeCard !== undefined ? this.activeCard.name : '未命名的等待');
            Text.fontSize(18);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor('#5E6F72');
            Text.margin({ top: 18 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((a7, b7) => {
            Text.create(this.activeCard !== undefined ? this.activeCard.unlockDate : '等待下一次温柔相遇');
            Text.fontSize(12);
            Text.fontColor('#91A0A2');
            Text.margin({ top: 6, bottom: 8 });
        }, Text);
        Text.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
