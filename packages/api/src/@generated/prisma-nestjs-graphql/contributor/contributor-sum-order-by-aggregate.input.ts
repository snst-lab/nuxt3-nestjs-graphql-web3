import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';

@InputType()
export class ContributorSumOrderByAggregateInput {

    @Field(() => SortOrder, {nullable:true})
    contributor_id?: keyof typeof SortOrder;
}
