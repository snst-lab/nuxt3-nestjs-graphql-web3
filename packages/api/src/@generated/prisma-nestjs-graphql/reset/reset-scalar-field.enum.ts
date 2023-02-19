import { registerEnumType } from '@nestjs/graphql';

export enum ResetScalarFieldEnum {
    id = "id"
}


registerEnumType(ResetScalarFieldEnum, { name: 'ResetScalarFieldEnum', description: undefined })
