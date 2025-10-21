import { Component, ElementRef, ViewChild } from '@angular/core';
import { Blurp, BlurpSenderType } from '../../models/message.model';
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
  BlurpSenderType = BlurpSenderType;
  blurps: Blurp[] = []
  typingAnimation = true;

  constructor(private messageService: MessageService) {
    // this.messageService.subject$.subscribe(); // in case we need to update the blurps with an API call to bot.
    const delay = Math.floor(Math.random() * (2000 - 1000 + 1) + 1000);
    console.log('delay: ', delay)
    timer(delay).subscribe(() => {
      this.typingAnimation = false;
      this.blurps = this.messageService.blurps;
    })
    this.messageService.subject$
    .subscribe({
      next: v => {
        this.messageService.blurps.at(-1)?.source === BlurpSenderType.User ? this.typingAnimation = true : this.typingAnimation = false;
        timer(0).subscribe(t => {
          this.messageBox.nativeElement.scrollTop = this.messageBox.nativeElement.scrollHeight
        })
      },
      error: e => console.error(e),
      complete: () => console.log('subject$ got a complete notification')
    });
  }

}
