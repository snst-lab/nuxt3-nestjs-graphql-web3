import { registerEnumType } from '@nestjs/graphql';

export enum UserScalarFieldEnum {
    id = "id",
    user_id = "user_id",
    auth_type = "auth_type",
    email = "email",
    social_id = "social_id",
    name = "name",
    last_name = "last_name",
    first_name = "first_name",
    tel = "tel",
    zip1 = "zip1",
    zip2 = "zip2",
    address1 = "address1",
    address2 = "address2",
    address3 = "address3",
    address4 = "address4",
    password = "password",
    createdAt = "createdAt",
    updatedAt = "updatedAt"
}


registerEnumType(UserScalarFieldEnum, { name: 'UserScalarFieldEnum', description: undefined })
