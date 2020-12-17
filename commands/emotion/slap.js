const {
    getRandomGifToEmbed
} = require('../../util/getRandomGif');
const prefix = process.env.PREFIX;
module.exports = {
    name: 'slap',
    aliases: ['slaps', 'gifle', 'gifles'],
    description: 'Envoyer des gifles à quelqu\'un.',
    group: 'Emotion',
    args: true,
    guildOnly: true,
    example: `\`${prefix}${this.name} @Someone\`\n`,
    execute(message, args) {
        getRandomGifToEmbed("slap", message, args, " tu dois avoir un soucis... Pour demander des gifles", "! Vous recevez des gifles de ", " :open_mouth:");
    },
};