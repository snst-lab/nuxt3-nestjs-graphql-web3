import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { HideField } from '@nestjs/graphql';
import { SprintCountAggregate } from './sprint-count-aggregate.output';
import { SprintAvgAggregate } from './sprint-avg-aggregate.output';
import { SprintSumAggregate } from './sprint-sum-aggregate.output';
import { SprintMinAggregate } from './sprint-min-aggregate.output';
import { SprintMaxAggregate } from './sprint-max-aggregate.output';

@ObjectType()
export class SprintGroupBy {

    @Field(() => Int, {nullable:false})
    sprint_id!: number;

    @Field(() => Int, {nullable:false})
    sprint_code!: number;

    @Field(() => String, {nullable:true})
    sprint_name?: string;

    @Field(() => Date, {nullable:true})
    start_date?: Date | string;

    @Field(() => Date, {nullable:true})
    end_date?: Date | string;

    @Field(() => Int, {nullable:false})
    service_id!: number;

    @HideField()
    created_at!: Date | string;

    @HideField()
    updated_at!: Date | string;

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
