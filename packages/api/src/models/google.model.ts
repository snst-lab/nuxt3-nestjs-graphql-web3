import { Field, ObjectType, ArgsType } from '@nestjs/graphql';

@ObjectType()
export class Google {
  @Field(() => String, { nullable: false })
  access_token!: string;

  @Field(() => String, { nullable: false })
  expires_in!: string;

  @Field(() => String, { nullable: false })
  scope!: string;

  @Field(() => String, { nullable: false })
  token_type!: string;
}

@ArgsType()
export class GoogleAuthArgs {
  @Field(() => String, { nullable: false })
  access_token!: string;
}
