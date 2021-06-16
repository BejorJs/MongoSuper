const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js');
const qdb = require("quick.db");
const tdb = new qdb.table("tag")
const { prefix } = global.conf;

module.exports.execute = async (client, message, args, ayar, emoji) => {
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
 let embed = new MessageEmbed().setTimestamp().setColor("RANDOM").setFooter(ayar.durum);
 if (!message.member.hasPermission("ADMINISTRATOR")){ return message.channel.send(embed.setDescription(`Bu komutu kullanmak için yeterli yetkiye sahip değilsin`)).then(x => x.delete({timeout: 10000}));
 
}else{
    if(!member) return message.channel.send(embed.setDescription(`Geçerli bir üye belirtmelisin!`))
    let data = tdb.fetch(`tagverdi.${member.id}`)
 
    if(data) return message.channel.send(embed.setDescription(`${member} önceden tag aldığı için listeye ekleyemem!`).setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))).then(x => x.delete({timeout: 10000}));

        const filter = (reaction, user) => {
            return ["✅"].includes(reaction.emoji.name) && user.id === member.id;
        };
        message.channel.send(embed.setDescription(`${member}, ${message.author} seni tag aldı olarak bünyesine alıyor kabul ediyor musun?`).setFooter(`Kabul etmek için 15 saniyen mevcut.`)).then(x => {
 x.react("✅");
            x.awaitReactions(filter, {max: 1, time: 15000, error: ['time']}).then(resp => {
                let response = resp.first();
                if (response) {
            tdb.add(`aldı.${message.author.id}.tag`, +1);
            tdb.push(`tagaldı.${message.author.id}`, {
                guildName: `${member}`,
                guildNameid: `${member.id}`,
                Zaman: Date.now(),
                Yetkili: message.author.id
            });
            tdb.set(`tagverdi.${member.id}`,true)
 
            let datas = tdb.get(`aldı.${message.author.id}.tag`)
   
            message.channel.send(embed.setDescription(`${member} tag aldı listenize kayıt ettim. \n Toplam ${datas}`).setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))).then(x => x.delete({timeout: 10000}));
        };
    });
        })                
       
        }
 
        };
 
module.exports.configuration = {
    name: "tagaldı",
    aliases: [],
    usage: "tagaldı [üye]",
    description: "Tag aldırırsınız falan -_-"
};
 