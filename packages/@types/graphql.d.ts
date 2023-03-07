import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
};

export type BytesFilter = {
  equals?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<NestedBytesFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
};

export type ContributorOrderByWithRelationInput = {
  contributor_code?: InputMaybe<SortOrder>;
  contributor_id?: InputMaybe<SortOrder>;
  contributor_name?: InputMaybe<SortOrder>;
  point?: InputMaybe<SortOrder>;
  project_id?: InputMaybe<SortOrder>;
};

export enum ContributorScalarFieldEnum {
  ContributorCode = 'contributor_code',
  ContributorId = 'contributor_id',
  ContributorName = 'contributor_name',
  CreatedAt = 'created_at',
  Point = 'point',
  ProjectId = 'project_id',
  UpdatedAt = 'updated_at'
}

export type ContributorWhereInput = {
  AND?: InputMaybe<Array<ContributorWhereInput>>;
  NOT?: InputMaybe<Array<ContributorWhereInput>>;
  OR?: InputMaybe<Array<ContributorWhereInput>>;
  contributor_code?: InputMaybe<StringFilter>;
  contributor_id?: InputMaybe<IntFilter>;
  contributor_name?: InputMaybe<StringFilter>;
  point?: InputMaybe<IntFilter>;
  project_id?: InputMaybe<IntFilter>;
};

export type ContributorWhereUniqueInput = {
  contributor_id?: InputMaybe<Scalars['Int']>;
};

export type DateTimeNullableFilter = {
  equals?: InputMaybe<Scalars['DateTime']>;
  gt?: InputMaybe<Scalars['DateTime']>;
  gte?: InputMaybe<Scalars['DateTime']>;
  in?: InputMaybe<Array<Scalars['DateTime']>>;
  lt?: InputMaybe<Scalars['DateTime']>;
  lte?: InputMaybe<Scalars['DateTime']>;
  not?: InputMaybe<NestedDateTimeNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']>>;
};

export type FloatFilter = {
  equals?: InputMaybe<Scalars['Float']>;
  gt?: InputMaybe<Scalars['Float']>;
  gte?: InputMaybe<Scalars['Float']>;
  in?: InputMaybe<Array<Scalars['Float']>>;
  lt?: InputMaybe<Scalars['Float']>;
  lte?: InputMaybe<Scalars['Float']>;
  not?: InputMaybe<NestedFloatFilter>;
  notIn?: InputMaybe<Array<Scalars['Float']>>;
};

export type IntFilter = {
  equals?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<Scalars['Int']>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  not?: InputMaybe<NestedIntFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']>>;
};

export type IntNullableFilter = {
  equals?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<Scalars['Int']>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  not?: InputMaybe<NestedIntNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** . */
  upsertProject: Response;
};


export type MutationUpsertProjectArgs = {
  data: ProjectCreateInput;
};

export type NestedBytesFilter = {
  equals?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<NestedBytesFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
};

export type NestedDateTimeNullableFilter = {
  equals?: InputMaybe<Scalars['DateTime']>;
  gt?: InputMaybe<Scalars['DateTime']>;
  gte?: InputMaybe<Scalars['DateTime']>;
  in?: InputMaybe<Array<Scalars['DateTime']>>;
  lt?: InputMaybe<Scalars['DateTime']>;
  lte?: InputMaybe<Scalars['DateTime']>;
  not?: InputMaybe<NestedDateTimeNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']>>;
};

export type NestedFloatFilter = {
  equals?: InputMaybe<Scalars['Float']>;
  gt?: InputMaybe<Scalars['Float']>;
  gte?: InputMaybe<Scalars['Float']>;
  in?: InputMaybe<Array<Scalars['Float']>>;
  lt?: InputMaybe<Scalars['Float']>;
  lte?: InputMaybe<Scalars['Float']>;
  not?: InputMaybe<NestedFloatFilter>;
  notIn?: InputMaybe<Array<Scalars['Float']>>;
};

export type NestedIntFilter = {
  equals?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<Scalars['Int']>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  not?: InputMaybe<NestedIntFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']>>;
};

export type NestedIntNullableFilter = {
  equals?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<Scalars['Int']>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  not?: InputMaybe<NestedIntNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']>>;
};

