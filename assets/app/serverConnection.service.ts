import {Injectable} from "@angular/core";
import {Headers, Http} from "@angular/http"
import {Observable} from "rxjs/Observable";
import 'rxjs/Rx';

import {SocketService} from "./socket.service";

@Injectable()

export class ServerConnectionService {
    private headers: Headers;
    private authToken: string;

    constructor(private http: Http) {
        this.headers = new Headers({'Content-Type': 'application/json'});
    }

    public loadToken(): boolean {
        this.authToken = localStorage.getItem('token');
        return this.authToken !== null;
    }

    public setToken(token: string): void {
        localStorage.setItem('token', token);
        this.authToken = token;
    }

    public getToken(): string {
        return this.authToken;
    }

    public eraseToken(): void {
        localStorage.removeItem('token');
        this.authToken = null;
    }

    public sendCredentials(data: {login: string, password: string}): Observable<any> {
        return this.http.post('/login', JSON.stringify(data), {headers: this.headers});
    }

    public registerUser(data: {login: string, password: string, email: string, name: string}): Observable<any> {
        return this.http.post('/register', JSON.stringify(data), {headers: this.headers});
    }
}