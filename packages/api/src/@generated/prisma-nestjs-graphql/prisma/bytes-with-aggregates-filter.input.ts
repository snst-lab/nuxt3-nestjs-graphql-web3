import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { NestedBytesWithAggregatesFilter } from './nested-bytes-with-aggregates-filter.input';
import { NestedIntFilter } from './nested-int-filter.input';
import { NestedBytesFilter } from './nested-bytes-filter.input';

@InputType()
export class BytesWithAggregatesFilter {

    @Field(() => String, {nullable:true})
    equals?: Buffer;

    @Field(() => [String], {nullable:true})
    in?: Array<Buffer>;

    @Field(() => [String], {nullable:true})
    notIn?: Array<Buffer>;

    @Field(() => NestedBytesWithAggregatesFilter, {nullable:true})
    not?: NestedBytesWithAggregatesFilter;

    @Field(() => NestedIntFilter, {nullable:true})
    _count?: NestedIntFilter;

    @Field(() => NestedBytesFilter, {nullable:true})
    _min?: NestedBytesFilter;

    @Field(() => NestedBytesFilter, {nullable:true})
    _max?: NestedBytesFilter;
}
