import { Module } from '@nestjs/common';
import { ChatGateway } from './gateways/chat.gateway';
import { IChatServiceProvider } from '../shared/ports/chat.service.interface';
import { ChatService } from '../shared/services/chat.service';

@Module({
    providers: [
        ChatGateway,
        {
            provide: IChatServiceProvider,
            useClass: ChatService
        }
    ],
})
export class ChatModule {
}
