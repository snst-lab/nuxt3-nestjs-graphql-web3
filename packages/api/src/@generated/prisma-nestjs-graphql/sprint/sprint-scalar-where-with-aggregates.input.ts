import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntWithAggregatesFilter } from '../prisma/int-with-aggregates-filter.input';
import { StringWithAggregatesFilter } from '../prisma/string-with-aggregates-filter.input';
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

    @Field(() => StringWithAggregatesFilter, {nullable:true})
    sprint_name?: StringWithAggregatesFilter;

    @Field(() => DateTimeWithAggregatesFilter, {nullable:true})
    start_date?: DateTimeWithAggregatesFilter;

    @Field(() => DateTimeWithAggregatesFilter, {nullable:true})
    end_date?: DateTimeWithAggregatesFilter;

    @Field(() => IntWithAggregatesFilter, {nullable:true})
    service_id?: IntWithAggregatesFilter;

    @HideField()
    created_at?: DateTimeWithAggregatesFilter;

    @HideField()
    updated_at?: DateTimeWithAggregatesFilter;
}
