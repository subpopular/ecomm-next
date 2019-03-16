const gql = require('graphql-tag')

exports.typeDefs = gql`
  type S7Optimized {
    fluid(maxWidth: Int): Picture
  }

  type Image {
    src: String
    aspectRatio: Float
    alt: String
    s7: S7Optimized
  }

  type Picture {
    src: String
    srcSet: String
    sizes: String
    width: String
    height: String
    aspectRatio: Float
  }
`