import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Project_summary_by_sprintWhereInput } from '../project-summary-by-sprint/project-summary-by-sprint-where.input';
import { Type } from 'class-transformer';
import { Project_summary_by_sprintOrderByWithRelationInput } from '../project-summary-by-sprint/project-summary-by-sprint-order-by-with-relation.input';
import { Project_summary_by_sprintWhereUniqueInput } from '../project-summary-by-sprint/project-summary-by-sprint-where-unique.input';
import { Int } from '@nestjs/graphql';
import { Project_summary_by_sprintScalarFieldEnum } from '../project-summary-by-sprint/project-summary-by-sprint-scalar-field.enum';

@ArgsType()
export class FindFirstProjectSummaryBySprintArgs {

    @Field(() => Project_summary_by_sprintWhereInput, {nullable:true})
    @Type(() => Project_summary_by_sprintWhereInput)
    where?: Project_summary_by_sprintWhereInput;

    @Field(() => [Project_summary_by_sprintOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<Project_summary_by_sprintOrderByWithRelationInput>;

    @Field(() => Project_summary_by_sprintWhereUniqueInput, {nullable:true})
    cursor?: Project_summary_by_sprintWhereUniqueInput;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => [Project_summary_by_sprintScalarFieldEnum], {nullable:true})
    distinct?: Array<keyof typeof Project_summary_by_sprintScalarFieldEnum>;
}
