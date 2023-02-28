import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { HideField } from '@nestjs/graphql';

@InputType()
export class ContributorCreateManyInput {

    @Field(() => Int, {nullable:true})
    contributor_id?: number;

    @Field(() => String, {nullable:false})
    contributor_code!: string;

    @Field(() => String, {nullable:false})
    name!: string;

    @HideField()
    created_at?: Date | string;

    @HideField()
    updated_at?: Date | string;
}