export type NestedStringFilter = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type NestedStringNullableFilter = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  not?: InputMaybe<NestedStringNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type ProjectCreateInput = {
  avatar_uri?: InputMaybe<Scalars['String']>;
  campaign_deadline?: InputMaybe<Scalars['DateTime']>;
  complete_date?: InputMaybe<Scalars['DateTime']>;
  contributor_count?: InputMaybe<Scalars['Int']>;
  cover_picture?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  end_date?: InputMaybe<Scalars['DateTime']>;
  minimum_contributor_count?: InputMaybe<Scalars['Int']>;
  name: Scalars['String'];
  project_code: Scalars['Int'];
  service_id: Scalars['Int'];
  start_date?: InputMaybe<Scalars['DateTime']>;
  status?: InputMaybe<Scalars['Int']>;
};

export type ProjectOrderByWithRelationInput = {
  avatar_uri?: InputMaybe<SortOrder>;
  campaign_deadline?: InputMaybe<SortOrder>;
  complete_date?: InputMaybe<SortOrder>;
  contributor_count?: InputMaybe<SortOrder>;
  cover_picture?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  end_date?: InputMaybe<SortOrder>;
  minimum_contributor_count?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  project_code?: InputMaybe<SortOrder>;
  project_id?: InputMaybe<SortOrder>;
  service_id?: InputMaybe<SortOrder>;
  start_date?: InputMaybe<SortOrder>;
  status?: InputMaybe<SortOrder>;
};

export enum ProjectScalarFieldEnum {
  AvatarUri = 'avatar_uri',
  CampaignDeadline = 'campaign_deadline',
  CompleteDate = 'complete_date',
  ContributorCount = 'contributor_count',
  CoverPicture = 'cover_picture',
  CreatedAt = 'created_at',
  Description = 'description',
  EndDate = 'end_date',
  MinimumContributorCount = 'minimum_contributor_count',
  Name = 'name',
  ProjectCode = 'project_code',
  ProjectId = 'project_id',
  ServiceId = 'service_id',
  StartDate = 'start_date',
  Status = 'status',
  UpdatedAt = 'updated_at'
}

export type ProjectWhereInput = {
  AND?: InputMaybe<Array<ProjectWhereInput>>;
  NOT?: InputMaybe<Array<ProjectWhereInput>>;
  OR?: InputMaybe<Array<ProjectWhereInput>>;
  avatar_uri?: InputMaybe<StringFilter>;
  campaign_deadline?: InputMaybe<DateTimeNullableFilter>;
  complete_date?: InputMaybe<DateTimeNullableFilter>;
  contributor_count?: InputMaybe<IntFilter>;
  cover_picture?: InputMaybe<BytesFilter>;
  description?: InputMaybe<StringFilter>;
  end_date?: InputMaybe<DateTimeNullableFilter>;
  minimum_contributor_count?: InputMaybe<IntFilter>;
  name?: InputMaybe<StringFilter>;
  project_code?: InputMaybe<IntFilter>;
  project_id?: InputMaybe<IntFilter>;
  service_id?: InputMaybe<IntFilter>;
  start_date?: InputMaybe<DateTimeNullableFilter>;
  status?: InputMaybe<IntFilter>;
};

export type ProjectWhereUniqueInput = {
  project_id?: InputMaybe<Scalars['Int']>;
};

export type Project_DetailOrderByWithRelationInput = {
  campaign_deadline?: InputMaybe<SortOrder>;
  carry_over_balance?: InputMaybe<SortOrder>;
  credit_amount?: InputMaybe<SortOrder>;
  fundraising_deadline?: InputMaybe<SortOrder>;
  index?: InputMaybe<SortOrder>;
  price_coefficient?: InputMaybe<SortOrder>;
  project_code?: InputMaybe<SortOrder>;
  project_id?: InputMaybe<SortOrder>;
  service_id?: InputMaybe<SortOrder>;
  sum_project_amount?: InputMaybe<SortOrder>;
  ticket_count_closed?: InputMaybe<SortOrder>;
  ticket_count_total?: InputMaybe<SortOrder>;
};

export enum Project_DetailScalarFieldEnum {
  CampaignDeadline = 'campaign_deadline',
  CarryOverBalance = 'carry_over_balance',
  CreatedAt = 'created_at',
  CreditAmount = 'credit_amount',
  FundraisingDeadline = 'fundraising_deadline',
  Index = 'index',
  PriceCoefficient = 'price_coefficient',
  ProjectCode = 'project_code',
  ProjectId = 'project_id',
  ServiceId = 'service_id',
  SumProjectAmount = 'sum_project_amount',
  TicketCountClosed = 'ticket_count_closed',
  TicketCountTotal = 'ticket_count_total',
  UpdatedAt = 'updated_at'
}

