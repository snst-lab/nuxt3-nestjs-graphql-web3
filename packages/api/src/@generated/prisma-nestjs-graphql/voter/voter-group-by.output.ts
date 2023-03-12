import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';
import { VoterCountAggregate } from './voter-count-aggregate.output';
import { VoterAvgAggregate } from './voter-avg-aggregate.output';
import { VoterSumAggregate } from './voter-sum-aggregate.output';
import { VoterMinAggregate } from './voter-min-aggregate.output';
import { VoterMaxAggregate } from './voter-max-aggregate.output';

@ObjectType()
export class VoterGroupBy {

    @Field(() => Int, {nullable:false})
    id!: number;

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

    @Field(() => VoterCountAggregate, {nullable:true})
    _count?: VoterCountAggregate;

    @Field(() => VoterAvgAggregate, {nullable:true})
    _avg?: VoterAvgAggregate;

    @Field(() => VoterSumAggregate, {nullable:true})
    _sum?: VoterSumAggregate;

    @Field(() => VoterMinAggregate, {nullable:true})
    _min?: VoterMinAggregate;

    @Field(() => VoterMaxAggregate, {nullable:true})
    _max?: VoterMaxAggregate;
}
