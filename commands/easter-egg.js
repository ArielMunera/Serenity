module.exports = {
    name: 'easter-egg',
    description: 'EasterEgg!',
    group: 'Bot-Test',
    hidden: true,
    guildOnly: true,
    execute(message, args) {
        message.channel.send('Easter Egg.');
    },
};