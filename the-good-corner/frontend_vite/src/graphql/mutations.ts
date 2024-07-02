import { gql } from "@apollo/client";

export const CREATE_NEW_USER = gql`
  mutation CreateNewUser($password: String!, $email: String!) {
    createUser(password: $password, email: $email)
  }
`;

export const FLAG_AD_BY_ID = gql`
  mutation FlagAdById($flagAdByIdId: String!) {
    flagAdById(id: $flagAdByIdId)
  }
`;

export const UNFLAG_AD_BY_ID = gql`
  mutation UnflagAdById($unflagAdByIdId: String!) {
    unflagAdById(id: $unflagAdByIdId)
  }
`;

export const DELETE_AD_BY_ID = gql`
  mutation DeleteAdById($deleteAdByIdId: String!) {
    deleteAdById(id: $deleteAdByIdId)
  }
`;
