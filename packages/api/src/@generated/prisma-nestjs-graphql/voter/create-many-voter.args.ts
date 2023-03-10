import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { VoterCreateManyInput } from './voter-create-many.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateManyVoterArgs {

    @Field(() => [VoterCreateManyInput], {nullable:false})
    @Type(() => VoterCreateManyInput)
    data!: Array<VoterCreateManyInput>;

    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}
