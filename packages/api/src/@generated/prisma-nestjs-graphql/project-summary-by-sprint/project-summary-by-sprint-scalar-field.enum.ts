import { registerEnumType } from '@nestjs/graphql';

export enum Project_summary_by_sprintScalarFieldEnum {
    index = "index",
    project_id = "project_id",
    sprint_id = "sprint_id",
    project_amount = "project_amount",
    created_at = "created_at",
    updated_at = "updated_at"
}


registerEnumType(Project_summary_by_sprintScalarFieldEnum, { name: 'Project_summary_by_sprintScalarFieldEnum', description: undefined })
