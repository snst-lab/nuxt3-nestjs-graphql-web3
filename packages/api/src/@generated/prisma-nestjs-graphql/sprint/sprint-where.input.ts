import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntFilter } from '../prisma/int-filter.input';
import { StringFilter } from '../prisma/string-filter.input';
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

    @Field(() => StringFilter, {nullable:true})
    sprint_name?: StringFilter;

    @Field(() => DateTimeFilter, {nullable:true})
    start_date?: DateTimeFilter;

    @Field(() => DateTimeFilter, {nullable:true})
    end_date?: DateTimeFilter;

    @Field(() => IntFilter, {nullable:true})
    service_id?: IntFilter;

    @HideField()
    created_at?: DateTimeFilter;

    @HideField()
    updated_at?: DateTimeFilter;
}
