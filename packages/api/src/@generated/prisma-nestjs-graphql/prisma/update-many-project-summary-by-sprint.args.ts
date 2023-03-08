import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Project_summary_by_sprintUpdateManyMutationInput } from '../project-summary-by-sprint/project-summary-by-sprint-update-many-mutation.input';
import { Type } from 'class-transformer';
import { Project_summary_by_sprintWhereInput } from '../project-summary-by-sprint/project-summary-by-sprint-where.input';

@ArgsType()
export class UpdateManyProjectSummaryBySprintArgs {

    @Field(() => Project_summary_by_sprintUpdateManyMutationInput, {nullable:false})
    @Type(() => Project_summary_by_sprintUpdateManyMutationInput)
    data!: Project_summary_by_sprintUpdateManyMutationInput;

    @Field(() => Project_summary_by_sprintWhereInput, {nullable:true})
    @Type(() => Project_summary_by_sprintWhereInput)
    where?: Project_summary_by_sprintWhereInput;
}
