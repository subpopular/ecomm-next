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

  async getCategoryProductList(categoryId) {
    const path = `/product_search?refine=cgid=${categoryId}&start=0&count=40&locale=default`
    return await this.get(path)
  }

  async getCategory(id) {
    let res = await this.get(`/categories/${id}`)
    if (res.categories) {
      res = {
        ...res,
        categories: {
          edges: res.categories.map(node => ({ node }))
        }
      }
    }
    return res
  }
}

module.exports = LumensAPI
