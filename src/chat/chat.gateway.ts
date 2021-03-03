import {
    ConnectedSocket,
    MessageBody,
    OnGatewayConnection,
    OnGatewayDisconnect,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { ChatService } from './shared/chat.service';
import { WelcomeDto } from './shared/welcome.dto';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {

    @WebSocketServer() server;

    constructor(private chatService: ChatService) {
    }

    @SubscribeMessage('message')
    handleChatEvent(
        @MessageBody() message: string,
        @ConnectedSocket() client: Socket
    ): void {
        const chatMessage = this.chatService.addMessage(message, client.id);
        this.server.emit('newMessage', chatMessage);
    }

    @SubscribeMessage('nickname')
    handleNicknameEvent(
        @MessageBody() nickname: string,
        @ConnectedSocket() client: Socket
    ): void {
        try {
            const chatClient = this.chatService.addClient(client.id, nickname);
            const welcome: WelcomeDto = {
                clients: this.chatService.getClients(),
                messages: this.chatService.getMessages(),
                client: chatClient,
            };
            client.emit('welcome', welcome);
            this.server.emit('clients', this.chatService.getClients());
        } catch (e) {
            client.error(e.message);
        }
    }

    public handleConnection(client: Socket, ...args: any[]): any {
        client.emit('allMessages', this.chatService.getMessages());
        this.server.emit('clients', this.chatService.getClients());
    }

    public handleDisconnect(client: Socket): any {
        this.chatService.deleteClient(client.id);
        this.server.emit('clients', this.chatService.getClients());
    }
}
