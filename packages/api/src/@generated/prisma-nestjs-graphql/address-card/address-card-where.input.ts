import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntFilter } from '../prisma/int-filter.input';
import { StringFilter } from '../prisma/string-filter.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';
import { HideField } from '@nestjs/graphql';

@InputType()
export class AddressCardWhereInput {

    @Field(() => [AddressCardWhereInput], {nullable:true})
    AND?: Array<AddressCardWhereInput>;

    @Field(() => [AddressCardWhereInput], {nullable:true})
    OR?: Array<AddressCardWhereInput>;

    @Field(() => [AddressCardWhereInput], {nullable:true})
    NOT?: Array<AddressCardWhereInput>;

    @Field(() => IntFilter, {nullable:true})
    id?: IntFilter;

    @Field(() => StringFilter, {nullable:true})
    merchant_id?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    auth_type?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    social_id?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    email?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    evm_address?: StringFilter;

    @HideField()
    createdAt?: DateTimeFilter;

    @HideField()
    updatedAt?: DateTimeFilter;
}
