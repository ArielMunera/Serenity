const request = require('request');
const {
    MessageEmbed
} = require('discord.js');
let functions = require('../functions.js');
module.exports = {
    name: 'cuddle',
    aliases: ['caresse', 'cuddles', 'caresses'],
    description: 'Send cuddles to someone',
    args: true,
    guildOnly: true,
    execute(message, args) {
        request("http://api.giphy.com/v1/gifs/search?q=cuddles&api_key=" + process.env.GIPHYKEY + "&limit=100", function (error, response, body) {
            if (!error && response.statusCode == 200) {
                // Convert body to JSON object
                let jsonUrl = JSON.parse(body);

                // Get random number to choose GIF
                let totGif = jsonUrl.data.length;

                if (totGif > 100) {
                    totGif = 100;
                }
                let cuddlesMessage = "";
                const user = functions.getUserFromMention(args[0], message);
                try {
                    if (user == message.author) {
                        cuddlesMessage = message.author.username + " tu dois te sentir seul(e)... Je te fais pleins de caresses :two_hearts:`\n";
                    } else {
                        cuddlesMessage = user.username + " Vous recevez des caresses de " + message.author.username + " :two_hearts:!\n";
                    }
                } catch (error) {
                    console.error(error);
                    message.reply('There was an error with the mention');
                }
                let ranNum = Math.floor(Math.random() * totGif);
                const embed = new MessageEmbed()
                    // Set the title of the field
                    .setDescription(cuddlesMessage)
                    // Set the color of the embed
                    .setColor(0x00bfff)
                    // Set the main content of the embed
                    .setImage(jsonUrl.data[ranNum].images.original.url)
                // Send the embed to the same channel as the message
                message.channel.send(".").then(async () => {
                    message.channel.bulkDelete(2, true);
                    message.channel.send({
                        content: args[0],
                        embed
                    });
                });
            }
        });
    },
};