import { registerEnumType } from '@nestjs/graphql';

export enum ContributorScalarFieldEnum {
    contributor_id = "contributor_id",
    contributor_code = "contributor_code",
    contributor_name = "contributor_name",
    point = "point",
    project_id = "project_id",
    created_at = "created_at",
    updated_at = "updated_at"
}


registerEnumType(ContributorScalarFieldEnum, { name: 'ContributorScalarFieldEnum', description: undefined })
