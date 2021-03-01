import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatService {
    allMessages: string[] = [];
    clients: Map<string, string> = new Map<string, string>();

    public addMessage(message: string): void {
        this.allMessages.push(message)
    }

    public addClient(clientId: string, nickname: string): void {
        this.clients.set(clientId, nickname);
    }

    public getClients(): string[] {
        return Array.from(this.clients.values())
    }

    public getMessages(): string[] {
        return this.allMessages;
    }

    public deleteClient(clientId: string): void {
        this.clients.delete(clientId);
    }
}
