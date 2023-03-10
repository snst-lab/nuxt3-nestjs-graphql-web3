import { registerEnumType } from '@nestjs/graphql';

export enum VoterScalarFieldEnum {
    id = "id",
    name = "name",
    evm_address = "evm_address",
    secret = "secret",
    token_balance = "token_balance",
    max_voteable = "max_voteable",
    pending_airdrop = "pending_airdrop",
    pending_reconcile = "pending_reconcile"
}


registerEnumType(VoterScalarFieldEnum, { name: 'VoterScalarFieldEnum', description: undefined })
