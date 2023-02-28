import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntFilter } from '../prisma/int-filter.input';
import { StringFilter } from '../prisma/string-filter.input';
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

    @Field(() => StringFilter, {nullable:true})
    picture?: StringFilter;

    @Field(() => IntFilter, {nullable:true})
    contributor_count?: IntFilter;

    @Field(() => IntFilter, {nullable:true})
    ticket_count_total?: IntFilter;

    @Field(() => IntFilter, {nullable:true})
    ticket_count_closed?: IntFilter;

    @Field(() => IntFilter, {nullable:true})
    total_claimed?: IntFilter;

    @Field(() => IntFilter, {nullable:true})
    credit_amount?: IntFilter;

    @Field(() => IntFilter, {nullable:true})
    carry_over_balance?: IntFilter;

    @Field(() => IntFilter, {nullable:true})
    price_coefficient?: IntFilter;

    @Field(() => DateTimeNullableFilter, {nullable:true})
    campaign_deadline?: DateTimeNullableFilter;

    @Field(() => DateTimeNullableFilter, {nullable:true})
    fundraising_deadline?: DateTimeNullableFilter;

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
