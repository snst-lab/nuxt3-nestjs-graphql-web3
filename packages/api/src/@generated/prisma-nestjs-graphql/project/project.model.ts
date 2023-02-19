import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { HideField } from '@nestjs/graphql';

@ObjectType()
export class Project {

    @Field(() => ID, {nullable:false})
    id!: number;

    @Field(() => String, {nullable:false})
    service_id!: string;

    @Field(() => String, {nullable:false})
    project_id!: string;

    @Field(() => String, {nullable:false})
    name!: string;

    @Field(() => String, {nullable:false,defaultValue:''})
    picture!: string;

    @Field(() => Int, {nullable:false,defaultValue:0})
    contributor_count!: number;

    @Field(() => Int, {nullable:false,defaultValue:0})
    ticket_count_total!: number;

    @Field(() => Int, {nullable:false,defaultValue:0})
    ticket_count_closed!: number;

    @Field(() => Int, {nullable:false,defaultValue:0})
    total_claimed!: number;

    @Field(() => Int, {nullable:false,defaultValue:0})
    credit_amount!: number;

    @Field(() => Int, {nullable:false,defaultValue:0})
    carry_over_balance!: number;

    @Field(() => Int, {nullable:false,defaultValue:1})
    price_coefficient!: number;

    @HideField()
    created_at!: Date;

    @HideField()
    updated_at!: Date;
}
