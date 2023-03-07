import { registerEnumType } from '@nestjs/graphql';

export enum Project_detailScalarFieldEnum {
    index = "index",
    project_id = "project_id",
    service_id = "service_id",
    project_code = "project_code",
    ticket_count_total = "ticket_count_total",
    ticket_count_closed = "ticket_count_closed",
    sum_project_amount = "sum_project_amount",
    credit_amount = "credit_amount",
    carry_over_balance = "carry_over_balance",
    price_coefficient = "price_coefficient",
    campaign_deadline = "campaign_deadline",
    fundraising_deadline = "fundraising_deadline",
    created_at = "created_at",
    updated_at = "updated_at"
}


registerEnumType(Project_detailScalarFieldEnum, { name: 'Project_detailScalarFieldEnum', description: undefined })
