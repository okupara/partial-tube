declare module '*.graphqls' {
  import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
  export type Maybe<T> = T | null;
  export type RequireFields<T, K extends keyof T> = {
      [X in Exclude<keyof T, K>]?: T[X];
  } & {
      [P in K]-?: NonNullable<T[P]>;
  };
  /** All built-in and custom scalars, mapped to their actual values */
  export type Scalars = {
      ID: string;
      String: string;
      Boolean: boolean;
      Int: number;
      Float: number;
      Date: any;
  };
  export type Mutation = {
      __typename?: 'Mutation';
      addPlaylist?: Maybe<Playlist>;
      video?: Maybe<PartialVideo>;
      deleteVideo: Scalars['String'];
      deletePlaylist: Scalars['String'];
  };
  export type MutationAddPlaylistArgs = {
      playlist?: Maybe<PlaylistInput>;
  };
  export type MutationVideoArgs = {
      video?: Maybe<VideoInput>;
  };
  export type MutationDeleteVideoArgs = {
      id: Scalars['ID'];
  };
  export type MutationDeletePlaylistArgs = {
      id: Scalars['ID'];
  };
  export type PartialVideo = {
      __typename?: 'PartialVideo';
      id: Scalars['ID'];
      start: Scalars['Float'];
      end: Scalars['Float'];
      comment?: Maybe<Scalars['String']>;
      title: Scalars['String'];
      videoId: Scalars['String'];
      playlists: Array<Playlist>;
      created: Scalars['Date'];
  };
  export type Playlist = {
      __typename?: 'Playlist';
      id: Scalars['ID'];
      numOfVideos: Scalars['Int'];
      name: Scalars['String'];
      comment?: Maybe<Scalars['String']>;
      permission: Scalars['String'];
      created: Scalars['Date'];
      totalSec: Scalars['Float'];
      firstVideoId?: Maybe<Scalars['String']>;
      videos: Array<Maybe<PartialVideo>>;
  };
  export type PlaylistInput = {
      name: Scalars['String'];
      permission: Scalars['String'];
      comment?: Maybe<Scalars['String']>;
  };
  export type Query = {
      __typename?: 'Query';
      viewer: User;
      playlist?: Maybe<Playlist>;
      playlists?: Maybe<Array<Maybe<Playlist>>>;
      youtubeVideo?: Maybe<YouTubeVideo>;
      videos?: Maybe<Array<PartialVideo>>;
      video?: Maybe<PartialVideo>;
  };
  export type QueryPlaylistArgs = {
      id: Scalars['String'];
  };
  export type QueryYoutubeVideoArgs = {
      videoId: Scalars['String'];
  };
  export type QueryVideoArgs = {
      id: Scalars['String'];
  };
  export type User = {
      __typename?: 'User';
      id: Scalars['ID'];
      name: Scalars['String'];
      status: Scalars['String'];
  };
  export type VideoInput = {
      id?: Maybe<Scalars['String']>;
      videoId: Scalars['String'];
      title: Scalars['String'];
      start: Scalars['Float'];
      end: Scalars['Float'];
      comment?: Maybe<Scalars['String']>;
      playlists?: Maybe<Array<Scalars['String']>>;
  };
  export type YouTubeVideo = {
      __typename?: 'YouTubeVideo';
      id: Scalars['ID'];
      title: Scalars['String'];
      description?: Maybe<Scalars['String']>;
  };
  export type ResolverTypeWrapper<T> = Promise<T> | T;
  export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
      fragment: string;
      resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
  };
  export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | StitchingResolver<TResult, TParent, TContext, TArgs>;
  export type ResolverFn<TResult, TParent, TContext, TArgs> = (parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => Promise<TResult> | TResult;
  export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;
  export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => TResult | Promise<TResult>;
  export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
      subscribe: SubscriptionSubscribeFn<{
          [key in TKey]: TResult;
      }, TParent, TContext, TArgs>;
      resolve?: SubscriptionResolveFn<TResult, {
          [key in TKey]: TResult;
      }, TContext, TArgs>;
  }
  export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
      subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
      resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
  }
  export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> = SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs> | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;
  export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> = ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>) | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;
  export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (parent: TParent, context: TContext, info: GraphQLResolveInfo) => Maybe<TTypes> | Promise<Maybe<TTypes>>;
  export type isTypeOfResolverFn<T = {}> = (obj: T, info: GraphQLResolveInfo) => boolean | Promise<boolean>;
  export type NextResolverFn<T> = () => Promise<T>;
  export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (next: NextResolverFn<TResult>, parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => TResult | Promise<TResult>;
  /** Mapping between all available schema types and the resolvers types */
  export type ResolversTypes = {
      Query: ResolverTypeWrapper<{}>;
      User: ResolverTypeWrapper<User>;
      ID: ResolverTypeWrapper<Scalars['ID']>;
      String: ResolverTypeWrapper<Scalars['String']>;
      Playlist: ResolverTypeWrapper<Playlist>;
      Int: ResolverTypeWrapper<Scalars['Int']>;
      Date: ResolverTypeWrapper<Scalars['Date']>;
      Float: ResolverTypeWrapper<Scalars['Float']>;
      PartialVideo: ResolverTypeWrapper<PartialVideo>;
      YouTubeVideo: ResolverTypeWrapper<YouTubeVideo>;
      Mutation: ResolverTypeWrapper<{}>;
      PlaylistInput: PlaylistInput;
      VideoInput: VideoInput;
      Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  };
  /** Mapping between all available schema types and the resolvers parents */
  export type ResolversParentTypes = {
      Query: {};
      User: User;
      ID: Scalars['ID'];
      String: Scalars['String'];
      Playlist: Playlist;
      Int: Scalars['Int'];
      Date: Scalars['Date'];
      Float: Scalars['Float'];
      PartialVideo: PartialVideo;
      YouTubeVideo: YouTubeVideo;
      Mutation: {};
      PlaylistInput: PlaylistInput;
      VideoInput: VideoInput;
      Boolean: Scalars['Boolean'];
  };
  export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
      name: 'Date';
  }
  export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
      addPlaylist?: Resolver<Maybe<ResolversTypes['Playlist']>, ParentType, ContextType, RequireFields<MutationAddPlaylistArgs, never>>;
      video?: Resolver<Maybe<ResolversTypes['PartialVideo']>, ParentType, ContextType, RequireFields<MutationVideoArgs, never>>;
      deleteVideo?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationDeleteVideoArgs, 'id'>>;
      deletePlaylist?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationDeletePlaylistArgs, 'id'>>;
  };
  export type PartialVideoResolvers<ContextType = any, ParentType extends ResolversParentTypes['PartialVideo'] = ResolversParentTypes['PartialVideo']> = {
      id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
      start?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
      end?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
      comment?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
      title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
      videoId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
      playlists?: Resolver<Array<ResolversTypes['Playlist']>, ParentType, ContextType>;
      created?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
      __isTypeOf?: isTypeOfResolverFn<ParentType>;
  };
  export type PlaylistResolvers<ContextType = any, ParentType extends ResolversParentTypes['Playlist'] = ResolversParentTypes['Playlist']> = {
      id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
      numOfVideos?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
      name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
      comment?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
      permission?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
      created?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
      totalSec?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
      firstVideoId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
      videos?: Resolver<Array<Maybe<ResolversTypes['PartialVideo']>>, ParentType, ContextType>;
      __isTypeOf?: isTypeOfResolverFn<ParentType>;
  };
  export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
      viewer?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
      playlist?: Resolver<Maybe<ResolversTypes['Playlist']>, ParentType, ContextType, RequireFields<QueryPlaylistArgs, 'id'>>;
      playlists?: Resolver<Maybe<Array<Maybe<ResolversTypes['Playlist']>>>, ParentType, ContextType>;
      youtubeVideo?: Resolver<Maybe<ResolversTypes['YouTubeVideo']>, ParentType, ContextType, RequireFields<QueryYoutubeVideoArgs, 'videoId'>>;
      videos?: Resolver<Maybe<Array<ResolversTypes['PartialVideo']>>, ParentType, ContextType>;
      video?: Resolver<Maybe<ResolversTypes['PartialVideo']>, ParentType, ContextType, RequireFields<QueryVideoArgs, 'id'>>;
  };
  export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
      id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
      name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
      status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
      __isTypeOf?: isTypeOfResolverFn<ParentType>;
  };
  export type YouTubeVideoResolvers<ContextType = any, ParentType extends ResolversParentTypes['YouTubeVideo'] = ResolversParentTypes['YouTubeVideo']> = {
      id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
      title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
      description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
      __isTypeOf?: isTypeOfResolverFn<ParentType>;
  };
  export type Resolvers<ContextType = any> = {
      Date?: GraphQLScalarType;
      Mutation?: MutationResolvers<ContextType>;
      PartialVideo?: PartialVideoResolvers<ContextType>;
      Playlist?: PlaylistResolvers<ContextType>;
      Query?: QueryResolvers<ContextType>;
      User?: UserResolvers<ContextType>;
      YouTubeVideo?: YouTubeVideoResolvers<ContextType>;
  };
  /**
   * @deprecated
   * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
  */
  export type IResolvers<ContextType = any> = Resolvers<ContextType>;
}