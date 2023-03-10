import { Injectable } from '@nestjs/common';
import { Args, ArgsType, Field } from '@nestjs/graphql';
import axios from 'axios';

@ArgsType()
export class TestFetchArgs {
  @Field(() => String, { nullable: false })
  payload!: string;
}

@Injectable()
export class TestService {
  async fetch(@Args() args: TestFetchArgs): Promise<string> {
    const { data } = await axios.get(
      `https://httpbin.org/anything/${args.payload}`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;',
        },
      },
    );
    return data;
  }
}
