import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { HideField } from '@nestjs/graphql';

@InputType()
export class ProjectUncheckedCreateInput {

    @Field(() => Int, {nullable:true})
    project_id?: number;

    @Field(() => Int, {nullable:false})
    service_id!: number;

    @Field(() => Int, {nullable:false})
    project_code!: number;

    @Field(() => String, {nullable:false})
    name!: string;

    @Field(() => String, {nullable:true})
    avatar_uri?: string;

    @Field(() => Int, {nullable:true})
    contributor_count?: number;

    @Field(() => Int, {nullable:true})
    minimum_contributor_count?: number;

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

    @Field(() => Date, {nullable:true})
    campaign_deadline?: Date | string;

    @Field(() => Date, {nullable:true})
    fundraising_deadline?: Date | string;

    @Field(() => Date, {nullable:true})
    start_date?: Date | string;

    @Field(() => Date, {nullable:true})
    end_date?: Date | string;

    @Field(() => Date, {nullable:true})
    complete_date?: Date | string;

    @HideField()
    created_at?: Date | string;

    @HideField()
    updated_at?: Date | string;
}
