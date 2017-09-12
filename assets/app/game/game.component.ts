import {Component, OnInit} from "@angular/core";
import {GameDataService} from "../gameData.service";
import {UserDataService} from "../userData.service";
import {SocketService} from "../socket.service";

@Component({
    selector: 'game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.css']
})

export class GameComponent implements OnInit{
    public gameData = [
        ['','',''],
        ['','',''],
        ['','','']
    ];
    public role;
    public player;
    public opponent;

    public constructor(private gameDataService: GameDataService, private userDataService: UserDataService,
                       private socketService: SocketService) {
        this.gameData = this.gameDataService.getGameData();
        this.player = this.userDataService.getUserData();
        this.opponent = this.userDataService.getOpponentData();
    }

    public ngOnInit() {
        this.gameDataService.gameDataSubject.subscribe((data) => {
            this.gameData = data;
        });
    }

    public makeTurn(row: number, col: number): void {
        if (this.gameData[row][col] !== '') {
            return;
        }
        this.socketService.makeTurn({row: row, col: col});
    }

    public leaveGame(): void {
        this.socketService.leaveGame();
    }
}