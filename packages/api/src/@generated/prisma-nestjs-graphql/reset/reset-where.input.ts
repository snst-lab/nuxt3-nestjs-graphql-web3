import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntFilter } from '../prisma/int-filter.input';

@InputType()
export class ResetWhereInput {

    @Field(() => [ResetWhereInput], {nullable:true})
    AND?: Array<ResetWhereInput>;

    @Field(() => [ResetWhereInput], {nullable:true})
    OR?: Array<ResetWhereInput>;

    @Field(() => [ResetWhereInput], {nullable:true})
    NOT?: Array<ResetWhereInput>;

    @Field(() => IntFilter, {nullable:true})
    id?: IntFilter;
}
