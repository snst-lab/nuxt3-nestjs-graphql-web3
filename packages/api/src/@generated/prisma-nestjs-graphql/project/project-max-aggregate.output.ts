import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { HideField } from '@nestjs/graphql';

@ObjectType()
export class ProjectMaxAggregate {

    @Field(() => Int, {nullable:true})
    project_id?: number;

    @Field(() => Int, {nullable:true})
    service_id?: number;

    @Field(() => Int, {nullable:true})
    project_code?: number;

    @Field(() => String, {nullable:true})
    name?: string;

    @Field(() => Int, {nullable:true})
    status?: number;

    @Field(() => String, {nullable:true})
    description?: string;

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

    @Field(() => Int, {nullable:true})
    invested_amount?: number;

    @HideField()
    created_at?: Date | string;

    @HideField()
    updated_at?: Date | string;
}
