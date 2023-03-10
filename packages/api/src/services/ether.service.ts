import { Injectable } from '@nestjs/common';
import { Args } from '@nestjs/graphql';
import { EtherVerifySignatureArgs } from '@/models';
import { ethers } from 'ethers';

@Injectable()
export class EtherService {
  async verifySignature(
    @Args() args: EtherVerifySignatureArgs,
  ): Promise<EtherVerifySignatureArgs | null> {
    const { message, address: expected, signature } = args;
    const digest = ethers.utils.hashMessage(message);
    const actual = ethers.utils.recoverAddress(digest, signature);
    return actual === expected
      ? {
          message,
          address: expected,
          signature,
        }
      : null;
  }
}
