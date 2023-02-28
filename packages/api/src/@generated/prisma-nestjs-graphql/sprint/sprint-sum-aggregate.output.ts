import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class SprintSumAggregate {

    @Field(() => Int, {nullable:true})
    sprint_id?: number;

    @Field(() => Int, {nullable:true})
    sprint_code?: number;

    @Field(() => Int, {nullable:true})
    service_id?: number;
}
