import { registerEnumType } from '@nestjs/graphql';

export enum AddressCardScalarFieldEnum {
    id = "id",
    merchant_id = "merchant_id",
    auth_type = "auth_type",
    social_id = "social_id",
    email = "email",
    evm_address = "evm_address",
    createdAt = "createdAt",
    updatedAt = "updatedAt"
}


registerEnumType(AddressCardScalarFieldEnum, { name: 'AddressCardScalarFieldEnum', description: undefined })
