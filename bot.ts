import TelegramBot from 'node-telegram-bot-api'
require('dotenv').config()
let token = process.env.BOT_TOKEN as string

let bot = new TelegramBot( token, {polling: true });


bot.onText(/\/start/, async (msg) => {
  let id = msg.from?.id
    let message = `hello ${msg.from?.first_name} welcome to bot World Time
    
This robot helps you to get world clock statistics

Please enter the desired continent with the desired city name

⚠️Note that your city must be the capital of that country
    
For example: "Asia Tehran or Africa Algiers or America Adak or America Indiana Marengo"
    
Otherwise, the robot will not return a message to you
    `

    await bot.sendChatAction(id as number, "typing");
    bot.sendMessage(id as number, message);
});

bot.on("message", (msg) => {
  let id = msg.from?.id
  if (msg.text == "/start") return;

    let message = new MessageText(id as number , msg.text as string)
    message.desplayMessage()
    
});

class MessageText {
  constructor(protected senderId: number, protected content: string) {}
  
  async desplayMessage() {
      let splitData = this.content.split(' ')
      let sliceData = splitData.slice(1)
     await bot.sendChatAction(this.senderId , 'typing')
     let response;
     try {
     response = await (await fetch(`http://worldtimeapi.org/api/timezone/${splitData[0]}/${sliceData}`)).json()
    } catch (error) {
      bot.sendMessage(this.senderId , 'The server encountered a problem, please try again')
     }
     
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
