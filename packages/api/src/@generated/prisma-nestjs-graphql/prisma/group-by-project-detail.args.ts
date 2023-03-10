import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Project_detailWhereInput } from '../project-detail/project-detail-where.input';
import { Type } from 'class-transformer';
import { Project_detailOrderByWithAggregationInput } from '../project-detail/project-detail-order-by-with-aggregation.input';
import { Project_detailScalarFieldEnum } from '../project-detail/project-detail-scalar-field.enum';
import { Project_detailScalarWhereWithAggregatesInput } from '../project-detail/project-detail-scalar-where-with-aggregates.input';
import { Int } from '@nestjs/graphql';

@ArgsType()
export class GroupByProjectDetailArgs {

    @Field(() => Project_detailWhereInput, {nullable:true})
    @Type(() => Project_detailWhereInput)
    where?: Project_detailWhereInput;

    @Field(() => [Project_detailOrderByWithAggregationInput], {nullable:true})
    orderBy?: Array<Project_detailOrderByWithAggregationInput>;

    @Field(() => [Project_detailScalarFieldEnum], {nullable:false})
    by!: Array<keyof typeof Project_detailScalarFieldEnum>;

    @Field(() => Project_detailScalarWhereWithAggregatesInput, {nullable:true})
    having?: Project_detailScalarWhereWithAggregatesInput;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;
}
