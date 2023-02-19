import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { GoogleService } from '@/services';
import { BaseGuard } from './_base';
import { GraphQLError } from 'graphql';

@Injectable()
export class AuthGuard extends BaseGuard {
  constructor(private readonly googleService: GoogleService) {
    super();
  }
  async handleRequest(context: ExecutionContext): Promise<any> {
    try {
      const ctx = GqlExecutionContext.create(context).getContext();
      const { auth } = ctx.req.body.variables;
      if (!auth) {
        throw new Error();
      }
      const { type, access_token } = auth;
      if (!type || !access_token) {
        throw new Error();
      }
      let profile = {} as Record<string, any>;
      switch (type) {
        case 'google':
          profile = await this.googleService.fetchProfile({ access_token });
          profile.social_id = profile.email;
          break;
        default:
          throw new Error();
      }
      return {
        auth: {
          type,
          profile,
        },
      };
    } catch {
      throw new GraphQLError('', {
        extensions: {
          code: 'authentication-failed',
          response: {
            statusCode: 403,
          },
        },
      });
    }
  }
}
