import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { HideField } from '@nestjs/graphql';

@InputType()
export class AddressCardCreateInput {

    @Field(() => String, {nullable:true})
    merchant_id?: string;

    @Field(() => String, {nullable:true})
    auth_type?: string;

    @Field(() => String, {nullable:true})
    social_id?: string;

    @Field(() => String, {nullable:true})
    email?: string;

    @Field(() => String, {nullable:true})
    evm_address?: string;

    @HideField()
    createdAt?: Date | string;

    @HideField()
    updatedAt?: Date | string;
}