export type Project_DetailWhereInput = {
  AND?: InputMaybe<Array<Project_DetailWhereInput>>;
  NOT?: InputMaybe<Array<Project_DetailWhereInput>>;
  OR?: InputMaybe<Array<Project_DetailWhereInput>>;
  campaign_deadline?: InputMaybe<DateTimeNullableFilter>;
  carry_over_balance?: InputMaybe<IntFilter>;
  credit_amount?: InputMaybe<IntFilter>;
  fundraising_deadline?: InputMaybe<DateTimeNullableFilter>;
  index?: InputMaybe<IntFilter>;
  price_coefficient?: InputMaybe<IntFilter>;
  project_code?: InputMaybe<IntFilter>;
  project_id?: InputMaybe<IntFilter>;
  service_id?: InputMaybe<IntFilter>;
  sum_project_amount?: InputMaybe<FloatFilter>;
  ticket_count_closed?: InputMaybe<IntFilter>;
  ticket_count_total?: InputMaybe<IntFilter>;
};

export type Project_DetailWhereUniqueInput = {
  index?: InputMaybe<Scalars['Int']>;
};

export type Project_LedgerOrderByWithRelationInput = {
  contributor_code?: InputMaybe<SortOrder>;
  expense?: InputMaybe<SortOrder>;
  income?: InputMaybe<SortOrder>;
  index?: InputMaybe<SortOrder>;
  project_id?: InputMaybe<SortOrder>;
  target?: InputMaybe<SortOrder>;
  unit?: InputMaybe<SortOrder>;
};

export enum Project_LedgerScalarFieldEnum {
  ContributorCode = 'contributor_code',
  CreatedAt = 'created_at',
  Expense = 'expense',
  Income = 'income',
  Index = 'index',
  ProjectId = 'project_id',
  Target = 'target',
  Unit = 'unit',
  UpdatedAt = 'updated_at'
}

export type Project_LedgerWhereInput = {
  AND?: InputMaybe<Array<Project_LedgerWhereInput>>;
  NOT?: InputMaybe<Array<Project_LedgerWhereInput>>;
  OR?: InputMaybe<Array<Project_LedgerWhereInput>>;
  contributor_code?: InputMaybe<StringFilter>;
  expense?: InputMaybe<FloatFilter>;
  income?: InputMaybe<FloatFilter>;
  index?: InputMaybe<IntFilter>;
  project_id?: InputMaybe<IntFilter>;
  target?: InputMaybe<IntFilter>;
  unit?: InputMaybe<StringFilter>;
};

export type Project_LedgerWhereUniqueInput = {
  index?: InputMaybe<Scalars['Int']>;
};

export type Query = {
  __typename?: 'Query';
  /** . */
  findManyContributor: Response;
  /** . */
  findManyPersonalTicket: Response;
  /** . */
  findManyProject: Response;
  /** . */
  findManyProjectDetail: Response;
  /** . */
  findManyProjectLedger: Response;
  /** . */
  findManyProjectTicket: Response;
};


export type QueryFindManyContributorArgs = {
  cursor?: InputMaybe<ContributorWhereUniqueInput>;
  distinct?: InputMaybe<Array<ContributorScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ContributorOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ContributorWhereInput>;
};


export type QueryFindManyPersonalTicketArgs = {
  cursor?: InputMaybe<TicketWhereUniqueInput>;
  distinct?: InputMaybe<Array<TicketScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<TicketOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<TicketWhereInput>;
};


export type QueryFindManyProjectArgs = {
  cursor?: InputMaybe<ProjectWhereUniqueInput>;
  distinct?: InputMaybe<Array<ProjectScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ProjectOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ProjectWhereInput>;
};


export type QueryFindManyProjectDetailArgs = {
  cursor?: InputMaybe<Project_DetailWhereUniqueInput>;
  distinct?: InputMaybe<Array<Project_DetailScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<Project_DetailOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Project_DetailWhereInput>;
};


export type QueryFindManyProjectLedgerArgs = {
  cursor?: InputMaybe<Project_LedgerWhereUniqueInput>;
  distinct?: InputMaybe<Array<Project_LedgerScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<Project_LedgerOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Project_LedgerWhereInput>;
};


