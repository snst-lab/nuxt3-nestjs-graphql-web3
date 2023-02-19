import { Field, ObjectType } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';

@ObjectType()
export class Response {
  @Field(() => GraphQLJSON, { nullable: true })
  response!: Record<string, any>;
}
