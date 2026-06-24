import UIAbility from "@ohos:app.ability.UIAbility";
import type window from "@ohos:window";
export default class EntryAbility extends UIAbility {
    onWindowStageCreate(j13: window.WindowStage): void {
        j13.loadContent('pages/Index', (k13) => {
            if (k13.code) {
                console.error(`DreamJourney load page failed. code: ${k13.code}, message: ${k13.message}`);
                return;
            }
            console.info('DreamJourney page loaded.');
        });
    }
}
