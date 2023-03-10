import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { HideField } from '@nestjs/graphql';

@ObjectType()
export class AddressCard {

    @Field(() => ID, {nullable:false})
    id!: number;

    @Field(() => String, {nullable:false,defaultValue:'000000000000'})
    merchant_id!: string;

    @Field(() => String, {nullable:false,defaultValue:'email'})
    auth_type!: string;

    @Field(() => String, {nullable:false,defaultValue:''})
    social_id!: string;

    @Field(() => String, {nullable:false,defaultValue:''})
    email!: string;

    @Field(() => String, {nullable:false,defaultValue:''})
    evm_address!: string;

    @HideField()
    createdAt!: Date;

    @HideField()
    updatedAt!: Date;
}
