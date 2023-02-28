import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntFilter } from '../prisma/int-filter.input';
import { IntNullableFilter } from '../prisma/int-nullable-filter.input';
import { DateTimeNullableFilter } from '../prisma/date-time-nullable-filter.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';
import { HideField } from '@nestjs/graphql';

@InputType()
export class IssueWhereInput {

    @Field(() => [IssueWhereInput], {nullable:true})
    AND?: Array<IssueWhereInput>;

    @Field(() => [IssueWhereInput], {nullable:true})
    OR?: Array<IssueWhereInput>;

    @Field(() => [IssueWhereInput], {nullable:true})
    NOT?: Array<IssueWhereInput>;

    @Field(() => IntFilter, {nullable:true})
    issue_id?: IntFilter;

    @Field(() => IntFilter, {nullable:true})
    issue_code?: IntFilter;

    @Field(() => IntFilter, {nullable:true})
    project_id?: IntFilter;

    @Field(() => IntNullableFilter, {nullable:true})
    contributor_id?: IntNullableFilter;

    @Field(() => IntNullableFilter, {nullable:true})
    sprint_id?: IntNullableFilter;

    @Field(() => IntNullableFilter, {nullable:true})
    status?: IntNullableFilter;

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
