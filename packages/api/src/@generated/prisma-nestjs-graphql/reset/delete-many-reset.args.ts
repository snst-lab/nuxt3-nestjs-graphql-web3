import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ResetWhereInput } from './reset-where.input';
import { Type } from 'class-transformer';

@ArgsType()
export class DeleteManyResetArgs {

    @Field(() => ResetWhereInput, {nullable:true})
    @Type(() => ResetWhereInput)
    where?: ResetWhereInput;
}
