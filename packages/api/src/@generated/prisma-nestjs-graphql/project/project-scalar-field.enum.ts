import { registerEnumType } from '@nestjs/graphql';

export enum ProjectScalarFieldEnum {
    project_id = "project_id",
    service_id = "service_id",
    project_code = "project_code",
    name = "name",
    avatar_uri = "avatar_uri",
    contributor_count = "contributor_count",
    minimum_contributor_count = "minimum_contributor_count",
    ticket_count_total = "ticket_count_total",
    ticket_count_closed = "ticket_count_closed",
    total_claimed = "total_claimed",
    credit_amount = "credit_amount",
    carry_over_balance = "carry_over_balance",
    price_coefficient = "price_coefficient",
    campaign_deadline = "campaign_deadline",
    fundraising_deadline = "fundraising_deadline",
    start_date = "start_date",
    end_date = "end_date",
    complete_date = "complete_date",
    created_at = "created_at",
    updated_at = "updated_at"
}


registerEnumType(ProjectScalarFieldEnum, { name: 'ProjectScalarFieldEnum', description: undefined })
