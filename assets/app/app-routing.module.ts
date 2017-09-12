import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

import {GameComponent} from "./game/game.component";

const appRoutes: Routes = [
    {path: 'game', pathMatch: 'prefix', component: GameComponent},
    {path: 'auth', pathMatch: 'prefix', loadChildren: './auth/auth.module#AuthModule'}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}