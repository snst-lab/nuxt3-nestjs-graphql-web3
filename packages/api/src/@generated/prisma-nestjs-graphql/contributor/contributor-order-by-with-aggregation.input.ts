import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { HideField } from '@nestjs/graphql';
import { ContributorCountOrderByAggregateInput } from './contributor-count-order-by-aggregate.input';
import { ContributorAvgOrderByAggregateInput } from './contributor-avg-order-by-aggregate.input';
import { ContributorMaxOrderByAggregateInput } from './contributor-max-order-by-aggregate.input';
import { ContributorMinOrderByAggregateInput } from './contributor-min-order-by-aggregate.input';
import { ContributorSumOrderByAggregateInput } from './contributor-sum-order-by-aggregate.input';

@InputType()
export class ContributorOrderByWithAggregationInput {

    @Field(() => SortOrder, {nullable:true})
    contributor_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    contributor_code?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    name?: keyof typeof SortOrder;

    @HideField()
    created_at?: keyof typeof SortOrder;

    @HideField()
    updated_at?: keyof typeof SortOrder;

    @Field(() => ContributorCountOrderByAggregateInput, {nullable:true})
    _count?: ContributorCountOrderByAggregateInput;

    @Field(() => ContributorAvgOrderByAggregateInput, {nullable:true})
    _avg?: ContributorAvgOrderByAggregateInput;

    @Field(() => ContributorMaxOrderByAggregateInput, {nullable:true})
    _max?: ContributorMaxOrderByAggregateInput;

    @Field(() => ContributorMinOrderByAggregateInput, {nullable:true})
    _min?: ContributorMinOrderByAggregateInput;

    @Field(() => ContributorSumOrderByAggregateInput, {nullable:true})
    _sum?: ContributorSumOrderByAggregateInput;
}
