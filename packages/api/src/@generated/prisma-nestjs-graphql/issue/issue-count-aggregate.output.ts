import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { HideField } from '@nestjs/graphql';

@ObjectType()
export class IssueCountAggregate {

    @Field(() => Int, {nullable:false})
    issue_id!: number;

    @Field(() => Int, {nullable:false})
    issue_code!: number;

    @Field(() => Int, {nullable:false})
    project_id!: number;

    @Field(() => Int, {nullable:false})
    contributor_id!: number;

    @Field(() => Int, {nullable:false})
    sprint_id!: number;

    @Field(() => Int, {nullable:false})
    status!: number;

    @Field(() => Int, {nullable:false})
    start_date!: number;

    @Field(() => Int, {nullable:false})
    end_date!: number;

    @Field(() => Int, {nullable:false})
    complete_date!: number;

    @HideField()
    created_at!: number;

    @HideField()
    updated_at!: number;

    @Field(() => Int, {nullable:false})
    _all!: number;
}
