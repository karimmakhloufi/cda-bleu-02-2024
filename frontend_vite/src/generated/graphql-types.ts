import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Ad = {
  __typename?: 'Ad';
  category: Category;
  description: Scalars['String']['output'];
  id: Scalars['Float']['output'];
  imgUrl: Scalars['String']['output'];
  owner: User;
  price: Scalars['Float']['output'];
  title: Scalars['String']['output'];
  ville: Scalars['String']['output'];
};

export type Category = {
  __typename?: 'Category';
  ads: Array<Ad>;
  id: Scalars['Float']['output'];
  name: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createNewAd: Ad;
  createUser: Scalars['String']['output'];
  deleteAdById: Scalars['String']['output'];
  flagAdById: Scalars['String']['output'];
  unflagAdById: Scalars['String']['output'];
};


export type MutationCreateNewAdArgs = {
  data: NewAdInput;
};


export type MutationCreateUserArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationDeleteAdByIdArgs = {
  id: Scalars['String']['input'];
};


export type MutationFlagAdByIdArgs = {
  id: Scalars['String']['input'];
};


export type MutationUnflagAdByIdArgs = {
  id: Scalars['String']['input'];
};

export type NewAdInput = {
  category: Scalars['ID']['input'];
  description: Scalars['String']['input'];
  imgUrl?: InputMaybe<Scalars['String']['input']>;
  price: Scalars['Float']['input'];
  tags: Array<Scalars['ID']['input']>;
  title: Scalars['String']['input'];
  ville: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  getAdById: Ad;
  getAllAds: Array<Ad>;
  getAllCategories: Array<Category>;
  getAllFlaggedAds: Array<Ad>;
  getAllTags: Array<Tag>;
  login: Scalars['String']['output'];
  logout: Scalars['String']['output'];
  resetDB: Scalars['String']['output'];
  whoAmI: UserInfo;
};


export type QueryGetAdByIdArgs = {
  adId: Scalars['String']['input'];
};


export type QueryLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Tag = {
  __typename?: 'Tag';
  id: Scalars['Float']['output'];
  name: Scalars['String']['output'];
};

export type User = {
  __typename?: 'User';
  ads: Array<Ad>;
  email: Scalars['String']['output'];
};

export type UserInfo = {
  __typename?: 'UserInfo';
  email?: Maybe<Scalars['String']['output']>;
  isLoggedIn: Scalars['Boolean']['output'];
  role?: Maybe<Scalars['String']['output']>;
};

export type CreateNewUserMutationVariables = Exact<{
  password: Scalars['String']['input'];
  email: Scalars['String']['input'];
}>;


export type CreateNewUserMutation = { __typename?: 'Mutation', createUser: string };

export type FlagAdByIdMutationVariables = Exact<{
  flagAdByIdId: Scalars['String']['input'];
}>;


export type FlagAdByIdMutation = { __typename?: 'Mutation', flagAdById: string };

export type UnflagAdByIdMutationVariables = Exact<{
  unflagAdByIdId: Scalars['String']['input'];
}>;


export type UnflagAdByIdMutation = { __typename?: 'Mutation', unflagAdById: string };

export type DeleteAdByIdMutationVariables = Exact<{
  deleteAdByIdId: Scalars['String']['input'];
}>;


export type DeleteAdByIdMutation = { __typename?: 'Mutation', deleteAdById: string };

export type GetAllCategoriesAndTagsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllCategoriesAndTagsQuery = { __typename?: 'Query', getAllCategories: Array<{ __typename?: 'Category', id: number, name: string }>, getAllTags: Array<{ __typename?: 'Tag', id: number, name: string }> };

export type GetAdByIdQueryVariables = Exact<{
  adId: Scalars['String']['input'];
}>;


export type GetAdByIdQuery = { __typename?: 'Query', getAdById: { __typename?: 'Ad', id: number, title: string, description: string, ville: string, imgUrl: string, price: number, owner: { __typename?: 'User', email: string } } };

export type LoginQueryVariables = Exact<{
  password: Scalars['String']['input'];
  email: Scalars['String']['input'];
}>;


