const request = require('request');
const {
    MessageEmbed
} = require('discord.js');
const {
    getUserFromMention
} = require('./getUser');
const {
    giphyKey
} = require('../config.json');
exports.getRandomGifToEmbed = (searchGifWord, message, args, aloneMessage, duoMessage, emoji) => {
    request("http://api.giphy.com/v1/gifs/search?q=" + searchGifWord + "&api_key=" + giphyKey + "&limit=100", function (error, response, body) {
        if (!error && response.statusCode == 200) {
            // Convert body to JSON object
            let jsonUrl = JSON.parse(body);

            // Get random number to choose GIF
            let totGif = jsonUrl.data.length;

            if (totGif > 100) {
                totGif = 100;
            }
            let cuddlesMessage = "";
            const user = getUserFromMention(args[0], message);
            try {
                if (user == message.author) {
                    cuddlesMessage = message.author.username + aloneMessage + emoji + "\n";
                } else {
                    cuddlesMessage = user.username + duoMessage + message.author.username + emoji + "\n";
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
};