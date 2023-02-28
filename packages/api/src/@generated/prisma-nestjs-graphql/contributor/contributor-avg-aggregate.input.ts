import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class ContributorAvgAggregateInput {

    @Field(() => Boolean, {nullable:true})
    contributor_id?: true;
}
