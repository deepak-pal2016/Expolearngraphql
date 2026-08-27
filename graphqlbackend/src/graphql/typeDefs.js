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

  type Chapter {
    id: ID!
    chapterNumber: Int!
    title: String!
    content: String!
    pages: Int
  }

  type Book {
    id: ID!
    title: String!
    author: String!
    description: String
    coverimage: String
    genre: String!
    language: String
    isbn: String
    publisher: String
    publishedDate: String
    pages: Int
    rating: Float
    totalreviews: Int
    isTrending: Boolean!
    isPopular: Boolean!
    chapters: [Chapter!]
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

  input ChapterInput {
    chapterNumber: Int!
    title: String!
    content: String!
    pages: Int
  }

  type Query {
    _empty: String
    genres: [Genre!]!
    languages: [Language!]!
    books: [Book]
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
      coverimage: String
      genre: String!
      language: String
      isbn: String
      publisher: String
      publishedDate: String
      pages: Int
      rating: Float
      totalreviews: Int
      isTrending: Boolean
      isPopular: Boolean
      chapters: [ChapterInput!]
    ): Book!

    addGenre(name: String!, value: String!): Genre!

    addLanguage(name: String!, value: String!): Language!
  }
`;

module.exports = typeDefs;
