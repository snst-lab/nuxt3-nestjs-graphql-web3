import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntWithAggregatesFilter } from '../prisma/int-with-aggregates-filter.input';
import { StringNullableWithAggregatesFilter } from '../prisma/string-nullable-with-aggregates-filter.input';
import { FloatNullableWithAggregatesFilter } from '../prisma/float-nullable-with-aggregates-filter.input';

@InputType()
export class VoterScalarWhereWithAggregatesInput {

    @Field(() => [VoterScalarWhereWithAggregatesInput], {nullable:true})
    AND?: Array<VoterScalarWhereWithAggregatesInput>;

    @Field(() => [VoterScalarWhereWithAggregatesInput], {nullable:true})
    OR?: Array<VoterScalarWhereWithAggregatesInput>;

    @Field(() => [VoterScalarWhereWithAggregatesInput], {nullable:true})
    NOT?: Array<VoterScalarWhereWithAggregatesInput>;

    @Field(() => IntWithAggregatesFilter, {nullable:true})
    id?: IntWithAggregatesFilter;

    @Field(() => StringNullableWithAggregatesFilter, {nullable:true})
    name?: StringNullableWithAggregatesFilter;

    @Field(() => StringNullableWithAggregatesFilter, {nullable:true})
    evm_address?: StringNullableWithAggregatesFilter;

    @Field(() => StringNullableWithAggregatesFilter, {nullable:true})
    secret?: StringNullableWithAggregatesFilter;

    @Field(() => FloatNullableWithAggregatesFilter, {nullable:true})
    token_balance?: FloatNullableWithAggregatesFilter;

    @Field(() => FloatNullableWithAggregatesFilter, {nullable:true})
    max_voteable?: FloatNullableWithAggregatesFilter;

    @Field(() => FloatNullableWithAggregatesFilter, {nullable:true})
    pending_airdrop?: FloatNullableWithAggregatesFilter;

    @Field(() => FloatNullableWithAggregatesFilter, {nullable:true})
    pending_reconcile?: FloatNullableWithAggregatesFilter;
}
