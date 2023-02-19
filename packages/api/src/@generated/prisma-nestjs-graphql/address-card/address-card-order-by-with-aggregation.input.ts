import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { HideField } from '@nestjs/graphql';
import { AddressCardCountOrderByAggregateInput } from './address-card-count-order-by-aggregate.input';
import { AddressCardAvgOrderByAggregateInput } from './address-card-avg-order-by-aggregate.input';
import { AddressCardMaxOrderByAggregateInput } from './address-card-max-order-by-aggregate.input';
import { AddressCardMinOrderByAggregateInput } from './address-card-min-order-by-aggregate.input';
import { AddressCardSumOrderByAggregateInput } from './address-card-sum-order-by-aggregate.input';

@InputType()
export class AddressCardOrderByWithAggregationInput {

    @Field(() => SortOrder, {nullable:true})
    id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    merchant_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    auth_type?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    social_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    email?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    evm_address?: keyof typeof SortOrder;

    @HideField()
    createdAt?: keyof typeof SortOrder;

    @HideField()
    updatedAt?: keyof typeof SortOrder;

    @Field(() => AddressCardCountOrderByAggregateInput, {nullable:true})
    _count?: AddressCardCountOrderByAggregateInput;

    @Field(() => AddressCardAvgOrderByAggregateInput, {nullable:true})
    _avg?: AddressCardAvgOrderByAggregateInput;

    @Field(() => AddressCardMaxOrderByAggregateInput, {nullable:true})
    _max?: AddressCardMaxOrderByAggregateInput;

    @Field(() => AddressCardMinOrderByAggregateInput, {nullable:true})
    _min?: AddressCardMinOrderByAggregateInput;

    @Field(() => AddressCardSumOrderByAggregateInput, {nullable:true})
    _sum?: AddressCardSumOrderByAggregateInput;
}
