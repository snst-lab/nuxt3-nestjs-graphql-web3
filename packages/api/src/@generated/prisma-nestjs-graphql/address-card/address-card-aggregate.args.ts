import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { AddressCardWhereInput } from './address-card-where.input';
import { Type } from 'class-transformer';
import { AddressCardOrderByWithRelationInput } from './address-card-order-by-with-relation.input';
import { AddressCardWhereUniqueInput } from './address-card-where-unique.input';
import { Int } from '@nestjs/graphql';
import { AddressCardCountAggregateInput } from './address-card-count-aggregate.input';
import { AddressCardAvgAggregateInput } from './address-card-avg-aggregate.input';
import { AddressCardSumAggregateInput } from './address-card-sum-aggregate.input';
import { AddressCardMinAggregateInput } from './address-card-min-aggregate.input';
import { AddressCardMaxAggregateInput } from './address-card-max-aggregate.input';

@ArgsType()
export class AddressCardAggregateArgs {

    @Field(() => AddressCardWhereInput, {nullable:true})
    @Type(() => AddressCardWhereInput)
    where?: AddressCardWhereInput;

    @Field(() => [AddressCardOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<AddressCardOrderByWithRelationInput>;

    @Field(() => AddressCardWhereUniqueInput, {nullable:true})
    cursor?: AddressCardWhereUniqueInput;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => AddressCardCountAggregateInput, {nullable:true})
    _count?: AddressCardCountAggregateInput;

    @Field(() => AddressCardAvgAggregateInput, {nullable:true})
    _avg?: AddressCardAvgAggregateInput;

    @Field(() => AddressCardSumAggregateInput, {nullable:true})
    _sum?: AddressCardSumAggregateInput;

    @Field(() => AddressCardMinAggregateInput, {nullable:true})
    _min?: AddressCardMinAggregateInput;

    @Field(() => AddressCardMaxAggregateInput, {nullable:true})
    _max?: AddressCardMaxAggregateInput;
}
