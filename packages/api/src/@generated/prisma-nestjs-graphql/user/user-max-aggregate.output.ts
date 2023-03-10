import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { HideField } from '@nestjs/graphql';

@ObjectType()
export class UserMaxAggregate {

    @Field(() => Int, {nullable:true})
    id?: number;

    @Field(() => String, {nullable:true})
    user_id?: string;

    @Field(() => String, {nullable:true})
    auth_type?: string;

    @Field(() => String, {nullable:true})
    email?: string;

    @Field(() => String, {nullable:true})
    social_id?: string;

    @Field(() => String, {nullable:true})
    name?: string;

    @Field(() => String, {nullable:true})
    last_name?: string;

    @Field(() => String, {nullable:true})
    first_name?: string;

    @Field(() => String, {nullable:true})
    tel?: string;

    @Field(() => String, {nullable:true})
    zip1?: string;

    @Field(() => String, {nullable:true})
    zip2?: string;

    @Field(() => String, {nullable:true})
    address1?: string;

    @Field(() => String, {nullable:true})
    address2?: string;

    @Field(() => String, {nullable:true})
    address3?: string;

    @Field(() => String, {nullable:true})
    address4?: string;

    @HideField()
    password?: string;

    @HideField()
    createdAt?: Date | string;

    @HideField()
    updatedAt?: Date | string;
}
