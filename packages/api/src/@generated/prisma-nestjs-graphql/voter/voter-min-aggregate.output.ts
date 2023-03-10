import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';

@ObjectType()
export class VoterMinAggregate {

    @Field(() => Int, {nullable:true})
    id?: number;

    @Field(() => String, {nullable:true})
    name?: string;

    @Field(() => String, {nullable:true})
    evm_address?: string;

    @Field(() => String, {nullable:true})
    secret?: string;

    @Field(() => Float, {nullable:true})
    token_balance?: number;

    @Field(() => Float, {nullable:true})
    max_voteable?: number;

    @Field(() => Float, {nullable:true})
    pending_airdrop?: number;

    @Field(() => Float, {nullable:true})
    pending_reconcile?: number;
}
