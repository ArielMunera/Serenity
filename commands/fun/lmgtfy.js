const {
    MessageEmbed
} = require('discord.js');
const prefix = process.env.PREFIX;
module.exports = {
    name: 'lmgtfy',
    aliases: ['google'],
    description: 'Envoyer un lien LMGTFY.',
    group: 'Fun',
    args: true,
    example: `\`${prefix}${this.name} Quelle heure est-il ?\`\n`,
    execute(message, args) {
        const data = [];
        const question = args.join('+');
        const text = `Voici la solution à [ta question](https://www.lmgtfy.com/?q=${question} \'ta question\'),` +
            ` c\'est de la part de ${message.author}, il pense que cela pourrait t\'aider !`;
        data.push(text);
        const embed = new MessageEmbed()
            .setColor(0x00bfff)
            .setDescription(data);

        return message.delete().then(message.channel.send(embed));
    },
};