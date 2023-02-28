import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';

@InputType()
export class SprintSumOrderByAggregateInput {

    @Field(() => SortOrder, {nullable:true})
    sprint_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    sprint_code?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    service_id?: keyof typeof SortOrder;
}
