import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';

@ObjectType()
export class ProjectAvgAggregate {

    @Field(() => Float, {nullable:true})
    id?: number;

    @Field(() => Float, {nullable:true})
    contributor_count?: number;

    @Field(() => Float, {nullable:true})
    ticket_count_total?: number;

    @Field(() => Float, {nullable:true})
    ticket_count_closed?: number;

    @Field(() => Float, {nullable:true})
    total_claimed?: number;

    @Field(() => Float, {nullable:true})
    credit_amount?: number;

    @Field(() => Float, {nullable:true})
    carry_over_balance?: number;

    @Field(() => Float, {nullable:true})
    price_coefficient?: number;
}
