import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { VoterWhereUniqueInput } from './voter-where-unique.input';
import { Type } from 'class-transformer';
import { VoterCreateInput } from './voter-create.input';
import { VoterUpdateInput } from './voter-update.input';

@ArgsType()
export class UpsertOneVoterArgs {

    @Field(() => VoterWhereUniqueInput, {nullable:false})
    @Type(() => VoterWhereUniqueInput)
    where!: VoterWhereUniqueInput;

    @Field(() => VoterCreateInput, {nullable:false})
    @Type(() => VoterCreateInput)
    create!: VoterCreateInput;

    @Field(() => VoterUpdateInput, {nullable:false})
    @Type(() => VoterUpdateInput)
    update!: VoterUpdateInput;
}
