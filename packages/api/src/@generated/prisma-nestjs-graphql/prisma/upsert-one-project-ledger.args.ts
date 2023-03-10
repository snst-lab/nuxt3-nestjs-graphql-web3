import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Project_ledgerWhereUniqueInput } from '../project-ledger/project-ledger-where-unique.input';
import { Type } from 'class-transformer';
import { Project_ledgerCreateInput } from '../project-ledger/project-ledger-create.input';
import { Project_ledgerUpdateInput } from '../project-ledger/project-ledger-update.input';

@ArgsType()
export class UpsertOneProjectLedgerArgs {

    @Field(() => Project_ledgerWhereUniqueInput, {nullable:false})
    @Type(() => Project_ledgerWhereUniqueInput)
    where!: Project_ledgerWhereUniqueInput;

    @Field(() => Project_ledgerCreateInput, {nullable:false})
    @Type(() => Project_ledgerCreateInput)
    create!: Project_ledgerCreateInput;

    @Field(() => Project_ledgerUpdateInput, {nullable:false})
    @Type(() => Project_ledgerUpdateInput)
    update!: Project_ledgerUpdateInput;
}
