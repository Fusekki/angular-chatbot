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

  constructor(private messageService: MessageService) {
    // this.messageService.subject$.subscribe(); // in case we need to update the blurps with an API call to bot.
    this.blurps = this.messageService.blurps;

    this.messageService.subject$
    .subscribe({
      next: v => {
        // this.blurps.push(v)
        timer(0).subscribe(t => {
          console.log('here')
          console.log(this.messageBox.nativeElement.scrollTop )
          this.messageBox.nativeElement.scrollTop = this.messageBox.nativeElement.scrollHeight
          console.log(this.messageBox.nativeElement.scrollTop )
          console.log(this.messageBox)
        })
      },
      error: e => console.error(e),
      complete: () => console.log('subject$ got a complete notification')
    });
  }

}
