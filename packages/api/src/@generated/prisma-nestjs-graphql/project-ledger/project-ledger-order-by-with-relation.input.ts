import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { HideField } from '@nestjs/graphql';

@InputType()
export class Project_ledgerOrderByWithRelationInput {

    @Field(() => SortOrder, {nullable:true})
    index?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    created_date?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    project_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    target?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    unit?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    income?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    expense?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    review_phase?: keyof typeof SortOrder;

    @HideField()
    created_at?: keyof typeof SortOrder;

    @HideField()
    updated_at?: keyof typeof SortOrder;
}
