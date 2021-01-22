const request = require('request');
const {
    MessageEmbed
} = require('discord.js');
module.exports = {
    name: 'flip',
    description: 'Retournez votre texte',
    group: 'Fun',
    usage: "[Texte]",
    args: true,
    example: " chat",
    execute(message, args) {
        let text = "";
        for (let i = 0; i < args.length; i++) {
            if (i > 0) {
                text = text + " ";
            }
            text = text + args[i];
        }

        request("https://www.no-api-key.com/api/v1/flip-text?text=" + text, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                let reversedTextTab = JSON.parse(body).message.split('');
                for (let i = 0; i < reversedTextTab.length; i++) {
                    if (reversedTextTab[i] == "%") {
                        reversedTextTab[i] = String.fromCharCode(reversedTextTab[i].replace('%', "0x") + reversedTextTab[i - 1] + reversedTextTab[i - 2]);
                        reversedTextTab[i - 1] = "";
                        reversedTextTab[i - 2] = "";
                    }
                }
                let reversedText = "";
                for (let i = 0; i < reversedTextTab.length; i++) {
                    reversedText = reversedText + reversedTextTab[i];
                }
                const embed = new MessageEmbed()
                    .setColor(0x00bfff)
                    .setDescription(reversedText);
                message.channel.send(embed);
            }
        });
    },
};