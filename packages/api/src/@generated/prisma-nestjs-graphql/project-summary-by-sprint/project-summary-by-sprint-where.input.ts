import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntFilter } from '../prisma/int-filter.input';
import { FloatFilter } from '../prisma/float-filter.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';
import { HideField } from '@nestjs/graphql';

@InputType()
export class Project_summary_by_sprintWhereInput {

    @Field(() => [Project_summary_by_sprintWhereInput], {nullable:true})
    AND?: Array<Project_summary_by_sprintWhereInput>;

    @Field(() => [Project_summary_by_sprintWhereInput], {nullable:true})
    OR?: Array<Project_summary_by_sprintWhereInput>;

    @Field(() => [Project_summary_by_sprintWhereInput], {nullable:true})
    NOT?: Array<Project_summary_by_sprintWhereInput>;

    @Field(() => IntFilter, {nullable:true})
    index?: IntFilter;

    @Field(() => IntFilter, {nullable:true})
    project_id?: IntFilter;

    @Field(() => IntFilter, {nullable:true})
    sprint_id?: IntFilter;

    @Field(() => FloatFilter, {nullable:true})
    project_amount?: FloatFilter;

    @HideField()
    created_at?: DateTimeFilter;

    @HideField()
    updated_at?: DateTimeFilter;
}
