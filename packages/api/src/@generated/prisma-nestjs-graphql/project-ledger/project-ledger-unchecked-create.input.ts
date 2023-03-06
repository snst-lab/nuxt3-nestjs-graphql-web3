import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';
import { HideField } from '@nestjs/graphql';

@InputType()
export class Project_ledgerUncheckedCreateInput {

    @Field(() => Int, {nullable:true})
    index?: number;

    @Field(() => String, {nullable:false})
    contributor_code!: string;

    @Field(() => Int, {nullable:false})
    project_id!: number;

    @Field(() => Int, {nullable:false})
    target!: number;

    @Field(() => String, {nullable:false})
    unit!: string;

    @Field(() => Float, {nullable:false})
    income!: number;

    @Field(() => Float, {nullable:false})
    expense!: number;

    @HideField()
    created_at?: Date | string;

    @HideField()
    updated_at?: Date | string;
}
