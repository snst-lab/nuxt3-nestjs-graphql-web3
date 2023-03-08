import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Project_summary_by_sprintUpdateInput } from '../project-summary-by-sprint/project-summary-by-sprint-update.input';
import { Type } from 'class-transformer';
import { Project_summary_by_sprintWhereUniqueInput } from '../project-summary-by-sprint/project-summary-by-sprint-where-unique.input';

@ArgsType()
export class UpdateOneProjectSummaryBySprintArgs {

    @Field(() => Project_summary_by_sprintUpdateInput, {nullable:false})
    @Type(() => Project_summary_by_sprintUpdateInput)
    data!: Project_summary_by_sprintUpdateInput;

    @Field(() => Project_summary_by_sprintWhereUniqueInput, {nullable:false})
    @Type(() => Project_summary_by_sprintWhereUniqueInput)
    where!: Project_summary_by_sprintWhereUniqueInput;
}
