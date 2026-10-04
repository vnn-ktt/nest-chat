import { Args, ID, Query, Resolver } from '@nestjs/graphql'

import { ChatService } from './chat.service.js'
import { ChatMessage } from './entities/chat-message.entity.js'

@Resolver(() => ChatMessage)
export class ChatResolver {
  constructor(private readonly chatService: ChatService) {}

  @Query(() => [ChatMessage])
  messages(
    @Args('roomId', { type: () => ID })
    roomId: string,
  ) {
    return this.chatService.getRoomMessages(roomId)
  }
}