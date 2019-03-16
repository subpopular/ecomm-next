const { RESTDataSource } = require('apollo-datasource-rest')
const parsePageInfo = require('./parsers/parse-pageinfo')
const parseProductList = require('./parsers/parse-product-list')
const parseProductDetail = require('./parsers/parse-product-detail')
const parseNavMenu = require('./parsers/parse-nav-menu')
const parseCart = require('./parsers/parse-cart')

class LumensAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = 'https://www.lumens.com'
  }

  willSendRequest(request) {
    const { cookie } = this.context
    if (cookie) {
      request.headers.set('Cookie', cookie)
    }
  }

  async getPage(args) {
    const result = parsePageInfo(
      await this.get(args.path, null, { cacheOptions: { ttl: 300 } }),
      args
    )
    return result
  }

  async getProducts(path) {
    const html = await this.get(path, null, { cacheOptions: { ttl: 300 } })
    return parseProductList(html)
  }

  async getProduct(path) {
    const res = await this.get(path, null, { cacheOptions: { ttl: 300 } })
    return parseProductDetail(res, { path })
  }

  async getNavMenu() {
    return parseNavMenu(await this.get('/', null, { cacheOptions: { ttl: 300 } }))
  }

  async getCart() {
    return parseCart(await this.get('/cart'))
  }
}

module.exports = LumensAPI
