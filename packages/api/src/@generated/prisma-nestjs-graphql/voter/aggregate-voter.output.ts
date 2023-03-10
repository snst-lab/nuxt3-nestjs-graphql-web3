import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { VoterCountAggregate } from './voter-count-aggregate.output';
import { VoterAvgAggregate } from './voter-avg-aggregate.output';
import { VoterSumAggregate } from './voter-sum-aggregate.output';
import { VoterMinAggregate } from './voter-min-aggregate.output';
import { VoterMaxAggregate } from './voter-max-aggregate.output';

@ObjectType()
export class AggregateVoter {

    @Field(() => VoterCountAggregate, {nullable:true})
    _count?: VoterCountAggregate;

    @Field(() => VoterAvgAggregate, {nullable:true})
    _avg?: VoterAvgAggregate;

    @Field(() => VoterSumAggregate, {nullable:true})
    _sum?: VoterSumAggregate;

    @Field(() => VoterMinAggregate, {nullable:true})
    _min?: VoterMinAggregate;

    @Field(() => VoterMaxAggregate, {nullable:true})
    _max?: VoterMaxAggregate;
}
