import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { HideField } from '@nestjs/graphql';

@InputType()
export class ContributorOrderByWithRelationInput {

    @Field(() => SortOrder, {nullable:true})
    contributor_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    contributor_code?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    name?: keyof typeof SortOrder;

    @HideField()
    created_at?: keyof typeof SortOrder;

    @HideField()
    updated_at?: keyof typeof SortOrder;
}
