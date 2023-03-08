import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Project_summary_by_sprintWhereInput } from '../project-summary-by-sprint/project-summary-by-sprint-where.input';
import { Type } from 'class-transformer';

@ArgsType()
export class DeleteManyProjectSummaryBySprintArgs {

    @Field(() => Project_summary_by_sprintWhereInput, {nullable:true})
    @Type(() => Project_summary_by_sprintWhereInput)
    where?: Project_summary_by_sprintWhereInput;
}
