module.exports = {
    name: 'ping',
    aliases: ['pong'],
    description: 'Play ping-pong with the bot',
    group: '**Fun - Commandes amusantes**',
    execute(message, args) {
        if (message.content.slice(1).trim() === 'ping') {
            message.channel.send('Pong.');
        }
        if (message.content.slice(1).trim() === 'pong') {
            message.channel.send('Ping.');
        }
    },
};