import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { HideField } from '@nestjs/graphql';
import { SprintCountOrderByAggregateInput } from './sprint-count-order-by-aggregate.input';
import { SprintAvgOrderByAggregateInput } from './sprint-avg-order-by-aggregate.input';
import { SprintMaxOrderByAggregateInput } from './sprint-max-order-by-aggregate.input';
import { SprintMinOrderByAggregateInput } from './sprint-min-order-by-aggregate.input';
import { SprintSumOrderByAggregateInput } from './sprint-sum-order-by-aggregate.input';

@InputType()
export class SprintOrderByWithAggregationInput {

    @Field(() => SortOrder, {nullable:true})
    sprint_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    sprint_code?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    sprint_name?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    start_date?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    end_date?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    service_id?: keyof typeof SortOrder;

    @HideField()
    created_at?: keyof typeof SortOrder;

    @HideField()
    updated_at?: keyof typeof SortOrder;

    @Field(() => SprintCountOrderByAggregateInput, {nullable:true})
    _count?: SprintCountOrderByAggregateInput;

    @Field(() => SprintAvgOrderByAggregateInput, {nullable:true})
    _avg?: SprintAvgOrderByAggregateInput;

    @Field(() => SprintMaxOrderByAggregateInput, {nullable:true})
    _max?: SprintMaxOrderByAggregateInput;

    @Field(() => SprintMinOrderByAggregateInput, {nullable:true})
    _min?: SprintMinOrderByAggregateInput;

    @Field(() => SprintSumOrderByAggregateInput, {nullable:true})
    _sum?: SprintSumOrderByAggregateInput;
}