export type QueryFindManyProjectTicketArgs = {
  cursor?: InputMaybe<TicketWhereUniqueInput>;
  distinct?: InputMaybe<Array<TicketScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<TicketOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<TicketWhereInput>;
};

export type Response = {
  __typename?: 'Response';
  response?: Maybe<Scalars['JSON']>;
};

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc'
}

export type StringFilter = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type StringNullableFilter = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  not?: InputMaybe<NestedStringNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type TicketOrderByWithRelationInput = {
  complete_date?: InputMaybe<SortOrder>;
  contributor_id?: InputMaybe<SortOrder>;
  end_date?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  project_id?: InputMaybe<SortOrder>;
  sprint_id?: InputMaybe<SortOrder>;
  start_date?: InputMaybe<SortOrder>;
  status?: InputMaybe<SortOrder>;
  ticket_code?: InputMaybe<SortOrder>;
  ticket_id?: InputMaybe<SortOrder>;
  type?: InputMaybe<SortOrder>;
};

export enum TicketScalarFieldEnum {
  CompleteDate = 'complete_date',
  ContributorId = 'contributor_id',
  CreatedAt = 'created_at',
  EndDate = 'end_date',
  Name = 'name',
  ProjectId = 'project_id',
  SprintId = 'sprint_id',
  StartDate = 'start_date',
  Status = 'status',
  TicketCode = 'ticket_code',
  TicketId = 'ticket_id',
  Type = 'type',
  UpdatedAt = 'updated_at'
}

export type TicketWhereInput = {
  AND?: InputMaybe<Array<TicketWhereInput>>;
  NOT?: InputMaybe<Array<TicketWhereInput>>;
  OR?: InputMaybe<Array<TicketWhereInput>>;
  complete_date?: InputMaybe<DateTimeNullableFilter>;
  contributor_id?: InputMaybe<IntNullableFilter>;
  end_date?: InputMaybe<DateTimeNullableFilter>;
  name?: InputMaybe<StringNullableFilter>;
  project_id?: InputMaybe<IntFilter>;
  sprint_id?: InputMaybe<IntNullableFilter>;
  start_date?: InputMaybe<DateTimeNullableFilter>;
  status?: InputMaybe<IntNullableFilter>;
  ticket_code?: InputMaybe<IntFilter>;
  ticket_id?: InputMaybe<IntFilter>;
  type?: InputMaybe<IntFilter>;
};

