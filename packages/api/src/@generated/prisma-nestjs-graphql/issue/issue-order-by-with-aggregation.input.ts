import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { HideField } from '@nestjs/graphql';
import { IssueCountOrderByAggregateInput } from './issue-count-order-by-aggregate.input';
import { IssueAvgOrderByAggregateInput } from './issue-avg-order-by-aggregate.input';
import { IssueMaxOrderByAggregateInput } from './issue-max-order-by-aggregate.input';
import { IssueMinOrderByAggregateInput } from './issue-min-order-by-aggregate.input';
import { IssueSumOrderByAggregateInput } from './issue-sum-order-by-aggregate.input';

@InputType()
export class IssueOrderByWithAggregationInput {

    @Field(() => SortOrder, {nullable:true})
    issue_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    issue_code?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    project_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    contributor_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    sprint_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    status?: keyof typeof SortOrder;

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

    @Field(() => IssueCountOrderByAggregateInput, {nullable:true})
    _count?: IssueCountOrderByAggregateInput;

    @Field(() => IssueAvgOrderByAggregateInput, {nullable:true})
    _avg?: IssueAvgOrderByAggregateInput;

    @Field(() => IssueMaxOrderByAggregateInput, {nullable:true})
    _max?: IssueMaxOrderByAggregateInput;

    @Field(() => IssueMinOrderByAggregateInput, {nullable:true})
    _min?: IssueMinOrderByAggregateInput;

    @Field(() => IssueSumOrderByAggregateInput, {nullable:true})
    _sum?: IssueSumOrderByAggregateInput;
}
