import { gql } from "@apollo/client";

export const SIGNUP_USER = gql`
  mutation createUser($name: String, $email: String, $password: String) {
    signupUser(firstname: $name, email: $email, password: $password) {
      firstname
      email
    }
  }
`;
export const LOGIN_USER = gql`
  mutation SigninUser($email: String, $password: String) {
    signinUser(email: $email, password: $password) {
      token
    }
  }
`;
export const UPDATE_USER = gql`
  mutation updateUser($userData: userData!) {
    user: updateUser(userData: $userData) {
      _id
      firstName
      email
    }
  }
`;
