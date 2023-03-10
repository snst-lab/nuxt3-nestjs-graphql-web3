import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { TicketWhereInput } from '../ticket/ticket-where.input';
import { Type } from 'class-transformer';
import { TicketOrderByWithRelationInput } from '../ticket/ticket-order-by-with-relation.input';
import { TicketWhereUniqueInput } from '../ticket/ticket-where-unique.input';
import { Int } from '@nestjs/graphql';
import { TicketScalarFieldEnum } from '../ticket/ticket-scalar-field.enum';

@ArgsType()
export class FindFirstTicketOrThrowArgs {

    @Field(() => TicketWhereInput, {nullable:true})
    @Type(() => TicketWhereInput)
    where?: TicketWhereInput;

    @Field(() => [TicketOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<TicketOrderByWithRelationInput>;

    @Field(() => TicketWhereUniqueInput, {nullable:true})
    cursor?: TicketWhereUniqueInput;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => [TicketScalarFieldEnum], {nullable:true})
    distinct?: Array<keyof typeof TicketScalarFieldEnum>;
}
