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

export type Mutation = {
  __typename?: 'Mutation';
  /** . */
  upsertProject: Response;
};


export type MutationUpsertProjectArgs = {
  data: ProjectCreateInput;
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

export type ProjectCreateInput = {
  avatar_uri?: InputMaybe<Scalars['String']>;
  campaign_deadline?: InputMaybe<Scalars['DateTime']>;
  carry_over_balance?: InputMaybe<Scalars['Int']>;
  complete_date?: InputMaybe<Scalars['DateTime']>;
  contributor_count?: InputMaybe<Scalars['Int']>;
  credit_amount?: InputMaybe<Scalars['Int']>;
  end_date?: InputMaybe<Scalars['DateTime']>;
  fundraising_deadline?: InputMaybe<Scalars['DateTime']>;
  minimum_contributor_count?: InputMaybe<Scalars['Int']>;
  name: Scalars['String'];
  price_coefficient?: InputMaybe<Scalars['Int']>;
  project_code: Scalars['Int'];
  service_id: Scalars['Int'];
  start_date?: InputMaybe<Scalars['DateTime']>;
  ticket_count_closed?: InputMaybe<Scalars['Int']>;
  ticket_count_total?: InputMaybe<Scalars['Int']>;
  total_claimed?: InputMaybe<Scalars['Int']>;
};

export type ProjectOrderByWithRelationInput = {
  avatar_uri?: InputMaybe<SortOrder>;
  campaign_deadline?: InputMaybe<SortOrder>;
  carry_over_balance?: InputMaybe<SortOrder>;
  complete_date?: InputMaybe<SortOrder>;
  contributor_count?: InputMaybe<SortOrder>;
  credit_amount?: InputMaybe<SortOrder>;
  end_date?: InputMaybe<SortOrder>;
  fundraising_deadline?: InputMaybe<SortOrder>;
  minimum_contributor_count?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  price_coefficient?: InputMaybe<SortOrder>;
  project_code?: InputMaybe<SortOrder>;
  project_id?: InputMaybe<SortOrder>;
  service_id?: InputMaybe<SortOrder>;
  start_date?: InputMaybe<SortOrder>;
  ticket_count_closed?: InputMaybe<SortOrder>;
  ticket_count_total?: InputMaybe<SortOrder>;
  total_claimed?: InputMaybe<SortOrder>;
};

export enum ProjectScalarFieldEnum {
  AvatarUri = 'avatar_uri',
  CampaignDeadline = 'campaign_deadline',
  CarryOverBalance = 'carry_over_balance',
  CompleteDate = 'complete_date',
  ContributorCount = 'contributor_count',
  CreatedAt = 'created_at',
  CreditAmount = 'credit_amount',
  EndDate = 'end_date',
  FundraisingDeadline = 'fundraising_deadline',
  MinimumContributorCount = 'minimum_contributor_count',
  Name = 'name',
  PriceCoefficient = 'price_coefficient',
  ProjectCode = 'project_code',
  ProjectId = 'project_id',
  ServiceId = 'service_id',
  StartDate = 'start_date',
  TicketCountClosed = 'ticket_count_closed',
  TicketCountTotal = 'ticket_count_total',
  TotalClaimed = 'total_claimed',
  UpdatedAt = 'updated_at'
}

export type ProjectWhereInput = {
  AND?: InputMaybe<Array<ProjectWhereInput>>;
  NOT?: InputMaybe<Array<ProjectWhereInput>>;
  OR?: InputMaybe<Array<ProjectWhereInput>>;
  avatar_uri?: InputMaybe<StringFilter>;
  campaign_deadline?: InputMaybe<DateTimeNullableFilter>;
  carry_over_balance?: InputMaybe<IntFilter>;
  complete_date?: InputMaybe<DateTimeNullableFilter>;
  contributor_count?: InputMaybe<IntFilter>;
  credit_amount?: InputMaybe<IntFilter>;
  end_date?: InputMaybe<DateTimeNullableFilter>;
  fundraising_deadline?: InputMaybe<DateTimeNullableFilter>;
  minimum_contributor_count?: InputMaybe<IntFilter>;
  name?: InputMaybe<StringFilter>;
  price_coefficient?: InputMaybe<IntFilter>;
  project_code?: InputMaybe<IntFilter>;
  project_id?: InputMaybe<IntFilter>;
  service_id?: InputMaybe<IntFilter>;
  start_date?: InputMaybe<DateTimeNullableFilter>;
  ticket_count_closed?: InputMaybe<IntFilter>;
  ticket_count_total?: InputMaybe<IntFilter>;
  total_claimed?: InputMaybe<IntFilter>;
};

export type ProjectWhereUniqueInput = {
  project_id?: InputMaybe<Scalars['Int']>;
};

export type Query = {
  __typename?: 'Query';
  /** . */
  findManyProject: Response;
};


export type QueryFindManyProjectArgs = {
  cursor?: InputMaybe<ProjectWhereUniqueInput>;
  distinct?: InputMaybe<Array<ProjectScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ProjectOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ProjectWhereInput>;
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
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  DateTimeNullableFilter: DateTimeNullableFilter;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  IntFilter: IntFilter;
  JSON: ResolverTypeWrapper<Scalars['JSON']>;
  Mutation: ResolverTypeWrapper<{}>;
  NestedDateTimeNullableFilter: NestedDateTimeNullableFilter;
  NestedIntFilter: NestedIntFilter;
  NestedStringFilter: NestedStringFilter;
  ProjectCreateInput: ProjectCreateInput;
  ProjectOrderByWithRelationInput: ProjectOrderByWithRelationInput;
  ProjectScalarFieldEnum: ProjectScalarFieldEnum;
  ProjectWhereInput: ProjectWhereInput;
  ProjectWhereUniqueInput: ProjectWhereUniqueInput;
  Query: ResolverTypeWrapper<{}>;
  Response: ResolverTypeWrapper<Response>;
  SortOrder: SortOrder;
  String: ResolverTypeWrapper<Scalars['String']>;
  StringFilter: StringFilter;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  DateTime: Scalars['DateTime'];
  DateTimeNullableFilter: DateTimeNullableFilter;
  Int: Scalars['Int'];
  IntFilter: IntFilter;
  JSON: Scalars['JSON'];
  Mutation: {};
  NestedDateTimeNullableFilter: NestedDateTimeNullableFilter;
  NestedIntFilter: NestedIntFilter;
  NestedStringFilter: NestedStringFilter;
  ProjectCreateInput: ProjectCreateInput;
  ProjectOrderByWithRelationInput: ProjectOrderByWithRelationInput;
  ProjectWhereInput: ProjectWhereInput;
  ProjectWhereUniqueInput: ProjectWhereUniqueInput;
  Query: {};
  Response: Response;
  String: Scalars['String'];
  StringFilter: StringFilter;
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
  findManyProject?: Resolver<ResolversTypes['Response'], ParentType, ContextType, Partial<QueryFindManyProjectArgs>>;
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

