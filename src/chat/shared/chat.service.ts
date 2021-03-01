import { Injectable } from '@nestjs/common';
import { ChatClient } from './chat-client.model';
import { ChatMessage } from './chat-message.model';

@Injectable()
export class ChatService {
    allMessages: ChatMessage[] = [];
    clients: ChatClient[] = [];

    public addMessage(message: string, clientId: string): ChatMessage {
        const client = this.clients.find((client) => client.id === clientId);
        const chatMessage: ChatMessage = { message: message, sender: client };
        this.allMessages.push(chatMessage);
        return chatMessage;
    }

    public addClient(clientId: string, nickname: string): void {
        this.clients.push({
            id: clientId,
            nickname: nickname
        });
    }

    public getClients(): ChatClient[] {
        return this.clients;
    }

    public getMessages(): ChatMessage[] {
        return this.allMessages;
    }

    public deleteClient(clientId: string): void {
        this.clients = this.clients.filter((client) => client.id !== clientId);
    }
}
