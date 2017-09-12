import {Component, OnDestroy, OnInit} from "@angular/core";
import {SocketService} from "./socket.service";
import {UserData, UserDataService} from "./userData.service";
import {ServerConnectionService} from "./serverConnection.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy {
    public messages: {author: string, text: string}[] = [];
    public users_online: any = [];
    public user_connected: UserData = null;

    public constructor(private chatService: SocketService,
                       private userDataService: UserDataService,
                       private serverConnectionService: ServerConnectionService) {}

    public ngOnInit() {
        if (this.serverConnectionService.loadToken()) {
            this.chatService.connect();
        }
        this.chatService.messagesChanged.subscribe((data: any) => {
            if (data === 'erase') {
                this.messages = [];
            } else {
                this.messages.push(data);
            }
        });
        this.chatService.usersChanged.subscribe((data: any) => {
            if (data === 'erase') {
                this.users_online = [];
            } else {
                this.users_online = data;
            }
        });
        this.userDataService.userConnected.subscribe((value: UserData)=>{
            this.user_connected = value;
        });
    }

    public ngOnDestroy() {
        this.chatService.usersChanged.unsubscribe();
        this.chatService.messagesChanged.unsubscribe();
        this.userDataService.userConnected.unsubscribe();
    }
}