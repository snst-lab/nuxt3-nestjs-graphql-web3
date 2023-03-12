import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';

@ObjectType()
export class VoterAvgAggregate {

    @Field(() => Float, {nullable:true})
    id?: number;

    @Field(() => Float, {nullable:true})
    project_id?: number;

    @Field(() => Float, {nullable:true})
    max_voteable?: number;

    @Field(() => Float, {nullable:true})
    pending_airdrop?: number;

    @Field(() => Float, {nullable:true})
    pending_reconcile?: number;

    @Field(() => Float, {nullable:true})
    mock_follow_project_id?: number;

    @Field(() => Float, {nullable:true})
    reward?: number;
}
