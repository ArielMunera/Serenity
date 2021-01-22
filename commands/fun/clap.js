const {
    MessageEmbed
} = require('discord.js');
module.exports = {
    name: 'clap',
    description: 'Faites applaudir votre texte',
    usage: "[texte]",
    guildOnly: true,
    example: ` C'est incroyable`,
    group: 'Fun',
    args: true,
    execute(message, args) {
        let text = "";
        for (let i = 0; i < args.length; i++) {
            if (i > 0) {
                text = text + ":clap:";
            }
            text = text + args[i].toUpperCase();
        }
        const embed = new MessageEmbed()
            .setColor(0x00bfff)
            .setDescription("**" + text + "**");
        message.channel.send(embed);
    },
};