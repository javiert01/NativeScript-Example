import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { ChallengeRoutingModule } from './challenges-routing.module';
import { ChallengeTabsComponent } from './challenge-tabs/challenge-tabs.component';
import { CurrentChallengeComponent } from './current-challenges/current-challenge.component';
import { TodayComponent } from './today/today.component';
import { SharedModule } from '../shared/shared.module';
import { ChallengeActionModule } from '../challenges/challenge-actions/challenge-actions.module';
@NgModule({
    declarations: [ChallengeTabsComponent, CurrentChallengeComponent, TodayComponent],
    imports:[NativeScriptCommonModule, ChallengeRoutingModule, SharedModule, ChallengeActionModule],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class ChallengesModule{

}

