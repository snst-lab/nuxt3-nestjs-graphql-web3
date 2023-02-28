import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { SprintWhereUniqueInput } from '../sprint/sprint-where-unique.input';
import { Type } from 'class-transformer';

@ArgsType()
export class FindUniqueSprintOrThrowArgs {

    @Field(() => SprintWhereUniqueInput, {nullable:false})
    @Type(() => SprintWhereUniqueInput)
    where!: SprintWhereUniqueInput;
}
