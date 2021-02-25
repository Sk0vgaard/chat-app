import {
    MessageBody,
    OnGatewayConnection,
    OnGatewayDisconnect,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer
} from '@nestjs/websockets';
import {Socket} from 'socket.io';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {

    allMessages: string[] = [];

    @WebSocketServer() server;
    @SubscribeMessage('message')
    handleChatEvent(@MessageBody() message: string): string {
        console.log(message);
        this.allMessages.push(message)
        this.server.emit('newMessage', message);
        return message + ' Hello';
    }

    public handleConnection(client: Socket, ...args: any[]): any {
        client.emit('allMessages', this.allMessages);
        console.log('Client connected: ', client.id);
    }

    public handleDisconnect(client: any): any {
        console.log('Client disconnected: ', client.id);
    }
}
