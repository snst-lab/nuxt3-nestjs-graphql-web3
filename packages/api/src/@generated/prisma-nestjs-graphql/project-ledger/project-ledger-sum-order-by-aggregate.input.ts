import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';

@InputType()
export class Project_ledgerSumOrderByAggregateInput {

    @Field(() => SortOrder, {nullable:true})
    index?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    project_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    target?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    income?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    expense?: keyof typeof SortOrder;
}
