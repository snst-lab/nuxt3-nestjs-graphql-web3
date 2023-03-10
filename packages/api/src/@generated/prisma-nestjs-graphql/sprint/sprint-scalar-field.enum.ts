import { registerEnumType } from '@nestjs/graphql';

export enum SprintScalarFieldEnum {
    sprint_id = "sprint_id",
    sprint_code = "sprint_code",
    sprint_name = "sprint_name",
    start_date = "start_date",
    end_date = "end_date",
    service_id = "service_id",
    created_at = "created_at",
    updated_at = "updated_at"
}


registerEnumType(SprintScalarFieldEnum, { name: 'SprintScalarFieldEnum', description: undefined })
