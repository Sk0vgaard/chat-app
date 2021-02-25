import {
    MessageBody,
    OnGatewayConnection,
    OnGatewayDisconnect,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer
} from '@nestjs/websockets';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server;
    @SubscribeMessage('message')
    handleChatEvent(@MessageBody() data: string): string {
        console.log(data);
        this.server.emit('messages', data);
        return data + ' Hello';
    }

    public handleConnection(client: any, ...args: any[]): any {
        console.log('Client connected: ', client.id);
    }

    public handleDisconnect(client: any): any {
        console.log('Client disconnected: ', client.id);
    }
}
