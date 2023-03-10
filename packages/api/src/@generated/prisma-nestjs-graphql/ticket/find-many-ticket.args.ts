import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { TicketWhereInput } from './ticket-where.input';
import { Type } from 'class-transformer';
import { TicketOrderByWithRelationInput } from './ticket-order-by-with-relation.input';
import { TicketWhereUniqueInput } from './ticket-where-unique.input';
import { Int } from '@nestjs/graphql';
import { TicketScalarFieldEnum } from './ticket-scalar-field.enum';

@ArgsType()
export class FindManyTicketArgs {

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
