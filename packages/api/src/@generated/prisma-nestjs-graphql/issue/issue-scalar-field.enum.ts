import { registerEnumType } from '@nestjs/graphql';

export enum IssueScalarFieldEnum {
    issue_id = "issue_id",
    issue_code = "issue_code",
    project_id = "project_id",
    contributor_id = "contributor_id",
    sprint_id = "sprint_id",
    status = "status",
    start_date = "start_date",
    end_date = "end_date",
    complete_date = "complete_date",
    created_at = "created_at",
    updated_at = "updated_at"
}


registerEnumType(IssueScalarFieldEnum, { name: 'IssueScalarFieldEnum', description: undefined })
