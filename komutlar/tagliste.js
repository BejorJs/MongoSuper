const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js');
const qdb = require("quick.db");
const tdb = new qdb.table("tag")
 
module.exports.execute = async (client, message, args, ayar, emoji) => {
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
 
    let embed = new MessageEmbed().setAuthor(member.displayName, member.user.displayAvatarURL({dynamic: true})).setColor(message.member.displayHexColor).setFooter(ayar.durum)
 
   if (!message.member.roles.cache.has("814260904489254912") && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(embed.setDescription(`Bu komutu kullanmak için yeterli yetkiye sahip değilsin`)).then(x => x.delete({timeout: 10000}));
 
 
 
    let data = tdb.get(`tagaldı.${member.id}`) || [];
    let listedData = data.length > 0 ? data.map((value, index) => ` \`${index + 1}.\` ${value.guildName} | (\`${value.guildNameid}\`) ${new Date(value.Zaman).toTurkishFormatDate()}`).join("\n") : "Hiç bir taglı üye almamış.";
   
    message.channel.send(embed.setDescription(`Toplam aldığı üye \`\`\`${data.length || "0"}\`\`\` \n \n ${listedData}`)).then(x => x.delete({timeout: 10000}));
 
   
};
 
module.exports.configuration = {
    name: "tagliste",
    aliases: ["tagliste"],
    usage: "tagliste",
    description: "Belirtilen üyenin taglı listesi.."
};