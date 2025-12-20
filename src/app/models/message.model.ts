export enum SenderType {
  Bot = 'bot',
  User = 'user'
}

export interface MessageInterface {
  id: number;
  source: SenderType;
  message: string;
}
