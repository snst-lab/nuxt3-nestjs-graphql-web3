import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class ContributorSumAggregateInput {

    @Field(() => Boolean, {nullable:true})
    contributor_id?: true;

    @Field(() => Boolean, {nullable:true})
    point?: true;

    @Field(() => Boolean, {nullable:true})
    project_id?: true;
}
