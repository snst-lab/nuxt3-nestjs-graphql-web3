import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { AddressCardCountAggregate } from './address-card-count-aggregate.output';
import { AddressCardAvgAggregate } from './address-card-avg-aggregate.output';
import { AddressCardSumAggregate } from './address-card-sum-aggregate.output';
import { AddressCardMinAggregate } from './address-card-min-aggregate.output';
import { AddressCardMaxAggregate } from './address-card-max-aggregate.output';

@ObjectType()
export class AggregateAddressCard {

    @Field(() => AddressCardCountAggregate, {nullable:true})
    _count?: AddressCardCountAggregate;

    @Field(() => AddressCardAvgAggregate, {nullable:true})
    _avg?: AddressCardAvgAggregate;

    @Field(() => AddressCardSumAggregate, {nullable:true})
    _sum?: AddressCardSumAggregate;

    @Field(() => AddressCardMinAggregate, {nullable:true})
    _min?: AddressCardMinAggregate;

    @Field(() => AddressCardMaxAggregate, {nullable:true})
    _max?: AddressCardMaxAggregate;
}
