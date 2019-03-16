const cheerio = require('cheerio')
const url = require('url')

module.exports = async (data, params) => {
  const $html = cheerio.load(data)

  const getAvailabilityHTML = $pdp => {
    // Insert checkmark icon SVG before `strong` tag for "In Stock" text.
    const $el = $pdp.find('.primaryinfo .availability')
    const strong = $el.find('strong')
    if (strong.length > 0) {
      strong
        .parent()
        .before(
          `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/></svg>`
        )
    }
    if (!strong.text()) {
      strong.remove()
    }
    return $el.html().replace(/\r?\n|\r|\t/g, '')
  }

  const getVariations = $ => {
    const {
      variations: { attributes }
    } = JSON.parse($('.productcachejson').text())
    return attributes.map(attr => ({
      id: attr.id,
      name: attr.name,
      options: attr.vals.map(({ val }) => ({
        id: val,
        label: val,
        value: val,
        image: $(`.swatchanchor[title="${val}"] img`).attr('src')
      }))
    }))
  }

  const parseDetailTabs = $ => {
    const $tabs = $('#pdpTabsDiv')
    const $nav = $tabs.find('ul').eq(0)

    return $nav
      .find('.pdpTab')
      .toArray()
      .map(t => {
        const $t = $(t).find('a')
        return {
          label: $t
            .text()
            .replace(/\r?\n|\r|\t/g, '')
            .trim(),
          html: (() => {
            const html = $tabs
              .find($t.attr('href'))
              .find('script,style')
              .remove()
              .end()
              .find('[class]')
              .removeAttr('class')
              .end()
              .find('[style]')
              .removeAttr('style')
              .end()
              .html()
            return html.replace(/\r?\n|\r|\t/g, '').trim()
          })()
        }
      })
  }

  const parseProduct = $ => {
    const $pdp = $('#pdpMain')

    const images = $pdp
      .find('#s7placeholder img')
      .toArray()
      .map(img => $(img).attr('src'))

    const matches = params.path.match(/.*?-([^-]*)?\.html/)
    const id = matches[1]

    return {
      id,
      url: params.path,
      name: $pdp
        .find('.primaryinfo [itemprop="name"]')
        .text()
        .trim(),
      brand: $pdp
        .find('.brandContainer')
        .text()
        .replace(/\r?\n|\r|\t/g, ''),
      brandHTML: $pdp
        .find('.brandContainer')
        .html()
        .replace(/\r?\n|\r|\t/g, ''),
      basePrice: 99.99,
      priceRange: $pdp
        .clone()
        .find('.primaryinfo .priceTop')
        .find('.strike')
        .remove()
        .end()
        .text()
        .replace(/([a-zA-Z]|:)*/g, '')
        .trim(),
      originalPriceRange: ($pdp.find('.primaryinfo .priceTop .strike').text() || '').trim(),
      isOnSale: $pdp.find('.primaryinfo .flag-sale').length > 0,
      availabilityHTML: getAvailabilityHTML($pdp),
      shippingPromotionHTML: (() => {
        const html = $pdp.find('.productreview .promotion p').html()
        return html ? `<p>${html.trim()}</p>` : null
      })(),
      promotionHTML: `<p>${$('.promotion .details p')
        .find('.applySynchCard')
        .parent()
        .remove()
        .end()
        .end()
        .find('[style]')
        .removeAttr('style')
        .end()
        .html()}</p>`,
      description: $('.productDescription #shortdesc')
        .text()
        .trim(),
      images: images.map(src => ({ src })),
      thumbnails: images.map(src => {
        const { protocol, host, pathname } = url.parse(src)
        return `${protocol}//${host}${pathname}?fit=constrain,1&wid=49&hei=49&fmt=jpg&op_sharpen=1`
      }),
      variations: getVariations($),
      detailTabs: parseDetailTabs($)
      // rating: root.reviewSummary.primaryRating.average
      //   ? parseFloat(root.reviewSummary.primaryRating.average.toFixed(2))
      //   : null,
      // reviewCount: root.reviewSummary.numReviews,
    }
  }

  return parseProduct($html)
}
