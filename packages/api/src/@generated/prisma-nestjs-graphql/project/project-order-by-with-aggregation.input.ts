import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { HideField } from '@nestjs/graphql';
import { ProjectCountOrderByAggregateInput } from './project-count-order-by-aggregate.input';
import { ProjectAvgOrderByAggregateInput } from './project-avg-order-by-aggregate.input';
import { ProjectMaxOrderByAggregateInput } from './project-max-order-by-aggregate.input';
import { ProjectMinOrderByAggregateInput } from './project-min-order-by-aggregate.input';
import { ProjectSumOrderByAggregateInput } from './project-sum-order-by-aggregate.input';

@InputType()
export class ProjectOrderByWithAggregationInput {

    @Field(() => SortOrder, {nullable:true})
    project_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    service_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    project_code?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    name?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    status?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    description?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    cover_picture?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    avatar_uri?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    contributor_count?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    minimum_contributor_count?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    campaign_deadline?: keyof typeof SortOrder;

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

    @Field(() => ProjectCountOrderByAggregateInput, {nullable:true})
    _count?: ProjectCountOrderByAggregateInput;

    @Field(() => ProjectAvgOrderByAggregateInput, {nullable:true})
    _avg?: ProjectAvgOrderByAggregateInput;

    @Field(() => ProjectMaxOrderByAggregateInput, {nullable:true})
    _max?: ProjectMaxOrderByAggregateInput;

    @Field(() => ProjectMinOrderByAggregateInput, {nullable:true})
    _min?: ProjectMinOrderByAggregateInput;

    @Field(() => ProjectSumOrderByAggregateInput, {nullable:true})
    _sum?: ProjectSumOrderByAggregateInput;
}
