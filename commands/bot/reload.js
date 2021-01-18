module.exports = {
    name: 'reload',
    args: true,
    description: 'Reloads a command',
    group: 'Bot-Info',
    guildOnly: true,
    example: ` ping`,
    execute(message, args) {
        if (!args.length) return message.channel.send(`You didn't pass any command to reload, ${message.author}!`);
        const commandName = args[0].toLowerCase();
        const client = message.client;
        const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

        if (!command) return message.channel.send(`There is no command with name or alias \`${commandName}\`, ${message.author}!`);

        delete require.cache[require.resolve(`../` + (`bot` || `divers` || `emotion` || `fun` || `info` || `utility`) + `/${command.name}.js`)];

        try {
            const newCommand = require(`../` + (`bot` || `divers` || `emotion` || `fun` || `info` || `utility`) + `/${command.name}.js`);
            message.client.commands.set(newCommand.name, newCommand);
        } catch (error) {
            console.error(error);
            message.channel.send(`There was an error while reloading a command \`${command.name}\`:\n\`${error.message}\``);
        }

        message.channel.send(`Command \`${command.name}\` was reloaded!`);
    },
};