import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { HideField } from '@nestjs/graphql';

@InputType()
export class Project_detailMinAggregateInput {

    @Field(() => Boolean, {nullable:true})
    index?: true;

    @Field(() => Boolean, {nullable:true})
    project_id?: true;

    @Field(() => Boolean, {nullable:true})
    service_id?: true;

    @Field(() => Boolean, {nullable:true})
    project_code?: true;

    @Field(() => Boolean, {nullable:true})
    ticket_count_total?: true;

    @Field(() => Boolean, {nullable:true})
    ticket_count_closed?: true;

    @Field(() => Boolean, {nullable:true})
    sum_project_amount?: true;

    @Field(() => Boolean, {nullable:true})
    credit_amount?: true;

    @Field(() => Boolean, {nullable:true})
    carry_over_balance?: true;

    @Field(() => Boolean, {nullable:true})
    price_coefficient?: true;

    @Field(() => Boolean, {nullable:true})
    review_phase?: true;

    @Field(() => Boolean, {nullable:true})
    campaign_deadline?: true;

    @Field(() => Boolean, {nullable:true})
    fundraising_deadline?: true;

    @HideField()
    created_at?: true;

    @HideField()
    updated_at?: true;
}
