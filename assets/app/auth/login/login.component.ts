import {Component} from "@angular/core";
import {NgForm} from "@angular/forms";
import {SocketService} from "../../socket.service";
import {ServerConnectionService} from "../../serverConnection.service";
import {Router} from "@angular/router";
import {UserDataService} from "../../userData.service";

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent {

    public constructor(private socketService: SocketService,
                       private serverConnectionService: ServerConnectionService,
                       private router: Router,
                       private userDataService: UserDataService) {}

    public onSubmit(form: NgForm) {
        let credentials = {
            login: form.value.login,
            password: form.value.password
        };
        this.serverConnectionService.sendCredentials(credentials).subscribe((response) => {
            var responseData = JSON.parse(response._body);
            if (responseData.success) {
                this.serverConnectionService.setToken(responseData.token);
                this.userDataService.setUserData(responseData.userData);
                this.router.navigate(['/']).catch(val => console.log("Error: " + val));
                this.socketService.connect();
            } else {
                alert('Invalid user data!');
            }
        });
    }
}