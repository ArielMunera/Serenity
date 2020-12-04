module.exports = {
    name: 'join',
    description: 'Join!',
    group: '**Bot - Commandes de test**',
    hidden: true,
    guildOnly: true,
    execute(message, args) {
        message.client.emit('guildMemberAdd', message.member);
    },
};