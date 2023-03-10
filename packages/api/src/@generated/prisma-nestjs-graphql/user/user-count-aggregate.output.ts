import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { HideField } from '@nestjs/graphql';

@ObjectType()
export class UserCountAggregate {

    @Field(() => Int, {nullable:false})
    id!: number;

    @Field(() => Int, {nullable:false})
    user_id!: number;

    @Field(() => Int, {nullable:false})
    auth_type!: number;

    @Field(() => Int, {nullable:false})
    email!: number;

    @Field(() => Int, {nullable:false})
    social_id!: number;

    @Field(() => Int, {nullable:false})
    name!: number;

    @Field(() => Int, {nullable:false})
    last_name!: number;

    @Field(() => Int, {nullable:false})
    first_name!: number;

    @Field(() => Int, {nullable:false})
    tel!: number;

    @Field(() => Int, {nullable:false})
    zip1!: number;

    @Field(() => Int, {nullable:false})
    zip2!: number;

    @Field(() => Int, {nullable:false})
    address1!: number;

    @Field(() => Int, {nullable:false})
    address2!: number;

    @Field(() => Int, {nullable:false})
    address3!: number;

    @Field(() => Int, {nullable:false})
    address4!: number;

    @HideField()
    password!: number;

    @HideField()
    createdAt!: number;

    @HideField()
    updatedAt!: number;

    @Field(() => Int, {nullable:false})
    _all!: number;
}
