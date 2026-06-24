if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface JourneyMap_Params {
    mood?: MoodOption;
    crystals?: number;
    isCompact?: boolean;
    isWide?: boolean;
    hasStarted?: boolean;
    selectedNodeId?: string;
    nodeActionCount?: number;
    beamSweep?: number;
    jellyGlowScale?: number;
    fishingLineHeight?: number;
    fishingStarRise?: number;
    logText?: string;
    stardust?: number;
    visitedNodeIds?: string[];
}
interface JourneyNodeCard_Params {
    node?: DreamJourneyNode;
    selectedNodeId?: string;
    visited?: boolean;
    isEnabled?: boolean;
    isCompact?: boolean;
}
import { peacefulMoodOption } from "@bundle:com.dreamjourney.native/entry/ets/common/Models";
import type { MoodOption } from "@bundle:com.dreamjourney.native/entry/ets/common/Models";
interface DreamJourneyNode {
    id: string;
    name: string;
    hint: string;
    color: string;
    rewardText: string;
}
const dreamNodes: DreamJourneyNode[] = [
    {
        id: 'bottle',
        name: '漂流瓶',
        hint: '里面有一封被海风晒软的信。',
        color: '#D7E5F0',
        rewardText: '瓶里的纸条写着：今天不用急着抵达，先让自己漂一会儿。'
    },
    {
        id: 'jellyfish',
        name: '发光水母',
        hint: '它们像很小的月亮，慢慢游过水面。',
        color: '#C9C4E8',
        rewardText: '水母把海面照亮了一寸，你获得了一点安静的勇气。'
    },
    {
        id: 'shadow',
        name: '影子小人',
        hint: '静静等它三秒，它会钓上一颗星。',
        color: '#E8D8B8',
        rewardText: '影子小人为你钓到一颗星：愿你今晚被温柔地梦见。'
    }
];
class JourneyNodeCard extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__node = new SynchedPropertyObjectOneWayPU(params.node, this, "node");
        this.__selectedNodeId = new SynchedPropertySimpleOneWayPU(params.selectedNodeId, this, "selectedNodeId");
        this.__visited = new SynchedPropertySimpleOneWayPU(params.visited, this, "visited");
        this.__isEnabled = new SynchedPropertySimpleOneWayPU(params.isEnabled, this, "isEnabled");
        this.__isCompact = new SynchedPropertySimpleOneWayPU(params.isCompact, this, "isCompact");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: JourneyNodeCard_Params) {
        if (params.selectedNodeId === undefined) {
            this.__selectedNodeId.set('');
        }
        if (params.visited === undefined) {
            this.__visited.set(false);
        }
        if (params.isEnabled === undefined) {
            this.__isEnabled.set(false);
        }
        if (params.isCompact === undefined) {
            this.__isCompact.set(false);
        }
    }
    updateStateVars(params: JourneyNodeCard_Params) {
        this.__node.reset(params.node);
        this.__selectedNodeId.reset(params.selectedNodeId);
        this.__visited.reset(params.visited);
        this.__isEnabled.reset(params.isEnabled);
        this.__isCompact.reset(params.isCompact);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__node.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedNodeId.purgeDependencyOnElmtId(rmElmtId);
        this.__visited.purgeDependencyOnElmtId(rmElmtId);
        this.__isEnabled.purgeDependencyOnElmtId(rmElmtId);
        this.__isCompact.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__node.aboutToBeDeleted();
        this.__selectedNodeId.aboutToBeDeleted();
        this.__visited.aboutToBeDeleted();
        this.__isEnabled.aboutToBeDeleted();
        this.__isCompact.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __node: SynchedPropertySimpleOneWayPU<DreamJourneyNode>;
    get node() {
        return this.__node.get();
    }
    set node(newValue: DreamJourneyNode) {
        this.__node.set(newValue);
    }
    private __selectedNodeId: SynchedPropertySimpleOneWayPU<string>;
    get selectedNodeId() {
        return this.__selectedNodeId.get();
    }
    set selectedNodeId(newValue: string) {
        this.__selectedNodeId.set(newValue);
    }
    private __visited: SynchedPropertySimpleOneWayPU<boolean>;
    get visited() {
        return this.__visited.get();
    }
    set visited(newValue: boolean) {
        this.__visited.set(newValue);
    }
    private __isEnabled: SynchedPropertySimpleOneWayPU<boolean>;
    get isEnabled() {
        return this.__isEnabled.get();
    }
    set isEnabled(newValue: boolean) {
        this.__isEnabled.set(newValue);
    }
    private __isCompact: SynchedPropertySimpleOneWayPU<boolean>;
    get isCompact() {
        return this.__isCompact.get();
    }
    set isCompact(newValue: boolean) {
        this.__isCompact.set(newValue);
    }
    private getNodeImageResource(): Resource {
        if (this.node.id === 'bottle') {
            return { "id": 16777233, "type": 20000, params: [], "bundleName": "com.dreamjourney.native", "moduleName": "entry" };
        }
        if (this.node.id === 'jellyfish') {
            return { "id": 16777234, "type": 20000, params: [], "bundleName": "com.dreamjourney.native", "moduleName": "entry" };
        }
        return { "id": 16777235, "type": 20000, params: [], "bundleName": "com.dreamjourney.native", "moduleName": "entry" };
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Context.animation({ duration: 520, curve: Curve.FastOutSlowIn });
            Column.width(this.isCompact ? 94 : 112);
            Column.height(this.isCompact ? 146 : 160);
            Column.padding({ left: 10, right: 10, top: 12, bottom: 12 });
            Column.borderRadius(24);
            Column.backgroundColor(this.selectedNodeId === this.node.id ? '#DDFDFEFA' : '#A8F7FBF8');
            Column.backdropBlur(14);
            Column.shadow({
                radius: this.selectedNodeId === this.node.id ? 20 : 10,
                color: '#1831464A',
                offsetY: 8
            });
            Column.scale({
                x: this.selectedNodeId === this.node.id ? 1.04 : 1,
                y: this.selectedNodeId === this.node.id ? 1.04 : 1
            });
            Context.animation(null);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create(this.getNodeImageResource());
            Context.animation({ duration: 460, curve: Curve.FastOutSlowIn });
            Image.width(this.isCompact ? 52 : 62);
            Image.height(this.isCompact ? 52 : 62);
            Image.objectFit(ImageFit.Contain);
            Image.borderRadius(this.isCompact ? 20 : 24);
            Image.shadow({
                radius: this.selectedNodeId === this.node.id ? 18 : 8,
                color: '#1A31464A',
                offsetY: 7
            });
            Context.animation(null);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.node.name);
            Text.fontSize(this.isCompact ? 12 : 13);
            Text.fontColor('#506164');
            Text.fontWeight(this.selectedNodeId === this.node.id ? FontWeight.Medium : FontWeight.Regular);
            Text.margin({ top: 8 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.node.hint);
            Text.fontSize(10);
            Text.fontColor('#849497');
            Text.lineHeight(15);
            Text.textAlign(TextAlign.Center);
            Text.maxLines(2);
            Text.margin({ top: 5 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.visited ? '已遇见' : (this.isEnabled ? '轻触靠近' : '等待启航'));
            Text.fontSize(10);
            Text.fontColor(this.visited ? '#6C8A7D' : '#7E8E90');
            Text.padding({ left: 9, right: 9, top: 4, bottom: 4 });
            Text.borderRadius(12);
            Text.backgroundColor(this.visited ? '#D8EDF6F1' : '#88FFFFFF');
            Text.margin({ top: 7 });
        }, Text);
        Text.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
export class JourneyMap extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__mood = new SynchedPropertyObjectOneWayPU(params.mood, this, "mood");
        this.__crystals = new SynchedPropertySimpleTwoWayPU(params.crystals, this, "crystals");
        this.__isCompact = new SynchedPropertySimpleOneWayPU(params.isCompact, this, "isCompact");
        this.__isWide = new SynchedPropertySimpleOneWayPU(params.isWide, this, "isWide");
        this.__hasStarted = new ObservedPropertySimplePU(false, this, "hasStarted");
        this.__selectedNodeId = new ObservedPropertySimplePU('', this, "selectedNodeId");
        this.__nodeActionCount = new ObservedPropertySimplePU(0, this, "nodeActionCount");
        this.__beamSweep = new ObservedPropertySimplePU(0, this, "beamSweep");
        this.__jellyGlowScale = new ObservedPropertySimplePU(1, this, "jellyGlowScale");
        this.__fishingLineHeight = new ObservedPropertySimplePU(18, this, "fishingLineHeight");
        this.__fishingStarRise = new ObservedPropertySimplePU(0, this, "fishingStarRise");
        this.__logText = new ObservedPropertySimplePU('纸船还停在风渊渡口。消耗一枚情绪结晶，让它去琉璃星海走一小段路。', this, "logText");
        this.__stardust = new ObservedPropertySimplePU(0, this, "stardust");
        this.__visitedNodeIds = new ObservedPropertyObjectPU([], this, "visitedNodeIds");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: JourneyMap_Params) {
        if (params.mood === undefined) {
            this.__mood.set(peacefulMoodOption);
        }
        if (params.isCompact === undefined) {
            this.__isCompact.set(false);
        }
        if (params.isWide === undefined) {
            this.__isWide.set(false);
        }
        if (params.hasStarted !== undefined) {
            this.hasStarted = params.hasStarted;
        }
        if (params.selectedNodeId !== undefined) {
            this.selectedNodeId = params.selectedNodeId;
        }
        if (params.nodeActionCount !== undefined) {
            this.nodeActionCount = params.nodeActionCount;
        }
        if (params.beamSweep !== undefined) {
            this.beamSweep = params.beamSweep;
        }
        if (params.jellyGlowScale !== undefined) {
            this.jellyGlowScale = params.jellyGlowScale;
        }
        if (params.fishingLineHeight !== undefined) {
            this.fishingLineHeight = params.fishingLineHeight;
        }
        if (params.fishingStarRise !== undefined) {
            this.fishingStarRise = params.fishingStarRise;
        }
        if (params.logText !== undefined) {
            this.logText = params.logText;
        }
        if (params.stardust !== undefined) {
            this.stardust = params.stardust;
        }
        if (params.visitedNodeIds !== undefined) {
            this.visitedNodeIds = params.visitedNodeIds;
        }
    }
    updateStateVars(params: JourneyMap_Params) {
        this.__mood.reset(params.mood);
        this.__isCompact.reset(params.isCompact);
        this.__isWide.reset(params.isWide);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__mood.purgeDependencyOnElmtId(rmElmtId);
        this.__crystals.purgeDependencyOnElmtId(rmElmtId);
        this.__isCompact.purgeDependencyOnElmtId(rmElmtId);
        this.__isWide.purgeDependencyOnElmtId(rmElmtId);
        this.__hasStarted.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedNodeId.purgeDependencyOnElmtId(rmElmtId);
        this.__nodeActionCount.purgeDependencyOnElmtId(rmElmtId);
        this.__beamSweep.purgeDependencyOnElmtId(rmElmtId);
        this.__jellyGlowScale.purgeDependencyOnElmtId(rmElmtId);
        this.__fishingLineHeight.purgeDependencyOnElmtId(rmElmtId);
        this.__fishingStarRise.purgeDependencyOnElmtId(rmElmtId);
        this.__logText.purgeDependencyOnElmtId(rmElmtId);
        this.__stardust.purgeDependencyOnElmtId(rmElmtId);
        this.__visitedNodeIds.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__mood.aboutToBeDeleted();
        this.__crystals.aboutToBeDeleted();
        this.__isCompact.aboutToBeDeleted();
        this.__isWide.aboutToBeDeleted();
        this.__hasStarted.aboutToBeDeleted();
        this.__selectedNodeId.aboutToBeDeleted();
        this.__nodeActionCount.aboutToBeDeleted();
        this.__beamSweep.aboutToBeDeleted();
        this.__jellyGlowScale.aboutToBeDeleted();
        this.__fishingLineHeight.aboutToBeDeleted();
        this.__fishingStarRise.aboutToBeDeleted();
        this.__logText.aboutToBeDeleted();
        this.__stardust.aboutToBeDeleted();
        this.__visitedNodeIds.aboutToBeDeleted();
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
    private __crystals: SynchedPropertySimpleTwoWayPU<number>;
    get crystals() {
        return this.__crystals.get();
    }
    set crystals(newValue: number) {
        this.__crystals.set(newValue);
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
    private __hasStarted: ObservedPropertySimplePU<boolean>;
    get hasStarted() {
        return this.__hasStarted.get();
    }
    set hasStarted(newValue: boolean) {
        this.__hasStarted.set(newValue);
    }
    private __selectedNodeId: ObservedPropertySimplePU<string>;
    get selectedNodeId() {
        return this.__selectedNodeId.get();
    }
    set selectedNodeId(newValue: string) {
        this.__selectedNodeId.set(newValue);
    }
    private __nodeActionCount: ObservedPropertySimplePU<number>;
    get nodeActionCount() {
        return this.__nodeActionCount.get();
    }
    set nodeActionCount(newValue: number) {
        this.__nodeActionCount.set(newValue);
    }
    private __beamSweep: ObservedPropertySimplePU<number>;
    get beamSweep() {
        return this.__beamSweep.get();
    }
    set beamSweep(newValue: number) {
        this.__beamSweep.set(newValue);
    }
    private __jellyGlowScale: ObservedPropertySimplePU<number>;
    get jellyGlowScale() {
        return this.__jellyGlowScale.get();
    }
    set jellyGlowScale(newValue: number) {
        this.__jellyGlowScale.set(newValue);
    }
    private __fishingLineHeight: ObservedPropertySimplePU<number>;
    get fishingLineHeight() {
        return this.__fishingLineHeight.get();
    }
    set fishingLineHeight(newValue: number) {
        this.__fishingLineHeight.set(newValue);
    }
    private __fishingStarRise: ObservedPropertySimplePU<number>;
    get fishingStarRise() {
        return this.__fishingStarRise.get();
    }
    set fishingStarRise(newValue: number) {
        this.__fishingStarRise.set(newValue);
    }
    private __logText: ObservedPropertySimplePU<string>;
    get logText() {
        return this.__logText.get();
    }
    set logText(newValue: string) {
        this.__logText.set(newValue);
    }
    private __stardust: ObservedPropertySimplePU<number>;
    get stardust() {
        return this.__stardust.get();
    }
    set stardust(newValue: number) {
        this.__stardust.set(newValue);
    }
    private __visitedNodeIds: ObservedPropertyObjectPU<string[]>;
    get visitedNodeIds() {
        return this.__visitedNodeIds.get();
    }
    set visitedNodeIds(newValue: string[]) {
        this.__visitedNodeIds.set(newValue);
    }
    private getBackgroundAsset(): Resource {
        if (this.isWide) {
            return { "id": 16777232, "type": 20000, params: [], "bundleName": "com.dreamjourney.native", "moduleName": "entry" };
        }
        return { "id": 16777231, "type": 20000, params: [], "bundleName": "com.dreamjourney.native", "moduleName": "entry" };
    }
    private getNodeImageResource(nodeId: string): Resource {
        if (nodeId === 'bottle') {
            return { "id": 16777233, "type": 20000, params: [], "bundleName": "com.dreamjourney.native", "moduleName": "entry" };
        }
        if (nodeId === 'jellyfish') {
            return { "id": 16777234, "type": 20000, params: [], "bundleName": "com.dreamjourney.native", "moduleName": "entry" };
        }
        return { "id": 16777235, "type": 20000, params: [], "bundleName": "com.dreamjourney.native", "moduleName": "entry" };
    }
    private getNodePositionX(nodeId: string): string {
        if (nodeId === 'bottle') {
            return this.isCompact ? '12%' : '16%';
        }
        if (nodeId === 'jellyfish') {
            return this.isCompact ? '43%' : '45%';
        }
        return this.isCompact ? '72%' : '74%';
    }
    private getNodePositionY(nodeId: string): string {
        if (nodeId === 'bottle') {
            return this.isCompact ? '55%' : '54%';
        }
        if (nodeId === 'jellyfish') {
            return this.isCompact ? '30%' : '28%';
        }
        return this.isCompact ? '50%' : '48%';
    }
    private isVisited(nodeId: string): boolean {
        for (let index = 0; index < this.visitedNodeIds.length; index++) {
            const item: string | undefined = this.visitedNodeIds[index];
            if (item !== undefined && item === nodeId) {
                return true;
            }
        }
        return false;
    }
    private getVisitedCount(): number {
        return this.visitedNodeIds.length;
    }
    private getSelectedNode(): DreamJourneyNode | undefined {
        for (let index = 0; index < dreamNodes.length; index++) {
            const item: DreamJourneyNode | undefined = dreamNodes[index];
            if (item !== undefined && item.id === this.selectedNodeId) {
                return item;
            }
        }
        return undefined;
    }
    private getNodeActionTarget(nodeId: string): number {
        if (nodeId === 'jellyfish') {
            return 3;
        }
        return 2;
    }
    private getNodeActionLabel(nodeId: string): string {
        if (nodeId === 'bottle') {
            return this.nodeActionCount === 0 ? '轻摇漂流瓶' : '拆开瓶中信';
        }
        if (nodeId === 'jellyfish') {
            if (this.nodeActionCount === 0) {
                return '跟随第一束光';
            }
            if (this.nodeActionCount === 1) {
                return '跟随第二束光';
            }
            return '让水母点亮海面';
        }
        return this.nodeActionCount === 0 ? '安静等它垂钓' : '收下那颗星星';
    }
    private getSelectedNodeHint(): string {
        const node: DreamJourneyNode | undefined = this.getSelectedNode();
        if (node === undefined) {
            return '选中画面里的一个微光节点，它会展开自己的小互动。';
        }
        if (this.isVisited(node.id)) {
            return `${node.name}已经被你遇见过了。它会继续留在星海里发光。`;
        }
        if (node.id === 'bottle') {
            return this.nodeActionCount === 0 ? '瓶身里有纸声。先轻轻摇一摇。' : '瓶塞松开了，可以读里面的信。';
        }
        if (node.id === 'jellyfish') {
            return `跟着水母的微光游动 ${this.nodeActionCount} / 3，海面会一点点亮起来。`;
        }
        return this.nodeActionCount === 0 ? '不要催它。影子小人需要一点安静的时间。' : '鱼线动了，它好像钓到了一颗星。';
    }
    private getRouteHint(): string {
        if (!this.hasStarted) {
            return '第一步：点击“启航”，让纸船离开渡口。';
        }
        if (this.getVisitedCount() >= dreamNodes.length) {
            return '今日航线完成了。你可以重新靠岸，再走一遍星海。';
        }
        return `第二步：轻触画面里的微光节点 ${this.getVisitedCount()} / ${dreamNodes.length}`;
    }
    private startJourney(): void {
        if (this.hasStarted) {
            return;
        }
        if (this.crystals <= 0) {
            this.logText = '今天还缺一枚情绪结晶。先记录心情，再让纸船出发。';
            return;
        }
        this.crystals -= 1;
        this.hasStarted = true;
        this.selectedNodeId = '';
        this.nodeActionCount = 0;
        this.beamSweep = 0;
        this.jellyGlowScale = 1;
        this.fishingLineHeight = 18;
        this.fishingStarRise = 0;
        this.visitedNodeIds = [];
        this.logText = '纸船离岸了。云海很安静，远处有几个微光节点在等你轻轻点亮。';
    }
    private resetJourney(): void {
        this.hasStarted = false;
        this.selectedNodeId = '';
        this.nodeActionCount = 0;
        this.beamSweep = 0;
        this.jellyGlowScale = 1;
        this.fishingLineHeight = 18;
        this.fishingStarRise = 0;
        this.visitedNodeIds = [];
        this.logText = '纸船重新靠回渡口。下一次启航，也可以很慢。';
    }
    private selectNode(node: DreamJourneyNode): void {
        if (!this.hasStarted) {
            this.logText = '先让纸船启航，再靠近梦境节点。';
            return;
        }
        this.selectedNodeId = node.id;
        this.nodeActionCount = 0;
        this.beamSweep = 0;
        this.jellyGlowScale = 1;
        this.fishingLineHeight = 18;
        this.fishingStarRise = 0;
        if (this.isVisited(node.id)) {
            this.logText = `${node.name}还在原地发光。你已经收下过它给你的那一句话。`;
            return;
        }
        this.logText = `${node.name}靠近了。${node.hint}`;
    }
    private completeNode(node: DreamJourneyNode): void {
        if (this.isVisited(node.id)) {
            this.logText = `${node.name}还在原地发光。你已经收下过它给你的那一句话。`;
            return;
        }
        const nextVisitedIds: string[] = [];
        for (let index = 0; index < this.visitedNodeIds.length; index++) {
            const item: string | undefined = this.visitedNodeIds[index];
            if (item !== undefined) {
                nextVisitedIds.push(item);
            }
        }
        nextVisitedIds.push(node.id);
        this.visitedNodeIds = nextVisitedIds;
        this.logText = node.rewardText;
        this.stardust += 1;
        if (nextVisitedIds.length >= dreamNodes.length) {
            this.logText = `${node.rewardText} 今日航线完成，纸船带回了一张还没显影的梦。`;
        }
    }
    private performNodeAction(): void {
        const node: DreamJourneyNode | undefined = this.getSelectedNode();
        if (node === undefined) {
            this.logText = '先在星海画面里选一个微光节点。';
            return;
        }
        if (this.isVisited(node.id)) {
            this.logText = `${node.name}已经完成了。试试靠近另一个微光节点。`;
            return;
        }
        const nextCount: number = this.nodeActionCount + 1;
        this.nodeActionCount = nextCount;
        if (node.id === 'jellyfish') {
            this.beamSweep = Math.min(3, nextCount);
            this.jellyGlowScale = this.jellyGlowScale > 1 ? 1 : 1.18;
        }
        if (node.id === 'shadow') {
            this.fishingLineHeight = nextCount === 1 ? 54 : 28;
            this.fishingStarRise = nextCount === 1 ? 0 : 26;
        }
        if (nextCount >= this.getNodeActionTarget(node.id)) {
            this.completeNode(node);
            return;
        }
        if (node.id === 'bottle') {
            this.logText = '瓶子里的纸条贴着玻璃晃了一下，瓶塞变松了。';
            return;
        }
        if (node.id === 'jellyfish') {
            this.logText = '水母拖出一条浅蓝色光痕。继续跟着它，海面会更亮一点。';
            return;
        }
        this.logText = '影子小人没有说话，只把鱼竿往星海深处放了放。';
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Context.animation({ duration: 560, curve: Curve.FastOutSlowIn });
            Column.width(this.isCompact ? '92%' : this.isWide ? '58%' : '82%');
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
            Context.animation(null);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.alignItems(HorizontalAlign.Start);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('Wonderland · 琉璃星海');
            Text.fontSize(this.isCompact ? 20 : this.isWide ? 26 : 22);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor('#506164');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('一次很短、不会失败的梦境旅行');
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
            Text.create(`星尘 ${this.stardust}`);
            Text.fontSize(12);
            Text.fontColor('#607174');
            Text.padding({ left: 12, right: 12, top: 7, bottom: 7 });
            Text.borderRadius(17);
            Text.backgroundColor('#B8F7FBF8');
            Text.backdropBlur(12);
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create({ alignContent: Alignment.Center });
            Context.animation({ duration: 620, curve: Curve.FastOutSlowIn });
            Stack.width('100%');
            Stack.height(this.isCompact ? 246 : 286);
            Stack.margin({ top: 18 });
            Context.animation(null);
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create(this.getBackgroundAsset());
            Image.width('100%');
            Image.height(this.isCompact ? 246 : 286);
            Image.borderRadius(30);
            Image.objectFit(ImageFit.Cover);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height(this.isCompact ? 246 : 286);
            Column.borderRadius(30);
            Column.backgroundColor('#26F7FBF8');
        }, Column);
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('82%');
            Column.height(1);
            Column.backgroundColor('#AAF7FBF8');
            Column.opacity(0.58);
            Column.rotate({ angle: -8 });
        }, Column);
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const node = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Context.animation({ duration: 520, curve: Curve.FastOutSlowIn });
                    Column.position({ x: this.getNodePositionX(node.id), y: this.getNodePositionY(node.id) });
                    Column.scale({
                        x: this.selectedNodeId === node.id ? 1.08 : 1,
                        y: this.selectedNodeId === node.id ? 1.08 : 1
                    });
                    Context.animation(null);
                    Column.onClick(() => {
                        this.selectNode(node);
                    });
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    If.create();
                    if (node.id === 'jellyfish' && this.selectedNodeId === 'jellyfish') {
                        this.ifElseBranchUpdateFunction(0, () => {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Stack.create();
                                Stack.width(96);
                                Stack.height(34);
                                Stack.margin({ bottom: -8 });
                            }, Stack);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Column.create();
                                Context.animation({ duration: 620, curve: Curve.FastOutSlowIn });
                                Column.width(86);
                                Column.height(3);
                                Column.borderRadius(2);
                                Column.backgroundColor('#99DDF4FF');
                                Column.opacity(this.beamSweep > 0 ? 0.78 : 0.16);
                                Column.rotate({ angle: -13 });
                                Column.translate({ x: this.beamSweep * 18 - 30, y: 8 });
                                Context.animation(null);
                            }, Column);
                            Column.pop();
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Column.create();
                                Context.animation({ duration: 620, curve: Curve.EaseOut });
                                Column.width(58);
                                Column.height(2);
                                Column.borderRadius(1);
                                Column.backgroundColor('#88FFFFFF');
                                Column.opacity(this.beamSweep > 1 ? 0.68 : 0.12);
                                Column.rotate({ angle: 18 });
                                Column.translate({ x: this.beamSweep * 14 - 20, y: 22 });
                                Context.animation(null);
                            }, Column);
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
                    Image.create(this.getNodeImageResource(node.id));
                    Context.animation({ duration: 620, curve: Curve.FastOutSlowIn });
                    Image.width(this.selectedNodeId === node.id ? 58 : 50);
                    Image.height(this.selectedNodeId === node.id ? 58 : 50);
                    Image.objectFit(ImageFit.Contain);
                    Image.opacity(this.hasStarted ? (this.isVisited(node.id) ? 0.86 : 1) : 0.48);
                    Image.scale({
                        x: node.id === 'jellyfish' && this.selectedNodeId === node.id ? this.jellyGlowScale : 1,
                        y: node.id === 'jellyfish' && this.selectedNodeId === node.id ? this.jellyGlowScale : 1
                    });
                    Image.shadow({
                        radius: node.id === 'jellyfish' && this.selectedNodeId === node.id ? 28 : (this.selectedNodeId === node.id ? 22 : 12),
                        color: node.id === 'jellyfish' && this.selectedNodeId === node.id ? '#88DDF4FF' : (this.isVisited(node.id) ? '#66F7FBF8' : '#2231464A'),
                        offsetY: 8
                    });
                    Context.animation(null);
                }, Image);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    If.create();
                    if (node.id === 'shadow' && this.selectedNodeId === 'shadow') {
                        this.ifElseBranchUpdateFunction(0, () => {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Stack.create({ alignContent: Alignment.Top });
                                Stack.height(66);
                                Stack.margin({ top: -4, bottom: -16 });
                            }, Stack);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Column.create();
                                Context.animation({ duration: 680, curve: Curve.EaseOut });
                                Column.width(2);
                                Column.height(this.fishingLineHeight);
                                Column.borderRadius(1);
                                Column.backgroundColor('#AA506164');
                                Context.animation(null);
                            }, Column);
                            Column.pop();
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create('✦');
                                Context.animation({ duration: 760, curve: Curve.FastOutSlowIn });
                                Text.fontSize(16);
                                Text.fontColor('#FFF7C8');
                                Text.opacity(this.nodeActionCount > 0 ? 0.92 : 0);
                                Text.translate({ y: this.fishingLineHeight - this.fishingStarRise });
                                Text.shadow({ radius: 16, color: '#AAFFF7C8', offsetY: 0 });
                                Context.animation(null);
                            }, Text);
                            Text.pop();
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
                    Text.create(this.isVisited(node.id) ? '已遇见' : node.name);
                    Text.fontSize(10);
                    Text.fontColor('#506164');
                    Text.padding({ left: 8, right: 8, top: 4, bottom: 4 });
                    Text.borderRadius(12);
                    Text.backgroundColor('#CCFDFEFA');
                    Text.backdropBlur(10);
                    Text.margin({ top: 4 });
                }, Text);
                Text.pop();
                Column.pop();
            };
            this.forEachUpdateFunction(elmtId, dreamNodes, forEachItemGenFunction, (node: DreamJourneyNode) => `scene-${node.id}`, false, false);
        }, ForEach);
        ForEach.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.padding({ left: 14, right: 14, top: 8, bottom: 8 });
            Row.borderRadius(18);
            Row.backgroundColor('#CCFDFEFA');
            Row.backdropBlur(14);
            Row.position({ x: this.isCompact ? '7%' : '12%', y: this.isCompact ? '8%' : '9%' });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width(8);
            Column.height(8);
            Column.borderRadius(4);
            Column.backgroundColor(this.mood.color);
            Column.opacity(0.86);
        }, Column);
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.getRouteHint());
            Text.fontSize(12);
            Text.fontColor('#607174');
            Text.margin({ left: 8 });
        }, Text);
        Text.pop();
        Row.pop();
        Stack.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.margin({ top: 16 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.hasStarted ? '重新靠岸' : '消耗 1 枚结晶启航');
            Text.fontSize(14);
            Text.fontColor('#56686B');
            Text.padding({ left: 18, right: 18, top: 9, bottom: 9 });
            Text.borderRadius(20);
            Text.backgroundColor('#CCF7FBF8');
            Text.backdropBlur(14);
            Text.onClick(() => {
                if (this.hasStarted) {
                    this.resetJourney();
                }
                else {
                    this.startJourney();
                }
            });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`情绪结晶 ${this.crystals}`);
            Text.fontSize(12);
            Text.fontColor('#7E8E90');
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.margin({ top: 18 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const node = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    __Common__.create();
                    __Common__.margin({ right: this.isCompact ? 8 : 12 });
                    __Common__.onClick(() => {
                        this.selectNode(node);
                    });
                }, __Common__);
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new JourneyNodeCard(this, {
                                node: node,
                                selectedNodeId: this.selectedNodeId,
                                visited: this.isVisited(node.id),
                                isEnabled: this.hasStarted,
                                isCompact: this.isCompact
                            }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/components/JourneyMap.ets", line: 527, col: 11 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {
                                    node: node,
                                    selectedNodeId: this.selectedNodeId,
                                    visited: this.isVisited(node.id),
                                    isEnabled: this.hasStarted,
                                    isCompact: this.isCompact
                                };
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {
                                node: node,
                                selectedNodeId: this.selectedNodeId,
                                visited: this.isVisited(node.id),
                                isEnabled: this.hasStarted,
                                isCompact: this.isCompact
                            });
                        }
                    }, { name: "JourneyNodeCard" });
                }
                __Common__.pop();
            };
            this.forEachUpdateFunction(elmtId, dreamNodes, forEachItemGenFunction, (node: DreamJourneyNode) => node.id, false, false);
        }, ForEach);
        ForEach.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.padding({ left: 16, right: 16, top: 14, bottom: 14 });
            Column.borderRadius(22);
            Column.backgroundColor('#CCFDFEFA');
            Column.backdropBlur(16);
            Column.margin({ top: 14 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('节点互动');
            Text.fontSize(14);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor('#506164');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.selectedNodeId.length === 0 ? '未选中' : `${this.nodeActionCount}/${this.getNodeActionTarget(this.selectedNodeId)}`);
            Text.fontSize(12);
            Text.fontColor('#7E8E90');
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.getSelectedNodeHint());
            Text.fontSize(12);
            Text.fontColor('#607174');
            Text.lineHeight(19);
            Text.margin({ top: 8 });
            Text.width('100%');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.selectedNodeId.length === 0 ? '先选一个节点' : this.getNodeActionLabel(this.selectedNodeId));
            Text.fontSize(13);
            Text.fontColor('#56686B');
            Text.textAlign(TextAlign.Center);
            Text.padding({ left: 18, right: 18, top: 9, bottom: 9 });
            Text.borderRadius(20);
            Text.backgroundColor('#D8EDF6F1');
            Text.backdropBlur(12);
            Text.margin({ top: 12 });
            Text.onClick(() => {
                this.performNodeAction();
            });
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.padding({ left: 16, right: 16, top: 14, bottom: 14 });
            Column.borderRadius(22);
            Column.backgroundColor('#CCFDFEFA');
            Column.backdropBlur(16);
            Column.margin({ top: 16 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('旅行札记');
            Text.fontSize(14);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor('#506164');
            Text.width('100%');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.logText);
            Text.fontSize(13);
            Text.fontColor('#607174');
            Text.lineHeight(21);
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
