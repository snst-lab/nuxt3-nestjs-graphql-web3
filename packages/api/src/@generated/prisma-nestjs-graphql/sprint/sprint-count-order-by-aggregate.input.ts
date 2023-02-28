import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { HideField } from '@nestjs/graphql';

@InputType()
export class SprintCountOrderByAggregateInput {

    @Field(() => SortOrder, {nullable:true})
    sprint_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    sprint_code?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    sprint_name?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    start_date?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    end_date?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    service_id?: keyof typeof SortOrder;

    @HideField()
    created_at?: keyof typeof SortOrder;

    @HideField()
    updated_at?: keyof typeof SortOrder;
}
