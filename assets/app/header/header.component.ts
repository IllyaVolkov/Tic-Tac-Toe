import {Component, OnDestroy, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {SocketService} from "../socket.service";
import {UserDataService} from "../userData.service";

@Component({
    selector: 'app-header',
    templateUrl: 'header.component.html',
    styleUrls: ['header.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy{
    public user_connected = null;

    public constructor(private router: Router, private userDataService: UserDataService, private socketService: SocketService) {}

    public ngOnInit() {
        this.userDataService.userConnected.subscribe((value)=>{
            this.user_connected = value;
        });
    }

    public ngOnDestroy() {
        this.userDataService.userConnected.unsubscribe();
    }

    public disconnect(): void {
        this.socketService.disconnect();
    }
}