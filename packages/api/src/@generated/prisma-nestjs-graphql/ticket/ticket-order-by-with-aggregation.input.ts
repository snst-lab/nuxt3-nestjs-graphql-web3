import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { HideField } from '@nestjs/graphql';
import { TicketCountOrderByAggregateInput } from './ticket-count-order-by-aggregate.input';
import { TicketAvgOrderByAggregateInput } from './ticket-avg-order-by-aggregate.input';
import { TicketMaxOrderByAggregateInput } from './ticket-max-order-by-aggregate.input';
import { TicketMinOrderByAggregateInput } from './ticket-min-order-by-aggregate.input';
import { TicketSumOrderByAggregateInput } from './ticket-sum-order-by-aggregate.input';

@InputType()
export class TicketOrderByWithAggregationInput {

    @Field(() => SortOrder, {nullable:true})
    ticket_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    ticket_code?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    project_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    name?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    type?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    contributor_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    sprint_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    status?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    start_date?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    end_date?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    complete_date?: keyof typeof SortOrder;

    @HideField()
    created_at?: keyof typeof SortOrder;

    @HideField()
    updated_at?: keyof typeof SortOrder;

    @Field(() => TicketCountOrderByAggregateInput, {nullable:true})
    _count?: TicketCountOrderByAggregateInput;

    @Field(() => TicketAvgOrderByAggregateInput, {nullable:true})
    _avg?: TicketAvgOrderByAggregateInput;

    @Field(() => TicketMaxOrderByAggregateInput, {nullable:true})
    _max?: TicketMaxOrderByAggregateInput;

    @Field(() => TicketMinOrderByAggregateInput, {nullable:true})
    _min?: TicketMinOrderByAggregateInput;

    @Field(() => TicketSumOrderByAggregateInput, {nullable:true})
    _sum?: TicketSumOrderByAggregateInput;
}
