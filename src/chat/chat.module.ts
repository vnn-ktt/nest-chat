import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ChatGateway } from './chat.gateway.js'
import { ChatResolver } from './chat.resolver.js'
import { ChatService } from './chat.service.js'
import { ChatMessage } from './entities/chat-message.entity.js'
import { ChatRoom } from './entities/chat-room.entity.js'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ChatRoom,
      ChatMessage,
    ]),
  ],
  providers: [
    ChatGateway,
    ChatResolver,
    ChatService,
  ],
})
export class ChatModule {}