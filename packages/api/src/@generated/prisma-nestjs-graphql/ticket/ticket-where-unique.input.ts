import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@InputType()
export class TicketWhereUniqueInput {

    @Field(() => Int, {nullable:true})
    ticket_id?: number;
}
