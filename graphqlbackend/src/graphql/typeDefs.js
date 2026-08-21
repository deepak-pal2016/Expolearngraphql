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

  type Book {
    id: ID!
    title: String!
    author: String!
    description: String
    genre: String!
    language: String
    isbn: String
    publisher: String
    publishedDate: String
    numberOfPages: Int
    rating: Float
    tags: [String!]
    trending: Boolean!
    popular: Boolean!
    coverImage: String
    createdAt: String
  }

  type Genre {
    id: ID!
    name: String!
    value: String!
    isActive: Boolean!
    createdAt: String
    updatedAt: String
  }

  type Language {
    id: ID!
    name: String!
    value: String!
    isActive: Boolean!
    createdAt: String
    updatedAt: String
  }

  type LoginResponse {
    success: Boolean!
    message: String!
    token: String
    user: User
  }

  type Query {
    _empty: String
    genres: [Genre!]!
    languages: [Language!]!
  }

  type Mutation {
    loginUser(
      email: String!
      password: String!
      fcmtoken: String!
    ): LoginResponse!

    addUser(
      name: String!
      email: String!
      mobile: String!
      password: String!
      fcmtoken: String!
    ): LoginResponse!

    addBooks(
      title: String!
      author: String!
      description: String!
      genre: String!
      language: String
      isbn: String
      publisher: String
      publishedDate: String
      numberOfPages: Int
      rating: Float!
      tags: [String!]
      trending: Boolean!
      popular: Boolean!
      coverImage: String!
    ): Book!

    addGenre(name: String!, value: String!): Genre!
    addLanguage(name: String!, value: String!): Language!
  }
`;

module.exports = typeDefs;
