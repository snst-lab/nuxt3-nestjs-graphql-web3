import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { VoterWhereUniqueInput } from '../voter/voter-where-unique.input';
import { Type } from 'class-transformer';

@ArgsType()
export class FindUniqueVoterOrThrowArgs {

    @Field(() => VoterWhereUniqueInput, {nullable:false})
    @Type(() => VoterWhereUniqueInput)
    where!: VoterWhereUniqueInput;
}
