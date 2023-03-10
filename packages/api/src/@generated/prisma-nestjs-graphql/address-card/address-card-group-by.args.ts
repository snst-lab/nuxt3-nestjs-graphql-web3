import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { AddressCardWhereInput } from './address-card-where.input';
import { Type } from 'class-transformer';
import { AddressCardOrderByWithAggregationInput } from './address-card-order-by-with-aggregation.input';
import { AddressCardScalarFieldEnum } from './address-card-scalar-field.enum';
import { AddressCardScalarWhereWithAggregatesInput } from './address-card-scalar-where-with-aggregates.input';
import { Int } from '@nestjs/graphql';
import { AddressCardCountAggregateInput } from './address-card-count-aggregate.input';
import { AddressCardAvgAggregateInput } from './address-card-avg-aggregate.input';
import { AddressCardSumAggregateInput } from './address-card-sum-aggregate.input';
import { AddressCardMinAggregateInput } from './address-card-min-aggregate.input';
import { AddressCardMaxAggregateInput } from './address-card-max-aggregate.input';

@ArgsType()
export class AddressCardGroupByArgs {

    @Field(() => AddressCardWhereInput, {nullable:true})
    @Type(() => AddressCardWhereInput)
    where?: AddressCardWhereInput;

    @Field(() => [AddressCardOrderByWithAggregationInput], {nullable:true})
    orderBy?: Array<AddressCardOrderByWithAggregationInput>;

    @Field(() => [AddressCardScalarFieldEnum], {nullable:false})
    by!: Array<keyof typeof AddressCardScalarFieldEnum>;

    @Field(() => AddressCardScalarWhereWithAggregatesInput, {nullable:true})
    having?: AddressCardScalarWhereWithAggregatesInput;

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
