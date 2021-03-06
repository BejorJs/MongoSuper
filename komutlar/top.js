const { MessageEmbed } = require('discord.js');
const MemberStats = require('../Models/MemberStats.js');

module.exports.execute = async(client, message, args,ayar,emoji) => {
    if(![ayar.sahipRolu].some(role => message.member.roles.cache.has(role)) && message.channel.id === ayar.chatKanali) return message.react(emoji.iptal);

    const embed = new MessageEmbed().setColor(client.randomColor()).setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true, size: 2048}));
    MemberStats.find({guildID: message.guild.id}).exec((err, data) => {
        data = data.filter(m => message.guild.members.cache.has(m.userID));
        let toplamSesSiralama = data.sort((uye1, uye2) => Number(uye2.totalVoiceStats)-Number(uye1.totalVoiceStats)).slice(0, 5).map((m, index) => `\`${index+1}.\` ${message.guild.members.cache.get(m.userID).toString()} \`${client.convertDuration(Number(m.totalVoiceStats))}\``).join('\n');
        let haftalikSesSiralama = data.sort((uye1, uye2) => {
            let uye2Toplam = 0;
            uye2.voiceStats.forEach(x => uye2Toplam += x);
            let uye1Toplam = 0;
            uye1.voiceStats.forEach(x => uye1Toplam += x);
            return uye2Toplam-uye1Toplam;
        }).slice(0, 5).map((m, index) => {
            let uyeToplam = 0;
            m.voiceStats.forEach(x => uyeToplam += x);
            return `\`${index+1}.\` ${message.guild.members.cache.get(m.userID).toString()} \`${client.convertDuration(uyeToplam)}\``;
        }).join('\n');

        let toplamChatSiralama = data.sort((uye1, uye2) => Number(uye2.totalChatStats)-Number(uye1.totalChatStats)).slice(0, 5).map((m, index) => `\`${index+1}.\` ${message.guild.members.cache.get(m.userID).toString()} \`${(Number(m.totalChatStats))} mesaj\``).join('\n');
        let haftalikChatSiralama = data.sort((uye1, uye2) => {
            let uye2Toplam = 0;
            uye2.chatStats.forEach(x => uye2Toplam += x);
            let uye1Toplam = 0;
            uye1.chatStats.forEach(x => uye1Toplam += x);
            return uye2Toplam-uye1Toplam;
        }).slice(0, 5).map((m, index) => {
            let uyeToplam = 0;
            m.chatStats.forEach(x => uyeToplam += x);
            return `\`${index+1}.\` ${message.guild.members.cache.get(m.userID).toString()} \`${Number(uyeToplam)} mesaj\``;
        }).join('\n');
        embed.setDescription(`${message.guild.name} sunucusunun genel ve haftal??k chat-ses istatistikleri;`);
        embed.addField('Haftal??k Ses S??ralama', haftalikSesSiralama);
        embed.addField('Haftal??k Chat S??ralama', haftalikChatSiralama);
        embed.addField('Genel Ses S??ralama', toplamSesSiralama);
        embed.addField('Genel Chat S??ralama', toplamChatSiralama);
        message.channel.send(embed)
    });
};

module.exports.configuration = {
    name: 'top',
    aliases: ['top10'],
    usage: 'top',
    description: 'Top 10 istatistikler.',
    permLevel: 0
};