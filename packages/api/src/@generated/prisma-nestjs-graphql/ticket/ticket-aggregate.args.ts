import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { TicketWhereInput } from './ticket-where.input';
import { Type } from 'class-transformer';
import { TicketOrderByWithRelationInput } from './ticket-order-by-with-relation.input';
import { TicketWhereUniqueInput } from './ticket-where-unique.input';
import { Int } from '@nestjs/graphql';
import { TicketCountAggregateInput } from './ticket-count-aggregate.input';
import { TicketAvgAggregateInput } from './ticket-avg-aggregate.input';
import { TicketSumAggregateInput } from './ticket-sum-aggregate.input';
import { TicketMinAggregateInput } from './ticket-min-aggregate.input';
import { TicketMaxAggregateInput } from './ticket-max-aggregate.input';

@ArgsType()
export class TicketAggregateArgs {

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

    @Field(() => TicketCountAggregateInput, {nullable:true})
    _count?: TicketCountAggregateInput;

    @Field(() => TicketAvgAggregateInput, {nullable:true})
    _avg?: TicketAvgAggregateInput;

    @Field(() => TicketSumAggregateInput, {nullable:true})
    _sum?: TicketSumAggregateInput;

    @Field(() => TicketMinAggregateInput, {nullable:true})
    _min?: TicketMinAggregateInput;

    @Field(() => TicketMaxAggregateInput, {nullable:true})
    _max?: TicketMaxAggregateInput;
}
