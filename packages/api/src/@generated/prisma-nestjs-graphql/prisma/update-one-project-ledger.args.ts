import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Project_ledgerUpdateInput } from '../project-ledger/project-ledger-update.input';
import { Type } from 'class-transformer';
import { Project_ledgerWhereUniqueInput } from '../project-ledger/project-ledger-where-unique.input';

@ArgsType()
export class UpdateOneProjectLedgerArgs {

    @Field(() => Project_ledgerUpdateInput, {nullable:false})
    @Type(() => Project_ledgerUpdateInput)
    data!: Project_ledgerUpdateInput;

    @Field(() => Project_ledgerWhereUniqueInput, {nullable:false})
    @Type(() => Project_ledgerWhereUniqueInput)
    where!: Project_ledgerWhereUniqueInput;
}
