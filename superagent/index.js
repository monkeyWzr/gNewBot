const superagent = require('../config/superagent')
const config = require('../config/index')
const cheerio = require('cheerio')

async function getOne() { // 获取每日一句
  let res = await superagent.req(config.ONE,'GET')
  let $ = cheerio.load(res.text)
  let todayOneList = $('#carousel-one .carousel-inner .item')
  let todayOne = $(todayOneList[0]).find('.fp-one-cita').text().replace(/(^\s*)|(\s*$)/g, "")
  return todayOne;
}

async function getNews() {
  const res = await superagent.fromRss(config.GCORES_RSS)
  let $ = cheerio.load(res.text, {
    xmlMode: true
  })
  let news = []
  $('channel > item').each(function(i, elem) {
    news.push({
      title: $(this).find('title').text(),
      link: $(this).find('link').text(),
    })
  })
  return news
}
module.exports ={
  getOne, getNews
}
