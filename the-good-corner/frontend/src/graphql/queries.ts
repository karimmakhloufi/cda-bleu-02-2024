import { gql } from "@apollo/client";

export const GET_ALL_CATEGORIES_AND_TAGS = gql`
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

export const GET_AD_BY_ID = gql`
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

export const GET_JWT = gql`
  query Login($password: String!, $email: String!) {
    login(password: $password, email: $email)
  }
`;

export const GET_ALL_FLAGGED_ADS = gql`
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
