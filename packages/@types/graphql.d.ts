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
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
};

export type AddressCardCreateInput = {
  auth_type?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  evm_address?: InputMaybe<Scalars['String']>;
  merchant_id?: InputMaybe<Scalars['String']>;
  social_id?: InputMaybe<Scalars['String']>;
};

export type AddressCardOrderByWithRelationInput = {
  auth_type?: InputMaybe<SortOrder>;
  email?: InputMaybe<SortOrder>;
  evm_address?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  merchant_id?: InputMaybe<SortOrder>;
  social_id?: InputMaybe<SortOrder>;
};

export enum AddressCardScalarFieldEnum {
  AuthType = 'auth_type',
  CreatedAt = 'createdAt',
  Email = 'email',
  EvmAddress = 'evm_address',
  Id = 'id',
  MerchantId = 'merchant_id',
  SocialId = 'social_id',
  UpdatedAt = 'updatedAt'
}

export type AddressCardWhereInput = {
  AND?: InputMaybe<Array<AddressCardWhereInput>>;
  NOT?: InputMaybe<Array<AddressCardWhereInput>>;
  OR?: InputMaybe<Array<AddressCardWhereInput>>;
  auth_type?: InputMaybe<StringFilter>;
  email?: InputMaybe<StringFilter>;
  evm_address?: InputMaybe<StringFilter>;
  id?: InputMaybe<IntFilter>;
  merchant_id?: InputMaybe<StringFilter>;
  social_id?: InputMaybe<StringFilter>;
};

export type AddressCardWhereUniqueInput = {
  id?: InputMaybe<Scalars['Int']>;
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
  upsertAddressCard: Response;
  /** . */
  upsertProject: Response;
  /** . */
  upsertUser: Response;
};


export type MutationUpsertAddressCardArgs = {
  data: AddressCardCreateInput;
};


export type MutationUpsertProjectArgs = {
  data: ProjectCreateInput;
};


export type MutationUpsertUserArgs = {
  data: UserCreateInput;
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
  contributor_count?: InputMaybe<Scalars['Int']>;
  current_balance?: InputMaybe<Scalars['Int']>;
  name: Scalars['String'];
  picture?: InputMaybe<Scalars['String']>;
  previous_balance?: InputMaybe<Scalars['Int']>;
  project_id: Scalars['String'];
  service_id: Scalars['String'];
  total_claimed?: InputMaybe<Scalars['Int']>;
};

export type ProjectOrderByWithRelationInput = {
  contributor_count?: InputMaybe<SortOrder>;
  current_balance?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  picture?: InputMaybe<SortOrder>;
  previous_balance?: InputMaybe<SortOrder>;
  project_id?: InputMaybe<SortOrder>;
  service_id?: InputMaybe<SortOrder>;
  total_claimed?: InputMaybe<SortOrder>;
};

export enum ProjectScalarFieldEnum {
  ContributorCount = 'contributor_count',
  CreatedAt = 'created_at',
  CurrentBalance = 'current_balance',
  Id = 'id',
  Name = 'name',
  Picture = 'picture',
  PreviousBalance = 'previous_balance',
  ProjectId = 'project_id',
  ServiceId = 'service_id',
  TotalClaimed = 'total_claimed',
  UpdatedAt = 'updated_at'
}

export type ProjectWhereInput = {
  AND?: InputMaybe<Array<ProjectWhereInput>>;
  NOT?: InputMaybe<Array<ProjectWhereInput>>;
  OR?: InputMaybe<Array<ProjectWhereInput>>;
  contributor_count?: InputMaybe<IntFilter>;
  current_balance?: InputMaybe<IntFilter>;
  id?: InputMaybe<IntFilter>;
  name?: InputMaybe<StringFilter>;
  picture?: InputMaybe<StringFilter>;
  previous_balance?: InputMaybe<IntFilter>;
  project_id?: InputMaybe<StringFilter>;
  service_id?: InputMaybe<StringFilter>;
  total_claimed?: InputMaybe<IntFilter>;
};

export type ProjectWhereUniqueInput = {
  id?: InputMaybe<Scalars['Int']>;
};

export type Query = {
  __typename?: 'Query';
  /** . */
  findAddressCard: Response;
  /** . */
  findManyAddressCard: Response;
  /** . */
  findManyProject: Response;
  /** . */
  findManyUser: Array<User>;
  /** . */
  findUser: Response;
};


