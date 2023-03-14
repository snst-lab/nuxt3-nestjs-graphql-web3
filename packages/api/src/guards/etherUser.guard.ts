import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { EtherService } from '@/services';
import { BaseGuard } from './_base';
import { GraphQLError } from 'graphql';
import { constants } from '@constants';

const { user, user2 } = constants.web3.accounts;

@Injectable()
export class EtherUserGuard extends BaseGuard {
  constructor(private readonly etherService: EtherService) {
    super();
  }
  async handleRequest(context: ExecutionContext): Promise<any> {
    try {
      const ctx = GqlExecutionContext.create(context).getContext();
      const { ether } = ctx.req.body.variables;
      if (!ether) {
        throw new Error();
      }
      const { message, address, signature } = ether;
      if (!message || !address || !signature) {
        throw new Error();
      }
      const result = await this.etherService.verifySignature({
        message,
        address,
        signature,
      });
      if (!result) {
        throw new Error();
      }
      if (result.address !== user.address && result.address !== user2.address) {
        throw new Error();
      }
      return { ether: result };
    } catch {
      throw new GraphQLError('', {
        extensions: {
          code: 'evm-signature-verification-failed',
          response: {
            statusCode: 403,
          },
        },
      });
    }
  }
}
