import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';

@InputType()
export class VoterSumOrderByAggregateInput {

    @Field(() => SortOrder, {nullable:true})
    id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    project_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    max_voteable?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    pending_airdrop?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    pending_reconcile?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    mock_follow_project_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    reward?: keyof typeof SortOrder;
}
