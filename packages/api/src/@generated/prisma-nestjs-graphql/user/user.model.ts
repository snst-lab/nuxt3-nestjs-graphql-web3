import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { HideField } from '@nestjs/graphql';

@ObjectType()
export class User {

    @Field(() => ID, {nullable:false})
    id!: number;

    @Field(() => String, {nullable:false,defaultValue:'000000000000'})
    user_id!: string;

    @Field(() => String, {nullable:false,defaultValue:'email'})
    auth_type!: string;

    @Field(() => String, {nullable:false,defaultValue:''})
    email!: string;

    @Field(() => String, {nullable:false,defaultValue:''})
    social_id!: string;

    @Field(() => String, {nullable:false,defaultValue:''})
    name!: string;

    @Field(() => String, {nullable:false,defaultValue:''})
    last_name!: string;

    @Field(() => String, {nullable:false,defaultValue:''})
    first_name!: string;

    @Field(() => String, {nullable:false,defaultValue:''})
    tel!: string;

    @Field(() => String, {nullable:false,defaultValue:''})
    zip1!: string;

    @Field(() => String, {nullable:false,defaultValue:''})
    zip2!: string;

    @Field(() => String, {nullable:false,defaultValue:''})
    address1!: string;

    @Field(() => String, {nullable:false,defaultValue:''})
    address2!: string;

    @Field(() => String, {nullable:false,defaultValue:''})
    address3!: string;

    @Field(() => String, {nullable:false,defaultValue:''})
    address4!: string;

    @HideField()
    password!: string | null;

    @HideField()
    createdAt!: Date;

    @HideField()
    updatedAt!: Date;
}
