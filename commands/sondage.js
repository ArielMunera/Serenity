const {
    MessageEmbed
} = require('discord.js');
module.exports = {
    name: 'sondage',
    description: 'Créer un sondage de type **Pour**/**Contre**',
    usage: "<question>",
    execute(message, args) {
        message.channel.send(".").then(async () => {
            message.channel.bulkDelete(2, true);
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
            // Send the embed to the same channel as the message
            const replyMsg = await message.channel.send(embed);
            // on ajoute les réactions à notre réponse :
            replyMsg.react('✅');
            replyMsg.react('❌');
        });
    },
};