import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { VoterCreateInput } from './voter-create.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateOneVoterArgs {

    @Field(() => VoterCreateInput, {nullable:false})
    @Type(() => VoterCreateInput)
    data!: VoterCreateInput;
}
