export enum BlurpSenderType {
  Bot = 'bot',
  User = 'user'
}

export interface Blurp {
  id: number;
  source: BlurpSenderType;
  message: string;
}
