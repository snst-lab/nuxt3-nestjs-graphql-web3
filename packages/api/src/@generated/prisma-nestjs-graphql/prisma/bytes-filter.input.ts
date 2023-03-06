import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { NestedBytesFilter } from './nested-bytes-filter.input';

@InputType()
export class BytesFilter {

    @Field(() => String, {nullable:true})
    equals?: Buffer;

    @Field(() => [String], {nullable:true})
    in?: Array<Buffer>;

    @Field(() => [String], {nullable:true})
    notIn?: Array<Buffer>;

    @Field(() => NestedBytesFilter, {nullable:true})
    not?: NestedBytesFilter;
}
