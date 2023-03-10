import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Project_detailCreateManyInput } from '../project-detail/project-detail-create-many.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateManyProjectDetailArgs {

    @Field(() => [Project_detailCreateManyInput], {nullable:false})
    @Type(() => Project_detailCreateManyInput)
    data!: Array<Project_detailCreateManyInput>;

    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}
