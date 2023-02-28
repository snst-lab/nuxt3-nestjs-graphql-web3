import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';

@ObjectType()
export class ContributorAvgAggregate {

    @Field(() => Float, {nullable:true})
    contributor_id?: number;
}
