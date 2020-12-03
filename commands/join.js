module.exports = {
    name: 'join',
    description: 'Join!',
    hidden: true,
    guildOnly: true,
    execute(message, args) {
        message.client.emit('guildMemberAdd', message.member);
    },
};