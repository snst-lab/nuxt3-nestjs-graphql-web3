import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ResetUncheckedCreateInput } from './reset-unchecked-create.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateOneResetArgs {

    @Field(() => ResetUncheckedCreateInput, {nullable:true})
    @Type(() => ResetUncheckedCreateInput)
    data?: ResetUncheckedCreateInput;
}
