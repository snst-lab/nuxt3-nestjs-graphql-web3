import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Project_summary_by_sprintWhereUniqueInput } from '../project-summary-by-sprint/project-summary-by-sprint-where-unique.input';
import { Type } from 'class-transformer';

@ArgsType()
export class FindUniqueProjectSummaryBySprintArgs {

    @Field(() => Project_summary_by_sprintWhereUniqueInput, {nullable:false})
    @Type(() => Project_summary_by_sprintWhereUniqueInput)
    where!: Project_summary_by_sprintWhereUniqueInput;
}
