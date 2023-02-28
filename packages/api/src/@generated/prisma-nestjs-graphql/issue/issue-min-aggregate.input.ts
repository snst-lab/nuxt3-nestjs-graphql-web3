import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { HideField } from '@nestjs/graphql';

@InputType()
export class IssueMinAggregateInput {

    @Field(() => Boolean, {nullable:true})
    issue_id?: true;

    @Field(() => Boolean, {nullable:true})
    issue_code?: true;

    @Field(() => Boolean, {nullable:true})
    project_id?: true;

    @Field(() => Boolean, {nullable:true})
    contributor_id?: true;

    @Field(() => Boolean, {nullable:true})
    sprint_id?: true;

    @Field(() => Boolean, {nullable:true})
    status?: true;

    @Field(() => Boolean, {nullable:true})
    start_date?: true;

    @Field(() => Boolean, {nullable:true})
    end_date?: true;

    @Field(() => Boolean, {nullable:true})
    complete_date?: true;

    @HideField()
    created_at?: true;

    @HideField()
    updated_at?: true;
}
