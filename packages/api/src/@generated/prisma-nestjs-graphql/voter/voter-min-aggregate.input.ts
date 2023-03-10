import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class VoterMinAggregateInput {

    @Field(() => Boolean, {nullable:true})
    id?: true;

    @Field(() => Boolean, {nullable:true})
    name?: true;

    @Field(() => Boolean, {nullable:true})
    evm_address?: true;

    @Field(() => Boolean, {nullable:true})
    secret?: true;

    @Field(() => Boolean, {nullable:true})
    token_balance?: true;

    @Field(() => Boolean, {nullable:true})
    max_voteable?: true;

    @Field(() => Boolean, {nullable:true})
    pending_airdrop?: true;

    @Field(() => Boolean, {nullable:true})
    pending_reconcile?: true;
}
