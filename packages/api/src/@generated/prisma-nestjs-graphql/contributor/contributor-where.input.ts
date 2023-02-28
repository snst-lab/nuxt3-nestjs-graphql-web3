import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntFilter } from '../prisma/int-filter.input';
import { StringFilter } from '../prisma/string-filter.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';
import { HideField } from '@nestjs/graphql';

@InputType()
export class ContributorWhereInput {

    @Field(() => [ContributorWhereInput], {nullable:true})
    AND?: Array<ContributorWhereInput>;

    @Field(() => [ContributorWhereInput], {nullable:true})
    OR?: Array<ContributorWhereInput>;

    @Field(() => [ContributorWhereInput], {nullable:true})
    NOT?: Array<ContributorWhereInput>;

    @Field(() => IntFilter, {nullable:true})
    contributor_id?: IntFilter;

    @Field(() => StringFilter, {nullable:true})
    contributor_code?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    name?: StringFilter;

    @HideField()
    created_at?: DateTimeFilter;

    @HideField()
    updated_at?: DateTimeFilter;
}
