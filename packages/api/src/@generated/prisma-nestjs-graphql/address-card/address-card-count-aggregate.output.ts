import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { HideField } from '@nestjs/graphql';

@ObjectType()
export class AddressCardCountAggregate {

    @Field(() => Int, {nullable:false})
    id!: number;

    @Field(() => Int, {nullable:false})
    merchant_id!: number;

    @Field(() => Int, {nullable:false})
    auth_type!: number;

    @Field(() => Int, {nullable:false})
    social_id!: number;

    @Field(() => Int, {nullable:false})
    email!: number;

    @Field(() => Int, {nullable:false})
    evm_address!: number;

    @HideField()
    createdAt!: number;

    @HideField()
    updatedAt!: number;

    @Field(() => Int, {nullable:false})
    _all!: number;
}
