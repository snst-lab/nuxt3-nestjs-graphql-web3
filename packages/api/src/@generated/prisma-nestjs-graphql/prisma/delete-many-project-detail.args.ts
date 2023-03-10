import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Project_detailWhereInput } from '../project-detail/project-detail-where.input';
import { Type } from 'class-transformer';

@ArgsType()
export class DeleteManyProjectDetailArgs {

    @Field(() => Project_detailWhereInput, {nullable:true})
    @Type(() => Project_detailWhereInput)
    where?: Project_detailWhereInput;
}
