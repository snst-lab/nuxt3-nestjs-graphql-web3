import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { VoterWhereUniqueInput } from './voter-where-unique.input';
import { Type } from 'class-transformer';

@ArgsType()
export class FindUniqueVoterArgs {

    @Field(() => VoterWhereUniqueInput, {nullable:false})
    @Type(() => VoterWhereUniqueInput)
    where!: VoterWhereUniqueInput;
}
