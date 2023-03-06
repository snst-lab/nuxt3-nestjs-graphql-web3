import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Project_detailUpdateInput } from '../project-detail/project-detail-update.input';
import { Type } from 'class-transformer';
import { Project_detailWhereUniqueInput } from '../project-detail/project-detail-where-unique.input';

@ArgsType()
export class UpdateOneProjectDetailArgs {

    @Field(() => Project_detailUpdateInput, {nullable:false})
    @Type(() => Project_detailUpdateInput)
    data!: Project_detailUpdateInput;

    @Field(() => Project_detailWhereUniqueInput, {nullable:false})
    @Type(() => Project_detailWhereUniqueInput)
    where!: Project_detailWhereUniqueInput;
}
