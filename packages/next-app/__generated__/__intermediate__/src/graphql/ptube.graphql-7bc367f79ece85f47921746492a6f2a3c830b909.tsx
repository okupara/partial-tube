import gql from 'graphql-tag';
import * as React from 'react';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
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

export type ViewerQueryVariables = {};


export type ViewerQuery = (
  { __typename?: 'Query' }
  & { viewer: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name' | 'status'>
  ) }
);


export const ViewerDocument = gql`
    query Viewer {
  viewer {
    id
    name
    status
  }
}
    `;
export type ViewerComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<ViewerQuery, ViewerQueryVariables>, 'query'>;

    export const ViewerComponent = (props: ViewerComponentProps) => (
      <ApolloReactComponents.Query<ViewerQuery, ViewerQueryVariables> query={ViewerDocument} {...props} />
    );
    

/**
 * __useViewerQuery__
 *
 * To run a query within a React component, call `useViewerQuery` and pass it any options that fit your needs.
 * When your component renders, `useViewerQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useViewerQuery({
 *   variables: {
 *   },
 * });
 */
export function useViewerQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ViewerQuery, ViewerQueryVariables>) {
        return ApolloReactHooks.useQuery<ViewerQuery, ViewerQueryVariables>(ViewerDocument, baseOptions);
      }
export function useViewerLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ViewerQuery, ViewerQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ViewerQuery, ViewerQueryVariables>(ViewerDocument, baseOptions);
        }
export type ViewerQueryHookResult = ReturnType<typeof useViewerQuery>;
export type ViewerLazyQueryHookResult = ReturnType<typeof useViewerLazyQuery>;
export type ViewerQueryResult = ApolloReactCommon.QueryResult<ViewerQuery, ViewerQueryVariables>;