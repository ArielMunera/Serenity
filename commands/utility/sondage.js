const {
    MessageEmbed
} = require('discord.js');
const prefix = process.env.PREFIX;
module.exports = {
    name: 'sondage',
    aliases: ['survey'],
    description: 'Créer un sondage de type **Pour**/**Contre**',
    group: 'Utilitaire',
    args: true,
    usage: "<question>",
    guildOnly: true,
    example: ` Aimez-vous le pain ?`,
    execute(message, args) {
        // We can create embeds using the MessageEmbed constructor
        // Read more about all that you can do with the constructor
        // over at https://discord.js.org/#/docs/main/master/class/MessageEmbed
        let question = "";
        for (let i = 0; i < args.length; i++) {
            question += " " + args[i];
        }
        question += "\n:white_check_mark: **Pour** :x:**Contre**\n";
        question += "Ce sondage est proposé par " + message.author.username;
        const embed = new MessageEmbed()
            // Set the title of the field
            .setTitle('Sondage')
            // Set the color of the embed
            .setColor(0x00bfff)
            // Set the main content of the embed
            .setDescription(question);
        message.delete().then(async () => {
            // Send the embed to the same channel as the message
            const replyMsg = await message.channel.send(embed);
            // on ajoute les réactions à notre réponse :
            replyMsg.react('✅');
            replyMsg.react('❌');
        });
    },
};