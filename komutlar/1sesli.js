const { MessageEmbed } = require('discord.js');
const prefix = global.conf;

module.exports.execute = async (client, message, args, conf, emoji) => {

	if (!client.kullanabilir(message.author.id) && !conf.teyitciRolleri.some(r => message.member.roles.cache.has(r))) return message.react(emoji.iptal);



let onlineUsers1 = message.guild.members.cache.filter(m => m .voice.channel).size;  
let publicCategory = message.guild.members.cache.filter(x => !x.user.bot && x.voice.channel && x.voice.channel.parentID === "819564489095118858");
let privCategory = message.guild.members.cache.filter(x => !x.user.bot && x.voice.channel && x.voice.channel.parentID === "819564493834420284");

let embed = new MessageEmbed()
.setColor("#2F3136")
.setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
.setDescription(`\`>\` Şu anda toplam ${client.emojiSayi(`${onlineUsers1}`)} kişi seslide. \n\n\`>\` Public Odalarda ${client.emojiSayi(`${publicCategory.size}`)} \n\`>\` Priv Odalarda ${client.emojiSayi(`${privCategory.size}`)}`)
.setFooter(`${message.author.username} Tarafından istendi | ${conf.durum}`)
               message.channel.send(embed).then(x => x.delete({ timeout: 5000 }));

}

module.exports.configuration = {
	name: 'sesli',
	aliases: [],
	usage: 'sesli',
	description: 'Belirtilen üyeyi sunucuya kaydeder veya sadece ismini değiştirir.',
	permLevel: 0
};
