import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
  Observable,
} from "@apollo/client";
import { LocalStorage } from "@/helpers/localstorage";

const httpLink = new HttpLink({
  uri: "https://nannie-unfenestral-preculturally.ngrok-free.dev/graphql",
});

const authLink = new ApolloLink((operation, forward) => {
  return new Observable((observer) => {
    LocalStorage.read("@token").then((token) => {
      operation.setContext({
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
      const subscription = forward(operation).subscribe(observer);
      return () => subscription.unsubscribe();
    });
  });
});

const Client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

export default Client;
