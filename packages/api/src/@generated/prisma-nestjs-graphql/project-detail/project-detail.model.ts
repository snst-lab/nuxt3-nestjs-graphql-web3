import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';
import { HideField } from '@nestjs/graphql';

@ObjectType()
export class Project_detail {

    @Field(() => ID, {nullable:false})
    index!: number;

    @Field(() => Int, {nullable:false})
    project_id!: number;

    @Field(() => Int, {nullable:false})
    service_id!: number;

    @Field(() => Int, {nullable:false})
    project_code!: number;

    @Field(() => Int, {nullable:false,defaultValue:0})
    ticket_count_total!: number;

    @Field(() => Int, {nullable:false,defaultValue:0})
    ticket_count_closed!: number;

    @Field(() => Float, {nullable:false,defaultValue:0})
    sum_project_amount!: number;

    @Field(() => Int, {nullable:false,defaultValue:0})
    credit_amount!: number;

    @Field(() => Int, {nullable:false,defaultValue:0})
    carry_over_balance!: number;

    @Field(() => Int, {nullable:false,defaultValue:1})
    price_coefficient!: number;

    @Field(() => Date, {nullable:true})
    campaign_deadline!: Date | null;

    @Field(() => Date, {nullable:true})
    fundraising_deadline!: Date | null;

    @HideField()
    created_at!: Date;

    @HideField()
    updated_at!: Date;
}
