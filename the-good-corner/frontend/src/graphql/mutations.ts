import { gql } from "@apollo/client";

export const CREATE_NEW_USER = gql`
  mutation CreateNewUser($password: String!, $email: String!) {
    createUser(password: $password, email: $email)
  }
`;