export type QueryFindAddressCardArgs = {
  cursor?: InputMaybe<AddressCardWhereUniqueInput>;
  distinct?: InputMaybe<Array<AddressCardScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<AddressCardOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<AddressCardWhereInput>;
};


export type QueryFindManyAddressCardArgs = {
  cursor?: InputMaybe<AddressCardWhereUniqueInput>;
  distinct?: InputMaybe<Array<AddressCardScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<AddressCardOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<AddressCardWhereInput>;
};


export type QueryFindManyProjectArgs = {
  cursor?: InputMaybe<ProjectWhereUniqueInput>;
  distinct?: InputMaybe<Array<ProjectScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ProjectOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ProjectWhereInput>;
};


export type QueryFindManyUserArgs = {
  cursor?: InputMaybe<UserWhereUniqueInput>;
  distinct?: InputMaybe<Array<UserScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<UserOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserWhereInput>;
};


export type QueryFindUserArgs = {
  cursor?: InputMaybe<UserWhereUniqueInput>;
  distinct?: InputMaybe<Array<UserScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<UserOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserWhereInput>;
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

export type User = {
  __typename?: 'User';
  address1: Scalars['String'];
  address2: Scalars['String'];
  address3: Scalars['String'];
  address4: Scalars['String'];
  auth_type: Scalars['String'];
  email: Scalars['String'];
  first_name: Scalars['String'];
  id: Scalars['ID'];
  last_name: Scalars['String'];
  name: Scalars['String'];
  social_id: Scalars['String'];
  tel: Scalars['String'];
  user_id: Scalars['String'];
  zip1: Scalars['String'];
  zip2: Scalars['String'];
};

export type UserCreateInput = {
  address1?: InputMaybe<Scalars['String']>;
  address2?: InputMaybe<Scalars['String']>;
  address3?: InputMaybe<Scalars['String']>;
  address4?: InputMaybe<Scalars['String']>;
  auth_type?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  first_name?: InputMaybe<Scalars['String']>;
  last_name?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  social_id?: InputMaybe<Scalars['String']>;
  tel?: InputMaybe<Scalars['String']>;
  user_id?: InputMaybe<Scalars['String']>;
  zip1?: InputMaybe<Scalars['String']>;
  zip2?: InputMaybe<Scalars['String']>;
};

export type UserOrderByWithRelationInput = {
  address1?: InputMaybe<SortOrder>;
  address2?: InputMaybe<SortOrder>;
  address3?: InputMaybe<SortOrder>;
  address4?: InputMaybe<SortOrder>;
  auth_type?: InputMaybe<SortOrder>;
  email?: InputMaybe<SortOrder>;
  first_name?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  last_name?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  password?: InputMaybe<SortOrder>;
  social_id?: InputMaybe<SortOrder>;
  tel?: InputMaybe<SortOrder>;
  user_id?: InputMaybe<SortOrder>;
  zip1?: InputMaybe<SortOrder>;
  zip2?: InputMaybe<SortOrder>;
};

export enum UserScalarFieldEnum {
  Address1 = 'address1',
  Address2 = 'address2',
  Address3 = 'address3',
  Address4 = 'address4',
  AuthType = 'auth_type',
  CreatedAt = 'createdAt',
  Email = 'email',
  FirstName = 'first_name',
  Id = 'id',
  LastName = 'last_name',
  Name = 'name',
  Password = 'password',
  SocialId = 'social_id',
  Tel = 'tel',
  UpdatedAt = 'updatedAt',
  UserId = 'user_id',
  Zip1 = 'zip1',
  Zip2 = 'zip2'
}

export type UserWhereInput = {
  AND?: InputMaybe<Array<UserWhereInput>>;
  NOT?: InputMaybe<Array<UserWhereInput>>;
  OR?: InputMaybe<Array<UserWhereInput>>;
  address1?: InputMaybe<StringFilter>;
  address2?: InputMaybe<StringFilter>;
  address3?: InputMaybe<StringFilter>;
  address4?: InputMaybe<StringFilter>;
  auth_type?: InputMaybe<StringFilter>;
  email?: InputMaybe<StringFilter>;
  first_name?: InputMaybe<StringFilter>;
  id?: InputMaybe<IntFilter>;
  last_name?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  password?: InputMaybe<StringNullableFilter>;
  social_id?: InputMaybe<StringFilter>;
  tel?: InputMaybe<StringFilter>;
  user_id?: InputMaybe<StringFilter>;
  zip1?: InputMaybe<StringFilter>;
  zip2?: InputMaybe<StringFilter>;
};

export type UserWhereUniqueInput = {
  id?: InputMaybe<Scalars['Int']>;
  user_id?: InputMaybe<Scalars['String']>;
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
  AddressCardCreateInput: AddressCardCreateInput;
  AddressCardOrderByWithRelationInput: AddressCardOrderByWithRelationInput;
  AddressCardScalarFieldEnum: AddressCardScalarFieldEnum;
  AddressCardWhereInput: AddressCardWhereInput;
  AddressCardWhereUniqueInput: AddressCardWhereUniqueInput;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  IntFilter: IntFilter;
  JSON: ResolverTypeWrapper<Scalars['JSON']>;
  Mutation: ResolverTypeWrapper<{}>;
  NestedIntFilter: NestedIntFilter;
  NestedStringFilter: NestedStringFilter;
  NestedStringNullableFilter: NestedStringNullableFilter;
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
  StringNullableFilter: StringNullableFilter;
  User: ResolverTypeWrapper<User>;
  UserCreateInput: UserCreateInput;
  UserOrderByWithRelationInput: UserOrderByWithRelationInput;
  UserScalarFieldEnum: UserScalarFieldEnum;
  UserWhereInput: UserWhereInput;
  UserWhereUniqueInput: UserWhereUniqueInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AddressCardCreateInput: AddressCardCreateInput;
  AddressCardOrderByWithRelationInput: AddressCardOrderByWithRelationInput;
  AddressCardWhereInput: AddressCardWhereInput;
  AddressCardWhereUniqueInput: AddressCardWhereUniqueInput;
  Boolean: Scalars['Boolean'];
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  IntFilter: IntFilter;
  JSON: Scalars['JSON'];
  Mutation: {};
  NestedIntFilter: NestedIntFilter;
  NestedStringFilter: NestedStringFilter;
  NestedStringNullableFilter: NestedStringNullableFilter;
  ProjectCreateInput: ProjectCreateInput;
  ProjectOrderByWithRelationInput: ProjectOrderByWithRelationInput;
  ProjectWhereInput: ProjectWhereInput;
  ProjectWhereUniqueInput: ProjectWhereUniqueInput;
  Query: {};
  Response: Response;
  String: Scalars['String'];
  StringFilter: StringFilter;
  StringNullableFilter: StringNullableFilter;
  User: User;
  UserCreateInput: UserCreateInput;
  UserOrderByWithRelationInput: UserOrderByWithRelationInput;
  UserWhereInput: UserWhereInput;
  UserWhereUniqueInput: UserWhereUniqueInput;
};

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  upsertAddressCard?: Resolver<ResolversTypes['Response'], ParentType, ContextType, RequireFields<MutationUpsertAddressCardArgs, 'data'>>;
  upsertProject?: Resolver<ResolversTypes['Response'], ParentType, ContextType, RequireFields<MutationUpsertProjectArgs, 'data'>>;
  upsertUser?: Resolver<ResolversTypes['Response'], ParentType, ContextType, RequireFields<MutationUpsertUserArgs, 'data'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  findAddressCard?: Resolver<ResolversTypes['Response'], ParentType, ContextType, Partial<QueryFindAddressCardArgs>>;
  findManyAddressCard?: Resolver<ResolversTypes['Response'], ParentType, ContextType, Partial<QueryFindManyAddressCardArgs>>;
  findManyProject?: Resolver<ResolversTypes['Response'], ParentType, ContextType, Partial<QueryFindManyProjectArgs>>;
  findManyUser?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType, Partial<QueryFindManyUserArgs>>;
  findUser?: Resolver<ResolversTypes['Response'], ParentType, ContextType, Partial<QueryFindUserArgs>>;
};

export type ResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['Response'] = ResolversParentTypes['Response']> = {
  response?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  address1?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  address2?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  address3?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  address4?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  auth_type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  first_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  last_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  social_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tel?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  zip1?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  zip2?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  JSON?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Response?: ResponseResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

