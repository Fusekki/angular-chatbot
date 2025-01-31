import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { GoogleGenerativeAI } from "@google/generative-ai";
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  model: any;
  genAI: any;

  GEMINI_API_KEY: string = '';

  constructor() {
    this.GEMINI_API_KEY = environment.GEMINI_API_KEY;
    this.genAI = new GoogleGenerativeAI(this.GEMINI_API_KEY);
    this.model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  }

  async sendMessage (prompt: string) {
    const result = await this.model.generateContent(prompt);
    return result.response.text();
  }

}
