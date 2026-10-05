import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

import { MAX_MESSAGE_BODY_LENGTH } from '../const/index.js';

export class EditMessageDto {
  @IsUUID()
  messageId!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(MAX_MESSAGE_BODY_LENGTH)
  body!: string;

  @IsOptional()
  @IsBoolean()
  important?: boolean;
}
