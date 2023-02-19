import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ResetUncheckedUpdateInput } from './reset-unchecked-update.input';
import { Type } from 'class-transformer';
import { ResetWhereUniqueInput } from './reset-where-unique.input';

@ArgsType()
export class UpdateOneResetArgs {

    @Field(() => ResetUncheckedUpdateInput, {nullable:false})
    @Type(() => ResetUncheckedUpdateInput)
    data!: ResetUncheckedUpdateInput;

    @Field(() => ResetWhereUniqueInput, {nullable:false})
    @Type(() => ResetWhereUniqueInput)
    where!: ResetWhereUniqueInput;
}
