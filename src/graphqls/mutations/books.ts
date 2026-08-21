import { gql } from "@apollo/client";

export const ADD_BOOK = gql`
  mutation AddBook(
    $title: String!
    $author: String!
    $description: String!
    $genre: String!
    $language: String
    $isbn: String
    $publisher: String
    $publishedDate: String
    $numberOfPages: Int
    $rating: Float!
    $tags: [String!]
    $trending: Boolean!
    $popular: Boolean!
    $coverImage: String!
  ) {
    addBooks(
      title: $title
      author: $author
      description: $description
      genre: $genre
      language: $language
      isbn: $isbn
      publisher: $publisher
      publishedDate: $publishedDate
      numberOfPages: $numberOfPages
      rating: $rating
      tags: $tags
      trending: $trending
      popular: $popular
      coverImage: $coverImage
    ) {
      id
      title
      author
      description
      genre
      language
      isbn
      publisher
      publishedDate
      numberOfPages
      rating
      tags
      trending
      popular
      coverImage
      createdAt
    }
  }
`;