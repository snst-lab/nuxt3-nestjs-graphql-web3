import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Project_summary_by_sprintCreateInput } from '../project-summary-by-sprint/project-summary-by-sprint-create.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateOneProjectSummaryBySprintArgs {

    @Field(() => Project_summary_by_sprintCreateInput, {nullable:false})
    @Type(() => Project_summary_by_sprintCreateInput)
    data!: Project_summary_by_sprintCreateInput;
}
