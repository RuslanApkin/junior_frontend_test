import { gql } from "@apollo/client";

export const GETPRODUCTS = gql`
  query getProducts($CategoryInput: CategoryInput) {
    category(input: $CategoryInput) {
      name
      products {
        id
        name
        inStock
        gallery
        attributes {
          id
          name
          type
          items {
            displayValue
            value
            id
          }
        }
        prices {
          currency {
            label
            symbol
          }
          amount
        }
      }
    }
  }
`;

export const GETPRODUCT = gql`
  query getProduct($id: String!) {
    product(id: $id) {
      id
      name
      inStock
      gallery
      description
      category
      attributes {
        id
        name
        type
        items {
          displayValue
          value
          id
        }
      }
      prices {
        currency {
          label
          symbol
        }
        amount
      }
      brand
    }
  }
`;

export const GETCURR = gql`
  query getCurrency {
    currencies {
      label
      symbol
    }
  }
`;

export const GETCATEGORIES = gql`
  query getCategories {
    categories {
      name
    }
  }
`;
