const {
    getRandomGifToEmbed
} = require('../util/getRandomGif');
module.exports = {
    name: 'cuddle',
    aliases: ['caresse', 'cuddles', 'caresses'],
    description: 'Envoyer des caresses à quelqu\'un.',
    group: 'Emotion',
    args: true,
    guildOnly: true,
    execute(message, args) {
        getRandomGifToEmbed("cuddle", message, args, " tu dois te sentir seul(e)... Je te fais pleins de caresses", " Vous recevez des caresses de ", " :two_hearts:!");
    },
};