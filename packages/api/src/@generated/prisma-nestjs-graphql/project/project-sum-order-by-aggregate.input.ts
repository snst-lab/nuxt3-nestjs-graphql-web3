import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';

@InputType()
export class ProjectSumOrderByAggregateInput {

    @Field(() => SortOrder, {nullable:true})
    project_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    service_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    project_code?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    status?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    contributor_count?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    minimum_contributor_count?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    voted_amount?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    invested_amount?: keyof typeof SortOrder;
}
