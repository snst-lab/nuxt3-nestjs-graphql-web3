import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ResetUncheckedUpdateManyInput } from './reset-unchecked-update-many.input';
import { Type } from 'class-transformer';
import { ResetWhereInput } from './reset-where.input';

@ArgsType()
export class UpdateManyResetArgs {

    @Field(() => ResetUncheckedUpdateManyInput, {nullable:false})
    @Type(() => ResetUncheckedUpdateManyInput)
    data!: ResetUncheckedUpdateManyInput;

    @Field(() => ResetWhereInput, {nullable:true})
    @Type(() => ResetWhereInput)
    where?: ResetWhereInput;
}
