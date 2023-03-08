import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Project_summary_by_sprintWhereUniqueInput } from '../project-summary-by-sprint/project-summary-by-sprint-where-unique.input';
import { Type } from 'class-transformer';
import { Project_summary_by_sprintCreateInput } from '../project-summary-by-sprint/project-summary-by-sprint-create.input';
import { Project_summary_by_sprintUpdateInput } from '../project-summary-by-sprint/project-summary-by-sprint-update.input';

@ArgsType()
export class UpsertOneProjectSummaryBySprintArgs {

    @Field(() => Project_summary_by_sprintWhereUniqueInput, {nullable:false})
    @Type(() => Project_summary_by_sprintWhereUniqueInput)
    where!: Project_summary_by_sprintWhereUniqueInput;

    @Field(() => Project_summary_by_sprintCreateInput, {nullable:false})
    @Type(() => Project_summary_by_sprintCreateInput)
    create!: Project_summary_by_sprintCreateInput;

    @Field(() => Project_summary_by_sprintUpdateInput, {nullable:false})
    @Type(() => Project_summary_by_sprintUpdateInput)
    update!: Project_summary_by_sprintUpdateInput;
}
