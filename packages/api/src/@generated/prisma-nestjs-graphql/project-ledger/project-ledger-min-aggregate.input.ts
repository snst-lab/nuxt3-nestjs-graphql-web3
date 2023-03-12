import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { HideField } from '@nestjs/graphql';

@InputType()
export class Project_ledgerMinAggregateInput {

    @Field(() => Boolean, {nullable:true})
    index?: true;

    @Field(() => Boolean, {nullable:true})
    created_date?: true;

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

    @Field(() => Boolean, {nullable:true})
    review_phase?: true;

    @HideField()
    created_at?: true;

    @HideField()
    updated_at?: true;
}
