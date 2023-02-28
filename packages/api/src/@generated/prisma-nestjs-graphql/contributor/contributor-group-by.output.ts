import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { HideField } from '@nestjs/graphql';
import { ContributorCountAggregate } from './contributor-count-aggregate.output';
import { ContributorAvgAggregate } from './contributor-avg-aggregate.output';
import { ContributorSumAggregate } from './contributor-sum-aggregate.output';
import { ContributorMinAggregate } from './contributor-min-aggregate.output';
import { ContributorMaxAggregate } from './contributor-max-aggregate.output';

@ObjectType()
export class ContributorGroupBy {

    @Field(() => Int, {nullable:false})
    contributor_id!: number;

    @Field(() => String, {nullable:false})
    contributor_code!: string;

    @Field(() => String, {nullable:false})
    name!: string;

    @HideField()
    created_at!: Date | string;

    @HideField()
    updated_at!: Date | string;

    @Field(() => ContributorCountAggregate, {nullable:true})
    _count?: ContributorCountAggregate;

    @Field(() => ContributorAvgAggregate, {nullable:true})
    _avg?: ContributorAvgAggregate;

    @Field(() => ContributorSumAggregate, {nullable:true})
    _sum?: ContributorSumAggregate;

    @Field(() => ContributorMinAggregate, {nullable:true})
    _min?: ContributorMinAggregate;

    @Field(() => ContributorMaxAggregate, {nullable:true})
    _max?: ContributorMaxAggregate;
}