export type LoginQuery = { __typename?: 'Query', login: string };

export type GetAllFlaggedAdsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllFlaggedAdsQuery = { __typename?: 'Query', getAllFlaggedAds: Array<{ __typename?: 'Ad', id: number, title: string, description: string, price: number, ville: string, imgUrl: string, owner: { __typename?: 'User', email: string } }> };

export type WhoAmIQueryVariables = Exact<{ [key: string]: never; }>;


export type WhoAmIQuery = { __typename?: 'Query', whoAmI: { __typename?: 'UserInfo', email?: string | null, isLoggedIn: boolean, role?: string | null } };

export type LogoutQueryVariables = Exact<{ [key: string]: never; }>;


export type LogoutQuery = { __typename?: 'Query', logout: string };

export type GetAllAdsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllAdsQuery = { __typename?: 'Query', getAllAds: Array<{ __typename?: 'Ad', id: number, title: string, description: string, ville: string, imgUrl: string, owner: { __typename?: 'User', email: string } }> };


export const CreateNewUserDocument = gql`
    mutation CreateNewUser($password: String!, $email: String!) {
  createUser(password: $password, email: $email)
}
    `;
export type CreateNewUserMutationFn = Apollo.MutationFunction<CreateNewUserMutation, CreateNewUserMutationVariables>;

/**
 * __useCreateNewUserMutation__
 *
 * To run a mutation, you first call `useCreateNewUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateNewUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createNewUserMutation, { data, loading, error }] = useCreateNewUserMutation({
 *   variables: {
 *      password: // value for 'password'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useCreateNewUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateNewUserMutation, CreateNewUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateNewUserMutation, CreateNewUserMutationVariables>(CreateNewUserDocument, options);
      }
export type CreateNewUserMutationHookResult = ReturnType<typeof useCreateNewUserMutation>;
export type CreateNewUserMutationResult = Apollo.MutationResult<CreateNewUserMutation>;
export type CreateNewUserMutationOptions = Apollo.BaseMutationOptions<CreateNewUserMutation, CreateNewUserMutationVariables>;
export const FlagAdByIdDocument = gql`
    mutation FlagAdById($flagAdByIdId: String!) {
  flagAdById(id: $flagAdByIdId)
}
    `;
export type FlagAdByIdMutationFn = Apollo.MutationFunction<FlagAdByIdMutation, FlagAdByIdMutationVariables>;

/**
 * __useFlagAdByIdMutation__
 *
 * To run a mutation, you first call `useFlagAdByIdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFlagAdByIdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [flagAdByIdMutation, { data, loading, error }] = useFlagAdByIdMutation({
 *   variables: {
 *      flagAdByIdId: // value for 'flagAdByIdId'
 *   },
 * });
 */
export function useFlagAdByIdMutation(baseOptions?: Apollo.MutationHookOptions<FlagAdByIdMutation, FlagAdByIdMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<FlagAdByIdMutation, FlagAdByIdMutationVariables>(FlagAdByIdDocument, options);
      }
export type FlagAdByIdMutationHookResult = ReturnType<typeof useFlagAdByIdMutation>;
export type FlagAdByIdMutationResult = Apollo.MutationResult<FlagAdByIdMutation>;
export type FlagAdByIdMutationOptions = Apollo.BaseMutationOptions<FlagAdByIdMutation, FlagAdByIdMutationVariables>;
export const UnflagAdByIdDocument = gql`
    mutation UnflagAdById($unflagAdByIdId: String!) {
  unflagAdById(id: $unflagAdByIdId)
}
    `;
export type UnflagAdByIdMutationFn = Apollo.MutationFunction<UnflagAdByIdMutation, UnflagAdByIdMutationVariables>;

/**
 * __useUnflagAdByIdMutation__
 *
 * To run a mutation, you first call `useUnflagAdByIdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnflagAdByIdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unflagAdByIdMutation, { data, loading, error }] = useUnflagAdByIdMutation({
 *   variables: {
 *      unflagAdByIdId: // value for 'unflagAdByIdId'
 *   },
 * });
 */
