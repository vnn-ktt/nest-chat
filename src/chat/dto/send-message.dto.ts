import { Field, ID, InputType } from '@nestjs/graphql';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

import { MAX_MESSAGE_BODY_LENGTH } from '../const/index.js';

@InputType()
export class SendMessageDto {
  @Field(() => ID)
  @IsUUID()
  documentId!: string;

  @Field(() => ID)
  @IsOptional()
  @IsUUID()
  recipientId?: string;

  @Field()
  @IsOptional()
  @IsBoolean()
  important?: boolean;

  @Field()
  @IsNotEmpty()
  @IsString()
  @MaxLength(MAX_MESSAGE_BODY_LENGTH)
  body!: string;
}
