import { Component } from '@angular/core';
import { MaterialModule, } from '../material/material.module';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-chatinput',
  imports: [MaterialModule, FormsModule],
  templateUrl: './chatinput.component.html',
  styleUrl: './chatinput.component.scss'
})
export class ChatinputComponent {

}
