const request = require('request')
const _ = require('lodash')
const cTable = require('console.table')
const url = 'http://apimobile.meituan.com/group/v4/poi/pcsearch/1?uuid=825b1ebd720748478a25.1528896986.1.0.0&userid=-1&limit=64&offset=0&cateId=1&q=%E6%96%B0%E5%A5%A5%E8%B4%AD%E7%89%A9%E4%B8%AD%E5%BF%83%E5%BA%97&areaId=-1'

let options = {
	url: url,
	headers: {
		'Accept': '*/*',
		'gzip': true,
    'Accept-Language': 'en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7',
    'Connection': 'keep-alive',
    'Cookie': '_lxsdk_cuid=160457771e3c8-0637625f1fc1fa-163b6656-13c680-160457771e3c8; uuid=825b1ebd720748478a25.1528896986.1.0.0; ci=1; rvct=1; _lxsdk_s=163f95cb572-b0c-c53-2bb%7C%7C8',
    'Host': 'apimobile.meituan.com',
    'Origin': 'http://bj.meituan.com',
    'Referer': 'http://bj.meituan.com/s/%E6%96%B0%E5%A5%A5%E8%B4%AD%E7%89%A9%E4%B8%AD%E5%BF%83%E5%BA%97/',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36',
  }
}

request(options, (err, res, body) => {
	let res_obj = JSON.parse(body.toString())
	let search_result = res_obj.data.searchResult

	let candidate = []
	for (let food of search_result) {
		candidate.push({
			restaurant: food.title,
			abstracts: _.map(food.abstracts, 'message'),
		})
	}

	console.table(candidate)
})

