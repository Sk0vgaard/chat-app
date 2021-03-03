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

    public addClient(clientId: string, nickname: string): ChatClient {
        let chatClient = this.clients.find((client) => client.nickname === nickname && client.id === clientId);
        if (chatClient) {
            return chatClient;
        }
        if (this.clients.find((client) => client.nickname === nickname)) {
            throw new Error('Nickname already used');
        }
        chatClient = { id: clientId, nickname: nickname };
        this.clients.push(chatClient);
        return chatClient;
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

    public updateTyping(typing: boolean, clientId: string) {
        const chatClient = this.clients.find((client) => client.id === clientId);
        if (chatClient && chatClient.typing !== typing) {
            chatClient.typing = typing;
            return chatClient;
        }
    }
}
