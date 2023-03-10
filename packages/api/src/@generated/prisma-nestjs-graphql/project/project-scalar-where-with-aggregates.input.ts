import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntWithAggregatesFilter } from '../prisma/int-with-aggregates-filter.input';
import { StringWithAggregatesFilter } from '../prisma/string-with-aggregates-filter.input';
import { BytesWithAggregatesFilter } from '../prisma/bytes-with-aggregates-filter.input';
import { DateTimeNullableWithAggregatesFilter } from '../prisma/date-time-nullable-with-aggregates-filter.input';
import { FloatNullableWithAggregatesFilter } from '../prisma/float-nullable-with-aggregates-filter.input';
import { DateTimeWithAggregatesFilter } from '../prisma/date-time-with-aggregates-filter.input';
import { HideField } from '@nestjs/graphql';

@InputType()
export class ProjectScalarWhereWithAggregatesInput {

    @Field(() => [ProjectScalarWhereWithAggregatesInput], {nullable:true})
    AND?: Array<ProjectScalarWhereWithAggregatesInput>;

    @Field(() => [ProjectScalarWhereWithAggregatesInput], {nullable:true})
    OR?: Array<ProjectScalarWhereWithAggregatesInput>;

    @Field(() => [ProjectScalarWhereWithAggregatesInput], {nullable:true})
    NOT?: Array<ProjectScalarWhereWithAggregatesInput>;

    @Field(() => IntWithAggregatesFilter, {nullable:true})
    project_id?: IntWithAggregatesFilter;

    @Field(() => IntWithAggregatesFilter, {nullable:true})
    service_id?: IntWithAggregatesFilter;

    @Field(() => IntWithAggregatesFilter, {nullable:true})
    project_code?: IntWithAggregatesFilter;

    @Field(() => StringWithAggregatesFilter, {nullable:true})
    name?: StringWithAggregatesFilter;

    @Field(() => IntWithAggregatesFilter, {nullable:true})
    status?: IntWithAggregatesFilter;

    @Field(() => StringWithAggregatesFilter, {nullable:true})
    description?: StringWithAggregatesFilter;

    @Field(() => BytesWithAggregatesFilter, {nullable:true})
    cover_picture?: BytesWithAggregatesFilter;

    @Field(() => StringWithAggregatesFilter, {nullable:true})
    avatar_uri?: StringWithAggregatesFilter;

    @Field(() => IntWithAggregatesFilter, {nullable:true})
    contributor_count?: IntWithAggregatesFilter;

    @Field(() => IntWithAggregatesFilter, {nullable:true})
    minimum_contributor_count?: IntWithAggregatesFilter;

    @Field(() => DateTimeNullableWithAggregatesFilter, {nullable:true})
    campaign_deadline?: DateTimeNullableWithAggregatesFilter;

    @Field(() => DateTimeNullableWithAggregatesFilter, {nullable:true})
    start_date?: DateTimeNullableWithAggregatesFilter;

    @Field(() => DateTimeNullableWithAggregatesFilter, {nullable:true})
    end_date?: DateTimeNullableWithAggregatesFilter;

    @Field(() => DateTimeNullableWithAggregatesFilter, {nullable:true})
    complete_date?: DateTimeNullableWithAggregatesFilter;

    @Field(() => StringWithAggregatesFilter, {nullable:true})
    review_phase?: StringWithAggregatesFilter;

    @Field(() => FloatNullableWithAggregatesFilter, {nullable:true})
    voted_amount?: FloatNullableWithAggregatesFilter;

    @Field(() => IntWithAggregatesFilter, {nullable:true})
    invested_amount?: IntWithAggregatesFilter;

    @HideField()
    created_at?: DateTimeWithAggregatesFilter;

    @HideField()
    updated_at?: DateTimeWithAggregatesFilter;
}
