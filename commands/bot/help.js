const {
    MessageEmbed
} = require('discord.js');
const {
    groups
} = require('../../util/commandsGroups.json');
const prefix = process.env.PREFIX;
module.exports = {
    name: 'help',
    description: 'List all of my commands or info about a specific command.',
    group: 'Bot-Info',
    aliases: ['commands'],
    usage: '[command name]',
    example: `\n`,
    example2: ` gif`,
    cooldown: 5,
    execute(message, args) {
        const data = [];
        const {
            commands
        } = message.client;

        if (!args.length) {

            groups.forEach(group => {
                if (Object.keys(group) != "Bot-Test") {
                    data.push("__***" + Object.values(group) + "***__");
                    data.push(commands.filter(command => command.hidden !== true).filter(command => command.group == Object.keys(group)).map(command => "> **" + command.name + "** - " + command.description).join('\n'));
                    data.push("");
                }
            });
            data.push(`You can send \`${prefix}help [command name]\` to get info on a specific command!`);

            const embed = new MessageEmbed()
                .setTitle('Here\'s a list of all my commands:\n')
                .setColor(0x00bfff)
                .setDescription(data);

            return message.reply(embed);
        }

        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

        if (!command) {
            return message.reply('That\'s not a valid command!');
        }
        const prefixAndName = prefix + command.name;
        const example1 = `\`` + prefixAndName + command.example + `\`` + (command.exampleDesc ? command.exampleDesc : "");
        const example2 = `\`` + prefixAndName + command.example2 + `\`` + (command.exampleDesc2 ? command.exampleDesc2 : "");
        const examples = example1 + (command.example2 ? (command.exampleDesc ? "\n" : "") + example2 : "");

        if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
        if (command.description) data.push(`**Description:** ${command.description}`);
        if (command.usage) data.push(`**Format:** \`${prefix}${command.name} ${command.usage}\``);
        if (command.cooldown) data.push(`**Cooldown:** ${command.cooldown || 0} second(s)`);
        if (command.example) data.push(`**Exemples:**\n ${examples.replace('``', '')}`);

        const embed = new MessageEmbed()
            .setTitle(`**Name:** ${command.name}`)
            .setColor(0x00bfff)
            .setDescription(data);

        return message.reply(embed);
    },
};