import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { HideField } from '@nestjs/graphql';
import { IssueCountAggregate } from './issue-count-aggregate.output';
import { IssueAvgAggregate } from './issue-avg-aggregate.output';
import { IssueSumAggregate } from './issue-sum-aggregate.output';
import { IssueMinAggregate } from './issue-min-aggregate.output';
import { IssueMaxAggregate } from './issue-max-aggregate.output';

@ObjectType()
export class IssueGroupBy {

    @Field(() => Int, {nullable:false})
    issue_id!: number;

    @Field(() => Int, {nullable:false})
    issue_code!: number;

    @Field(() => Int, {nullable:false})
    project_id!: number;

    @Field(() => Int, {nullable:true})
    contributor_id?: number;

    @Field(() => Int, {nullable:true})
    sprint_id?: number;

    @Field(() => Int, {nullable:true})
    status?: number;

    @Field(() => Date, {nullable:true})
    start_date?: Date | string;

    @Field(() => Date, {nullable:true})
    end_date?: Date | string;

    @Field(() => Date, {nullable:true})
    complete_date?: Date | string;

    @HideField()
    created_at!: Date | string;

    @HideField()
    updated_at!: Date | string;

    @Field(() => IssueCountAggregate, {nullable:true})
    _count?: IssueCountAggregate;

    @Field(() => IssueAvgAggregate, {nullable:true})
    _avg?: IssueAvgAggregate;

    @Field(() => IssueSumAggregate, {nullable:true})
    _sum?: IssueSumAggregate;

    @Field(() => IssueMinAggregate, {nullable:true})
    _min?: IssueMinAggregate;

    @Field(() => IssueMaxAggregate, {nullable:true})
    _max?: IssueMaxAggregate;
}
