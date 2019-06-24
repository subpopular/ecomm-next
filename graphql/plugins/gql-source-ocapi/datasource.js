const { RESTDataSource } = require('apollo-datasource-rest')
const DataLoader = require('dataloader')

class OCAPIDataSource extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = 'https://staging-web-reitmans.demandware.net/s/Additionelle_CA/dw/shop/v18_8'
    this.categoryLoader = new DataLoader(ids => {
      console.log(ids)
      return Promise.all(ids.map(id => this.getCategory(id)))
    })
  }

  willSendRequest(request) {
    if (this.context.token) {
      request.headers.set('Authorization', this.context.token)
    }
    request.params.set('client_id', 'a5880415-96c2-4fe1-8d1e-a70a343dfe69')
  }

  async didReceiveResponse(response, _request) {
    if (response.ok) {
      // grab the auth token from the response if it exists and
      // return it with the response data
      const token = response.headers.get('authorization')
      const json = await this.parseBody(response)
      return token ? { ...json, token } : json
    } else {
      throw await this.errorFromResponse(response)
    }
  }

  async auth(type = 'guest') {
    const result = await this.post('/customers/auth', { type })
    return {
      id: result.customer_id,
      type: result.auth_type,
      locale: result.preferred_locale,
      token: result.token
    }
  }

  async createCustomerCart({ token }) {
    return await this.post(
      `/baskets`,
      {},
      {
        headers: {
          Authorization: token
        }
      }
    )
  }

  async getCustomerCart({ basketId, token }) {
    return await this.get(
      `/baskets/${basketId}`,
      {},
      {
        headers: {
          Authorization: token
        }
      }
    )
  }

  async getCustomerCarts({ id, token }) {
    return await this.get(
      `/customers/${id}/baskets`,
      {},
      {
        headers: {
          Authorization: token
        }
      }
    )
  }

  async addToCart({ basketId, productId, quantity }) {
    return await this.post(`/baskets/${basketId}/items`, [
      {
        product_id: productId,
        quantity: quantity || 1
      }
    ])
  }

  async getProduct(id) {
    return await this.get(
      `/products/${id}?expand=images,availability,prices,variations&all_images=true`
    )
  }

  async getProducts(ids) {
    return await this.get(
      `/products/(${ids.join(
        ','
      )})?expand=availability%2Cprices%2Cvariations%2Cimages&locale=default&all_images=true`
    )
  }

  async getCategoryProductList(categoryId) {
    const path = `/product_search?refine=cgid=${categoryId}&start=0&count=20&locale=default`
    return await this.get(path)
  }

  async getCategory(id) {
    return await this.get(`/categories/${id}?levels=4&locale=default`, null, {
      cacheOptions: { ttl: 60 }
    })
  }
}

module.exports = OCAPIDataSource
