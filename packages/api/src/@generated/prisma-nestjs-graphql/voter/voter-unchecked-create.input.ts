import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';

@InputType()
export class VoterUncheckedCreateInput {

    @Field(() => Int, {nullable:true})
    id?: number;

    @Field(() => Int, {nullable:true})
    project_id?: number;

    @Field(() => String, {nullable:true})
    name?: string;

    @Field(() => String, {nullable:true})
    evm_address?: string;

    @Field(() => String, {nullable:true})
    secret?: string;

    @Field(() => Float, {nullable:true})
    max_voteable?: number;

    @Field(() => Float, {nullable:true})
    pending_airdrop?: number;

    @Field(() => Float, {nullable:true})
    pending_reconcile?: number;

    @Field(() => Int, {nullable:true})
    mock_follow_project_id?: number;

    @Field(() => Float, {nullable:true})
    reward?: number;
}
