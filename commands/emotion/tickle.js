const {
    getRandomGifToEmbed
} = require('../../util/getRandomGif');
const prefix = process.env.PREFIX;
module.exports = {
    name: 'tickle',
    aliases: ['chatouilles'],
    description: 'Chatouiller quelqu\'un.',
    group: 'Emotion',
    args: true,
    guildOnly: true,
    example: ` @Someone`,
    execute(message, args) {
        getRandomGifToEmbed("tickle", message, args, " tu dois t'ennuyer... Je te fais pleins de chatouilles", " Vous recevez des chatouilles de ", " :joy:!");
    },
};