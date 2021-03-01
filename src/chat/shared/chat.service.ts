import {Injectable} from '@nestjs/common';
import {ChatClient} from './chat-client.model';

@Injectable()
export class ChatService {
    allMessages: string[] = [];
    clients: ChatClient[] = [];

    public addMessage(message: string): void {
        this.allMessages.push(message);
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

    public getMessages(): string[] {
        return this.allMessages;
    }

    public deleteClient(clientId: string): void {
        this.clients = this.clients.filter((client) => client.id !== clientId);
    }
}
