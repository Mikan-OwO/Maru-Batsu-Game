const discord = require("discord.js")
const client = new discord.Client()

const data = require("./data.json")

const { prefix } = require("./config.json")

const field = [
0,0,0,
0,0,0,
0,0,0
];

function async Game(message) {
const [command,...args] = message.content.slice(prefix.length).split(" ")
const channel = data.find(ch => ch.chid === message.channel.id)
if(!message.content.startsWith(prefix)) return;
if(command === "start") {
 if(!channel) {
   data.push({
     chid: message.channel.id,
     field: field,
     entory1: {uid: null, ability: "⭕"},
     entory2: {uid: null, ability: "❌"}
   });
  let count = 2;
  message.channel.send(
    new discord.MessageEmbed()
    .setDescription("リアクションを押して参加してください。")
    .addField("募集人数", `残り${count}人`)
    ).then(async start => {
    const collector = await message.channel.createMessageCollector(m => m.author.id === message.author.id, 
    {time: 60000})
     collector.on('collect',collected => {
      switch(collected.content.toLowerCase()) {
        case "!?ok":
          if(count > 0) {
          count -= 1;
          message.channel.send(message.author.username + "さんが参加しました。")
          .then(msg => msg.delete({timeout: 2000));
          if(channel.entory1.uid == null) {
          channel.entory1.uid = message.author.id;
          message.reply("あなたは⭕️です！")
                                   .then(reply => reply.delete({timeout: 2000}))
                } else {
                  channel.entory2.uid = message.author.id;
                message.reply("あなたは❌です！").then(reply => reply.delete({timeout: 2000}))
               }
              } else {
          client.channels.cache.get(channel.chid).send("募集を終了しました。")
              }
          break;
      }
     collector.on('end', () => {
      start.edit(new discord.MessageEmbed().setTitle("処理を終了しました。"))
    }
   })
  })
  } else {
  message.reply("ゲームはもう始まっている...")
  }
 }
}

client.on("message", message => Game(message))

client.login(process.env.TOKEN);
