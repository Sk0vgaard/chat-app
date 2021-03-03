import { ChatMessage } from '../models/chat-message.model';
import { ChatClient } from '../models/chat-client.model';

export const IChatServiceProvider = 'IChatServiceProvider';

export interface IChatService {

    addMessage(message: string, clientId: string): ChatMessage;

    addClient(clientId: string, nickname: string): ChatClient;

    getClients(): ChatClient[];

    getMessages(): ChatMessage[];

    updateTyping(typing: boolean, clientId: string);

    deleteClient(clientId: string): void;
}

