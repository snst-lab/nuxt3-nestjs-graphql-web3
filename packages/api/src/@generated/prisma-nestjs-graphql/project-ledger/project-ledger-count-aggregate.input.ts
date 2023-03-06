import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { HideField } from '@nestjs/graphql';

@InputType()
export class Project_ledgerCountAggregateInput {

    @Field(() => Boolean, {nullable:true})
    index?: true;

    @Field(() => Boolean, {nullable:true})
    contributor_code?: true;

    @Field(() => Boolean, {nullable:true})
    project_id?: true;

    @Field(() => Boolean, {nullable:true})
    target?: true;

    @Field(() => Boolean, {nullable:true})
    unit?: true;

    @Field(() => Boolean, {nullable:true})
    income?: true;

    @Field(() => Boolean, {nullable:true})
    expense?: true;

    @HideField()
    created_at?: true;

    @HideField()
    updated_at?: true;

    @Field(() => Boolean, {nullable:true})
    _all?: true;
}
