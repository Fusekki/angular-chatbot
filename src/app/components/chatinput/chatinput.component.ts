import { Component } from '@angular/core';
import { MaterialModule, } from '../../material/material.module';
import { FormsModule } from '@angular/forms';
import { Blurp, BlurpSenderType } from '../../models/message.model';
import { MessageService } from '../../message.service';
import { timer } from 'rxjs';
import { ApiService } from '../../services/apiservice/apiservice.service';

@Component({
  selector: 'app-chatinput',
  imports: [MaterialModule, FormsModule],
  templateUrl: './chatinput.component.html',
  styleUrl: './chatinput.component.scss',
  standalone: true
})
export class ChatinputComponent {

  blurps: Blurp[] = [];

  constructor(private messageService: MessageService, private apiService: ApiService) {
    this.messageService.subject$.subscribe();
    this.blurps = this.messageService.blurps;
  }

  async onKeyDown(e: any) {
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
      e.target.value = '';
      await this.sendMessage(newBlurp.message).then(() =>
        timer(0).subscribe(t => e.target.scrollTop = e.target.scrollHeight)
      );
      console.log(this.messageService.blurps.length)
      console.log(this.messageService.blurps)

    }
  }


  BlurpSenderType = BlurpSenderType;

  async sendMessage(prompt: string) {
    console.log('making api call')
    await this.apiService.sendMessage(prompt).then(res => {
      const newBlurp = {
        id: this.blurps.length + 1,
        source: BlurpSenderType.Bot,
        message: res
      };
      console.log(newBlurp)
      this.messageService.subject$.next(newBlurp)
    });
  }
}
