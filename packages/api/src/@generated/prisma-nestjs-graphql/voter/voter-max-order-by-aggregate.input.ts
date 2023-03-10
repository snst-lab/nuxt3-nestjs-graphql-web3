import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';

@InputType()
export class VoterMaxOrderByAggregateInput {

    @Field(() => SortOrder, {nullable:true})
    id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    name?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    evm_address?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    secret?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    token_balance?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    max_voteable?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    pending_airdrop?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    pending_reconcile?: keyof typeof SortOrder;
}
