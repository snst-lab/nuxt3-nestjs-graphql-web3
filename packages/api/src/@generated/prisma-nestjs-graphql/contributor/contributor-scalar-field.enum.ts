import { registerEnumType } from '@nestjs/graphql';

export enum ContributorScalarFieldEnum {
    contributor_id = "contributor_id",
    contributor_code = "contributor_code",
    name = "name",
    created_at = "created_at",
    updated_at = "updated_at"
}


registerEnumType(ContributorScalarFieldEnum, { name: 'ContributorScalarFieldEnum', description: undefined })
