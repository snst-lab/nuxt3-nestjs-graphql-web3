import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntFilter } from '../prisma/int-filter.input';
import { StringFilter } from '../prisma/string-filter.input';
import { BytesFilter } from '../prisma/bytes-filter.input';
import { DateTimeNullableFilter } from '../prisma/date-time-nullable-filter.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';
import { HideField } from '@nestjs/graphql';

@InputType()
export class ProjectWhereInput {

    @Field(() => [ProjectWhereInput], {nullable:true})
    AND?: Array<ProjectWhereInput>;

    @Field(() => [ProjectWhereInput], {nullable:true})
    OR?: Array<ProjectWhereInput>;

    @Field(() => [ProjectWhereInput], {nullable:true})
    NOT?: Array<ProjectWhereInput>;

    @Field(() => IntFilter, {nullable:true})
    project_id?: IntFilter;

    @Field(() => IntFilter, {nullable:true})
    service_id?: IntFilter;

    @Field(() => IntFilter, {nullable:true})
    project_code?: IntFilter;

    @Field(() => StringFilter, {nullable:true})
    name?: StringFilter;

    @Field(() => IntFilter, {nullable:true})
    status?: IntFilter;

    @Field(() => StringFilter, {nullable:true})
    description?: StringFilter;

    @Field(() => BytesFilter, {nullable:true})
    cover_picture?: BytesFilter;

    @Field(() => StringFilter, {nullable:true})
    avatar_uri?: StringFilter;

    @Field(() => IntFilter, {nullable:true})
    contributor_count?: IntFilter;

    @Field(() => IntFilter, {nullable:true})
    minimum_contributor_count?: IntFilter;

    @Field(() => DateTimeNullableFilter, {nullable:true})
    campaign_deadline?: DateTimeNullableFilter;

    @Field(() => DateTimeNullableFilter, {nullable:true})
    start_date?: DateTimeNullableFilter;

    @Field(() => DateTimeNullableFilter, {nullable:true})
    end_date?: DateTimeNullableFilter;

    @Field(() => DateTimeNullableFilter, {nullable:true})
    complete_date?: DateTimeNullableFilter;

    @HideField()
    created_at?: DateTimeFilter;

    @HideField()
    updated_at?: DateTimeFilter;
}
