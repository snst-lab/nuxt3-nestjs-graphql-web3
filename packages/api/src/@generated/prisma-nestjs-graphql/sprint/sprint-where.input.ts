import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntFilter } from '../prisma/int-filter.input';
import { StringNullableFilter } from '../prisma/string-nullable-filter.input';
import { DateTimeNullableFilter } from '../prisma/date-time-nullable-filter.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';
import { HideField } from '@nestjs/graphql';

@InputType()
export class SprintWhereInput {

    @Field(() => [SprintWhereInput], {nullable:true})
    AND?: Array<SprintWhereInput>;

    @Field(() => [SprintWhereInput], {nullable:true})
    OR?: Array<SprintWhereInput>;

    @Field(() => [SprintWhereInput], {nullable:true})
    NOT?: Array<SprintWhereInput>;

    @Field(() => IntFilter, {nullable:true})
    sprint_id?: IntFilter;

    @Field(() => IntFilter, {nullable:true})
    sprint_code?: IntFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    sprint_name?: StringNullableFilter;

    @Field(() => DateTimeNullableFilter, {nullable:true})
    start_date?: DateTimeNullableFilter;

    @Field(() => DateTimeNullableFilter, {nullable:true})
    end_date?: DateTimeNullableFilter;

    @Field(() => IntFilter, {nullable:true})
    service_id?: IntFilter;

    @HideField()
    created_at?: DateTimeFilter;

    @HideField()
    updated_at?: DateTimeFilter;
}
