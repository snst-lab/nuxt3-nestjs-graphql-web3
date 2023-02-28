import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class IssueSumAggregate {

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
}
