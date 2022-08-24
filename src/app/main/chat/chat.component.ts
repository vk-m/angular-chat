import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {Subscription } from 'rxjs';
import { IChat } from 'src/app/_core/interfaces/chat.interface';
import { ChatService } from 'src/app/_core/services/chat.service';
import { NotificationService } from 'src/app/_core/services/notification.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  subscription: Subscription = new Subscription();
  chat!: IChat;
  id = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private chatService: ChatService,
    private notificationService: NotificationService
  ) { }

  form = new FormGroup({
    message: new FormControl<string>('')
  })

  ngOnInit(): void {
    this.subscription.add(
      this.route.params.subscribe(params => {
        this.id = params['id'];
        this.subscription.add(
          this.chatService.chatsSubject.subscribe((data: any) => {
            this.chat = data.filter((chat: IChat) => chat.id == this.id)[0];
            if(!this.chat) this.router.navigate(['/']);
          })
        )
      })
    )
  }

  sendMessage() {
    let message = this.form.value.message;
    if(message != undefined && message != '') {
      this.chatService.addMessage(this.id, message, true);
    }
    this.form.setValue({ message: '' })
    let id = this.id;
    this.chatService.responseChuck().subscribe((response) => {
      setTimeout(() => {
        this.chatService.addMessage(id, response.value, false)
        this.notificationService.showSuccess(response.value, `New message from ${this.chatService.getChat(id).user.username}`)
      }, 10000)
    })
  }
}
