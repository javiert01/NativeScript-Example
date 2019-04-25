import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit, ChangeDetectorRef, ViewContainerRef } from "@angular/core";
import { UIService } from "./shared/ui.service";
import { Subscription } from "rxjs";
import { RadSideDrawerComponent } from "nativescript-ui-sidedrawer/angular/side-drawer-directives";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";

@Component({
    selector: "ns-app",
    moduleId: module.id,
    templateUrl: "./app.component.html"
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit{

    @ViewChild(RadSideDrawerComponent) drawerComponent: RadSideDrawerComponent;
    private drawer: RadSideDrawer;
    activeChallenges: string[] = [];
    private drawerSub: Subscription;
    constructor(private uiService: UIService, private changeDetectionRef: ChangeDetectorRef,
        private vcRef:ViewContainerRef){}

    ngOnInit() {
        this.drawerSub = this.uiService.drawerState.subscribe(
            () => {
                if(this.drawer){
                    this.drawer.toggleDrawerState();
                }
            });
        this.uiService.setRootVCref(this.vcRef);
    }

    ngAfterViewInit() {
        this.drawer = this.drawerComponent.sideDrawer;

        this.changeDetectionRef.detectChanges();
    }



    onChallengeInput(challengeDescription: string){
        this.activeChallenges.push(challengeDescription);
    }

    onLogout(){
        this.uiService.toggleDrawer();
    }

    ngOnDestroy(){
        if(this.drawerSub){
            this.drawerSub.unsubscribe();
        }
    }
}
