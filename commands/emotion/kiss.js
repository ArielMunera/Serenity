const {
    getRandomGifToEmbed
} = require('../../util/getRandomGif');
const prefix = process.env.PREFIX;
module.exports = {
    name: 'kiss',
    aliases: ['bisous'],
    description: 'Envoyer des bisous à quelqu\'un.',
    group: 'Emotion',
    args: true,
    guildOnly: true,
    example: `\`${prefix}${this.name} @Someone\`\n`,
    execute(message, args) {
        getRandomGifToEmbed("kiss", message, args, " tu dois te sentir seul(e)... Je te fais un gros bisou", " Vous recevez un bisou de ", " :kiss:!");
    },
};