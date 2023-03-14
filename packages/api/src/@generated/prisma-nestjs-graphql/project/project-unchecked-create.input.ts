import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';
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

    @Field(() => Int, {nullable:true})
    status?: number;

    @Field(() => String, {nullable:false})
    description!: string;

    @Field(() => String, {nullable:true})
    cover_picture?: Buffer;

    @Field(() => String, {nullable:true})
    avatar_uri?: string;

    @Field(() => Int, {nullable:true})
    contributor_count?: number;

    @Field(() => Int, {nullable:true})
    minimum_contributor_count?: number;

    @Field(() => Date, {nullable:true})
    campaign_deadline?: Date | string;

    @Field(() => Date, {nullable:true})
    start_date?: Date | string;

    @Field(() => Date, {nullable:true})
    end_date?: Date | string;

    @Field(() => Date, {nullable:true})
    complete_date?: Date | string;

    @Field(() => String, {nullable:true})
    review_phase?: string;

    @Field(() => Float, {nullable:true})
    voted_amount?: number;

    @Field(() => Int, {nullable:true})
    invested_amount?: number;

    @HideField()
    created_at?: Date | string;

    @HideField()
    updated_at?: Date | string;
}
