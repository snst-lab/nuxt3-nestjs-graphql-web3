import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { HideField } from '@nestjs/graphql';
import { Project_ledgerCountOrderByAggregateInput } from './project-ledger-count-order-by-aggregate.input';
import { Project_ledgerAvgOrderByAggregateInput } from './project-ledger-avg-order-by-aggregate.input';
import { Project_ledgerMaxOrderByAggregateInput } from './project-ledger-max-order-by-aggregate.input';
import { Project_ledgerMinOrderByAggregateInput } from './project-ledger-min-order-by-aggregate.input';
import { Project_ledgerSumOrderByAggregateInput } from './project-ledger-sum-order-by-aggregate.input';

@InputType()
export class Project_ledgerOrderByWithAggregationInput {

    @Field(() => SortOrder, {nullable:true})
    index?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    created_date?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    project_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    target?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    unit?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    income?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    expense?: keyof typeof SortOrder;

    @HideField()
    created_at?: keyof typeof SortOrder;

    @HideField()
    updated_at?: keyof typeof SortOrder;

    @Field(() => Project_ledgerCountOrderByAggregateInput, {nullable:true})
    _count?: Project_ledgerCountOrderByAggregateInput;

    @Field(() => Project_ledgerAvgOrderByAggregateInput, {nullable:true})
    _avg?: Project_ledgerAvgOrderByAggregateInput;

    @Field(() => Project_ledgerMaxOrderByAggregateInput, {nullable:true})
    _max?: Project_ledgerMaxOrderByAggregateInput;

    @Field(() => Project_ledgerMinOrderByAggregateInput, {nullable:true})
    _min?: Project_ledgerMinOrderByAggregateInput;

    @Field(() => Project_ledgerSumOrderByAggregateInput, {nullable:true})
    _sum?: Project_ledgerSumOrderByAggregateInput;
}
