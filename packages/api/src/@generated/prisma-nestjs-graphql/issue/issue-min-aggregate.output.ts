import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { HideField } from '@nestjs/graphql';

@ObjectType()
export class IssueMinAggregate {

    @Field(() => Int, {nullable:true})
    issue_id?: number;

    @Field(() => Int, {nullable:true})
    issue_code?: number;

    @Field(() => Int, {nullable:true})
    project_id?: number;

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
    created_at?: Date | string;

    @HideField()
    updated_at?: Date | string;
}
