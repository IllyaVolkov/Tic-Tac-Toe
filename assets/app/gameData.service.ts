import {Injectable} from "@angular/core";
import {Subject} from "rxjs/Subject";

@Injectable()

export class GameDataService {
    public gameDataSubject: Subject<any[]>;

    private gameData: any[];

    public constructor() {
        this.gameData = [];
        this.gameDataSubject = new Subject<any[]>();
    }

    public setGameData(gameData: any[]): void {
        this.gameData = gameData;
        this.gameDataSubject.next(this.gameData);
    }

    public getGameData(): any[] {
        return this.gameData;
    }
}