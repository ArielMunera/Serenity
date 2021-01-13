const {
    MessageEmbed
} = require('discord.js');
const request = require('request');
const prefix = process.env.PREFIX;
const tokenBlaguesAPI = process.env.TOKEN;
module.exports = {
    name: 'joke',
    aliases: ['blague'],
    description: 'Demander une blague',
    group: 'Fun',
    usage: "<type de blague>",
    guildOnly: true,
    example: `\`${prefix}${this.name} \`\n` +
        `\`${prefix}${this.name} dark\`\n`,
    execute(message, args) {
        message.delete().then(
            request('https://www.blagues-api.fr/api/random', {
                    headers: {
                        'Authorization': `Bearer ` + tokenBlaguesAPI
                    }
                },
                function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        const jokeBody = JSON.parse(body);
                        let typeBlague = "";
                        switch (jokeBody.type) {
                            case "global":
                                typeBlague = "tout publique";
                                break;
                            case "dev":
                                typeBlague = "de développeur";
                                break;
                            case "dark":
                                typeBlague = "humour noir";
                                break;
                            case "limit":
                                typeBlague = "limite limite";
                                break;
                            case "beauf":
                                typeBlague = "de beauf";
                                break;
                            case "blondes":
                                typeBlague = "sur les blondes";
                                break;
                        }
                        const embed = new MessageEmbed()
                            // Set the title of the field
                            .setTitle(jokeBody.joke)
                            // Set the color of the embed
                            .setColor(0x00bfff)
                            // Set the main content of the embed
                            .setDescription("||" + jokeBody.answer + "||")
                            .setFooter('Blague ' + typeBlague, message.guild.iconURL())
                            .setTimestamp();
                        message.channel.send(embed);
                    }
                })
        );
    },
};