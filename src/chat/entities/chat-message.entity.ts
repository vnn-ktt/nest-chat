import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { ChatRoom } from './chat-room.entity.js'

@ ObjectType()
@Entity('chat_messages')
export class ChatMessage {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string
  
  @Field()
  @Column()
  text: string

  @Field(() => ID)
  @Column('uuid')
  userId: string

  @Field(() => ID)
  @Column('uuid')
  roomId: string

  @Field(() => ChatRoom)
  @ManyToOne(() => ChatRoom, (room) => room.messages, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'roomId' })
  room: ChatRoom

  @Field()
  @CreateDateColumn()
  createdAt: Date
  
}