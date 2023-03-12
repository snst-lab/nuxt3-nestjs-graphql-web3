import { registerEnumType } from '@nestjs/graphql';

export enum Project_ledgerScalarFieldEnum {
    index = "index",
    created_date = "created_date",
    project_id = "project_id",
    target = "target",
    unit = "unit",
    income = "income",
    expense = "expense",
    review_phase = "review_phase",
    created_at = "created_at",
    updated_at = "updated_at"
}


registerEnumType(Project_ledgerScalarFieldEnum, { name: 'Project_ledgerScalarFieldEnum', description: undefined })
