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
