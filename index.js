const discord = require("discord.js")
const client = new discord.Client()

const data = require("./data.json")

const { prefix } = require("./config.json")

const field = [
[0,0,0],
[0,0,0],
[0,0,0],
];

function async Game(message) {
const [command,...args] = message.content.slice(prefix.length).split(" ")
if(!message.content.startsWith(prefix)) return;
if(command === "start") {
  message.channel.send(
    new discord.MessageEmbed()
    .setDescription("リアクションを押して参加してください。")
    .addField("募集人数", `残り${count}人`)
    ).then(start => {
    let count = 2
    start.react("✅").then(reaction => {
    const filter = (reaction, user) => reaction.emoji.name === "✅" && !user.bot;
    start.awaitReactions(filter, { max: 1, time: 180000, errors: ["time"] })
     .then(() => {
      if(count > 0) {
      coint -= 1;
      start.edit(
     new discord.MessageEmbed()
    .setDescription("リアクションを押して参加してください。")
    .addField("募集人数", `残り${count}人`)
      )
      } else {
        count = 0;
        start.edit(new discord.MessageEmbed().setTitle("ゲームを開始します。"))
      }
    })
     .catch(() => start.edit(new discord.MessageEmbed().setTitle("時間切れです。")));
    })
  })
 }
}

client.on("message", message => Game(message))
