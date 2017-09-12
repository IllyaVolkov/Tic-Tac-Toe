import {Injectable} from "@angular/core";
import {Subject} from "rxjs/Subject";

export class UserData {
    Login: string;
    Name: string;
    Email: string;
    Rank: string;
}

@Injectable()

export class UserDataService {
    private userData: UserData;
    private opponentData: UserData;
    public userConnected = new Subject();

    public constructor() {
        this.userData = null;
    }

    public getOpponentData(): UserData {
        return this.opponentData;
    }

    public setOpponentData(data: UserData): void {
        this.opponentData = data;
    }

    public getUserData(): UserData {
        return this.userData;
    }

    public setUserData(data: UserData): void {
        this.userData = data;
        this.userConnected.next(this.userData);
    }

    public removeUserData(): void {
        this.userData = null;
        this.userConnected.next(this.userData);
    }
}