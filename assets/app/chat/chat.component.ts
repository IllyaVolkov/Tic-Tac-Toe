import {AfterViewInit, Component, DoCheck, ElementRef, Input, ViewChild} from "@angular/core";
import {SocketService} from "../socket.service";

@Component({
    selector: 'chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.css']
})

export class ChatComponent implements AfterViewInit, DoCheck{
    @Input() data: {author: string, text: string}[];
    @ViewChild('messages') messages: ElementRef;

    public constructor(private chatservice: SocketService) {}

    public ngAfterViewInit() {
        if (this.messages) {
            this.messages.nativeElement.scrollTop = this.messages.nativeElement.scrollHeight;
        }
    }

    public ngDoCheck() {
        if (this.messages) {
            this.messages.nativeElement.scrollTop = this.messages.nativeElement.scrollHeight;
        }
    }

    public sendMessage(message: string, event: Event): void {
        event.preventDefault();
        if (message) {
            this.chatservice.sendMessage(message);
        }
    }
}