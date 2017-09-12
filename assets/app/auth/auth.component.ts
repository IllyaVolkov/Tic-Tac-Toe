import {Component} from "@angular/core";
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})

export class AuthComponent {
    public isLoginPage;

    public constructor(private router: Router, private route: ActivatedRoute) {
        this.isLoginPage = this.router.isActive('/auth/login', true);
    }

    public handleLoginPress(event: MouseEvent) {
        if (this.isLoginPage) {
            return;
        }
        this.isLoginPage = !this.isLoginPage;
        this.router.navigate(['/auth/login']).catch(val => console.log("Error: " + val));;
    }

    public handleRegistrationPress(event: MouseEvent) {
        if (!this.isLoginPage) {
            return;
        }
        this.isLoginPage = !this.isLoginPage;
        this.router.navigate(['/auth/registration']).catch(val => console.log("Error: " + val));;
    }
}