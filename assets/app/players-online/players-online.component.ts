import {Component, Input} from "@angular/core";
import {SocketService} from "../socket.service";
import {UserData} from "../userData.service";

@Component({
    selector: 'players-online',
    templateUrl: './players-online.component.html',
    styleUrls: ['players-online.component.css']
})

export class PlayersOnlineComponent {
    @Input() data: UserData[];
    @Input() user: UserData;

    public constructor(private chatService: SocketService) {}

    public joinPlayer(login: string): void {
        this.chatService.joinPlayer(login);
    }
}