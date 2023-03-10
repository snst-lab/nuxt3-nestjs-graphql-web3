import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Project_ledgerWhereUniqueInput } from '../project-ledger/project-ledger-where-unique.input';
import { Type } from 'class-transformer';

@ArgsType()
export class FindUniqueProjectLedgerArgs {

    @Field(() => Project_ledgerWhereUniqueInput, {nullable:false})
    @Type(() => Project_ledgerWhereUniqueInput)
    where!: Project_ledgerWhereUniqueInput;
}
