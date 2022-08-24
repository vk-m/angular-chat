import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IChat } from '../interfaces/chat.interface';
import { StorageService } from './storage.service';
import { RequestService } from './request.service';
import { tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class ChatService {
    chatsSubject: BehaviorSubject<IChat[]> = new BehaviorSubject<IChat[]>(
        this.storageService.getItem('chat')
    )

    constructor(
        private storageService: StorageService,
        private requestService: RequestService 
    ) {}

    generateChats(): IChat[] {
        if(this.storageService.getItem('chat') != null) {
            return this.storageService.getItem('chat')
        }
        const users = [
            'Steve',
            'Liam',
            'Olivia',
            'Emma',
            'Oliver',
            'Elijah',
            'Amelia',
            'William',
            'Henry',
            'Harper'
        ]
        const randomMessage = [
            'Lorem ipsum dolor sit amet', 
            'lorem ipsum dolor sit amet allowed', 
            'Lorem ipsum dolor sit amet not consectetur', 
            'Lorem ipsum dolor sit amet not',
            'lorem ipsum dolor sit amet',
            'Lorem ipsum dolor sit amet not consectetur with sed diam nonum vul', 
            'lorem  ipsum dolor sit amet not consectetur with sed diam nonum vul sed diam nonum',
            'Lorem ipsum dolor sit amet not consectetur with sed diam nonum vul sed diam nonum sed diam nonum',
            'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo',
            'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
            'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore.'
        ]
        const avatars = [
            'https://mir-s3-cdn-cf.behance.net/project_modules/disp/ce54bf11889067.562541ef7cde4.png',
            'https://mir-s3-cdn-cf.behance.net/project_modules/disp/414d9011889067.5625411b2afd2.png',
            'https://mir-s3-cdn-cf.behance.net/project_modules/disp/b5fb9d11889067.562541ac57a79.png',
            'https://mir-s3-cdn-cf.behance.net/project_modules/disp/a9475211889067.562541caf0859.png',
            'https://mir-s3-cdn-cf.behance.net/project_modules/disp/39c17711889067.562541cc490c7.png',
        ]
        let data = [];
        let time = Number(new Date(new Date().setHours(new Date().getHours() - 6)))
        for(let i = 0; i < users.length; i++) {
            let messages = [];
            let lastMessage = '';
            for(let j = 0; j < Math.floor(10 + Math.random() * (21 + 1 - 3)); j++) {
                time += Math.floor(10000 + Math.random() * (200000 + 1 - 10000));
                lastMessage = randomMessage[Math.floor(0 + Math.random() * (10 + 1 - 0))]
                messages.push({
                    value: lastMessage,
                    timestamp: time,
                    my: Math.floor(0 + Math.random() * (1 + 1 - 0)) == 0 ? false : true
                })
            }
            data.push({
                id: i,
                user: {
                    username: users[i],
                    avatarUrl: avatars[Math.floor(0 + Math.random() * (4 + 1 - 0))]
                },
                messages: messages,
                lastMessage: lastMessage,
                lastTimestamp: time
            })
        }
        this.storageService.setLocalItem('chat', data.sort((a:any, b:any) => b.lastTimestamp - a.lastTimestamp))
        return data
    }

    getChat(id: number): IChat {
        return this.chatsSubject.getValue().filter((chat: IChat) => chat.id == id)[0];
    }

    addMessage(id: number, message: string, my: boolean): void {
        let chat = this.chatsSubject.getValue().find((chat) => chat.id == id);
        let timestamp = Date.now();
        chat!.messages.push({
            value: message,
            timestamp: timestamp,
            my: my
        })
        chat!.lastMessage = message;
        chat!.lastTimestamp = timestamp;
        this.updateChats()
    }
    
    updateChats() {
        this.storageService.setLocalItem('chat', this.chatsSubject.getValue().sort((a:any, b:any) => b.lastTimestamp - a.lastTimestamp));
        this.chatsSubject.next(this.storageService.getItem('chat'))
    }

    responseChuck(): Observable<any> {
        return this.requestService.get('https://api.chucknorris.io/jokes/random')
    }

    public get chatsList(): IChat[] {
        if(this.chatsSubject.getValue() == null) {
            this.chatsSubject.next(this.generateChats())
        }
        return this.chatsSubject.getValue()
    }
}