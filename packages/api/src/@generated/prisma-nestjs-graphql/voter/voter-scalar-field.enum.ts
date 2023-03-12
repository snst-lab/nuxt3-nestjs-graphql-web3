import { registerEnumType } from '@nestjs/graphql';

export enum VoterScalarFieldEnum {
    id = "id",
    project_id = "project_id",
    name = "name",
    evm_address = "evm_address",
    secret = "secret",
    max_voteable = "max_voteable",
    pending_airdrop = "pending_airdrop",
    pending_reconcile = "pending_reconcile",
    mock_follow_project_id = "mock_follow_project_id",
    reward = "reward"
}


registerEnumType(VoterScalarFieldEnum, { name: 'VoterScalarFieldEnum', description: undefined })
