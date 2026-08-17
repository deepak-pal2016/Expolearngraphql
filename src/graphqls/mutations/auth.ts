import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!, $fcmtoken: String!) {
    loginUser(email: $email, password: $password, fcmtoken: $fcmtoken) {
      success
      message
      token
      user {
        id
        name
        age
        email
        mobile
        profileImage
        fcmtoken
        createdAt
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation AddUser(
    $name: String!
    $email: String!
    $mobile: String!
    $password: String!
    $fcmtoken: String
  ) {
    addUser(
      name: $name
      email: $email
      mobile: $mobile
      password: $password
      fcmtoken: $fcmtoken
    ) {
      success
      message
      token
      user {
        id
        name
        email
        mobile
        profileImage
        fcmtoken
        createdAt
      }
    }
  }
`;
