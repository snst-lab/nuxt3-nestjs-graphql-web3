import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntFilter } from '../prisma/int-filter.input';
import { StringFilter } from '../prisma/string-filter.input';
import { FloatFilter } from '../prisma/float-filter.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';
import { HideField } from '@nestjs/graphql';

@InputType()
export class Project_ledgerWhereInput {

    @Field(() => [Project_ledgerWhereInput], {nullable:true})
    AND?: Array<Project_ledgerWhereInput>;

    @Field(() => [Project_ledgerWhereInput], {nullable:true})
    OR?: Array<Project_ledgerWhereInput>;

    @Field(() => [Project_ledgerWhereInput], {nullable:true})
    NOT?: Array<Project_ledgerWhereInput>;

    @Field(() => IntFilter, {nullable:true})
    index?: IntFilter;

    @Field(() => StringFilter, {nullable:true})
    contributor_code?: StringFilter;

    @Field(() => IntFilter, {nullable:true})
    project_id?: IntFilter;

    @Field(() => IntFilter, {nullable:true})
    target?: IntFilter;

    @Field(() => FloatFilter, {nullable:true})
    income?: FloatFilter;

    @Field(() => FloatFilter, {nullable:true})
    expense?: FloatFilter;

    @HideField()
    created_at?: DateTimeFilter;

    @HideField()
    updated_at?: DateTimeFilter;
}
