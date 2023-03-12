import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntFilter } from '../prisma/int-filter.input';
import { FloatFilter } from '../prisma/float-filter.input';
import { DateTimeNullableFilter } from '../prisma/date-time-nullable-filter.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';
import { HideField } from '@nestjs/graphql';

@InputType()
export class Project_detailWhereInput {

    @Field(() => [Project_detailWhereInput], {nullable:true})
    AND?: Array<Project_detailWhereInput>;

    @Field(() => [Project_detailWhereInput], {nullable:true})
    OR?: Array<Project_detailWhereInput>;

    @Field(() => [Project_detailWhereInput], {nullable:true})
    NOT?: Array<Project_detailWhereInput>;

    @Field(() => IntFilter, {nullable:true})
    index?: IntFilter;

    @Field(() => IntFilter, {nullable:true})
    project_id?: IntFilter;

    @Field(() => IntFilter, {nullable:true})
    service_id?: IntFilter;

    @Field(() => IntFilter, {nullable:true})
    project_code?: IntFilter;

    @Field(() => IntFilter, {nullable:true})
    ticket_count_total?: IntFilter;

    @Field(() => IntFilter, {nullable:true})
    ticket_count_closed?: IntFilter;

    @Field(() => FloatFilter, {nullable:true})
    sum_project_amount?: FloatFilter;

    @Field(() => IntFilter, {nullable:true})
    credit_amount?: IntFilter;

    @Field(() => IntFilter, {nullable:true})
    carry_over_balance?: IntFilter;

    @Field(() => IntFilter, {nullable:true})
    price_coefficient?: IntFilter;

    @Field(() => DateTimeNullableFilter, {nullable:true})
    campaign_deadline?: DateTimeNullableFilter;

    @Field(() => DateTimeNullableFilter, {nullable:true})
    fundraising_deadline?: DateTimeNullableFilter;

    @HideField()
    created_at?: DateTimeFilter;

    @HideField()
    updated_at?: DateTimeFilter;
}
