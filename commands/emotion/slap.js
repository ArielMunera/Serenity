const {
    getRandomGifToEmbed
} = require('../../util/getRandomGif');
module.exports = {
    name: 'slap',
    aliases: ['slaps', 'gifle', 'gifles'],
    description: 'Envoyer des gifles à quelqu\'un.',
    group: 'Emotion',
    args: true,
    guildOnly: true,
    example: ` @Someone`,
    execute(message, args) {
        getRandomGifToEmbed("slap", message, args, " tu dois avoir un soucis... Pour demander des gifles", "! Vous recevez des gifles de ", " :open_mouth:");
    },
};