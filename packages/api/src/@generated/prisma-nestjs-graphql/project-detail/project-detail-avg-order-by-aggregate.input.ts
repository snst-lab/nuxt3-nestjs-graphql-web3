import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';

@InputType()
export class Project_detailAvgOrderByAggregateInput {

    @Field(() => SortOrder, {nullable:true})
    index?: keyof typeof SortOrder;

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
}
