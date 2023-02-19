import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ResetWhereUniqueInput } from './reset-where-unique.input';
import { Type } from 'class-transformer';

@ArgsType()
export class DeleteOneResetArgs {

    @Field(() => ResetWhereUniqueInput, {nullable:false})
    @Type(() => ResetWhereUniqueInput)
    where!: ResetWhereUniqueInput;
}
