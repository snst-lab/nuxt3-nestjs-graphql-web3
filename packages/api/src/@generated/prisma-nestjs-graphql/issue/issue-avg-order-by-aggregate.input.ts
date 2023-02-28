import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';

@InputType()
export class IssueAvgOrderByAggregateInput {

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
}
