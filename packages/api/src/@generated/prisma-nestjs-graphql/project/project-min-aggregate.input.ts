import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { HideField } from '@nestjs/graphql';

@InputType()
export class ProjectMinAggregateInput {

    @Field(() => Boolean, {nullable:true})
    project_id?: true;

    @Field(() => Boolean, {nullable:true})
    service_id?: true;

    @Field(() => Boolean, {nullable:true})
    project_code?: true;

    @Field(() => Boolean, {nullable:true})
    name?: true;

    @Field(() => Boolean, {nullable:true})
    status?: true;

    @Field(() => Boolean, {nullable:true})
    description?: true;

    @Field(() => Boolean, {nullable:true})
    cover_picture?: true;

    @Field(() => Boolean, {nullable:true})
    avatar_uri?: true;

    @Field(() => Boolean, {nullable:true})
    contributor_count?: true;

    @Field(() => Boolean, {nullable:true})
    minimum_contributor_count?: true;

    @Field(() => Boolean, {nullable:true})
    campaign_deadline?: true;

    @Field(() => Boolean, {nullable:true})
    start_date?: true;

    @Field(() => Boolean, {nullable:true})
    end_date?: true;

    @Field(() => Boolean, {nullable:true})
    complete_date?: true;

    @Field(() => Boolean, {nullable:true})
    review_phase?: true;

    @Field(() => Boolean, {nullable:true})
    invested_amount?: true;

    @HideField()
    created_at?: true;

    @HideField()
    updated_at?: true;
}
