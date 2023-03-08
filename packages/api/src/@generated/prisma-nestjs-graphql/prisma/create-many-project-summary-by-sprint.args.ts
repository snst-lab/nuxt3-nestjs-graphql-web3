import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Project_summary_by_sprintCreateManyInput } from '../project-summary-by-sprint/project-summary-by-sprint-create-many.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateManyProjectSummaryBySprintArgs {

    @Field(() => [Project_summary_by_sprintCreateManyInput], {nullable:false})
    @Type(() => Project_summary_by_sprintCreateManyInput)
    data!: Array<Project_summary_by_sprintCreateManyInput>;

    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}
