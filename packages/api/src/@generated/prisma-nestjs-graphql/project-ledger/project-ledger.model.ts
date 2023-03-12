import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';
import { HideField } from '@nestjs/graphql';

@ObjectType()
export class Project_ledger {

    @Field(() => ID, {nullable:false})
    index!: number;

    @Field(() => Date, {nullable:false})
    created_date!: Date;

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

    @Field(() => String, {nullable:false})
    review_phase!: string;

    @HideField()
    created_at!: Date;

    @HideField()
    updated_at!: Date;
}
