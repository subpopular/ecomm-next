const cheerio = require('cheerio')

const parseCartItems = $ => {
  return [
    {
      id: 'FF123456',
      name: 'GAGA Executive Chair',
      path: '/gaga-executive-recliner-by-lafer-LFR689035.html',
      brand: 'By Lafer',
      price: 5249.48,
      thumbnail: {
        src: 'https://images.lumens.com/is/image/Lumens/LFRP154051?$Lumens.com-110$'
      }
    }
  ]
  // return $(".carttable .cartproductrow")
  //   .toArray()
  //   .map(row => {
  //     const $row = $(row)
  //     return {
  //       id: text($row.find(".productid .value")),
  //       name: text($row.find(".product .name a")),
  //       url: $row.find(".product .name a").attr("href"),
  //       brand: text($row.find(".product .name .cartBrand")),
  //       price: text($row.find(".price .standardprice"))
  //     }
  //   })
}

module.exports = response => {
  const $ = cheerio.load(response)
  return {
    items: parseCartItems($)
  }
}
