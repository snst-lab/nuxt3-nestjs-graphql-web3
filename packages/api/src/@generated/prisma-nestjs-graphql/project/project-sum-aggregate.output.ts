import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class ProjectSumAggregate {

    @Field(() => Int, {nullable:true})
    project_id?: number;

    @Field(() => Int, {nullable:true})
    service_id?: number;

    @Field(() => Int, {nullable:true})
    project_code?: number;

    @Field(() => Int, {nullable:true})
    contributor_count?: number;

    @Field(() => Int, {nullable:true})
    ticket_count_total?: number;

    @Field(() => Int, {nullable:true})
    ticket_count_closed?: number;

    @Field(() => Int, {nullable:true})
    total_claimed?: number;

    @Field(() => Int, {nullable:true})
    credit_amount?: number;

    @Field(() => Int, {nullable:true})
    carry_over_balance?: number;

    @Field(() => Int, {nullable:true})
    price_coefficient?: number;
}
