import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';

@ObjectType()
export class IssueAvgAggregate {

    @Field(() => Float, {nullable:true})
    issue_id?: number;

    @Field(() => Float, {nullable:true})
    issue_code?: number;

    @Field(() => Float, {nullable:true})
    project_id?: number;

    @Field(() => Float, {nullable:true})
    contributor_id?: number;

    @Field(() => Float, {nullable:true})
    sprint_id?: number;

    @Field(() => Float, {nullable:true})
    status?: number;
}
