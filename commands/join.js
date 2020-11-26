module.exports = {
    name: 'join',
    description: 'Join!',
    execute(message, args) {
        message.client.emit('guildMemberAdd', message.member);
    },
};