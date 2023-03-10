import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@InputType()
export class VoterWhereUniqueInput {

    @Field(() => Int, {nullable:true})
    id?: number;
}
