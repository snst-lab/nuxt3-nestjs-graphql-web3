import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { HideField } from '@nestjs/graphql';
import { Project_detailCountOrderByAggregateInput } from './project-detail-count-order-by-aggregate.input';
import { Project_detailAvgOrderByAggregateInput } from './project-detail-avg-order-by-aggregate.input';
import { Project_detailMaxOrderByAggregateInput } from './project-detail-max-order-by-aggregate.input';
import { Project_detailMinOrderByAggregateInput } from './project-detail-min-order-by-aggregate.input';
import { Project_detailSumOrderByAggregateInput } from './project-detail-sum-order-by-aggregate.input';

@InputType()
export class Project_detailOrderByWithAggregationInput {

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

    @Field(() => Project_detailCountOrderByAggregateInput, {nullable:true})
    _count?: Project_detailCountOrderByAggregateInput;

    @Field(() => Project_detailAvgOrderByAggregateInput, {nullable:true})
    _avg?: Project_detailAvgOrderByAggregateInput;

    @Field(() => Project_detailMaxOrderByAggregateInput, {nullable:true})
    _max?: Project_detailMaxOrderByAggregateInput;

    @Field(() => Project_detailMinOrderByAggregateInput, {nullable:true})
    _min?: Project_detailMinOrderByAggregateInput;

    @Field(() => Project_detailSumOrderByAggregateInput, {nullable:true})
    _sum?: Project_detailSumOrderByAggregateInput;
}
