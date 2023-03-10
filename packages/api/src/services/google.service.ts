import { Injectable } from '@nestjs/common';
import { Args } from '@nestjs/graphql';
import { GoogleAuthArgs } from '@/models';
import axios from 'axios';

@Injectable()
export class GoogleService {
  async fetchProfile(
    @Args() args: GoogleAuthArgs,
  ): Promise<Record<string, any>> {
    const { data } = await axios.get(
      'https://www.googleapis.com/oauth2/v1/userinfo',
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;',
        },
        params: {
          access_token: args.access_token,
        },
      },
    );
    return data;
  }
}
