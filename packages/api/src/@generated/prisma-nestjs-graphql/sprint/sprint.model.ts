import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { HideField } from '@nestjs/graphql';

@ObjectType()
export class Sprint {

    @Field(() => ID, {nullable:false})
    sprint_id!: number;

    @Field(() => Int, {nullable:false})
    sprint_code!: number;

    @Field(() => String, {nullable:false})
    sprint_name!: string;

    @Field(() => Date, {nullable:false})
    start_date!: Date;

    @Field(() => Date, {nullable:false})
    end_date!: Date;

    @Field(() => Int, {nullable:false})
    service_id!: number;

    @HideField()
    created_at!: Date;

    @HideField()
    updated_at!: Date;
}
