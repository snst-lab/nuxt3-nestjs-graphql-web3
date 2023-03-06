import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Project_detailCreateInput } from '../project-detail/project-detail-create.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateOneProjectDetailArgs {

    @Field(() => Project_detailCreateInput, {nullable:false})
    @Type(() => Project_detailCreateInput)
    data!: Project_detailCreateInput;
}
