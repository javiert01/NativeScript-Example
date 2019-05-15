import { Component, ViewContainerRef, OnInit, OnDestroy } from "@angular/core";
import { ModalDialogService } from 'nativescript-angular/modal-dialog';
import { DayModalComponent } from "../day-modal/day-modal.component";
import { UIService } from "~/app/shared/ui.service";
import { ChallengeService } from "../challenge.service";
import { Challenge } from "../challenge.model";
import { Subscription } from "rxjs";

@Component({
    selector: 'ns-current-challenge',
    templateUrl: './current-challenge.component.html',
    styleUrls: ['./current-challenge.component.common.scss','./current-challenge.component.css'],
    moduleId: module.id
})
export class CurrentChallengeComponent implements OnInit, OnDestroy{

    weekDays=['S','M','T','W','T','F','S'];
    currentChallenge: Challenge;
    private currentMonth: number;
    private currentYear: number;
    private curChallengeSub: Subscription;

    constructor(private modalDialog: ModalDialogService, private vcRef: ViewContainerRef,
        private uiService: UIService, private challengeService: ChallengeService){}

    ngOnInit() {
        this.curChallengeSub = this.challengeService.currentChallenge.subscribe(
            (challenge) => this.currentChallenge = challenge,
            (err) => console.log(err)
        )
    }

    onChangeStatus(){
    this.modalDialog.showModal(DayModalComponent, {
        fullscreen: true,
        viewContainerRef: this.uiService.getRootVCRef(),
        context: {
            date: new Date()
        }
    }).then(
        (action: string) => {
            console.log(action);
        }
    );
   }

   getRow(index: number, day:{dayInMonth: number, dayInWeek: number}){
    const startRow = 1;
    const weekRow = Math.floor(index / 7);
    const firstWeekDayofMonth = new Date(this.currentYear, this.currentMonth, 1).getDay();
    const irregularRow = day.dayInWeek < firstWeekDayofMonth ? 1 : 0;
    return startRow + weekRow + irregularRow;
   }

   ngOnDestroy(){
       this.curChallengeSub.unsubscribe();
   }


}
