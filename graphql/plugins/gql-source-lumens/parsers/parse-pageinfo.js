const url = require('url')
const cheerio = require('cheerio')

const parser = (html, args) => {
  const $ = cheerio.load(html)

  const meta = {
    title: $('title').text()
  }

  const headings = {
    primary: (() => {
      return (
        {
          '/men': "Men's Cologne",
          '/women': "Women's Perfume"
        }[args.path] ||
        $('h1')
          .eq(0)
          .text()
          .trim()
          .replace(/(“|”)/g, '')
      )
    })()
  }

  return { id: args.path, path: args.path, meta, headings }
}

module.exports = parser
