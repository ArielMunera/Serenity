module.exports = {
    name: 'server',
    description: 'Show some infos about the current server',
    group: 'Information',
    guildOnly: true,
    execute(message, args) {
        message.channel.send(`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`);
    },
};