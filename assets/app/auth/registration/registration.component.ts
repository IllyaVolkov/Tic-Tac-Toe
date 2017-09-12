import {Component} from "@angular/core";
import {NgForm} from "@angular/forms";
import {ServerConnectionService} from "../../serverConnection.service";
import {SocketService} from "../../socket.service";
import {Router} from "@angular/router";
import {UserDataService} from "../../userData.service";

@Component({
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.css']
})

export class RegistrationComponent {
    public constructor(private serverConnectionService: ServerConnectionService,
                       private socketService: SocketService,
                       private router: Router,
                       private userDataService: UserDataService) {}

    public onSubmit(form: NgForm) {
        let registerData = {
            login: form.value.login,
            password: form.value.password,
            email: form.value.email,
            name: form.value.name
        };
        let credentials = {
            login: form.value.login,
            password: form.value.password
        };
        this.serverConnectionService.registerUser(registerData).subscribe((response) => {
            var responseData = JSON.parse(response._body);
            if (responseData.success) {
                this.serverConnectionService.sendCredentials(credentials).subscribe((response) => {
                    responseData = JSON.parse(response._body);
                    if (responseData.success) {
                        this.serverConnectionService.setToken(responseData.token);
                        this.userDataService.setUserData(responseData.userData);
                        this.router.navigate(['/']).catch(val => console.log("Error: " + val));
                        this.socketService.connect();
                    }
                });
            } else {
                alert('User with such login or email already exists!');
            }
        });
    }
}