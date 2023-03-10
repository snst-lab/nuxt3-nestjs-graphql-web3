import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntWithAggregatesFilter } from '../prisma/int-with-aggregates-filter.input';
import { FloatWithAggregatesFilter } from '../prisma/float-with-aggregates-filter.input';
import { DateTimeWithAggregatesFilter } from '../prisma/date-time-with-aggregates-filter.input';
import { HideField } from '@nestjs/graphql';

@InputType()
export class Project_summary_by_sprintScalarWhereWithAggregatesInput {

    @Field(() => [Project_summary_by_sprintScalarWhereWithAggregatesInput], {nullable:true})
    AND?: Array<Project_summary_by_sprintScalarWhereWithAggregatesInput>;

    @Field(() => [Project_summary_by_sprintScalarWhereWithAggregatesInput], {nullable:true})
    OR?: Array<Project_summary_by_sprintScalarWhereWithAggregatesInput>;

    @Field(() => [Project_summary_by_sprintScalarWhereWithAggregatesInput], {nullable:true})
    NOT?: Array<Project_summary_by_sprintScalarWhereWithAggregatesInput>;

    @Field(() => IntWithAggregatesFilter, {nullable:true})
    index?: IntWithAggregatesFilter;

    @Field(() => IntWithAggregatesFilter, {nullable:true})
    project_id?: IntWithAggregatesFilter;

    @Field(() => IntWithAggregatesFilter, {nullable:true})
    sprint_id?: IntWithAggregatesFilter;

    @Field(() => FloatWithAggregatesFilter, {nullable:true})
    project_amount?: FloatWithAggregatesFilter;

    @HideField()
    created_at?: DateTimeWithAggregatesFilter;

    @HideField()
    updated_at?: DateTimeWithAggregatesFilter;
}
