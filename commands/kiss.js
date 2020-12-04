const {
    getRandomGifToEmbed
} = require('../util/getRandomGif');
module.exports = {
    name: 'kiss',
    aliases: ['bisous'],
    description: 'Envoyer des bisous à quelqu\'un.',
    group: '**Emotions - Commandes d \'émotions**',
    args: true,
    guildOnly: true,
    execute(message, args) {
        getRandomGifToEmbed("kiss", message, args, " tu dois te sentir seul(e)... Je te fais un gros bisou", " Vous recevez un bisou de ", " :kiss:!");
    },
};