import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { VoterWhereInput } from './voter-where.input';
import { Type } from 'class-transformer';

@ArgsType()
export class DeleteManyVoterArgs {

    @Field(() => VoterWhereInput, {nullable:true})
    @Type(() => VoterWhereInput)
    where?: VoterWhereInput;
}
