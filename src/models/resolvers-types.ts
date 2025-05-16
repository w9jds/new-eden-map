import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  BigInt: { input: any; output: any; }
  DateTime: { input: any; output: any; }
  Timestamp: { input: any; output: any; }
};

export type Alliance = {
  __typename?: 'Alliance';
  creator?: Maybe<Corporation>;
  executor?: Maybe<Corporation>;
  founded?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['Int']['output'];
  name?: Maybe<Scalars['String']['output']>;
  ticker?: Maybe<Scalars['String']['output']>;
};

export type Attacker = {
  __typename?: 'Attacker';
  alliance?: Maybe<Alliance>;
  corporation?: Maybe<Corporation>;
  damageDone?: Maybe<Scalars['Float']['output']>;
  finalBlow?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['Int']['output'];
  name?: Maybe<Scalars['String']['output']>;
  securityStatus?: Maybe<Scalars['Float']['output']>;
  ship?: Maybe<Type>;
  weapon?: Maybe<Type>;
};

export type Capsuleer = {
  __typename?: 'Capsuleer';
  alliance?: Maybe<Alliance>;
  birthday?: Maybe<Scalars['DateTime']['output']>;
  corporation?: Maybe<Corporation>;
  description?: Maybe<Scalars['String']['output']>;
  gender?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  name?: Maybe<Scalars['String']['output']>;
  securityStatus?: Maybe<Scalars['Float']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type Category = {
  __typename?: 'Category';
  groups: Array<Group>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  published: Scalars['Boolean']['output'];
};

export type Constellation = {
  __typename?: 'Constellation';
  id: Scalars['Int']['output'];
  name?: Maybe<Scalars['String']['output']>;
  position?: Maybe<Position>;
  region?: Maybe<Region>;
  systems?: Maybe<Array<Maybe<SolarSystem>>>;
};

export type Corporation = {
  __typename?: 'Corporation';
  alliance?: Maybe<Alliance>;
  ceo?: Maybe<Capsuleer>;
  creator?: Maybe<Capsuleer>;
  description?: Maybe<Scalars['String']['output']>;
  founded?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['Int']['output'];
  membersCount?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  shares?: Maybe<Scalars['Int']['output']>;
  taxRate?: Maybe<Scalars['Float']['output']>;
  ticker?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
  warEligible?: Maybe<Scalars['Boolean']['output']>;
};

export type DogmaAttribute = {
  __typename?: 'DogmaAttribute';
  defaultValue?: Maybe<Scalars['Float']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  displayName?: Maybe<Scalars['String']['output']>;
  highIsGood?: Maybe<Scalars['Boolean']['output']>;
  iconId?: Maybe<Scalars['Int']['output']>;
  id: Scalars['Int']['output'];
  name?: Maybe<Scalars['String']['output']>;
  published?: Maybe<Scalars['Boolean']['output']>;
  stackable?: Maybe<Scalars['Boolean']['output']>;
  unitId?: Maybe<Scalars['Int']['output']>;
};

export type DogmaEffect = {
  __typename?: 'DogmaEffect';
  description?: Maybe<Scalars['String']['output']>;
  disallowAutoRepeat?: Maybe<Scalars['Boolean']['output']>;
  dischargeAttribute?: Maybe<DogmaAttribute>;
  displayName?: Maybe<Scalars['String']['output']>;
  durationAttribute?: Maybe<DogmaAttribute>;
  effectCategory?: Maybe<Scalars['Int']['output']>;
  electronicChance?: Maybe<Scalars['Boolean']['output']>;
  falloffAttribute?: Maybe<DogmaAttribute>;
  iconId?: Maybe<Scalars['Int']['output']>;
  id: Scalars['Int']['output'];
  isAssistance?: Maybe<Scalars['Boolean']['output']>;
  isOffensive?: Maybe<Scalars['Boolean']['output']>;
  isWarpSafe?: Maybe<Scalars['Boolean']['output']>;
  modifiers?: Maybe<Array<Maybe<EffectModifier>>>;
  name?: Maybe<Scalars['String']['output']>;
  postExpression?: Maybe<Scalars['Int']['output']>;
  preExpression?: Maybe<Scalars['Int']['output']>;
  published?: Maybe<Scalars['Boolean']['output']>;
  rangeAttribute?: Maybe<DogmaAttribute>;
  rangeChance?: Maybe<Scalars['Boolean']['output']>;
  trackingSpeedAttribute?: Maybe<DogmaAttribute>;
};

export type EffectModifier = {
  __typename?: 'EffectModifier';
  domain?: Maybe<Scalars['String']['output']>;
  func?: Maybe<Scalars['String']['output']>;
  modifiedAttribute?: Maybe<DogmaAttribute>;
  modifyingAttribute?: Maybe<DogmaAttribute>;
  operator?: Maybe<Scalars['Int']['output']>;
};

export type Faction = {
  __typename?: 'Faction';
  corporation?: Maybe<Corporation>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  isUnique?: Maybe<Scalars['Boolean']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  sizeFactor?: Maybe<Scalars['Float']['output']>;
  stationCount?: Maybe<Scalars['Int']['output']>;
  stationSystemCount?: Maybe<Scalars['Int']['output']>;
  system?: Maybe<SolarSystem>;
};

export type GateKills = {
  __typename?: 'GateKills';
  count?: Maybe<Scalars['Int']['output']>;
  instances?: Maybe<Array<Maybe<KillSummary>>>;
  isPotentialCamp?: Maybe<Scalars['Boolean']['output']>;
};

export type Group = {
  __typename?: 'Group';
  category?: Maybe<Category>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  published: Scalars['Boolean']['output'];
  types: Array<Type>;
};

export type GroupSovereignty = {
  __typename?: 'GroupSovereignty';
  alliance?: Maybe<Alliance>;
  corporation?: Maybe<Corporation>;
  systems?: Maybe<Array<Maybe<SolarSystem>>>;
};

export type HourlyStatistic = {
  __typename?: 'HourlyStatistic';
  jumps?: Maybe<Scalars['Int']['output']>;
  npcKills?: Maybe<Scalars['Int']['output']>;
  podKills?: Maybe<Scalars['Int']['output']>;
  processedAt?: Maybe<Scalars['DateTime']['output']>;
  shipKills?: Maybe<Scalars['Int']['output']>;
};

export type Kill = {
  attackers?: Maybe<Array<Maybe<Attacker>>>;
  id: Scalars['Int']['output'];
  system?: Maybe<SolarSystem>;
  time?: Maybe<Scalars['String']['output']>;
  victim?: Maybe<Victim>;
};

export type KillItem = {
  __typename?: 'KillItem';
  flag?: Maybe<Scalars['Int']['output']>;
  quantityDestroyed?: Maybe<Scalars['Int']['output']>;
  quantityDropped?: Maybe<Scalars['Int']['output']>;
  type?: Maybe<Type>;
};

export type KillMail = Kill & {
  __typename?: 'KillMail';
  attackers?: Maybe<Array<Maybe<Attacker>>>;
  id: Scalars['Int']['output'];
  system?: Maybe<SolarSystem>;
  time?: Maybe<Scalars['String']['output']>;
  victim?: Maybe<Victim>;
};

export type KillSummary = Kill & {
  __typename?: 'KillSummary';
  attackers?: Maybe<Array<Maybe<Attacker>>>;
  destroyedValue?: Maybe<Scalars['Float']['output']>;
  droppedValue?: Maybe<Scalars['Float']['output']>;
  fittedValue?: Maybe<Scalars['Float']['output']>;
  id: Scalars['Int']['output'];
  nearBy?: Maybe<NearBy>;
  system?: Maybe<SolarSystem>;
  time?: Maybe<Scalars['String']['output']>;
  totalValue?: Maybe<Scalars['Float']['output']>;
  victim?: Maybe<Victim>;
};

export type MarketGroup = {
  __typename?: 'MarketGroup';
  description: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  parentGroup?: Maybe<MarketGroup>;
  types: Array<Type>;
};

export type NearBy = {
  __typename?: 'NearBy';
  distance?: Maybe<Scalars['Float']['output']>;
  id: Scalars['Int']['output'];
  name?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export type Position = {
  __typename?: 'Position';
  x?: Maybe<Scalars['BigInt']['output']>;
  y?: Maybe<Scalars['BigInt']['output']>;
  z?: Maybe<Scalars['BigInt']['output']>;
};

export type Query = {
  __typename?: 'Query';
  alliance?: Maybe<Alliance>;
  capsuleer?: Maybe<Capsuleer>;
  constellations?: Maybe<Array<Maybe<Constellation>>>;
  corporation?: Maybe<Corporation>;
  regions?: Maybe<Array<Maybe<Region>>>;
  routes?: Maybe<Array<Maybe<Array<Maybe<Stargate>>>>>;
  search?: Maybe<SearchResults>;
  sovereignty?: Maybe<Array<Maybe<GroupSovereignty>>>;
  stargates?: Maybe<Array<Maybe<Stargate>>>;
  systems?: Maybe<Array<Maybe<SolarSystem>>>;
};


export type QueryAllianceArgs = {
  id: Scalars['Int']['input'];
};


export type QueryCapsuleerArgs = {
  id: Scalars['Int']['input'];
};


export type QueryConstellationsArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type QueryCorporationArgs = {
  id: Scalars['Int']['input'];
};


export type QueryRegionsArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type QueryRoutesArgs = {
  options?: InputMaybe<RouteOptions>;
};


export type QuerySearchArgs = {
  options?: InputMaybe<SearchParameters>;
};


export type QueryStargatesArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type QuerySystemsArgs = {
  ids: Array<Scalars['Int']['input']>;
};

export type Region = {
  __typename?: 'Region';
  constellations?: Maybe<Array<Maybe<Constellation>>>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  name?: Maybe<Scalars['String']['output']>;
};

export type RouteOptions = {
  avoid?: InputMaybe<Array<Scalars['Int']['input']>>;
  destinations: Array<Scalars['Int']['input']>;
  start: Scalars['Int']['input'];
  type?: InputMaybe<RouteType>;
};

export type RouteStop = {
  __typename?: 'RouteStop';
  id: Scalars['Int']['output'];
  name?: Maybe<Scalars['String']['output']>;
};

export enum RouteType {
  LessSafe = 'less_safe',
  Secure = 'secure',
  Shortest = 'shortest'
}

export type SearchParameters = {
  categories?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  language?: InputMaybe<Scalars['String']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  strict?: InputMaybe<Scalars['Boolean']['input']>;
};

export type SearchResults = {
  __typename?: 'SearchResults';
  agent?: Maybe<Array<Maybe<Scalars['Int']['output']>>>;
  alliance?: Maybe<Array<Maybe<Scalars['Int']['output']>>>;
  character?: Maybe<Array<Maybe<Scalars['Int']['output']>>>;
  constellation?: Maybe<Array<Maybe<Scalars['Int']['output']>>>;
  corporation?: Maybe<Array<Maybe<Scalars['Int']['output']>>>;
  faction?: Maybe<Array<Maybe<Scalars['Int']['output']>>>;
  inventory_type?: Maybe<Array<Maybe<Scalars['Int']['output']>>>;
  region?: Maybe<Array<Maybe<Scalars['Int']['output']>>>;
  solar_system?: Maybe<Array<Maybe<Scalars['Int']['output']>>>;
  station?: Maybe<Array<Maybe<Scalars['Int']['output']>>>;
  structure?: Maybe<Array<Maybe<Scalars['Int']['output']>>>;
};

export type SolarSystem = {
  __typename?: 'SolarSystem';
  constellation?: Maybe<Constellation>;
  factionWarfare?: Maybe<SystemWarfare>;
  id: Scalars['Int']['output'];
  name?: Maybe<Scalars['String']['output']>;
  position?: Maybe<Position>;
  securityClass?: Maybe<Scalars['String']['output']>;
  securityStatus?: Maybe<Scalars['Float']['output']>;
  sovereignty?: Maybe<SystemSovereignty>;
  starId?: Maybe<Scalars['Int']['output']>;
  stargates?: Maybe<Array<Maybe<Stargate>>>;
  statistics?: Maybe<Array<Maybe<HourlyStatistic>>>;
};


export type SolarSystemStatisticsArgs = {
  hours?: InputMaybe<Scalars['Int']['input']>;
};

export type Stargate = {
  __typename?: 'Stargate';
  destination?: Maybe<Stargate>;
  id: Scalars['Int']['output'];
  kills?: Maybe<GateKills>;
  name?: Maybe<Scalars['String']['output']>;
  position?: Maybe<Position>;
  system?: Maybe<SolarSystem>;
};


export type StargateKillsArgs = {
  duration?: InputMaybe<Scalars['Int']['input']>;
};

export type SystemSovereignty = {
  __typename?: 'SystemSovereignty';
  alliance?: Maybe<Alliance>;
  corporation?: Maybe<Corporation>;
};

export enum SystemState {
  Captured = 'captured',
  Contested = 'contested',
  Uncontested = 'uncontested',
  Vulnerable = 'vulnerable'
}

export type SystemWarfare = {
  __typename?: 'SystemWarfare';
  contested?: Maybe<SystemState>;
  occupier?: Maybe<Faction>;
  owner?: Maybe<Faction>;
  system?: Maybe<SolarSystem>;
  threshold?: Maybe<Scalars['Float']['output']>;
  victoryPoints?: Maybe<Scalars['Float']['output']>;
};

export type Title = {
  __typename?: 'Title';
  id: Scalars['Int']['output'];
  name?: Maybe<Scalars['String']['output']>;
};

export type Type = {
  __typename?: 'Type';
  capacity?: Maybe<Scalars['Float']['output']>;
  description: Scalars['String']['output'];
  dogmaAttributes: Array<DogmaAttribute>;
  dogmaEffects: Array<DogmaEffect>;
  graphicId?: Maybe<Scalars['Int']['output']>;
  group?: Maybe<Group>;
  iconId?: Maybe<Scalars['Int']['output']>;
  id: Scalars['Int']['output'];
  marketGroup?: Maybe<MarketGroup>;
  mass?: Maybe<Scalars['Float']['output']>;
  name: Scalars['String']['output'];
  packagedVolume?: Maybe<Scalars['Float']['output']>;
  portionSize?: Maybe<Scalars['Int']['output']>;
  published: Scalars['Boolean']['output'];
  radius?: Maybe<Scalars['Float']['output']>;
  volume?: Maybe<Scalars['Float']['output']>;
};

export type Victim = {
  __typename?: 'Victim';
  alliance?: Maybe<Alliance>;
  corporation?: Maybe<Corporation>;
  damageTaken?: Maybe<Scalars['Int']['output']>;
  id: Scalars['Int']['output'];
  items?: Maybe<Array<Maybe<KillItem>>>;
  name?: Maybe<Scalars['String']['output']>;
  position?: Maybe<Position>;
  ship?: Maybe<Type>;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

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


/** Mapping of interface types */
export type ResolversInterfaceTypes<_RefType extends Record<string, unknown>> = ResolversObject<{
  Kill: ( KillMail ) | ( KillSummary );
}>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Alliance: ResolverTypeWrapper<Alliance>;
  Attacker: ResolverTypeWrapper<Attacker>;
  BigInt: ResolverTypeWrapper<Scalars['BigInt']['output']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Capsuleer: ResolverTypeWrapper<Capsuleer>;
  Category: ResolverTypeWrapper<Category>;
  Constellation: ResolverTypeWrapper<Constellation>;
  Corporation: ResolverTypeWrapper<Corporation>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  DogmaAttribute: ResolverTypeWrapper<DogmaAttribute>;
  DogmaEffect: ResolverTypeWrapper<DogmaEffect>;
  EffectModifier: ResolverTypeWrapper<EffectModifier>;
  Faction: ResolverTypeWrapper<Faction>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  GateKills: ResolverTypeWrapper<GateKills>;
  Group: ResolverTypeWrapper<Group>;
  GroupSovereignty: ResolverTypeWrapper<GroupSovereignty>;
  HourlyStatistic: ResolverTypeWrapper<HourlyStatistic>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Kill: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['Kill']>;
  KillItem: ResolverTypeWrapper<KillItem>;
  KillMail: ResolverTypeWrapper<KillMail>;
  KillSummary: ResolverTypeWrapper<KillSummary>;
  MarketGroup: ResolverTypeWrapper<MarketGroup>;
  NearBy: ResolverTypeWrapper<NearBy>;
  Position: ResolverTypeWrapper<Position>;
  Query: ResolverTypeWrapper<{}>;
  Region: ResolverTypeWrapper<Region>;
  RouteOptions: RouteOptions;
  RouteStop: ResolverTypeWrapper<RouteStop>;
  RouteType: RouteType;
  SearchParameters: SearchParameters;
  SearchResults: ResolverTypeWrapper<SearchResults>;
  SolarSystem: ResolverTypeWrapper<SolarSystem>;
  Stargate: ResolverTypeWrapper<Stargate>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  SystemSovereignty: ResolverTypeWrapper<SystemSovereignty>;
  SystemState: SystemState;
  SystemWarfare: ResolverTypeWrapper<SystemWarfare>;
  Timestamp: ResolverTypeWrapper<Scalars['Timestamp']['output']>;
  Title: ResolverTypeWrapper<Title>;
  Type: ResolverTypeWrapper<Type>;
  Victim: ResolverTypeWrapper<Victim>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Alliance: Alliance;
  Attacker: Attacker;
  BigInt: Scalars['BigInt']['output'];
  Boolean: Scalars['Boolean']['output'];
  Capsuleer: Capsuleer;
  Category: Category;
  Constellation: Constellation;
  Corporation: Corporation;
  DateTime: Scalars['DateTime']['output'];
  DogmaAttribute: DogmaAttribute;
  DogmaEffect: DogmaEffect;
  EffectModifier: EffectModifier;
  Faction: Faction;
  Float: Scalars['Float']['output'];
  GateKills: GateKills;
  Group: Group;
  GroupSovereignty: GroupSovereignty;
  HourlyStatistic: HourlyStatistic;
  Int: Scalars['Int']['output'];
  Kill: ResolversInterfaceTypes<ResolversParentTypes>['Kill'];
  KillItem: KillItem;
  KillMail: KillMail;
  KillSummary: KillSummary;
  MarketGroup: MarketGroup;
  NearBy: NearBy;
  Position: Position;
  Query: {};
  Region: Region;
  RouteOptions: RouteOptions;
  RouteStop: RouteStop;
  SearchParameters: SearchParameters;
  SearchResults: SearchResults;
  SolarSystem: SolarSystem;
  Stargate: Stargate;
  String: Scalars['String']['output'];
  SystemSovereignty: SystemSovereignty;
  SystemWarfare: SystemWarfare;
  Timestamp: Scalars['Timestamp']['output'];
  Title: Title;
  Type: Type;
  Victim: Victim;
}>;

export type AllianceResolvers<ContextType = any, ParentType extends ResolversParentTypes['Alliance'] = ResolversParentTypes['Alliance']> = ResolversObject<{
  creator?: Resolver<Maybe<ResolversTypes['Corporation']>, ParentType, ContextType>;
  executor?: Resolver<Maybe<ResolversTypes['Corporation']>, ParentType, ContextType>;
  founded?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  ticker?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AttackerResolvers<ContextType = any, ParentType extends ResolversParentTypes['Attacker'] = ResolversParentTypes['Attacker']> = ResolversObject<{
  alliance?: Resolver<Maybe<ResolversTypes['Alliance']>, ParentType, ContextType>;
  corporation?: Resolver<Maybe<ResolversTypes['Corporation']>, ParentType, ContextType>;
  damageDone?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  finalBlow?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  securityStatus?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  ship?: Resolver<Maybe<ResolversTypes['Type']>, ParentType, ContextType>;
  weapon?: Resolver<Maybe<ResolversTypes['Type']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface BigIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigInt'], any> {
  name: 'BigInt';
}

export type CapsuleerResolvers<ContextType = any, ParentType extends ResolversParentTypes['Capsuleer'] = ResolversParentTypes['Capsuleer']> = ResolversObject<{
  alliance?: Resolver<Maybe<ResolversTypes['Alliance']>, ParentType, ContextType>;
  birthday?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  corporation?: Resolver<Maybe<ResolversTypes['Corporation']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  gender?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  securityStatus?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CategoryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Category'] = ResolversParentTypes['Category']> = ResolversObject<{
  groups?: Resolver<Array<ResolversTypes['Group']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  published?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ConstellationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Constellation'] = ResolversParentTypes['Constellation']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  position?: Resolver<Maybe<ResolversTypes['Position']>, ParentType, ContextType>;
  region?: Resolver<Maybe<ResolversTypes['Region']>, ParentType, ContextType>;
  systems?: Resolver<Maybe<Array<Maybe<ResolversTypes['SolarSystem']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CorporationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Corporation'] = ResolversParentTypes['Corporation']> = ResolversObject<{
  alliance?: Resolver<Maybe<ResolversTypes['Alliance']>, ParentType, ContextType>;
  ceo?: Resolver<Maybe<ResolversTypes['Capsuleer']>, ParentType, ContextType>;
  creator?: Resolver<Maybe<ResolversTypes['Capsuleer']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  founded?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  membersCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  shares?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  taxRate?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  ticker?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  warEligible?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type DogmaAttributeResolvers<ContextType = any, ParentType extends ResolversParentTypes['DogmaAttribute'] = ResolversParentTypes['DogmaAttribute']> = ResolversObject<{
  defaultValue?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  displayName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  highIsGood?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  iconId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  published?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  stackable?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  unitId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DogmaEffectResolvers<ContextType = any, ParentType extends ResolversParentTypes['DogmaEffect'] = ResolversParentTypes['DogmaEffect']> = ResolversObject<{
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  disallowAutoRepeat?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  dischargeAttribute?: Resolver<Maybe<ResolversTypes['DogmaAttribute']>, ParentType, ContextType>;
  displayName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  durationAttribute?: Resolver<Maybe<ResolversTypes['DogmaAttribute']>, ParentType, ContextType>;
  effectCategory?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  electronicChance?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  falloffAttribute?: Resolver<Maybe<ResolversTypes['DogmaAttribute']>, ParentType, ContextType>;
  iconId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  isAssistance?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isOffensive?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isWarpSafe?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  modifiers?: Resolver<Maybe<Array<Maybe<ResolversTypes['EffectModifier']>>>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  postExpression?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  preExpression?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  published?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  rangeAttribute?: Resolver<Maybe<ResolversTypes['DogmaAttribute']>, ParentType, ContextType>;
  rangeChance?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  trackingSpeedAttribute?: Resolver<Maybe<ResolversTypes['DogmaAttribute']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type EffectModifierResolvers<ContextType = any, ParentType extends ResolversParentTypes['EffectModifier'] = ResolversParentTypes['EffectModifier']> = ResolversObject<{
  domain?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  func?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  modifiedAttribute?: Resolver<Maybe<ResolversTypes['DogmaAttribute']>, ParentType, ContextType>;
  modifyingAttribute?: Resolver<Maybe<ResolversTypes['DogmaAttribute']>, ParentType, ContextType>;
  operator?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type FactionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Faction'] = ResolversParentTypes['Faction']> = ResolversObject<{
  corporation?: Resolver<Maybe<ResolversTypes['Corporation']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  isUnique?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sizeFactor?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  stationCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  stationSystemCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  system?: Resolver<Maybe<ResolversTypes['SolarSystem']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GateKillsResolvers<ContextType = any, ParentType extends ResolversParentTypes['GateKills'] = ResolversParentTypes['GateKills']> = ResolversObject<{
  count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  instances?: Resolver<Maybe<Array<Maybe<ResolversTypes['KillSummary']>>>, ParentType, ContextType>;
  isPotentialCamp?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GroupResolvers<ContextType = any, ParentType extends ResolversParentTypes['Group'] = ResolversParentTypes['Group']> = ResolversObject<{
  category?: Resolver<Maybe<ResolversTypes['Category']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  published?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  types?: Resolver<Array<ResolversTypes['Type']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GroupSovereigntyResolvers<ContextType = any, ParentType extends ResolversParentTypes['GroupSovereignty'] = ResolversParentTypes['GroupSovereignty']> = ResolversObject<{
  alliance?: Resolver<Maybe<ResolversTypes['Alliance']>, ParentType, ContextType>;
  corporation?: Resolver<Maybe<ResolversTypes['Corporation']>, ParentType, ContextType>;
  systems?: Resolver<Maybe<Array<Maybe<ResolversTypes['SolarSystem']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type HourlyStatisticResolvers<ContextType = any, ParentType extends ResolversParentTypes['HourlyStatistic'] = ResolversParentTypes['HourlyStatistic']> = ResolversObject<{
  jumps?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  npcKills?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  podKills?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  processedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  shipKills?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type KillResolvers<ContextType = any, ParentType extends ResolversParentTypes['Kill'] = ResolversParentTypes['Kill']> = ResolversObject<{
  __resolveType: TypeResolveFn<'KillMail' | 'KillSummary', ParentType, ContextType>;
  attackers?: Resolver<Maybe<Array<Maybe<ResolversTypes['Attacker']>>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  system?: Resolver<Maybe<ResolversTypes['SolarSystem']>, ParentType, ContextType>;
  time?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  victim?: Resolver<Maybe<ResolversTypes['Victim']>, ParentType, ContextType>;
}>;

export type KillItemResolvers<ContextType = any, ParentType extends ResolversParentTypes['KillItem'] = ResolversParentTypes['KillItem']> = ResolversObject<{
  flag?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  quantityDestroyed?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  quantityDropped?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['Type']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type KillMailResolvers<ContextType = any, ParentType extends ResolversParentTypes['KillMail'] = ResolversParentTypes['KillMail']> = ResolversObject<{
  attackers?: Resolver<Maybe<Array<Maybe<ResolversTypes['Attacker']>>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  system?: Resolver<Maybe<ResolversTypes['SolarSystem']>, ParentType, ContextType>;
  time?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  victim?: Resolver<Maybe<ResolversTypes['Victim']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type KillSummaryResolvers<ContextType = any, ParentType extends ResolversParentTypes['KillSummary'] = ResolversParentTypes['KillSummary']> = ResolversObject<{
  attackers?: Resolver<Maybe<Array<Maybe<ResolversTypes['Attacker']>>>, ParentType, ContextType>;
  destroyedValue?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  droppedValue?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  fittedValue?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  nearBy?: Resolver<Maybe<ResolversTypes['NearBy']>, ParentType, ContextType>;
  system?: Resolver<Maybe<ResolversTypes['SolarSystem']>, ParentType, ContextType>;
  time?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  totalValue?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  victim?: Resolver<Maybe<ResolversTypes['Victim']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MarketGroupResolvers<ContextType = any, ParentType extends ResolversParentTypes['MarketGroup'] = ResolversParentTypes['MarketGroup']> = ResolversObject<{
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  parentGroup?: Resolver<Maybe<ResolversTypes['MarketGroup']>, ParentType, ContextType>;
  types?: Resolver<Array<ResolversTypes['Type']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type NearByResolvers<ContextType = any, ParentType extends ResolversParentTypes['NearBy'] = ResolversParentTypes['NearBy']> = ResolversObject<{
  distance?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PositionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Position'] = ResolversParentTypes['Position']> = ResolversObject<{
  x?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  y?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  z?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  alliance?: Resolver<Maybe<ResolversTypes['Alliance']>, ParentType, ContextType, RequireFields<QueryAllianceArgs, 'id'>>;
  capsuleer?: Resolver<Maybe<ResolversTypes['Capsuleer']>, ParentType, ContextType, RequireFields<QueryCapsuleerArgs, 'id'>>;
  constellations?: Resolver<Maybe<Array<Maybe<ResolversTypes['Constellation']>>>, ParentType, ContextType, RequireFields<QueryConstellationsArgs, 'ids'>>;
  corporation?: Resolver<Maybe<ResolversTypes['Corporation']>, ParentType, ContextType, RequireFields<QueryCorporationArgs, 'id'>>;
  regions?: Resolver<Maybe<Array<Maybe<ResolversTypes['Region']>>>, ParentType, ContextType, RequireFields<QueryRegionsArgs, 'ids'>>;
  routes?: Resolver<Maybe<Array<Maybe<Array<Maybe<ResolversTypes['Stargate']>>>>>, ParentType, ContextType, Partial<QueryRoutesArgs>>;
  search?: Resolver<Maybe<ResolversTypes['SearchResults']>, ParentType, ContextType, Partial<QuerySearchArgs>>;
  sovereignty?: Resolver<Maybe<Array<Maybe<ResolversTypes['GroupSovereignty']>>>, ParentType, ContextType>;
  stargates?: Resolver<Maybe<Array<Maybe<ResolversTypes['Stargate']>>>, ParentType, ContextType, RequireFields<QueryStargatesArgs, 'ids'>>;
  systems?: Resolver<Maybe<Array<Maybe<ResolversTypes['SolarSystem']>>>, ParentType, ContextType, RequireFields<QuerySystemsArgs, 'ids'>>;
}>;

export type RegionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Region'] = ResolversParentTypes['Region']> = ResolversObject<{
  constellations?: Resolver<Maybe<Array<Maybe<ResolversTypes['Constellation']>>>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type RouteStopResolvers<ContextType = any, ParentType extends ResolversParentTypes['RouteStop'] = ResolversParentTypes['RouteStop']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SearchResultsResolvers<ContextType = any, ParentType extends ResolversParentTypes['SearchResults'] = ResolversParentTypes['SearchResults']> = ResolversObject<{
  agent?: Resolver<Maybe<Array<Maybe<ResolversTypes['Int']>>>, ParentType, ContextType>;
  alliance?: Resolver<Maybe<Array<Maybe<ResolversTypes['Int']>>>, ParentType, ContextType>;
  character?: Resolver<Maybe<Array<Maybe<ResolversTypes['Int']>>>, ParentType, ContextType>;
  constellation?: Resolver<Maybe<Array<Maybe<ResolversTypes['Int']>>>, ParentType, ContextType>;
  corporation?: Resolver<Maybe<Array<Maybe<ResolversTypes['Int']>>>, ParentType, ContextType>;
  faction?: Resolver<Maybe<Array<Maybe<ResolversTypes['Int']>>>, ParentType, ContextType>;
  inventory_type?: Resolver<Maybe<Array<Maybe<ResolversTypes['Int']>>>, ParentType, ContextType>;
  region?: Resolver<Maybe<Array<Maybe<ResolversTypes['Int']>>>, ParentType, ContextType>;
  solar_system?: Resolver<Maybe<Array<Maybe<ResolversTypes['Int']>>>, ParentType, ContextType>;
  station?: Resolver<Maybe<Array<Maybe<ResolversTypes['Int']>>>, ParentType, ContextType>;
  structure?: Resolver<Maybe<Array<Maybe<ResolversTypes['Int']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SolarSystemResolvers<ContextType = any, ParentType extends ResolversParentTypes['SolarSystem'] = ResolversParentTypes['SolarSystem']> = ResolversObject<{
  constellation?: Resolver<Maybe<ResolversTypes['Constellation']>, ParentType, ContextType>;
  factionWarfare?: Resolver<Maybe<ResolversTypes['SystemWarfare']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  position?: Resolver<Maybe<ResolversTypes['Position']>, ParentType, ContextType>;
  securityClass?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  securityStatus?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  sovereignty?: Resolver<Maybe<ResolversTypes['SystemSovereignty']>, ParentType, ContextType>;
  starId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  stargates?: Resolver<Maybe<Array<Maybe<ResolversTypes['Stargate']>>>, ParentType, ContextType>;
  statistics?: Resolver<Maybe<Array<Maybe<ResolversTypes['HourlyStatistic']>>>, ParentType, ContextType, Partial<SolarSystemStatisticsArgs>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type StargateResolvers<ContextType = any, ParentType extends ResolversParentTypes['Stargate'] = ResolversParentTypes['Stargate']> = ResolversObject<{
  destination?: Resolver<Maybe<ResolversTypes['Stargate']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  kills?: Resolver<Maybe<ResolversTypes['GateKills']>, ParentType, ContextType, Partial<StargateKillsArgs>>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  position?: Resolver<Maybe<ResolversTypes['Position']>, ParentType, ContextType>;
  system?: Resolver<Maybe<ResolversTypes['SolarSystem']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SystemSovereigntyResolvers<ContextType = any, ParentType extends ResolversParentTypes['SystemSovereignty'] = ResolversParentTypes['SystemSovereignty']> = ResolversObject<{
  alliance?: Resolver<Maybe<ResolversTypes['Alliance']>, ParentType, ContextType>;
  corporation?: Resolver<Maybe<ResolversTypes['Corporation']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SystemWarfareResolvers<ContextType = any, ParentType extends ResolversParentTypes['SystemWarfare'] = ResolversParentTypes['SystemWarfare']> = ResolversObject<{
  contested?: Resolver<Maybe<ResolversTypes['SystemState']>, ParentType, ContextType>;
  occupier?: Resolver<Maybe<ResolversTypes['Faction']>, ParentType, ContextType>;
  owner?: Resolver<Maybe<ResolversTypes['Faction']>, ParentType, ContextType>;
  system?: Resolver<Maybe<ResolversTypes['SolarSystem']>, ParentType, ContextType>;
  threshold?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  victoryPoints?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface TimestampScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Timestamp'], any> {
  name: 'Timestamp';
}

export type TitleResolvers<ContextType = any, ParentType extends ResolversParentTypes['Title'] = ResolversParentTypes['Title']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TypeResolvers<ContextType = any, ParentType extends ResolversParentTypes['Type'] = ResolversParentTypes['Type']> = ResolversObject<{
  capacity?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  dogmaAttributes?: Resolver<Array<ResolversTypes['DogmaAttribute']>, ParentType, ContextType>;
  dogmaEffects?: Resolver<Array<ResolversTypes['DogmaEffect']>, ParentType, ContextType>;
  graphicId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  group?: Resolver<Maybe<ResolversTypes['Group']>, ParentType, ContextType>;
  iconId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  marketGroup?: Resolver<Maybe<ResolversTypes['MarketGroup']>, ParentType, ContextType>;
  mass?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  packagedVolume?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  portionSize?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  published?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  radius?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  volume?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type VictimResolvers<ContextType = any, ParentType extends ResolversParentTypes['Victim'] = ResolversParentTypes['Victim']> = ResolversObject<{
  alliance?: Resolver<Maybe<ResolversTypes['Alliance']>, ParentType, ContextType>;
  corporation?: Resolver<Maybe<ResolversTypes['Corporation']>, ParentType, ContextType>;
  damageTaken?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  items?: Resolver<Maybe<Array<Maybe<ResolversTypes['KillItem']>>>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  position?: Resolver<Maybe<ResolversTypes['Position']>, ParentType, ContextType>;
  ship?: Resolver<Maybe<ResolversTypes['Type']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  Alliance?: AllianceResolvers<ContextType>;
  Attacker?: AttackerResolvers<ContextType>;
  BigInt?: GraphQLScalarType;
  Capsuleer?: CapsuleerResolvers<ContextType>;
  Category?: CategoryResolvers<ContextType>;
  Constellation?: ConstellationResolvers<ContextType>;
  Corporation?: CorporationResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  DogmaAttribute?: DogmaAttributeResolvers<ContextType>;
  DogmaEffect?: DogmaEffectResolvers<ContextType>;
  EffectModifier?: EffectModifierResolvers<ContextType>;
  Faction?: FactionResolvers<ContextType>;
  GateKills?: GateKillsResolvers<ContextType>;
  Group?: GroupResolvers<ContextType>;
  GroupSovereignty?: GroupSovereigntyResolvers<ContextType>;
  HourlyStatistic?: HourlyStatisticResolvers<ContextType>;
  Kill?: KillResolvers<ContextType>;
  KillItem?: KillItemResolvers<ContextType>;
  KillMail?: KillMailResolvers<ContextType>;
  KillSummary?: KillSummaryResolvers<ContextType>;
  MarketGroup?: MarketGroupResolvers<ContextType>;
  NearBy?: NearByResolvers<ContextType>;
  Position?: PositionResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Region?: RegionResolvers<ContextType>;
  RouteStop?: RouteStopResolvers<ContextType>;
  SearchResults?: SearchResultsResolvers<ContextType>;
  SolarSystem?: SolarSystemResolvers<ContextType>;
  Stargate?: StargateResolvers<ContextType>;
  SystemSovereignty?: SystemSovereigntyResolvers<ContextType>;
  SystemWarfare?: SystemWarfareResolvers<ContextType>;
  Timestamp?: GraphQLScalarType;
  Title?: TitleResolvers<ContextType>;
  Type?: TypeResolvers<ContextType>;
  Victim?: VictimResolvers<ContextType>;
}>;

