import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { HideField } from '@nestjs/graphql';
import { Project_summary_by_sprintCountOrderByAggregateInput } from './project-summary-by-sprint-count-order-by-aggregate.input';
import { Project_summary_by_sprintAvgOrderByAggregateInput } from './project-summary-by-sprint-avg-order-by-aggregate.input';
import { Project_summary_by_sprintMaxOrderByAggregateInput } from './project-summary-by-sprint-max-order-by-aggregate.input';
import { Project_summary_by_sprintMinOrderByAggregateInput } from './project-summary-by-sprint-min-order-by-aggregate.input';
import { Project_summary_by_sprintSumOrderByAggregateInput } from './project-summary-by-sprint-sum-order-by-aggregate.input';

@InputType()
export class Project_summary_by_sprintOrderByWithAggregationInput {

    @Field(() => SortOrder, {nullable:true})
    index?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    project_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    sprint_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    project_amount?: keyof typeof SortOrder;

    @HideField()
    created_at?: keyof typeof SortOrder;

    @HideField()
    updated_at?: keyof typeof SortOrder;

    @Field(() => Project_summary_by_sprintCountOrderByAggregateInput, {nullable:true})
    _count?: Project_summary_by_sprintCountOrderByAggregateInput;

    @Field(() => Project_summary_by_sprintAvgOrderByAggregateInput, {nullable:true})
    _avg?: Project_summary_by_sprintAvgOrderByAggregateInput;

    @Field(() => Project_summary_by_sprintMaxOrderByAggregateInput, {nullable:true})
    _max?: Project_summary_by_sprintMaxOrderByAggregateInput;

    @Field(() => Project_summary_by_sprintMinOrderByAggregateInput, {nullable:true})
    _min?: Project_summary_by_sprintMinOrderByAggregateInput;

    @Field(() => Project_summary_by_sprintSumOrderByAggregateInput, {nullable:true})
    _sum?: Project_summary_by_sprintSumOrderByAggregateInput;
}
