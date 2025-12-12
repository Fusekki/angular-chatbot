import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { GoogleGenAI } from '@google/genai';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  model: any;
  genAI: any;

  GEMINI_API_KEY: string = '';

  constructor() {
    this.GEMINI_API_KEY = environment.GEMINI_API_KEY;
    this.genAI = new GoogleGenAI({apiKey: this.GEMINI_API_KEY});
  }

  async sendMessage (prompt: string) {
    const response = await this.genAI.models.generateContent({ model: 'gemini-2.5-flash', contents: prompt });
    return response.candidates[0].content.parts[0].text;
  }

}
