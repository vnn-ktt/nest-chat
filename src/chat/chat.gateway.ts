import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'

import { SendMessageDto } from './dto/send-message.dto.js'
import { ChatService } from './chat.service.js'

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server

  constructor(private readonly chatService: ChatService) {}

  handleConnection(client: Socket) {
    console.log(`Connected: ${client.id}`)
  }

  handleDisconnect(client: Socket) {
    console.log(`Disconnected: ${client.id}`)
  }

  @SubscribeMessage('room:join')
  async joinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() roomId: string,
  ) {
    await client.join(roomId)
  }

  @SubscribeMessage('message:send')
  async sendMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() dto: SendMessageDto,
  ) {
    // TODO: JWT Authentication
    const userId = client.handshake.auth.userId as string

    const message = await this.chatService.createMessage(
      userId,
      dto,
    )

    this.server
      .to(dto.roomId)
      .emit('message:new', message)

    return message
  }
}