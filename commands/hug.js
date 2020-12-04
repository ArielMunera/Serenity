const {
    getRandomGifToEmbed
} = require('../util/getRandomGif');
module.exports = {
    name: 'hug',
    aliases: ['calins', 'calin', 'hugs'],
    description: 'Envoyer un câlin à quelqu\'un.',
    group: 'Emotion',
    args: true,
    guildOnly: true,
    execute(message, args) {
        getRandomGifToEmbed("hug", message, args, " tu dois te sentir seul(e)... Je te fais un gros câlin", " Vous recevez un câlin de ", " :sparkling_heart:!");
    },
};