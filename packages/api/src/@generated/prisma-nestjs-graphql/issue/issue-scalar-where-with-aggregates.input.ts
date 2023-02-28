import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntWithAggregatesFilter } from '../prisma/int-with-aggregates-filter.input';
import { IntNullableWithAggregatesFilter } from '../prisma/int-nullable-with-aggregates-filter.input';
import { DateTimeNullableWithAggregatesFilter } from '../prisma/date-time-nullable-with-aggregates-filter.input';
import { DateTimeWithAggregatesFilter } from '../prisma/date-time-with-aggregates-filter.input';
import { HideField } from '@nestjs/graphql';

@InputType()
export class IssueScalarWhereWithAggregatesInput {

    @Field(() => [IssueScalarWhereWithAggregatesInput], {nullable:true})
    AND?: Array<IssueScalarWhereWithAggregatesInput>;

    @Field(() => [IssueScalarWhereWithAggregatesInput], {nullable:true})
    OR?: Array<IssueScalarWhereWithAggregatesInput>;

    @Field(() => [IssueScalarWhereWithAggregatesInput], {nullable:true})
    NOT?: Array<IssueScalarWhereWithAggregatesInput>;

    @Field(() => IntWithAggregatesFilter, {nullable:true})
    issue_id?: IntWithAggregatesFilter;

    @Field(() => IntWithAggregatesFilter, {nullable:true})
    issue_code?: IntWithAggregatesFilter;

    @Field(() => IntWithAggregatesFilter, {nullable:true})
    project_id?: IntWithAggregatesFilter;

    @Field(() => IntNullableWithAggregatesFilter, {nullable:true})
    contributor_id?: IntNullableWithAggregatesFilter;

    @Field(() => IntNullableWithAggregatesFilter, {nullable:true})
    sprint_id?: IntNullableWithAggregatesFilter;

    @Field(() => IntNullableWithAggregatesFilter, {nullable:true})
    status?: IntNullableWithAggregatesFilter;

    @Field(() => DateTimeNullableWithAggregatesFilter, {nullable:true})
    start_date?: DateTimeNullableWithAggregatesFilter;

    @Field(() => DateTimeNullableWithAggregatesFilter, {nullable:true})
    end_date?: DateTimeNullableWithAggregatesFilter;

    @Field(() => DateTimeNullableWithAggregatesFilter, {nullable:true})
    complete_date?: DateTimeNullableWithAggregatesFilter;

    @HideField()
    created_at?: DateTimeWithAggregatesFilter;

    @HideField()
    updated_at?: DateTimeWithAggregatesFilter;
}
