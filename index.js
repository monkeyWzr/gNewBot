const {Wechaty} = require('wechaty')
const schedule = require('./schedule/index')
const config = require('./config/index')
const util = require('./util/index')
const superagent = require('./superagent/index')

//  二维码生成
function onScan (qrcode, status) {
  require('qrcode-terminal').generate(qrcode)  // 在console端显示二维码
  const qrcodeImageUrl = [
	'https://api.qrserver.com/v1/create-qr-code/?data=',
	encodeURIComponent(qrcode),
  ].join('')
  console.log(qrcodeImageUrl)
}

// 登录
async function onLogin (user) {
  console.log(`贴心小助理${user}登录了`)
  // 登陆后创建定时任务
  schedule.setSchedule(config.SENDDATE,()=>{
	console.log('你的贴心小助理开始工作啦！')
    main()
  })
}

//登出
function onLogout(user) {
  console.log(`${user} 登出`)
}

// 自动发消息功能
async function main() {
  let logMsg
  let room = await bot.Room.find({topic: config.ROOMNAME}) // 获取你要发送的联系人
  let one = await superagent.getOne() //获取每日一句
  let today = await util.formatDate(new Date())//获取今天的日期
  let news = await superagent.getNews()
  let newsMsg = today +  '<br>'
  news.forEach(item => {
	  newsMsg += `${item.title}<br>${item.link}<br><br>`
  })

  newsMsg += `${one}<br>Have a nice day~`
  console.log(newsMsg)
  try{
	logMsg = newsMsg
	await room.say(newsMsg)
  }catch (e) {
	logMsg = e.message
  }
  console.log(logMsg)
}

const bot = new Wechaty({name:'WechatEveryDay'})

bot.on('scan',    onScan)
bot.on('login',   onLogin)
bot.on('logout',  onLogout)

bot.start()
	.then(() => {
		console.log('开始登陆微信')
	})
	.catch(e => console.error(e))