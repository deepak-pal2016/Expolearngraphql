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

export const VERIFY_OTP = gql`
  mutation VerifyOtp($email: String!, $otp: String!) {
    verifyotp(email: $email, otp: $otp) {
      success
      message
    }
  }
`;

export const CHANGE_PASSWORD = gql`
  mutation ChangePassword($email: String!, $password: String!) {
    changepassword(email: $email, password: $password) {
      success
      message
    }
  }
`;

export const SEARCH_BOOK = gql`
  query SearchBooks($query: String!) {
    searchBooks(query: $query) {
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
    }
  }
`;

export const ASK_BOOK_AI = gql`
mutation AskBookAI($question:String!){
  askBookAI(question:$question)
}`
