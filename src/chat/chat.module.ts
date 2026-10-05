import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ChatGateway } from './chat.gateway.js';
import { ChatResolver } from './chat.resolver.js';
import { ChatService } from './chat.service.js';
import { ChatMessage } from './entities/chat-message.entity.js';

/*
 * TODO:
 *   несохранённый документ
 *   → documentId отсутствует
 *   → чата нет
 *
 *   сохранённый документ
 *   → documentId существует
 *
 *   нет READ
 *   → document:join запрещён
 *
 *   есть READ
 *   → подключаем к Socket.IO room
 *   → чат доступен
 * */

@Module({
  imports: [TypeOrmModule.forFeature([ChatMessage])],
  providers: [ChatGateway, ChatResolver, ChatService],
  exports: [ChatService],
})
export class ChatModule {}
