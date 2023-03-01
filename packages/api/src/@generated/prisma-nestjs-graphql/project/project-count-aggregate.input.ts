import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { HideField } from '@nestjs/graphql';

@InputType()
export class ProjectCountAggregateInput {

    @Field(() => Boolean, {nullable:true})
    project_id?: true;

    @Field(() => Boolean, {nullable:true})
    service_id?: true;

    @Field(() => Boolean, {nullable:true})
    project_code?: true;

    @Field(() => Boolean, {nullable:true})
    name?: true;

    @Field(() => Boolean, {nullable:true})
    avatar_uri?: true;

    @Field(() => Boolean, {nullable:true})
    contributor_count?: true;

    @Field(() => Boolean, {nullable:true})
    minimum_contributor_count?: true;

    @Field(() => Boolean, {nullable:true})
    ticket_count_total?: true;

    @Field(() => Boolean, {nullable:true})
    ticket_count_closed?: true;

    @Field(() => Boolean, {nullable:true})
    total_claimed?: true;

    @Field(() => Boolean, {nullable:true})
    credit_amount?: true;

    @Field(() => Boolean, {nullable:true})
    carry_over_balance?: true;

    @Field(() => Boolean, {nullable:true})
    price_coefficient?: true;

    @Field(() => Boolean, {nullable:true})
    campaign_deadline?: true;

    @Field(() => Boolean, {nullable:true})
    fundraising_deadline?: true;

    @Field(() => Boolean, {nullable:true})
    start_date?: true;

    @Field(() => Boolean, {nullable:true})
    end_date?: true;

    @Field(() => Boolean, {nullable:true})
    complete_date?: true;

    @HideField()
    created_at?: true;

    @HideField()
    updated_at?: true;

    @Field(() => Boolean, {nullable:true})
    _all?: true;
}
