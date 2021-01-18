const prefix = process.env.PREFIX;
module.exports = {
    name: 'prune',
    aliases: ['delete', 'suppr', 'remove'],
    description: 'Supprimer un certain nombre de messages - max 99',
    group: 'Utilitaire',
    args: true,
    example: ` 43\n`,
    exampleDesc: "*Cela va supprimer les 43 derniers messages datants de moins de 2 semaines*",
    execute(message, args) {
        const amount = parseInt(args[0]) + 1;

        if (isNaN(amount)) {
            return message.reply('that doesn\'t seem to be a valid number.');
        } else if (amount <= 1 || amount > 100) {
            return message.reply('you need to input a number between 1 and 99.');
        }
        message.channel.bulkDelete(amount, true).catch(err => {
            console.error(err);
            message.channel.send('there was an error trying to prune messages in this channel!');
        });
    },
}