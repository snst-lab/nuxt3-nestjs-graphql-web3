import { registerEnumType } from '@nestjs/graphql';

export enum Project_ledgerScalarFieldEnum {
    index = "index",
    contributor_code = "contributor_code",
    project_id = "project_id",
    target = "target",
    unit = "unit",
    income = "income",
    expense = "expense",
    created_at = "created_at",
    updated_at = "updated_at"
}


registerEnumType(Project_ledgerScalarFieldEnum, { name: 'Project_ledgerScalarFieldEnum', description: undefined })
