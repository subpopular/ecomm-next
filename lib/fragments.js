import gql from 'graphql-tag'

export const RootCategoryFragment = gql`
  fragment RootCategoryFragment on Category {
    id
    name
    categories {
      edges {
        node {
          id
          name
          categories {
            edges {
              node {
                id
                name
                categories {
                  edges {
                    node {
                      id
                      name
                      categories {
                        edges {
                          node {
                            id
                            name
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
  }
`
