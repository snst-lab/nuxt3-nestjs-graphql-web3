import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ResetWhereUniqueInput } from '../reset/reset-where-unique.input';
import { Type } from 'class-transformer';

@ArgsType()
export class FindUniqueResetOrThrowArgs {

    @Field(() => ResetWhereUniqueInput, {nullable:false})
    @Type(() => ResetWhereUniqueInput)
    where!: ResetWhereUniqueInput;
}
