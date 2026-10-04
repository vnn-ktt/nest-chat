import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SendMessageDto } from './dto/send-message.dto.js';
import { ChatMessage } from './entities/chat-message.entity.js';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(ChatMessage)
    private readonly messageRepository: Repository<ChatMessage>
  ) {}
  
  async createMessage(userId: string, sendMessageDto: SendMessageDto): Promise<ChatMessage> {
    const message = this.messageRepository.create({
      userId,
      roomId: sendMessageDto.roomId,
      text: sendMessageDto.text
    })  
    return this.messageRepository.save(message);
  }

  getRoomMessages(roomId: string): Promise<ChatMessage[]> {
    return this.messageRepository.find({
      where: { roomId },
      order: { createdAt: 'ASC' }
    })
  }
}