import { gql } from "@apollo/client";

export const GET_GENRES = gql`
  query GetGenres {
    genres {
      id
      name
      value
      isActive
    }
  }
`;

export const GET_LANGUAGES = gql`
  query GetLanguages {
    languages {
      id
      name
      value
      isActive
    }
  }
`;

export const GET_BOOKS = gql`
  query GetBooks {
    books {
      id
      title
      author
      description
      coverimage
      genre
      language
      isbn
      publisher
      publishedDate
      pages
      rating
      totalreviews
      isTrending
      isPopular

      chapters {
        chapterNumber
        title
        content
        pages
      }
    }
  }
`;

export const FORGOT_PASSWORD = gql`
  mutation Forgotpassword($email: String!) {
    forgotpassword(email: $email) {
      success
      message
    }
  }
`;