export function useUnflagAdByIdMutation(baseOptions?: Apollo.MutationHookOptions<UnflagAdByIdMutation, UnflagAdByIdMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnflagAdByIdMutation, UnflagAdByIdMutationVariables>(UnflagAdByIdDocument, options);
      }
export type UnflagAdByIdMutationHookResult = ReturnType<typeof useUnflagAdByIdMutation>;
export type UnflagAdByIdMutationResult = Apollo.MutationResult<UnflagAdByIdMutation>;
export type UnflagAdByIdMutationOptions = Apollo.BaseMutationOptions<UnflagAdByIdMutation, UnflagAdByIdMutationVariables>;
export const DeleteAdByIdDocument = gql`
    mutation DeleteAdById($deleteAdByIdId: String!) {
  deleteAdById(id: $deleteAdByIdId)
}
    `;
export type DeleteAdByIdMutationFn = Apollo.MutationFunction<DeleteAdByIdMutation, DeleteAdByIdMutationVariables>;

/**
 * __useDeleteAdByIdMutation__
 *
 * To run a mutation, you first call `useDeleteAdByIdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAdByIdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAdByIdMutation, { data, loading, error }] = useDeleteAdByIdMutation({
 *   variables: {
 *      deleteAdByIdId: // value for 'deleteAdByIdId'
 *   },
 * });
 */
export function useDeleteAdByIdMutation(baseOptions?: Apollo.MutationHookOptions<DeleteAdByIdMutation, DeleteAdByIdMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteAdByIdMutation, DeleteAdByIdMutationVariables>(DeleteAdByIdDocument, options);
      }
export type DeleteAdByIdMutationHookResult = ReturnType<typeof useDeleteAdByIdMutation>;
export type DeleteAdByIdMutationResult = Apollo.MutationResult<DeleteAdByIdMutation>;
export type DeleteAdByIdMutationOptions = Apollo.BaseMutationOptions<DeleteAdByIdMutation, DeleteAdByIdMutationVariables>;
export const GetAllCategoriesAndTagsDocument = gql`
    query GetAllCategoriesAndTags {
  getAllCategories {
    id
    name
  }
  getAllTags {
    id
    name
  }
}
    `;

/**
 * __useGetAllCategoriesAndTagsQuery__
 *
 * To run a query within a React component, call `useGetAllCategoriesAndTagsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllCategoriesAndTagsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllCategoriesAndTagsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllCategoriesAndTagsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllCategoriesAndTagsQuery, GetAllCategoriesAndTagsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllCategoriesAndTagsQuery, GetAllCategoriesAndTagsQueryVariables>(GetAllCategoriesAndTagsDocument, options);
      }
export function useGetAllCategoriesAndTagsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllCategoriesAndTagsQuery, GetAllCategoriesAndTagsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllCategoriesAndTagsQuery, GetAllCategoriesAndTagsQueryVariables>(GetAllCategoriesAndTagsDocument, options);
        }
export function useGetAllCategoriesAndTagsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAllCategoriesAndTagsQuery, GetAllCategoriesAndTagsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllCategoriesAndTagsQuery, GetAllCategoriesAndTagsQueryVariables>(GetAllCategoriesAndTagsDocument, options);
        }
export type GetAllCategoriesAndTagsQueryHookResult = ReturnType<typeof useGetAllCategoriesAndTagsQuery>;
export type GetAllCategoriesAndTagsLazyQueryHookResult = ReturnType<typeof useGetAllCategoriesAndTagsLazyQuery>;
export type GetAllCategoriesAndTagsSuspenseQueryHookResult = ReturnType<typeof useGetAllCategoriesAndTagsSuspenseQuery>;
export type GetAllCategoriesAndTagsQueryResult = Apollo.QueryResult<GetAllCategoriesAndTagsQuery, GetAllCategoriesAndTagsQueryVariables>;
export const GetAdByIdDocument = gql`
    query GetAdById($adId: String!) {
  getAdById(adId: $adId) {
    id
    title
    description
    owner {
      email
    }
    ville
    imgUrl
    price
  }
}
    `;

/**
 * __useGetAdByIdQuery__
 *
 * To run a query within a React component, call `useGetAdByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAdByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAdByIdQuery({
 *   variables: {
 *      adId: // value for 'adId'
 *   },
 * });
 */
