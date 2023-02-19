import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntWithAggregatesFilter } from '../prisma/int-with-aggregates-filter.input';

@InputType()
export class ResetScalarWhereWithAggregatesInput {

    @Field(() => [ResetScalarWhereWithAggregatesInput], {nullable:true})
    AND?: Array<ResetScalarWhereWithAggregatesInput>;

    @Field(() => [ResetScalarWhereWithAggregatesInput], {nullable:true})
    OR?: Array<ResetScalarWhereWithAggregatesInput>;

    @Field(() => [ResetScalarWhereWithAggregatesInput], {nullable:true})
    NOT?: Array<ResetScalarWhereWithAggregatesInput>;

    @Field(() => IntWithAggregatesFilter, {nullable:true})
    id?: IntWithAggregatesFilter;
}
