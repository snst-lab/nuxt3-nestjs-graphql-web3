import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';

@ObjectType()
export class Project_detailAvgAggregate {

    @Field(() => Float, {nullable:true})
    index?: number;

    @Field(() => Float, {nullable:true})
    project_id?: number;

    @Field(() => Float, {nullable:true})
    service_id?: number;

    @Field(() => Float, {nullable:true})
    project_code?: number;

    @Field(() => Float, {nullable:true})
    ticket_count_total?: number;

    @Field(() => Float, {nullable:true})
    ticket_count_closed?: number;

    @Field(() => Float, {nullable:true})
    sum_project_amount?: number;

    @Field(() => Float, {nullable:true})
    credit_amount?: number;

    @Field(() => Float, {nullable:true})
    carry_over_balance?: number;

    @Field(() => Float, {nullable:true})
    price_coefficient?: number;
}
