const { MessageEmbed } = require('discord.js')
const db = require('quick.db')
require('moment-duration-format');
const moment = require('moment');

module.exports.execute = async (client, message, args, ayar) => {

  

    const data = await db.fetch(`snipe.id.${message.guild.id}.${message.channel.id}`)
    if(!data) {
    const snipe2 = new MessageEmbed()
  .setAuthor(client.user.username, client.user.avatarURL)
  .setDescription(`Bu kanalda hiç mesaj silinmemiş.`)
.setColor(`#2F3136`)
    message.channel.send({embed: snipe2}).then(x => x.delete({ timeout: 5000 }));
          } else {
  let member = client.users.cache.get(data);
  const data2 = await db.fetch(`snipe.mesaj.${message.guild.id}.${message.channel.id}`)
  const snipe = new MessageEmbed()
.setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
  .setDescription(`${member} En son silinen mesaj: ${data2}`)
  .setTimestamp()
  .setColor("2F3136")
  message.channel.send(snipe).then(x => x.delete({ timeout: 10000 }));}
}
module.exports.configuration = {
    name: 'snipe',
    aliases: ['snipe'],
    usage: 'snipe [Silinen Mesajları gösterir]',
    description: 'Belirtilen üyeyi seste belirtilen süre kadar muteler.',
    permLevel: 0
};