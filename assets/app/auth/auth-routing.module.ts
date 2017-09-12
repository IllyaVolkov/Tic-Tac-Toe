import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";

import {AuthComponent} from "./auth.component";
import {RegistrationComponent} from "./registration/registration.component";
import {LoginComponent} from "./login/login.component";

@NgModule({
    imports:[
        RouterModule.forChild([
                {path: '', component: AuthComponent, children: [
                    {path: 'login', component: LoginComponent},
                    {path: 'registration', component: RegistrationComponent},
                    {path: '**', pathMatch: 'prefix', redirectTo: 'login'}
                ]}
            ]
        )
    ],
    exports:[RouterModule]
})

export class AuthRoutingModule {}