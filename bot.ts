let telegramBot = require("node-telegram-bot-api");

// (async()=> {
// let data = await (await fetch('http://worldtimeapi.org/api/timezone/asia/Baku')).json()
// // console.log(data);

// })()

let token = "6411892572:AAH5dGhr3Ej8feFkhiuzPsR4GBObcD0nspM";

let bot = new telegramBot(token, { polling: true });

bot.onText(/\/start/, (msg: typeof bot) => {
  let id = msg.from.id;

  bot.sendMessage(id, `hello ${msg.from.first_name} welcome to bot World Time`);
});

bot.on("message", (msg: typeof bot) => {
  let id = msg.from.id;
  if (msg.text == "/start") return;

    let message = new MessageText(id , msg.text)
    
    message.desplayMessage()

});

class MessageText {
  constructor(protected senderId: number, protected content: string) {}

  desplayMessage() {
    
    bot.sendMessage(this.senderId , 'yes')

  }
}
