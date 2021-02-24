const {
    dbTablesStructure
} = require('../../db/dbTablesStructure.js'),
    Tags = dbTablesStructure.Tags;
module.exports = {
    name: 'tag',
    aliases: [''],
    description: '',
    group: 'Utilitaire',
    args: true,
    async execute(message, args) {
        const tagName = args[1];
        const tagDescription = args.slice(2).join(' ')

        switch (args[0]) {
            case "add":
                try {
                    // equivalent to: INSERT INTO tags (name, description, username) values (?, ?, ?);
                    const tag = await Tags.create({
                        name: tagName,
                        description: tagDescription,
                        username: message.author.username,
                    });
                    return message.reply(`Tag ${tag.name} added.`);
                } catch (e) {
                    if (e.name === 'SequelizeUniqueConstraintError') {
                        return message.reply('That tag already exists.');
                    }
                    return message.reply('Something went wrong with adding a tag.');
                }
                case "show":
                    // equivalent to: SELECT name FROM tags;
                    const tagList = await Tags.findAll({
                        attributes: ['name']
                    });
                    const tagString = tagList.map(t => t.name).join(', ') || 'No tags set.';
                    return message.channel.send(`List of tags: ${tagString}`);
                case "edit":
                    // equivalent to: UPDATE tags (description) values (?) WHERE name='?';
                    const affectedRows = await Tags.update({
                        description: tagDescription
                    }, {
                        where: {
                            name: tagName
                        }
                    });
                    if (affectedRows > 0) {
                        return message.reply(`Tag ${tagName} was edited.`);
                    }
                    return message.reply(`Could not find a tag with name ${tagName}.`);
                case "remove":
                    // equivalent to: DELETE from tags WHERE name = ?;
                    const rowCount = await Tags.destroy({
                        where: {
                            name: tagName
                        }
                    });
                    if (!rowCount) return message.reply('That tag did not exist.');

                    return message.reply('Tag deleted.');
                default:
                    // equivalent to: SELECT * FROM tags WHERE name = 'tagName' LIMIT 1;
                    const tag = await Tags.findOne({
                        where: {
                            name: args[0]
                        }
                    });
                    if (tag) {
                        // equivalent to: UPDATE tags SET usage_count = usage_count + 1 WHERE name = 'tagName';
                        tag.increment('usage_count');
                        return message.channel.send(tag.get('description'));
                    }
                    return message.reply(`Could not find tag: ${args[0]}`);
        }
    },
};