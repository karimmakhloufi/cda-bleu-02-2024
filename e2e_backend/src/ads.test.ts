import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  gql,
} from "@apollo/client/core";

const client = new ApolloClient({
  link: new HttpLink({
    uri: "http://apigateway/api",
    fetch,
  }),
  cache: new InMemoryCache(),
});

export const GET_ALL_ADS = gql`
  query GetAllAds {
    getAllAds {
      id
      title
      description
      owner {
        email
      }
      ville
      imgUrl
    }
  }
`;

describe("Ads resolver", () => {
  it("gets all ads", async () => {
    const res = await client.query({
      query: GET_ALL_ADS,
      fetchPolicy: "no-cache",
    });
    expect(res.data).toEqual({ getAllAds: [] });
  });
});
