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
    wipeOffsetX?: number;
    wipeOffsetY?: number;
    totalDistance?: number;
    gestureStartOpacity?: number;
}
import { peacefulMoodOption } from "@bundle:com.dreamjourney.native/entry/ets/common/Models";
import type { MoodOption } from "@bundle:com.dreamjourney.native/entry/ets/common/Models";
export class WindowWiper extends ViewPU {
    constructor(d13, e13, f13, g13 = -1, h13 = undefined, i13) {
        super(d13, f13, g13, i13);
        if (typeof h13 === "function") {
            this.paramsGenerator_ = h13;
        }
        this.__isWiped = new SynchedPropertySimpleTwoWayPU(e13.isWiped, this, "isWiped");
        this.__mood = new SynchedPropertyObjectOneWayPU(e13.mood, this, "mood");
        this.__isCompact = new SynchedPropertySimpleOneWayPU(e13.isCompact, this, "isCompact");
        this.__isWide = new SynchedPropertySimpleOneWayPU(e13.isWide, this, "isWide");
        this.__fogOpacity = new ObservedPropertySimplePU(0.86, this, "fogOpacity");
        this.__hintOpacity = new ObservedPropertySimplePU(1, this, "hintOpacity");
        this.__wipeOffsetX = new ObservedPropertySimplePU(0, this, "wipeOffsetX");
        this.__wipeOffsetY = new ObservedPropertySimplePU(0, this, "wipeOffsetY");
        this.totalDistance = 0;
        this.gestureStartOpacity = 0.86;
        this.setInitiallyProvidedValue(e13);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(c13: WindowWiper_Params) {
        if (c13.mood === undefined) {
            this.__mood.set(peacefulMoodOption);
        }
        if (c13.isCompact === undefined) {
            this.__isCompact.set(false);
        }
        if (c13.isWide === undefined) {
            this.__isWide.set(false);
        }
        if (c13.fogOpacity !== undefined) {
            this.fogOpacity = c13.fogOpacity;
        }
        if (c13.hintOpacity !== undefined) {
            this.hintOpacity = c13.hintOpacity;
        }
        if (c13.wipeOffsetX !== undefined) {
            this.wipeOffsetX = c13.wipeOffsetX;
        }
        if (c13.wipeOffsetY !== undefined) {
            this.wipeOffsetY = c13.wipeOffsetY;
        }
        if (c13.totalDistance !== undefined) {
            this.totalDistance = c13.totalDistance;
        }
        if (c13.gestureStartOpacity !== undefined) {
            this.gestureStartOpacity = c13.gestureStartOpacity;
        }
    }
    updateStateVars(b13: WindowWiper_Params) {
        this.__mood.reset(b13.mood);
        this.__isCompact.reset(b13.isCompact);
        this.__isWide.reset(b13.isWide);
    }
    purgeVariableDependenciesOnElmtId(a13) {
        this.__isWiped.purgeDependencyOnElmtId(a13);
        this.__mood.purgeDependencyOnElmtId(a13);
        this.__isCompact.purgeDependencyOnElmtId(a13);
        this.__isWide.purgeDependencyOnElmtId(a13);
        this.__fogOpacity.purgeDependencyOnElmtId(a13);
        this.__hintOpacity.purgeDependencyOnElmtId(a13);
        this.__wipeOffsetX.purgeDependencyOnElmtId(a13);
        this.__wipeOffsetY.purgeDependencyOnElmtId(a13);
    }
    aboutToBeDeleted() {
        this.__isWiped.aboutToBeDeleted();
        this.__mood.aboutToBeDeleted();
        this.__isCompact.aboutToBeDeleted();
        this.__isWide.aboutToBeDeleted();
        this.__fogOpacity.aboutToBeDeleted();
        this.__hintOpacity.aboutToBeDeleted();
        this.__wipeOffsetX.aboutToBeDeleted();
        this.__wipeOffsetY.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __isWiped: SynchedPropertySimpleTwoWayPU<boolean>;
    get isWiped() {
        return this.__isWiped.get();
    }
    set isWiped(z12: boolean) {
        this.__isWiped.set(z12);
    }
    private __mood: SynchedPropertySimpleOneWayPU<MoodOption>;
    get mood() {
        return this.__mood.get();
    }
    set mood(y12: MoodOption) {
        this.__mood.set(y12);
    }
    private __isCompact: SynchedPropertySimpleOneWayPU<boolean>;
    get isCompact() {
        return this.__isCompact.get();
    }
    set isCompact(x12: boolean) {
        this.__isCompact.set(x12);
    }
    private __isWide: SynchedPropertySimpleOneWayPU<boolean>;
    get isWide() {
        return this.__isWide.get();
    }
    set isWide(w12: boolean) {
        this.__isWide.set(w12);
    }
    private __fogOpacity: ObservedPropertySimplePU<number>;
    get fogOpacity() {
        return this.__fogOpacity.get();
    }
    set fogOpacity(v12: number) {
        this.__fogOpacity.set(v12);
    }
    private __hintOpacity: ObservedPropertySimplePU<number>;
    get hintOpacity() {
        return this.__hintOpacity.get();
    }
    set hintOpacity(u12: number) {
        this.__hintOpacity.set(u12);
    }
    private __wipeOffsetX: ObservedPropertySimplePU<number>;
    get wipeOffsetX() {
        return this.__wipeOffsetX.get();
    }
    set wipeOffsetX(t12: number) {
        this.__wipeOffsetX.set(t12);
    }
    private __wipeOffsetY: ObservedPropertySimplePU<number>;
    get wipeOffsetY() {
        return this.__wipeOffsetY.get();
    }
    set wipeOffsetY(s12: number) {
        this.__wipeOffsetY.set(s12);
    }
    private totalDistance: number;
    private gestureStartOpacity: number;
    private updateFogBySwipe(o12: number, p12: number): void {
        if (this.isWiped) {
            return;
        }
        const q12: number = Math.sqrt(o12 * o12 + p12 * p12);
        this.totalDistance += q12;
        const r12: number = this.gestureStartOpacity - Math.min(this.totalDistance / 560, this.gestureStartOpacity);
        this.fogOpacity = Math.max(0, r12);
        this.hintOpacity = Math.max(0, this.fogOpacity - 0.24);
        if (this.fogOpacity <= 0.04) {
            this.fogOpacity = 0;
            this.hintOpacity = 0;
            this.isWiped = true;
        }
    }
    initialRender() {
        this.observeComponentCreation2((l12, m12) => {
            Stack.create();
            Stack.width('100%');
            Stack.height('100%');
            Gesture.create(GesturePriority.Low);
            PanGesture.create();
            PanGesture.onActionStart(() => {
                this.totalDistance = 0;
                this.gestureStartOpacity = this.fogOpacity;
            });
            PanGesture.onActionUpdate((n12: GestureEvent) => {
                if (!n12) {
                    return;
                }
                this.wipeOffsetX = n12.offsetX;
                this.wipeOffsetY = n12.offsetY;
                this.updateFogBySwipe(Math.abs(n12.offsetX), Math.abs(n12.offsetY));
            });
            PanGesture.onActionEnd(() => {
                this.wipeOffsetX = 0;
                this.wipeOffsetY = 0;
            });
            PanGesture.pop();
            Gesture.pop();
        }, Stack);
        this.observeComponentCreation2((j12, k12) => {
            Column.create();
            Context.animation({ duration: 760, curve: Curve.FastOutSlowIn });
            Column.width('100%');
            Column.height('100%');
            Column.linearGradient({
                angle: 180,
                colors: [[this.mood.color, 0], ['#F8E8DD', 0.62], ['#E8E4F0', 1]]
            });
            Context.animation(null);
        }, Column);
        this.observeComponentCreation2((h12, i12) => {
            Text.create('梦旅小镇');
            Text.fontSize(this.isCompact ? 27 : this.isWide ? 40 : 32);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor('#5F6F73');
            Text.margin({ top: this.isCompact ? 150 : this.isWide ? 150 : 128 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((f12, g12) => {
            Text.create('远处的灯，正在等你醒来');
            Text.fontSize(this.isCompact ? 13 : this.isWide ? 17 : 15);
            Text.fontColor('#7C8A8D');
            Text.margin({ top: 12 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((d12, e12) => {
            Text.create(this.mood.weather);
            Context.animation({ duration: 620, curve: Curve.FastOutSlowIn });
            Text.fontSize(this.isCompact ? 12 : 13);
            Text.fontColor('#748487');
            Text.padding({ left: 16, right: 16, top: 8, bottom: 8 });
            Text.borderRadius(18);
            Text.backgroundColor('#FFFFFF77');
            Text.backdropBlur(12);
            Text.margin({ top: 16 });
            Context.animation(null);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((b12, c12) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((z11, a12) => {
            Text.create(this.mood.hint);
            Text.fontSize(this.isCompact ? 12 : this.isWide ? 16 : 14);
            Text.fontColor('#829093');
            Text.maxLines(2);
            Text.textAlign(TextAlign.Center);
            Text.margin({
                left: this.isCompact ? 28 : 0,
                right: this.isCompact ? 28 : 0,
                bottom: this.isCompact ? 132 : this.isWide ? 110 : 104
            });
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((x11, y11) => {
            Column.create();
            Context.animation({ duration: 620, curve: Curve.EaseOut });
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor(this.mood.fogColor);
            Column.opacity(this.fogOpacity);
            Column.backdropBlur(36);
            Context.animation(null);
        }, Column);
        Column.pop();
        this.observeComponentCreation2((v11, w11) => {
            Column.create();
            Context.animation({ duration: 520, curve: Curve.FastOutSlowIn });
            Column.alignItems(HorizontalAlign.Center);
            Column.opacity(this.hintOpacity);
            Column.translate({ x: this.wipeOffsetX * 0.06, y: this.wipeOffsetY * 0.06 });
            Context.animation(null);
        }, Column);
        this.observeComponentCreation2((t11, u11) => {
            Text.create('用手指擦开雾气');
            Text.fontSize(this.isCompact ? 16 : this.isWide ? 21 : 18);
            Text.fontColor('#6F7F82');
            Text.margin({ bottom: 10 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((r11, s11) => {
            Text.create('让今天慢慢显影');
            Text.fontSize(this.isCompact ? 12 : 13);
            Text.fontColor('#93A0A3');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((p11, q11) => {
            Text.create(this.mood.name);
            Context.animation({ duration: 520, curve: Curve.EaseOut });
            Text.fontSize(12);
            Text.fontColor('#7A898C');
            Text.padding({ left: 12, right: 12, top: 5, bottom: 5 });
            Text.borderRadius(14);
            Text.backgroundColor('#FFFFFF88');
            Text.margin({ top: 14 });
            Context.animation(null);
        }, Text);
        Text.pop();
        Column.pop();
        Stack.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
