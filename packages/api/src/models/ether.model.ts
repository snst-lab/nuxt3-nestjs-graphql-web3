import { Field, ArgsType } from '@nestjs/graphql';

@ArgsType()
export class EtherVerifySignatureArgs {
  @Field(() => String, { nullable: false })
  message!: string;

  @Field(() => String, { nullable: false })
  address!: string;

  @Field(() => String, { nullable: false })
  signature!: string;
}
