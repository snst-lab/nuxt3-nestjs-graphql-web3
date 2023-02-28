import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { SprintWhereUniqueInput } from './sprint-where-unique.input';
import { Type } from 'class-transformer';

@ArgsType()
export class FindUniqueSprintArgs {

    @Field(() => SprintWhereUniqueInput, {nullable:false})
    @Type(() => SprintWhereUniqueInput)
    where!: SprintWhereUniqueInput;
}
