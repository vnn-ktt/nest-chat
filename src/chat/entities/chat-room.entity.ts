import { Field, ID, ObjectType } from '@nestjs/graphql'
import { 
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'

import { ChatMessage } from './chat-message.entity.js'

@ObjectType()
@Entity('chat_rooms')
export class ChatRoom {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field()
  @Column()
  name: string
  
  @Field(() => [ChatMessage])
  @OneToMany(() => ChatMessage, (message) => message.room)
  messages: ChatMessage[]

  @Field()
  @CreateDateColumn()
  createdAt: Date
}