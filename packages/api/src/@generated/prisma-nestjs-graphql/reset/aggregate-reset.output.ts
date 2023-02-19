import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ResetCountAggregate } from './reset-count-aggregate.output';
import { ResetAvgAggregate } from './reset-avg-aggregate.output';
import { ResetSumAggregate } from './reset-sum-aggregate.output';
import { ResetMinAggregate } from './reset-min-aggregate.output';
import { ResetMaxAggregate } from './reset-max-aggregate.output';

@ObjectType()
export class AggregateReset {

    @Field(() => ResetCountAggregate, {nullable:true})
    _count?: ResetCountAggregate;

    @Field(() => ResetAvgAggregate, {nullable:true})
    _avg?: ResetAvgAggregate;

    @Field(() => ResetSumAggregate, {nullable:true})
    _sum?: ResetSumAggregate;

    @Field(() => ResetMinAggregate, {nullable:true})
    _min?: ResetMinAggregate;

    @Field(() => ResetMaxAggregate, {nullable:true})
    _max?: ResetMaxAggregate;
}
