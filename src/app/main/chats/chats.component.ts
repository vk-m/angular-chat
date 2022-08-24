import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChatService } from 'src/app/_core/services/chat.service';
import { IChat } from './../../_core/interfaces/chat.interface';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss']
})
export class ChatsComponent implements OnInit {
  subscription: Subscription = new Subscription();
  search = '';
  chats!: IChat[];
  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.subscription.add(
      this.chatService.chatsSubject.subscribe((data: any) => {
        this.chats = data;
        if(data == null) this.chats = this.chatService.chatsList
      })
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
