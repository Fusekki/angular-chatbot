import { Component, ElementRef, ViewChild } from '@angular/core';
import { MessageInterface, SenderType } from '../../models/message.model';
import { CommonModule } from '@angular/common';
import { MessageService } from '../../services/message/message.service';
import { timer } from 'rxjs';

@Component({
  selector: 'app-chatfeed',
  imports: [CommonModule],
  templateUrl: './chatfeed.component.html',
  styleUrl: './chatfeed.component.scss',
  standalone: true
})
export class ChatfeedComponent {
  @ViewChild('messageBox') messageBox!: ElementRef;
  SenderType = SenderType;
  MessageInterfaces: MessageInterface[] = []
  typingAnimation = true;

  constructor(private messageService: MessageService) {
    this.typingAnimation = false;
    this.MessageInterfaces = this.messageService.MessageInterfaces;
    this.messageService.subject$
    .subscribe({
      next: v => {
        this.messageBox.nativeElement.scrollTop = this.messageBox.nativeElement.scrollHeight
      },
      error: e => console.error(e),
      complete: () => console.log('subject$ got a complete notification')
    });
  }

}
