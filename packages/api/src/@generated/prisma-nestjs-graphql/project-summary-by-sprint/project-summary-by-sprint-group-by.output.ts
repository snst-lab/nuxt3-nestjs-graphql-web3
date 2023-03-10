import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';
import { HideField } from '@nestjs/graphql';
import { Project_summary_by_sprintCountAggregate } from './project-summary-by-sprint-count-aggregate.output';
import { Project_summary_by_sprintAvgAggregate } from './project-summary-by-sprint-avg-aggregate.output';
import { Project_summary_by_sprintSumAggregate } from './project-summary-by-sprint-sum-aggregate.output';
import { Project_summary_by_sprintMinAggregate } from './project-summary-by-sprint-min-aggregate.output';
import { Project_summary_by_sprintMaxAggregate } from './project-summary-by-sprint-max-aggregate.output';

@ObjectType()
export class Project_summary_by_sprintGroupBy {

    @Field(() => Int, {nullable:false})
    index!: number;

    @Field(() => Int, {nullable:false})
    project_id!: number;

    @Field(() => Int, {nullable:false})
    sprint_id!: number;

    @Field(() => Float, {nullable:false})
    project_amount!: number;

    @HideField()
    created_at!: Date | string;

    @HideField()
    updated_at!: Date | string;

    @Field(() => Project_summary_by_sprintCountAggregate, {nullable:true})
    _count?: Project_summary_by_sprintCountAggregate;

    @Field(() => Project_summary_by_sprintAvgAggregate, {nullable:true})
    _avg?: Project_summary_by_sprintAvgAggregate;

    @Field(() => Project_summary_by_sprintSumAggregate, {nullable:true})
    _sum?: Project_summary_by_sprintSumAggregate;

    @Field(() => Project_summary_by_sprintMinAggregate, {nullable:true})
    _min?: Project_summary_by_sprintMinAggregate;

    @Field(() => Project_summary_by_sprintMaxAggregate, {nullable:true})
    _max?: Project_summary_by_sprintMaxAggregate;
}
