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
          parentCategory {
            id
          }
          categories {
            edges {
              node {
                id
                name
                parentCategory {
                  id
                }
                categories {
                  edges {
                    node {
                      id
                      name
                      parentCategory {
                        id
                      }
                      categories {
                        edges {
                          node {
                            id
                            name
                            parentCategory {
                              id
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
  }
`

export const ProductDetailFragment = gql`
  fragment ProductDetailFragment on Product {
    id
    name
    price
    category {
      id
    }
    variants {
      id
      color
      size
      orderable
      pricing {
        type
        min
        max
      }
    }
    variationAttributes {
      color {
        key
        id
        name
        orderable
        swatch {
          id
          image {
            src
            alt
          }
        }
        images {
          src
          alt
        }
      }
      size {
        key
        id
        name
        orderable
      }
    }
  }
`
