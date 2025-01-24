import { Component } from '@angular/core';
import { Blurp, BlurpSenderType } from '../models/message.model';
import { CommonModule } from '@angular/common';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-chatfeed',
  imports: [CommonModule],
  templateUrl: './chatfeed.component.html',
  styleUrl: './chatfeed.component.scss'
})
export class ChatfeedComponent {
  blurps: Blurp[] = []

  constructor(private messageService: MessageService) {
    this.messageService.subject$.subscribe(); // in case we need to update the blurps with an API call to bot.
    this.blurps = this.messageService.blurps;
  }

  BlurpSenderType = BlurpSenderType;
}
