const {
    getRandomGifToEmbed
} = require('../util/getRandomGif');
module.exports = {
    name: 'tickle',
    aliases: ['chatouilles'],
    description: 'Chatouiller quelqu\'un.',
    group: '**Emotions - Commandes d \'émotions**',
    args: true,
    guildOnly: true,
    execute(message, args) {
        getRandomGifToEmbed("tickle", message, args, " tu dois t'ennuyer... Je te fais pleins de chatouilles", " Vous recevez des chatouilles de ", " :joy:!");
    },
};