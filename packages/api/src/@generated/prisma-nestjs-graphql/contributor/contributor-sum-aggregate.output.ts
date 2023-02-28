import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class ContributorSumAggregate {

    @Field(() => Int, {nullable:true})
    contributor_id?: number;
}
