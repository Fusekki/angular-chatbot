import { Component } from '@angular/core';
import { MaterialModule, } from '../material/material.module';
import { FormsModule } from '@angular/forms';
import { Blurp, BlurpSenderType } from '../models/message.model';
import { MessageService } from '../message.service';
import { timer } from 'rxjs';
@Component({
  selector: 'app-chatinput',
  imports: [MaterialModule, FormsModule],
  templateUrl: './chatinput.component.html',
  styleUrl: './chatinput.component.scss',
  standalone: true
})
export class ChatinputComponent {

  constructor(private messageService: MessageService) {
    this.messageService.subject$.subscribe();
  }

  onKeyDown(e: any) {
    if (e.key === 'Enter' && e.target.value) {
      e.preventDefault();
      const blupsLength = this.messageService.blurps.length;
      const newBlurp: Blurp = {
          id: blupsLength + 1,
          source: BlurpSenderType.User,
          message: e.target.value
      }
      console.log(newBlurp)
      this.messageService.subject$.next(newBlurp);
      console.log(this.messageService.blurps.length)
      console.log(this.messageService.blurps)
      e.target.value = '';
      timer(0).subscribe(t => e.target.scrollTop = e.target.scrollHeight);
    }
  }
}
