import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { HideField } from '@nestjs/graphql';

@InputType()
export class UserCountOrderByAggregateInput {

    @Field(() => SortOrder, {nullable:true})
    id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    user_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    auth_type?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    email?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    social_id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    name?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    last_name?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    first_name?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    tel?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    zip1?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    zip2?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    address1?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    address2?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    address3?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    address4?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    password?: keyof typeof SortOrder;

    @HideField()
    createdAt?: keyof typeof SortOrder;

    @HideField()
    updatedAt?: keyof typeof SortOrder;
}
