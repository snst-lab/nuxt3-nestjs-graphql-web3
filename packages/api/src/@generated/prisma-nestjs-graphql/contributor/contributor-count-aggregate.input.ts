import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { HideField } from '@nestjs/graphql';

@InputType()
export class ContributorCountAggregateInput {

    @Field(() => Boolean, {nullable:true})
    contributor_id?: true;

    @Field(() => Boolean, {nullable:true})
    contributor_code?: true;

    @Field(() => Boolean, {nullable:true})
    contributor_name?: true;

    @Field(() => Boolean, {nullable:true})
    point?: true;

    @Field(() => Boolean, {nullable:true})
    project_id?: true;

    @HideField()
    created_at?: true;

    @HideField()
    updated_at?: true;

    @Field(() => Boolean, {nullable:true})
    _all?: true;
}
