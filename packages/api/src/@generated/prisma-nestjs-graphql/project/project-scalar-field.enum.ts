import { registerEnumType } from '@nestjs/graphql';

export enum ProjectScalarFieldEnum {
    project_id = "project_id",
    service_id = "service_id",
    project_code = "project_code",
    name = "name",
    status = "status",
    description = "description",
    cover_picture = "cover_picture",
    avatar_uri = "avatar_uri",
    contributor_count = "contributor_count",
    minimum_contributor_count = "minimum_contributor_count",
    campaign_deadline = "campaign_deadline",
    start_date = "start_date",
    end_date = "end_date",
    complete_date = "complete_date",
    review_phase = "review_phase",
    invested_amount = "invested_amount",
    created_at = "created_at",
    updated_at = "updated_at"
}


registerEnumType(ProjectScalarFieldEnum, { name: 'ProjectScalarFieldEnum', description: undefined })