export function useGetAdByIdQuery(baseOptions: Apollo.QueryHookOptions<GetAdByIdQuery, GetAdByIdQueryVariables> & ({ variables: GetAdByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAdByIdQuery, GetAdByIdQueryVariables>(GetAdByIdDocument, options);
      }
export function useGetAdByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAdByIdQuery, GetAdByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAdByIdQuery, GetAdByIdQueryVariables>(GetAdByIdDocument, options);
        }
export function useGetAdByIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAdByIdQuery, GetAdByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAdByIdQuery, GetAdByIdQueryVariables>(GetAdByIdDocument, options);
        }
export type GetAdByIdQueryHookResult = ReturnType<typeof useGetAdByIdQuery>;
export type GetAdByIdLazyQueryHookResult = ReturnType<typeof useGetAdByIdLazyQuery>;
export type GetAdByIdSuspenseQueryHookResult = ReturnType<typeof useGetAdByIdSuspenseQuery>;
export type GetAdByIdQueryResult = Apollo.QueryResult<GetAdByIdQuery, GetAdByIdQueryVariables>;
export const LoginDocument = gql`
    query Login($password: String!, $email: String!) {
  login(password: $password, email: $email)
}
    `;

/**
 * __useLoginQuery__
 *
 * To run a query within a React component, call `useLoginQuery` and pass it any options that fit your needs.
 * When your component renders, `useLoginQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLoginQuery({
 *   variables: {
 *      password: // value for 'password'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useLoginQuery(baseOptions: Apollo.QueryHookOptions<LoginQuery, LoginQueryVariables> & ({ variables: LoginQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LoginQuery, LoginQueryVariables>(LoginDocument, options);
      }
export function useLoginLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LoginQuery, LoginQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LoginQuery, LoginQueryVariables>(LoginDocument, options);
        }
export function useLoginSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<LoginQuery, LoginQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<LoginQuery, LoginQueryVariables>(LoginDocument, options);
        }
export type LoginQueryHookResult = ReturnType<typeof useLoginQuery>;
export type LoginLazyQueryHookResult = ReturnType<typeof useLoginLazyQuery>;
export type LoginSuspenseQueryHookResult = ReturnType<typeof useLoginSuspenseQuery>;
export type LoginQueryResult = Apollo.QueryResult<LoginQuery, LoginQueryVariables>;
export const GetAllFlaggedAdsDocument = gql`
    query GetAllFlaggedAds {
  getAllFlaggedAds {
    id
    title
    description
    price
    ville
    imgUrl
    owner {
      email
    }
  }
}
    `;

/**
 * __useGetAllFlaggedAdsQuery__
 *
 * To run a query within a React component, call `useGetAllFlaggedAdsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllFlaggedAdsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllFlaggedAdsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllFlaggedAdsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllFlaggedAdsQuery, GetAllFlaggedAdsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllFlaggedAdsQuery, GetAllFlaggedAdsQueryVariables>(GetAllFlaggedAdsDocument, options);
      }
export function useGetAllFlaggedAdsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllFlaggedAdsQuery, GetAllFlaggedAdsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllFlaggedAdsQuery, GetAllFlaggedAdsQueryVariables>(GetAllFlaggedAdsDocument, options);
        }
export function useGetAllFlaggedAdsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAllFlaggedAdsQuery, GetAllFlaggedAdsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllFlaggedAdsQuery, GetAllFlaggedAdsQueryVariables>(GetAllFlaggedAdsDocument, options);
        }
export type GetAllFlaggedAdsQueryHookResult = ReturnType<typeof useGetAllFlaggedAdsQuery>;
export type GetAllFlaggedAdsLazyQueryHookResult = ReturnType<typeof useGetAllFlaggedAdsLazyQuery>;
export type GetAllFlaggedAdsSuspenseQueryHookResult = ReturnType<typeof useGetAllFlaggedAdsSuspenseQuery>;
export type GetAllFlaggedAdsQueryResult = Apollo.QueryResult<GetAllFlaggedAdsQuery, GetAllFlaggedAdsQueryVariables>;
export const WhoAmIDocument = gql`
    query WhoAmI {
  whoAmI {
    email
    isLoggedIn
    role
  }
}
    `;

/**
 * __useWhoAmIQuery__
 *
 * To run a query within a React component, call `useWhoAmIQuery` and pass it any options that fit your needs.
 * When your component renders, `useWhoAmIQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWhoAmIQuery({
 *   variables: {
 *   },
 * });
 */
