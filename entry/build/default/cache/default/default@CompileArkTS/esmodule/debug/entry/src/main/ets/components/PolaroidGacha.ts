if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface PolaroidGacha_Params {
    activeCard?: PolaroidCard | undefined;
    pendingPlacementCardId?: string;
    collectedCards?: CollectedCard[];
    revealProgress?: number;
    cardTilt?: number;
    hintOpacity?: number;
}
import type { CollectedCard, PolaroidCard } from '../common/Models';
export class PolaroidGacha extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__activeCard = new SynchedPropertyObjectTwoWayPU(params.activeCard, this, "activeCard");
        this.__pendingPlacementCardId = new SynchedPropertySimpleTwoWayPU(params.pendingPlacementCardId, this, "pendingPlacementCardId");
        this.__collectedCards = new SynchedPropertyObjectTwoWayPU(params.collectedCards, this, "collectedCards");
        this.__revealProgress = new ObservedPropertySimplePU(0, this, "revealProgress");
        this.__cardTilt = new ObservedPropertySimplePU(-2, this, "cardTilt");
        this.__hintOpacity = new ObservedPropertySimplePU(1, this, "hintOpacity");
        this.setInitiallyProvidedValue(params);
        this.declareWatch("activeCard", this.onActiveCardChange);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: PolaroidGacha_Params) {
        if (params.revealProgress !== undefined) {
            this.revealProgress = params.revealProgress;
        }
        if (params.cardTilt !== undefined) {
            this.cardTilt = params.cardTilt;
        }
        if (params.hintOpacity !== undefined) {
            this.hintOpacity = params.hintOpacity;
        }
    }
    updateStateVars(params: PolaroidGacha_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__activeCard.purgeDependencyOnElmtId(rmElmtId);
        this.__pendingPlacementCardId.purgeDependencyOnElmtId(rmElmtId);
        this.__collectedCards.purgeDependencyOnElmtId(rmElmtId);
        this.__revealProgress.purgeDependencyOnElmtId(rmElmtId);
        this.__cardTilt.purgeDependencyOnElmtId(rmElmtId);
        this.__hintOpacity.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__activeCard.aboutToBeDeleted();
        this.__pendingPlacementCardId.aboutToBeDeleted();
        this.__collectedCards.aboutToBeDeleted();
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
    set activeCard(newValue: PolaroidCard | undefined) {
        this.__activeCard.set(newValue);
    }
    private __pendingPlacementCardId: SynchedPropertySimpleTwoWayPU<string>;
    get pendingPlacementCardId() {
        return this.__pendingPlacementCardId.get();
    }
    set pendingPlacementCardId(newValue: string) {
        this.__pendingPlacementCardId.set(newValue);
    }
    private __collectedCards: SynchedPropertySimpleOneWayPU<CollectedCard[]>;
    get collectedCards() {
        return this.__collectedCards.get();
    }
    set collectedCards(newValue: CollectedCard[]) {
        this.__collectedCards.set(newValue);
    }
    private __revealProgress: ObservedPropertySimplePU<number>;
    get revealProgress() {
        return this.__revealProgress.get();
    }
    set revealProgress(newValue: number) {
        this.__revealProgress.set(newValue);
    }
    private __cardTilt: ObservedPropertySimplePU<number>;
    get cardTilt() {
        return this.__cardTilt.get();
    }
    set cardTilt(newValue: number) {
        this.__cardTilt.set(newValue);
    }
    private __hintOpacity: ObservedPropertySimplePU<number>;
    get hintOpacity() {
        return this.__hintOpacity.get();
    }
    set hintOpacity(newValue: number) {
        this.__hintOpacity.set(newValue);
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
        const revealedCard: PolaroidCard = {
            id: this.activeCard.id,
            type: this.activeCard.type,
            name: this.activeCard.name,
            imageRes: this.activeCard.imageRes,
            color: this.activeCard.color,
            buildingLabel: this.activeCard.buildingLabel,
            description: this.activeCard.description,
            isRevealed: true,
            unlockDate: this.activeCard.unlockDate
        };
        this.activeCard = revealedCard;
        this.pendingPlacementCardId = revealedCard.id;
        this.addCardToCollection(revealedCard);
    }
    private addCardToCollection(card: PolaroidCard): void {
        const nextCards: CollectedCard[] = [];
        let hasCard: boolean = false;
        for (let index = 0; index < this.collectedCards.length; index++) {
            const item: CollectedCard | undefined = this.collectedCards[index];
            if (item === undefined) {
                continue;
            }
            if (item.cardId === card.id) {
                nextCards.push({
                    cardId: card.id,
                    unlockDate: card.unlockDate
                });
                hasCard = true;
            }
            else {
                nextCards.push(item);
            }
        }
        if (!hasCard) {
            nextCards.push({
                cardId: card.id,
                unlockDate: card.unlockDate
            });
        }
        this.collectedCards = nextCards;
    }
    private increaseReveal(deltaX: number, deltaY: number): void {
        const distance: number = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        const nextProgress: number = this.revealProgress + distance / 760;
        this.revealProgress = Math.min(1, nextProgress);
        this.hintOpacity = Math.max(0, 1 - this.revealProgress * 1.45);
        if (this.revealProgress >= 1) {
            this.finishReveal();
        }
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
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
            PanGesture.onActionUpdate((event: GestureEvent) => {
                if (!event || this.activeCard === undefined || this.activeCard.isRevealed) {
                    return;
                }
                // 让拍立得随手势缓慢显影，而不是突兀地瞬间出现。
                this.increaseReveal(Math.abs(event.offsetX), Math.abs(event.offsetY));
            });
            PanGesture.onActionEnd(() => {
                this.cardTilt = -2;
            });
            PanGesture.pop();
            Gesture.pop();
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create();
            Stack.width(236);
            Stack.height(278);
            Stack.margin({ top: 18 });
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Context.animation({ duration: 520, curve: Curve.EaseOut });
            Column.width('100%');
            Column.height('100%');
            Column.borderRadius(18);
            Column.backgroundColor('#1C2325');
            Column.opacity(1 - this.revealProgress);
            Context.animation(null);
        }, Column);
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.activeCard !== undefined && this.activeCard.imageRes !== undefined) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create(this.activeCard.imageRes);
                        Context.animation({ duration: 800, curve: Curve.FastOutSlowIn });
                        Image.width('100%');
                        Image.height('100%');
                        Image.objectFit(ImageFit.Cover);
                        Image.borderRadius(18);
                        Image.blur(22 * (1 - this.revealProgress));
                        Image.opacity(Math.max(0.12, this.revealProgress));
                        Context.animation(null);
                    }, Image);
                });
            }
            else if (this.activeCard !== undefined) {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Context.animation({ duration: 800, curve: Curve.FastOutSlowIn });
                        Column.width('100%');
                        Column.height('100%');
                        Column.borderRadius(18);
                        Column.backgroundColor(this.activeCard.color);
                        Column.opacity(Math.max(0.12, this.revealProgress));
                        Context.animation(null);
                    }, Column);
                    Column.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(2, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.width('100%');
                        Column.height('100%');
                        Column.justifyContent(FlexAlign.Center);
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Blank.create();
                    }, Blank);
                    Blank.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('还没有新的旅行照片');
                        Text.fontSize(16);
                        Text.fontColor('#F7F1E6');
                        Text.opacity(0.84);
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('用一枚情绪结晶唤醒它');
                        Text.fontSize(12);
                        Text.fontColor('#D6DDD8');
                        Text.opacity(0.72);
                        Text.margin({ top: 10 });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Blank.create();
                    }, Blank);
                    Blank.pop();
                    Column.pop();
                });
            }
        }, If);
        If.pop();
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
            If.create();
            if (this.activeCard !== undefined) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.padding({ left: 14, right: 14, top: 12, bottom: 12 });
                        Column.borderRadius(16);
                        Column.backgroundColor('#26313466');
                        Column.backdropBlur(12);
                        Column.margin({ left: 18, right: 18, bottom: 16 });
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.activeCard.buildingLabel);
                        Text.fontSize(22);
                        Text.fontWeight(FontWeight.Medium);
                        Text.fontColor('#FFFFFFEE');
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.activeCard.description);
                        Text.fontSize(11);
                        Text.fontColor('#FFFFFFCC');
                        Text.textAlign(TextAlign.Center);
                        Text.maxLines(2);
                        Text.margin({ top: 8, left: 18, right: 18 });
                    }, Text);
                    Text.pop();
                    Column.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.activeCard !== undefined && !this.activeCard.isRevealed) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('轻轻摩挲，让画面显影');
                        Context.animation({ duration: 420, curve: Curve.EaseOut });
                        Text.fontSize(13);
                        Text.fontColor('#F9F1E4');
                        Text.padding({ left: 14, right: 14, top: 8, bottom: 8 });
                        Text.borderRadius(18);
                        Text.backgroundColor('#1D262866');
                        Text.backdropBlur(10);
                        Text.opacity(this.hintOpacity);
                        Text.position({ x: 44, y: 228 });
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
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.activeCard !== undefined && this.activeCard.isRevealed) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('已显影，可放入小镇');
                        Context.animation({ duration: 520, curve: Curve.EaseOut });
                        Text.fontSize(13);
                        Text.fontColor('#607174');
                        Text.padding({ left: 14, right: 14, top: 7, bottom: 7 });
                        Text.borderRadius(18);
                        Text.backgroundColor('#FFFFFFBB');
                        Text.position({ x: 52, y: 228 });
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
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.activeCard !== undefined ? this.activeCard.name : '尚未命名的等待');
            Text.fontSize(18);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor('#5E6F72');
            Text.margin({ top: 18 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.activeCard !== undefined ? this.activeCard.unlockDate : '等待下一次温柔显影');
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
