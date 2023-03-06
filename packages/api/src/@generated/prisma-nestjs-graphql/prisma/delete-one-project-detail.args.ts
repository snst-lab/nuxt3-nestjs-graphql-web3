import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Project_detailWhereUniqueInput } from '../project-detail/project-detail-where-unique.input';
import { Type } from 'class-transformer';

@ArgsType()
export class DeleteOneProjectDetailArgs {

    @Field(() => Project_detailWhereUniqueInput, {nullable:false})
    @Type(() => Project_detailWhereUniqueInput)
    where!: Project_detailWhereUniqueInput;
}
