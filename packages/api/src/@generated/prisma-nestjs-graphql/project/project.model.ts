import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';
import { HideField } from '@nestjs/graphql';

@ObjectType()
export class Project {

    @Field(() => ID, {nullable:false})
    project_id!: number;

    @Field(() => Int, {nullable:false})
    service_id!: number;

    @Field(() => Int, {nullable:false})
    project_code!: number;

    @Field(() => String, {nullable:false})
    name!: string;

    @Field(() => Int, {nullable:false,defaultValue:0})
    status!: number;

    @Field(() => String, {nullable:false})
    description!: string;

    @Field(() => String, {nullable:false,defaultValue:''})
    cover_picture!: Buffer;

    @Field(() => String, {nullable:false,defaultValue:''})
    avatar_uri!: string;

    @Field(() => Int, {nullable:false,defaultValue:5})
    contributor_count!: number;

    @Field(() => Int, {nullable:false,defaultValue:3})
    minimum_contributor_count!: number;

    @Field(() => Date, {nullable:true})
    campaign_deadline!: Date | null;

    @Field(() => Date, {nullable:true})
    start_date!: Date | null;

    @Field(() => Date, {nullable:true})
    end_date!: Date | null;

    @Field(() => Date, {nullable:true})
    complete_date!: Date | null;

    @Field(() => String, {nullable:false,defaultValue:'PHASE1'})
    review_phase!: string;

    @Field(() => Float, {nullable:true,defaultValue:0})
    voted_amount!: number | null;

    @Field(() => Int, {nullable:false,defaultValue:0})
    invested_amount!: number;

    @HideField()
    created_at!: Date;

    @HideField()
    updated_at!: Date;
}
