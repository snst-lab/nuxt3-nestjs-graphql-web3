import { registerEnumType } from '@nestjs/graphql';

export enum TicketScalarFieldEnum {
    ticket_id = "ticket_id",
    ticket_code = "ticket_code",
    project_id = "project_id",
    name = "name",
    type = "type",
    contributor_id = "contributor_id",
    sprint_id = "sprint_id",
    status = "status",
    start_date = "start_date",
    end_date = "end_date",
    complete_date = "complete_date",
    created_at = "created_at",
    updated_at = "updated_at"
}


registerEnumType(TicketScalarFieldEnum, { name: 'TicketScalarFieldEnum', description: undefined })
