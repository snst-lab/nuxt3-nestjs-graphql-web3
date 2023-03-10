import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { HideField } from '@nestjs/graphql';

@InputType()
export class AddressCardMinAggregateInput {

    @Field(() => Boolean, {nullable:true})
    id?: true;

    @Field(() => Boolean, {nullable:true})
    merchant_id?: true;

    @Field(() => Boolean, {nullable:true})
    auth_type?: true;

    @Field(() => Boolean, {nullable:true})
    social_id?: true;

    @Field(() => Boolean, {nullable:true})
    email?: true;

    @Field(() => Boolean, {nullable:true})
    evm_address?: true;

    @HideField()
    createdAt?: true;

    @HideField()
    updatedAt?: true;
}
