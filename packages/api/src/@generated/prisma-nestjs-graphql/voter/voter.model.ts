import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';

@ObjectType()
export class Voter {

    @Field(() => ID, {nullable:false})
    id!: number;

    @Field(() => String, {nullable:true})
    name!: string | null;

    @Field(() => String, {nullable:true})
    evm_address!: string | null;

    @Field(() => String, {nullable:true})
    secret!: string | null;

    @Field(() => Float, {nullable:true,defaultValue:0})
    token_balance!: number | null;

    @Field(() => Float, {nullable:true,defaultValue:0})
    max_voteable!: number | null;

    @Field(() => Float, {nullable:true,defaultValue:0})
    pending_airdrop!: number | null;

    @Field(() => Float, {nullable:true,defaultValue:0})
    pending_reconcile!: number | null;
}
