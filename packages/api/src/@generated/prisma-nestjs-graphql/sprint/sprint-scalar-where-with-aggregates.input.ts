import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntWithAggregatesFilter } from '../prisma/int-with-aggregates-filter.input';
import { StringNullableWithAggregatesFilter } from '../prisma/string-nullable-with-aggregates-filter.input';
import { DateTimeNullableWithAggregatesFilter } from '../prisma/date-time-nullable-with-aggregates-filter.input';
import { DateTimeWithAggregatesFilter } from '../prisma/date-time-with-aggregates-filter.input';
import { HideField } from '@nestjs/graphql';

@InputType()
export class SprintScalarWhereWithAggregatesInput {

    @Field(() => [SprintScalarWhereWithAggregatesInput], {nullable:true})
    AND?: Array<SprintScalarWhereWithAggregatesInput>;

    @Field(() => [SprintScalarWhereWithAggregatesInput], {nullable:true})
    OR?: Array<SprintScalarWhereWithAggregatesInput>;

    @Field(() => [SprintScalarWhereWithAggregatesInput], {nullable:true})
    NOT?: Array<SprintScalarWhereWithAggregatesInput>;

    @Field(() => IntWithAggregatesFilter, {nullable:true})
    sprint_id?: IntWithAggregatesFilter;

    @Field(() => IntWithAggregatesFilter, {nullable:true})
    sprint_code?: IntWithAggregatesFilter;

    @Field(() => StringNullableWithAggregatesFilter, {nullable:true})
    sprint_name?: StringNullableWithAggregatesFilter;

    @Field(() => DateTimeNullableWithAggregatesFilter, {nullable:true})
    start_date?: DateTimeNullableWithAggregatesFilter;

    @Field(() => DateTimeNullableWithAggregatesFilter, {nullable:true})
    end_date?: DateTimeNullableWithAggregatesFilter;

    @Field(() => IntWithAggregatesFilter, {nullable:true})
    service_id?: IntWithAggregatesFilter;

    @HideField()
    created_at?: DateTimeWithAggregatesFilter;

    @HideField()
    updated_at?: DateTimeWithAggregatesFilter;
}
