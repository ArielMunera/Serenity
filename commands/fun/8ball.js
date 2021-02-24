const {
    MessageEmbed
} = require('discord.js');
const {
    ball8Answers
} = require('../../datas/8ballAnswers.json');
const {
    getRandomNumber
} = require('../../util/getRandomNumber');
module.exports = {
    name: '8ball',
    aliases: ['8b'],
    description: 'Répond à votre question',
    usage: "[question]",
    guildOnly: true,
    example: ` Suis-je paresseux ?`,
    group: 'Fun',
    args: true,
    execute(message, args) {
        let answerIndex = getRandomNumber(ball8Answers.length);
        let answer = ball8Answers[answerIndex - 1];
        const embed = new MessageEmbed()
            .setColor(0x00bfff)
            .setDescription(":8ball:**" + message.author.username + "**, " + answer)
        message.channel.send(embed);
    },
};