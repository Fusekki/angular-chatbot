import { Injectable } from '@angular/core';
// import { environment } from '../../../environments/environment.development';
import { GoogleGenAI } from '@google/genai';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  model: any;
  genAI: any;

  constructor() {
    const GEMINI_API_KEY = import.meta.env['NG_APP_GEMINI_API_KEY'];
    this.genAI = new GoogleGenAI({apiKey: GEMINI_API_KEY});
        console.log('this.GEMINI_API_KEY:', GEMINI_API_KEY);
    console.log('this.genAI:', this.genAI);
  }

  async sendMessage (prompt: string) {
    const response = await this.genAI.models.generateContent({ model: 'gemini-2.5-flash', contents: prompt });
    return response.candidates[0].content.parts[0].text;
  }

}
