import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntWithAggregatesFilter } from '../prisma/int-with-aggregates-filter.input';
import { StringWithAggregatesFilter } from '../prisma/string-with-aggregates-filter.input';
import { DateTimeWithAggregatesFilter } from '../prisma/date-time-with-aggregates-filter.input';
import { HideField } from '@nestjs/graphql';

@InputType()
export class ContributorScalarWhereWithAggregatesInput {

    @Field(() => [ContributorScalarWhereWithAggregatesInput], {nullable:true})
    AND?: Array<ContributorScalarWhereWithAggregatesInput>;

    @Field(() => [ContributorScalarWhereWithAggregatesInput], {nullable:true})
    OR?: Array<ContributorScalarWhereWithAggregatesInput>;

    @Field(() => [ContributorScalarWhereWithAggregatesInput], {nullable:true})
    NOT?: Array<ContributorScalarWhereWithAggregatesInput>;

    @Field(() => IntWithAggregatesFilter, {nullable:true})
    contributor_id?: IntWithAggregatesFilter;

    @Field(() => StringWithAggregatesFilter, {nullable:true})
    contributor_code?: StringWithAggregatesFilter;

    @Field(() => StringWithAggregatesFilter, {nullable:true})
    name?: StringWithAggregatesFilter;

    @HideField()
    created_at?: DateTimeWithAggregatesFilter;

    @HideField()
    updated_at?: DateTimeWithAggregatesFilter;
}
