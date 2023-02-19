import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { ResetCountOrderByAggregateInput } from './reset-count-order-by-aggregate.input';
import { ResetAvgOrderByAggregateInput } from './reset-avg-order-by-aggregate.input';
import { ResetMaxOrderByAggregateInput } from './reset-max-order-by-aggregate.input';
import { ResetMinOrderByAggregateInput } from './reset-min-order-by-aggregate.input';
import { ResetSumOrderByAggregateInput } from './reset-sum-order-by-aggregate.input';

@InputType()
export class ResetOrderByWithAggregationInput {

    @Field(() => SortOrder, {nullable:true})
    id?: keyof typeof SortOrder;

    @Field(() => ResetCountOrderByAggregateInput, {nullable:true})
    _count?: ResetCountOrderByAggregateInput;

    @Field(() => ResetAvgOrderByAggregateInput, {nullable:true})
    _avg?: ResetAvgOrderByAggregateInput;

    @Field(() => ResetMaxOrderByAggregateInput, {nullable:true})
    _max?: ResetMaxOrderByAggregateInput;

    @Field(() => ResetMinOrderByAggregateInput, {nullable:true})
    _min?: ResetMinOrderByAggregateInput;

    @Field(() => ResetSumOrderByAggregateInput, {nullable:true})
    _sum?: ResetSumOrderByAggregateInput;
}
