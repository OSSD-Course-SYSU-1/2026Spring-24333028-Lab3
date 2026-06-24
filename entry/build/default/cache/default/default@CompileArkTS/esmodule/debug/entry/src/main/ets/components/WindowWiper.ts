if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface WindowWiper_Params {
    isWiped?: boolean;
    mood?: MoodOption;
    isCompact?: boolean;
    isWide?: boolean;
    fogOpacity?: number;
    hintOpacity?: number;
    totalDistance?: number;
    gestureStartOpacity?: number;
}
import { peacefulMoodOption } from "@bundle:com.dreamjourney.native/entry/ets/common/Models";
import type { MoodOption } from "@bundle:com.dreamjourney.native/entry/ets/common/Models";
export class WindowWiper extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__isWiped = new SynchedPropertySimpleTwoWayPU(params.isWiped, this, "isWiped");
        this.__mood = new SynchedPropertyObjectOneWayPU(params.mood, this, "mood");
        this.__isCompact = new SynchedPropertySimpleOneWayPU(params.isCompact, this, "isCompact");
        this.__isWide = new SynchedPropertySimpleOneWayPU(params.isWide, this, "isWide");
        this.__fogOpacity = new ObservedPropertySimplePU(0.94, this, "fogOpacity");
        this.__hintOpacity = new ObservedPropertySimplePU(1, this, "hintOpacity");
        this.totalDistance = 0;
        this.gestureStartOpacity = 0.94;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: WindowWiper_Params) {
        if (params.mood === undefined) {
            this.__mood.set(peacefulMoodOption);
        }
        if (params.isCompact === undefined) {
            this.__isCompact.set(false);
        }
        if (params.isWide === undefined) {
            this.__isWide.set(false);
        }
        if (params.fogOpacity !== undefined) {
            this.fogOpacity = params.fogOpacity;
        }
        if (params.hintOpacity !== undefined) {
            this.hintOpacity = params.hintOpacity;
        }
        if (params.totalDistance !== undefined) {
            this.totalDistance = params.totalDistance;
        }
        if (params.gestureStartOpacity !== undefined) {
            this.gestureStartOpacity = params.gestureStartOpacity;
        }
    }
    updateStateVars(params: WindowWiper_Params) {
        this.__mood.reset(params.mood);
        this.__isCompact.reset(params.isCompact);
        this.__isWide.reset(params.isWide);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__isWiped.purgeDependencyOnElmtId(rmElmtId);
        this.__mood.purgeDependencyOnElmtId(rmElmtId);
        this.__isCompact.purgeDependencyOnElmtId(rmElmtId);
        this.__isWide.purgeDependencyOnElmtId(rmElmtId);
        this.__fogOpacity.purgeDependencyOnElmtId(rmElmtId);
        this.__hintOpacity.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__isWiped.aboutToBeDeleted();
        this.__mood.aboutToBeDeleted();
        this.__isCompact.aboutToBeDeleted();
        this.__isWide.aboutToBeDeleted();
        this.__fogOpacity.aboutToBeDeleted();
        this.__hintOpacity.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __isWiped: SynchedPropertySimpleTwoWayPU<boolean>;
    get isWiped() {
        return this.__isWiped.get();
    }
    set isWiped(newValue: boolean) {
        this.__isWiped.set(newValue);
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
    private __fogOpacity: ObservedPropertySimplePU<number>;
    get fogOpacity() {
        return this.__fogOpacity.get();
    }
    set fogOpacity(newValue: number) {
        this.__fogOpacity.set(newValue);
    }
    private __hintOpacity: ObservedPropertySimplePU<number>;
    get hintOpacity() {
        return this.__hintOpacity.get();
    }
    set hintOpacity(newValue: number) {
        this.__hintOpacity.set(newValue);
    }
    private totalDistance: number;
    private gestureStartOpacity: number;
    private updateFogBySwipe(deltaX: number, deltaY: number): void {
        if (this.isWiped) {
            return;
        }
        const distance: number = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        this.totalDistance += distance;
        const nextOpacity: number = this.gestureStartOpacity - Math.min(this.totalDistance / 720, this.gestureStartOpacity);
        this.fogOpacity = Math.max(0, nextOpacity);
        this.hintOpacity = Math.max(0, this.fogOpacity - 0.12);
        if (this.fogOpacity <= 0.06) {
            this.fogOpacity = 0;
            this.hintOpacity = 0;
            this.isWiped = true;
        }
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create({ alignContent: Alignment.Center });
            Stack.width('100%');
            Stack.height('100%');
            Gesture.create(GesturePriority.Low);
            PanGesture.create();
            PanGesture.onActionStart(() => {
                this.totalDistance = 0;
                this.gestureStartOpacity = this.fogOpacity;
            });
            PanGesture.onActionUpdate((event: GestureEvent) => {
                if (!event) {
                    return;
                }
                // 用更克制的整层雾幕递减，替代之前生硬的伪局部擦除手感。
                this.updateFogBySwipe(Math.abs(event.offsetX), Math.abs(event.offsetY));
            });
            PanGesture.onActionEnd(() => {
                this.totalDistance = 0;
            });
            PanGesture.pop();
            Gesture.pop();
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Context.animation({ duration: 620, curve: Curve.EaseOut });
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor(this.mood.fogColor);
            Column.opacity(this.fogOpacity);
            Column.backdropBlur(this.isWide ? 28 : 22);
            Context.animation(null);
        }, Column);
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Context.animation({ duration: 520, curve: Curve.FastOutSlowIn });
            Column.alignItems(HorizontalAlign.Center);
            Column.opacity(this.hintOpacity);
            Context.animation(null);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('轻轻擦亮今天');
            Text.fontSize(this.isCompact ? 18 : this.isWide ? 24 : 20);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor('#627376');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('让雾慢慢散开，小镇会自己醒来');
            Text.fontSize(this.isCompact ? 12 : 13);
            Text.fontColor('#8C9A9D');
            Text.margin({ top: 8 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.mood.name);
            Text.fontSize(12);
            Text.fontColor('#718285');
            Text.padding({ left: 12, right: 12, top: 6, bottom: 6 });
            Text.borderRadius(16);
            Text.backgroundColor('#FFFFFF99');
            Text.backdropBlur(12);
            Text.margin({ top: 18 });
        }, Text);
        Text.pop();
        Column.pop();
        Stack.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
