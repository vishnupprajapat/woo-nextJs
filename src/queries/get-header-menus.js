import { gql } from "@apollo/client";

/**
 * GraphQL categories query.
 */
const GET_HEADER_MENU_QUERY = gql`query {
    menuItems(where: {location: HCMS_MENU_HEADER, parentDatabaseId: 0}) {
      edges {
        node {
          label
          uri
          cssClasses
          childItems {
            edges {
              node {
                label
                childItems {
                  edges {
                    node {
                      label
                      childItems {
                        edges {
                          node {
                            label
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }`;

export default GET_HEADER_MENU_QUERY;



