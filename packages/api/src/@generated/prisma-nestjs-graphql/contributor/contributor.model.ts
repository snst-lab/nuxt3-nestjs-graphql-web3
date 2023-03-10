import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { HideField } from '@nestjs/graphql';

@ObjectType()
export class Contributor {

    @Field(() => ID, {nullable:false})
    contributor_id!: number;

    @Field(() => String, {nullable:false})
    contributor_code!: string;

    @Field(() => String, {nullable:false})
    contributor_name!: string;

    @Field(() => Int, {nullable:false,defaultValue:100})
    point!: number;

    @Field(() => Int, {nullable:false,defaultValue:0})
    project_id!: number;

    @HideField()
    created_at!: Date;

    @HideField()
    updated_at!: Date;
}
