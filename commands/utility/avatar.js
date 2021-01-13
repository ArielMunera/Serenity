const prefix = process.env.PREFIX;
module.exports = {
    name: 'avatar',
    aliases: ['icon', 'pp', 'pdp'],
    description: 'Show the avatar(s) of the mentioned user(s)',
    group: 'Utilitaire',
    example: `\`${prefix}${this.name} @Someone\`\n`,
    execute(message, args) {
        if (!message.mentions.users.size) {
            return message.channel.send(`Your avatar: ` + message.author.displayAvatarURL({
                format: "png",
                dynamic: true,
                size: 128
            }));
        }

        const avatarList = message.mentions.users.map(user => {
            return `${user.username}'s avatar: ` + user.displayAvatarURL({
                format: "png",
                dynamic: true,
                size: 128
            });
        });

        // send the entire array of strings as a message
        // by default, discord.js will `.join()` the array with `\n`
        message.channel.send(avatarList);
    },
};