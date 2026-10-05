import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { ChatService } from './chat.service.js';
import { EditMessageDto } from './dto/edit-message.dto.js';
import { JoinDocumentDto } from './dto/join-document.dto.js';
import { SendMessageDto } from './dto/send-message.dto.js';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server!: Server;

  constructor(private readonly chatService: ChatService) {}

  handleConnection(client: Socket) {
    const userId = client.handshake.auth?.userId;

    if (!userId) {
      client.disconnect(true);
      return;
    }

    client.data.userId = userId;

    console.log(`Connected: ${client.id}, user: ${userId}`);
  }

  handleDisconnect(client: Socket) {
    client.disconnect(true);
    console.log(`Disconnected: ${client.id}`);
  }

  @SubscribeMessage('document:join')
  async joinDocument(
    @ConnectedSocket()
    client: Socket,

    @MessageBody()
    dto: JoinDocumentDto,
  ) {
    const room = this.getDocumentRoom(dto.documentId);

    // TODO:
    // проверить через Service Inconsistencies,
    // что user имеет read-access к документу

    await client.join(room);

    return {
      documentId: dto.documentId,
    };
  }

  @SubscribeMessage('message:send')
  async sendMessage(
    @ConnectedSocket()
    client: Socket,

    @MessageBody()
    dto: SendMessageDto,
  ) {
    const room = this.getDocumentRoom(dto.documentId);

    if (!client.rooms.has(room)) {
      throw new WsException('Join document chat first');
    }

    const message = await this.chatService.createMessage(
      client.data.userId,
      dto,
    );

    this.server.to(room).emit('message:new', message);

    return message;
  }

  @SubscribeMessage('message:edit')
  async editMessage(
    @ConnectedSocket()
    client: Socket,

    @MessageBody()
    dto: EditMessageDto,
  ) {
    const message = await this.chatService.editMessage(client.data.userId, dto);

    const room = this.getDocumentRoom(message.documentId);

    this.server.to(room).emit('message:updated', message);

    return message;
  }

  private getDocumentRoom(documentId: string): string {
    return `document:${documentId}`;
  }
}
