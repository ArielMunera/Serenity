const {
    getRandomGifToEmbed
} = require('../../util/getRandomGif');
const prefix = process.env.PREFIX;
module.exports = {
    name: 'cuddle',
    aliases: ['caresse', 'cuddles', 'caresses'],
    description: 'Envoyer des caresses à quelqu\'un.',
    group: 'Emotion',
    args: true,
    guildOnly: true,
    example: ` @Someone`,
    execute(message, args) {
        getRandomGifToEmbed("cuddle", message, args, " tu dois te sentir seul(e)... Je te fais pleins de caresses", " Vous recevez des caresses de ", " :two_hearts:!");
    },
};