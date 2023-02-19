import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';

@ObjectType()
export class Reset {

    @Field(() => ID, {nullable:false})
    id!: number;
}
