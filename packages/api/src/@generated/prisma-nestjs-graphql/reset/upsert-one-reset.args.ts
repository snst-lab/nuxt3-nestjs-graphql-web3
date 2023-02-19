import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ResetWhereUniqueInput } from './reset-where-unique.input';
import { Type } from 'class-transformer';
import { ResetUncheckedCreateInput } from './reset-unchecked-create.input';
import { ResetUncheckedUpdateInput } from './reset-unchecked-update.input';

@ArgsType()
export class UpsertOneResetArgs {

    @Field(() => ResetWhereUniqueInput, {nullable:false})
    @Type(() => ResetWhereUniqueInput)
    where!: ResetWhereUniqueInput;

    @Field(() => ResetUncheckedCreateInput, {nullable:false})
    @Type(() => ResetUncheckedCreateInput)
    create!: ResetUncheckedCreateInput;

    @Field(() => ResetUncheckedUpdateInput, {nullable:false})
    @Type(() => ResetUncheckedUpdateInput)
    update!: ResetUncheckedUpdateInput;
}
