const discord = require("discord.js")
const client = new discord.Client()

const data = require("./data.json")

const { prefix } = require("./config.json")

const field = [
0,0,0,
0,0,0,
0,0,0
];

async function Game(message) {
const [command, ...args] = message.content.slice(prefix.length).split(' ');
const channel = data.find(ch => ch.chid === message.channel.id);
if (!message.content.startsWith(prefix)) return;
if (command === 'set') {
if (!channel) {
data.push({
chid: message.channel.id,
field: field,
entory: [
{ uid: null, ability: '⭕️' },
{ uid: null, ability: '❌' }
				]
			});
			message.channel.send('チャンネル情報をセットしました。');
		} else {
			message.reply('ゲームはもう始まっている...');
		}
	}
	if (command === 'start') {
		if (channel) {
			let count = 2;
			message.channel
				.send(
					new discord.MessageEmbed()
						.setDescription('`!?ok`と発言して参加してください。')
						.addField('募集人数', `残り${count}人`)
				)
				.then(async start => {
					const collector = await message.channel.createMessageCollector(
						m => m.author.id === message.author.id,
						{ time: 60000 }
					);
					collector.on('collect', collected => {
						switch (collected.content.toLowerCase()) {
							case '!?ok':
								if (count > 0) {
									count -= 1;
									message.channel
										.send(message.author.username + 'さんが参加しました。')
										.then(msg => {
											msg.delete({ timeout: 2000 });
											if (channel.entory[0].uid == null) {
												channel.entory[0].uid = message.author.id;
												start.edit(
													new discord.MessageEmbed()
														.setDescription(
															'`!?ok`と発言して参加してください。'
														)
														.addField('募集人数', `残り${count}人`)
												);
												message
													.reply('あなたは⭕️です！')
													.then(reply => reply.delete({ timeout: 2000 }));
											} else {
												channel.entory[1].uid = message.author.id;
												start.edit(
													new discord.MessageEmbed()
														.setDescription(
															'`!?ok`と発言して参加してください。'
														)
														.addField('募集人数', `残り${count}人`)
												);
												message
													.reply('あなたは❌です！')
													.then(reply => reply.delete({ timeout: 2000 }));
												start.edit(
													new discord.MessageEmbed().setTitle(
														'ゲームを開始します。'
													)
												);
											}
										});
								} else {
									client.channels.cache
										.get(channel.chid)
										.send('募集を終了しました。');
}
break;
}
collector.on('end', () => {
    start.edit(
   new discord.MessageEmbed().setTitle('処理を終了しました。')
   );
  });
 });
});
		} else {
 message.reply('ゲームをセットしたください。');
  }
 }
}

client.on('message', message => Game(message));

client.login(process.env.TOKEN);
