const gql = require('graphql-tag')

exports.typeDefs = gql`
  type CategoryProductList {
    count: Int!
    start: Int!
    total: Int!
    category: Category
    products: ProductList
  }

  type Swatch {
    id: String!
    image: Image
  }

  type VariationAttribute {
    key: ID!
    id: String!
    name: String
    orderable: Boolean
    swatch: Swatch
    images: [Image]
  }

  type VariationAttributes {
    color: [VariationAttribute]
    size: [VariationAttribute]
  }

  type ProductPricing {
    type: String
    min: Float
    max: Float
  }

  type ProductVariant {
    id: String!
    pricing: ProductPricing
    color: String
    size: String
    orderable: Boolean
    productDetail: Product
  }

  extend type Product {
    variationAttributes: VariationAttributes
    variants: [ProductVariant]
    color: String
    size: String
  }

  extend type Category {
    parentCategoryId: String
  }

  extend type CartItem {
    product: Product
  }

  type User {
    id: ID!
    type: String
    locale: String
    token: String
    cart: Cart
  }

  extend type Query {
    user: User
    getCategoryProductList(categoryId: String!): CategoryProductList
  }

  extend type Mutation {
    addToCart(basketId: String!, productId: String!, quantity: Int): Cart
  }
`

exports.resolvers = {
  Query: {
    user: async (root, args, { dataSources, ...context }) => {
      const { token } = context
      return await dataSources.OCAPI.auth(token ? 'refresh' : 'guest')
    },

    getProduct: async (root, { id }, { dataSources }) => {
      return await dataSources.OCAPI.getProduct(id)
    },

    getCategory: async (root, { id }, { dataSources }) => {
      return await dataSources.OCAPI.getCategory(id)
    },

    getCategoryProductList: async (root, { categoryId }, { dataSources }) => {
      return await dataSources.OCAPI.getCategoryProductList(categoryId)
    }
  },

  Mutation: {
    addToCart: async (root, variables, { dataSources }) => {
      try {
        const res = await dataSources.OCAPI.addToCart(variables)
        return res
      } catch (err) {
        console.log(err)
      }
      return null
    }
  },

  Cart: {
    id: root => console.log(root) || root.basket_id,
    items: root => {
      return root.product_items
        ? root.product_items.map(item => ({
            id: item.product_id
          }))
        : []
    }
  },

  CartItem: {
    product: async (root, variables, { dataSources }) => {
      return await dataSources.OCAPI.getProduct(root.id)
    }
  },

  User: {
    cart: async (root, variables, { dataSources }) => {
      const cartsResult = await dataSources.OCAPI.getCustomerCarts(root)
      if (cartsResult.baskets && cartsResult.baskets[0]) {
        const basketId = cartsResult.baskets[0].basket_id
        return await dataSources.OCAPI.getCustomerCart({ basketId, ...root })
      }
      return await dataSources.OCAPI.createCustomerCart(root)
    }
  },

  Category: {
    url: root => root.c_alternativeUrl,

    parentCategory: async (root, variables, { dataSources }) => {
      return await dataSources.OCAPI.getCategory(root.parent_category_id)
    },

    categories: async root => {
      return root.categories
        ? {
            edges: root.categories.map(cat => ({
              node: cat
            }))
          }
        : null
    }
  },

  CategoryProductList: {
    category: async (root, args, { dataSources }) => {
      return await dataSources.OCAPI.getCategory(root.selected_refinements.cgid)
    },

    products: async (root, args, { dataSources }) => {
      if (root.hits) {
        const { data: products } = await dataSources.OCAPI.getProducts(
          root.hits.map(p => p.product_id)
        )
        return {
          edges: products.map(item => ({
            node: {
              id: item.product_id,
              name: item.product_name,
              ...item
            }
          }))
        }
      }
      return null
    }
  },

  Product: {
    color: root => root.c_color,
    size: root => root.c_size,

    category: async (root, variables, { dataSources }) => {
      return await dataSources.OCAPI.getCategory(root.primary_category_id)
    },

    variationAttributes: root => {
      try {
        const { image_groups, variation_attributes } = root
        const color = image_groups
          .filter(ig => ig.view_type === 'swatch')
          .map(swatch => {
            const id = swatch.variation_attributes[0].values[0].value
            const color = variation_attributes
              .find(attr => attr.id === 'color')
              .values.find(v => v.value === id)
            if (!color) {
              return undefined
            }
            const { orderable } = color
            return {
              key: `${root.id}-${id}`,
              id,
              orderable,
              name: id,
              swatch: {
                id,
                image: {
                  src: swatch.images[0].link,
                  alt: swatch.images[0].alt
                }
              },
              images: image_groups
                .filter(i => i.variation_attributes[0].values[0].value === id)
                .find(i => i.view_type === 'large')
                .images.map(img => ({
                  src: img.link,
                  alt: img.alt
                }))
            }
          })
          .filter(i => i)
        const size = variation_attributes
          .find(attr => attr.id === 'size')
          .values.map(v => ({
            key: `${root.id}-${v.value}`,
            id: v.value,
            name: v.value,
            orderable: v.orderable
          }))
        return { color, size }
      } catch (err) {
        console.log(err)
        console.log(root.id)
        return { color: null, size: null }
      }
    },

    variants: root => {
      if (!root.variants) {
        return []
      }
      return root.c_variants.map((v, idx) => ({
        id: v.product_id,
        color: v.variation_values.color,
        size: v.variation_values.size,
        orderable: root.variants[idx].orderable,
        pricing: {
          type: v.c_pricing.type,
          min: v.c_pricing.minPrice,
          max: v.c_pricing.maxPrice || v.c_pricing.price
        }
      }))
    },

    images: async (root, args, { dataSources }) => {
      let imageGroups = root.image_groups
      if (!imageGroups) {
        const res = await dataSources.OCAPI.getProduct(root.id)
        imageGroups = res.image_groups
      }
      return imageGroups
        .find(i => i.view_type === 'large')
        .images.map(img => ({
          src: img.dis_base_link,
          alt: img.alt
        }))
    }
  },

  ProductVariant: {
    productDetail: async (root, variables, { dataSources }) => {
      return await dataSources.OCAPI.getProduct(root.id)
    }
  }
}
