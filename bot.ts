let telegramBot = require("node-telegram-bot-api");

(async()=> {
let data = await (await fetch('http://worldtimeapi.org/api/timezone/America')).json()
// console.log(data);

})()

let token = "6411892572:AAH5dGhr3Ej8feFkhiuzPsR4GBObcD0nspM";

let bot = new telegramBot(token, { polling: true });

bot.onText(/\/start/, async (msg: typeof bot) => {
  let id = msg.from.id;
    let message = `hello ${msg.from.first_name} welcome to bot World Time
    
This robot helps you to get world clock statistics

Please enter the desired continent with the desired city name

⚠️Note that your city must be the capital of that country
    
For example: "Asia Tehran or Africa Algiers or America Adak or America Indiana Marengo"
    
Otherwise, the robot will not return a message to you
    `
    await bot.sendChatAction(id, "typing");
    bot.sendMessage(id, message);
});

bot.on("message", (msg: typeof bot) => {
  let id = msg.from.id;
  if (msg.text == "/start") return;
console.log(msg);

    let message = new MessageText(id , msg.text)
    message.desplayMessage()
    
});

interface ResponseData {
    abbreviation: string
    client_ip: string
    datetime: string
    day_of_week: number
    day_of_year: number
    raw_offset: number
    timezone: string
    unixtime: number
    utc_datetime: string
    utc_offset: string
    week_number: string
    error: string
}


class MessageText {
  constructor(protected senderId: number, protected content: string) {}
  
  async desplayMessage() {
      let splitData = this.content.split(' ')
      let sliceData = splitData.slice(1)
     await bot.sendChatAction(this.senderId , 'typing')
      let response: ResponseData = await (await fetch(`http://worldtimeapi.org/api/timezone/${splitData[0]}/${sliceData}`)).json()
      
    if (response.error)return bot.sendMessage(this.senderId , response.error)

    let result = `data: \n
abbreviation: ${response.abbreviation}\n
your ip: ${response.client_ip}\n
datetime: ${response.datetime}\n
day_of_week: ${response.day_of_week}\n
day_of_year: ${response.day_of_year}\n
raw_offset: ${response.raw_offset}\n
timezone: ${response.timezone}\n
unixtime: ${response.unixtime}\n
utc_datetime: ${response.utc_datetime}\n
utc_offset: ${response.utc_offset}\n
week_number: ${response.week_number}`

    bot.sendMessage(this.senderId , result)

  }
}
