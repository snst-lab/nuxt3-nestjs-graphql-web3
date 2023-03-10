import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { VoterUpdateInput } from './voter-update.input';
import { Type } from 'class-transformer';
import { VoterWhereUniqueInput } from './voter-where-unique.input';

@ArgsType()
export class UpdateOneVoterArgs {

    @Field(() => VoterUpdateInput, {nullable:false})
    @Type(() => VoterUpdateInput)
    data!: VoterUpdateInput;

    @Field(() => VoterWhereUniqueInput, {nullable:false})
    @Type(() => VoterWhereUniqueInput)
    where!: VoterWhereUniqueInput;
}
