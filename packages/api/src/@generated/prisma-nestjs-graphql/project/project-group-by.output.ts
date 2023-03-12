import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';
import { HideField } from '@nestjs/graphql';
import { ProjectCountAggregate } from './project-count-aggregate.output';
import { ProjectAvgAggregate } from './project-avg-aggregate.output';
import { ProjectSumAggregate } from './project-sum-aggregate.output';
import { ProjectMinAggregate } from './project-min-aggregate.output';
import { ProjectMaxAggregate } from './project-max-aggregate.output';

@ObjectType()
export class ProjectGroupBy {

    @Field(() => Int, {nullable:false})
    project_id!: number;

    @Field(() => Int, {nullable:false})
    service_id!: number;

    @Field(() => Int, {nullable:false})
    project_code!: number;

    @Field(() => String, {nullable:false})
    name!: string;

    @Field(() => Int, {nullable:false})
    status!: number;

    @Field(() => String, {nullable:false})
    description!: string;

    @Field(() => String, {nullable:false})
    cover_picture!: Buffer;

    @Field(() => String, {nullable:false})
    avatar_uri!: string;

    @Field(() => Int, {nullable:false})
    contributor_count!: number;

    @Field(() => Int, {nullable:false})
    minimum_contributor_count!: number;

    @Field(() => Date, {nullable:true})
    campaign_deadline?: Date | string;

    @Field(() => Date, {nullable:true})
    start_date?: Date | string;

    @Field(() => Date, {nullable:true})
    end_date?: Date | string;

    @Field(() => Date, {nullable:true})
    complete_date?: Date | string;

    @Field(() => String, {nullable:false})
    review_phase!: string;

    @Field(() => Float, {nullable:true})
    voted_amount?: number;

    @Field(() => Int, {nullable:false})
    invested_amount!: number;

    @HideField()
    created_at!: Date | string;

    @HideField()
    updated_at!: Date | string;

    @Field(() => ProjectCountAggregate, {nullable:true})
    _count?: ProjectCountAggregate;

    @Field(() => ProjectAvgAggregate, {nullable:true})
    _avg?: ProjectAvgAggregate;

    @Field(() => ProjectSumAggregate, {nullable:true})
    _sum?: ProjectSumAggregate;

    @Field(() => ProjectMinAggregate, {nullable:true})
    _min?: ProjectMinAggregate;

    @Field(() => ProjectMaxAggregate, {nullable:true})
    _max?: ProjectMaxAggregate;
}
