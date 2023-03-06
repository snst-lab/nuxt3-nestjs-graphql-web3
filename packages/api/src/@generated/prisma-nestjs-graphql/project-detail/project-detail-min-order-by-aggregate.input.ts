import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { HideField } from '@nestjs/graphql';

@InputType()
export class Project_detailMinOrderByAggregateInput {

    @Field(() => SortOrder, {nullable:true})
    project_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    service_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    project_code?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    ticket_count_total?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    ticket_count_closed?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    sum_project_amount?: keyof typeof SortOrder;

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

    @HideField()
    created_at?: keyof typeof SortOrder;

    @HideField()
    updated_at?: keyof typeof SortOrder;
}
