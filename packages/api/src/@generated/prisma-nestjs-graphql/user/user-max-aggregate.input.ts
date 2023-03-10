import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { HideField } from '@nestjs/graphql';

@InputType()
export class UserMaxAggregateInput {

    @Field(() => Boolean, {nullable:true})
    id?: true;

    @Field(() => Boolean, {nullable:true})
    user_id?: true;

    @Field(() => Boolean, {nullable:true})
    auth_type?: true;

    @Field(() => Boolean, {nullable:true})
    email?: true;

    @Field(() => Boolean, {nullable:true})
    social_id?: true;

    @Field(() => Boolean, {nullable:true})
    name?: true;

    @Field(() => Boolean, {nullable:true})
    last_name?: true;

    @Field(() => Boolean, {nullable:true})
    first_name?: true;

    @Field(() => Boolean, {nullable:true})
    tel?: true;

    @Field(() => Boolean, {nullable:true})
    zip1?: true;

    @Field(() => Boolean, {nullable:true})
    zip2?: true;

    @Field(() => Boolean, {nullable:true})
    address1?: true;

    @Field(() => Boolean, {nullable:true})
    address2?: true;

    @Field(() => Boolean, {nullable:true})
    address3?: true;

    @Field(() => Boolean, {nullable:true})
    address4?: true;

    @Field(() => Boolean, {nullable:true})
    password?: true;

    @HideField()
    createdAt?: true;

    @HideField()
    updatedAt?: true;
}
