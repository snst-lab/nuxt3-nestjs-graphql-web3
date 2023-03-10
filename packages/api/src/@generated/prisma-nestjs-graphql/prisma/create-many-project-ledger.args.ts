import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Project_ledgerCreateManyInput } from '../project-ledger/project-ledger-create-many.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateManyProjectLedgerArgs {

    @Field(() => [Project_ledgerCreateManyInput], {nullable:false})
    @Type(() => Project_ledgerCreateManyInput)
    data!: Array<Project_ledgerCreateManyInput>;

    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}
