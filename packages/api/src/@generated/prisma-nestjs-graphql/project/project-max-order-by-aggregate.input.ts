import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { HideField } from '@nestjs/graphql';

@InputType()
export class ProjectMaxOrderByAggregateInput {

    @Field(() => SortOrder, {nullable:true})
    project_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    service_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    project_code?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    name?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    picture?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    contributor_count?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    ticket_count_total?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    ticket_count_closed?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    total_claimed?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    credit_amount?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    carry_over_balance?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    price_coefficient?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    campaign_deadline?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    fundraising_deadline?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    start_date?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    end_date?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    complete_date?: keyof typeof SortOrder;

    @HideField()
    created_at?: keyof typeof SortOrder;

    @HideField()
    updated_at?: keyof typeof SortOrder;
}
