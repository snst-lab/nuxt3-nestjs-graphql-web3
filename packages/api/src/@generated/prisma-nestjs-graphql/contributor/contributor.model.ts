import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { HideField } from '@nestjs/graphql';

@ObjectType()
export class Contributor {

    @Field(() => ID, {nullable:false})
    contributor_id!: number;

    @Field(() => String, {nullable:false})
    contributor_code!: string;

    @Field(() => String, {nullable:false})
    name!: string;

    @HideField()
    created_at!: Date;

    @HideField()
    updated_at!: Date;
}
