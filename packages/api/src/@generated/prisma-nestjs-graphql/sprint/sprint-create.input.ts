import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { HideField } from '@nestjs/graphql';

@InputType()
export class SprintCreateInput {

    @Field(() => Int, {nullable:false})
    sprint_code!: number;

    @Field(() => String, {nullable:false})
    sprint_name!: string;

    @Field(() => Date, {nullable:false})
    start_date!: Date | string;

    @Field(() => Date, {nullable:false})
    end_date!: Date | string;

    @Field(() => Int, {nullable:false})
    service_id!: number;

    @HideField()
    created_at?: Date | string;

    @HideField()
    updated_at?: Date | string;
}
