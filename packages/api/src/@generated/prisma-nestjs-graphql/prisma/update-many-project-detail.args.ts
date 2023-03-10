import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Project_detailUpdateManyMutationInput } from '../project-detail/project-detail-update-many-mutation.input';
import { Type } from 'class-transformer';
import { Project_detailWhereInput } from '../project-detail/project-detail-where.input';

@ArgsType()
export class UpdateManyProjectDetailArgs {

    @Field(() => Project_detailUpdateManyMutationInput, {nullable:false})
    @Type(() => Project_detailUpdateManyMutationInput)
    data!: Project_detailUpdateManyMutationInput;

    @Field(() => Project_detailWhereInput, {nullable:true})
    @Type(() => Project_detailWhereInput)
    where?: Project_detailWhereInput;
}
