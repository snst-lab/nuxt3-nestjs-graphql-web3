import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { HideField } from '@nestjs/graphql';

@InputType()
export class ContributorMinAggregateInput {

    @Field(() => Boolean, {nullable:true})
    contributor_id?: true;

    @Field(() => Boolean, {nullable:true})
    contributor_code?: true;

    @Field(() => Boolean, {nullable:true})
    name?: true;

    @HideField()
    created_at?: true;

    @HideField()
    updated_at?: true;
}
