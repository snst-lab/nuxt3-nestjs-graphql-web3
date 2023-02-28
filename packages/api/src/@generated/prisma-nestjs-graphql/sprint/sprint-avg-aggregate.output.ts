import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';

@ObjectType()
export class SprintAvgAggregate {

    @Field(() => Float, {nullable:true})
    sprint_id?: number;

    @Field(() => Float, {nullable:true})
    sprint_code?: number;

    @Field(() => Float, {nullable:true})
    service_id?: number;
}
