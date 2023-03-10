import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { VoterCountOrderByAggregateInput } from './voter-count-order-by-aggregate.input';
import { VoterAvgOrderByAggregateInput } from './voter-avg-order-by-aggregate.input';
import { VoterMaxOrderByAggregateInput } from './voter-max-order-by-aggregate.input';
import { VoterMinOrderByAggregateInput } from './voter-min-order-by-aggregate.input';
import { VoterSumOrderByAggregateInput } from './voter-sum-order-by-aggregate.input';

@InputType()
export class VoterOrderByWithAggregationInput {

    @Field(() => SortOrder, {nullable:true})
    id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    name?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    evm_address?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    secret?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    token_balance?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    max_voteable?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    pending_airdrop?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    pending_reconcile?: keyof typeof SortOrder;

    @Field(() => VoterCountOrderByAggregateInput, {nullable:true})
    _count?: VoterCountOrderByAggregateInput;

    @Field(() => VoterAvgOrderByAggregateInput, {nullable:true})
    _avg?: VoterAvgOrderByAggregateInput;

    @Field(() => VoterMaxOrderByAggregateInput, {nullable:true})
    _max?: VoterMaxOrderByAggregateInput;

    @Field(() => VoterMinOrderByAggregateInput, {nullable:true})
    _min?: VoterMinOrderByAggregateInput;

    @Field(() => VoterSumOrderByAggregateInput, {nullable:true})
    _sum?: VoterSumOrderByAggregateInput;
}
