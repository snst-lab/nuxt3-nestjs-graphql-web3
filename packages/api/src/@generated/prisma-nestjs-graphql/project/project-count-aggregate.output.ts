import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { HideField } from '@nestjs/graphql';

@ObjectType()
export class ProjectCountAggregate {

    @Field(() => Int, {nullable:false})
    id!: number;

    @Field(() => Int, {nullable:false})
    service_id!: number;

    @Field(() => Int, {nullable:false})
    project_id!: number;

    @Field(() => Int, {nullable:false})
    name!: number;

    @Field(() => Int, {nullable:false})
    picture!: number;

    @Field(() => Int, {nullable:false})
    contributor_count!: number;

    @Field(() => Int, {nullable:false})
    ticket_count_total!: number;

    @Field(() => Int, {nullable:false})
    ticket_count_closed!: number;

    @Field(() => Int, {nullable:false})
    total_claimed!: number;

    @Field(() => Int, {nullable:false})
    credit_amount!: number;

    @Field(() => Int, {nullable:false})
    carry_over_balance!: number;

    @Field(() => Int, {nullable:false})
    price_coefficient!: number;

    @HideField()
    created_at!: number;

    @HideField()
    updated_at!: number;

    @Field(() => Int, {nullable:false})
    _all!: number;
}
