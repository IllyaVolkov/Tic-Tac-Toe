import {Injectable} from "@angular/core";
import {Subject} from "rxjs/Subject";
import * as io from 'socket.io-client';
import {UserDataService, UserData} from "./userData.service";
import {ServerConnectionService} from "./serverConnection.service";
import {GameDataService} from "./gameData.service";
import {Router} from "@angular/router";

@Injectable()

export class SocketService {
    private socket;
    private url: string;
    private roomName: string;

    public messagesChanged = new Subject();
    public usersChanged = new Subject();

    public constructor(private userDataService: UserDataService,
                       private serverConnectionService: ServerConnectionService,
                       private gameDataService: GameDataService,
                       private router: Router) {
        this.url = window.location.origin;
    }

    public connect(): void {
        let self = this;
        this.socket = io.connect(this.url);
        this.socket.on('connect', function(){
            self.socket.emit('authenticate', {token: self.serverConnectionService.getToken()});
        });
        this.socket.on('allowed', function(data) {
            self.userDataService.setUserData(data.user);
            self.socket.emit('load users');
        });
        this.socket.on('denied', function(data) {
            alert('Can`t connect to the server!');
            self.userDataService.removeUserData();
        });
        this.socket.on('users loaded', function (data) {
            self.usersChanged.next(data);
        });
        this.socket.on('chat message', function (data) {
            self.messagesChanged.next(data);
        });
        this.socket.on('invite', function (data) {
            let message = 'User: ' + data.user.Login + ' rank: ' + data.user.Rank + ' wants to play with you. Accept?';
                if (!self.roomName && confirm(message)) {
                    self.roomName = data.room;
                    self.socket.emit('accept', {room: self.roomName, user: self.userDataService.getUserData()});
                } else {
                    self.socket.emit('decline', {room: data.room});
                }
        });
        this.socket.on('startGame', function (data) {
            let users = data.users;
            let userDataLogin = self.userDataService.getUserData().Login;
            let opponentData;
            for (let i = 0; i < users.length; i++) {
                if (users[i].Login !== userDataLogin) {
                    opponentData = users[i];
                }
            }
            self.gameDataService.setGameData(data.game);
            self.userDataService.setOpponentData(opponentData);
            self.router.navigate(['/game']);
        });
        this.socket.on('decline turn', function () {
            alert('It isn`t your turn now!');
        });
        this.socket.on('turned', function (data) {
            self.gameDataService.setGameData(data.game);
        });
        this.socket.on('declined', function () {
            alert('User declined the game!');
            self.roomName = null;
            self.socket.emit('declineServer');
        });
        this.socket.on('sendRoom', function (data) {
            self.roomName = data.room;
            self.socket.emit('createRoom', {room: self.roomName, user: self.userDataService.getUserData()});
        });
        this.socket.on('draw', function () {
            self.router.navigate(['/']);
            self.roomName = null;
            alert('It`s a draw!');
        });
        this.socket.on('won', function () {
            self.router.navigate(['/']);
            self.roomName = null;
            alert('You won!');
        });
        this.socket.on('lost', function () {
            self.router.navigate(['/']);
            self.roomName = null;
            alert('You lost!');
        });
        this.socket.on('opponent disconnected', function () {
            self.router.navigate(['/']);
            self.roomName = null;
            alert('Opponent disconnected!');
        });
    }

    public sendMessage(message: string): void {
        let userData = this.userDataService.getUserData();

        if (userData && this.socket) {
            this.socket.emit('send message', {text: message, author: userData.Login});
        }
    }

    public joinPlayer(login: string): void {
        let self = this;
        this.socket.emit('getRoom', {requestLogin: login, user: self.userDataService.getUserData()});
    }

    public makeTurn(data: {row: number, col: number}) {
        this.socket.emit('turn', data);
    }

    public disconnect(): void {
        this.socket.emit('log out');
        this.userDataService.removeUserData();
        this.serverConnectionService.eraseToken();
        this.usersChanged.next('erase');
        this.messagesChanged.next('erase');
    }

    public leaveGame() {
        this.socket.emit('leave game');
        this.roomName = null;
        this.router.navigate(['/']);
    }
}