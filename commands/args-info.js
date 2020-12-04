module.exports = {
    name: 'args-info',
    description: 'Information about the arguments provided.',
    group: '**Bot - Commandes de test**',
    args: true,
    hidden: true,
    execute(message, args) {
        if (args[0] === 'foo') {
            return message.channel.send('bar');
        }

        message.channel.send(`Arguments: ${args}\nArguments length: ${args.length}`);
    },
};