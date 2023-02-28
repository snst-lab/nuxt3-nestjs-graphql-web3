import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class IssueAvgAggregateInput {

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
}
