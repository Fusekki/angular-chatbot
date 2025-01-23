import { Component } from '@angular/core';
import { Blurp, BlurpSenderType } from '../models/message.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chatfeed',
  imports: [CommonModule],
  templateUrl: './chatfeed.component.html',
  styleUrl: './chatfeed.component.scss'
})
export class ChatfeedComponent {

  BlurpSenderType = BlurpSenderType;

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
    {
        id: 1,
        source: BlurpSenderType.Bot,
        message: `Good ${this.getTimeOfDay()}! May I help you?`
    },
    {
        id: 2,
        source: BlurpSenderType.User,
        message: 'Hi I need help'
    },
    {
        id: 3,
        source: BlurpSenderType.Bot,
        message: 'Sure. What may I help you with?'
    },
    {
        id: 4,
        source: BlurpSenderType.User,
        message: 'What is 2 + 2?'
    },
];

blurps: Blurp[] = this.initialBlurps;

}
