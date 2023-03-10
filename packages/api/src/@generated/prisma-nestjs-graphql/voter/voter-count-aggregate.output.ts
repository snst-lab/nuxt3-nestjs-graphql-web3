import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class VoterCountAggregate {

    @Field(() => Int, {nullable:false})
    id!: number;

    @Field(() => Int, {nullable:false})
    name!: number;

    @Field(() => Int, {nullable:false})
    evm_address!: number;

    @Field(() => Int, {nullable:false})
    secret!: number;

    @Field(() => Int, {nullable:false})
    token_balance!: number;

    @Field(() => Int, {nullable:false})
    max_voteable!: number;

    @Field(() => Int, {nullable:false})
    pending_airdrop!: number;

    @Field(() => Int, {nullable:false})
    pending_reconcile!: number;

    @Field(() => Int, {nullable:false})
    _all!: number;
}
