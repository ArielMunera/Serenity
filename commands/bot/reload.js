const fs = require('fs');
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

        if (!command) return message.channel.send(`Il n'existe aucune commande avec ce nom ou cet alias \`${commandName}\`, ${message.author}!`);
        let commandFile = [];
        fs.readdirSync('./commands').forEach(element => {
            if (!element.endsWith('.js')) {
                fs.readdirSync('./commands/' + element).filter(file => file.endsWith(command.name + '.js') ? commandFile.push(element + "/" + file) : null);
            }
        });
        delete require.cache[require.resolve(`../` + commandFile)];

        try {
            const newCommand = require(`../` + commandFile);
            message.client.commands.set(newCommand.name, newCommand);
            message.channel.send(`La commande \`${command.name}\` a été rechargée !`);
        } catch (error) {
            console.error(error);
            message.channel.send(`Il y a eu une erreur en rechargeant la commande \`${command.name}\`:\n\`${error.message}\``);
        }

    },
};