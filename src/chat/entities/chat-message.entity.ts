import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity('chat_messages')
@Index(['documentId', 'createdAt'])
export class ChatMessage {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field(() => ID)
  @Column({
    type: 'uuid',
    name: 'document_id',
  })
  documentId!: string;

  @Field(() => ID)
  @Column({
    type: 'uuid',
    name: 'author_id',
  })
  authorId!: string;

  @Field(() => ID, {
    nullable: true,
  })
  @Column({
    type: 'uuid',
    name: 'recipient_id',
    nullable: true,
  })
  recipientId!: string | null;

  @Field()
  @Column({
    type: 'text',
  })
  body!: string;

  @Field()
  @Column({
    type: 'boolean',
    default: false,
  })
  important!: boolean;

  @Field()
  @Column({
    type: 'boolean',
    default: false,
  })
  edited!: boolean;

  @Field()
  @CreateDateColumn({
    type: 'timestamptz',
    name: 'created_at',
  })
  createdAt!: Date;

  @Field()
  @UpdateDateColumn({
    type: 'timestamptz',
    name: 'updated_at',
  })
  updatedAt!: Date;
}
