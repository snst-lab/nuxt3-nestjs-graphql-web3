import { registerEnumType } from '@nestjs/graphql';

export enum ProjectScalarFieldEnum {
    id = "id",
    service_id = "service_id",
    project_id = "project_id",
    name = "name",
    picture = "picture",
    contributor_count = "contributor_count",
    ticket_count_total = "ticket_count_total",
    ticket_count_closed = "ticket_count_closed",
    total_claimed = "total_claimed",
    credit_amount = "credit_amount",
    carry_over_balance = "carry_over_balance",
    price_coefficient = "price_coefficient",
    created_at = "created_at",
    updated_at = "updated_at"
}


registerEnumType(ProjectScalarFieldEnum, { name: 'ProjectScalarFieldEnum', description: undefined })
