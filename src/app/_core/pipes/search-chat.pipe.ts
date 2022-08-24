import { Pipe, PipeTransform } from '@angular/core';
import { IChat } from '../interfaces/chat.interface';

@Pipe({
  name: 'searchChat'
})
export class SearchChatPipe implements PipeTransform {

  transform(chats: IChat[], search: string): IChat[] {
    return chats.filter(chat => chat.user.username.toLowerCase().includes(search.toLowerCase()))
  }
}