export function useWhoAmIQuery(baseOptions?: Apollo.QueryHookOptions<WhoAmIQuery, WhoAmIQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<WhoAmIQuery, WhoAmIQueryVariables>(WhoAmIDocument, options);
      }
export function useWhoAmILazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<WhoAmIQuery, WhoAmIQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<WhoAmIQuery, WhoAmIQueryVariables>(WhoAmIDocument, options);
        }
export function useWhoAmISuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<WhoAmIQuery, WhoAmIQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<WhoAmIQuery, WhoAmIQueryVariables>(WhoAmIDocument, options);
        }
export type WhoAmIQueryHookResult = ReturnType<typeof useWhoAmIQuery>;
export type WhoAmILazyQueryHookResult = ReturnType<typeof useWhoAmILazyQuery>;
export type WhoAmISuspenseQueryHookResult = ReturnType<typeof useWhoAmISuspenseQuery>;
export type WhoAmIQueryResult = Apollo.QueryResult<WhoAmIQuery, WhoAmIQueryVariables>;
export const LogoutDocument = gql`
    query Logout {
  logout
}
    `;

/**
 * __useLogoutQuery__
 *
 * To run a query within a React component, call `useLogoutQuery` and pass it any options that fit your needs.
 * When your component renders, `useLogoutQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLogoutQuery({
 *   variables: {
 *   },
 * });
 */
export function useLogoutQuery(baseOptions?: Apollo.QueryHookOptions<LogoutQuery, LogoutQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LogoutQuery, LogoutQueryVariables>(LogoutDocument, options);
      }
export function useLogoutLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LogoutQuery, LogoutQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LogoutQuery, LogoutQueryVariables>(LogoutDocument, options);
        }
export function useLogoutSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<LogoutQuery, LogoutQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<LogoutQuery, LogoutQueryVariables>(LogoutDocument, options);
        }
export type LogoutQueryHookResult = ReturnType<typeof useLogoutQuery>;
export type LogoutLazyQueryHookResult = ReturnType<typeof useLogoutLazyQuery>;
export type LogoutSuspenseQueryHookResult = ReturnType<typeof useLogoutSuspenseQuery>;
export type LogoutQueryResult = Apollo.QueryResult<LogoutQuery, LogoutQueryVariables>;
export const GetAllAdsDocument = gql`
    query GetAllAds {
  getAllAds {
    id
    title
    description
    owner {
      email
    }
    ville
    imgUrl
  }
}
    `;

/**
 * __useGetAllAdsQuery__
 *
 * To run a query within a React component, call `useGetAllAdsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllAdsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllAdsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllAdsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllAdsQuery, GetAllAdsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllAdsQuery, GetAllAdsQueryVariables>(GetAllAdsDocument, options);
      }
export function useGetAllAdsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllAdsQuery, GetAllAdsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllAdsQuery, GetAllAdsQueryVariables>(GetAllAdsDocument, options);
        }
export function useGetAllAdsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAllAdsQuery, GetAllAdsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllAdsQuery, GetAllAdsQueryVariables>(GetAllAdsDocument, options);
        }
export type GetAllAdsQueryHookResult = ReturnType<typeof useGetAllAdsQuery>;
export type GetAllAdsLazyQueryHookResult = ReturnType<typeof useGetAllAdsLazyQuery>;
export type GetAllAdsSuspenseQueryHookResult = ReturnType<typeof useGetAllAdsSuspenseQuery>;
export type GetAllAdsQueryResult = Apollo.QueryResult<GetAllAdsQuery, GetAllAdsQueryVariables>;