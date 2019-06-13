const superagent = require('superagent')
const xml2jsParser = require('superagent-xml2jsparser')

//请求
function req(url,method, params, data, cookies) {
  return new Promise(function (resolve,reject) {
	superagent(method, url)
		.query(params)
		.send(data)
		.set('Content-Type','application/x-www-form-urlencoded')
		.end(function (err, response) {
		  if (err) {
			reject(err)
		  }
		  resolve(response)
		})
  })
}

function fromRss(url) {
	return new Promise((resolve, reject) => {
		superagent.get(url)
			.accept('application/xml')
			.buffer()
			.end((err, res) => {
				if (err) {
					reject(err)
				}
				// console.log(res.text)
				resolve(res)
			})
	})
}

module.exports = {
  req, fromRss
}
