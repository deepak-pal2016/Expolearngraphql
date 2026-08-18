const { gql } = require("graphql-tag");

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    age: Int
    email: String!
    mobile: String!
    profileImage: String
    fcmtoken: String
    createdAt: String
  }

  type LoginResponse {
    success: Boolean!
    message: String!
    token: String
    user: User
  }

  type Query {
    _empty:String
  }

  type Mutation {
    loginUser(
      email: String!
      password: String!
      fcmtoken: String!
    ): LoginResponse!

    addUser(
      name:String!
      email:String!
      mobile:String!
      password:String!
      fcmtoken:String!
    ): LoginResponse!
  }
`;

module.exports = typeDefs;