module.exports = {
    name: 'easter-egg',
    description: 'EasterEgg!',
    hidden: true,
    execute(message, args) {
        message.channel.send('Easter Egg.');
    },
};