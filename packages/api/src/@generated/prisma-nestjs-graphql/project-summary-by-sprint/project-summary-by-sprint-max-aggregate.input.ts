import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { HideField } from '@nestjs/graphql';

@InputType()
export class Project_summary_by_sprintMaxAggregateInput {

    @Field(() => Boolean, {nullable:true})
    index?: true;

    @Field(() => Boolean, {nullable:true})
    project_id?: true;

    @Field(() => Boolean, {nullable:true})
    sprint_id?: true;

    @Field(() => Boolean, {nullable:true})
    project_amount?: true;

    @HideField()
    created_at?: true;

    @HideField()
    updated_at?: true;
}
