import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { EditMessageDto } from './dto/edit-message.dto.js';
import { SendMessageDto } from './dto/send-message.dto.js';
import { ChatMessage } from './entities/chat-message.entity.js';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(ChatMessage)
    private readonly messageRepository: Repository<ChatMessage>,
  ) {}

  getMessages(documentId: string): Promise<ChatMessage[]> {
    return this.messageRepository.find({
      where: {
        documentId,
      },
      order: {
        createdAt: 'ASC',
      },
    });
  }

  async createMessage(
    authorId: string,
    dto: SendMessageDto,
  ): Promise<ChatMessage> {
    const message = this.messageRepository.create({
      documentId: dto.documentId,
      authorId,
      recipientId: dto.recipientId ?? null,
      body: dto.body,
      important: dto.important ?? false,
      edited: false,
    });

    return this.messageRepository.save(message);
  }

  async editMessage(
    authorId: string,
    dto: EditMessageDto,
  ): Promise<ChatMessage> {
    const message = await this.messageRepository.findOneBy({
      id: dto.messageId,
    });

    if (!message) {
      throw new NotFoundException(`Message ${dto.messageId} not found`);
    }

    if (message.authorId !== authorId) {
      throw new ForbiddenException('You cannot edit this message');
    }

    message.body = dto.body;
    message.edited = true;

    if (dto.important !== undefined) {
      message.important = dto.important;
    }

    return this.messageRepository.save(message);
  }
}
