import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { SprintCountAggregate } from './sprint-count-aggregate.output';
import { SprintAvgAggregate } from './sprint-avg-aggregate.output';
import { SprintSumAggregate } from './sprint-sum-aggregate.output';
import { SprintMinAggregate } from './sprint-min-aggregate.output';
import { SprintMaxAggregate } from './sprint-max-aggregate.output';

@ObjectType()
export class AggregateSprint {

    @Field(() => SprintCountAggregate, {nullable:true})
    _count?: SprintCountAggregate;

    @Field(() => SprintAvgAggregate, {nullable:true})
    _avg?: SprintAvgAggregate;

    @Field(() => SprintSumAggregate, {nullable:true})
    _sum?: SprintSumAggregate;

    @Field(() => SprintMinAggregate, {nullable:true})
    _min?: SprintMinAggregate;

    @Field(() => SprintMaxAggregate, {nullable:true})
    _max?: SprintMaxAggregate;
}
