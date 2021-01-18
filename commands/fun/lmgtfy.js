const {
    MessageEmbed
} = require('discord.js');
const prefix = process.env.PREFIX;
module.exports = {
    name: 'lmgtfy',
    aliases: ['google'],
    description: 'Envoyer un lien Let Me Google That For You.',
    group: 'Fun',
    args: true,
    example: ` Quelle heure est-il ?`,
    execute(message, args) {
        const data = [];
        const question = args.join('+');
        const text = `Voici la solution à [ta question](https://fr.lmgtfy.app/?q=${question} \'ta question\'),` +
            ` c\'est de la part de ${message.author}, il pense que cela pourrait t\'aider !`;
        data.push(text);
        const embed = new MessageEmbed()
            .setColor(0x00bfff)
            .setDescription(data);

        return message.delete().then(message.channel.send(embed));
    },
};