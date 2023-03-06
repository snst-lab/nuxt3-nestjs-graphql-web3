import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Project_detailWhereInput } from '../project-detail/project-detail-where.input';
import { Type } from 'class-transformer';
import { Project_detailOrderByWithRelationInput } from '../project-detail/project-detail-order-by-with-relation.input';
import { Project_detailWhereUniqueInput } from '../project-detail/project-detail-where-unique.input';
import { Int } from '@nestjs/graphql';
import { Project_detailScalarFieldEnum } from '../project-detail/project-detail-scalar-field.enum';

@ArgsType()
export class FindFirstProjectDetailArgs {

    @Field(() => Project_detailWhereInput, {nullable:true})
    @Type(() => Project_detailWhereInput)
    where?: Project_detailWhereInput;

    @Field(() => [Project_detailOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<Project_detailOrderByWithRelationInput>;

    @Field(() => Project_detailWhereUniqueInput, {nullable:true})
    cursor?: Project_detailWhereUniqueInput;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => [Project_detailScalarFieldEnum], {nullable:true})
    distinct?: Array<keyof typeof Project_detailScalarFieldEnum>;
}
