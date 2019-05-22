const { RESTDataSource } = require('apollo-datasource-rest')

class LumensAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = 'https://staging-web-reitmans.demandware.net/s/Additionelle_CA/dw/shop/v18_8'
  }

  willSendRequest(request) {
    request.params.set('client_id', 'a5880415-96c2-4fe1-8d1e-a70a343dfe69')
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
      )})?expand=availability%2Cprices%2Cvariations%2Cpromotions%2Cimages%2Crecommendations%2Clinks%2Cset_products%2Coptions&locale=default&all_images=true`
    )
  }

  async getCategoryProductList(categoryId) {
    const path = `/product_search?refine=cgid=${categoryId}&start=0&count=40&locale=default`
    return await this.get(path)
  }

  async getCategory(id) {
    return await this.get(`/categories/${id}?levels=3&locale=default`)
  }
}

module.exports = LumensAPI
