import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class AddressCardSumAggregate {

    @Field(() => Int, {nullable:true})
    id?: number;
}
