const discord = require("discord.js")
const client = new discord.Client()

const data = require("./data.json")

const field = [
[0,0,0],
[0,0,0],
[0,0,0],
];

function async Game(message) {
const [command,...args] = message.content.slice(prefix.length).split(" ")
}

client.on("message", message => Game(message))
