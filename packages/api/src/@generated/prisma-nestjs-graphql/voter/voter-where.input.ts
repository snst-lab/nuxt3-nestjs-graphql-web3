import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntFilter } from '../prisma/int-filter.input';
import { IntNullableFilter } from '../prisma/int-nullable-filter.input';
import { StringNullableFilter } from '../prisma/string-nullable-filter.input';
import { FloatNullableFilter } from '../prisma/float-nullable-filter.input';

@InputType()
export class VoterWhereInput {

    @Field(() => [VoterWhereInput], {nullable:true})
    AND?: Array<VoterWhereInput>;

    @Field(() => [VoterWhereInput], {nullable:true})
    OR?: Array<VoterWhereInput>;

    @Field(() => [VoterWhereInput], {nullable:true})
    NOT?: Array<VoterWhereInput>;

    @Field(() => IntFilter, {nullable:true})
    id?: IntFilter;

    @Field(() => IntNullableFilter, {nullable:true})
    project_id?: IntNullableFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    name?: StringNullableFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    evm_address?: StringNullableFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    secret?: StringNullableFilter;

    @Field(() => FloatNullableFilter, {nullable:true})
    max_voteable?: FloatNullableFilter;

    @Field(() => FloatNullableFilter, {nullable:true})
    pending_airdrop?: FloatNullableFilter;

    @Field(() => FloatNullableFilter, {nullable:true})
    pending_reconcile?: FloatNullableFilter;

    @Field(() => IntNullableFilter, {nullable:true})
    mock_follow_project_id?: IntNullableFilter;

    @Field(() => FloatNullableFilter, {nullable:true})
    reward?: FloatNullableFilter;
}
