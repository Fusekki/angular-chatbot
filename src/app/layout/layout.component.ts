import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { ChatinputComponent } from '../chatinput/chatinput.component';
import { ChatfeedComponent } from '../chatfeed/chatfeed.component';

@Component({
  selector: 'app-layout',
  imports: [HeaderComponent, ChatfeedComponent, ChatinputComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

}
