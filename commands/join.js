module.exports = {
    name: 'join',
    description: 'Join!',
    group: 'Bot-Test',
    hidden: true,
    guildOnly: true,
    execute(message, args) {
        message.client.emit('guildMemberAdd', message.member);
    },
};