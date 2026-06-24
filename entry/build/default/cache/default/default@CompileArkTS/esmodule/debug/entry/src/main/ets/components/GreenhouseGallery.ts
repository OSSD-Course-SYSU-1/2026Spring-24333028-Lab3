if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface GreenhouseGallery_Params {
    collectedCards?: CollectedCard[];
    isVisible?: boolean;
    isCompact?: boolean;
    isWide?: boolean;
    showClose?: boolean;
    cardScale?: number;
    selectedCardId?: string;
}
interface GalleryCard_Params {
    card?: PolaroidCard;
    collectedCards?: CollectedCard[];
    isCompact?: boolean;
    isWide?: boolean;
    selectedCardId?: string;
}
import { dockStoryLines, getBuildingAsset, greenhouseStoryLines, moodTreeStoryLines, polaroidPool, postcardStoryLines, teaStoryLines } from "@bundle:com.dreamjourney.native/entry/ets/common/Models";
import type { CollectedCard, PolaroidCard } from "@bundle:com.dreamjourney.native/entry/ets/common/Models";
class GalleryCard extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__card = new SynchedPropertyObjectOneWayPU(params.card, this, "card");
        this.__collectedCards = new SynchedPropertyObjectOneWayPU(params.collectedCards, this, "collectedCards");
        this.__isCompact = new SynchedPropertySimpleOneWayPU(params.isCompact, this, "isCompact");
        this.__isWide = new SynchedPropertySimpleOneWayPU(params.isWide, this, "isWide");
        this.__selectedCardId = new SynchedPropertySimpleTwoWayPU(params.selectedCardId, this, "selectedCardId");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: GalleryCard_Params) {
        if (params.collectedCards === undefined) {
            this.__collectedCards.set([]);
        }
        if (params.isCompact === undefined) {
            this.__isCompact.set(false);
        }
        if (params.isWide === undefined) {
            this.__isWide.set(false);
        }
    }
    updateStateVars(params: GalleryCard_Params) {
        this.__card.reset(params.card);
        this.__collectedCards.reset(params.collectedCards);
        this.__isCompact.reset(params.isCompact);
        this.__isWide.reset(params.isWide);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__card.purgeDependencyOnElmtId(rmElmtId);
        this.__collectedCards.purgeDependencyOnElmtId(rmElmtId);
        this.__isCompact.purgeDependencyOnElmtId(rmElmtId);
        this.__isWide.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedCardId.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__card.aboutToBeDeleted();
        this.__collectedCards.aboutToBeDeleted();
        this.__isCompact.aboutToBeDeleted();
        this.__isWide.aboutToBeDeleted();
        this.__selectedCardId.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __card: SynchedPropertySimpleOneWayPU<PolaroidCard>;
    get card() {
        return this.__card.get();
    }
    set card(newValue: PolaroidCard) {
        this.__card.set(newValue);
    }
    private __collectedCards: SynchedPropertySimpleOneWayPU<CollectedCard[]>;
    get collectedCards() {
        return this.__collectedCards.get();
    }
    set collectedCards(newValue: CollectedCard[]) {
        this.__collectedCards.set(newValue);
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
    private __selectedCardId: SynchedPropertySimpleTwoWayPU<string>;
    get selectedCardId() {
        return this.__selectedCardId.get();
    }
    set selectedCardId(newValue: string) {
        this.__selectedCardId.set(newValue);
    }
    private getCollectedCard(): CollectedCard | undefined {
        for (let index = 0; index < this.collectedCards.length; index++) {
            const item: CollectedCard | undefined = this.collectedCards[index];
            if (item !== undefined && item.cardId === this.card.id) {
                return item;
            }
        }
        return undefined;
    }
    private isCollected(): boolean {
        return this.getCollectedCard() !== undefined;
    }
    private getUnlockDate(): string {
        const item: CollectedCard | undefined = this.getCollectedCard();
        if (item === undefined) {
            return '等待显影';
        }
        return item.unlockDate;
    }
    private getImageResource(): Resource | undefined {
        return getBuildingAsset(this.card.id);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Context.animation({ duration: 520, curve: Curve.FastOutSlowIn });
            Column.width(this.isWide ? 174 : this.isCompact ? 140 : 154);
            Column.padding({ left: 10, right: 10, top: 10, bottom: 12 });
            Column.borderRadius(22);
            Column.backgroundColor(this.isCollected() ? '#FDFEFADD' : '#F7FBF89C');
            Column.backdropBlur(16);
            Column.shadow({
                radius: this.isCollected() ? 18 : 8,
                color: '#31464A18',
                offsetY: 8
            });
            Context.animation(null);
            Column.onClick(() => {
                if (this.isCollected()) {
                    this.selectedCardId = this.card.id;
                }
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create({ alignContent: Alignment.Center });
            Stack.width('100%');
            Stack.height(this.isWide ? 138 : 112);
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.isCollected() && this.getImageResource() !== undefined) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create(this.getImageResource());
                        Image.width('100%');
                        Image.height('100%');
                        Image.objectFit(ImageFit.Cover);
                        Image.borderRadius(16);
                        Image.opacity(0.96);
                    }, Image);
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.width('100%');
                        Column.height('100%');
                        Column.borderRadius(16);
                        Column.backgroundColor(this.card.color);
                        Column.opacity(this.isCollected() ? 0.92 : 0.34);
                        Column.blur(this.isCollected() ? 0 : 10);
                    }, Column);
                    Column.pop();
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (!this.isCollected()) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('未显影');
                        Text.fontSize(12);
                        Text.fontColor('#6D7D80');
                        Text.padding({ left: 12, right: 12, top: 7, bottom: 7 });
                        Text.borderRadius(16);
                        Text.backgroundColor('#F7FBF8C8');
                        Text.backdropBlur(12);
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
            Text.create(this.isCollected() ? this.card.name : '一张安静的底片');
            Text.fontSize(this.isCompact ? 13 : 14);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor('#506164');
            Text.maxLines(1);
            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
            Text.margin({ top: 12 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.isCollected() ? this.card.description : '它还在玻璃房里慢慢等光。');
            Text.fontSize(11);
            Text.fontColor('#7E8E90');
            Text.lineHeight(17);
            Text.maxLines(2);
            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
            Text.margin({ top: 6 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.margin({ top: 10 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.card.buildingLabel);
            Text.fontSize(10);
            Text.fontColor('#6E7E81');
            Text.padding({ left: 9, right: 9, top: 5, bottom: 5 });
            Text.borderRadius(13);
            Text.backgroundColor('#EDF6F1D0');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.getUnlockDate());
            Text.fontSize(10);
            Text.fontColor('#92A0A2');
        }, Text);
        Text.pop();
        Row.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
export class GreenhouseGallery extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__collectedCards = new SynchedPropertyObjectOneWayPU(params.collectedCards, this, "collectedCards");
        this.__isVisible = new SynchedPropertySimpleTwoWayPU(params.isVisible, this, "isVisible");
        this.__isCompact = new SynchedPropertySimpleOneWayPU(params.isCompact, this, "isCompact");
        this.__isWide = new SynchedPropertySimpleOneWayPU(params.isWide, this, "isWide");
        this.__showClose = new SynchedPropertySimpleOneWayPU(params.showClose, this, "showClose");
        this.__cardScale = new ObservedPropertySimplePU(0.96, this, "cardScale");
        this.__selectedCardId = new ObservedPropertySimplePU('', this, "selectedCardId");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: GreenhouseGallery_Params) {
        if (params.collectedCards === undefined) {
            this.__collectedCards.set([]);
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
        if (params.cardScale !== undefined) {
            this.cardScale = params.cardScale;
        }
        if (params.selectedCardId !== undefined) {
            this.selectedCardId = params.selectedCardId;
        }
    }
    updateStateVars(params: GreenhouseGallery_Params) {
        this.__collectedCards.reset(params.collectedCards);
        this.__isCompact.reset(params.isCompact);
        this.__isWide.reset(params.isWide);
        this.__showClose.reset(params.showClose);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__collectedCards.purgeDependencyOnElmtId(rmElmtId);
        this.__isVisible.purgeDependencyOnElmtId(rmElmtId);
        this.__isCompact.purgeDependencyOnElmtId(rmElmtId);
        this.__isWide.purgeDependencyOnElmtId(rmElmtId);
        this.__showClose.purgeDependencyOnElmtId(rmElmtId);
        this.__cardScale.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedCardId.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__collectedCards.aboutToBeDeleted();
        this.__isVisible.aboutToBeDeleted();
        this.__isCompact.aboutToBeDeleted();
        this.__isWide.aboutToBeDeleted();
        this.__showClose.aboutToBeDeleted();
        this.__cardScale.aboutToBeDeleted();
        this.__selectedCardId.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __collectedCards: SynchedPropertySimpleOneWayPU<CollectedCard[]>;
    get collectedCards() {
        return this.__collectedCards.get();
    }
    set collectedCards(newValue: CollectedCard[]) {
        this.__collectedCards.set(newValue);
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
    private __cardScale: ObservedPropertySimplePU<number>;
    get cardScale() {
        return this.__cardScale.get();
    }
    set cardScale(newValue: number) {
        this.__cardScale.set(newValue);
    }
    private __selectedCardId: ObservedPropertySimplePU<string>;
    get selectedCardId() {
        return this.__selectedCardId.get();
    }
    set selectedCardId(newValue: string) {
        this.__selectedCardId.set(newValue);
    }
    aboutToAppear(): void {
        this.cardScale = 1;
    }
    private getCollectedCount(): number {
        return this.collectedCards.length;
    }
    private getTotalCount(): number {
        return polaroidPool.length;
    }
    private getSelectedCard(): PolaroidCard | undefined {
        for (let index = 0; index < polaroidPool.length; index++) {
            const card: PolaroidCard | undefined = polaroidPool[index];
            if (card !== undefined && card.id === this.selectedCardId) {
                return card;
            }
        }
        return undefined;
    }
    private getSelectedTitle(): string {
        const card: PolaroidCard | undefined = this.getSelectedCard();
        if (card === undefined) {
            return '点一张已显影卡片';
        }
        if (card.id === 'tea_house') {
            return '茶屋体验 · 抹茶慢慢打出泡沫';
        }
        if (card.id === 'star_post') {
            return '星光邮局 · 给远方的一句话';
        }
        if (card.id === 'greenhouse') {
            return '拾光玻璃房 · 整理发光植物';
        }
        if (card.id === 'wind_dock') {
            return '风渊渡口 · 纸船启航前';
        }
        return '心境之树 · 情绪都会发光';
    }
    private getDetailLines(): string[] {
        if (this.selectedCardId === 'tea_house') {
            return teaStoryLines;
        }
        if (this.selectedCardId === 'star_post') {
            return postcardStoryLines;
        }
        if (this.selectedCardId === 'greenhouse') {
            return greenhouseStoryLines;
        }
        if (this.selectedCardId === 'wind_dock') {
            return dockStoryLines;
        }
        if (this.selectedCardId === 'mood_tree') {
            return moodTreeStoryLines;
        }
        return ['点击一张已显影的拍立得，它会在这里展开自己的小故事。'];
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Context.animation({ duration: 560, curve: Curve.FastOutSlowIn });
            Column.width(this.isCompact ? '92%' : this.isWide ? '62%' : '84%');
            Column.padding({
                left: this.isCompact ? 16 : this.isWide ? 28 : 22,
                right: this.isCompact ? 16 : this.isWide ? 28 : 22,
                top: this.isCompact ? 18 : 24,
                bottom: this.isCompact ? 18 : 24
            });
            Column.borderRadius(30);
            Column.backgroundColor('#FDFEFADD');
            Column.backdropBlur(22);
            Column.shadow({ radius: 28, color: '#31464A20', offsetY: 12 });
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
            Text.create('拾光玻璃房');
            Text.fontSize(this.isCompact ? 19 : this.isWide ? 25 : 21);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor('#506164');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`已收藏 ${this.getCollectedCount()} / ${this.getTotalCount()} 张拍立得`);
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
                        Text.backgroundColor('#F7FBF890');
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
            Scroll.create();
            Scroll.height(this.isCompact ? 430 : this.isWide ? 430 : 460);
            Scroll.scrollBar(BarState.Off);
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Flex.create({ wrap: FlexWrap.Wrap, justifyContent: this.isWide ? FlexAlign.Center : FlexAlign.SpaceBetween });
            Flex.width('100%');
        }, Flex);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const card = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    __Common__.create();
                    __Common__.margin({ bottom: 14 });
                }, __Common__);
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new GalleryCard(this, {
                                card: card,
                                collectedCards: this.collectedCards,
                                isCompact: this.isCompact,
                                isWide: this.isWide,
                                selectedCardId: this.__selectedCardId
                            }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/components/GreenhouseGallery.ets", line: 239, col: 13 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {
                                    card: card,
                                    collectedCards: this.collectedCards,
                                    isCompact: this.isCompact,
                                    isWide: this.isWide,
                                    selectedCardId: this.selectedCardId
                                };
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {
                                card: card,
                                collectedCards: this.collectedCards,
                                isCompact: this.isCompact,
                                isWide: this.isWide
                            });
                        }
                    }, { name: "GalleryCard" });
                }
                __Common__.pop();
            };
            this.forEachUpdateFunction(elmtId, polaroidPool, forEachItemGenFunction, (card: PolaroidCard) => card.id, false, false);
        }, ForEach);
        ForEach.pop();
        Flex.pop();
        Scroll.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.padding({ left: 16, right: 16, top: 14, bottom: 14 });
            Column.borderRadius(22);
            Column.backgroundColor('#F7FBF8C8');
            Column.backdropBlur(14);
            Column.margin({ top: 12 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.getSelectedTitle());
            Text.fontSize(14);
            Text.fontColor('#506164');
            Text.fontWeight(FontWeight.Medium);
            Text.width('100%');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const line = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(line);
                    Text.fontSize(12);
                    Text.fontColor('#6E7E81');
                    Text.lineHeight(19);
                    Text.margin({ top: 8 });
                    Text.width('100%');
                }, Text);
                Text.pop();
            };
            this.forEachUpdateFunction(elmtId, this.getDetailLines(), forEachItemGenFunction, (line: string) => line, false, false);
        }, ForEach);
        ForEach.pop();
        Column.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
