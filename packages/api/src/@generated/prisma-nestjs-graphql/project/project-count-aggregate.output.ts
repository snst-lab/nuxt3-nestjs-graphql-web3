import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { HideField } from '@nestjs/graphql';

@ObjectType()
export class ProjectCountAggregate {

    @Field(() => Int, {nullable:false})
    project_id!: number;

    @Field(() => Int, {nullable:false})
    service_id!: number;

    @Field(() => Int, {nullable:false})
    project_code!: number;

    @Field(() => Int, {nullable:false})
    name!: number;

    @Field(() => Int, {nullable:false})
    status!: number;

    @Field(() => Int, {nullable:false})
    description!: number;

    @Field(() => Int, {nullable:false})
    cover_picture!: number;

    @Field(() => Int, {nullable:false})
    avatar_uri!: number;

    @Field(() => Int, {nullable:false})
    contributor_count!: number;

    @Field(() => Int, {nullable:false})
    minimum_contributor_count!: number;

    @Field(() => Int, {nullable:false})
    campaign_deadline!: number;

    @Field(() => Int, {nullable:false})
    start_date!: number;

    @Field(() => Int, {nullable:false})
    end_date!: number;

    @Field(() => Int, {nullable:false})
    complete_date!: number;

    @Field(() => Int, {nullable:false})
    review_phase!: number;

    @Field(() => Int, {nullable:false})
    invested_amount!: number;

    @HideField()
    created_at!: number;

    @HideField()
    updated_at!: number;

    @Field(() => Int, {nullable:false})
    _all!: number;
}
