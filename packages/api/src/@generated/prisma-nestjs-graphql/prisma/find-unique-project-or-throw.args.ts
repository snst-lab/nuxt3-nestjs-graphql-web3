import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ProjectWhereUniqueInput } from '../project/project-where-unique.input';
import { Type } from 'class-transformer';

@ArgsType()
export class FindUniqueProjectOrThrowArgs {

    @Field(() => ProjectWhereUniqueInput, {nullable:false})
    @Type(() => ProjectWhereUniqueInput)
    where!: ProjectWhereUniqueInput;
}
