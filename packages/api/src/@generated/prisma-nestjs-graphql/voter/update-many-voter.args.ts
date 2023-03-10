import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { VoterUpdateManyMutationInput } from './voter-update-many-mutation.input';
import { Type } from 'class-transformer';
import { VoterWhereInput } from './voter-where.input';

@ArgsType()
export class UpdateManyVoterArgs {

    @Field(() => VoterUpdateManyMutationInput, {nullable:false})
    @Type(() => VoterUpdateManyMutationInput)
    data!: VoterUpdateManyMutationInput;

    @Field(() => VoterWhereInput, {nullable:true})
    @Type(() => VoterWhereInput)
    where?: VoterWhereInput;
}