export type TicketWhereUniqueInput = {
  ticket_id?: InputMaybe<Scalars['Int']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  BytesFilter: BytesFilter;
  ContributorOrderByWithRelationInput: ContributorOrderByWithRelationInput;
  ContributorScalarFieldEnum: ContributorScalarFieldEnum;
  ContributorWhereInput: ContributorWhereInput;
  ContributorWhereUniqueInput: ContributorWhereUniqueInput;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  DateTimeNullableFilter: DateTimeNullableFilter;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  FloatFilter: FloatFilter;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  IntFilter: IntFilter;
  IntNullableFilter: IntNullableFilter;
  JSON: ResolverTypeWrapper<Scalars['JSON']>;
  Mutation: ResolverTypeWrapper<{}>;
  NestedBytesFilter: NestedBytesFilter;
  NestedDateTimeNullableFilter: NestedDateTimeNullableFilter;
  NestedFloatFilter: NestedFloatFilter;
  NestedIntFilter: NestedIntFilter;
  NestedIntNullableFilter: NestedIntNullableFilter;
  NestedStringFilter: NestedStringFilter;
  NestedStringNullableFilter: NestedStringNullableFilter;
  ProjectCreateInput: ProjectCreateInput;
  ProjectOrderByWithRelationInput: ProjectOrderByWithRelationInput;
  ProjectScalarFieldEnum: ProjectScalarFieldEnum;
  ProjectWhereInput: ProjectWhereInput;
  ProjectWhereUniqueInput: ProjectWhereUniqueInput;
  Project_detailOrderByWithRelationInput: Project_DetailOrderByWithRelationInput;
  Project_detailScalarFieldEnum: Project_DetailScalarFieldEnum;
  Project_detailWhereInput: Project_DetailWhereInput;
  Project_detailWhereUniqueInput: Project_DetailWhereUniqueInput;
  Project_ledgerOrderByWithRelationInput: Project_LedgerOrderByWithRelationInput;
  Project_ledgerScalarFieldEnum: Project_LedgerScalarFieldEnum;
  Project_ledgerWhereInput: Project_LedgerWhereInput;
  Project_ledgerWhereUniqueInput: Project_LedgerWhereUniqueInput;
  Query: ResolverTypeWrapper<{}>;
  Response: ResolverTypeWrapper<Response>;
  SortOrder: SortOrder;
  String: ResolverTypeWrapper<Scalars['String']>;
  StringFilter: StringFilter;
  StringNullableFilter: StringNullableFilter;
  TicketOrderByWithRelationInput: TicketOrderByWithRelationInput;
  TicketScalarFieldEnum: TicketScalarFieldEnum;
  TicketWhereInput: TicketWhereInput;
  TicketWhereUniqueInput: TicketWhereUniqueInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  BytesFilter: BytesFilter;
  ContributorOrderByWithRelationInput: ContributorOrderByWithRelationInput;
  ContributorWhereInput: ContributorWhereInput;
  ContributorWhereUniqueInput: ContributorWhereUniqueInput;
  DateTime: Scalars['DateTime'];
  DateTimeNullableFilter: DateTimeNullableFilter;
  Float: Scalars['Float'];
  FloatFilter: FloatFilter;
  Int: Scalars['Int'];
  IntFilter: IntFilter;
  IntNullableFilter: IntNullableFilter;
  JSON: Scalars['JSON'];
  Mutation: {};
  NestedBytesFilter: NestedBytesFilter;
  NestedDateTimeNullableFilter: NestedDateTimeNullableFilter;
  NestedFloatFilter: NestedFloatFilter;
  NestedIntFilter: NestedIntFilter;
  NestedIntNullableFilter: NestedIntNullableFilter;
  NestedStringFilter: NestedStringFilter;
  NestedStringNullableFilter: NestedStringNullableFilter;
  ProjectCreateInput: ProjectCreateInput;
  ProjectOrderByWithRelationInput: ProjectOrderByWithRelationInput;
  ProjectWhereInput: ProjectWhereInput;
  ProjectWhereUniqueInput: ProjectWhereUniqueInput;
  Project_detailOrderByWithRelationInput: Project_DetailOrderByWithRelationInput;
  Project_detailWhereInput: Project_DetailWhereInput;
  Project_detailWhereUniqueInput: Project_DetailWhereUniqueInput;
  Project_ledgerOrderByWithRelationInput: Project_LedgerOrderByWithRelationInput;
  Project_ledgerWhereInput: Project_LedgerWhereInput;
  Project_ledgerWhereUniqueInput: Project_LedgerWhereUniqueInput;
  Query: {};
  Response: Response;
  String: Scalars['String'];
  StringFilter: StringFilter;
  StringNullableFilter: StringNullableFilter;
  TicketOrderByWithRelationInput: TicketOrderByWithRelationInput;
  TicketWhereInput: TicketWhereInput;
  TicketWhereUniqueInput: TicketWhereUniqueInput;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  upsertProject?: Resolver<ResolversTypes['Response'], ParentType, ContextType, RequireFields<MutationUpsertProjectArgs, 'data'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  findManyContributor?: Resolver<ResolversTypes['Response'], ParentType, ContextType, Partial<QueryFindManyContributorArgs>>;
  findManyPersonalTicket?: Resolver<ResolversTypes['Response'], ParentType, ContextType, Partial<QueryFindManyPersonalTicketArgs>>;
  findManyProject?: Resolver<ResolversTypes['Response'], ParentType, ContextType, Partial<QueryFindManyProjectArgs>>;
  findManyProjectDetail?: Resolver<ResolversTypes['Response'], ParentType, ContextType, Partial<QueryFindManyProjectDetailArgs>>;
  findManyProjectLedger?: Resolver<ResolversTypes['Response'], ParentType, ContextType, Partial<QueryFindManyProjectLedgerArgs>>;
  findManyProjectTicket?: Resolver<ResolversTypes['Response'], ParentType, ContextType, Partial<QueryFindManyProjectTicketArgs>>;
};

export type ResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['Response'] = ResolversParentTypes['Response']> = {
  response?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  DateTime?: GraphQLScalarType;
  JSON?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Response?: ResponseResolvers<ContextType>;
};

