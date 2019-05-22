const cheerio = require('cheerio')

const parseProducts = $ => {
  return $('.productresultarea .product')
    .toArray()
    .map(p => {
      const $p = $(p)
      return {
        id: $p.attr('data-pid'),
        name: $p
          .find('[itemprop="name"]')
          .text()
          .trim(),
        path: $p.find('[itemprop="url"]').attr('href'),
        thumbnail: { src: $p.find('[itemprop="image"]').attr('src') },
        brand: $p
          .find('[itemprop="brand"]')
          .text()
          .replace(/\r?\n|\r|\t/g, ''),
        price: parseFloat(
          $p
            .find('.salesprice')
            .text()
            .replace(/from/i, '')
            .replace(/\$/, '')
            .replace(/,/, '')
            .trim()
        ),
        basePrice: $p
          .find('.salesprice')
          .text()
          .replace(/\r?\n|\r|\t/g, '')
          .replace(/\s{2}/g, ' ')
          .trim(),
        rating: parseFloat($p.find('#BVInlineRatings img').attr('title')),
        promoMessage: $p
          .find('.promotionalMessage')
          .text()
          .trim(),
        variantAttributes: $p
          .find('.variationattributes > .swatches')
          .toArray()
          .map(v => {
            const $v = $(v)
            return {
              id: $v.attr('id'),
              title: $v
                .find('.varTitle')
                .text()
                .trim(),
              titleAlt: $v
                .find('.varTitleAlt')
                .text()
                .trim()
            }
          })
      }
    })
}

module.exports = (response, params = {}) => {
  const $ = cheerio.load(response)
  const items = parseProducts($)
  return items
}
