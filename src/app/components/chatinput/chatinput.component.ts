import { Component, OnInit } from '@angular/core';
import { MaterialModule, } from '../../material/material.module';
import { FormsModule } from '@angular/forms';
import { MessageInterface, SenderType } from '../../models/message.model';
import { MessageService } from '../../services/message/message.service';
import { timer } from 'rxjs';
import { ApiService } from '../../services/apiservice/apiservice.service';

@Component({
  selector: 'app-chatinput',
  imports: [MaterialModule, FormsModule],
  templateUrl: './chatinput.component.html',
  styleUrl: './chatinput.component.scss',
  standalone: true
})
export class ChatinputComponent implements OnInit {

  MessageInterfaces: MessageInterface[] = [];

  constructor(private messageService: MessageService, private apiService: ApiService) {
    this.messageService.subject$.subscribe();
    this.MessageInterfaces = this.messageService.MessageInterfaces;
    const messagesLength = this.messageService.MessageInterfaces.length;
  }

  ngOnInit() {
    if (this.messageService.MessageInterfaces.length === 0) {
      this.sendInitialMessage();
    }
  }

  async sendInitialMessage() {
    const initialMessage: MessageInterface = {
        id: 1,
        source: SenderType.User,
        message: 'Hello'
    }
    this.messageService.subject$.next(initialMessage);
    await this.sendMessage(initialMessage.message);
  }

  async onKeyDown(e: any) {
    if (e.key === 'Enter' && e.target.value) {
      e.preventDefault();
      const messagesLength = this.messageService.MessageInterfaces.length;
      const newMessageInterface: MessageInterface = {
          id: messagesLength + 1,
          source: SenderType.User,
          message: e.target.value
      }
      this.messageService.subject$.next(newMessageInterface);
      e.target.value = '';
      await this.sendMessage(newMessageInterface.message).then(() =>
        timer(0).subscribe(t => e.target.scrollTop = e.target.scrollHeight)
      );
    }
  }


  SenderType = SenderType;

  async sendMessage(prompt: string) {
    await this.apiService.sendMessage(prompt).then(res => {
      const newMessageInterface: MessageInterface = {
        id: this.MessageInterfaces.length + 1,
        source: SenderType.Bot,
        message: res
      };
      this.messageService.subject$.next(newMessageInterface)
    });
  }
}
