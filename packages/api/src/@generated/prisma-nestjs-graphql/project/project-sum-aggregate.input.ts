import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class ProjectSumAggregateInput {

    @Field(() => Boolean, {nullable:true})
    project_id?: true;

    @Field(() => Boolean, {nullable:true})
    service_id?: true;

    @Field(() => Boolean, {nullable:true})
    project_code?: true;

    @Field(() => Boolean, {nullable:true})
    status?: true;

    @Field(() => Boolean, {nullable:true})
    contributor_count?: true;

    @Field(() => Boolean, {nullable:true})
    minimum_contributor_count?: true;

    @Field(() => Boolean, {nullable:true})
    voted_amount?: true;

    @Field(() => Boolean, {nullable:true})
    invested_amount?: true;
}
