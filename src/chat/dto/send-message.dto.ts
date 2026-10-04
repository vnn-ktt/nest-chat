import { Field, ID, InputType } from '@nestjs/graphql'
import { IsNotEmpty, IsUUID, MaxLength } from 'class-validator'

@InputType()
export class SendMessageDto {
  @Field(() => ID)
  @IsUUID()
  roomId: string

  @Field()
  @IsNotEmpty()
  @MaxLength(2000)
  text: string
}