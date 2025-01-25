import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Blurp, BlurpSenderType } from './models/message.model';

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

  initialBlurps: Blurp[] = [
    // {
    //     id: 1,
    //     source: BlurpSenderType.Bot,
    //     message: `Good ${this.getTimeOfDay()}! May I help you?`
    // },
    // {
    //     id: 2,
    //     source: BlurpSenderType.User,
    //     message: 'Hi I need help'
    // },
    // {
    //     id: 3,
    //     source: BlurpSenderType.Bot,
    //     message: 'Sure. What may I help you with?'
    // },
    // {
    //     id: 4,
    //     source: BlurpSenderType.User,
    //     message: 'What is 2 + 2?'
    // },
  ];

  public subject$ = new Subject<Blurp>();
  public blurps: Blurp[] = this.initialBlurps;

  constructor() {
    this.subject$
    .subscribe({
      next: v => this.blurps.push(v),
      error: e => console.error(e),
      complete: () => console.log('subject$ got a complete notification')
    });
  }

}
