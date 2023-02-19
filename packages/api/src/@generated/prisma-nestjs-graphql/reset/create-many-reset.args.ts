import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ResetCreateManyInput } from './reset-create-many.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateManyResetArgs {

    @Field(() => [ResetCreateManyInput], {nullable:false})
    @Type(() => ResetCreateManyInput)
    data!: Array<ResetCreateManyInput>;

    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}
