import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { MessageInterface, SenderType } from '../../models/message.model';

@Injectable({
  providedIn: 'root'
})

export class MessageService {

  getTimeOfDay = () => {
    const now = new Date();
    const hours = now.getHours();
    if (hours < 12) {
        return "morning";
    } else if (hours < 18) {
        return "afternoon";
    } else {
        return "evening";
    }
  }

  initialMessageInterfaces: MessageInterface[] = [
    // {
    //     id: 1,
    //     source: SenderType.User,
    //     message: `Hello`
    // },
    // {
    //     id: 2,
    //     source: SenderType.User,
    //     message: 'Hi I need help'
    // },
    // {
    //     id: 3,
    //     source: SenderType.Bot,
    //     message: 'Sure. What may I help you with?'
    // },
    // {
    //     id: 4,
    //     source: SenderType.User,
    //     message: 'What is 2 + 2?'
    // },
  ];

  public subject$ = new Subject<MessageInterface>();
  public MessageInterfaces: MessageInterface[] = this.initialMessageInterfaces;

  constructor() {
    this.subject$
    .subscribe({
      next: v => this.MessageInterfaces.push(v),
      error: e => console.error(e),
      complete: () => console.log('subject$ got a complete notification')
    });
  }

}
