const {
    getRandomGifToEmbed
} = require('../../util/getRandomGif');
const prefix = process.env.PREFIX;
module.exports = {
    name: 'hug',
    aliases: ['calins', 'calin', 'hugs'],
    description: 'Envoyer un câlin à quelqu\'un.',
    group: 'Emotion',
    args: true,
    guildOnly: true,
    example: `\`${prefix}${this.name} @Someone\`\n`,
    execute(message, args) {
        getRandomGifToEmbed("hug", message, args, " tu dois te sentir seul(e)... Je te fais un gros câlin", " Vous recevez un câlin de ", " :sparkling_heart:!");
    },
};