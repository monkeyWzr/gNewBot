// 配置文件
module.exports ={
  // 基础定时发送功能配置项（必填项）
  NAME:'文件传输助手', //备注姓名
  NICKNAME:'', //昵称
  MEMORIAL_DAY:'2013/5/19', //你和收信者的纪念日
  SENDDATE:'0 30 0 * * *', //定时发送时间 每天8点0分0秒发送，规则见 /schedule/index.js
  ONE:'http://wufazhuce.com/', //ONE的web版网站
  GCORES_RSS: 'https://www.gcores.com/rss',
  ROOMNAME:/^文件传输助手/i, //群名(请只修改中文，不要删除符号，这是正则)
}
