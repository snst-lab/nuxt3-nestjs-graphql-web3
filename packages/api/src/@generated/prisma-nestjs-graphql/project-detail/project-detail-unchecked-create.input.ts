import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';
import { HideField } from '@nestjs/graphql';

@InputType()
export class Project_detailUncheckedCreateInput {

    @Field(() => Int, {nullable:true})
    index?: number;

    @Field(() => Int, {nullable:false})
    project_id!: number;

    @Field(() => Int, {nullable:false})
    service_id!: number;

    @Field(() => Int, {nullable:false})
    project_code!: number;

    @Field(() => Int, {nullable:true})
    ticket_count_total?: number;

    @Field(() => Int, {nullable:true})
    ticket_count_closed?: number;

    @Field(() => Float, {nullable:true})
    sum_project_amount?: number;

    @Field(() => Int, {nullable:true})
    credit_amount?: number;

    @Field(() => Int, {nullable:true})
    carry_over_balance?: number;

    @Field(() => Int, {nullable:true})
    price_coefficient?: number;

    @Field(() => Date, {nullable:true})
    campaign_deadline?: Date | string;

    @Field(() => Date, {nullable:true})
    fundraising_deadline?: Date | string;

    @HideField()
    created_at?: Date | string;

    @HideField()
    updated_at?: Date | string;
}
