import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { HideField } from '@nestjs/graphql';

@InputType()
export class SprintMaxAggregateInput {

    @Field(() => Boolean, {nullable:true})
    sprint_id?: true;

    @Field(() => Boolean, {nullable:true})
    sprint_code?: true;

    @Field(() => Boolean, {nullable:true})
    sprint_name?: true;

    @Field(() => Boolean, {nullable:true})
    start_date?: true;

    @Field(() => Boolean, {nullable:true})
    end_date?: true;

    @Field(() => Boolean, {nullable:true})
    service_id?: true;

    @HideField()
    created_at?: true;

    @HideField()
    updated_at?: true;
}
