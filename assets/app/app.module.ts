import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {HttpModule} from '@angular/http';

import {AppComponent} from "./app.component";
import {AppRoutingModule} from "./app-routing.module";
import {ServerConnectionService} from "./serverConnection.service";
import {PlayersOnlineComponent} from "./players-online/players-online.component";
import {HeaderComponent} from "./header/header.component";
import {ChatComponent} from "./chat/chat.component";
import {OrderByRank} from "./order-by-rank.pipe";
import {SocketService} from "./socket.service";
import {GameComponent} from "./game/game.component";
import {UserDataService} from "./userData.service";
import {GameDataService} from "./gameData.service";

@NgModule({
    declarations: [
        AppComponent,
        PlayersOnlineComponent,
        HeaderComponent,
        ChatComponent,
        OrderByRank,
        GameComponent
    ],
    imports: [
        BrowserModule,
        HttpModule,
        AppRoutingModule
    ],
    providers: [SocketService, ServerConnectionService, UserDataService, GameDataService],
    bootstrap: [AppComponent]
})

export class AppModule {}