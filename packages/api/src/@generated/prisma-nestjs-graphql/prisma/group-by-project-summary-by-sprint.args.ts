import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Project_summary_by_sprintWhereInput } from '../project-summary-by-sprint/project-summary-by-sprint-where.input';
import { Type } from 'class-transformer';
import { Project_summary_by_sprintOrderByWithAggregationInput } from '../project-summary-by-sprint/project-summary-by-sprint-order-by-with-aggregation.input';
import { Project_summary_by_sprintScalarFieldEnum } from '../project-summary-by-sprint/project-summary-by-sprint-scalar-field.enum';
import { Project_summary_by_sprintScalarWhereWithAggregatesInput } from '../project-summary-by-sprint/project-summary-by-sprint-scalar-where-with-aggregates.input';
import { Int } from '@nestjs/graphql';

@ArgsType()
export class GroupByProjectSummaryBySprintArgs {

    @Field(() => Project_summary_by_sprintWhereInput, {nullable:true})
    @Type(() => Project_summary_by_sprintWhereInput)
    where?: Project_summary_by_sprintWhereInput;

    @Field(() => [Project_summary_by_sprintOrderByWithAggregationInput], {nullable:true})
    orderBy?: Array<Project_summary_by_sprintOrderByWithAggregationInput>;

    @Field(() => [Project_summary_by_sprintScalarFieldEnum], {nullable:false})
    by!: Array<keyof typeof Project_summary_by_sprintScalarFieldEnum>;

    @Field(() => Project_summary_by_sprintScalarWhereWithAggregatesInput, {nullable:true})
    having?: Project_summary_by_sprintScalarWhereWithAggregatesInput;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;
}
